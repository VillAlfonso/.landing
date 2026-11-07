export function evaluate(expression, values) {
  const match = expression.match(/^(-?[pqrs])(?:(<->|->|v|\^)(-?[pqrs]))?$/);
  if (!match) throw new Error('Invalid expression');
  const value = token => token[0]==='-' ? !values[token[1]] : values[token];
  const a=value(match[1]);
  if (!match[2]) return a;
  const b=value(match[3]);
  return {'v':a||b, '^':a&&b, '->':!a||b, '<->':a===b}[match[2]];
}
export function truthValues(random=Math.random) {
  const v=Object.fromEntries([... 'pqrs'].map(k=>[k,random()<.5]));
  if (Object.values(v).every(x=>x===v.p)) v.s=!v.p;
  return v;
}
export function expression(lane, score, random=Math.random) {
  const pick = a => a[Math.floor(random()*a.length)];
  if (lane===1) return '-'+pick([... 'pqrs']);
  const a=pick([... 'pqrs']), b=pick([... 'pqrs'].filter(k=>k!==a));
  const neg=score >= (lane===2?25:20) && random()<.5 ? '-' : '';
  return neg+a+pick(['v','^','->','<->'])+neg+b;
}
export function reward(score, streak, health, unary) {
  score+=unary?1:2; streak++;
  if (streak===7) { if(health<3) health++; else score++; streak=0; }
  return {score,streak,health};
}
