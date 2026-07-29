/**
 * Cleaner Site Template 2 - Main JavaScript
 * Plain, Professional Logic without Emojis or Fancy Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initChecklistTabs();
  initCalculator();
  initZipChecker();
  initForms();
});

/* -------------------------------------------------------------------------- */
/* 1. Mobile Navigation Toggle                                                 */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 2. Interactive Room Cleaning Checklist Tabs                                */
/* -------------------------------------------------------------------------- */
function initChecklistTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.style.display = 'grid';
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 3. Real-Time Price Estimator Calculator                                    */
/* -------------------------------------------------------------------------- */
function initCalculator() {
  const calcContainer = document.getElementById('calc-widget');
  if (!calcContainer) return;

  const state = {
    bedrooms: 2,
    bathrooms: 2,
    serviceType: 'standard', // standard, deep, moveout
    frequency: 'biweekly',    // weekly, biweekly, monthly, onetime
    addons: []
  };

  const basePricePerBed = 40;
  const basePricePerBath = 30;
  const baseFee = 30;

  const serviceMultipliers = {
    standard: 1.0,
    deep: 1.4,
    moveout: 1.75
  };

  const frequencyDiscounts = {
    weekly: 0.80,    // 20% off
    biweekly: 0.85,  // 15% off
    monthly: 0.90,   // 10% off
    onetime: 1.0     // 0% off
  };

  const addonPrices = {
    oven: 35,
    fridge: 30,
    windows: 40,
    laundry: 25
  };

  // Attach button click handlers
  const optGroupBtns = document.querySelectorAll('.calc-opt-btn');
  optGroupBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = btn.getAttribute('data-group');
      const value = btn.getAttribute('data-value');

      // Update active state in parent group
      const parent = btn.parentElement;
      parent.querySelectorAll('.calc-opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (type === 'bedrooms') state.bedrooms = parseInt(value, 10);
      if (type === 'bathrooms') state.bathrooms = parseInt(value, 10);
      if (type === 'service') state.serviceType = value;
      if (type === 'frequency') state.frequency = value;

      recalculatePrice();
    });
  });

  // Attach Checkbox handlers for add-ons
  const addonCheckboxes = document.querySelectorAll('.addon-input');
  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      state.addons = Array.from(addonCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      recalculatePrice();
    });
  });

  function recalculatePrice() {
    const rawHomeSize = baseFee + (state.bedrooms * basePricePerBed) + (state.bathrooms * basePricePerBath);
    const serviceMult = serviceMultipliers[state.serviceType] || 1.0;
    const freqMult = frequencyDiscounts[state.frequency] || 1.0;

    const subtotal = rawHomeSize * serviceMult;
    let addonsTotal = 0;
    state.addons.forEach(key => {
      addonsTotal += (addonPrices[key] || 0);
    });

    const finalTotal = Math.round((subtotal * freqMult) + addonsTotal);

    // Update UI elements
    const priceDisplay = document.getElementById('calc-final-price');
    const breakdownBedBath = document.getElementById('bk-bed-bath');
    const breakdownService = document.getElementById('bk-service');
    const breakdownFreq = document.getElementById('bk-frequency');
    const breakdownAddons = document.getElementById('bk-addons');

    if (priceDisplay) priceDisplay.textContent = `$${finalTotal}`;
    if (breakdownBedBath) breakdownBedBath.textContent = `${state.bedrooms} Bed, ${state.bathrooms} Bath`;
    
    if (breakdownService) {
      const labels = { standard: 'Standard Maintenance', deep: 'Deep Detailed Clean', moveout: 'Move-In / Move-Out' };
      breakdownService.textContent = labels[state.serviceType] || 'Standard';
    }

    if (breakdownFreq) {
      const freqLabels = { weekly: 'Weekly (20% Off)', biweekly: 'Bi-Weekly (15% Off)', monthly: 'Monthly (10% Off)', onetime: 'One-Time Service' };
      breakdownFreq.textContent = freqLabels[state.frequency] || 'One-Time';
    }

    if (breakdownAddons) {
      breakdownAddons.textContent = state.addons.length > 0 ? `${state.addons.length} item(s) selected` : 'None';
    }
  }

  // Initial calculation trigger
  recalculatePrice();
}

/* -------------------------------------------------------------------------- */
/* 4. ZIP Code Coverage Checker                                               */
/* -------------------------------------------------------------------------- */
function initZipChecker() {
  const form = document.getElementById('zip-check-form');
  const input = document.getElementById('zip-input');
  const statusBox = document.getElementById('zip-status');

  if (!form || !input || !statusBox) return;

  const validZipPrefixes = ['90', '91', '92', '93', '94', '95', '10', '20', '30', '40', '50', '60', '70', '80'];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();

    if (val.length < 5 || isNaN(val)) {
      statusBox.textContent = 'Please enter a valid 5-digit ZIP code.';
      statusBox.className = 'zip-status error';
      return;
    }

    const prefix = val.substring(0, 2);
    if (validZipPrefixes.includes(prefix)) {
      statusBox.textContent = `Great news! ZIP code ${val} is in our immediate service area. Cleaners available this week.`;
      statusBox.className = 'zip-status success';
    } else {
      statusBox.textContent = `ZIP code ${val} is currently outside our standard service region. Call (800) 555-0199 for custom dispatch.`;
      statusBox.className = 'zip-status error';
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Forms & Toast Notifications                                             */
/* -------------------------------------------------------------------------- */
function initForms() {
  const forms = document.querySelectorAll('form[id$="-form"]');
  forms.forEach(form => {
    if (form.id === 'zip-check-form') return; // Handled separately
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you. Your request has been submitted successfully.');
      form.reset();
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
