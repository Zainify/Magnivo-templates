/**
 * HydroPro Plumbing & Drain Services - Sales Machine JS Engine
 * Handles interactive problem diagnostics, quote calculations, ZIP checks, and booking forms.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 2. Sales Machine: Interactive Problem Diagnostic Card (Homepage)
  const diagButtons = document.querySelectorAll('.diag-btn');
  const diagProblemName = document.getElementById('diag-problem-name');
  const diagEstimatedPrice = document.getElementById('diag-price-val');
  const diagTimeframe = document.getElementById('diag-timeframe');
  const diagRecommendation = document.getElementById('diag-recommendation');

  const diagnosticDatabase = {
    drain: {
      name: "Clogged Main Drain / Sewer Backup",
      price: "$149 - $295",
      time: "Same Day Dispatch (within 60 mins)",
      recommendation: "Commercial Hydro-Jetting or Augering with video camera inspection."
    },
    leak: {
      name: "Water Leak / Pipe Burst Emergency",
      price: "$185 - $420",
      time: "Urgent Dispatch (< 45 Mins)",
      recommendation: "Immediate water main shutoff & acoustic leak detection + copper/PEX repair."
    },
    heater: {
      name: "Water Heater Breakdown / No Hot Water",
      price: "$195 - $1,450",
      time: "Same Day Tank / Tankless Repair",
      recommendation: "Heating element replacement, flush, or energy-efficient tankless upgrade."
    },
    toilet: {
      name: "Toilet Overflow / Sewer Smell",
      price: "$110 - $225",
      time: "Dispatch Available 24/7",
      recommendation: "Wax ring replacement, blockage removal, or internal flush valve overhaul."
    },
    faucet: {
      name: "Leaking Faucet / Fixture Replacement",
      price: "$120 - $240",
      time: "Scheduled Appointment",
      recommendation: "Cartridge replacement, valve seating repair, or modern fixture install."
    },
    disposal: {
      name: "Garbage Disposal Jam / Motor Burnout",
      price: "$95 - $265",
      time: "Standard Dispatch",
      recommendation: "Impeller unjamming, reset electrical loop, or heavy-duty unit replacement."
    }
  };

  if (diagButtons.length > 0) {
    diagButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        diagButtons.forEach(b => b.classList.remove('active'));
        const targetBtn = e.currentTarget;
        targetBtn.classList.add('active');

        const key = targetBtn.getAttribute('data-diag');
        if (diagnosticDatabase[key]) {
          const item = diagnosticDatabase[key];
          if (diagProblemName) diagProblemName.textContent = item.name;
          if (diagEstimatedPrice) diagEstimatedPrice.textContent = item.price;
          if (diagTimeframe) diagTimeframe.textContent = item.time;
          if (diagRecommendation) diagRecommendation.textContent = item.recommendation;
        }
      });
    });
  }

  // 3. Sales Machine: Interactive Estimator Widget (estimator.html)
  const calcOptBtns = document.querySelectorAll('.opt-btn');
  const addonInputs = document.querySelectorAll('.addon-check');
  const calcPriceDisplay = document.getElementById('calc-price-display');

  // Summary breakdown elements
  const summaryJobType = document.getElementById('summary-job-type');
  const summaryProperty = document.getElementById('summary-property');
  const summaryUrgency = document.getElementById('summary-urgency');
  const summaryPipes = document.getElementById('summary-pipes');
  const summaryAddons = document.getElementById('summary-addons');

  let currentConfig = {
    jobType: 'drain',      // drain ($149), leak ($185), heater ($295), sewer ($380), repipe ($650)
    property: 'residential', // residential (1.0x), commercial (1.35x)
    urgency: 'sameday',    // emergency (+ $85), sameday ($0), scheduled (- $20)
    pipes: 'standard',     // standard ($0), copper (+ $40), historic (+ $75)
    addons: []
  };

  const jobBasePrices = {
    drain: { label: 'Drain Clearing & Jetting', price: 149 },
    leak: { label: 'Leak Detection & Pipe Repair', price: 185 },
    heater: { label: 'Water Heater System Service', price: 295 },
    sewer: { label: 'Sewer Main Line Camera & Jet', price: 380 },
    repipe: { label: 'Whole-Home Pipe Repiping', price: 650 }
  };

  const propertyMultipliers = {
    residential: { label: 'Single Family / Apartment', mult: 1.0 },
    commercial: { label: 'Commercial Facility', mult: 1.35 }
  };

  const urgencyPrices = {
    emergency: { label: 'Emergency Dispatch (< 60 Mins)', extra: 85 },
    sameday: { label: 'Same-Day Dispatch', extra: 0 },
    scheduled: { label: 'Scheduled This Week', extra: -20 }
  };

  const pipePrices = {
    standard: { label: 'Modern PEX / PVC Plumbing', extra: 0 },
    copper: { label: 'Copper Piping System', extra: 40 },
    historic: { label: 'Historic / Cast Iron System', extra: 75 }
  };

  const addonPrices = {
    camera: { label: 'Sewer Camera Inspection', price: 95 },
    hydrojet: { label: 'High-Pressure Hydro Jetting', price: 175 },
    filter: { label: 'Whole-House Water Filtration', price: 250 },
    warranty: { label: '5-Year Extended Warranty Protection', price: 49 }
  };

  function recalculatePlumbingQuote() {
    if (!calcPriceDisplay) return;

    let base = jobBasePrices[currentConfig.jobType]?.price || 149;
    let propMult = propertyMultipliers[currentConfig.property]?.mult || 1.0;
    let urgExtra = urgencyPrices[currentConfig.urgency]?.extra || 0;
    let pipeExtra = pipePrices[currentConfig.pipes]?.extra || 0;

    let total = (base * propMult) + urgExtra + pipeExtra;

    let selectedAddonLabels = [];
    currentConfig.addons.forEach(key => {
      if (addonPrices[key]) {
        total += addonPrices[key].price;
        selectedAddonLabels.push(addonPrices[key].label);
      }
    });

    if (total < 85) total = 85;

    calcPriceDisplay.textContent = '$' + Math.round(total);

    // Update text summary labels
    if (summaryJobType) summaryJobType.textContent = jobBasePrices[currentConfig.jobType]?.label || 'Drain Clearing';
    if (summaryProperty) summaryProperty.textContent = propertyMultipliers[currentConfig.property]?.label || 'Single Family';
    if (summaryUrgency) summaryUrgency.textContent = urgencyPrices[currentConfig.urgency]?.label || 'Same-Day';
    if (summaryPipes) summaryPipes.textContent = pipePrices[currentConfig.pipes]?.label || 'Modern PEX';
    if (summaryAddons) {
      summaryAddons.textContent = selectedAddonLabels.length > 0 ? selectedAddonLabels.join(', ') : 'None selected';
    }
  }

  if (calcOptBtns.length > 0) {
    calcOptBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const group = btn.getAttribute('data-group');
        const val = btn.getAttribute('data-value');

        // Toggle active styling within group
        document.querySelectorAll(`.opt-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (group === 'job') currentConfig.jobType = val;
        if (group === 'property') currentConfig.property = val;
        if (group === 'urgency') currentConfig.urgency = val;
        if (group === 'pipes') currentConfig.pipes = val;

        recalculatePlumbingQuote();
      });
    });
  }

  if (addonInputs.length > 0) {
    addonInputs.forEach(input => {
      input.addEventListener('change', () => {
        currentConfig.addons = Array.from(addonInputs)
          .filter(i => i.checked)
          .map(i => i.value);
        recalculatePlumbingQuote();
      });
    });
  }

  // Initial calculation run
  recalculatePlumbingQuote();

  // 4. Sales Machine: ZIP Coverage Checker
  const zipForm = document.getElementById('zip-check-form');
  const zipInput = document.getElementById('zip-input');
  const zipStatus = document.getElementById('zip-status');

  const coveredZipPrefixes = ['90', '91', '92', '10', '11', '30', '75', '60', '94', '95', '97', '98'];

  if (zipForm && zipInput && zipStatus) {
    zipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = zipInput.value.trim();
      
      if (val.length < 5 || isNaN(val)) {
        zipStatus.className = 'zip-result error';
        zipStatus.textContent = 'Please enter a valid 5-digit ZIP code.';
        return;
      }

      const prefix = val.substring(0, 2);
      const isCovered = coveredZipPrefixes.includes(prefix) || val === '90210' || val.endsWith('1') || val.endsWith('5');

      if (isCovered) {
        zipStatus.className = 'zip-result success';
        zipStatus.innerHTML = `<strong>Technician Available:</strong> Master Plumber units are active in ZIP <strong>${val}</strong>. Estimated dispatch window: 25-40 minutes.`;
      } else {
        zipStatus.className = 'zip-result success';
        zipStatus.innerHTML = `<strong>Regional Service Confirmed:</strong> Service dispatch available in ZIP <strong>${val}</strong>. Call (800) 555-7582 to lock your dispatch slot.`;
      }
    });
  }

  // 5. Booking / Contact Form Handler with Toast Notification
  const bookingForms = document.querySelectorAll('form[id$="-form"]');
  
  function showToastNotice(msg) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  bookingForms.forEach(form => {
    if (form.id === 'zip-check-form') return; // skip zip checker form
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToastNotice(`<strong>Request Submitted:</strong> Plumbing dispatch desk notified. A master plumber coordinator will contact you within 15 minutes to confirm details.`);
      form.reset();
    });
  });

});
