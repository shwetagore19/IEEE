import { hotelsData } from '../data/hotels.js';

export function initHotels() {
  const container = document.querySelector('.hotels__grid');
  if (!container) return;

  container.innerHTML = hotelsData.map((hotel) => {
    // Generate simple filename from hotel name
    // Use exact image path from data
    
    
    
    let safeName = hotel.name;
    if (hotel.name === "Treebo Prasha / Hotel Triton") safeName = "Treebo Prasha  Hotel Triton";
    
    const fallbackScript = "if(this.src.endsWith('.jpg')){this.src=this.src.replace('.jpg','.jpeg');}else if(this.src.endsWith('.jpeg')){this.src=this.src.replace('.jpeg','.png');}else if(this.src.endsWith('.png')){this.src=this.src.replace('.png','.webp');}else if(this.src.endsWith('.webp')){this.src=this.src.replace('.webp','.avif');}else{this.style.display='none';}";
    
    return `
    <article class="hotel-card glass-card" style="display:flex; flex-direction:column;">
      <div class="hotel-card__image-wrap" style="height: 200px; overflow: hidden; border-radius: 8px 8px 0 0; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;">
        <img src="public/images/hotels/${safeName}.jpg" alt="${hotel.name}" class="hotel-card__image" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" onerror="${fallbackScript}">
      </div>


      <div class="hotel-card__content" style="padding: 20px; flex-grow: 1; display:flex; flex-direction:column;">
        <h3 class="hotel-card__name" style="margin-bottom: 15px; font-size: 1.25rem;">${hotel.name}</h3>
        
        <div class="hotel-card__distance-box" style="margin-bottom: 20px; display: flex; align-items: center; gap: 8px; color: var(--text-secondary);">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" width="18" height="18">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span style="font-weight: 500;">${hotel.distance}</span>
        </div>

        <div style="margin-top: auto;">
          <a href="${hotel.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(hotel.name)}`}" target="_blank" rel="noopener noreferrer" class="btn btn--outline btn--sm hotel-card__btn" style="width: 100%; justify-content:center;">
            <span>View on Map</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `}).join('');
}