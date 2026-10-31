export function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const navLinks = document.querySelectorAll('.header__nav-link[href^="#"], .header__dropdown-link[href^="#"], .mobile-menu__link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  const scrollThreshold = 40;

  function handleScroll() {
    if (!header) return;
    const currentScroll = window.scrollY;
    if (currentScroll > scrollThreshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  function openMobileMenu() {
    if (!mobileMenu || !mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('mobile-menu--open');
    if (mobileOverlay) mobileOverlay.classList.add('mobile-overlay--open');
    document.body.style.overflow = 'hidden';
    const firstLink = mobileMenu.querySelector('.mobile-menu__link');
    if (firstLink) firstLink.focus();
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('mobile-menu--open');
    if (mobileOverlay) mobileOverlay.classList.remove('mobile-overlay--open');
    document.body.style.overflow = '';
    mobileToggle.focus();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
        closeMobileMenu();
      }
    }
  }

  function updateActiveNav() {
    const headerHeight = header ? header.offsetHeight : 70;
    const scrollPos = window.scrollY + headerHeight + 80;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          const isActive = href === `#${id}`;
          link.classList.toggle('active', isActive);
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('keydown', handleKeydown);

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = header ? header.offsetHeight : 70;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
      if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
        closeMobileMenu();
      }
    });
  });

  handleScroll();
  updateActiveNav();
}