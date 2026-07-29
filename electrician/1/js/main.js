// VoltCraft Electrician 1 JS - Bold, Professional & High-Contrast
document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // 2. Interactive Electrical System Diagnostic Console
  const diagButtons = document.querySelectorAll('.console-opt-btn[data-diag]');
  const diagIssue = document.getElementById('diag-issue');
  const diagCode = document.getElementById('diag-code');
  const diagEquip = document.getElementById('diag-equip');
  const diagCost = document.getElementById('diag-cost');

  const electricalDiagData = {
    panel: {
      issue: '200A Main Service Panel Upgrade & Breaker Modernization',
      code: 'NEC 2026 Article 230 Compliant',
      equip: 'Square D QO Main Breaker Panel + Surge Arrester',
      cost: '$1,450 Flat Rate'
    },
    evcharger: {
      issue: 'Level 2 EV Fast Charger (50A / 240V Dedicated Line)',
      code: 'NEC Article 625 Dedicated Branch Circuit',
      equip: 'NEMA 14-50 Receptacle + Hardwired Wall Connector',
      cost: '$490 Flat Rate'
    },
    lighting: {
      issue: 'Recessed LED Architectural Downlight Installation (6 Packs)',
      code: 'Title 24 High Efficacy Energy Certified',
      equip: 'Lutron Caséta Smart Dimmer + IC-Rated LED Cans',
      cost: '$380 Flat Rate'
    },
    emergency: {
      issue: 'Burning Odor / Main Breaker Tripping Diagnostic Isolation',
      code: 'OSHA & NFPA 70E Arc-Flash Protocols',
      equip: 'Thermal Infrared Camera & Digital Megohmmeter',
      cost: '$195 Diagnostic Fee'
    }
  };

  diagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      diagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-diag');
      if (electricalDiagData[key]) {
        if (diagIssue) diagIssue.textContent = electricalDiagData[key].issue;
        if (diagCode) diagCode.textContent = electricalDiagData[key].code;
        if (diagEquip) diagEquip.textContent = electricalDiagData[key].equip;
        if (diagCost) diagCost.textContent = electricalDiagData[key].cost;
      }
    });
  });

  // 3. Emergency Dispatch ZIP Code Checker
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
          <div style="background: var(--dark); border: 2px solid var(--primary); color: #ffffff; padding: 1rem; border-radius: 4px; font-size: 0.9rem; font-weight: 700;">
            <span style="color: var(--accent); text-transform: uppercase;">[DISPATCH CONFIRMED]</span> Mobile Van #07 Active in ZIP ${val} — Guaranteed Arrival: 15 to 30 Minutes.
          </div>
        `;
      }
    });
  }

  // 4. Multi-Parameter Electrical Cost Estimator
  const estimatorBtns = document.querySelectorAll('.opt-btn');
  const calcPriceDisplay = document.getElementById('calc-price-display');

  const sumService = document.getElementById('sum-service');
  const sumAmp = document.getElementById('sum-amp');
  const sumProperty = document.getElementById('sum-property');
  const sumWire = document.getElementById('sum-wire');

  let estimatorState = {
    service: { name: '200A Panel Upgrade', cost: 1450 },
    amp: { name: '200 Ampere', mult: 1.0 },
    property: { name: 'Single Family Home', mult: 1.0 },
    wire: { name: 'Standard Copper Wire', cost: 0 }
  };

  function updateEstimatorDisplay() {
    if (!calcPriceDisplay) return;

    let total = (estimatorState.service.cost + estimatorState.wire.cost) * estimatorState.amp.mult * estimatorState.property.mult;
    total = Math.round(total);

    calcPriceDisplay.textContent = `$${total}`;

    if (sumService) sumService.textContent = estimatorState.service.name;
    if (sumAmp) sumAmp.textContent = estimatorState.amp.name;
    if (sumProperty) sumProperty.textContent = estimatorState.property.name;
    if (sumWire) sumWire.textContent = estimatorState.wire.name;
  }

  estimatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.getAttribute('data-group');
      const cost = parseFloat(btn.getAttribute('data-cost') || '0');
      const mult = parseFloat(btn.getAttribute('data-mult') || '1.0');
      const text = btn.textContent.split('(')[0].trim();

      document.querySelectorAll(`.opt-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (group === 'service') {
        estimatorState.service = { name: text, cost: cost };
      } else if (group === 'amp') {
        estimatorState.amp = { name: text, mult: mult };
      } else if (group === 'property') {
        estimatorState.property = { name: text, mult: mult };
      } else if (group === 'wire') {
        estimatorState.wire = { name: text, cost: cost };
      }

      updateEstimatorDisplay();
    });
  });

  updateEstimatorDisplay();

  // 5. Booking & Form Submissions
  const forms = document.querySelectorAll('form[id$="-form"]');
  forms.forEach(f => {
    if (f.id === 'zip-check-form') return;
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Request Submitted! VoltCraft Dispatch Desk has logged your service request. A master electrician will call to confirm your appointment window.');
      f.reset();
    });
  });

});
