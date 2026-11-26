// ============================================================
// LAB MATE – Page Renderers (Part 2)
// Circuit Studio, Virtual Lab, AI Chat, Practice, Projects
// ============================================================

// ── CIRCUIT STUDIO ────────────────────────────────────────
function renderCircuitStudio() {
  document.getElementById('page-circuit-studio').innerHTML = `
    <div class="page-with-sidebar">
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">Circuit Categories</div>
          ${['All','Basic Circuits','Rectifiers','Amplifiers','Oscillators','Digital Logic','Timers'].map(cat=>`
            <div class="sidebar-link circuit-cat-link ${cat==='All'?'active':''}" onclick="filterCircuits('${cat}',this)">${cat}</div>
          `).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Simulators</div>
          ${[
            {name:'Falstad', desc:'Analog circuits', url:'https://falstad.com/circuit/', icon:'〰️'},
            {name:'CircuitVerse', desc:'Digital logic', url:'https://circuitverse.org/', icon:'1️⃣'},
            {name:'Wokwi', desc:'Arduino/ESP32', url:'https://wokwi.com/', icon:'🤖'},
            {name:'Tinkercad', desc:'3D + circuits', url:'https://www.tinkercad.com/', icon:'🧰'},
          ].map(s=>`
            <div class="sidebar-link" onclick="window.open('${s.url}','_blank')">
              <span>${s.icon}</span>${s.name} ${icons.external}
            </div>
          `).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Calculators</div>
          <div class="sidebar-link" onclick="switchStudioTab('calculators',document.querySelector('[data-ctab=calculators]'))">${icons.calculator} Calculators</div>
        </div>
      </aside>

      <main class="page-content">
        <div class="page-header">
          <h1 class="page-title">〰️ Circuit Studio</h1>
          <p>Study circuit diagrams, launch simulators and use engineering calculators.</p>
          <div class="tabs" id="studio-tabs" style="margin-top:1.5rem;">
            <button class="tab-btn active" data-ctab="circuits" onclick="switchStudioTab('circuits',this)">Circuit Library</button>
            <button class="tab-btn" data-ctab="simulators" onclick="switchStudioTab('simulators',this)">Simulators</button>
            <button class="tab-btn" data-ctab="calculators" onclick="switchStudioTab('calculators',this)">Calculators</button>
          </div>
        </div>

        <!-- Circuit Library -->
        <div id="studio-tab-circuits">
          <div class="search-bar" style="max-width:400px;margin-bottom:1.5rem;">
            <span class="search-icon">${icons.search}</span>
            <input type="text" placeholder="Search circuits…" oninput="searchCircuits(this.value)">
          </div>
          <div class="grid-auto stagger" id="circuit-grid">
            ${renderCircuitGrid(DATA.circuits)}
          </div>
        </div>

        <!-- Simulators -->
        <div id="studio-tab-simulators" style="display:none;">
          <div class="grid-2 stagger">
            ${[
              { name:'Falstad Circuit Simulator', icon:'〰️', desc:'Interactive analog circuit simulator running in your browser. Perfect for Ohm\'s law, RC circuits, amplifiers and power electronics.', url:'https://falstad.com/circuit/', level:'Beginner–Advanced', color:'#3b82f6', best:'Analog circuits, Filters, Amplifiers' },
              { name:'CircuitVerse', icon:'1️⃣', desc:'Digital logic simulator with gates, flip-flops, counters and sequential circuits. Ideal for digital electronics students.', url:'https://circuitverse.org/', level:'Beginner–Intermediate', color:'#22c55e', best:'Logic gates, Boolean algebra, Flip-flops' },
              { name:'Wokwi', icon:'🤖', desc:'Arduino and ESP32 simulator with virtual sensors, displays and peripherals. Write code and see results instantly.', url:'https://wokwi.com/', level:'Beginner–Advanced', color:'#8b5cf6', best:'Arduino, ESP32, Microcontrollers' },
              { name:'Tinkercad Circuits', icon:'🧰', desc:'Beginner-friendly breadboard simulator with Arduino support. Great for learning component connections visually.', url:'https://www.tinkercad.com/', level:'Beginner', color:'#f59e0b', best:'First circuits, Breadboarding, Arduino basics' },
            ].map(s=>`
              <div class="card" style="border-left:3px solid ${s.color};">
                <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
                  <div style="font-size:2rem;">${s.icon}</div>
                  <div>
                    <h3 style="font-size:1.1rem;">${s.name}</h3>
                    <span class="badge badge-blue">${s.level}</span>
                  </div>
                </div>
                <p style="font-size:0.875rem;margin-bottom:1rem;">${s.desc}</p>
                <div style="background:var(--color-bg-elevated);padding:0.6rem 0.9rem;border-radius:var(--radius-sm);margin-bottom:1.25rem;">
                  <span style="font-size:0.75rem;color:var(--color-text-dim);">Best for:</span>
                  <span style="font-size:0.8rem;margin-left:0.4rem;">${s.best}</span>
                </div>
                <div style="display:flex;gap:0.75rem;">
                  <button class="btn btn-primary" onclick="window.open('${s.url}','_blank')">${icons.external} Open Simulator</button>
                  <button class="btn btn-secondary btn-sm" onclick="navigate('ask-lab-mate')">Get Help</button>
                </div>
                <div style="margin-top:0.75rem;font-size:0.75rem;color:var(--color-text-dim);">⚠️ External tool — opens in a new tab</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Calculators -->
        <div id="studio-tab-calculators" style="display:none;">
          <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">
            <!-- Calc sidebar -->
            <div style="width:200px;flex-shrink:0;">
              ${DATA.calculators.map(calc=>`
                <div class="sidebar-link ${State.calcId===calc.id?'active':''}" id="calc-nav-${calc.id}" onclick="loadCalculator('${calc.id}')">
                  <span>${calc.icon}</span> ${calc.name}
                </div>
              `).join('')}
            </div>
            <!-- Calc panel -->
            <div style="flex:1;min-width:280px;">
              <div class="card" id="calc-panel">
                ${renderCalculator(State.calcId || 'ohms-law')}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  window.switchStudioTab = (tab, btn) => {
    document.querySelectorAll('#studio-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    ['circuits','simulators','calculators'].forEach(t => {
      const el = document.getElementById(`studio-tab-${t}`);
      if(el) el.style.display = t===tab?'block':'none';
    });
  };

  window.searchCircuits = (q) => {
    const filtered = q ? DATA.circuits.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())||c.category.toLowerCase().includes(q.toLowerCase())) : DATA.circuits;
    document.getElementById('circuit-grid').innerHTML = renderCircuitGrid(filtered);
  };

  window.filterCircuits = (cat, el) => {
    document.querySelectorAll('.circuit-cat-link').forEach(l=>l.classList.remove('active'));
    if(el) el.classList.add('active');
    const filtered = cat==='All' ? DATA.circuits : DATA.circuits.filter(c=>c.category===cat);
    document.getElementById('circuit-grid').innerHTML = renderCircuitGrid(filtered);
  };

  window.loadCalculator = (id) => {
    State.calcId = id;
    document.querySelectorAll('[id^="calc-nav-"]').forEach(el=>el.classList.remove('active'));
    const navEl = document.getElementById(`calc-nav-${id}`);
    if(navEl) navEl.classList.add('active');
    document.getElementById('calc-panel').innerHTML = renderCalculator(id);
  };
}

