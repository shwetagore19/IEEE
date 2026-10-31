import { technicalTracks } from '../data/technicalTracks.js';

export function initTracks() {
  const container = document.querySelector('.tracks__grid');
  if (!container) return;

  const iconMap = {
    cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
    bot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><rect x="3" y="8" width="18" height="12" rx="3"/><path d="M8 14h.01M16 14h.01M9 18h6"/></svg>`,
    robot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v4M3 12h4M17 12h4M12 17v4"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>`
  };

  // 1. Render Compact Cards (Removed expand arrow)
  container.innerHTML = technicalTracks.map((track, index) => `
    <article class="track-card glass-card" role="listitem" style="cursor: pointer; transition: all 0.3s ease;" data-index="${index}">
      <div class="track-card__compact" style="display: flex; align-items: center; padding: 20px;">
        <div class="track-card__icon-box" style="margin-right: 20px; flex-shrink: 0;">
          <div class="track-card__icon" aria-hidden="true" style="width: 50px; height: 50px; background: rgba(0, 240, 255, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #00f0ff;">
            ${iconMap[track.icon] || iconMap.cpu}
          </div>
        </div>
        <h3 class="track-card__title" style="margin: 0; font-size: 1.2rem; flex-grow: 1;">${track.title}</h3>
      </div>
    </article>
  `).join('');

  // 2. Create Global Modal (if not exists)
  if (!document.getElementById('track-modal')) {
    const modalHTML = `
      <div id="track-modal" class="track-modal" style="display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; padding: 20px; opacity: 0; transition: opacity 0.3s ease;">
        <div class="track-modal__overlay" style="position: absolute; inset: 0; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);"></div>
        <div class="track-modal__content glass-card" style="position: relative; width: 100%; max-width: 800px; max-height: 90vh; overflow-y: auto; background: var(--surface); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 16px; padding: 0; transform: translateY(20px); transition: transform 0.3s ease; display: flex; flex-direction: column;">
          
          <button class="track-modal__close" aria-label="Close" style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.5); border: none; color: #fff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: background 0.2s;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <div id="track-modal-image-container" style="width: 100%; height: 250px; display: none;">
            <img id="track-modal-image" src="" alt="" style="width: 100%; height: 100%; object-fit: cover; border-bottom: 1px solid rgba(255,255,255,0.1);">
          </div>

          <div style="padding: 30px;">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
               <div id="track-modal-icon" style="width: 50px; height: 50px; background: rgba(0, 240, 255, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #00f0ff; margin-right: 15px;"></div>
               <h2 id="track-modal-title" style="font-size: 1.8rem; margin: 0; color: #ffffff;"></h2>
            </div>
            
            <div id="track-modal-points" style="margin-bottom: 30px; font-size: 1.1rem; line-height: 1.6; color: rgba(255, 255, 255, 0.9);"></div>

            <h3 style="font-size: 1.2rem; margin-bottom: 15px; color: #00f0ff; text-transform: uppercase; letter-spacing: 1px;">Scope &amp; Core Domains</h3>
            <div id="track-modal-topics" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal = document.getElementById('track-modal');
  const modalOverlay = modal.querySelector('.track-modal__overlay');
  const modalClose = modal.querySelector('.track-modal__close');
  const modalContent = modal.querySelector('.track-modal__content');
  
  const mTitle = document.getElementById('track-modal-title');
  const mIcon = document.getElementById('track-modal-icon');
  const mPoints = document.getElementById('track-modal-points');
  const mTopics = document.getElementById('track-modal-topics');
  const mImageContainer = document.getElementById('track-modal-image-container');
  const mImage = document.getElementById('track-modal-image');

  function closeModal() {
    modal.style.opacity = '0';
    modalContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  // 3. Add Event Listeners to Cards
  const cards = container.querySelectorAll('.track-card');
  cards.forEach(card => {
    // Add hover effect
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px)';
      card.style.boxShadow = '0 10px 30px -10px rgba(0, 240, 255, 0.2)';
      card.style.borderColor = 'rgba(0, 240, 255, 0.3)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.borderColor = '';
    });

    card.addEventListener('click', () => {
      const idx = card.getAttribute('data-index');
      const track = technicalTracks[idx];
      
      mTitle.textContent = track.title;
      mIcon.innerHTML = iconMap[track.icon] || iconMap.cpu;
      
      if (track.image) {
        mImage.src = track.image;
        mImage.alt = track.title;
        mImageContainer.style.display = 'block';
      } else {
        mImageContainer.style.display = 'none';
      }

      if (track.keyPoints && track.keyPoints.length) {
        mPoints.innerHTML = `<ul style="list-style:none; padding:0; margin:0;">
          ${track.keyPoints.map(p => `<li style="margin-bottom:12px; display:flex; align-items:flex-start;">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" style="width:18px; height:18px; margin-right:12px; margin-top:3px; flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
            <span style="color: #ffffff;">${p}</span>
          </li>`).join('')}
        </ul>`;
      } else {
        mPoints.innerHTML = '';
      }

      mTopics.innerHTML = track.topics.map(t => `<span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 8px 15px; border-radius: 20px; font-size: 0.95rem; color: #ffffff;">${t}</span>`).join('');

      modal.style.display = 'flex';
      // Force reflow
      void modal.offsetWidth;
      modal.style.opacity = '1';
      modalContent.style.transform = 'translateY(0)';
      document.body.style.overflow = 'hidden';
    });
  });
}