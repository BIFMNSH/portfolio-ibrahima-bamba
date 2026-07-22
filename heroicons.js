(() => {
  const icons = {
    'ti-arrow-right': '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />',
    'ti-arrow-up-right': '<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />',
    'ti-external-link': '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6 12-12m0 0H15m4.5 0V9" />',
    'ti-download': '<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 10.5 12 15m0 0 4.5-4.5M12 15V3" />',
    'ti-user': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0" />',
    'ti-mail': '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615a2.25 2.25 0 0 1-1.07-1.916V6.75" />',
    'ti-send': '<path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.27 3.125A59.77 59.77 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.875L6 12Zm0 0h7.5" />',
    'ti-search': '<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.197 5.197a7.5 7.5 0 0 0 10.606 10.606Z" />',
    'ti-calculator': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75h.008v.008h-.008v-.008Zm0-3h.008v.008h-.008v-.008Zm0-3h.008v.008h-.008V9.75Zm-3 6h.008v.008h-.008v-.008Zm0-3h.008v.008h-.008v-.008Zm0-3h.008v.008h-.008V9.75Zm-3 6h.008v.008H9.75v-.008Zm0-3h.008v.008H9.75v-.008Zm0-3h.008v.008H9.75V9.75ZM6.75 4.5h10.5A2.25 2.25 0 0 1 19.5 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 6.75 4.5Z" />',
    'ti-clipboard-check': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M9 4.5h6m-7.5 0A1.5 1.5 0 0 1 9 3h6a1.5 1.5 0 0 1 1.5 1.5m-9 0h-.75A2.25 2.25 0 0 0 4.5 6.75v12A2.25 2.25 0 0 0 6.75 21h10.5a2.25 2.25 0 0 0 2.25-2.25v-12a2.25 2.25 0 0 0-2.25-2.25h-.75" />',
    'ti-clipboard-list': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5h6m-7.5 0A1.5 1.5 0 0 1 9 3h6a1.5 1.5 0 0 1 1.5 1.5m-9 0h-.75A2.25 2.25 0 0 0 4.5 6.75v12A2.25 2.25 0 0 0 6.75 21h10.5a2.25 2.25 0 0 0 2.25-2.25v-12a2.25 2.25 0 0 0-2.25-2.25h-.75M8.25 10.5h7.5M8.25 14.25h7.5M8.25 18h4.5" />',
    'ti-building': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 21V5.25A2.25 2.25 0 0 1 6.75 3h6a2.25 2.25 0 0 1 2.25 2.25V21m4.5 0V9.75A2.25 2.25 0 0 0 17.25 7.5H15M8.25 6.75h3M8.25 10.5h3M8.25 14.25h3M8.25 18h3" />',
    'ti-chart-dots': '<path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18M7.5 14.25l3-3 3 2.25 4.5-6" />',
    'ti-file-check': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-.988-2.386l-4.751-4.751A3.375 3.375 0 0 0 11.375 3H8.25A2.25 2.25 0 0 0 6 5.25v13.5A2.25 2.25 0 0 0 8.25 21h4.5m.75-15v3.75A2.25 2.25 0 0 0 15.75 12h3.75m-6 6 2.25 2.25L21 15" />',
    'ti-presentation': '<path stroke-linecap="round" stroke-linejoin="round" d="M3 3h18M4.5 3v10.5A2.25 2.25 0 0 0 6.75 15.75h10.5a2.25 2.25 0 0 0 2.25-2.25V3M12 15.75V21m0 0-3-3m3 3 3-3" />',
    'ti-certificate': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-6 1.61 1.115 1.946-.216.98 1.697 1.8.778-.216 1.946L19.5 12l-1.38 1.43.216 1.946-1.8.778-.98 1.697-1.946-.216L12 18.75l-1.61-1.115-1.946.216-.98-1.697-1.8-.778.216-1.946L4.5 12l1.38-1.43-.216-1.946 1.8-.778.98-1.697 1.946.216L12 3.75Z" />',
    'ti-sitemap': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75v4.5m0 0H7.5m4.5 0h4.5M6 17.25h3M15 17.25h3M9 15.75v3A1.5 1.5 0 0 1 7.5 20.25h-3A1.5 1.5 0 0 1 3 18.75v-3a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 9 15.75Zm12 0v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5ZM15 3.75v3A1.5 1.5 0 0 1 13.5 8.25h-3A1.5 1.5 0 0 1 9 6.75v-3a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 3.75Z" />',
    'ti-microscope': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.75 14.25 6m-6 9.75A6.75 6.75 0 0 0 15 22.5h3.75M7.5 15.75h4.5M9 13.5l3-6 3 1.5-3 6L9 13.5Zm6.75-6.75 1.5-3M5.25 21h10.5" />',
    'ti-tools': '<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.83-5.83M11.42 15.17 5.25 21 3 18.75l6.17-6.17M11.42 15.17l3.75-3.75" />',
    'ti-target-arrow': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a4.5 4.5 0 1 1-5.96-5.96m7.84-1.88A8.25 8.25 0 1 0 19.5 12M12 12l9-9m0 0h-5.25M21 3v5.25" />',
    'ti-report-analytics': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-.988-2.386l-4.751-4.751A3.375 3.375 0 0 0 11.375 3H8.25A2.25 2.25 0 0 0 6 5.25v13.5A2.25 2.25 0 0 0 8.25 21h7.5A2.25 2.25 0 0 0 18 18.75M9 15l2.25-2.25L13.5 15l3-4.5" />',
    'ti-folder': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V6.75A2.25 2.25 0 0 1 4.5 4.5h5.379c.597 0 1.169.237 1.591.659l1.06 1.06c.422.422.994.659 1.591.659H19.5a2.25 2.25 0 0 1 2.25 2.25v9A2.25 2.25 0 0 1 19.5 20.25h-15A2.25 2.25 0 0 1 2.25 18v-5.25Z" />',
    'ti-info-circle': '<path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M12 8.25h.008v.008H12V8.25Zm9 3.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />',
    'ti-x': '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />',
    'ti-file-type-pdf': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-.988-2.386l-4.751-4.751A3.375 3.375 0 0 0 11.375 3H8.25A2.25 2.25 0 0 0 6 5.25v13.5A2.25 2.25 0 0 0 8.25 21h7.5A2.25 2.25 0 0 0 18 18.75M9 15h.75a1.5 1.5 0 0 0 0-3H9v6m4.5-6v6h.75a2.25 2.25 0 0 0 0-4.5H13.5m4.5-1.5h3m-3 3h2.25" />',
    'ti-brand-linkedin': '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 8.25v9m0-12v.008M10.5 17.25v-5.1a3.15 3.15 0 0 1 6.3 0v5.1M3.75 3.75h16.5v16.5H3.75V3.75Z" />'
  };

  const renderHeroIcons = (root = document) => {
    root.querySelectorAll('i.ti:not([data-heroicon-rendered])').forEach(node => {
      if (node.closest('.theme-toggle')) return;
      const iconClass = [...node.classList].find(name => icons[name]);
      if (!iconClass) return;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('aria-hidden', node.getAttribute('aria-hidden') || 'true');
      svg.classList.add('heroicon', iconClass);
      svg.innerHTML = icons[iconClass];
      node.dataset.heroiconRendered = 'true';
      node.replaceWith(svg);
    });
  };

  window.renderHeroIcons = renderHeroIcons;

  const start = () => {
    renderHeroIcons();
    new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) renderHeroIcons(node);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