function renderCircuitGrid(list) {
  if (!list.length) return `<div class="empty-state"><div class="empty-icon">🔍</div><p>No circuits found</p></div>`;
  return list.map(c=>{
    const diag = (typeof SVGParts !== 'undefined' && SVGParts.getCircuitDiagram(c.id)) || c.svg;
    return `
    <div class="circuit-card" onclick="showCircuitModal('${c.id}')">
      <div class="circuit-preview">
        ${diag ? diag : `<div style="color:var(--color-text-dim);text-align:center;padding:1rem;"><div style="font-size:2rem;">〰️</div><div style="font-size:0.8rem;margin-top:0.5rem;">${c.name}</div></div>`}
      </div>
      <div class="circuit-info">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem;">
          <h4 style="font-size:0.9rem;">${c.name}</h4>
          <span class="badge ${utils.levelColor(c.difficulty)}">${c.difficulty}</span>
        </div>
        <p style="font-size:0.8rem;margin-bottom:0.5rem;">${c.desc}</p>
        <div style="font-size:0.75rem;color:var(--color-text-dim);">Formula: <span class="text-mono" style="color:var(--color-primary);">${c.formula}</span></div>
      </div>
    </div>
  `;}).join('');
}

function renderCalculator(id) {
  const calc = DATA.calculators.find(c=>c.id===id) || DATA.calculators[0];

  if (id === 'ohms-law') return `
    <h3 style="margin-bottom:0.5rem;">${calc.icon} ${calc.name} Calculator</h3>
    <p style="font-size:0.85rem;margin-bottom:1.25rem;">${calc.desc}</p>
    <div class="calc-formula" style="margin-bottom:1.25rem;">${calc.formula}</div>
    <p style="font-size:0.8rem;color:var(--color-text-dim);margin-bottom:1rem;">Enter any two values to calculate the third:</p>
    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.25rem;">
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Voltage V (Volts)</label><input class="input" id="calc-v" type="number" placeholder="e.g. 9" oninput="calcOhms()"></div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Current I (mA)</label><input class="input" id="calc-i" type="number" placeholder="e.g. 20" oninput="calcOhms()"></div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Resistance R (Ω)</label><input class="input" id="calc-r" type="number" placeholder="e.g. 470" oninput="calcOhms()"></div>
    </div>
    <div class="calc-result" id="ohms-result"><div class="value" id="ohms-result-val">—</div><div style="font-size:0.8rem;color:var(--color-primary);margin-top:0.3rem;" id="ohms-result-label">Enter two values above</div></div>
    <div id="ohms-power-row" style="margin-top:1rem;display:none;"></div>
  `;

  if (id === 'led-resistor') return `
    <h3 style="margin-bottom:0.5rem;">${calc.icon} ${calc.name} Calculator</h3>
    <p style="font-size:0.85rem;margin-bottom:1.25rem;">${calc.desc}</p>
    <div class="calc-formula" style="margin-bottom:1.25rem;">${calc.formula}</div>
    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.25rem;">
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Supply Voltage Vs (V)</label><input class="input" id="led-vs" type="number" placeholder="e.g. 5" value="5" oninput="calcLED()"></div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">LED Forward Voltage Vf (V)</label>
        <select class="input" id="led-vf" onchange="calcLED()">
          <option value="1.8">Red (1.8V)</option><option value="2.1">Yellow (2.1V)</option>
          <option value="2.2">Green (2.2V)</option><option value="3.2">Blue (3.2V)</option>
          <option value="3.3">White (3.3V)</option>
        </select>
      </div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Desired LED Current If (mA)</label><input class="input" id="led-if" type="number" placeholder="e.g. 20" value="20" oninput="calcLED()"></div>
    </div>
    <div class="calc-result" id="led-result"><div class="value" id="led-result-val">—</div><div style="font-size:0.8rem;color:var(--color-primary);margin-top:0.3rem;">Minimum resistor value</div></div>
    <div style="margin-top:0.75rem;font-size:0.8rem;color:var(--color-text-dim);">💡 Tip: Use the next standard value above your result for safety.</div>
  `;

  if (id === 'voltage-divider') return `
    <h3 style="margin-bottom:0.5rem;">${calc.icon} ${calc.name} Calculator</h3>
    <div class="calc-formula" style="margin-bottom:1.25rem;">${calc.formula}</div>
    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.25rem;">
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Input Voltage Vin (V)</label><input class="input" id="vd-vin" type="number" placeholder="e.g. 12" value="12" oninput="calcVDiv()"></div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">R1 (Ω)</label><input class="input" id="vd-r1" type="number" placeholder="e.g. 10000" value="10000" oninput="calcVDiv()"></div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">R2 (Ω)</label><input class="input" id="vd-r2" type="number" placeholder="e.g. 10000" value="10000" oninput="calcVDiv()"></div>
    </div>
    <div class="calc-result"><div class="value" id="vd-result">6.00V</div><div style="font-size:0.8rem;color:var(--color-primary);margin-top:0.3rem;">Output voltage Vout</div></div>
  `;

  if (id === 'series-resistors') return `
    <h3 style="margin-bottom:0.5rem;">${calc.icon} ${calc.name} Calculator</h3>
    <div class="calc-formula" style="margin-bottom:1.25rem;">${calc.formula}</div>
    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.25rem;">
      ${['R1','R2','R3','R4'].map(r=>`<div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">${r} (Ω) — optional</label><input class="input series-r" type="number" placeholder="0" oninput="calcSeriesR()"></div>`).join('')}
    </div>
    <div class="calc-result"><div class="value" id="series-result">0 Ω</div><div style="font-size:0.8rem;color:var(--color-primary);margin-top:0.3rem;">Total resistance</div></div>
  `;

  if (id === 'parallel-resistors') return `
    <h3 style="margin-bottom:0.5rem;">${calc.icon} ${calc.name} Calculator</h3>
    <div class="calc-formula" style="margin-bottom:1.25rem;">${calc.formula}</div>
    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.25rem;">
      ${['R1','R2','R3','R4'].map(r=>`<div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">${r} (Ω) — optional</label><input class="input parallel-r" type="number" placeholder="0" oninput="calcParallelR()"></div>`).join('')}
    </div>
    <div class="calc-result"><div class="value" id="parallel-result">0 Ω</div><div style="font-size:0.8rem;color:var(--color-primary);margin-top:0.3rem;">Total resistance</div></div>
  `;

  if (id === 'rc-time') return `
    <h3 style="margin-bottom:0.5rem;">${calc.icon} ${calc.name} Calculator</h3>
    <div class="calc-formula" style="margin-bottom:1.25rem;">${calc.formula}</div>
    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.25rem;">
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Resistance R (Ω)</label><input class="input" id="rc-r" type="number" placeholder="e.g. 10000" value="10000" oninput="calcRC()"></div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Capacitance C (µF)</label><input class="input" id="rc-c" type="number" placeholder="e.g. 100" value="100" oninput="calcRC()"></div>
    </div>
    <div class="calc-result"><div class="value" id="rc-result">1 s</div><div style="font-size:0.8rem;color:var(--color-primary);margin-top:0.3rem;">Time constant τ (63.2% charge)</div></div>
    <div style="margin-top:0.75rem;padding:0.75rem;background:var(--color-bg-elevated);border-radius:var(--radius-sm);font-size:0.82rem;" id="rc-info">
      <div>5τ = fully charged (99.3%)</div>
    </div>
  `;

  if (id === 'power') return `
    <h3 style="margin-bottom:0.5rem;">${calc.icon} ${calc.name} Calculator</h3>
    <p style="font-size:0.85rem;margin-bottom:1.25rem;">${calc.desc}</p>
    <div class="calc-formula" style="margin-bottom:1.25rem;">${calc.formula}</div>
    <p style="font-size:0.8rem;color:var(--color-text-dim);margin-bottom:1rem;">Enter any two values:</p>
    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.25rem;">
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Voltage V (Volts)</label><input class="input" id="pwr-v" type="number" placeholder="e.g. 5" oninput="calcPower()"></div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Current I (mA)</label><input class="input" id="pwr-i" type="number" placeholder="e.g. 200" oninput="calcPower()"></div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Resistance R (Ω)</label><input class="input" id="pwr-r" type="number" placeholder="e.g. 100" oninput="calcPower()"></div>
    </div>
    <div class="calc-result"><div class="value" id="pwr-result">—</div><div style="font-size:0.8rem;color:var(--color-primary);margin-top:0.3rem;" id="pwr-label">Power in Watts (W)</div></div>
  `;

  if (id === 'frequency') return `
    <h3 style="margin-bottom:0.5rem;">${calc.icon} ${calc.name} Calculator</h3>
    <p style="font-size:0.85rem;margin-bottom:1.25rem;">${calc.desc}</p>
    <div class="calc-formula" style="margin-bottom:1.25rem;">${calc.formula}</div>
    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.25rem;">
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Frequency f (Hz)</label><input class="input" id="freq-f" type="number" placeholder="e.g. 1000" oninput="calcFreq('f')"></div>
      <div><label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Period T (ms)</label><input class="input" id="freq-t" type="number" placeholder="e.g. 1" oninput="calcFreq('t')"></div>
    </div>
    <div class="calc-result"><div class="value" id="freq-result">—</div><div style="font-size:0.8rem;color:var(--color-primary);margin-top:0.3rem;" id="freq-label">Enter Frequency or Period</div></div>
  `;

  // Generic fallback
  return `
    <h3 style="margin-bottom:0.5rem;">${calc.icon} ${calc.name} Calculator</h3>
    <p style="font-size:0.85rem;margin-bottom:1.25rem;">${calc.desc}</p>
    <div class="calc-formula" style="margin-bottom:1.25rem;">${calc.formula}</div>
  `;
}

function showCircuitModal(id) {
  const c = DATA.circuits.find(x=>x.id===id);
  if (!c) return;
  const diag = (typeof SVGParts !== 'undefined' && SVGParts.getCircuitDiagram(c.id)) || c.svg;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" style="max-width:640px;">
      <div class="modal-header">
        <h3>${c.name}</h3>
        <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-ghost">${icons.x}</button>
      </div>
      <div style="display:flex;gap:0.5rem;margin-bottom:1.25rem;flex-wrap:wrap;">
        <span class="badge ${utils.levelColor(c.difficulty)}">${c.difficulty}</span>
        <span class="badge badge-blue">${c.category}</span>
      </div>
      <div style="background:#0d1117;border:1px solid var(--color-border);border-radius:var(--radius-md);padding:1rem;text-align:center;min-height:140px;display:flex;align-items:center;justify-content:center;margin-bottom:0.6rem;">
        ${diag || `<span style="color:var(--color-text-dim);">Circuit diagram for: ${c.name}</span>`}
      </div>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;font-size:0.75rem;color:var(--color-text-dim);margin-bottom:1.25rem;">
        <span>🔴 <strong style="color:#f87171;">Red:</strong> +VCC / Power</span>
        <span>⚫ <strong style="color:#94a3b8;">Black/Slate:</strong> GND (0V)</span>
        <span>🔵🟢🟡 <strong style="color:#60a5fa;">Coloured:</strong> Signal / Data</span>
      </div>
      <p style="margin-bottom:1rem;">${c.desc}</p>
      <div class="calc-formula">${c.formula}</div>
      <div style="margin-top:1rem;">
        <div style="font-size:0.8rem;color:var(--color-text-dim);margin-bottom:0.5rem;">Components required:</div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          ${(c.components||[]).map(comp=>`<span class="badge badge-slate">${comp}</span>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); navigate('ask-lab-mate')">${icons.bot} Ask AI to Explain</button>
        <button class="btn btn-secondary" onclick="window.open('https://falstad.com/circuit/','_blank')">${icons.external} Simulate</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => { if(e.target===modal) modal.remove(); });
}

