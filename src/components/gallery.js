const galleryImages = [
  { src: 'public/images/clg1.jpg', alt: 'K. K. Wagh Institute Campus View', caption: 'K. K. Wagh Institute Main Campus View' },
  { src: 'public/images/clg2.jpg', alt: 'K. K. Wagh Academic Building & Quadrangle', caption: 'Academic Complex & Quadrangle' },
  { src: 'public/images/clg3.jpg', alt: 'Advanced Engineering Laboratories & Research Centers', caption: 'Advanced Engineering Research Labs' },
  { src: 'public/images/clg4.jpg', alt: 'Central Library & Digital Knowledge Hub', caption: 'Central Digital Library' },
  { src: 'public/images/clg5.jpg', alt: 'Auditorium & Modern Seminar Halls', caption: 'Conference Auditorium & Seminar Hall' },
  { src: 'public/images/clg6.jpg', alt: 'Campus Entrance & Green Walkways', caption: 'Institute Main Entrance & Campus Walkway' }
];

let currentIndex = 0;

export function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('.lightbox__image');
  const lightboxCaption = lightbox?.querySelector('.lightbox__caption');
  const lightboxCounter = lightbox?.querySelector('.lightbox__counter');
  const closeBtn = lightbox?.querySelector('.lightbox__close');
  const prevBtn = lightbox?.querySelector('.lightbox__prev');
  const nextBtn = lightbox?.querySelector('.lightbox__next');

  function updateLightbox() {
    if (!lightboxImage || !lightboxCaption) return;
    const item = galleryImages[currentIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCaption.textContent = item.caption;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    }
  }

  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    updateLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      lightbox.classList.add('lightbox--open');
      closeBtn?.focus();
    }, 10);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('lightbox--open');
    setTimeout(() => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    }, 250);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
  }

  // Gallery items in Gallery section
  const galleryItems = document.querySelectorAll('.gallery__item');
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  // Venue section thumbnails
  const venueThumbnails = document.querySelectorAll('.venue__image-thumb, .venue__image-main');
  venueThumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => openLightbox(index % galleryImages.length));
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index % galleryImages.length);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox__overlay')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });
}