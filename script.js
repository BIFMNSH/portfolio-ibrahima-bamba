document.documentElement.classList.add('js-motion');

const THEME_STORAGE_KEY = 'ifb-theme';

const getStoredTheme = () => {
  try {
    const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return theme === 'day' || theme === 'night' ? theme : null;
  } catch {
    return null;
  }
};

const getPreferredTheme = () => (
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
);

const applyTheme = theme => {
  const nextTheme = theme === 'night' ? 'night' : 'day';
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme === 'night' ? 'dark' : 'light';

  document.querySelectorAll('[data-theme-toggle]').forEach(toggle => {
    const isNight = nextTheme === 'night';
    toggle.setAttribute('aria-pressed', String(isNight));
    toggle.setAttribute('aria-label', isNight ? 'Activer le thème jour' : 'Activer le thème nuit');

    const icon = toggle.querySelector('i');
    const label = toggle.querySelector('.theme-toggle-text');
    if (icon) icon.className = isNight ? 'ti ti-sun' : 'ti ti-moon';
    if (label) label.textContent = isNight ? 'Jour' : 'Nuit';
  });
};

applyTheme(getStoredTheme() || getPreferredTheme());

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  applyTheme(document.documentElement.dataset.theme || getPreferredTheme());

  document.querySelectorAll('[data-theme-toggle]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'night' ? 'day' : 'night';
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {}
      applyTheme(nextTheme);
    });
  });

  const menuButton = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  };

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const shouldOpen = !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', shouldOpen);
      menuButton.setAttribute('aria-expanded', String(shouldOpen));
      menuButton.setAttribute('aria-label', shouldOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', event => {
      if (!mobileMenu.classList.contains('open')) return;
      if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const nom = document.getElementById('nom')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const objet = document.getElementById('objet')?.value || 'Contact portfolio';
      const message = document.getElementById('message')?.value.trim() || '';
      const body = `Bonjour Ibrahima,\n\n${message || 'Je souhaite échanger avec vous au sujet de votre profil en rénovation énergétique.'}\n\nNom : ${nom}\nEmail : ${email}`;

      if (formStatus) formStatus.textContent = 'Votre message est prêt. Ouverture de votre messagerie…';
      window.location.href = `mailto:bamba.bif@gmail.com?subject=${encodeURIComponent(`Portfolio - ${objet}`)}&body=${encodeURIComponent(body)}`;
    });
  }

  const skillModal = document.getElementById('skill-modal');
  if (skillModal) {
    const skillData = {
      audit: {
        title: 'Audit énergétique',
        desc: 'Analyser le bâti, les équipements, les consommations et les déperditions pour construire un diagnostic exploitable.',
        proof: 'Projet 2 : analyse du bâti, de l’enveloppe, des systèmes et des consommations.',
        link: 'projets.html#projet02'
      },
      scenarios: {
        title: 'Scénarios & aides',
        desc: 'Comparer les bouquets de travaux, les coûts, les gains, les aides et le reste à charge.',
        proof: 'Projet 3 : comparaison des coûts, gains, aides et reste à charge.',
        link: 'projets.html#projet03'
      },
      communication: {
        title: 'Communication client',
        desc: 'Vulgariser les données techniques et financières pour préparer l’adhésion et la décision.',
        proof: 'Projet 9 : supports d’assemblée générale, livret et FAQ.',
        link: 'projets.html#projet09'
      },
      coordination: {
        title: 'Coordination projet',
        desc: 'Suivre les consultations, qualifications, plannings, interfaces et points de vigilance.',
        proof: 'Projet 7 : préparation du chantier, planning et répartition des responsabilités.',
        link: 'projets.html#projet07'
      },
      conformite: {
        title: 'Conformité & réception',
        desc: 'Structurer les contrôles, réserves, justificatifs et documents de clôture.',
        proof: 'Projet 8 : plan de contrôle, réserves et réception.',
        link: 'projets.html#projet08'
      },
      analyse: {
        title: 'Analyse & synthèse',
        desc: 'Produire des rapports lisibles, des recommandations hiérarchisées et des supports de décision.',
        proof: null,
        link: null
      }
    };

    const modalBody = document.getElementById('skill-modal-body');
    const modalClose = document.getElementById('skill-modal-close');
    const backgroundRegions = document.querySelectorAll('body > nav, body > .nav-mobile, body > main, body > footer, body > .skip-link');
    let lastFocused = null;

    const setBackgroundInert = isInert => {
      backgroundRegions.forEach(region => { region.inert = isInert; });
      document.body.classList.toggle('modal-open', isInert);
    };

    const openSkillModal = key => {
      const data = skillData[key];
      if (!data || !modalBody || !modalClose) return;

      modalBody.innerHTML = `
        <h3 id="skill-modal-title">${data.title}</h3>
        <p id="skill-modal-description">${data.desc}</p>
        ${data.proof ? `<div class="modal-proof"><strong>Preuve associée :</strong> ${data.proof}</div>` : ''}
        ${data.link ? `<a href="${data.link}" class="btn btn-primary">Voir le projet <i class="ti ti-arrow-right" aria-hidden="true"></i></a>` : ''}
      `;

      lastFocused = document.activeElement;
      skillModal.hidden = false;
      requestAnimationFrame(() => skillModal.classList.add('visible'));
      setBackgroundInert(true);
      modalClose.focus();
    };

    const closeSkillModal = () => {
      if (skillModal.hidden) return;
      setBackgroundInert(false);
      skillModal.classList.remove('visible');

      const finish = () => {
        skillModal.hidden = true;
        if (lastFocused instanceof HTMLElement) lastFocused.focus();
      };

      reduceMotion ? finish() : window.setTimeout(finish, 180);
    };

    document.querySelectorAll('.skill-card[data-skill]').forEach(card => {
      card.addEventListener('click', () => openSkillModal(card.dataset.skill));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openSkillModal(card.dataset.skill);
        }
      });
    });

    modalClose?.addEventListener('click', closeSkillModal);
    skillModal.addEventListener('click', event => {
      if (event.target === skillModal) closeSkillModal();
    });

    document.addEventListener('keydown', event => {
      if (skillModal.hidden) return;
      if (event.key === 'Escape') {
        closeSkillModal();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [...skillModal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

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
        const page = document.documentElement;
        const maximum = page.scrollHeight - page.clientHeight;
        progress.style.transform = `scaleX(${maximum > 0 ? page.scrollTop / maximum : 0})`;
        ticking = false;
      });
    }, { passive: true });
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = [...document.querySelectorAll(
      '.section-wrap .section-header, .principle, .feature-card, .card, .position-box, .timeline-card, .contact-link, .proof-table, .next-banner'
    )].filter(element => !element.closest('.skill-modal'));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const index = Number(element.dataset.revealIndex || 0);
        element.classList.add('motion-revealed');
        element.animate(
          [
            { opacity: 0, transform: 'translateY(24px) scale(.98)', filter: 'blur(8px)' },
            { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
          ],
          {
            duration: 620,
            delay: Math.min((index % 5) * 60, 200),
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'both'
          }
        );
        observer.unobserve(element);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    targets.forEach((element, index) => {
      element.dataset.revealIndex = String(index);
      observer.observe(element);
    });
  }

  if (!reduceMotion && finePointer) {
    const tiltTargets = [...document.querySelectorAll(
      '.feature-card, .skill-card, .timeline-card, .card, .position-box, .contact-link, .next-banner'
    )].filter(element => !element.closest('.skill-modal') && !element.classList.contains('dpe-card'));

    tiltTargets.forEach(element => {
      let frame = 0;
      element.classList.add('motion-3d');

      element.addEventListener('pointermove', event => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          element.style.setProperty('--rx', `${(-y * 4.5).toFixed(2)}deg`);
          element.style.setProperty('--ry', `${(x * 4.5).toFixed(2)}deg`);
          element.style.setProperty('--tz', '14px');
          element.classList.add('is-tilting');
          frame = 0;
        });
      }, { passive: true });

      element.addEventListener('pointerleave', () => {
        element.classList.remove('is-tilting');
        element.style.removeProperty('--rx');
        element.style.removeProperty('--ry');
        element.style.removeProperty('--tz');
      });
    });

    const hero = document.querySelector('.hero, .page-hero');
    if (hero) {
      let frame = 0;
      hero.addEventListener('pointermove', event => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          hero.style.setProperty('--gx', `${(((event.clientX - rect.left) / rect.width) - 0.5) * 60}px`);
          hero.style.setProperty('--gy', `${(((event.clientY - rect.top) / rect.height) - 0.5) * 60}px`);
          frame = 0;
        });
      }, { passive: true });
    }
  }
});
