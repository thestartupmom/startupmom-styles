(function(){
/* Instagram Edits Kit course dashboard (v2, Brand Kit vibe). Runs only on the
   product dashboard (or in the canvas preview where window.IEK_CANVAS is set).
   Hides Kajabi's native dashboard and injects one self-contained .ssk-shell
   block: red hero + tilted bonus card, a do-this-first gate, A NOTE FROM ME
   letter, a help card, and the engine-owner community promo. Only the member's
   first name and the first lesson's href are read from the native DOM. */
var DASH = /^\/products\/instagram-edits-kit\/?$/;
if (!DASH.test(location.pathname) && !window.IEK_CANVAS) return;
document.documentElement.classList.add('ssk-dash');

function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
function $(s, c){ return (c || document).querySelector(s); }
function $$(s, c){ return [].slice.call((c || document).querySelectorAll(s)); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]; }); }

function firstName(){
  var t = $('.dashboard-welcome-title'); if (!t) return '';
  var c = t.cloneNode(true); $$('span', c).forEach(function(s){ s.remove(); });
  var full = (c.textContent || '').trim();
  return /@/.test(full) ? '' : (full.split(/\s+/)[0] || '');
}
function firstLessonHref(){
  var a = $('.product-outline-post'); var h = a ? (a.getAttribute('href') || '') : '';
  return h || '#ssk-start';
}

var ICON = 'https://cdn.jsdelivr.net/gh/thestartupmom/naptime-academy-assets@e56cb71da1af99daf2ab8197f141b70f058d0e9a/course-lesson/edits-kit/edits-icon.webp';
var PORTRAIT = 'https://kajabi-storefronts-production.s3.amazonaws.com/file-uploads/sites/2148860783/images/dbb230-80-ce08-bf4c-b6dc04d4eda5_Hi_I_m_Meg_portrait_4_5.jpg';

function markup(hello, l1){
  return '' +
  '<div class="ssk-hero">' +
    '<div class="ssk-hero__media">' +
      '<div class="ssk-hero__body">' +
        '<h1 class="ssk-hero__title">' + hello + '</h1>' +
        '<span class="ssk-hero__sub">Your free add on. The engine you already own can now cut your reels right inside the Edits desktop app, so you edit by talking, right where you post.</span>' +
        '<a class="ssk-hero__btn" href="' + esc(l1) + '">Start lesson 1</a>' +
      '</div>' +
      '<aside class="ssk-idea">' +
        '<div class="ssk-edits">' +
          '<span class="ssk-edits__lbl" aria-hidden="true">it’s here</span>' +
          '<svg class="ssk-edits__arrow" aria-hidden="true" viewBox="0 0 30 36"><path d="M15 3 C 11 13, 19 20, 15 30 M15 30 l-6 -7 M15 30 l6 -7"/></svg>' +
          '<img class="ssk-edits__ic" src="' + ICON + '" alt="Edits app" width="88" height="88">' +
        '</div>' +
        '<span class="ssk-idea__t">Now works with the <em>Edits</em> desktop app.</span>' +
        '<div class="ssk-idea__row"><span>Free with your engine</span></div>' +
      '</aside>' +
    '</div>' +
  '</div>' +
  '<div class="ssk-main">' +
    '<div class="ssk-row">' +
      '<div class="ssk-bodycol">' +
        '<section class="ssk-gate" id="ssk-start">' +
          '<span class="ssk-gate__mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v11"/><path d="M8 11l4 4 4-4"/><path d="M5 20h14"/></svg></span>' +
          '<div class="ssk-gate__body">' +
            '<p class="ssk-gate__ey">Before you connect</p>' +
            '<h3 class="ssk-gate__h">Install your engine first.</h3>' +
            '<p class="ssk-gate__p">Your engine does the work, so make sure it is installed and you have finished <b>module 1 of your setup</b> before you connect to Edits. Install the engine, then come back here and hook it up.</p>' +
          '</div>' +
        '</section>' +
        '<div class="ssk-letter">' +
          '<div class="ssk-letter__from"><img src="' + PORTRAIT + '" alt="" width="46" height="46"><span>A note from me</span></div>' +
          '<h2>Your whole system, now inside <em>Edits.</em></h2>' +
          '<p><b>I told you I’d give you every upgrade free, forever. I meant it.</b> This is one of them. The engine you already own can now hand your finished reel straight to the Edits desktop app, so you edit by talking, right where you post.</p>' +
          '<p><b>Start with Start here.</b> It is the short version, about two minutes. Edits is not a new tool to learn. It is one more place your engine delivers to. Same system, same you, one new door.</p>' +
          '<p>When your first reel comes out of Edits, tag it <b>#startupmomedit</b>. I want to see it.</p>' +
          '<span class="ssk-letter__sig">Meg</span>' +
        '</div>' +
      '</div>' +
      '<div class="ssk-rail">' +
        '<div class="ssk-help">' +
          '<span class="ssk-help__mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9.1 9a3 3 0 1 1 4.6 2.5c-.9.6-1.7 1.2-1.7 2.5"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="9.5"/></svg></span>' +
          '<div><h4>Stuck anywhere?</h4><p>Edits lives on your computer, so open this on your laptop when you connect it.</p><p>Email <a href="mailto:it@thestartupmom.com">it@thestartupmom.com</a> and a real person helps you get connected.</p></div>' +
        '</div>' +
        '<aside class="ssk-club">' +
          '<span class="ssk-club__k">Engine owner price</span>' +
          '<h3 class="ssk-club__h">Come see how I build it, <em>with Claude.</em></h3>' +
          '<p class="ssk-club__p">Inside the community: a live call with me every month, my real workflow, and Naptime Academy.</p>' +
          '<div class="ssk-club__price"><b>$37</b><span>a month, not $47</span></div>' +
          '<a class="ssk-club__go" href="https://www.thestartupmom.com/offers/GeFPUsgV/checkout?coupon_code=COMMUNITY37">Join the community</a>' +
        '</aside>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function build(){
  if ($('.ssk-shell')) return;
  var name = firstName();
  var hello = name ? 'Welcome, <em>' + esc(name) + '.</em>' : 'Welcome <em>in.</em>';
  var shell = document.createElement('div');
  shell.className = 'ssk-shell';
  shell.innerHTML = markup(hello, firstLessonHref());
  var anchor = $('.banner-image') || $('#section-product_body') || document.body;
  if (anchor === document.body) anchor.insertBefore(shell, anchor.firstChild);
  else anchor.parentNode.insertBefore(shell, anchor);
}

ready(build);
window.IEK = { rebuild: build };
})();