// Calculator logic
window.calcOhms = () => {
  const v = parseFloat(document.getElementById('calc-v')?.value);
  const i = parseFloat(document.getElementById('calc-i')?.value) / 1000;
  const r = parseFloat(document.getElementById('calc-r')?.value);
  const resVal = document.getElementById('ohms-result-val');
  const resLabel = document.getElementById('ohms-result-label');
  if (!resVal) return;
  if (!isNaN(i) && !isNaN(r)) { resVal.textContent = `${(i*r).toFixed(3)} V`; resLabel.textContent = 'Voltage = I × R'; }
  else if (!isNaN(v) && !isNaN(r)) { resVal.textContent = `${(v/r*1000).toFixed(2)} mA`; resLabel.textContent = 'Current = V / R'; }
  else if (!isNaN(v) && !isNaN(i)) { resVal.textContent = `${(v/i).toFixed(1)} Ω`; resLabel.textContent = 'Resistance = V / I'; }
  else { resVal.textContent = '—'; resLabel.textContent = 'Enter any two values'; }
};
window.calcLED = () => {
  const vs = parseFloat(document.getElementById('led-vs')?.value);
  const vf = parseFloat(document.getElementById('led-vf')?.value);
  const If = parseFloat(document.getElementById('led-if')?.value) / 1000;
  const el = document.getElementById('led-result-val');
  if(el && !isNaN(vs) && !isNaN(vf) && !isNaN(If) && If > 0) {
    const r = (vs - vf) / If;
    el.textContent = r > 1000 ? `${(r/1000).toFixed(2)} kΩ` : `${Math.ceil(r)} Ω`;
  }
};
window.calcVDiv = () => {
  const vin = parseFloat(document.getElementById('vd-vin')?.value);
  const r1 = parseFloat(document.getElementById('vd-r1')?.value);
  const r2 = parseFloat(document.getElementById('vd-r2')?.value);
  const el = document.getElementById('vd-result');
  if(el && !isNaN(vin) && !isNaN(r1) && !isNaN(r2) && (r1+r2) > 0) el.textContent = `${(vin*r2/(r1+r2)).toFixed(3)} V`;
};
window.calcSeriesR = () => {
  const vals = [...document.querySelectorAll('.series-r')].map(e=>parseFloat(e.value)||0);
  const total = vals.reduce((a,b)=>a+b,0);
  const el = document.getElementById('series-result');
  if(el) el.textContent = total >= 1000 ? `${(total/1000).toFixed(3)} kΩ` : `${total} Ω`;
};
window.calcParallelR = () => {
  const vals = [...document.querySelectorAll('.parallel-r')].map(e=>parseFloat(e.value)||0).filter(v=>v>0);
  const el = document.getElementById('parallel-result');
  if(!vals.length) { if(el) el.textContent = '0 Ω'; return; }
  const inv = vals.reduce((a,b)=>a+1/b,0);
  const total = 1/inv;
  if(el) el.textContent = total >= 1000 ? `${(total/1000).toFixed(3)} kΩ` : `${total.toFixed(2)} Ω`;
};
window.calcPower = () => {
  const v = parseFloat(document.getElementById('pwr-v')?.value);
  const i = parseFloat(document.getElementById('pwr-i')?.value) / 1000;
  const r = parseFloat(document.getElementById('pwr-r')?.value);
  const el = document.getElementById('pwr-result');
  const lbl = document.getElementById('pwr-label');
  if(!el) return;
  let p = NaN;
  if(!isNaN(v) && !isNaN(i)) { p = v * i; lbl.textContent = 'P = V × I'; }
  else if(!isNaN(i) && !isNaN(r)) { p = i * i * r; lbl.textContent = 'P = I² × R'; }
  else if(!isNaN(v) && !isNaN(r) && r > 0) { p = (v * v) / r; lbl.textContent = 'P = V² / R'; }
  el.textContent = !isNaN(p) ? (p < 1 ? `${(p*1000).toFixed(1)} mW` : `${p.toFixed(3)} W`) : '—';
};
window.calcFreq = (source) => {
  const fEl = document.getElementById('freq-f');
  const tEl = document.getElementById('freq-t');
  const res = document.getElementById('freq-result');
  const lbl = document.getElementById('freq-label');
  if(!res) return;
  if(source === 'f') {
    const f = parseFloat(fEl?.value);
    if(!isNaN(f) && f > 0) {
      const tMs = (1 / f) * 1000;
      if(tEl) tEl.value = tMs.toFixed(4);
      res.textContent = `${tMs.toFixed(3)} ms`;
      lbl.textContent = `Period T = 1 / ${f} Hz`;
    } else { res.textContent = '—'; }
  } else {
    const tMs = parseFloat(tEl?.value);
    if(!isNaN(tMs) && tMs > 0) {
      const f = 1000 / tMs;
      if(fEl) fEl.value = f.toFixed(2);
      res.textContent = f >= 1000 ? `${(f/1000).toFixed(2)} kHz` : `${f.toFixed(2)} Hz`;
      lbl.textContent = `Frequency f = 1 / ${tMs} ms`;
    } else { res.textContent = '—'; }
  }
};
window.calcRC = () => {
  const r = parseFloat(document.getElementById('rc-r')?.value);
  const c = parseFloat(document.getElementById('rc-c')?.value) * 1e-6;
  const el = document.getElementById('rc-result');
  const info = document.getElementById('rc-info');
  if(el && !isNaN(r) && !isNaN(c)) {
    const tau = r * c;
    el.textContent = tau >= 1 ? `${tau.toFixed(3)} s` : tau >= 0.001 ? `${(tau*1000).toFixed(2)} ms` : `${(tau*1e6).toFixed(1)} µs`;
    if(info) {
      const t5 = 5*tau;
      info.innerHTML = `<div>5τ = ${t5>=1?t5.toFixed(3)+'s':t5>=0.001?(t5*1000).toFixed(2)+'ms':(t5*1e6).toFixed(1)+'µs'} — fully charged (99.3%)</div>`;
    }
  }
};

