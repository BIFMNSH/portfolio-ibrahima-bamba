(() => {
  const bar = document.getElementById('scrollBar');
  const topButton = document.getElementById('backToTop');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  function updateScrollState() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (bar) bar.style.width = pct + '%';
    if (topButton) topButton.classList.toggle('visible', window.scrollY > 500);

    let current = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 140) current = '#' + section.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === current));
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || '';
      const duration = 900;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = target * progress;
        el.textContent = value.toLocaleString('fr-FR', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('.count').forEach(el => countObserver.observe(el));
  if (topButton) topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
})();
