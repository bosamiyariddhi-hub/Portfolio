/* ===================================================
   Riddhi Bosamiya — Portfolio Script
   Clean, minimal interactions only.
   =================================================== */

(function () {
  'use strict';

  // ── Navbar scroll state ──────────────────────────
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ── Mobile menu ──────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    mobileOverlay.classList.add('is-visible');
    navToggle.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    mobileOverlay.classList.remove('is-visible');
    navToggle.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    if (mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ── Smooth scroll ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ── Active nav link on scroll ────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  function highlightActiveLink() {
    const scrollY = window.scrollY + navbar.offsetHeight + 80;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink, { passive: true });

  // ── Intersection Observer: fade-in on scroll ────
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    fadeElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ── PDF Viewer modal ─────────────────────────────
  const pdfModal = document.getElementById('pdfModal');
  const pdfModalFrame = document.getElementById('pdfModalFrame');
  const pdfModalClose = document.getElementById('pdfModalClose');
  const pdfModalBackdrop = document.getElementById('pdfModalBackdrop');

  function openPdfModal(pdfUrl) {
    pdfModalFrame.src = pdfUrl + '#toolbar=0&navpanes=0&scrollbar=1';
    pdfModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closePdfModal() {
    pdfModal.classList.remove('is-open');
    document.body.style.overflow = '';
    // Clear src after transition to stop rendering
    setTimeout(function () {
      pdfModalFrame.src = '';
    }, 300);
  }

  document.querySelectorAll('[data-pdf]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openPdfModal(this.getAttribute('data-pdf'));
    });
  });

  if (pdfModalClose) {
    pdfModalClose.addEventListener('click', closePdfModal);
  }
  if (pdfModalBackdrop) {
    pdfModalBackdrop.addEventListener('click', closePdfModal);
  }

  // ── Certificate modal ────────────────────────────
  const certModal = document.getElementById('certModal');
  const viewCertBtn = document.getElementById('viewCertBtn');
  const certModalClose = document.getElementById('certModalClose');
  const certModalBackdrop = document.getElementById('certModalBackdrop');

  function openCertModal() {
    certModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    certModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (viewCertBtn) {
    viewCertBtn.addEventListener('click', openCertModal);
  }
  if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
  }
  if (certModalBackdrop) {
    certModalBackdrop.addEventListener('click', closeCertModal);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (pdfModal.classList.contains('is-open')) {
        closePdfModal();
      }
      if (certModal.classList.contains('is-open')) {
        closeCertModal();
      }
    }
  });

  // ── Back to top ──────────────────────────────────
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 600) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
