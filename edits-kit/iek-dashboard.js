(function(){
/* Instagram Edits Kit course dashboard. Runs only on the product dashboard
   (or in the canvas preview where window.IEK_CANVAS is set). Restyles Kajabi's
   standard dashboard: red hero, an install->connect->create tile strip built
   from the course outline, a short letter, a help card, a first-visit reveal. */
var DASH = /^\/products\/instagram-edits-kit\/?$/;
if (!DASH.test(location.pathname) && !window.IEK_CANVAS) return;
var root = document.documentElement;
root.classList.add('iek-dash');
var KEY = 'iek_welcomed_v1';
var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var seen = '1';
try { seen = localStorage.getItem(KEY); } catch (e) {}
var reveal = !seen && !reduce;
if (reveal) root.classList.add('iek-veil');

function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
function $(s, c){ return (c || document).querySelector(s); }
function $$(s, c){ return [].slice.call((c || document).querySelectorAll(s)); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]; }); }

function lessons(){
  return $$('.product-outline-post').map(function(a){
    var m = (a.getAttribute('href') || '').match(/\/posts\/(\d+)/), ic = $('.progress-icon', a);
    return {href: a.getAttribute('href') || '', post: m ? m[1] : '',
            done: !!(ic && ic.classList.contains('progress-icon-100')),
            title: (($('.media-body', a) || a).textContent || '').trim()};
  }).filter(function(l){ return l.post; });
}
function firstName(){
  var t = $('.dashboard-welcome-title'); if (!t) return '';
  var full = t.getAttribute('data-iek-name');
  if (full == null){
    var c = t.cloneNode(true); $$('span', c).forEach(function(s){ s.remove(); });
    full = (c.textContent || '').trim(); t.setAttribute('data-iek-name', full);
  }
  return /@/.test(full) ? '' : (full.split(/\s+/)[0] || '');
}

/* three fixed tiles, matched to the outline by index */
var TILES = [
  {tag:'install', ic:'<path d="M12 3v12M8 11l4 4 4-4"/><path d="M5 19h14"/>'},
  {tag:'connect', ic:'<rect x="3" y="8" width="8" height="8" rx="2"/><path d="M11 12h5a3 3 0 0 0 3-3V6"/><circle cx="19" cy="5" r="1.4"/>'},
  {tag:'create',  ic:'<path d="M5 15a4 4 0 0 0 8 0V7a3 3 0 0 0-6 0"/><path d="M15 10l2-2 2 2-2 2zM17 8l-1-1"/>'}
];

function hero(){
  var w = $('.dashboard-welcome'); if (!w) return;
  var list = lessons(), started = list.some(function(l){ return l.done; });
  var t = $('.dashboard-welcome-title', w), name = firstName();
  if (t) t.innerHTML = (started ? 'Welcome back' : 'Welcome') + (name ? ', <em>' + esc(name) + '.</em>' : ' <em>in.</em>');
  var sub = $('.dashboard-welcome-subtitle', w), btn = $('.dashboard-welcome-btn', w), mb = $('.media-body', w);
  if (sub){
    var nx = $('.ssk-next', sub);
    if (!nx){ nx = document.createElement('span'); nx.className = 'ssk-next'; sub.appendChild(nx); }
    var next = null;
    list.forEach(function(l){ if (!next && !l.done) next = l; });
    if (!next && list.length) next = list[list.length-1];
    nx.innerHTML = next ? (started ? 'Next up: ' : 'Start with ') + '<b>' + esc(next.title) + '</b>' : '';
    if (btn && next){ btn.setAttribute('href', next.href); btn.textContent = started ? 'Keep going' : 'Start lesson 1'; }
  }
  if (btn && mb && btn.parentNode !== mb) mb.appendChild(btn);
  /* the computer-setup note */
  if (mb && !$('.iek-desk', w)){
    var d = document.createElement('div'); d.className = 'iek-desk';
    d.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>' +
      '<span><b>Setup happens on your computer.</b> Edits is a desktop app, so open this on your laptop when you connect it.</span>';
    mb.appendChild(d);
  }
}

function strip(){
  var w = $('.dashboard-welcome'); if (!w || $('.iek-steps')) return;
  var list = lessons(); if (!list.length) return;
  var wrap = document.createElement('nav'); wrap.className = 'iek-steps'; wrap.setAttribute('aria-label', 'The three steps');
  list.slice(0,3).forEach(function(l, i){
    var cfg = TILES[i] || TILES[2];
    var a = document.createElement('a'); a.className = 'iek-tile'; a.href = l.href;
    a.innerHTML =
      '<div class="iek-tile__top"><span class="iek-tile__ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + cfg.ic + '</svg></span>' +
      '<span class="iek-tile__tag' + (l.done ? ' is-done' : '') + '">' + (l.done ? 'done' : cfg.tag) + '</span></div>' +
      '<span class="iek-tile__name">' + esc(l.title) + '</span>' +
      '<span class="iek-tile__go">' + (l.done ? 'Revisit' : (i === 0 ? 'Start here' : 'Open')) + '</span>';
    wrap.appendChild(a);
  });
  w.parentNode.insertBefore(wrap, w.nextSibling);
}

function letter(){
  /* mark the first dashboard-text block as the calm letter */
  var blocks = $$('.dashboard-text');
  blocks.forEach(function(b){ b.classList.add('iek-bare'); });
}

function help(){
  var rail = $('#section-product_sidebar'); if (!rail || $('.iek-help', rail)) return;
  var card = document.createElement('div'); card.className = 'iek-help';
  card.innerHTML = '<h4>Stuck anywhere?</h4><p>Email <a href="mailto:it@thestartupmom.com">it@thestartupmom.com</a> and a real person helps you get Edits connected.</p>';
  rail.appendChild(card);
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
  var o = document.createElement('div');
  o.id = 'iek-reveal'; o.setAttribute('role', 'presentation');
  o.innerHTML = '<h2 class="rv-title">Your Edits Kit is <em>ready.</em></h2>' +
    '<p class="rv-sub">Let’s get you editing by voice.</p><button type="button" class="rv-skip">Skip</button>';
  document.body.appendChild(o);
  root.classList.remove('iek-veil');
  var gone = false;
  function finish(){ if (gone) return; gone = true; clearTimeout(t); if (o.parentNode) o.parentNode.removeChild(o); }
  var t = setTimeout(finish, 3300);
  $('.rv-skip', o).addEventListener('click', finish);
}

ready(function(){
  hero(); strip(); letter(); help(); align();
  window.addEventListener('resize', align);
  window.addEventListener('load', align);
  if (reveal) playReveal(); else root.classList.remove('iek-veil');
});
window.IEK = { update: function(){ hero(); strip(); align(); }, replay: function(){ try { localStorage.removeItem(KEY); } catch (e) {} playReveal(); } };
})();
