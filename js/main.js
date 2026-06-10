(function () {
  'use strict';

  /* JS работает — включаем reveal-анимации */
  document.documentElement.classList.add('js');

  /* ── file:// — дописываем index.html к ссылкам-папкам,
        чтобы сайт работал при открытии файла напрямую ── */
  if (location.protocol === 'file:') {
    document.querySelectorAll('a[href]').forEach((a) => {
      const raw = a.getAttribute('href');
      if (!raw || /^(https?:|mailto:|tel:|#)/i.test(raw)) return;
      const hashIndex = raw.indexOf('#');
      const path = hashIndex === -1 ? raw : raw.slice(0, hashIndex);
      const hash = hashIndex === -1 ? '' : raw.slice(hashIndex);
      if (!path.endsWith('/')) return;
      a.setAttribute('href', path + 'index.html' + hash);
    });
  }

  /* ── Навбар: стекло при скролле ───────────────────── */
  const nav = document.querySelector('.nav');

  function syncNav() {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();

  /* ── Мобильное меню ───────────────────────────────── */
  const burger = document.querySelector('.nav-burger');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-mobile a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Reveal по мере скролла ───────────────────────── */
  const revealed = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealed.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealed.forEach((node) => observer.observe(node));
  } else {
    revealed.forEach((node) => node.classList.add('is-visible'));
  }

  /* ── Каскадные задержки внутри групп ──────────────── */
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      child.style.setProperty('--reveal-delay', `${Math.min(index * 0.08, 0.4)}s`);
    });
  });

  /* ── Бесшовная лента программ ─────────────────────── */
  document.querySelectorAll('[data-marquee]').forEach((track) => {
    track.innerHTML += track.innerHTML;
  });
})();
