/* ==========================================
   STAR PIZZA — MAIN.JS
   Parallax · Reveal · Lightbox · Navbar
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════
     1. NAVBAR — scroll state
  ════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ════════════════════════════════
     2. HAMBURGER
  ════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-open');
    }
  });

  /* ════════════════════════════════
     3. ACTIVE NAV LINK on scroll
  ════════════════════════════════ */
  const sections    = document.querySelectorAll('section[id]');
  const navLinkEls  = document.querySelectorAll('.nav-link:not(.nav-cta)');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => sectionObs.observe(s));

  /* ════════════════════════════════
     4. HERO PARALLAX
  ════════════════════════════════ */
  const heroBg      = document.querySelector('.hero-bg-img');
  const heroContent = document.querySelector('.hero-content');

  if (heroBg && heroContent) {
    let ticking = false;

    const onParallax = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const speed   = 0.35;
          // Fond descend lentement
          heroBg.style.transform = `translateY(${scrollY * speed}px) translateZ(0)`;
          // Contenu monte plus vite
          heroContent.style.transform = `translateY(${scrollY * 0.18}px)`;
          heroContent.style.opacity   = Math.max(0, 1 - scrollY / 600);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onParallax, { passive: true });
  }

  /* ════════════════════════════════
     5. REVEAL ON SCROLL
  ════════════════════════════════ */
  // Ajoute .reveal à tous les éléments à animer
  const revealTargets = document.querySelectorAll(
    '.product-card, .pizza-fatale-card, .formule-foot-card, ' +
    '.supplements-section, .side-card, .contact-item, ' +
    '.extras-block, .salades-banner, .pizza-image-banner, ' +
    '.pizza-table-wrap, .section-header'
  );

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    // Décalage en cascade pour les grilles
    const parent = el.closest('.product-grid, .sides-grid');
    if (parent) {
      const siblings = [...parent.children];
      const idx = siblings.indexOf(el);
      if (idx > 0 && idx < 4) {
        el.classList.add(`reveal-delay-${idx}`);
      }
    }
  });

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ════════════════════════════════
     6. LIGHTBOX
  ════════════════════════════════ */
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose   = document.getElementById('lightboxClose');
  const lightboxBd      = document.getElementById('lightboxBackdrop');

  function openLightbox(src, caption) {
    lightboxImg.src = '';          // reset pour forcer le chargement
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(wrap => {
    wrap.addEventListener('click', () => {
      openLightbox(
        wrap.getAttribute('data-lightbox'),
        wrap.getAttribute('data-caption') || ''
      );
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBd.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ════════════════════════════════
     7. FLOATING PARTICLES (hero)
  ════════════════════════════════ */
  const hero = document.querySelector('.hero');
  if (hero) {
    const count = 10;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 30 + 5}%;
        animation-delay: ${Math.random() * 4}s;
        animation-duration: ${Math.random() * 3 + 3}s;
        opacity: ${Math.random() * 0.4 + 0.1};
      `;
      hero.appendChild(p);
    }
  }

  /* ════════════════════════════════
     8. SMOOTH HOVER TILT (cartes)
  ════════════════════════════════ */
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -4;
      const tiltY = dx *  4;
      card.style.transform = `translateY(-5px) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Amélioration de l'expérience mailto : copie de l'e-mail dans le presse-papiers
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const emailMatch = this.getAttribute('href').match(/mailto:(.*)/);
      if (emailMatch && emailMatch[1]) {
        const email = emailMatch[1];
        navigator.clipboard.writeText(email).catch(() => {});
        
        // Petit effet visuel pour confirmer la copie
        const originalText = this.innerText;
        this.innerText = '✉️ Adresse copiée !';
        this.style.color = '#D4A017'; // Gold
        
        setTimeout(() => {
          this.innerText = originalText;
          this.style.color = '';
        }, 2000);
      }
    });
  });

});