// ── VIRTUAL LAB ───────────────────────────────────────────
function renderVirtualLab() {
  let expCat = 'All';
  let expLevel = 'All';

  function renderExpCards(list) {
    if (!list.length) return `<div class="empty-state"><div class="empty-icon">🔬</div><p>No experiments match your filter</p></div>`;
    return list.map(e=>`
      <div class="exp-card animate-fadein" onclick="navigate('experiment',{id:'${e.id}'})">
        <div class="exp-num">${e.num}</div>
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;flex-wrap:wrap;">
            <h3 style="font-size:1rem;font-weight:600;">${e.name}</h3>
            <span class="badge ${utils.levelColor(e.level)}">${e.level}</span>
            <span class="badge badge-slate">⏱ ${e.time}</span>
          </div>
          <p style="font-size:0.85rem;margin:0;line-height:1.5;">${e.aim}</p>
          <div style="display:flex;align-items:center;gap:1rem;margin-top:0.75rem;flex-wrap:wrap;">
            <span class="badge badge-blue">${e.category}</span>
            <span style="font-size:0.78rem;color:var(--color-text-dim);">🔧 ${e.apparatus.length} apparatus items</span>
            <span style="font-size:0.78rem;color:var(--color-text-dim);">❓ ${e.vivaQA.length} viva questions</span>
          </div>
        </div>
        <span style="color:var(--color-text-dim);flex-shrink:0;">${icons.arrow_right}</span>
      </div>
    `).join('');
  }

  function applyExpFilters() {
    const filtered = DATA.experiments.filter(e =>
      (expCat === 'All' || e.category === expCat) &&
      (expLevel === 'All' || e.level === expLevel)
    );
    document.getElementById('exp-list').innerHTML = renderExpCards(filtered);
  }

  document.getElementById('page-virtual-lab').innerHTML = `
    <div class="page-with-sidebar">
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">Categories</div>
          ${['All','Basic Electrical','Semiconductor Devices','Analog Electronics','Digital Electronics'].map(cat=>`
            <div class="sidebar-link exp-cat-link ${cat==='All'?'active':''}" onclick="filterExp('${cat}',this)">${cat}</div>
          `).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Level</div>
          ${['All','Beginner','Intermediate','Advanced'].map(l=>`
            <div class="sidebar-link exp-lvl-link ${l==='All'?'active':''}" onclick="filterExpLevel('${l}',this)">${l}</div>
          `).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Equipment Guide</div>
          ${['Digital Multimeter','Oscilloscope','Function Generator','Breadboard','Power Supply'].map(e=>`
            <div class="sidebar-link" onclick="showEquipModal('${e}')">${icons.beaker} ${e}</div>
          `).join('')}
        </div>
      </aside>

      <main class="page-content">
        <div class="page-header">
          <h1 class="page-title">🔬 Virtual Lab</h1>
          <p>Step-by-step lab experiments with procedures, observation tables and viva questions.</p>
          <div style="display:flex;gap:0.75rem;margin-top:1rem;flex-wrap:wrap;">
            <div class="stat-card" style="flex:1;min-width:120px;padding:1rem;">
              <div class="stat-value text-primary">${DATA.experiments.length}</div>
              <div class="stat-label">Experiments</div>
            </div>
            <div class="stat-card" style="flex:1;min-width:120px;padding:1rem;">
              <div class="stat-value text-green">5</div>
              <div class="stat-label">Equipment Guides</div>
            </div>
            <div class="stat-card" style="flex:1;min-width:120px;padding:1rem;">
              <div class="stat-value text-amber">PDF</div>
              <div class="stat-label">Downloadable</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:1rem;" id="exp-list">
          ${renderExpCards(DATA.experiments)}
        </div>
      </main>
    </div>
  `;
  window.filterExp = (cat, el) => {
    document.querySelectorAll('.exp-cat-link').forEach(l=>l.classList.remove('active'));
    if (el) el.classList.add('active');
    expCat = cat;
    applyExpFilters();
  };
  window.filterExpLevel = (lvl, el) => {
    document.querySelectorAll('.exp-lvl-link').forEach(l=>l.classList.remove('active'));
    if (el) el.classList.add('active');
    expLevel = lvl;
    applyExpFilters();
  };
  window.showEquipModal = (name) => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header"><h3>🔬 ${name}</h3><button onclick="this.closest('.modal-overlay').remove()" class="btn btn-ghost">${icons.x}</button></div>
        <p>Equipment guide for the ${name}. Learn how to use it, read its measurements, and avoid common errors.</p>
        <div style="background:var(--color-bg-elevated);padding:1rem;border-radius:var(--radius-md);margin-top:1rem;">
          <h4 style="margin-bottom:0.5rem;">Quick Tips</h4>
          <ul style="color:var(--color-text-muted);line-height:2;font-size:0.875rem;">
            <li>• Always check range settings before measuring</li>
            <li>• Red probe = positive terminal</li>
            <li>• Never measure resistance in a live circuit</li>
            <li>• Start with the highest range and work down</li>
          </ul>
        </div>
        <button class="btn btn-secondary" style="margin-top:1rem;" onclick="this.closest('.modal-overlay').remove()">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if(e.target===modal) modal.remove(); });
  };
}

