// Opt in to the entrance animations defined in style.css under .js-motion.
// Added immediately (not gated behind DOMContentLoaded) so it never delays
// past first paint. Nothing on the page is hidden by default in CSS, so
// even if this line never ran, every section would still render normally.
document.documentElement.classList.add('js-motion');

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

  // Skill detail modals (profil.html)
  const skillModal = document.getElementById('skill-modal');
  if (skillModal) {
    const skillData = {
      audit: {
        title: 'Audit énergétique',
        desc: "Analyser bâti, équipements, consommations et déperditions pour construire un diagnostic exploitable.",
        proof: "Projet 02 — analyse bâti, enveloppe, systèmes, consommations et déperditions.",
        link: 'projets.html#projet02'
      },
      scenarios: {
        title: 'Scénarios & aides',
        desc: "Comparer les bouquets de travaux, les coûts, les gains, les aides et le reste à charge.",
        proof: "Projet 03 — matrice comparative coûts/gains/aides/reste à charge.",
        link: 'projets.html#projet03'
      },
      communication: {
        title: 'Communication client',
        desc: "Vulgariser les données techniques et financières pour préparer l'adhésion et le vote.",
        proof: "Projet 09 — livret, FAQ, supports AG et messages de relance.",
        link: 'projets.html#projet09'
      },
      coordination: {
        title: 'Coordination projet',
        desc: "Suivre consultations, certifications RGE, planning, interfaces acteurs et points de vigilance.",
        proof: "Projet 07 — consultation entreprises, vérification RGE, planning et interfaces.",
        link: 'projets.html#projet07'
      },
      conformite: {
        title: 'Conformité & réception',
        desc: "Structurer les contrôles, réserves, justificatifs, PV de réception et documents de clôture.",
        proof: "Projet 08 — plan de contrôle, réserves, justificatifs et réception.",
        link: 'projets.html#projet08'
      },
      analyse: {
        title: 'Analyse & synthèse',
        desc: "Produire des rapports lisibles, des recommandations hiérarchisées et des supports de décision.",
        proof: null,
        link: null
      }
    };

    const modalBody = document.getElementById('skill-modal-body');
    const modalClose = document.getElementById('skill-modal-close');
    let lastFocused = null;

    const openSkillModal = key => {
      const data = skillData[key];
      if (!data) return;
      modalBody.innerHTML = `
        <h3 id="skill-modal-title">${data.title}</h3>
        <p>${data.desc}</p>
        ${data.proof ? `<div class="modal-proof"><strong>Preuve associée :</strong> ${data.proof}</div>` : ''}
        ${data.link ? `<a href="${data.link}" class="btn btn-primary">Voir le projet <i class="ti ti-arrow-right" aria-hidden="true"></i></a>` : ''}
      `;
      lastFocused = document.activeElement;
      skillModal.hidden = false;
      modalClose.focus();
    };

    const closeSkillModal = () => {
      skillModal.hidden = true;
      if (lastFocused) lastFocused.focus();
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

    modalClose.addEventListener('click', closeSkillModal);
    skillModal.addEventListener('click', event => {
      if (event.target === skillModal) closeSkillModal();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !skillModal.hidden) closeSkillModal();
    });
  }

  // Detailed / compact view toggle (projets.html)
  const viewButtons = document.querySelectorAll('.view-toggle button[data-view]');
  const caseGrid = document.getElementById('case-grid');
  if (viewButtons.length && caseGrid) {
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const isCompact = button.dataset.view === 'compact';
        viewButtons.forEach(b => {
          b.classList.toggle('active', b === button);
          b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
        });
        caseGrid.classList.toggle('view-compact', isCompact);
      });
    });
  }

  // Project category filters (projets.html)
  const filterButtons = document.querySelectorAll('.project-tabs button[data-filter]');
  if (filterButtons.length) {
    const cards = document.querySelectorAll('.case-study[data-category]');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(b => {
          b.classList.toggle('active', b === button);
          b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
        });
        cards.forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.hidden = !show;
        });
      });
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
