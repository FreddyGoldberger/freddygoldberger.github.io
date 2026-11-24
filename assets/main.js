// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
const more = nav.querySelector('details.more');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  if (more) more.open = false;
}));
document.addEventListener('click', e => {
  if (more && more.open && !more.contains(e.target)) more.open = false;
});

// Data particles under the portrait (static, generated once)
const particles = document.getElementById('particles');
if (particles) {
  let seed = 7;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  let out = '';
  for (let i = 0; i < 70; i++) {
    const y = rand() * 165;
    const spread = 18 + (1 - y / 165) * 70;           // wide near the photo, narrow lower down
    const x = 95 + (rand() - 0.5) * 2 * spread;
    const s = rand() < 0.18 ? 4 : 2;
    const o = (0.85 - (y / 165) * 0.7) * (0.4 + rand() * 0.6);
    out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s}" height="${s}" opacity="${o.toFixed(2)}"/>`;
  }
  particles.innerHTML = out;
}

// Crosshair cursor (fine pointers only, respects reduced motion)
const cursor = document.querySelector('.cyber-cursor');
const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)');
if (cursor && fine.matches) {
  document.documentElement.classList.add('cursor-on');
  const interactive = 'a, button, summary, select, input, textarea, label, [role="button"]';
  window.addEventListener('pointermove', e => {
    cursor.style.visibility = 'visible';
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    cursor.dataset.active = e.target.closest(interactive) ? 'true' : 'false';
  }, { passive: true });
  document.addEventListener('pointerleave', () => { cursor.style.visibility = 'hidden'; });
  window.addEventListener('blur', () => { cursor.style.visibility = 'hidden'; });
}

// Project image lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
document.querySelectorAll('.thumb').forEach(btn => btn.addEventListener('click', () => {
  lbImg.src = btn.dataset.full;
  lbImg.alt = btn.querySelector('img').alt;
  lbCap.textContent = '> ' + (btn.dataset.cap || '');
  if (typeof lb.showModal === 'function') lb.showModal();
  else window.open(btn.dataset.full, '_blank');
}));
document.getElementById('lb-close').addEventListener('click', () => lb.close());
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

document.getElementById('yr').textContent = new Date().getFullYear();

// Easter egg: the blinking cursor in the footer warps to the 8-bit site
const egg = document.getElementById('egg');
const warp = document.getElementById('warp');
if (egg && warp) {
  egg.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // allow open-in-new-tab
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    e.preventDefault();
    warp.classList.add('on');
    setTimeout(() => { window.location.href = egg.href; }, 1100);
  });
  // if the user comes back with the Back button, hide the overlay again
  window.addEventListener('pageshow', () => warp.classList.remove('on'));
}
