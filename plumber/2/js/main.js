// Plumber 2 JS - FlowTech Master Plumbing & Engineering
document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // 2. Interactive Diagnostic Matrix Engine (Homepage & Services)
  const diagTabs = document.querySelectorAll('.tab-btn[data-diag]');
  const diagProblem = document.getElementById('diag-problem');
  const diagEquip = document.getElementById('diag-equip');
  const diagTime = document.getElementById('diag-time');
  const diagRate = document.getElementById('diag-rate');

  const diagData = {
    hydrojet: {
      problem: 'Main Sewer Root Invasion & Grease Sludge Blockage',
      equip: '4000 PSI Water Hydro-Jet + Fiber-Optic HD Camera',
      time: '45 - 60 Mins',
      rate: '$245 Flat Rate'
    },
    acoustic: {
      problem: 'Concealed Underground Slab / Wall Copper Leak',
      equip: 'Ultrasonic Ground Microphone & Thermal Isolation',
      time: '60 - 90 Mins',
      rate: '$285 Flat Rate'
    },
    heater: {
      problem: 'Water Heater Heating Element / Thermocouple Failure',
      equip: 'Digital Circuit Testing & Descaling Flush Pump',
      time: '30 - 60 Mins',
      rate: '$195 Flat Rate'
    },
    repipe: {
      problem: 'Corroded Galvanized Water Main Line Degradation',
      equip: 'Commercial PEX Expansion Tool & Hydraulic Puller',
      time: '2 - 4 Hours',
      rate: '$590 Flat Rate'
    }
  };

  diagTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      diagTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.getAttribute('data-diag');
      if (diagData[key]) {
        if (diagProblem) diagProblem.textContent = diagData[key].problem;
        if (diagEquip) diagEquip.textContent = diagData[key].equip;
        if (diagTime) diagTime.textContent = diagData[key].time;
        if (diagRate) diagRate.textContent = diagData[key].rate;
      }
    });
  });

  // 3. ZIP Code Radius Dispatch Checker
  const zipForm = document.getElementById('zip-check-form');
  const zipInput = document.getElementById('zip-input');
  const zipResult = document.getElementById('zip-result');

  if (zipForm && zipInput && zipResult) {
    zipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = zipInput.value.trim();
      if (val.length >= 4) {
        zipResult.style.display = 'block';
        zipResult.innerHTML = `
          <div style="background: rgba(13, 148, 136, 0.15); border: 1px solid #0d9488; color: #0d9488; padding: 0.85rem; border-radius: 6px; font-size: 0.9rem; font-weight: 700;">
            Mobile Unit #4 Active in ZIP ${val} — Priority Response Window: 18 to 28 Minutes.
          </div>
        `;
      }
    });
  }

  // 4. Multi-Parameter Cost Estimator Engine
  const calcButtons = document.querySelectorAll('.calc-opt-btn');
  const calcPriceDisplay = document.getElementById('calc-price-display');
  
  const sumService = document.getElementById('sum-service');
  const sumProperty = document.getElementById('sum-property');
  const sumMaterial = document.getElementById('sum-material');
  const sumAccess = document.getElementById('sum-access');

  let estimatorState = {
    service: { name: 'Main Sewer Hydro-Jetting', cost: 245 },
    property: { name: 'Single Family Home', mult: 1.0 },
    material: { name: 'PEX / Modern PVC', cost: 0 },
    access: { name: 'Direct Pipe Access', cost: 0 }
  };

  function updateEstimatorDisplay() {
    if (!calcPriceDisplay) return;

    let total = (estimatorState.service.cost + estimatorState.material.cost + estimatorState.access.cost) * estimatorState.property.mult;
    total = Math.round(total);

    calcPriceDisplay.textContent = `$${total}`;

    if (sumService) sumService.textContent = estimatorState.service.name;
    if (sumProperty) sumProperty.textContent = estimatorState.property.name;
    if (sumMaterial) sumMaterial.textContent = estimatorState.material.name;
    if (sumAccess) sumAccess.textContent = estimatorState.access.name;
  }

  calcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.getAttribute('data-group');
      const cost = parseFloat(btn.getAttribute('data-cost') || '0');
      const mult = parseFloat(btn.getAttribute('data-mult') || '1.0');
      const text = btn.textContent.split('(')[0].trim();

      // Toggle active in group
      document.querySelectorAll(`.calc-opt-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (group === 'service') {
        estimatorState.service = { name: text, cost: cost };
      } else if (group === 'property') {
        estimatorState.property = { name: text, mult: mult };
      } else if (group === 'material') {
        estimatorState.material = { name: text, cost: cost };
      } else if (group === 'access') {
        estimatorState.access = { name: text, cost: cost };
      }

      updateEstimatorDisplay();
    });
  });

  // Initialize estimator display
  updateEstimatorDisplay();

  // 5. Booking / Dispatch Form Submissions
  const bookingForms = document.querySelectorAll('form[id$="-form"]');
  bookingForms.forEach(form => {
    if (form.id === 'zip-check-form') return; // skip zip checker
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! FlowTech Dispatch Desk has received your request. A technician is confirming your schedule.');
      form.reset();
    });
  });

});
