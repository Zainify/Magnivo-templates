/* ==========================================================================
   SparkleClean - JavaScript Interactive Logic
   Controls: Navigation, Cost Estimator, FAQ Accordion, Booking Toast
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------
  // 0. Active Navigation Highlight based on Page URL
  // ------------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ------------------------------------------------------------------
  // 1. Mobile Navigation Toggle
  // ------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.textContent = isExpanded ? '✕' : '☰';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // ------------------------------------------------------------------
  // 2. Interactive Price Estimator Logic
  // ------------------------------------------------------------------
  const state = {
    bedrooms: 2,
    bathrooms: 2,
    serviceType: 'standard', // standard, deep, moveout
    frequency: 'weekly',     // weekly, biweekly, monthly, onetime
    addons: []
  };

  const prices = {
    basePerBedroom: 30,
    basePerBathroom: 25,
    serviceTypeMultiplier: {
      standard: 1.0,
      deep: 1.5,
      moveout: 1.8
    },
    frequencyDiscount: {
      weekly: 0.20,   // 20% off
      biweekly: 0.15, // 15% off
      monthly: 0.10,  // 10% off
      onetime: 0.00   // Full price
    },
    addonPrices: {
      oven: 35,
      fridge: 30,
      windows: 45,
      laundry: 25,
      balcony: 30
    }
  };

  function updateCalculatorUI() {
    // Calculate Base
    const roomCost = (state.bedrooms * prices.basePerBedroom) + (state.bathrooms * prices.basePerBathroom) + 50;
    const typeAdjusted = roomCost * prices.serviceTypeMultiplier[state.serviceType];
    
    // Addons cost
    let addonsTotal = 0;
    state.addons.forEach(addon => {
      addonsTotal += prices.addonPrices[addon] || 0;
    });

    // Discount
    const subtotal = typeAdjusted + addonsTotal;
    const discountAmount = subtotal * prices.frequencyDiscount[state.frequency];
    const finalTotal = Math.round(subtotal - discountAmount);

    // Update UI elements
    const totalAmountEl = document.getElementById('calc-total');
    const summaryBreakdownEl = document.getElementById('summary-breakdown');

    if (totalAmountEl) {
      totalAmountEl.textContent = `$${finalTotal}`;
    }

    if (summaryBreakdownEl) {
      let freqText = 'One-time Service';
      if (state.frequency === 'weekly') freqText = 'Weekly (Save 20%)';
      if (state.frequency === 'biweekly') freqText = 'Bi-Weekly (Save 15%)';
      if (state.frequency === 'monthly') freqText = 'Monthly (Save 10%)';

      summaryBreakdownEl.innerHTML = `
        <div class="summary-line">
          <span>Home Size:</span>
          <strong>${state.bedrooms} Bed, ${state.bathrooms} Bath</strong>
        </div>
        <div class="summary-line">
          <span>Clean Type:</span>
          <strong style="text-transform: capitalize;">${state.serviceType} Clean</strong>
        </div>
        <div class="summary-line">
          <span>Frequency:</span>
          <strong>${freqText}</strong>
        </div>
        ${state.addons.length > 0 ? `
          <div class="summary-line">
            <span>Add-ons (${state.addons.length}):</span>
            <strong>+$${addonsTotal}</strong>
          </div>
        ` : ''}
      `;
    }
  }

  // Handle Bedrooms & Bathrooms selection buttons
  document.querySelectorAll('.calc-btn[data-type]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = btn.getAttribute('data-type');
      const val = parseInt(btn.getAttribute('data-value'), 10);

      if (type === 'bedrooms' || type === 'bathrooms') {
        state[type] = val;
        // Toggle active button sibling
        btn.parentElement.querySelectorAll('.calc-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCalculatorUI();
      }
    });
  });

  // Handle Service Type buttons
  document.querySelectorAll('.calc-btn[data-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.getAttribute('data-service');
      state.serviceType = service;
      btn.parentElement.querySelectorAll('.calc-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCalculatorUI();
    });
  });

  // Handle Frequency buttons
  document.querySelectorAll('.calc-btn[data-freq]').forEach(btn => {
    btn.addEventListener('click', () => {
      const freq = btn.getAttribute('data-freq');
      state.frequency = freq;
      btn.parentElement.querySelectorAll('.calc-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCalculatorUI();
    });
  });

  // Handle Addon checkboxes
  document.querySelectorAll('.addon-checkbox').forEach(chk => {
    chk.addEventListener('change', () => {
      const addon = chk.value;
      if (chk.checked) {
        if (!state.addons.includes(addon)) state.addons.push(addon);
      } else {
        state.addons = state.addons.filter(a => a !== addon);
      }
      updateCalculatorUI();
    });
  });

  // Initialize Calculator
  updateCalculatorUI();

  // ------------------------------------------------------------------
  // 3. FAQ Accordion Logic
  // ------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all other accordion items
        faqItems.forEach(i => i.classList.remove('open'));

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ------------------------------------------------------------------
  // 4. Booking & Contact Form Submission
  // ------------------------------------------------------------------
  const bookingForm = document.getElementById('booking-form');
  const heroBookingForm = document.getElementById('hero-booking-form');
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg') || toast;
    msgEl.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  if (heroBookingForm) {
    heroBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('hero-name')?.value || 'Valued Customer';
      const date = document.getElementById('hero-date')?.value || 'your scheduled date';

      showToast(`Thank you, ${name}! Your quote request for ${date} has been submitted.`);
      heroBookingForm.reset();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value || 'Valued Customer';
      const date = document.getElementById('form-date')?.value || 'your scheduled date';

      showToast(`Thank you, ${name}! Your booking request for ${date} has been submitted.`);
      bookingForm.reset();
    });
  }

  // Gallery Filtering
  const galleryTabs = document.querySelectorAll('.gallery-tab-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------
  // 5. ZIP Code Service Coverage Checker
  // ------------------------------------------------------------------
  const zipForm = document.getElementById('zip-checker-form');
  const zipInput = document.getElementById('zip-input');
  const zipResult = document.getElementById('zip-result');

  if (zipForm && zipInput && zipResult) {
    const validZipCodes = ['10001', '10002', '90210', '90211', '60601', '60602', '75001', '75002', '30301', '98101', '33101', '02108', '77001', '80202', '85001'];

    zipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = zipInput.value.trim();
      if (!code || code.length < 5) {
        zipResult.className = 'zip-result-message error';
        zipResult.textContent = 'Please enter a valid 5-digit US ZIP code.';
        return;
      }

      // Check against list or format
      if (validZipCodes.includes(code) || /^\d{5}$/.test(code)) {
        zipResult.className = 'zip-result-message success';
        zipResult.innerHTML = `Great news! ZIP Code <strong>${code}</strong> is in our daily service area. Teams are available!`;
      } else {
        zipResult.className = 'zip-result-message error';
        zipResult.textContent = `Sorry, ZIP code ${code} is currently outside our standard coverage. Call (800) 555-0199 for custom scheduling.`;
      }
    });
  }

  // ------------------------------------------------------------------
  // 6. Interactive Cleaning Checklist Tabs
  // ------------------------------------------------------------------
  const checklistTabs = document.querySelectorAll('.checklist-tab-btn');
  const checklistContent = document.getElementById('checklist-content');

  const checklistsData = {
    kitchen: [
      { title: 'Countertops & Backsplash', desc: 'Wiped, sanitized, and polished to remove oil stains and food splatters.' },
      { title: 'Sink & Faucet Polishing', desc: 'Scrubbed free of lime scale, water stains, and disinfected thoroughly.' },
      { title: 'Appliance Exterior Wipedown', desc: 'Oven exterior, microwave inside & out, refrigerator surface and handles.' },
      { title: 'Cabinet Doors & Hardware', desc: 'Hand-wiped to eliminate grease accumulation and fingerprint marks.' },
      { title: 'Trash Emptying & Sanitizing', desc: 'Bin emptied, liner replaced, and container disinfected.' }
    ],
    bathroom: [
      { title: 'Shower Glass & Tile Scrubbing', desc: 'Hard water residue removed and tiles scrubbed with anti-fungal cleaner.' },
      { title: 'Toilet Sanitization', desc: 'Full interior & exterior disinfection including base and flush handle.' },
      { title: 'Vanity & Mirror Polish', desc: 'Streak-free mirror clarity and sanitized countertop surfaces.' },
      { title: 'Fixture & Chrome Buffing', desc: 'Faucets and towel racks polished to high shine.' },
      { title: 'Floor Scrubbing & Mopping', desc: 'Scrubbed grout lines and disinfected tile flooring.' }
    ],
    bedrooms: [
      { title: 'Bed Making & Linen Change', desc: 'Fresh sheets fitted neatly and pillows fluffed upon request.' },
      { title: 'High & Low Dusting', desc: 'Ceiling fans, picture frames, nightstands, and lamp shades dusted.' },
      { title: 'Under-Bed Vacuuming', desc: 'REACHable areas underneath beds vacuumed clean.' },
      { title: 'Mirrors & Glass Wiped', desc: 'Vanity mirrors and window ledges cleaned.' },
      { title: 'Baseboards & Trim Wiped', desc: 'Dust removed from baseboards and door casings.' }
    ],
    living: [
      { title: 'Furniture & Sofa Vacuuming', desc: 'Cushions vacuumed and leather or fabric surfaces wiped clean.' },
      { title: 'Electronics & Media Shelves', desc: 'TV screens and electronics carefully dusted with microfiber.' },
      { title: 'Hardwood & Carpet Care', desc: 'Vacuumed wall-to-wall and damp mopped with wood-safe cleaner.' },
      { title: 'Light Switches & Handles', desc: 'High-touch areas disinfected throughout the living space.' },
      { title: 'Window Sills & Blinds', desc: 'Blinds dusted and window sills wiped free of debris.' }
    ]
  };

  if (checklistTabs.length > 0 && checklistContent) {
    function renderChecklist(roomKey) {
      const items = checklistsData[roomKey] || checklistsData['kitchen'];
      checklistContent.innerHTML = items.map(item => `
        <div class="checklist-item">
          <div class="checklist-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <div class="checklist-item-title">${item.title}</div>
            <div class="checklist-item-desc">${item.desc}</div>
          </div>
        </div>
      `).join('');
    }

    checklistTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        checklistTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const room = tab.getAttribute('data-room');
        renderChecklist(room);
      });
    });

    renderChecklist('kitchen');
  }

  // ------------------------------------------------------------------
  // 7. Gallery Modal Lightbox
  // ------------------------------------------------------------------
  const modalOverlay = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');

  if (modalOverlay && modalImg) {
    document.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const img = card.querySelector('.gallery-img')?.src;
        const title = card.querySelector('.gallery-title')?.textContent;
        const desc = card.querySelector('.gallery-desc')?.textContent;

        if (img) {
          modalImg.src = img;
          if (modalTitle) modalTitle.textContent = title || 'Project Showcase';
          if (modalDesc) modalDesc.textContent = desc || '';
          modalOverlay.classList.add('active');
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------
  // 8. Contact & Newsletter Forms
  // ------------------------------------------------------------------
  const contactForm = document.getElementById('contact-page-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'Valued Customer';
      showToast(`Thank you, ${name}! Your inquiry has been sent. We'll reply within 2 hours.`);
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to SparkleClean cleaning tips!');
      newsletterForm.reset();
    });
  }

  // Quick Book button scroll to calculator or booking section
  document.querySelectorAll('.scroll-to-booking').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = document.getElementById('booking') || document.getElementById('hero');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
