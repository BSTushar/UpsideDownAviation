/*! window-intro.js — photoreal airplane window-shade page intro.
 *  Self-contained, zero dependencies. Injects its own overlay + styles,
 *  plays once, flies through the window, then removes itself.
 *
 *  Plain HTML:   <script src="window-intro.js"></script>   (just before </body>)
 *  Options on the tag:  data-auto="false" | data-once="session" | data-duration="4150" | data-skip="false"
 *  Programmatic:  WindowIntro.play({ once:'session', onDone:fn })
 *
 *  Respects prefers-reduced-motion. MIT-style: use freely.
 */
(function () {
  if (window.WindowIntro) return;

  var CSS =
    '.aw-intro{position:fixed;inset:0;z-index:2147483600;background:transparent;overflow:hidden}' +
    '.aw-intro__stage{position:absolute;inset:0;transform-origin:50% 47%;will-change:transform}' +
    '.aw-intro__cv{position:absolute;inset:0;width:100%;height:100%;display:block}' +
    'html.aw-intro-active body{filter:blur(var(--aw-page-blur,0px));transform:scale(var(--aw-page-scale,1));' +
    'transform-origin:50% 47%;will-change:filter,transform}' +
    '.aw-intro__skip{position:fixed;right:18px;bottom:16px;z-index:2147483601;border:0;cursor:pointer;' +
    'background:rgba(255,255,255,.12);color:#fff;font:500 12px/1 system-ui,-apple-system,sans-serif;' +
    'letter-spacing:.04em;padding:9px 14px;border-radius:999px;-webkit-backdrop-filter:blur(6px);' +
    'backdrop-filter:blur(6px);opacity:0;transition:opacity .4s .6s,background .2s}' +
    '.aw-intro__skip.is-show{opacity:1}.aw-intro__skip:hover{background:rgba(255,255,255,.22)}' +
    '@media(prefers-reduced-motion:reduce){.aw-intro__skip{transition:none}}';

  function injectStyle() {
    if (document.getElementById('aw-intro-style')) return;
    var s = document.createElement('style');
    s.id = 'aw-intro-style'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function play(opts) {
    opts = opts || {};
    var CAPTURE = !!window.__AW_CAPTURE;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    injectStyle();

    function clearPending(){
      var el = document.documentElement;
      if (el) el.classList.remove('aw-intro-pending');
    }

    var root = document.createElement('div'); root.className = 'aw-intro';
    var stage = document.createElement('div'); stage.className = 'aw-intro__stage';
    var cv = document.createElement('canvas'); cv.className = 'aw-intro__cv';
    var skip = document.createElement('button'); skip.type = 'button';
    skip.className = 'aw-intro__skip'; skip.textContent = 'Skip \u21B5';
    stage.appendChild(cv); root.appendChild(stage);
    if (opts.skip !== false) root.appendChild(skip);
    (document.body || document.documentElement).appendChild(root);
    clearPending();
    var ctx = cv.getContext('2d');

    /* ---------- value-noise / fbm ---------- */
    function rng(seed){return function(){seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};}
    function buildPerm(seed){var r=rng(seed),p=new Uint8Array(512),s=[],i;for(i=0;i<256;i++)s[i]=i;
      for(i=255;i>0;i--){var j=(r()*(i+1))|0,t=s[i];s[i]=s[j];s[j]=t;}for(i=0;i<512;i++)p[i]=s[i&255];return p;}
    function fadeN(t){return t*t*t*(t*(t*6-15)+10);}
    function makeFbm(seed){var p=buildPerm(seed);
      function vn(x,y){var ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
        function g(i,j){return p[(p[(ix+i)&255]+iy+j)&255]/255;}
        var u=fadeN(fx),v=fadeN(fy);
        return (g(0,0)*(1-u)+g(1,0)*u)*(1-v)+(g(0,1)*(1-u)+g(1,1)*u)*v;}
      return function(x,y,oct){var sum=0,amp=.5,f=1,norm=0;oct=oct||5;
        for(var o=0;o<oct;o++){sum+=amp*vn(x*f,y*f);norm+=amp;amp*=.5;f*=2;}return sum/norm;};}
    function smooth(a,b,x){x=Math.max(0,Math.min(1,(x-a)/(b-a)));return x*x*(3-2*x);}

    /* ---------- layout ---------- */
    var DPR,W,H,U,cx,cy,Wd,Ht,R,frameT;
    function resize(){
      DPR = CAPTURE ? (window.__AW_DPR||1) : Math.min(3, window.devicePixelRatio||1);
      var w=window.innerWidth, h=window.innerHeight;
      cv.width=w*DPR; cv.height=h*DPR; W=cv.width; H=cv.height;
      U=Math.min(W,H); cx=W/2; cy=H*0.47;
      Wd=U*0.32; Ht=U*0.48; R=Wd*0.46; frameT=U*0.055;
    }
    resize();

    function rrSub(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);
      c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);
      c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
    function rr(c,x,y,w,h,r){c.beginPath();rrSub(c,x,y,w,h,r);}
    function aperture(c){rr(c,cx-Wd/2,cy-Ht/2,Wd,Ht,R);}

    /* ---------- easings / timeline ---------- */
    function clamp01(x){return x<0?0:x>1?1:x;}
    function easeInOut(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;}
    function easeOutBack(x){var s=1.18;return 1+(s+1)*Math.pow(x-1,3)+s*Math.pow(x-1,2);}
    function shadeProg(ms){return easeOutBack(clamp01((ms-1100)/1250));}
    function shadeOffset(ms){return shadeProg(ms)*(Ht+frameT*2.2);}
    function flyZoom(ms){ if(ms<2400) return 1; return 1+Math.pow(clamp01((ms-2400)/750),2.2)*6; }
    function fadeOut(ms){ if(ms<2500) return 1; return 1-clamp01((ms-2500)/650); }
    function siteReveal(ms){ return shadeProg(ms) > 0.78; }
    function pageBlurPx(ms){
      if(!siteReveal(ms)) return 0;
      if(ms < 2400) return 18;
      return 18 * (1 - easeInOut(clamp01((ms - 2400) / 750)));
    }
    function pageScale(ms){
      if(!siteReveal(ms)) return 1;
      var z = flyZoom(ms);
      return 1 + (z - 1) * 0.12;
    }
    var END = 3300;

    /* ---------- scene (clean sky — no clouds) ---------- */
    function drawBezel(){
      var ox=cx-Wd/2-frameT, oy=cy-Ht/2-frameT, ow=Wd+frameT*2, oh=Ht+frameT*2, oR=R+frameT,
          ix=cx-Wd/2, iy=cy-Ht/2;
      ctx.save();
      ctx.shadowColor='rgba(0,0,0,.62)'; ctx.shadowBlur=U*0.08; ctx.shadowOffsetY=U*0.025;
      var plastic=ctx.createLinearGradient(0,oy,0,oy+oh);
      plastic.addColorStop(0,'#fafbfb'); plastic.addColorStop(.35,'#e8eaec');
      plastic.addColorStop(.65,'#d4d8db'); plastic.addColorStop(1,'#b8bec3');
      ctx.fillStyle=plastic;
      ctx.beginPath(); rrSub(ctx,ox,oy,ow,oh,oR); rrSub(ctx,ix,iy,Wd,Ht,R); ctx.fill('evenodd');
      ctx.restore();
      ctx.save();
      ctx.beginPath(); rrSub(ctx,ox,oy,ow,oh,oR); rrSub(ctx,ix,iy,Wd,Ht,R); ctx.clip('evenodd');
      var hl=ctx.createRadialGradient(ox+ow*.26,oy+oh*.12,0,ox+ow*.26,oy+oh*.12,ow*.75);
      hl.addColorStop(0,'rgba(255,255,255,.72)'); hl.addColorStop(.42,'rgba(255,255,255,0)');
      ctx.fillStyle=hl; ctx.fillRect(ox,oy,ow,oh);
      var lo=ctx.createRadialGradient(ox+ow*.76,oy+oh*.92,0,ox+ow*.76,oy+oh*.92,ow*.7);
      lo.addColorStop(0,'rgba(54,64,74,.4)'); lo.addColorStop(.5,'rgba(54,64,74,0)');
      ctx.fillStyle=lo; ctx.fillRect(ox,oy,ow,oh);
      ctx.restore();
      ctx.save(); aperture(ctx); ctx.clip();
      ctx.lineWidth=frameT*.22; ctx.strokeStyle='rgba(255,255,255,.14)';
      rr(ctx,cx-Wd/2+frameT*.35,cy-Ht/2+frameT*.35,Wd-frameT*.7,Ht-frameT*.7,R-frameT*.2); ctx.stroke();
      ctx.shadowColor='rgba(8,14,20,.65)'; ctx.shadowBlur=frameT*1.1;
      ctx.lineWidth=frameT*.7; ctx.strokeStyle='rgba(0,0,0,0.001)';
      aperture(ctx); ctx.stroke(); ctx.restore();
      ctx.fillStyle='rgba(18,24,30,.55)';
      ctx.beginPath(); ctx.arc(cx, cy+Ht/2-frameT*.55, U*0.0065, 0, 7); ctx.fill();
    }
    function drawCabin(ms){
      var reveal = siteReveal(ms);
      var bg=ctx.createRadialGradient(cx,cy,U*0.1,cx,cy,U*0.8);
      bg.addColorStop(0,'#171c22'); bg.addColorStop(.55,'#0d1116'); bg.addColorStop(1,'#070a0d');
      ctx.fillStyle=bg;
      ctx.beginPath();
      ctx.rect(0,0,W,H);
      if(reveal) rrSub(ctx,cx-Wd/2,cy-Ht/2,Wd,Ht,R);
      ctx.fill(reveal ? 'evenodd' : 'nonzero');
    }
    function draw(ms){
      ctx.clearRect(0,0,W,H);
      drawCabin(ms);

      var reveal = siteReveal(ms);
      var off=shadeOffset(ms);

      ctx.save(); aperture(ctx); ctx.clip();
      if(!reveal){
        var sky=ctx.createLinearGradient(0,cy-Ht/2,0,cy+Ht/2);
        sky.addColorStop(0,'#2f6fb0'); sky.addColorStop(.45,'#6ba6d8');
        sky.addColorStop(.8,'#bcdcf0'); sky.addColorStop(1,'#dcecf5');
        ctx.fillStyle=sky; ctx.fillRect(cx-Wd/2,cy-Ht/2,Wd,Ht);

        var sx=cx+Wd*0.22, sy=cy-Ht*0.26;
        var sun=ctx.createRadialGradient(sx,sy,0,sx,sy,Wd*0.7);
        sun.addColorStop(0,'rgba(255,252,242,.6)'); sun.addColorStop(.2,'rgba(255,248,232,.32)');
        sun.addColorStop(.55,'rgba(255,243,220,.08)'); sun.addColorStop(1,'rgba(255,243,220,0)');
        ctx.globalCompositeOperation='screen'; ctx.fillStyle=sun;
        ctx.fillRect(cx-Wd/2,cy-Ht/2,Wd,Ht); ctx.globalCompositeOperation='source-over';

        var edge=ctx.createRadialGradient(cx,cy,Wd*0.18,cx,cy,Wd*0.62);
        edge.addColorStop(0,'rgba(8,20,30,0)'); edge.addColorStop(1,'rgba(8,22,34,.5)');
        ctx.fillStyle=edge; ctx.fillRect(cx-Wd/2,cy-Ht/2,Wd,Ht);
      }
      if(off < Ht+frameT*2){
        var vel=Math.abs(shadeOffset(ms)-shadeOffset(ms-16));
        var sy0=cy-Ht/2-off;
        ctx.save();
        ctx.filter = vel>0.4 ? ('blur('+Math.min(16,vel*0.7)+'px)') : 'none';
        var sg=ctx.createLinearGradient(0,sy0,0,sy0+Ht);
        sg.addColorStop(0,'#eef0f0'); sg.addColorStop(.5,'#dcdfe0'); sg.addColorStop(1,'#c7cbcd');
        ctx.fillStyle=sg; rr(ctx,cx-Wd/2,sy0,Wd,Ht,R); ctx.fill();
        ctx.restore();
        ctx.save(); rr(ctx,cx-Wd/2,sy0,Wd,Ht,R); ctx.clip();
        ctx.globalAlpha=.05; ctx.fillStyle='#fff';
        for(var b=0;b<8;b++) ctx.fillRect(cx-Wd/2,sy0+Ht*(b/8),Wd,1.2);
        ctx.globalAlpha=1;
        var le=ctx.createLinearGradient(0,sy0+Ht-frameT,0,sy0+Ht);
        le.addColorStop(0,'rgba(255,255,255,0)'); le.addColorStop(1,'rgba(255,255,255,.5)');
        ctx.fillStyle=le; ctx.fillRect(cx-Wd/2,sy0+Ht-frameT,Wd,frameT);
        ctx.fillStyle='#b7bbbd'; rr(ctx,cx-Wd*0.10,sy0+Ht-Ht*0.075,Wd*0.20,Ht*0.030,Ht*0.015); ctx.fill();
        ctx.restore();
        ctx.save(); aperture(ctx); ctx.clip();
        var sh=ctx.createLinearGradient(0,sy0+Ht,0,sy0+Ht+Ht*0.14);
        sh.addColorStop(0,'rgba(6,14,22,.38)'); sh.addColorStop(1,'rgba(6,14,22,0)');
        ctx.fillStyle=sh; ctx.fillRect(cx-Wd/2,sy0+Ht,Wd,Ht*0.14); ctx.restore();
      }

      ctx.save(); aperture(ctx); ctx.clip();
      ctx.globalCompositeOperation='screen';
      var gl=ctx.createLinearGradient(cx-Wd*0.5,cy-Ht*0.5,cx+Wd*0.2,cy+Ht*0.2);
      gl.addColorStop(0,'rgba(255,255,255,'+(reveal?'.10':'.16')+')');
      gl.addColorStop(.35,'rgba(255,255,255,.02)');
      gl.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=gl; ctx.fillRect(cx-Wd/2,cy-Ht/2,Wd,Ht);
      if(!reveal){
        ctx.globalAlpha=.26; ctx.strokeStyle='rgba(255,255,255,.4)'; ctx.lineWidth=U*0.0028;
        ctx.beginPath(); ctx.moveTo(cx-Wd*0.34,cy-Ht*0.34); ctx.lineTo(cx-Wd*0.05,cy+Ht*0.02); ctx.stroke();
      }
      ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
      ctx.restore();
      ctx.restore();

      drawBezel();

      var expo=easeInOut(clamp01(ms/1050));
      if(expo<1){
        ctx.fillStyle='rgba(3,5,8,'+((1-expo)*0.92)+')'; ctx.fillRect(0,0,W,H);
        var rim=ctx.createRadialGradient(cx,cy,U*0.16,cx,cy,U*0.34);
        rim.addColorStop(0,'rgba(232,210,170,0)');
        rim.addColorStop(.7,'rgba(232,206,160,'+(0.10*(1-expo))+')');
        rim.addColorStop(1,'rgba(232,206,160,0)');
        ctx.globalCompositeOperation='screen'; ctx.fillStyle=rim; ctx.fillRect(0,0,W,H);
        ctx.globalCompositeOperation='source-over';
      }
      var vg=ctx.createRadialGradient(cx,cy,U*0.35,cx,cy,U*0.95);
      vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.55)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
    }

    function syncPage(ms){
      var el = document.documentElement;
      if (!el) return;
      el.classList.add('aw-intro-active');
      el.style.setProperty('--aw-page-blur', pageBlurPx(ms) + 'px');
      el.style.setProperty('--aw-page-scale', String(pageScale(ms)));
    }
    function resetPage(){
      var el = document.documentElement;
      if (!el) return;
      el.classList.remove('aw-intro-active');
      el.style.removeProperty('--aw-page-blur');
      el.style.removeProperty('--aw-page-scale');
    }
    function render(ms){
      syncPage(ms);
      draw(ms);
      stage.style.transform='scale('+flyZoom(ms)+')';
      root.style.opacity=fadeOut(ms);
    }

    /* ---------- lifecycle ---------- */
    var removed=false;
    function cleanup(){
      if(removed) return; removed=true;
      clearPending();
      resetPage();
      window.removeEventListener('resize', onResize);
      if(root.parentNode) root.parentNode.removeChild(root);
      if(typeof opts.onDone==='function') opts.onDone();
    }
    function onResize(){ if(!CAPTURE) resize(); }
    window.addEventListener('resize', onResize);

    if(CAPTURE){
      window.__awRender=function(ms){ render(ms); };
      window.__awResize=function(d){ window.__AW_DPR=d; resize(); };
      render(0);
      return cleanup;
    }

    if(reduce){
      syncPage(2750);
      render(2750);                                  // static open window, no motion
      setTimeout(function(){
        root.style.transition='opacity .6s'; root.style.opacity=0;
        setTimeout(cleanup,650);
      }, 650);
      skip.addEventListener('click', cleanup);
      setTimeout(function(){skip.classList.add('is-show');},300);
      return cleanup;
    }

    var t0=null;
    function loop(now){
      if(removed) return;
      if(t0===null) t0=now;
      var ms=now-t0; render(ms);
      if(ms<END) requestAnimationFrame(loop); else cleanup();
    }
    requestAnimationFrame(loop);
    setTimeout(function(){ if(!removed) skip.classList.add('is-show'); }, 600);
    skip.addEventListener('click', cleanup);
    return cleanup;
  }

  window.WindowIntro = { play: play, version: '1.0.0' };

  /* ---------- auto-run from <script> tag ---------- */
  var me = document.currentScript || document.getElementById('window-intro');
  if (window.__AW_CAPTURE) return;                   // let test harness drive it

  function signalReady() {
    try { window.dispatchEvent(new CustomEvent('aw-intro-ready')); } catch (e) {}
  }

  /* Next.js / async loaders: React listens for aw-intro-ready */
  if (!me || (me && me.dataset.auto === 'false')) {
    signalReady();
    return;
  }

  var once = me.dataset.once;                  // "session" => play only once per tab session
  function run(){
    var p = location.pathname;
    if (p !== '/' && p !== '') return;
    if (once === 'session') {
      try { if (sessionStorage.getItem('aw-intro-played')) return;
            sessionStorage.setItem('aw-intro-played','1'); } catch(e){}
    }
    play({ skip: !(me.dataset.skip === 'false') });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
