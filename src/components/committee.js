import { committeeData } from '../data/committee.js';

export function initCommittee() {
  const previewContainer = document.querySelector('.committee-preview__grid');
  const modalContainer = document.getElementById('committee-modal');
  const viewFullBtn = document.querySelector('.committee-preview__cta .btn');
  const closeModalBtn = modalContainer?.querySelector('.committee-modal__close');
  const modalOverlay = modalContainer?.querySelector('.committee-modal__overlay');

  if (previewContainer) {
    const featuredMembers = [
      {
        role: "Chief Patron",
        name: "Er. Sameer B. Wagh",
        designation: "Chairman",
        affiliation: "K. K. Wagh Education Society, Nashik",
        photo: "public/images/committee/sameer-wagh.png"
      },
      {
        role: "General Chair",
        name: "Dr. Keshav N. Nandurkar",
        designation: "Director / Principal",
        affiliation: "KKWIEER, Nashik",
        photo: "public/images/committee/keshav-nandurkar.jpg"
      },
      {
        role: "Conference Chair",
        name: "Dr. Preeti D. Bhamre",
        designation: "Head & Conference Chair",
        affiliation: "Dept. of IT, KKWIEER",
        photo: "public/images/committee/preeti-bhamre.webp"
      }
    ];

    previewContainer.innerHTML = featuredMembers.map(member => {
      const initials = member.name.replace(/^(Dr\.|Prof\.|Er\.)\s*/, '').match(/\b\w/g)?.join('').slice(0, 2).toUpperCase() || 'CC';
      return `
        <article class="committee-preview__card glass-card" role="listitem">
          <div class="committee-preview__avatar-wrap">
            ${member.photo ? `
              <img src="${member.photo}" alt="${member.name}" class="committee-preview__avatar-img" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            ` : ''}
            <div class="committee-preview__avatar-fallback" style="${member.photo ? 'display:none;' : 'display:flex;'}" aria-hidden="true">${initials}</div>
          </div>
          <span class="committee-preview__tag">${member.role}</span>
          <h3 class="committee-preview__name">${member.name}</h3>
          <p class="committee-preview__role">${member.designation}</p>
          <p class="committee-preview__affiliation">${member.affiliation}</p>
        </article>
      `;
    }).join('');
  }

  // Populate Full Committee Modal Content
  const modalBody = modalContainer?.querySelector('.committee-modal__body');
  if (modalBody) {
    modalBody.innerHTML = `
      <style>
        .committee-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .committee-table th, .committee-table td { padding: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: left; }
        .committee-table th { background: rgba(255,255,255,0.05); }
      </style>
      
      ${Object.entries(committeeData).map(([key, members]) => {
        if (!members || members.length === 0) return '';
        const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        return `
          <div class="committee-group" style="margin-bottom: 30px;">
            <h3 class="committee-group__title" style="margin-bottom: 15px;">${title}</h3>
            <div style="overflow-x: auto;">
              <table class="committee-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    ${members.some(m => m.title) ? '<th>Role / Title</th>' : ''}
                    <th>Affiliation</th>
                  </tr>
                </thead>
                <tbody>
                  ${members.map(m => `
                    <tr>
                      <td style="font-weight: 600;">${m.name}</td>
                      ${members.some(m => m.title) ? `<td>${m.title || m.lead || ''}</td>` : ''}
                      <td>${m.affiliation || ''}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }).join('')}
    `;
  }

  // Modal open / close handlers
  function openModal() {
    if (!modalContainer) return;
    modalContainer.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      modalContainer.classList.add('committee-modal--open');
      closeModalBtn?.focus();
    }, 10);
  }

  function closeModal() {
    if (!modalContainer) return;
    modalContainer.classList.remove('committee-modal--open');
    setTimeout(() => {
      modalContainer.hidden = true;
      document.body.style.overflow = '';
    }, 250);
  }

  if (viewFullBtn) {
    viewFullBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer && !modalContainer.hidden) {
      closeModal();
    }
  });
}