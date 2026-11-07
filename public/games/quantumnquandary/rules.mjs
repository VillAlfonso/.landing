export const actions = [
  {id:'charge', name:'Charge', cost:0}, {id:'surrender', name:'Surrender', cost:0},
  {id:'mirror', name:'Mirror', cost:3}, {id:'gun', name:'Gun', cost:2},
  {id:'kame', name:'Kamehameha', cost:5}, {id:'nuke', name:'Nuclear Bomb', cost:8},
];
export function resolve(a, b, charges) {
  const chosen = [a,b].map(id => actions.find(x => x.id === id));
  if (chosen.some((x,i) => !x || x.cost > charges[i])) throw new Error('Not enough charge');
  const beats = (x,y) => x !== y && (x === 'nuke' || (x === 'mirror' && ['gun','kame'].includes(y)) || (x === 'kame' && ['charge','surrender','gun'].includes(y)) || (x === 'gun' && y === 'charge'));
  return {winner:beats(a,b)?1:beats(b,a)?2:0, charges:chosen.map((x,i)=>charges[i]-x.cost+(x.id==='charge'?1:0))};
}
