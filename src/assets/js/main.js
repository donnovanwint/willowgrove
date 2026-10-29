(() => {
  const doc = document.documentElement;
  doc.classList.remove('no-js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Mobile menu
  const header = $('.site-header');
  const btn = $('.menu-btn');
  const setMenu = open => {
    header.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn?.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  $$('.nav-list a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Gentle scroll reveal
  const rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  // Giving amount chips
  $$('.amt').forEach(b => b.addEventListener('click', () => {
    $$('.amt').forEach(x => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
  }));

  // Front-end only forms (no backend yet)
  $$('form[data-demo]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const ok = $('.form-ok', f.parentElement) || $('.form-ok', f);
    if (ok) { ok.classList.add('show'); ok.focus?.(); }
    f.reset();
  }));
})();
