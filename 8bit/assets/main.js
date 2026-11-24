// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  const more = nav.querySelector('details.more');
  if (more) more.open = false;
}));

// Close "More" when clicking elsewhere
document.addEventListener('click', e => {
  const more = document.querySelector('details.more');
  if (more && more.open && !more.contains(e.target)) more.open = false;
});

// Project image lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
document.querySelectorAll('.thumb').forEach(btn => btn.addEventListener('click', () => {
  lbImg.src = btn.dataset.full;
  lbImg.alt = btn.querySelector('img').alt;
  lbCap.textContent = btn.dataset.cap || '';
  if (typeof lb.showModal === 'function') lb.showModal();
  else window.open(btn.dataset.full, '_blank');
}));
document.getElementById('lb-close').addEventListener('click', () => lb.close());
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

document.getElementById('yr').textContent = new Date().getFullYear();

// Theme switcher
const themeSelect = document.getElementById('theme-select');
themeSelect.value = document.documentElement.getAttribute('data-theme') || 'purple';
themeSelect.addEventListener('change', () => {
  document.documentElement.setAttribute('data-theme', themeSelect.value);
  try { localStorage.setItem('theme', themeSelect.value); } catch (e) {}
});
