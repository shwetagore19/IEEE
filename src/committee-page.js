import { committeeData } from './data/committee.js';
import { initThemeToggle } from './components/hero.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  
  // Mobile Nav Toggle setup for committee page
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
        mobileMenu.classList.remove('mobile-menu--open');
        if (mobileOverlay) mobileOverlay.classList.remove('mobile-overlay--open');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('mobile-menu--open');
        if (mobileOverlay) mobileOverlay.classList.add('mobile-overlay--open');
        document.body.style.overflow = 'hidden';
      }
    });
  }
  
  if (mobileClose) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('mobile-menu--open');
      if (mobileOverlay) mobileOverlay.classList.remove('mobile-overlay--open');
      document.body.style.overflow = '';
    });
  }
  
  const container = document.getElementById('full-committee-container');
  if (!container) return;

  // Render Committee Data in a beautiful grid
  
  container.innerHTML = Object.entries(committeeData).map(([key, members]) => {
    if (!members || members.length === 0) return '';
    const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    
    let content = '';
    
    if (key === 'technicalProgramCommittee') {
      content = `
        <div style="overflow-x: auto;">
          <table class="glass-card" style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid rgba(0, 240, 255, 0.2); background: rgba(255,255,255,0.05);">
                <th style="padding: 15px 20px; font-weight: 600;">Member Name</th>
              </tr>
            </thead>
            <tbody>
              ${members.map(m => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;" onmouseover="this.style.background='rgba(0, 240, 255, 0.05)'" onmouseout="this.style.background='transparent'">
                  <td style="padding: 15px 20px;">${m.name}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      content = `
        <div class="committee-preview__grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:25px;">
          ${members.map(m => {
            const initials = m.name.replace(/^(Dr\.|Prof\.|Er\.)\s*/, '').match(/\b\w/g)?.join('').slice(0, 2).toUpperCase() || 'CC';
            return `
            <article class="committee-preview__card glass-card" style="display:flex; flex-direction:column; align-items:center; text-align:center;">
              <div class="committee-preview__avatar-wrap">
                <img src="public/images/committee/${m.name}.jpg" alt="${m.name}" class="committee-preview__avatar-img" loading="lazy" onerror="if(this.src.endsWith('.jpg')){this.src=this.src.replace('.jpg','.png');}else if(this.src.endsWith('.png')){this.src=this.src.replace('.png','.jpeg');}else if(this.src.endsWith('.jpeg')){this.src=this.src.replace('.jpeg','.webp');}else{this.style.display='none'; this.nextElementSibling.style.display='flex';}">
                <div class="committee-preview__avatar-fallback" style="display:none;" aria-hidden="true">${initials}</div>
              </div>
              ${m.role ? `<span class="committee-preview__tag" style="margin-bottom:8px;">${m.role}</span>` : ''}
              ${m.title ? `<span class="committee-preview__tag" style="margin-bottom:8px;">${m.title}</span>` : ''}
              <h3 class="committee-preview__name" style="font-size: 1.1rem; margin-bottom: 5px;">${m.name}</h3>
              ${m.designation ? `<p class="committee-preview__role" style="font-size: 0.9rem;">${m.designation}</p>` : ''}
              ${m.affiliation ? `<p class="committee-preview__affiliation" style="font-size:0.85rem; opacity:0.8;">${m.affiliation}</p>` : ''}
            </article>
            `;
          }).join('')}
        </div>
      `;
    }
    
    return `
      <div class="committee-group" style="margin-bottom: 50px;">
        <h3 class="committee-group__title" style="margin-bottom: 25px; border-bottom: 2px solid var(--accent); display: inline-block; padding-bottom: 5px;">${title}</h3>
        ${content}
      </div>
    `;
  }).join('');

});
