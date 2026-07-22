(() => {
  const LUCIDE_SRC = 'https://unpkg.com/lucide@1.25.0/dist/umd/lucide.js';
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
    'ti-home-eco': 'house-leaf',
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
    'ti-file-type-pdf': 'file-text',
    'ti-brand-linkedin': 'linkedin'
  };

  const ensureLucide = () => new Promise(resolve => {
    if (window.lucide?.createIcons) {
      resolve();
      return;
    }

    const existing = document.querySelector('script[data-lucide-cdn]');
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', resolve, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = LUCIDE_SRC;
    script.defer = true;
    script.dataset.lucideCdn = 'true';
    script.addEventListener('load', resolve, { once: true });
    script.addEventListener('error', resolve, { once: true });
    document.head.appendChild(script);
  });

  const prepareLucideIcons = (root = document) => {
    root.querySelectorAll('i.ti:not([data-lucide-ready])').forEach(node => {
      if (node.closest('.theme-toggle')) return;
      const tablerName = [...node.classList].find(name => iconMap[name]);
      if (!tablerName) return;
      node.dataset.lucide = iconMap[tablerName];
      node.dataset.lucideReady = 'true';
      node.className = 'lucide-icon';
    });
  };

  const renderLucideIcons = async (root = document) => {
    prepareLucideIcons(root);
    await ensureLucide();
    if (!window.lucide?.createIcons) return;
    window.lucide.createIcons({
      attrs: {
        class: ['lucide-icon'],
        'aria-hidden': 'true',
        'stroke-width': 1.8
      }
    });
  };

  window.renderLucideIcons = renderLucideIcons;

  const start = () => {
    renderLucideIcons();
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) renderLucideIcons(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
