import {actions,resolve} from './rules.mjs';
import {fit} from '../shared.mjs';
fit(1090,940);
const $=id=>document.getElementById(id), keys=['qweasd','iopjkl'];
let art;
try{const response=await fetch('./art.json');if(!response.ok)throw new Error();art=await response.json();}catch{$('screen').textContent='Artwork could not load. Please refresh to try again.';throw new Error('Artwork unavailable');}
let state='menu', selection=0, mode='single', round=1, charges=[2,2], choices=[null,null], paused=false, sequence=[], frame=0, result=null, message='', scene='startAnimation';
const name=id=>actions.find(a=>a.id===id).name;
function button(text,fn){const b=document.createElement('button');b.textContent=text;b.onclick=fn;return b;}
function menuItems(){return state==='menu'?['Play','Rules','Credits','Exit']:state==='choose'?['Single player','Player vs player','Return']:state==='credits'?['Back']:state==='over'?['Play again','Main menu']:[];}
function draw(){
  $('pause').disabled=!['battle','animation'].includes(state);$('pause').textContent=paused?'Resume':'Pause';
  if(state==='menu')$('screen').textContent='\n\n\n\n'+art.title+'\n\n                         == Press S or Down Arrow and W or Up Arrow to Select ==\n                                      == Press Enter to Proceed ==\n'+art.menus[selection];
  else if(state==='choose')$('screen').textContent='\n\n\n\n'+art.title+'\n\n\n'+['Single player','Player vs player','Return'].map((v,i)=>' '.repeat(40)+(i===selection?'>> ':'   ')+v.toUpperCase()).join('\n\n\n');
  else if(state==='credits')$('screen').textContent=art.DisplayCredits;
  else {
    const label=mode==='single'?'Opponent':'Player 2';
    const bars=('     '+('███ '.repeat(Math.min(charges[0],12)))).padEnd(65)+'███ '.repeat(Math.min(charges[1],12));
    $('screen').textContent=` == Press Esc to Pause ==\n\n                                                == Round ${round} ==\n\n                 Player 1 Controls:                                         ${label} Controls:\n       Charge [Q], Surrender [W], Mirror [E]                      ${mode==='single'?'Computer opponent':'Charge [I], Surrender [O], Mirror [P]'}\n     Gun [A], Kamehameha [S], Nuclear Bomb [D]                  ${mode==='single'?'':'Gun [J], Kamehameha [K], Nuclear Bomb [L]'}\n\n          == Player 1 Charge Amount: ${charges[0]} ==                              == ${label} Charge: ${charges[1]} ==\n${bars}\n${bars}\n`+(art[scene]||art.startAnimation)+(paused?'\n                                           == PAUSED ==':'')+(state==='over'?'\n                              '+message+' — Play again? [Y]':'');
  }
  $('status').textContent=paused?'Paused. Resume when ready.':message;
  $('menu-buttons').replaceChildren(...menuItems().map((text,i)=>{const b=button(text,()=>activate(i));b.setAttribute('aria-current',String(i===selection));return b;}));
  $('controls').replaceChildren();
  if(['battle','animation','over'].includes(state))for(let player=0;player<(mode==='single'?1:2);player++){
    const set=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=`Player ${player+1}${choices[player]?' — locked in':''}`;set.append(legend);
    actions.forEach((a,i)=>{const b=button(`${keys[player][i].toUpperCase()} · ${a.name} (${a.cost})`,()=>choose(player,a.id));b.disabled=state!=='battle'||paused||!!choices[player]||charges[player]<a.cost;set.append(b);});$('controls').append(set);
  }
}
function activate(i){selection=i;if(state==='menu'){if(i===0){state='choose';selection=0;}if(i===1)$('help').showModal();if(i===2){state='credits';selection=0;}if(i===3){window.top.location.href='/projects/quantumnquandary';return;}}
  else if(state==='choose'){if(i<2){mode=i===0?'single':'versus';start();return;}state='menu';selection=0;}
  else if(state==='credits'){state='menu';selection=0;}
  else if(state==='over'){if(i===0){start();return;}mainMenu();return;}draw();}
function start(){state='battle';round=1;charges=[2,2];choices=[null,null];paused=false;scene='startAnimation';message='Choose your action.';result=null;sequence=[];draw();}
function mainMenu(){state='menu';selection=0;paused=false;result=null;choices=[null,null];sequence=[];message='';draw();}
function choose(player,id){
  if(state!=='battle'||paused||choices[player]||$('help').open)return;
  const action=actions.find(a=>a.id===id);if(action.cost>charges[player]){message='Not enough charge for '+action.name+'.';draw();return;}
  // The bot samples only its own affordable actions, without inspecting the player's choice.
  if(mode==='single'){const available=actions.filter(a=>a.cost<=charges[1]);choices[1]=available[Math.floor(Math.random()*available.length)].id;}
  choices[player]=id;message=mode==='versus'?'Action locked. Waiting for the other player.':'Resolving round…';scene=player===0?'readyPlayerOne':'readyPlayerTwo';
  if(choices.every(Boolean)){
    result=resolve(...choices,charges);charges=result.charges;state='animation';frame=0;
    const [a,b]=choices;let seq=art.sequences[a+':'+b];
    if(a==='nuke'&&b!=='nuke')seq=art.sequences['nuke:charge'];if(b==='nuke'&&a!=='nuke')seq=art.sequences['charge:nuke'];
    sequence=seq?.length?seq:['bothSurrender'];scene=sequence[0];message=`Player 1: ${name(a)} · ${mode==='single'?'Opponent':'Player 2'}: ${name(b)}`;
  }draw();
}
setInterval(()=>{if(state!=='animation'||paused||$('help').open)return;frame++;if(frame<sequence.length){scene=sequence[frame];draw();return;}if(result.winner){state='over';selection=0;message=result.winner===1?'Player 1 wins!':mode==='single'?'Opponent wins!':'Player 2 wins!';}else{round++;state='battle';choices=[null,null];scene='startAnimation';message='Both survived. Choose your next action.';}draw();},500);
$('main-menu').onclick=mainMenu;$('rules').onclick=()=>$('help').showModal();$('close-help').onclick=()=>$('help').close();
$('pause').onclick=()=>{if(['battle','animation'].includes(state)){paused=!paused;draw();}};
addEventListener('keydown',e=>{if(e.repeat||$('help').open)return;const key=e.key.toLowerCase();if(key==='escape'){$('pause').click();return;}const items=menuItems();if(items.length){if(['arrowdown','s','arrowup','w'].includes(key)){e.preventDefault();selection=Math.max(0,Math.min(items.length-1,selection+(['s','arrowdown'].includes(key)?1:-1)));draw();}else if(key==='enter'&&e.target.tagName!=='BUTTON'){e.preventDefault();activate(selection);}else if(key==='y'&&state==='over')start();return;}if(state==='battle'){for(let p=0;p<(mode==='single'?1:2);p++){const i=keys[p].indexOf(key);if(i>=0){e.preventDefault();choose(p,actions[i].id);}}}});
addEventListener('blur',()=>{if(['battle','animation'].includes(state)){paused=true;draw();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&['battle','animation'].includes(state)){paused=true;draw();}});
draw();
