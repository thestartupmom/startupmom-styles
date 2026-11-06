(function(){
/* Instagram Edits Kit course dashboard. Duplicates the Brand Kit add-on skin:
   it KEEPS Kajabi's native dashboard (left module outline, center body, right
   rail) fully visible and only styles it, then augments with the hero bonus
   card, the A NOTE FROM ME letter (center body), and the help + community
   panels (right rail). Runs only on the IEK product dashboard, or in the
   canvas preview where window.IEK_CANVAS is set. It never hides the native
   dashboard, so the modules always render. */
var DASH = /^\/products\/instagram-edits-kit(-add-on)?\/?$/;
if (!DASH.test(location.pathname) && !window.IEK_CANVAS) return;
var root = document.documentElement;
root.classList.add('ssk-dash');
var KEY = 'iek_welcomed_v1';
var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var seen = '1';
try { seen = localStorage.getItem(KEY); } catch (e) {}
var reveal = !seen && !reduce;
if (reveal) root.classList.add('ssk-veil');
function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
function $(s, c){ return (c || document).querySelector(s); }
function $$(s, c){ return [].slice.call((c || document).querySelectorAll(s)); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]; }); }

var ICON = 'https://cdn.jsdelivr.net/gh/thestartupmom/naptime-academy-assets@e56cb71da1af99daf2ab8197f141b70f058d0e9a/course-lesson/edits-kit/edits-icon.webp';
var PORTRAIT = 'https://kajabi-storefronts-production.s3.amazonaws.com/file-uploads/sites/2148860783/images/dbb230-80-ce08-bf4c-b6dc04d4eda5_Hi_I_m_Meg_portrait_4_5.jpg';
var CLUB_GIF = 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/2148860783/images/badec6-16-b45f-c2fb-634fe160010_community-dashboard-banner.gif';
var CLUB_HREF = 'https://www.thestartupmom.com/community-join';

