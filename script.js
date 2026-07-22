// Charge l'accent orange commun à toutes les pages.
(() => {
  if (document.querySelector('link[href^="decision-orange.css"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'decision-orange.css?v=20260722-palette';
  document.head.appendChild(link);
})();

// Charge le rendu SVG Lucide en amelioration progressive.
(() => {
  if (document.querySelector('script[src^="heroicons.js"]')) return;
  const script = document.createElement('script');
  script.src = 'heroicons.js?v=20260722-lucide-fix';
  script.defer = true;
  document.head.appendChild(script);
})();

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

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  const closeMenu = () => {
    if (!hamburger || !mobileMenu) return;
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Ouvrir le menu');
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const willOpen = !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', willOpen);
      hamburger.setAttribute('aria-expanded', String(willOpen));
      hamburger.setAttribute('aria-label', willOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', event => {
      if (!mobileMenu.classList.contains('open')) return;
      if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) closeMenu();
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
    const status = document.getElementById('form-status');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const nom = document.getElementById('nom')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const objet = document.getElementById('objet')?.value || 'Contact portfolio';
      const message = document.getElementById('message')?.value.trim() || '';
      const body = `Bonjour Ibrahima,\n\n${message || 'Je souhaite échanger avec vous au sujet de votre profil en rénovation énergétique.'}\n\nNom : ${nom}\nEmail : ${email}`;
      if (status) status.textContent = 'Votre message est prêt. Ouverture de votre messagerie…';
      window.location.href = `mailto:bamba.bif@gmail.com?subject=${encodeURIComponent('Portfolio - ' + objet)}&body=${encodeURIComponent(body)}`;
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
        proof: 'Projet 3 : matrice comparative coûts, gains, aides et reste à charge.',
        link: 'projets.html#projet03'
      },
      communication: {
        title: 'Communication client',
        desc: 'Vulgariser les données techniques et financières pour préparer l’adhésion et le vote.',
        proof: 'Projet 9 : livret, FAQ, supports AG et synthèse de décision.',
        link: 'projets.html#projet09'
      },
      coordination: {
        title: 'Coordination projet',
        desc: 'Suivre les consultations, qualifications RGE, plannings, interfaces et points de vigilance.',
        proof: 'Projet 7 : préparation chantier, planning et interfaces.',
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

    const setBackgroundInert = value => {
      backgroundRegions.forEach(region => { region.inert = value; });
      document.body.classList.toggle('modal-open', value);
    };

    const closeSkillModal = () => {
      if (skillModal.hidden) return;
      setBackgroundInert(false);
      skillModal.classList.remove('visible');
      skillModal.hidden = true;
      if (lastFocused) lastFocused.focus();
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
    const updateProgress = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      progress.style.transform = `scaleX(${max > 0 ? root.scrollTop / max : 0})`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    }, { passive: true });
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = [...document.querySelectorAll('.section-wrap .section-header, .principle, .feature-card, .card, .position-box, .timeline-card, .contact-link, .proof-table, .next-banner')]
      .filter(element => !element.closest('.skill-modal'));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('motion-revealed');
        entry.target.animate(
          [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 520, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' }
        );
        observer.unobserve(entry.target);
      });
    }, { threshold: .14, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(target => observer.observe(target));
  }

  if (!reduceMotion && finePointer) {
    document.querySelectorAll('.feature-card, .timeline-card, .contact-link, .next-banner').forEach(element => {
      element.addEventListener('pointerenter', () => element.classList.add('is-tilting'));
      element.addEventListener('pointerleave', () => element.classList.remove('is-tilting'));
    });
  }
});