// ── EXPERIMENT DETAIL ─────────────────────────────────────
function renderExperiment(id) {
  const exp = DATA.experiments.find(e=>e.id===id) || DATA.experiments[0];
  let completedSteps = new Set();

  document.getElementById('page-experiment').innerHTML = `
    <main class="page-content" style="max-width:860px;margin:0 auto;">
      <div class="breadcrumb">
        <span onclick="navigate('virtual-lab')" style="cursor:pointer;">Virtual Lab</span>
        <span class="breadcrumb-sep">›</span>
        <span style="color:var(--color-text);">${exp.name}</span>
      </div>

      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:2rem;flex-wrap:wrap;">
        <div>
          <div style="display:flex;gap:0.5rem;margin-bottom:0.75rem;flex-wrap:wrap;">
            <span class="badge badge-slate">${exp.num}</span>
            <span class="badge ${utils.levelColor(exp.level)}">${exp.level}</span>
            <span class="badge badge-blue">${exp.category}</span>
            <span class="badge badge-slate">⏱ ${exp.time}</span>
          </div>
          <h1 style="font-size:1.6rem;">${exp.name}</h1>
          <p style="margin-top:0.5rem;"><strong>Aim:</strong> ${exp.aim}</p>
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm" onclick="showToast('PDF download starting…','info')">Download PDF</button>
          <button class="btn btn-secondary btn-sm" onclick="utils.toggleBookmark('exp-${id}')">${icons.bookmark}</button>
        </div>
      </div>

      <!-- Sections -->
      <div style="display:flex;flex-direction:column;gap:2rem;">

        <!-- Apparatus -->
        <div class="card">
          <h3 style="margin-bottom:1rem;">🧰 Apparatus Required</h3>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            ${exp.apparatus.map(a=>`<span class="badge badge-slate" style="font-size:0.8rem;padding:0.3rem 0.8rem;">${a}</span>`).join('')}
          </div>
        </div>

        <!-- Procedure -->
        <div class="card">
          <h3 style="margin-bottom:1rem;">📋 Procedure</h3>
          <div style="display:flex;flex-direction:column;gap:0.75rem;" id="procedure-list">
            ${exp.procedure.map((step, i)=>`
              <div id="step-${i}" style="display:flex;gap:1rem;align-items:flex-start;padding:0.9rem;border-radius:var(--radius-md);border:1px solid var(--color-border);background:var(--color-bg-elevated);cursor:pointer;transition:all 0.2s;" onclick="toggleStep(${i})">
                <div id="step-num-${i}" style="width:28px;height:28px;border-radius:50%;border:2px solid var(--color-border);background:transparent;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.8rem;font-weight:700;color:var(--color-text-dim);">${i+1}</div>
                <p style="margin:0;font-size:0.9rem;line-height:1.6;flex:1;">${step}</p>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:1rem;font-size:0.82rem;color:var(--color-text-dim);">💡 Click each step to mark it as complete</div>
        </div>

        <!-- Observation Table -->
        <div class="card">
          <h3 style="margin-bottom:1rem;">📊 Observation Table</h3>
          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;min-width:300px;">
              <thead>
                <tr style="background:var(--color-bg-elevated);">
                  <th style="padding:0.75rem;border:1px solid var(--color-border);font-size:0.8rem;color:var(--color-text-dim);text-align:left;">S.No</th>
                  ${exp.observations.map(o=>`<th style="padding:0.75rem;border:1px solid var(--color-border);font-size:0.8rem;color:var(--color-text-dim);text-align:left;">${o}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${Array.from({length:6},(_, i)=>`
                  <tr>
                    <td style="padding:0.65rem 0.75rem;border:1px solid var(--color-border);color:var(--color-text-dim);font-size:0.875rem;">${i+1}</td>
                    ${exp.observations.map(()=>`<td style="padding:0;border:1px solid var(--color-border);"><input style="width:100%;background:transparent;border:none;padding:0.6rem 0.75rem;color:var(--color-text);font-size:0.875rem;outline:none;" placeholder="—"></td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Conclusion -->
        <div class="card" style="border-left:3px solid var(--color-green);">
          <h3 style="margin-bottom:0.75rem;color:var(--color-green);">✅ Expected Conclusion</h3>
          <p>${exp.conclusion}</p>
        </div>

        <!-- Viva Q&A -->
        <div class="card">
          <h3 style="margin-bottom:1.25rem;">❓ Viva Questions & Answers</h3>
          <div style="display:flex;flex-direction:column;gap:1rem;">
            ${exp.vivaQA.map((qa,i)=>`
              <div style="border:1px solid var(--color-border);border-radius:var(--radius-md);overflow:hidden;">
                <div style="padding:0.9rem 1rem;cursor:pointer;display:flex;align-items:center;justify-content:space-between;background:var(--color-bg-elevated);" onclick="toggleViva(${i})">
                  <span style="font-weight:500;font-size:0.9rem;">Q${i+1}. ${qa.q}</span>
                  <span id="viva-toggle-${i}" style="color:var(--color-text-dim);">▼</span>
                </div>
                <div id="viva-ans-${i}" style="display:none;padding:1rem;border-top:1px solid var(--color-border);">
                  <span style="font-size:0.85rem;color:var(--color-text-muted);line-height:1.7;">📌 ${qa.a}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;padding-top:1rem;border-top:1px solid var(--color-border);">
          <button class="btn btn-secondary" onclick="navigate('virtual-lab')">${icons.arrow_left} Back to Virtual Lab</button>
          <button class="btn btn-green" onclick="showToast('Experiment marked complete! 🎉','success')">Mark Complete ${icons.check}</button>
        </div>
      </div>
    </main>
  `;

  window.toggleStep = (i) => {
    if (completedSteps.has(i)) completedSteps.delete(i);
    else completedSteps.add(i);
    const numEl = document.getElementById(`step-num-${i}`);
    const stepEl = document.getElementById(`step-${i}`);
    if (completedSteps.has(i)) {
      numEl.style.background = 'rgba(34,197,94,0.2)';
      numEl.style.borderColor = 'var(--color-green)';
      numEl.style.color = 'var(--color-green)';
      numEl.innerHTML = icons.check;
      stepEl.style.borderColor = 'rgba(34,197,94,0.3)';
    } else {
      numEl.style.background = 'transparent';
      numEl.style.borderColor = 'var(--color-border)';
      numEl.style.color = 'var(--color-text-dim)';
      numEl.innerHTML = i+1;
      stepEl.style.borderColor = 'var(--color-border)';
    }
  };

  window.toggleViva = (i) => {
    const ans = document.getElementById(`viva-ans-${i}`);
    const tog = document.getElementById(`viva-toggle-${i}`);
    if (ans.style.display === 'none') { ans.style.display = 'block'; tog.textContent = '▲'; }
    else { ans.style.display = 'none'; tog.textContent = '▼'; }
  };
}

// ── AI CHAT ───────────────────────────────────────────────
function renderAIChat() {
  document.getElementById('page-ask-lab-mate').innerHTML = `
    <div style="display:flex;gap:1.5rem;padding:1.5rem;height:calc(100vh - var(--header-h));box-sizing:border-box;">
      <!-- Left sidebar -->
      <div style="width:220px;flex-shrink:0;display:flex;flex-direction:column;gap:1rem;">
        <button class="btn btn-primary" style="width:100%;" onclick="clearChat()">+ New Chat</button>
        <div class="card card-compact">
          <div style="font-size:0.75rem;color:var(--color-text-dim);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.75rem;">Suggested Questions</div>
          <div style="display:flex;flex-direction:column;gap:0.4rem;">
            ${DATA.aiSuggestions.slice(0,6).map(q=>`
              <div style="padding:0.5rem 0.6rem;border-radius:var(--radius-sm);font-size:0.78rem;cursor:pointer;color:var(--color-text-muted);border:1px solid transparent;transition:all 0.2s;" onmouseover="this.style.background='var(--color-bg-elevated)';this.style.borderColor='var(--color-border)'" onmouseout="this.style.background='transparent';this.style.borderColor='transparent'" onclick="sendQuickQ('${q.replace(/'/g,"\\'")}')">
                ${q}
              </div>
            `).join('')}
          </div>
        </div>
        <div class="card card-compact">
          <div style="font-size:0.75rem;color:var(--color-text-dim);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.75rem;">AI Capabilities</div>
          ${['Concept Tutor','Circuit Explainer','Component Helper','Lab Assistant','Code Assistant','Error Debugger'].map(c=>`
            <div style="font-size:0.8rem;color:var(--color-text-muted);padding:0.3rem 0;display:flex;align-items:center;gap:0.5rem;">
              <span style="color:var(--color-green);">${icons.check}</span>${c}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Chat main -->
      <div style="flex:1;display:flex;flex-direction:column;min-width:0;">
        <div class="chat-container" style="flex:1;">
          <div class="chat-messages" id="chat-messages">
            <!-- Welcome message -->
            <div style="text-align:center;padding:2rem 1rem;">
              <div style="font-size:3rem;margin-bottom:1rem;">🤖</div>
              <h3>Ask Lab Mate AI</h3>
              <p style="max-width:400px;margin:0.5rem auto 0;font-size:0.9rem;">Your electronics tutor. Ask anything — from basic concepts to circuit troubleshooting. I'll explain at your level with source references.</p>
            </div>
            <!-- Initial AI message -->
            <div class="chat-bubble ai">
              <div class="ai-label">Lab Mate AI</div>
              Hi! I'm Lab Mate AI, your electronics learning assistant. 👋<br><br>
              I can help you with:
              <ul style="margin-top:0.5rem;padding-left:1rem;line-height:1.9;">
                <li>⚡ Explaining circuit concepts</li>
                <li>🔧 Understanding components</li>
                <li>🔬 Lab experiment guidance</li>
                <li>💻 Arduino/ESP32 code help</li>
              </ul>
              What would you like to learn today?
            </div>
          </div>
          <div class="chat-input-area">
            <textarea class="chat-input" id="chat-input" rows="1" placeholder="Ask about any electronics concept, component or circuit…" oninput="autoResizeChat(this)" onkeydown="handleChatKey(event)"></textarea>
            <button class="btn btn-primary" onclick="sendChatMessage()">${icons.send}</button>
          </div>
        </div>
        <div style="margin-top:0.75rem;font-size:0.75rem;color:var(--color-text-dim);text-align:center;">
          ⚠️ Lab Mate AI explains concepts for learning. Always verify component ratings against manufacturer datasheets.
        </div>
      </div>
    </div>
  `;

  window.autoResizeChat = (el) => {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  window.handleChatKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  };

  window.sendQuickQ = (q) => {
    document.getElementById('chat-input').value = q;
    sendChatMessage();
  };

  window.clearChat = () => {
    State.chatHistory = [];
    renderAIChat();
  };

  window.sendChatMessage = () => {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    const messages = document.getElementById('chat-messages');
    // User bubble
    messages.innerHTML += `<div class="chat-bubble user animate-fadein">${msg}</div>`;
    input.value = '';
    input.style.height = 'auto';

    // Loading indicator
    const loadId = 'ai-loading-' + Date.now();
    messages.innerHTML += `<div class="chat-bubble ai animate-fadein" id="${loadId}"><div class="ai-label">Lab Mate AI</div><span class="animate-pulse">Thinking…</span></div>`;
    messages.scrollTop = messages.scrollHeight;

    // Simulate AI response
    setTimeout(() => {
      const lel = document.getElementById(loadId);
      if (!lel) return;
      const response = getAIResponse(msg);
      lel.innerHTML = `<div class="ai-label">Lab Mate AI</div>${formatAIResponse(response)}
        <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid var(--color-border);font-size:0.75rem;color:var(--color-text-dim);display:flex;gap:0.75rem;flex-wrap:wrap;">
          <span>📖 Source: Lab Mate Knowledge Base</span>
          <span onclick="navigate('learn')" style="cursor:pointer;color:var(--color-primary);">Related lessons →</span>
        </div>`;
      messages.scrollTop = messages.scrollHeight;
    }, 800 + Math.random()*600);

    State.chatHistory.push({ role:'user', content:msg });
  };

  function getAIResponse(q) {
    const lower = q.toLowerCase();
    if (lower.includes('transistor') || lower.includes('bjt')) return DATA.aiResponses['transistor'];
    if (lower.includes("ohm's law") || lower.includes('v=ir') || lower.includes('voltage current resistance')) return DATA.aiResponses['ohms law'];
    if (lower.includes('led') || lower.includes('light emitting')) return DATA.aiResponses['led'];
    if (lower.includes('capacitor')) return DATA.aiResponses['capacitor'];
    return DATA.aiResponses.default(q);
  }

  function formatAIResponse(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="code-inline">$1</code>')
      .replace(/```([\s\S]+?)```/g, '<div class="code-block" style="margin:0.75rem 0;">$1</div>')
      .replace(/\|(.+)\|/g, (m) => {
        const cells = m.split('|').filter(c=>c.trim());
        return `<tr>${cells.map(c=>`<td style="padding:0.4rem 0.75rem;border:1px solid var(--color-border);">${c.trim()}</td>`).join('')}</tr>`;
      })
      .replace(/(<tr>.*<\/tr>)/gs, '<table style="width:100%;border-collapse:collapse;margin:0.75rem 0;font-size:0.875rem;">$1</table>')
      .replace(/^#{3}\s+(.+)$/gm, '<h4 style="margin:1rem 0 0.5rem;color:var(--color-text);">$1</h4>')
      .replace(/^#{2}\s+(.+)$/gm, '<h3 style="margin:1rem 0 0.5rem;">$1</h3>')
      .replace(/\n- (.+)/g, '<li style="margin-left:1rem;line-height:1.9;color:var(--color-text-muted);">$1</li>')
      .replace(/(<li.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p style="margin-top:0.5rem;color:var(--color-text-muted);">')
      .replace(/^(.)/s, '<p style="color:var(--color-text-muted);">$1')
      + '</p>';
  }
}

// ── PRACTICE ──────────────────────────────────────────────
function renderPractice() {
  document.getElementById('page-practice').innerHTML = `
    <div class="page-with-sidebar">
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">Topics</div>
          ${[
            {id:'fundamentals', label:'Electrical Fundamentals', count:7},
            {id:'components',   label:'Components',              count:5},
            {id:'digital',      label:'Digital Electronics',     count:4},
          ].map(t=>`
            <div class="sidebar-link" onclick="startQuiz('${t.id}',this)">
              ${t.label} <span class="count">${t.count}</span>
            </div>
          `).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Mode</div>
          <div class="sidebar-link practice-mode-link active" onclick="setPracticeMode('learning',this)">📖 Learning Mode</div>
          <div class="sidebar-link practice-mode-link" onclick="setPracticeMode('timed',this)">⏱️ Timed Mode</div>
          <div class="sidebar-link practice-mode-link" onclick="document.getElementById('practice-picker').style.display='block';document.getElementById('practice-quiz').style.display='none';document.getElementById('flashcards-section').scrollIntoView({behavior:'smooth'});">🃏 Flashcards</div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">My Stats</div>
          <div style="padding:0.5rem 0.75rem;">
            ${[['Total Attempted','42','text-primary'],['Correct','31','text-green'],['Accuracy','74%','text-amber']].map(([l,v,c])=>`
              <div style="display:flex;justify-content:space-between;padding:0.35rem 0;font-size:0.82rem;">
                <span class="text-dim">${l}</span><span class="${c} font-semibold">${v}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </aside>

      <main class="page-content">
        <div class="page-header">
          <h1 class="page-title">🎯 Practice Centre</h1>
          <p>Topic-wise quizzes, flashcards and mock assessments.</p>
        </div>

        <!-- Topic picker (shown when no quiz active) -->
        <div id="practice-picker">
          <div class="grid-3 stagger" style="margin-bottom:2rem;">
            ${[
              {id:'fundamentals', icon:'⚡', title:'Electrical Fundamentals', desc:'Ohm\'s Law, power, series/parallel circuits', count:7, color:'#3b82f6'},
              {id:'components',   icon:'🔧', title:'Electronic Components',   desc:'Identify and understand common components', count:5, color:'#8b5cf6'},
              {id:'digital',      icon:'1️⃣', title:'Digital Electronics',    desc:'Logic gates, Boolean algebra, number systems', count:4, color:'#22c55e'},
            ].map(t=>`
              <div class="card" style="cursor:pointer;border-left:3px solid ${t.color};" onclick="startQuiz('${t.id}')">
                <div style="font-size:2rem;margin-bottom:0.75rem;">${t.icon}</div>
                <h3 style="font-size:1rem;margin-bottom:0.4rem;">${t.title}</h3>
                <p style="font-size:0.82rem;margin-bottom:1rem;">${t.desc}</p>
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <span class="badge badge-slate">${t.count} questions</span>
                  <button class="btn btn-primary btn-sm">Start</button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Flashcard preview -->
          <div id="flashcards-section" class="section-header"><div class="section-title">🃏 <h3>Flashcards</h3></div></div>
          <div class="grid-4">
            ${[
              ["What is Ohm's Law?", "V = I × R"],
              ["Unit of capacitance?", "Farad (F)"],
              ["BJT terminals?", "Base, Collector, Emitter"],
              ["NAND gate output when A=1, B=1?", "Output = 0"],
            ].map(([q,a])=>`
              <div class="card card-compact" style="cursor:pointer;text-align:center;" data-q="${q.replace(/"/g,'&quot;')}" data-a="${a.replace(/"/g,'&quot;')}" onclick="flipCard(this)">
                <div style="font-size:0.75rem;color:var(--color-text-dim);margin-bottom:0.5rem;">QUESTION</div>
                <div style="font-size:0.9rem;font-weight:600;">${q}</div>
                <div style="margin-top:0.75rem;font-size:0.75rem;color:var(--color-primary);">Click to reveal answer</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quiz panel -->
        <div id="practice-quiz" style="display:none;max-width:680px;"></div>
      </main>
    </div>
  `;

  let practiceMode = 'learning';
  window.setPracticeMode = (mode, el) => {
    practiceMode = mode;
    document.querySelectorAll('.practice-mode-link').forEach(l=>l.classList.remove('active'));
    if (el) el.classList.add('active');
    showToast(mode === 'timed' ? 'Timed Mode enabled (60s per quiz) ⏱️' : 'Learning Mode enabled 📖', 'info');
  };

  window.flipCard = (card) => {
    const question = card.dataset.q;
    const answer = card.dataset.a;
    const isFlipped = card.dataset.flipped === 'true';
    card.dataset.flipped = !isFlipped;
    card.innerHTML = isFlipped
      ? `<div style="font-size:0.75rem;color:var(--color-text-dim);margin-bottom:0.5rem;">QUESTION</div><div style="font-size:0.9rem;font-weight:600;">${question}</div><div style="margin-top:0.75rem;font-size:0.75rem;color:var(--color-primary);">Click to reveal answer</div>`
      : `<div style="font-size:0.75rem;color:var(--color-green);margin-bottom:0.5rem;">ANSWER</div><div style="font-size:1rem;font-weight:700;color:var(--color-green);">${answer}</div><div style="margin-top:0.75rem;font-size:0.75rem;color:var(--color-text-dim);">Click to see question</div>`;
  };

  let quizTimer = null;
  let quizSecondsLeft = 60;

  window.startQuiz = (topicId) => {
    const qs = DATA.quizzes[topicId];
    if (!qs) { showToast('No questions for this topic yet', 'info'); return; }
    if (quizTimer) { clearInterval(quizTimer); quizTimer = null; }
    document.getElementById('practice-picker').style.display = 'none';
    document.getElementById('practice-quiz').style.display = 'block';
    State.quizIndex = 0; State.quizScore = 0; State.currentQuiz = topicId;
    quizSecondsLeft = 60;
    if (practiceMode === 'timed') {
      quizTimer = setInterval(() => {
        quizSecondsLeft--;
        const tEl = document.getElementById('quiz-timer-badge');
        if (tEl) tEl.textContent = `⏱️ ${quizSecondsLeft}s`;
        if (quizSecondsLeft <= 0) {
          clearInterval(quizTimer); quizTimer = null;
          showToast('Time up! ⏱️', 'warn');
          renderPracticeQ(qs, qs.length);
        }
      }, 1000);
    }
    renderPracticeQ(qs, 0);
  };

  window.renderPracticeQ = (qs, idx) => {
    const container = document.getElementById('practice-quiz');
    if (idx >= qs.length) {
      if (quizTimer) { clearInterval(quizTimer); quizTimer = null; }
      container.innerHTML = `
        <div class="card" style="text-align:center;padding:3rem;">
          <div style="font-size:3rem;margin-bottom:1rem;">${State.quizScore >= qs.length*0.7 ? '🎉' : '📚'}</div>
          <h2 style="margin-bottom:0.5rem;">Quiz Complete!</h2>
          <div style="font-size:1.5rem;font-weight:800;color:var(--color-primary);margin:1rem 0;">${State.quizScore} / ${qs.length}</div>
          <div class="progress-bar" style="max-width:200px;margin:0 auto 1.5rem;height:10px;"><div class="progress-bar-fill" style="width:${Math.round(State.quizScore/qs.length*100)}%;"></div></div>
          <p>${State.quizScore >= qs.length*0.7 ? 'Great job! You\'re mastering this topic.' : 'Keep practicing — review the explanations and try again.'}</p>
          <div style="display:flex;gap:1rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="startQuiz(State.currentQuiz)">Retry Quiz</button>
            <button class="btn btn-secondary" onclick="document.getElementById('practice-picker').style.display='block';document.getElementById('practice-quiz').style.display='none';">Pick Another Topic</button>
          </div>
        </div>
      `;
      return;
    }
    const q = qs[idx];
    let answered = false;
    container.innerHTML = `
      <div class="animate-fadein">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <span class="text-muted text-sm">Question ${idx+1} of ${qs.length}</span>
          <div style="display:flex;gap:0.75rem;align-items:center;">
            ${practiceMode === 'timed' ? `<span id="quiz-timer-badge" class="badge badge-amber">⏱️ ${quizSecondsLeft}s</span>` : ''}
            <span class="text-sm font-semibold">Score: ${State.quizScore}/${qs.length}</span>
          </div>
        </div>
        <div class="progress-bar" style="margin-bottom:1.5rem;"><div class="progress-bar-fill" style="width:${(idx/qs.length)*100}%;"></div></div>
        <div class="card">
          <h3 style="margin-bottom:1.25rem;font-size:1rem;line-height:1.6;">${q.q}</h3>
          <div style="display:flex;flex-direction:column;gap:0.6rem;">
            ${q.options.map((o,i)=>`
              <div class="quiz-option" onclick="practiceAnswer(${i},${q.answer})">
                <span style="font-weight:600;margin-right:0.5rem;">${String.fromCharCode(65+i)}.</span>${o}
              </div>
            `).join('')}
          </div>
          <div id="practice-feedback" style="display:none;margin-top:1.25rem;"></div>
        </div>
      </div>
    `;

    window.practiceAnswer = (chosen, correct) => {
      if(answered) return;
      answered = true;
      const opts = document.querySelectorAll('#practice-quiz .quiz-option');
      opts[correct].classList.add('correct');
      if(chosen!==correct) opts[chosen].classList.add('wrong');
      else State.quizScore++;
      const fb = document.getElementById('practice-feedback');
      fb.style.display = 'block';
      fb.innerHTML = `
        <div style="padding:0.9rem 1rem;border-radius:var(--radius-md);background:${chosen===correct?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)'};border:1px solid ${chosen===correct?'rgba(34,197,94,0.3)':'rgba(239,68,68,0.3)'};">
          <div style="font-weight:700;color:${chosen===correct?'var(--color-green)':'var(--color-red)'};">${chosen===correct?'✅ Correct!':'❌ Incorrect'}</div>
          <div style="font-size:0.875rem;margin-top:0.5rem;color:var(--color-text-muted);">📖 ${q.explanation}</div>
          <button class="btn btn-primary btn-sm" style="margin-top:0.75rem;" onclick="renderPracticeQ(DATA.quizzes['${State.currentQuiz}'],${idx+1})">Next ${icons.arrow_right}</button>
        </div>
      `;
    };
  };
}

// ── PROJECTS ──────────────────────────────────────────────
function renderProjects() {
  let projLevel = 'All';
  let projCat = 'All';

  function applyProjectFilters() {
    const filtered = DATA.projects.filter(p =>
      (projLevel === 'All' || p.level === projLevel) &&
      (projCat === 'All' || p.category === projCat)
    );
    document.getElementById('project-grid').innerHTML = renderProjectGrid(filtered);
  }

  document.getElementById('page-projects').innerHTML = `
    <div class="page-with-sidebar">
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">Level</div>
          ${['All','Beginner','Intermediate','Advanced'].map(l=>`
            <div class="sidebar-link proj-lvl-link ${l==='All'?'active':''}" onclick="filterProjects('${l}',null,this)">${l}</div>
          `).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Category</div>
          ${['All','Embedded','Sensors','Automation','IoT','Robotics','Audio & LED','Creative Art'].map(c=>`
            <div class="sidebar-link proj-cat-link ${c==='All'?'active':''}" onclick="filterProjectCat('${c}',this)">${c}</div>
          `).join('')}
        </div>
      </aside>

      <main class="page-content">
        <div class="page-header">
          <h1 class="page-title">🚀 Project Hub</h1>
          <p>Guided projects from first LED blink to IoT dashboards — with components, code and troubleshooting.</p>
          <div id="project-level-filters" style="display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap;">
            ${['All','Beginner','Intermediate','Advanced'].map(l=>`
              <button class="btn ${l==='All'?'btn-primary':'btn-secondary'} btn-sm" onclick="filterProjects('${l}',this)">${l}</button>
            `).join('')}
          </div>
        </div>

        <div class="grid-auto stagger" id="project-grid">
          ${renderProjectGrid(DATA.projects)}
        </div>
      </main>
    </div>
  `;

  window.filterProjects = (level, btn, sideEl) => {
    projLevel = level;
    document.querySelectorAll('#project-level-filters .btn-sm').forEach(b=>b.classList.replace('btn-primary','btn-secondary'));
    if(btn) btn.classList.replace('btn-secondary','btn-primary');
    else {
      const matchBtn = [...document.querySelectorAll('#project-level-filters .btn-sm')].find(b=>b.textContent.trim()===level);
      if(matchBtn) matchBtn.classList.replace('btn-secondary','btn-primary');
    }
    document.querySelectorAll('.proj-lvl-link').forEach(l=>l.classList.remove('active'));
    if(sideEl) sideEl.classList.add('active');
    applyProjectFilters();
  };

  window.filterProjectCat = (cat, el) => {
    projCat = cat;
    document.querySelectorAll('.proj-cat-link').forEach(l=>l.classList.remove('active'));
    if(el) el.classList.add('active');
    applyProjectFilters();
  };
}

function renderProjectGrid(list) {
  const levelColor = {Beginner:'#22c55e', Intermediate:'#f59e0b', Advanced:'#ef4444'};
  return list.map(p=>`
    <div class="card" style="cursor:pointer;border-top:3px solid ${levelColor[p.level]||'#64748b'};" onclick="showProjectModal('${p.id}')">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem;">
        <span class="badge ${utils.levelColor(p.level)}">${p.level}</span>
        <div style="display:flex;gap:0.5rem;">
          <span class="badge badge-slate">⏱ ${p.time}</span>
          <span class="badge badge-blue">${p.category}</span>
        </div>
      </div>
      <h3 style="font-size:1rem;margin-bottom:0.5rem;">${p.name}</h3>
      <p style="font-size:0.85rem;margin-bottom:1.25rem;">${p.desc}</p>
      <div style="font-size:0.78rem;color:var(--color-text-dim);margin-bottom:1rem;">🔧 ${p.components.length} components needed</div>
      <button class="btn btn-primary btn-sm" style="width:100%;">View Project ${icons.arrow_right}</button>
    </div>
  `).join('');
}

function showProjectModal(id) {
  const p = DATA.projects.find(x=>x.id===id);
  if (!p) return;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" style="max-width:680px;">
      <div class="modal-header">
        <div>
          <div style="display:flex;gap:0.5rem;margin-bottom:0.5rem;">
            <span class="badge ${utils.levelColor(p.level)}">${p.level}</span>
            <span class="badge badge-blue">${p.category}</span>
            <span class="badge badge-slate">⏱ ${p.time}</span>
          </div>
          <h2 style="font-size:1.3rem;">${p.name}</h2>
        </div>
        <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-ghost">${icons.x}</button>
      </div>
      <p style="margin-bottom:1.25rem;">${p.desc}</p>

      <h4 style="margin-bottom:0.75rem;">🔧 Components Required</h4>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.5rem;">
        ${p.components.map(c=>`<span class="badge badge-slate">${c}</span>`).join('')}
      </div>

      ${(typeof SVGParts !== 'undefined' && SVGParts.getProjectDiagram(p.id)) || p.diagram ? `
        <h4 style="margin-bottom:0.75rem;">📐 Wiring &amp; Breadboard Diagram</h4>
        <div style="background:#0d1117;border:1px solid var(--color-border);border-radius:var(--radius-md);padding:1rem;margin-bottom:0.6rem;text-align:center;">
          ${(typeof SVGParts !== 'undefined' && SVGParts.getProjectDiagram(p.id)) || p.diagram}
        </div>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;font-size:0.75rem;color:var(--color-text-dim);margin-bottom:1.5rem;">
          <span>🔴 <strong style="color:#f87171;">Red:</strong> +VCC / Power</span>
          <span>⚫ <strong style="color:#94a3b8;">Black/Slate:</strong> GND (0V)</span>
          <span>🔵🟢🟡 <strong style="color:#60a5fa;">Coloured:</strong> Signal / PWM / Data</span>
        </div>
      ` : ''}

      ${p.workingPrinciple ? `
        <h4 style="margin-bottom:0.6rem;">⚡ How It Works</h4>
        <div class="card card-elevated" style="padding:1rem;margin-bottom:1.5rem;border-left:3px solid var(--color-primary);">
          <p style="margin:0;font-size:0.9rem;line-height:1.7;">${p.workingPrinciple}</p>
        </div>
      ` : ''}

      ${p.componentRoles && p.componentRoles.length ? `
        <h4 style="margin-bottom:0.75rem;">🧩 What Each Component Does</h4>
        <div style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.5rem;">
          ${p.componentRoles.map(cr=>`
            <div style="padding:0.75rem 1rem;background:var(--color-bg-elevated);border:1px solid var(--color-border);border-radius:var(--radius-md);">
              <div style="font-weight:600;color:var(--color-primary);font-size:0.875rem;">${cr.name}</div>
              <div style="font-size:0.83rem;color:var(--color-text-muted);margin-top:0.2rem;line-height:1.5;">${cr.role}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${p.code ? `
        <h4 style="margin-bottom:0.75rem;">💻 Source Code</h4>
        <div class="code-block" style="margin-bottom:1.5rem;white-space:pre;">${p.code}</div>
      ` : ''}

      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); navigate('ask-lab-mate')">${icons.bot} Get Help from AI</button>
        <button class="btn btn-secondary" onclick="window.open('https://wokwi.com/','_blank')">${icons.external} Simulate on Wokwi</button>
        <button class="btn btn-secondary" onclick="utils.toggleBookmark('proj-${id}')">${icons.bookmark} Save</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if(e.target===modal) modal.remove(); });
}