function lessons(){
  return $$('.product-outline-post').map(function(a){
    var m = (a.getAttribute('href') || '').match(/\/posts\/(\d+)/), ic = $('.progress-icon', a);
    return {post: m ? m[1] : '', done: !!(ic && ic.classList.contains('progress-icon-100')),
      title: (($('.media-body', a) || a).textContent || '').trim()};
  }).filter(function(l){ return l.post; });
}
function firstName(){
  var t = $('.dashboard-welcome-title'); if (!t) return '';
  var full = t.getAttribute('data-ssk-name');
  if (full == null){
    var c = t.cloneNode(true); $$('span', c).forEach(function(s){ s.remove(); });
    full = (c.textContent || '').trim(); t.setAttribute('data-ssk-name', full);
  }
  return /@/.test(full) ? '' : (full.split(/\s+/)[0] || '');
}
function hero(){
  var w = $('.dashboard-welcome'); if (!w) return;
  var list = lessons(), started = list.some(function(l){ return l.done; });
  var t = $('.dashboard-welcome-title', w), name = firstName();
  if (t) t.innerHTML = (started ? 'Welcome back' : 'Welcome') + (name ? ', <em>' + esc(name) + '.</em>' : ' <em>in.</em>');
  var sub = $('.dashboard-welcome-subtitle', w), btn = $('.dashboard-welcome-btn', w), mb = $('.media-body', w);
  if (sub){
    var nx = $('.ssk-next', sub);
    if (!nx){ nx = document.createElement('span'); nx.className = 'ssk-next'; sub.appendChild(nx); }
    var href = btn ? (btn.getAttribute('href') || '') : '', next = null;
    list.forEach(function(l){ if (!next && href.indexOf('/posts/' + l.post) > -1) next = l; });
    nx.innerHTML = next ? (started ? 'Next up: ' : 'Start with ') + '<b>' + esc(next.title) + '</b>' : '';
  }
  if (btn && mb && btn.parentNode !== mb) mb.appendChild(btn);
  if (!$('.ssk-idea', w)){
    var card = document.createElement('aside'); card.className = 'ssk-idea'; card.setAttribute('aria-label', 'Your free add on');
    card.innerHTML = '<span class="ssk-idea__k">it’s here!</span>' +
      '<span class="ssk-idea__t">Your engine now cuts reels inside <em>Edits.</em></span>' +
      '<span class="ssk-idea__s">Tell Claude what you want. Get a finished cut in the Edits desktop app, right where you post.</span>' +
      '<div class="ssk-idea__row"><span>Free with your engine.</span></div>';
    var m = w.querySelector('.media'); if (m) m.appendChild(card);
  }
}
function letterHTML(){
  return '<div class="ssk-letter">' +
    '<div class="ssk-letter__from"><img src="' + PORTRAIT + '" alt="" width="46" height="46"><span>A note from me</span></div>' +
    '<h2>Your whole system, now inside <em>Edits.</em></h2>' +
    '<p><b>I told you I’d give you every upgrade free, forever. I meant it.</b> This is one of them. The engine you already own can now hand your finished reel straight to the Edits desktop app, so you edit by talking, right where you post.</p>' +
    '<p><b>Start with the first lesson.</b> It is short, about two minutes. Edits is not a new tool to learn. It is one more place your engine delivers to. Same system, same you, one new door.</p>' +
    '<p>When your first reel comes out of Edits, tag it <b>#startupmomedit</b>. I want to see it.</p>' +
    '<span class="ssk-letter__sig">Meg</span>' +
  '</div>';
}
function helpHTML(){
  return '<div class="ssk-help">' +
    '<span class="ssk-help__mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .8c.9 7 3.4 10 10.4 11.2-7 1.2-9.5 4.2-10.4 11.2-.9-7-3.4-10-10.4-11.2C8.6 10.8 11.1 7.8 12 .8Z"/></svg></span>' +
    '<div><p><b>Something not working?</b> Tell Claude <span class="k">report a problem</span>. It tries to fix it first, and if it can’t, it writes you a short report.</p>' +
    '<details><summary>Still stuck after that?</summary><p>Send that report to <a href="mailto:it@thestartupmom.com">it@thestartupmom.com</a> and I’ll get back to you as quickly as I can.</p></details></div>' +
  '</div>';
}
function gateHTML(){
  return '<section class="ssk-gate" id="ssk-start">' +
    '<span class="ssk-gate__mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v11"/><path d="M8 11l4 4 4-4"/><path d="M5 20h14"/></svg></span>' +
    '<div class="ssk-gate__body">' +
      '<p class="ssk-gate__ey">Before you connect</p>' +
      '<h3 class="ssk-gate__h">Install your engine first.</h3>' +
      '<p class="ssk-gate__p">Your engine does the work, so make sure it is installed and you have finished <b>module 1 of your setup</b> before you connect to Edits. Install the engine, then come back here and hook it up.</p>' +
    '</div>' +
  '</section>';
}
function build(){
  var banner = $('.banner-image');
  if (banner && !$('.ssk-desk')){
    var desk = document.createElement('div'); desk.className = 'ssk-desk';
    desk.innerHTML = '<b>Setup happens on your computer.</b> Save this for your laptop.';
    banner.parentNode.insertBefore(desk, banner.nextSibling);
  }
  var body = $('#section-product_body');
  /* The native product dashboard ships a plain welcome paragraph as the first
     body block. Meg wants the old "Install your engine first" gate in that
     spot, so hide that one welcome block (never the module outline) and put
     the gate card first. */
  if (body && !$('.ssk-gate', body)){
    var nat = null;
    [].slice.call(body.children).forEach(function(c){
      if (nat) return;
      if (c.classList.contains('ssk-bare')) return;
      if (c.querySelector && c.querySelector('.ssk-letter,.ssk-help,.ssk-gate')) return;
      if (/dashboard-img|dashboard-video/.test(c.className || '')) return;
      nat = c;
    });
    if (nat) nat.style.display = 'none';
    var gw = document.createElement('div'); gw.className = 'dashboard-text ssk-bare';
    gw.innerHTML = gateHTML();
    body.insertBefore(gw, body.firstChild);
  }
  if (body && !$('.ssk-letter', body)){
    var lw = document.createElement('div'); lw.className = 'dashboard-text ssk-bare';
    lw.innerHTML = letterHTML();
    body.appendChild(lw);
  }
  var rail = $('#section-product_sidebar');
  if (rail && !$('.ssk-help', rail)){
    var hw = document.createElement('div'); hw.className = 'dashboard-text ssk-bare';
    hw.innerHTML = helpHTML();
    rail.appendChild(hw);
    var club = document.createElement('div'); club.className = 'dashboard-img';
    club.innerHTML = '<a href="' + CLUB_HREF + '"><img class="img-fluid" src="' + CLUB_GIF + '" alt="Join The Startup Mom Community. Bonus: Naptime Academy inside."></a>';
    rail.appendChild(club);
  }
  $$('.dashboard-text').forEach(function(b){ if ($('.ssk-letter, .ssk-help', b)) b.classList.add('ssk-bare'); });
}
function align(){
  var rail = $('#section-product_sidebar'), vid = $('#section-product_body .dashboard-video, #section-product_body .dashboard-img');
  if (!rail || !vid) return;
  rail.style.marginTop = '';
  if (window.innerWidth < 768) return;
  var d = vid.getBoundingClientRect().top - rail.getBoundingClientRect().top;
  if (d > 0) rail.style.marginTop = Math.round(d) + 'px';
}
function playReveal(){
  try { localStorage.setItem(KEY, '1'); } catch (e) {}
  var name = firstName();
  var o = document.createElement('div');
  o.id = 'ssk-reveal'; o.setAttribute('role', 'presentation');
  o.innerHTML = '<h2 class="rv-title">You’re in' + (name ? ', <em>' + esc(name) + '.</em>' : '<em>.</em>') + '</h2>' +
    '<p class="rv-sub">The Edits Kit is yours.</p><button type="button" class="rv-skip">Skip</button>';
  document.body.appendChild(o);
  root.classList.remove('ssk-veil');
  var gone = false;
  function finish(){ if (gone) return; gone = true; clearTimeout(t); if (o.parentNode) o.parentNode.removeChild(o); }
  var t = setTimeout(finish, 3300);
  $('.rv-skip', o).addEventListener('click', finish);
}
ready(function(){
  build(); hero(); align();
  window.addEventListener('resize', align);
  window.addEventListener('load', align);
  if (reveal) playReveal(); else root.classList.remove('ssk-veil');
});
window.IEK = { update: function(){ hero(); align(); }, replay: function(){ try { localStorage.removeItem(KEY); } catch (e) {} playReveal(); }, rebuild: build };
})();
