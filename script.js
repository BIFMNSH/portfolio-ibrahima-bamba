document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('nav-mobile');

  const closeMenu = () => {
    if (!menu || !btn) return;
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    if (!menu || !btn) return;
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  };

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isOpen = menu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', event => {
      const clickedInsideMenu = menu.contains(event.target);
      const clickedButton = btn.contains(event.target);
      if (!clickedInsideMenu && !clickedButton && menu.classList.contains('open')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const nom = document.getElementById('nom')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const objet = document.getElementById('objet')?.value || 'Contact portfolio';
      const message = document.getElementById('message')?.value.trim() || '';
      const body = `Bonjour Ibrahima,\n\n${message || 'Je souhaite échanger avec vous au sujet de votre profil en rénovation énergétique.'}\n\nNom : ${nom}\nEmail : ${email}`;
      window.location.href = `mailto:bamba.bif@gmail.com?subject=${encodeURIComponent('Portfolio - ' + objet)}&body=${encodeURIComponent(body)}`;
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll progress bar
  if (!reduceMotion) {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const pct = max > 0 ? h.scrollTop / max : 0;
        progress.style.transform = `scaleX(${pct})`;
        ticking = false;
      });
    }, { passive: true });
  }

  // Scroll-triggered reveal — progressive enhancement: elements stay visible
  // by default; only elements already out of view at load get the hidden
  // "reveal" state, so a JS failure never hides content.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    // Only small, repeatable list/card items — never a container that is
    // itself an ancestor of another reveal target, and never a block taller
    // than a viewport (large elements can fail to ever reach the area
    // threshold below, which would hide their content permanently).
    const revealSelectors = '.kpi-card, .feature-card, .skill-card, .timeline-card, .result-card, .livrable-item, .role-item, .value-item, .method-step';
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll(revealSelectors).forEach(el => {
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyVisible) return;
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  // Hero glow follows the pointer
  if (!reduceMotion) {
    const heroEl = document.querySelector('.hero, .page-hero');
    if (heroEl) {
      heroEl.addEventListener('mousemove', event => {
        const rect = heroEl.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width - 0.5) * 60;
        const py = ((event.clientY - rect.top) / rect.height - 0.5) * 60;
        heroEl.style.setProperty('--gx', `${px}px`);
        heroEl.style.setProperty('--gy', `${py}px`);
      });
    }
  }

  // DPE card: subtle pointer tilt
  if (!reduceMotion) {
    const dpeCard = document.querySelector('.dpe-card');
    if (dpeCard) {
      dpeCard.addEventListener('mousemove', event => {
        const rect = dpeCard.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        dpeCard.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) scale(1.01)`;
      });
      dpeCard.addEventListener('mouseleave', () => {
        dpeCard.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)';
      });
    }
  }
});
