(function(){
var DASH = /^\/products\/the-brand-kit\/?$/;
if (!DASH.test(location.pathname) && !window.SSK_CANVAS) return;
var root = document.documentElement;
root.classList.add('ssk-dash');
var KEY = 'bk_welcomed_v1';
var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var seen = '1';
try { seen = localStorage.getItem(KEY); } catch (e) {}
var reveal = !seen && !reduce;
if (reveal) root.classList.add('ssk-veil');
function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
function $(s, c){ return (c || document).querySelector(s); }
function $$(s, c){ return [].slice.call((c || document).querySelectorAll(s)); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]; }); }
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
var card = document.createElement('aside'); card.className = 'ssk-idea'; card.setAttribute('aria-label', 'Launch bonus');
card.innerHTML = '<span class="ssk-idea__k">launch bonus!</span>' +
'<span class="ssk-idea__t">A new way to make everything look like you.</span>' +
'<span class="ssk-idea__s">Your reels, carousels, stories and covers, all in your look. Just tell Claude.</span>' +
'<div class="ssk-idea__row"><span>Free with your engine.</span></div>';
w.querySelector('.media').appendChild(card);
}
}
function build(){
var banner = $('.banner-image');
if (banner && !$('.ssk-fuel')){
var fu = document.createElement('section'); fu.className = 'ssk-fuel';
fu.setAttribute('aria-label', 'AI is not generic because your ideas aren\u2019t. Your ideas fuel this engine.');
var chips = '<span class="ssk-chip ssk-chip--warm"><q>Warm, bookish, slow.</q><span class="ssk-chip__dots"><s style="background:#efe4cf"></s><s style="background:#4d3b2d"></s><s style="background:#bd1b1b"></s></span></span><span class="ssk-chip ssk-chip--loud"><q>Bright, loud, a little silly.</q><span class="ssk-chip__dots"><s style="background:#ffd84d"></s><s style="background:#d6246e"></s><s style="background:#2bb3e6"></s></span></span><span class="ssk-chip ssk-chip--mono"><q>Crisp, modern, black and white.</q><span class="ssk-chip__dots"><s style="background:#ffffff"></s><s style="background:#111111"></s><s style="background:#9b9b9b"></s></span></span><span class="ssk-chip ssk-chip--earthy"><q>Cozy, earthy, handmade.</q><span class="ssk-chip__dots"><s style="background:#dfe3cf"></s><s style="background:#3e4a2c"></s><s style="background:#b5763d"></s></span></span><span class="ssk-chip ssk-chip--bold"><q>Bold, red, no apologies.</q><span class="ssk-chip__dots"><s style="background:#bd1b1b"></s><s style="background:#f8f6ee"></s><s style="background:#1e1e1e"></s></span></span><span class="ssk-chip ssk-chip--dreamy"><q>Soft, dreamy, golden hour.</q><span class="ssk-chip__dots"><s style="background:#fde2cf"></s><s style="background:#f6c9d4"></s><s style="background:#e3a857"></s></span></span><span class="ssk-chip ssk-chip--dark"><q>Moody, rich, after dark.</q><span class="ssk-chip__dots"><s style="background:#2a1f2e"></s><s style="background:#e7c98a"></s><s style="background:#7a2e3a"></s></span></span><span class="ssk-chip ssk-chip--fresh"><q>Fresh, green, morning light.</q><span class="ssk-chip__dots"><s style="background:#e4f4ec"></s><s style="background:#1f6b4a"></s><s style="background:#f2e27a"></s></span></span><span class="ssk-chip ssk-chip--vintage"><q>Vintage, warm, a little grainy.</q><span class="ssk-chip__dots"><s style="background:#e9d3b0"></s><s style="background:#6b3a1f"></s><s style="background:#a8502c"></s></span></span><span class="ssk-chip ssk-chip--sunny"><q>Sunny, beachy, easy.</q><span class="ssk-chip__dots"><s style="background:#cfe9f6"></s><s style="background:#1d5b7a"></s><s style="background:#f4d9a0"></s></span></span><span class="ssk-chip ssk-chip--simple"><q>Simple, honest, lots of white space.</q><span class="ssk-chip__dots"><s style="background:#ffffff"></s><s style="background:#444444"></s><s style="background:#e8e8e8"></s></span></span><span class="ssk-chip ssk-chip--sharp"><q>Sharp, smart, all business.</q><span class="ssk-chip__dots"><s style="background:#1f2a44"></s><s style="background:#ffffff"></s><s style="background:#c9a227"></s></span></span>';
fu.innerHTML = '<div class="ssk-fuel__say"><p class="ssk-fuel__line">AI is not <span class="ssk-fuel__gen">generic</span></p>' +
'<span class="ssk-fuel__because">because your ideas aren\u2019t.<svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2 8 C 60 2, 120 11, 180 6 S 270 3, 298 7"/></svg></span></div>' +
'<div class="ssk-fuel__run" aria-hidden="true"><span class="ssk-fuel__lab"><i><b>\u2190</b><b>\u2190</b><b>\u2190</b></i>Your ideas fuel this engine</span>' +
'<div class="ssk-fuel__lane"><div class="ssk-fuel__track">' + chips + chips + '</div></div></div>';
banner.parentNode.insertBefore(fu, banner.nextSibling);
}
if (banner && !$('.ssk-desk')){
var desk = document.createElement('div'); desk.className = 'ssk-desk';
desk.innerHTML = '<b>Setup happens on your computer.</b> Save this for your laptop.';
banner.parentNode.insertBefore(desk, banner.nextSibling);
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
'<p class="rv-sub">The Brand Kit is yours.</p><button type="button" class="rv-skip">Skip</button>';
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
window.SSK = { update: function(){ hero(); align(); }, replay: function(){ try { localStorage.removeItem(KEY); } catch (e) {} playReveal(); } };
})();