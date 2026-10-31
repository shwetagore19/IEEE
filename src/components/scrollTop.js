export function initScrollTop() {
  const scrollTop = document.getElementById('scroll-top');
  if (!scrollTop) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 300) {
          scrollTop.classList.add('scroll-top--visible');
        } else {
          scrollTop.classList.remove('scroll-top--visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
}