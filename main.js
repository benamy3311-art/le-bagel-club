(function () {
  'use strict';

  /* Menú móvil: botón de mostrar/ocultar con aria-expanded. */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu');
  var mq = window.matchMedia('(min-width: 48rem)');

  if (btn && nav) {
    btn.hidden = false;

    var label = btn.querySelector('.menu-btn__label');
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Cerrar' : 'Menú';
      nav.classList.toggle('is-open', open);
    };
    var isOpen = function () { return btn.getAttribute('aria-expanded') === 'true'; };

    btn.addEventListener('click', function () { setOpen(!isOpen()); });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { setOpen(false); btn.focus(); }
    });

    document.addEventListener('click', function (e) {
      if (isOpen() && !nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });

    var onChange = function () { if (mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* Aparición suave al entrar en pantalla. El CSS solo oculta si no se pide reducir movimiento. */
  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* La mascota baila al pasar el cursor o al tocarla. */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.hero__mascot, .bagel__mascot').forEach(function (m) {
    var dance = function () {
      if (reduce.matches || m.classList.contains('is-dancing')) return;
      m.classList.add('is-dancing');
    };
    m.addEventListener('animationend', function () {
      m.classList.remove('is-dancing');
      m.style.animation = 'none';
    });
    m.addEventListener('pointerenter', dance);
    m.addEventListener('click', dance);
  });
})();
