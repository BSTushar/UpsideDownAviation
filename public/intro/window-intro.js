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

  /* Match site --color-void (#07111f) */
  var VOID = '#07111f';

  var CSS =
    '.aw-intro{position:fixed;inset:0;z-index:2147483600;background:transparent;overflow:hidden}' +
    '.aw-intro__stage{position:absolute;inset:0;transform-origin:50% 47%;will-change:transform}' +
    '.aw-intro__page-blur{position:absolute;inset:0;pointer-events:none;opacity:0;will-change:clip-path,backdrop-filter,opacity;' +
    '-webkit-backdrop-filter:blur(0px);backdrop-filter:blur(0px)}' +
    '.aw-intro__cv{position:absolute;inset:0;width:100%;height:100%;display:block}' +
    'html.aw-intro-active body{overflow:hidden}' +
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
    var blurEl = document.createElement('div'); blurEl.className = 'aw-intro__page-blur';
    var cv = document.createElement('canvas'); cv.className = 'aw-intro__cv';
    var skip = document.createElement('button'); skip.type = 'button';
    skip.className = 'aw-intro__skip'; skip.textContent = 'Skip \u21B5';
    stage.appendChild(blurEl);
    stage.appendChild(cv);
    root.appendChild(stage);
    if (opts.skip !== false) root.appendChild(skip);
    document.documentElement.appendChild(root);
    clearPending();
    var ctx = cv.getContext('2d');

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

    function apertureClipCss(){
      var w = window.innerWidth, h = window.innerHeight;
      var u = Math.min(w, h);
      var wd = u * 0.32, ht = u * 0.48, r = wd * 0.46;
      var cxCss = w / 2, cyCss = h * 0.47;
      var top = cyCss - ht / 2;
      var left = cxCss - wd / 2;
      var right = w - (cxCss + wd / 2);
      var bottom = h - (cyCss + ht / 2);
      return 'inset(' + top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px round ' + r + 'px)';
    }

    /* ---------- easings / timeline ---------- */
    function clamp01(x){return x<0?0:x>1?1:x;}
    function easeInOut(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;}
    function easeOutBack(x){var s=1.18;return 1+(s+1)*Math.pow(x-1,3)+s*Math.pow(x-1,2);}
    function shadeProg(ms){return easeOutBack(clamp01((ms-1100)/1250));}
    function shadeOffset(ms){return shadeProg(ms)*(Ht+frameT*2.2);}
    function flyZoom(ms){ if(ms<2400) return 1; return 1+Math.pow(clamp01((ms-2400)/750),2.2)*6; }
    function fadeOut(ms){ if(ms<2500) return 1; return 1-clamp01((ms-2500)/650); }
    /* Reveal blurred site as soon as shade begins opening — no sky/clouds phase */
    function siteReveal(ms){ return shadeProg(ms) > 0.06; }
    function pageBlurPx(ms){
      if(!siteReveal(ms)) return 0;
      if(ms < 2400) return 16;
      return 16 * (1 - easeInOut(clamp01((ms - 2400) / 750)));
    }
    var END = 3300;

    function syncBlurLayer(ms){
      var reveal = siteReveal(ms);
      if(!reveal){
        blurEl.style.opacity = '0';
        blurEl.style.clipPath = 'inset(100%)';
        blurEl.style.backdropFilter = 'blur(0px)';
        blurEl.style.webkitBackdropFilter = 'blur(0px)';
        return;
      }
      blurEl.style.opacity = '1';
      blurEl.style.clipPath = apertureClipCss();
      var b = pageBlurPx(ms);
      blurEl.style.backdropFilter = 'blur(' + b + 'px)';
      blurEl.style.webkitBackdropFilter = 'blur(' + b + 'px)';
    }

    /* ---------- scene ---------- */
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
      ctx.fillStyle = VOID;
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
        ctx.fillStyle = VOID;
        ctx.fillRect(cx-Wd/2,cy-Ht/2,Wd,Ht);
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

      if(reveal){
        ctx.save(); aperture(ctx); ctx.clip();
        ctx.globalCompositeOperation='screen';
        var gl=ctx.createLinearGradient(cx-Wd*0.5,cy-Ht*0.5,cx+Wd*0.2,cy+Ht*0.2);
        gl.addColorStop(0,'rgba(255,255,255,.08)');
        gl.addColorStop(.35,'rgba(255,255,255,.02)');
        gl.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle=gl; ctx.fillRect(cx-Wd/2,cy-Ht/2,Wd,Ht);
        ctx.globalCompositeOperation='source-over';
        ctx.restore();
      }
      ctx.restore();

      drawBezel();

      var expo=easeInOut(clamp01(ms/1050));
      if(expo<1){
        ctx.fillStyle='rgba(7,17,31,'+((1-expo)*0.92)+')'; ctx.fillRect(0,0,W,H);
        var rim=ctx.createRadialGradient(cx,cy,U*0.16,cx,cy,U*0.34);
        rim.addColorStop(0,'rgba(232,210,170,0)');
        rim.addColorStop(.7,'rgba(232,206,160,'+(0.08*(1-expo))+')');
        rim.addColorStop(1,'rgba(232,206,160,0)');
        ctx.globalCompositeOperation='screen'; ctx.fillStyle=rim; ctx.fillRect(0,0,W,H);
        ctx.globalCompositeOperation='source-over';
      }
    }

    function syncPage(ms){
      var el = document.documentElement;
      if (!el) return;
      el.classList.add('aw-intro-active');
      syncBlurLayer(ms);
    }
    function resetPage(){
      var el = document.documentElement;
      if (!el) return;
      el.classList.remove('aw-intro-active');
      blurEl.style.opacity = '0';
      blurEl.style.clipPath = 'inset(100%)';
      blurEl.style.backdropFilter = 'blur(0px)';
      blurEl.style.webkitBackdropFilter = 'blur(0px)';
    }
    function render(ms){
      syncPage(ms);
      draw(ms);
      /* Only the window stage zooms — page stays fixed underneath */
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
    function onResize(){
      if(!CAPTURE) resize();
    }
    window.addEventListener('resize', onResize);

    if(CAPTURE){
      window.__awRender=function(ms){ render(ms); };
      window.__awResize=function(d){ window.__AW_DPR=d; resize(); };
      render(0);
      return cleanup;
    }

    if(reduce){
      syncPage(2750);
      render(2750);
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
  if (window.__AW_CAPTURE) return;

  function signalReady() {
    try { window.dispatchEvent(new CustomEvent('aw-intro-ready')); } catch (e) {}
  }

  if (!me || (me && me.dataset.auto === 'false')) {
    signalReady();
    return;
  }

  var once = me.dataset.once;
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
