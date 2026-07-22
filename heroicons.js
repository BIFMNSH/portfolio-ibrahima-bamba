(() => {
  const LUCIDE_SRC = 'https://unpkg.com/lucide@1.25.0/dist/umd/lucide.js';

  const loadGlobalCoherence = () => {
    if (document.querySelector('link[href^="global-coherence.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'global-coherence.css?v=20260722';
    document.head.appendChild(link);
  };

  const normalizePortfolioUI = () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const pageClass = {
      'index.html': 'page-home',
      'profil.html': 'page-profile',
      'roadmap.html': 'page-roadmap',
      'projets.html': 'page-projects',
      'nohoba.html': 'page-nohoba',
      'contact.html': 'page-contact'
    }[path];
    if (pageClass) document.body.classList.add(pageClass);

    document.querySelectorAll('.nav-center a[href="projets.html"], .nav-mobile a[href="projets.html"], .footer-links a[href="projets.html"]').forEach(link => {
      link.textContent = 'Projets';
    });

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', '#4E5337');

    const profileProof = document.querySelector('.profile-hero-copy .hero-proof');
    if (profileProof) {
      profileProof.style.flexWrap = 'wrap';
      profileProof.style.whiteSpace = 'normal';
    }
  };

  const iconMap = {
    'ti-arrow-right': 'arrow-right',
    'ti-arrow-up-right': 'arrow-up-right',
    'ti-external-link': 'external-link',
    'ti-download': 'download',
    'ti-user': 'user-round',
    'ti-users': 'users-round',
    'ti-mail': 'mail',
    'ti-send': 'send',
    'ti-search': 'search',
    'ti-calculator': 'calculator',
    'ti-clipboard-check': 'clipboard-check',
    'ti-clipboard-list': 'clipboard-list',
    'ti-building': 'building-2',
    'ti-chart-dots': 'chart-no-axes-combined',
    'ti-file-check': 'file-check-2',
    'ti-presentation': 'presentation',
    'ti-certificate': 'badge-check',
    'ti-sitemap': 'network',
    'ti-microscope': 'microscope',
    'ti-tools': 'wrench',
    'ti-target-arrow': 'target',
    'ti-report-analytics': 'chart-column-big',
    'ti-home-eco': 'house',
    'ti-file-invoice': 'file-text',
    'ti-rss': 'rss',
    'ti-route': 'route',
    'ti-folder': 'folder',
    'ti-info-circle': 'info',
    'ti-x': 'x',
    'ti-clipboard-text': 'clipboard-list',
    'ti-file-description': 'file-text',
    'ti-calendar-stats': 'calendar-days',
    'ti-layout-dashboard': 'layout-dashboard',
    'ti-shield-lock': 'shield-check',
    'ti-file-type-pdf': 'file-text'
  };

  const brandIconMap = {
    'ti-brand-linkedin': '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />'
  };

  let lucidePromise = null;
  let rendering = false;

  const ensureLucide = () => {
    if (window.lucide?.createIcons) return Promise.resolve(true);
    if (lucidePromise) return lucidePromise;

    lucidePromise = new Promise(resolve => {
      const existing = document.querySelector('script[data-lucide-cdn]');
      if (existing) {
        existing.addEventListener('load', () => resolve(Boolean(window.lucide?.createIcons)), { once: true });
        existing.addEventListener('error', () => resolve(false), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = LUCIDE_SRC;
      script.defer = true;
      script.dataset.lucideCdn = 'true';
      script.addEventListener('load', () => resolve(Boolean(window.lucide?.createIcons)), { once: true });
      script.addEventListener('error', () => resolve(false), { once: true });
      document.head.appendChild(script);
    });

    return lucidePromise;
  };

  const replaceWithBrandIcon = (node, path) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('stroke', 'none');
    svg.setAttribute('aria-hidden', node.getAttribute('aria-hidden') || 'true');
    svg.classList.add('lucide-icon', 'brand-icon');
    svg.innerHTML = path;
    node.replaceWith(svg);
  };

  const renderBrandIcons = (root = document) => {
    const candidates = [];
    if (root.matches?.('i.ti:not([data-brand-icon-rendered])')) candidates.push(root);
    root.querySelectorAll?.('i.ti:not([data-brand-icon-rendered])').forEach(node => candidates.push(node));

    candidates.forEach(node => {
      const brandName = [...node.classList].find(name => brandIconMap[name]);
      if (!brandName) return;
      node.dataset.brandIconRendered = 'true';
      replaceWithBrandIcon(node, brandIconMap[brandName]);
    });
  };

  const prepareLucideIcons = (root = document) => {
    renderBrandIcons(root);

    const candidates = [];
    if (root.matches?.('i.ti:not([data-lucide-ready])')) candidates.push(root);
    root.querySelectorAll?.('i.ti:not([data-lucide-ready])').forEach(node => candidates.push(node));

    candidates.forEach(node => {
      if (node.closest('.theme-toggle')) return;
      const tablerName = [...node.classList].find(name => iconMap[name]);
      if (!tablerName) return;
      node.dataset.lucide = iconMap[tablerName];
      node.dataset.lucideReady = 'true';
      node.className = 'lucide-icon';
    });
  };

  const renderLucideIcons = async (root = document) => {
    if (rendering) return;
    rendering = true;
    prepareLucideIcons(root);
    const ready = await ensureLucide();
    if (ready) {
      window.lucide.createIcons({
        attrs: {
          class: ['lucide-icon'],
          'aria-hidden': 'true',
          'stroke-width': 1.8
        }
      });
    }
    rendering = false;
  };

  window.renderLucideIcons = renderLucideIcons;

  const start = () => {
    loadGlobalCoherence();
    normalizePortfolioUI();
    renderLucideIcons();
    window.setTimeout(renderLucideIcons, 250);
    window.setTimeout(renderLucideIcons, 900);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();