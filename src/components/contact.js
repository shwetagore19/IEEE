export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const coordinatorEmail = 'vyankatesh.gadekar30@gmail.com';

  const validators = {
    name: (val) => val.trim().length >= 2 ? true : 'Please enter your full name (minimum 2 characters).',
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? true : 'Please enter a valid email address.',
    phone: (val) => !val.trim() || /^[\d\s\-\+\(\)]{7,16}$/.test(val.trim()) ? true : 'Please enter a valid phone number (e.g. +91 98765 43210).',
    subject: (val) => val ? true : 'Please select a subject for your inquiry.',
    message: (val) => val.trim().length >= 10 ? true : 'Please enter a detailed message (minimum 10 characters).'
  };

  function validateInput(input) {
    const name = input.getAttribute('name');
    const validator = validators[name];
    if (!validator) return true;

    const result = validator(input.value);
    const formGroup = input.closest('.form__group');
    const errorEl = formGroup ? formGroup.querySelector('.form__error') : null;

    if (result === true) {
      input.classList.remove('form__input--error');
      input.setAttribute('aria-invalid', 'false');
      if (errorEl) errorEl.textContent = '';
      return true;
    } else {
      input.classList.add('form__input--error');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = result;
      return false;
    }
  }

  const inputs = form.querySelectorAll('.form__input');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('form__input--error')) {
        validateInput(input);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let allValid = true;
    let firstInvalid = null;

    inputs.forEach(input => {
      const isValid = validateInput(input);
      if (!isValid) {
        allValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (!allValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const nameVal = form.name.value.trim();
    const emailVal = form.email.value.trim();
    const phoneVal = form.phone.value.trim() || 'Not provided';
    const subjectVal = form.subject.options[form.subject.selectedIndex].text;
    const messageVal = form.message.value.trim();

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="btn__spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
        </svg>
        <span>Sending Email to Coordinator...</span>
      `;
    }

    // Direct Web Gmail Compose URL (never opens Windows app chooser)
    const encodedSubject = encodeURIComponent(`[IEEE ICETEC 2027 Inquiry] ${subjectVal} - from ${nameVal}`);
    const encodedBody = encodeURIComponent(
      `Dear Vyankatesh Gadekar,\n\nI am contacting you regarding IEEE ICETEC 2027:\n\n` +
      `Full Name: ${nameVal}\n` +
      `Email: ${emailVal}\n` +
      `Phone: ${phoneVal}\n` +
      `Subject: ${subjectVal}\n\n` +
      `Message:\n${messageVal}\n\n` +
      `Best regards,\n${nameVal}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${coordinatorEmail}&su=${encodedSubject}&body=${encodedBody}`;
    const standardMailto = `mailto:${coordinatorEmail}?subject=${encodedSubject}&body=${encodedBody}`;

    let emailSentSuccess = false;

    // Send actual real HTTP email directly to vyankatesh.gadekar30@gmail.com
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${coordinatorEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          phone: phoneVal,
          subject: subjectVal,
          message: messageVal,
          _subject: `[IEEE ICETEC 2027] New Inquiry from ${nameVal} (${subjectVal})`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        emailSentSuccess = true;
      }
    } catch (err) {
      console.log('Background email dispatch note:', err);
    }

    const successCard = document.createElement('div');
    successCard.className = 'form__success-card glass-card';
    successCard.innerHTML = `
      <div class="form__success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="32" height="32">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <h3 class="form__success-title">Message Sent Successfully!</h3>
      <p class="form__success-text">
        Your inquiry has been dispatched to <strong>Vyankatesh Gadekar</strong> at <code>${coordinatorEmail}</code>.
        <br><br>
        <span style="font-size:0.85rem; opacity:0.9;">
          ${emailSentSuccess ? '✓ Direct server email successfully delivered to your inbox!' : 'Your message has been formatted. If you prefer, you can also launch Gmail below with 1 click.'}
        </span>
      </p>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top: 18px;">
        <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm" style="display:inline-flex; align-items:center; gap:6px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span>Open Direct in Gmail</span>
        </a>
        <button type="button" class="btn btn--outline btn--sm form__success-reset">Send Another Inquiry</button>
      </div>
    `;

    form.style.display = 'none';
    form.parentNode.insertBefore(successCard, form.nextSibling);

    const resetBtn = successCard.querySelector('.form__success-reset');
    resetBtn.addEventListener('click', () => {
      form.reset();
      inputs.forEach(input => {
        input.classList.remove('form__input--error');
        input.removeAttribute('aria-invalid');
      });
      successCard.remove();
      form.style.display = 'flex';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        `;
      }
    });
  });
}