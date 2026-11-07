export function fit(width,height) {
  const viewport=document.querySelector('#viewport'), stage=document.querySelector('#stage');
  const resize=()=>{const scale=Math.min(1,(document.documentElement.clientWidth-24)/width);viewport.style.width=width*scale+'px';viewport.style.height=height*scale+'px';stage.style.width=width+'px';stage.style.height=height+'px';stage.style.transform=`scale(${scale})`;};
  addEventListener('resize',resize);resize();
}
