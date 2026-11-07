import {evaluate,truthValues,expression,reward} from './rules.mjs';
import {fit} from '../shared.mjs';
fit(540,627);
const $=id=>document.getElementById(id);
let state='menu', paused=false, score=0, health=3, streak=0, high=0, advanced=false, values={}, lanes=[], feedbackUntil=0;
try{high=Math.max(0,Number(localStorage.getItem('discrete-instincts-highscore'))||0);}catch{}
const active=i=>i===0||score>=(i===1?8:20);
function resetLane(i){lanes[i]={text:expression(i,score),y:-9};}
function closest(){return lanes.map((x,i)=>({i,y:x.y})).filter(x=>active(x.i)).sort((a,b)=>b.y-a.y)[0]?.i??0;}
function draw(){
  $('start-screen').hidden=state!=='menu';$('playing').hidden=state==='menu';$('gameover').hidden=state!=='over';$('paused').hidden=!(paused&&state==='playing');
  $('pause').disabled=state!=='playing';$('pause').textContent=paused?'Resume':'Pause';
  $('score').textContent='Score:'+score;$('highscore').textContent='HighScore: '+high;
  $('hearts').src=`hearts${health}.png`;$('hearts').alt=`${health} lives`;$('streak').value=streak;
  $('values').textContent=Object.entries(values).map(([k,v])=>`${k} = ${v?'T':'F'}`).join('\n');
  lanes.forEach((x,i)=>{const el=$('lane'+i);el.hidden=!active(i);el.textContent=x.text;el.style.top=x.y+'px';el.classList.toggle('selected',i===closest());});
  $('final-high').textContent='HighScore: '+high;$('final-score').textContent='Score: '+score;
}
function start(){state='playing';paused=false;score=0;health=3;streak=0;feedbackUntil=0;advanced=document.querySelector('[name=mode]:checked').value==='advanced';values=truthValues();lanes=[];for(let i=0;i<3;i++)resetLane(i);draw();}
function save(){if(score>high){high=score;try{localStorage.setItem('discrete-instincts-highscore',String(high));}catch{}}}
function answer(value){
  if(state!=='playing'||paused||$('rules').open||performance.now()<feedbackUntil)return;
  const i=closest(), old=score, correct=evaluate(lanes[i].text,values)===value;
  if(correct)({score,streak,health}=reward(score,streak,health,i===1));else{health--;streak=0;}
  save();
  if(advanced&&Math.floor(score/10)>Math.floor(old/10))values=truthValues();
  resetLane(i);lanes[i].feedback=correct?'✔':'❌';feedbackUntil=performance.now()+650;
  if(health===0)state='over';draw();$('lane'+i).textContent=lanes[i].feedback;
}
function togglePause(){if(state==='playing'){paused=!paused;draw();}}
$('start').onclick=$('restart').onclick=start;
$('true').onclick=()=>answer(true);$('false').onclick=()=>answer(false);
$('pause').onclick=$('resume').onclick=togglePause;
$('menu').onclick=$('return').onclick=()=>{state='menu';paused=false;draw();};
$('help').onclick=()=>{$('rules').showModal();};$('close-rules').onclick=()=>$('rules').close();
addEventListener('keydown',e=>{if(e.repeat)return;if(e.key==='F1'){e.preventDefault();if(!$('rules').open)$('rules').showModal();}if($('rules').open)return;if(e.key==='Escape'){e.preventDefault();togglePause();}if(e.key.toLowerCase()==='a')answer(true);if(e.key.toLowerCase()==='d')answer(false);});
addEventListener('blur',()=>{if(state==='playing'){paused=true;draw();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='playing'){paused=true;draw();}});
setInterval(()=>{if(state!=='playing'||paused||$('rules').open||performance.now()<feedbackUntil)return;for(let i=0;i<3;i++){if(!active(i))continue;lanes[i].y+=i===2?10:15;if(lanes[i].y>=450){health--;streak=0;resetLane(i);if(health<=0){state='over';health=0;break;}}}draw();},300);
draw();
