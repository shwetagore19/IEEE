export function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Multi-directional and image falling / rising animation targets
  const scrollTargets = [
    { selector: '.section__tag', animClass: 'reveal-fall-top' },
    { selector: '.section__title', animClass: 'reveal-from-left' },
    { selector: '.section__description', animClass: 'reveal-from-right' },
    
    // Editorial About & Institutions
    { selector: '.about__text-block', animClass: 'reveal-from-left' },
    { selector: '.about__info-card', animClass: 'reveal-from-right' },
    { selector: '.overview__card', animClass: 'reveal-rise-bottom', stagger: true },
    { selector: '.highlights__card', animClass: 'reveal-rise-bottom', stagger: true },
    
    // Timeline alternating convergence
    { selector: '.timeline__item:nth-child(odd) .timeline__content', animClass: 'reveal-from-left' },
    { selector: '.timeline__item:nth-child(even) .timeline__content', animClass: 'reveal-from-right' },
    
    // Technical Tracks with image falling/rising
    { selector: '.track-card', animClass: 'reveal-rise-bottom', stagger: true },
    { selector: '.track-card__image', animClass: 'reveal-fall-top' },
    
    // Committee Members & Portraits
    { selector: '.committee-preview__card', animClass: 'reveal-rise-bottom', stagger: true },
    { selector: '.inspiration__card', animClass: 'reveal-rise-bottom', stagger: true },
    { selector: '.committee-preview__avatar-wrap', animClass: 'reveal-fall-top' },
    
    // Venue & Campus Gallery Images
    { selector: '.venue__content', animClass: 'reveal-from-left' },
    { selector: '.venue__image-main', animClass: 'reveal-fall-top' },
    { selector: '.venue__image-thumb', animClass: 'reveal-rise-bottom', stagger: true },
    { selector: '.gallery__item', animClass: 'reveal-rise-bottom', stagger: true },
    
    // Hotels & Accommodation
    { selector: '.hotel-card', animClass: 'reveal-rise-bottom', stagger: true },
    { selector: '.hotel-card__image', animClass: 'reveal-fall-top' },
    
    // Paper Submission & Registration
    { selector: '.paper-submission__card', animClass: 'reveal-rise-bottom', stagger: true },
    { selector: '.paper-submission__guidelines', animClass: 'reveal-from-left' },
    { selector: '.paper-submission__cta', animClass: 'reveal-from-right' },
    { selector: '.registration__card', animClass: 'reveal-rise-bottom', stagger: true },
    { selector: '.registration__cta', animClass: 'reveal-from-right' },
    
    // Contact & Map
    { selector: '.contact__card', animClass: 'reveal-from-left', stagger: true },
    { selector: '.contact__form-container', animClass: 'reveal-from-right' },
    { selector: '.contact__map', animClass: 'reveal-rise-bottom' }
  ];

  // Re-triggering IntersectionObserver (animates every time when scrolling up or down)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      } else {
        // Remove class when scrolling out of viewport so animation replays every single time!
        entry.target.classList.remove('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  scrollTargets.forEach(({ selector, animClass, stagger }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.classList.add('scroll-reveal-item', animClass);
      if (stagger) {
        el.style.transitionDelay = `${(index % 4) * 90}ms`;
      }
      observer.observe(el);
    });
  });
}