import { initCommittee } from './components/committee.js';
import { initNavigation } from './components/navigation.js';
import { initHero, initThemeToggle } from './components/hero.js';
import { initTimeline } from './components/timeline.js';
import { initTracks } from './components/tracks.js';
import { initHotels } from './components/hotels.js';
import { initContactForm } from './components/contact.js';
import { initGallery } from './components/gallery.js';
import { initScrollTop } from './components/scrollTop.js';
import { initScrollAnimations } from './components/scrollAnimations.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initHero();
  initTracks();
  initTimeline();
  initCommittee();
  initHotels();
  initGallery();
  initContactForm();
  initScrollTop();
  initScrollAnimations();

  console.log('IEEE ICETEC 2027 - Modern IEEE Conference Portal initialized successfully.');
});

window.addEventListener('error', (e) => {
  console.error('Portal application error:', e.error || e.message);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});