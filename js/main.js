/* ═══════════════════════════════════════════════════════════
   NexaFlow Website — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Theme toggle ───────────────────────────────────────
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nxf_theme', next);
    });
  }

  // ── Header scroll effect ──────────────────────────────
  const header = document.getElementById('header');
  let lastY = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 32) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Mobile burger menu ────────────────────────────────
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      burger.classList.toggle('active');
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Smooth scroll for anchor links ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 16 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── Animate on Scroll (lightweight AOS) ───────────────
  const aosElements = document.querySelectorAll('[data-aos]');

  if (aosElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    aosElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    aosElements.forEach(function (el) {
      el.classList.add('aos-in');
    });
  }

  // ── Parallax hero glow on mouse move ──────────────────
  var heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      var glow1 = heroSection.querySelector('.hero__glow--1');
      var glow2 = heroSection.querySelector('.hero__glow--2');
      if (glow1) glow1.style.transform = 'translateX(calc(-50% + ' + (x * 30) + 'px)) translateY(' + (y * 20) + 'px)';
      if (glow2) glow2.style.transform = 'translateX(' + (x * -20) + 'px) translateY(' + (y * -15) + 'px)';
    });
  }

  // ── Stagger hero stat shimmer indices ─────────────────
  document.querySelectorAll('.hero__stat-value').forEach(function (el, i) {
    el.style.setProperty('--i', i);
  });

  // ── Subtle parallax on scroll for hero grid ───────────
  var heroGrid = document.querySelector('.hero__grid');
  if (heroGrid) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        heroGrid.style.transform = 'translateY(' + (y * 0.15) + 'px)';
      }
    }, { passive: true });
  }

  // ── Trigger privacy flow line animation on scroll ─────
  var privacyFlow = document.querySelector('.privacy__flow');
  if (privacyFlow && 'IntersectionObserver' in window) {
    var privacyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-triggered');
            privacyObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    privacyObserver.observe(privacyFlow);
  }

  // ── Active nav link highlighting ──────────────────────
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav__links a');

  function highlightNav() {
    var scrollY = window.scrollY;
    sections.forEach(function (section) {
      var top = section.offsetTop - 120;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      navAnchors.forEach(function (a) {
        if (a.getAttribute('href') === '#' + id) {
          if (scrollY >= top && scrollY < bottom) {
            a.style.color = 'var(--text)';
          } else {
            a.style.color = '';
          }
        }
      });
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

})();
