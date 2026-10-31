export function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  const sunIcon = toggle?.querySelector('.theme-toggle__icon--sun');
  const moonIcon = toggle?.querySelector('.theme-toggle__icon--moon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('icetec_theme', theme);

    if (toggle) {
      if (theme === 'light') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
        toggle.setAttribute('aria-label', 'Switch to dark theme');
        toggle.setAttribute('title', 'Switch to dark theme');
      } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
        toggle.setAttribute('aria-label', 'Switch to light theme');
        toggle.setAttribute('title', 'Switch to light theme');
      }
    }
  }

  const savedTheme = localStorage.getItem('icetec_theme') || 'dark';
  applyTheme(savedTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
}

export function initHero() {
  // Hero CTA smooth scroll hooks
  const heroCtas = document.querySelectorAll('.hero__cta-group a[href^="#"], .hero__scroll-indicator');
  heroCtas.forEach(cta => {
    cta.addEventListener('click', (e) => {
      const href = cta.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const header = document.getElementById('header');
          const headerOffset = header ? header.offsetHeight : 70;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}