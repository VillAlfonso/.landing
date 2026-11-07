import test from 'node:test';
import assert from 'node:assert/strict';
import {actions,resolve} from '../public/games/quantumnquandary/rules.mjs';
import {evaluate,reward,expression,truthValues} from '../public/games/discrete-math-instincts/rules.mjs';

test('all 36 duel pairs have symmetric results and valid resource accounting',()=>{
  for(const a of actions)for(const b of actions){
    const result=resolve(a.id,b.id,[8,8]), reverse=resolve(b.id,a.id,[8,8]);
    assert.equal(reverse.winner,result.winner===0?0:3-result.winner);
    assert.deepEqual(result.charges,[8-a.cost+(a.id==='charge'?1:0),8-b.cost+(b.id==='charge'?1:0)]);
    if(a.id===b.id)assert.equal(result.winner,0);
  }
});
test('documented winning moves, blocks, and charge limits',()=>{
  for(const [a,b]of [['gun','charge'],['kame','surrender'],['kame','gun'],['mirror','gun'],['mirror','kame'],['nuke','mirror']])assert.equal(resolve(a,b,[8,8]).winner,1);
  assert.equal(resolve('gun','surrender',[2,0]).winner,0);
  assert.throws(()=>resolve('nuke','charge',[7,0]));
  assert.throws(()=>resolve('unknown','charge',[8,8]));
});
test('truth evaluation covers all assignments, operators, and negation combinations',()=>{
  for(const p of [false,true])for(const q of [false,true])for(const na of ['', '-'])for(const nb of ['', '-']){
    const a=na?!p:p,b=nb?!q:q;
    for(const [op,expected]of [['v',a||b],['^',a&&b],['->',!a||b],['<->',a===b]])assert.equal(evaluate(na+'p'+op+nb+'q',{p,q}),expected);
    assert.equal(evaluate('-p',{p}),!p);
  }
  assert.throws(()=>evaluate('p+q',{p:true,q:false}));
});
test('generated expressions are valid and truth assignments are varied',()=>{
  for(let n=0;n<200;n++)for(let lane=0;lane<3;lane++){
    const v=truthValues();assert.ok(new Set(Object.values(v)).size===2);
    assert.equal(typeof evaluate(expression(lane,n),v),'boolean');
  }
});
test('streak heals once or awards one bonus; unary earns one point',()=>{
  assert.deepEqual(reward(10,6,2,false),{score:12,streak:0,health:3});
  assert.deepEqual(reward(10,6,3,false),{score:13,streak:0,health:3});
  assert.deepEqual(reward(0,0,3,true),{score:1,streak:1,health:3});
});
