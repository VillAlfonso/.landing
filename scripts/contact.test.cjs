const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function load(file, overrides = {}, globals = {}) {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', ...Object.keys(globals), js)(id => overrides[id] ?? require(id), module, module.exports, ...Object.values(globals));
  return module.exports;
}
const lib = load('src/lib/contact.ts');
const good = { name: 'Visitor', email: 'visitor@example.com', subject: 'OJT inquiry', message: 'Please contact me about an internship.', token: 'unique-token', website: '' };
test('validation rejects injection, malformed values, and excessive input', () => {
  assert.equal(lib.parseContact({ ...good, email: ' VISITOR@EXAMPLE.COM ' }).email, good.email);
  for (const change of [{name:'A\r\nBcc: x@y.com'}, {email:'no-email'}, {subject:'x'.repeat(121)}, {message:'short'}, {message:'hello\0world'}, {token:''}, {name:[]}, {token:'x'.repeat(2049)}]) assert.equal(lib.parseContact({...good,...change}), null);
  assert.equal(lib.parseContact(null), null);
  const mail = lib.contactMail({...good, to:'attacker@example.com', message:'<img src="https://example.com">'});
  assert.equal(mail.to, lib.CONTACT_EMAIL);
  assert.equal(mail.from.address, lib.CONTACT_EMAIL);
  assert.equal(mail.replyTo.address, good.email);
  assert.equal(mail.html, undefined);
  assert.equal(mail.disableFileAccess, true);
});
test('request byte limit and malformed JSON', async () => {
  const req = body => new Request('https://quert.site/api/contact', {method:'POST', body});
  assert.deepEqual(await lib.readLimitedJson(req(JSON.stringify(good))), good);
  await assert.rejects(lib.readLimitedJson(req('x'.repeat(lib.MAX_BODY_BYTES+1))));
  await assert.rejects(lib.readLimitedJson(req('{')));
});
function harness(options = {}) {
  const sent = [], limits = [], locks = new Set();
  let closed = false;
  class Redis { async set(key) { if (options.redisError) throw Error('offline'); if (locks.has(key) || (options.duplicate && key.includes(':duplicate:'))) return null; locks.add(key); return 'OK'; } }
  class Ratelimit {
    static slidingWindow() { return {}; }
    constructor(config) { this.config=config; }
    async limit() { limits.push(this.config.prefix); if(options.redisError) throw Error('offline'); return {success:this.config.prefix!==options.block, reason:options.timeout ? 'timeout' : undefined}; }
  }
  const env = Object.fromEntries(['GMAIL_APP_PASSWORD','TURNSTILE_SITE_KEY','TURNSTILE_SECRET_KEY','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN'].map(k=>[k,'test-value']));
  if(options.unconfigured) delete env.GMAIL_APP_PASSWORD;
  const handler = load('src/app/api/contact/route.ts', {
    '@/lib/contact': {...lib, contactConfigured:()=>lib.contactConfigured(env)},
    '@upstash/redis': {Redis}, '@upstash/ratelimit': {Ratelimit},
    nodemailer: {createTransport: config => { assert.equal(config.host,'smtp.gmail.com'); assert.equal(config.secure,true); return {sendMail: async mail=>{if(options.smtpError)throw Error('offline'); sent.push(mail);return {accepted:options.rejected?[]:[lib.CONTACT_EMAIL]};}, close:()=>{closed=true;}}; }},
  }, {process:{env:{...env, NODE_ENV:'production',VERCEL:'1'}}, console:{error(){}}, fetch:async()=>{if(options.verifyError)throw Error('offline');return Response.json({success:true,hostname:'www.quert.site',action:'contact',...options.verdict});}});
  return {sent,limits,get closed(){return closed;}, post:(data=good, headers={})=>handler.POST(new Request('https://www.quert.site/api/contact',{method:'POST',headers:{origin:'https://www.quert.site','content-type':'application/json','x-vercel-forwarded-for':'203.0.113.7',...headers},body:JSON.stringify(data)}))};
}
test('protection failures never send SMTP', async () => {
  for(const [opts,data,headers,status] of [
    [{},good,{origin:'https://attacker.example'},403], [{},good,{'content-type':'text/plain'},415],
    [{unconfigured:true},good,{},503], [{},good,{'x-vercel-forwarded-for':''},503],
    [{},{...good,website:'bot'}, {},400], [{},{...good,email:'bad'}, {},400],
    [{verdict:{success:false}},good,{},400], [{verdict:{hostname:'attacker.example'}},good,{},400], [{verdict:{action:'other'}},good,{},400],
    [{verifyError:true},good,{},503], [{redisError:true},good,{},503], [{timeout:true},good,{},503],
    [{block:'contact:attempts'},good,{},429], [{block:'contact:ip'},good,{},429], [{block:'contact:email'},good,{},429], [{block:'contact:daily'},good,{},429], [{duplicate:true},good,{},429],
  ]) { const h=harness(opts); assert.equal((await h.post(data,headers)).status,status,JSON.stringify(opts));assert.equal(h.sent.length,0); }
});
test('successful delivery has fixed recipient; token replay cannot send again', async () => {
  const h=harness(); assert.equal((await h.post()).status,200); assert.equal(h.sent.length,1); assert.equal(h.sent[0].to,lib.CONTACT_EMAIL); assert.equal(h.closed,true);
  assert.equal((await h.post()).status,400); assert.equal(h.sent.length,1);
});
test('concurrent requests with the same token send only once', async () => {
  const h=harness(); const results=await Promise.all([h.post(),h.post()]); assert.deepEqual(results.map(x=>x.status).sort(),[200,400]);assert.equal(h.sent.length,1);
});
test('SMTP errors or rejected recipients never report success', async () => {
  for(const opts of [{smtpError:true},{rejected:true}]) {const h=harness(opts);assert.equal((await h.post()).status,503);assert.equal(h.closed,true);}
});
