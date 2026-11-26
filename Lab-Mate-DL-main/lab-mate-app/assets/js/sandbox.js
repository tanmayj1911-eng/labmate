// ============================================================
// LAB MATE – Tinkercad-Style 2D Interactive Circuit Sandbox
// Place all 38 registered components, smooth 60fps drag,
// every breadboard hole connectable, Ctrl+Z Undo / Redo.
// ============================================================

const Sandbox = {
  items: [],     // { uid, compId, x, y, name }
  wires: [],     // { id, fromUid, fromPin, toUid, toPin, color, lane }
  wireColor: '#ef4444',
  pendingPin: null, // { uid, pinId, label, x, y }
  selectedUid: null,
  simulating: false,
  nextUid: 1,
  dragState: null,
  catFilter: 'All',
  searchQ: '',
  history: [],
  redoStack: [],
};

function snapshotSandbox() {
  return JSON.stringify({
    items: Sandbox.items,
    wires: Sandbox.wires,
    nextUid: Sandbox.nextUid,
    selectedUid: Sandbox.selectedUid,
  });
}

function pushSandboxHistory() {
  Sandbox.history.push(snapshotSandbox());
  if (Sandbox.history.length > 50) Sandbox.history.shift();
  Sandbox.redoStack = [];
}

window.undoSandbox = () => {
  if (!Sandbox.history.length) {
    showToast('Nothing left to undo', 'info');
    return;
  }
  Sandbox.redoStack.push(snapshotSandbox());
  const prev = JSON.parse(Sandbox.history.pop());
  Sandbox.items = prev.items;
  Sandbox.wires = prev.wires;
  Sandbox.nextUid = prev.nextUid;
  Sandbox.selectedUid = prev.selectedUid;
  Sandbox.pendingPin = null;
  renderSandboxCanvas();
  showToast('Undid last action (Ctrl+Z)', 'info');
};

window.redoSandbox = () => {
  if (!Sandbox.redoStack.length) return;
  Sandbox.history.push(snapshotSandbox());
  const next = JSON.parse(Sandbox.redoStack.pop());
  Sandbox.items = next.items;
  Sandbox.wires = next.wires;
  Sandbox.nextUid = next.nextUid;
  Sandbox.selectedUid = next.selectedUid;
  Sandbox.pendingPin = null;
  renderSandboxCanvas();
  showToast('Redid action (Ctrl+Y)', 'info');
};

// Global keyboard shortcuts for Sandbox
document.addEventListener('keydown', (e) => {
  if (typeof State === 'undefined' || State.currentPage !== 'sandbox') return;
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
    e.preventDefault();
    undoSandbox();
  } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
    e.preventDefault();
    redoSandbox();
  } else if (e.key === 'Escape' && Sandbox.pendingPin) {
    Sandbox.pendingPin = null;
    const hint = document.getElementById('sb-pin-hint');
    if (hint) hint.textContent = '';
    renderSandboxCanvas();
  } else if ((e.key === 'Delete' || e.key === 'Backspace') && Sandbox.selectedUid) {
    e.preventDefault();
    removeSandboxPart(Sandbox.selectedUid);
  }
});

function renderSandbox() {
  const page = document.getElementById('page-sandbox');
  if (!page) return;

  const cats = ['All', 'Embedded', 'Sensors', 'Electromechanical', 'Semiconductor', 'Passive', 'Active', 'Connectivity', 'Power'];

  page.innerHTML = `
    <div style="display:grid;grid-template-columns:250px 1fr 250px;height:calc(100vh - var(--header-h));min-height:600px;overflow:hidden;">
      <!-- Left: Component Palette (All 38 Components) -->
      <aside style="background:var(--color-bg-alt);border-right:1px solid var(--color-border);display:flex;flex-direction:column;overflow:hidden;">
        <div style="padding:0.85rem;border-bottom:1px solid var(--color-border);">
          <div style="font-weight:700;font-size:0.9rem;margin-bottom:0.5rem;">🧩 Components (${DATA.components.length})</div>
          <input class="input" id="sb-search" type="text" placeholder="Search parts…" style="padding:0.4rem 0.65rem;font-size:0.8rem;margin-bottom:0.5rem;" oninput="Sandbox.searchQ=this.value.toLowerCase(); renderSandboxPalette();">
          <select class="input" style="padding:0.35rem 0.5rem;font-size:0.78rem;" onchange="Sandbox.catFilter=this.value; renderSandboxPalette();">
            ${cats.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div id="sb-palette" style="flex:1;overflow-y:auto;padding:0.5rem;display:flex;flex-direction:column;gap:0.4rem;"></div>
      </aside>

      <!-- Center: 2D Workbench -->
      <main style="display:flex;flex-direction:column;background:#090d16;overflow:hidden;">
        <!-- Toolbar -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;padding:0.6rem 0.9rem;background:var(--color-bg-alt);border-bottom:1px solid var(--color-border);flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
            <span style="font-size:0.75rem;color:var(--color-text-dim);margin-right:0.2rem;">Wire:</span>
            ${[
              ['#ef4444','Red (+VCC)'],
              ['#1e293b','Black (GND)'],
              ['#3b82f6','Blue (Sig)'],
              ['#22c55e','Green (Data)'],
              ['#f59e0b','Orange (PWM)'],
              ['#a855f7','Purple (Analog)'],
              ['#06b6d4','Cyan (UART)'],
            ].map(([col, title]) => `
              <button title="${title}" onclick="Sandbox.wireColor='${col}'; document.querySelectorAll('.sb-col-btn').forEach(b=>b.style.outline='none'); this.style.outline='2px solid #fff';"
                class="sb-col-btn" style="width:18px;height:18px;border-radius:50%;background:${col};border:1.5px solid #94a3b8;cursor:pointer;${Sandbox.wireColor===col?'outline:2px solid #fff;':''}"></button>
            `).join('')}
          </div>

          <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
            <select class="input" style="padding:0.3rem 0.5rem;font-size:0.75rem;width:auto;" onchange="if(this.value){ loadSandboxTemplate(this.value); this.value=''; }">
              <option value="">Load Starter Circuit…</option>
              <option value="led-blink">LED Blink (Uno + Breadboard + LED)</option>
              <option value="ultrasonic">HC-SR04 Ultrasonic Distance</option>
              <option value="line-follower">2-Sensor Line Follower</option>
              <option value="bldc-esc">BLDC Motor + ESC + Uno</option>
            </select>
            <button class="btn btn-primary btn-sm" id="sb-sim-btn" onclick="toggleSandboxSim()">▶ Simulate</button>
            <button class="btn btn-secondary btn-sm" onclick="undoSandbox()" title="Undo (Ctrl+Z)">↩ Undo</button>
            <button class="btn btn-secondary btn-sm" onclick="redoSandbox()" title="Redo (Ctrl+Y)">↪ Redo</button>
            <button class="btn btn-secondary btn-sm" onclick="clearSandbox()">🗑 Clear</button>
          </div>
        </div>

        <!-- Status Bar -->
        <div id="sb-status" style="padding:0.35rem 0.9rem;background:#0f172a;border-bottom:1px solid var(--color-border);font-size:0.76rem;color:#94a3b8;display:flex;justify-content:space-between;gap:0.5rem;flex-wrap:wrap;">
          <span>💡 <strong>Drag &amp; drop</strong> from pin to pin to wire · <strong>Click a wire</strong> (or <strong>✕</strong>) to delete · <strong>Ctrl+Z</strong> Undo</span>
          <span id="sb-pin-hint" style="color:var(--color-primary);font-weight:600;"></span>
        </div>

        <!-- 2D SVG Canvas -->
        <div style="flex:1;position:relative;overflow:auto;">
          <svg id="sb-canvas" viewBox="0 0 920 540" width="100%" height="100%" style="min-width:780px;min-height:480px;display:block;user-select:none;background-image:radial-gradient(#1e293b 1.2px, transparent 1.2px);background-size:20px 20px;">
            <g id="sb-layer-parts"></g>
            <g id="sb-layer-wires"></g>
            <g id="sb-layer-preview" style="pointer-events:none;"></g>
            <g id="sb-layer-pins"></g>
          </svg>
        </div>
      </main>

      <!-- Right: Inspector & Live Diagnostics -->
      <aside style="background:var(--color-bg-alt);border-left:1px solid var(--color-border);display:flex;flex-direction:column;overflow:hidden;">
        <div style="padding:0.85rem;border-bottom:1px solid var(--color-border);font-weight:700;font-size:0.88rem;">
          🔌 Connections &amp; Check
        </div>
        <div id="sb-inspector" style="flex:1;overflow-y:auto;padding:0.75rem;display:flex;flex-direction:column;gap:0.6rem;font-size:0.8rem;"></div>
      </aside>
    </div>
  `;

  if (Sandbox.items.length === 0) {
    loadSandboxTemplate('led-blink', true);
  } else {
    renderSandboxPalette();
    renderSandboxCanvas();
  }
}

window.renderSandboxPalette = () => {
  const box = document.getElementById('sb-palette');
  if (!box) return;
  const list = DATA.components.filter(c =>
    (Sandbox.catFilter === 'All' || c.category === Sandbox.catFilter) &&
    (!Sandbox.searchQ || c.name.toLowerCase().includes(Sandbox.searchQ) || c.desc.toLowerCase().includes(Sandbox.searchQ))
  );
  box.innerHTML = list.map(c => {
    const part = SVGParts.getSandboxPart(c.id);
    return `
      <div onclick="addSandboxPart('${c.id}')" style="display:flex;align-items:center;gap:0.55rem;padding:0.45rem 0.55rem;background:var(--color-bg-elevated);border:1px solid var(--color-border);border-radius:var(--radius-sm);cursor:pointer;" title="Click to add ${c.name} to workbench">
        <div style="width:38px;height:28px;background:#0d1117;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;">
          ${part ? `<svg viewBox="0 0 ${part.w} ${part.h}" width="34" height="24">${part.svg}</svg>` : `<span style="font-size:0.65rem;">${c.symbol}</span>`}
        </div>
        <div style="min-width:0;flex:1;">
          <div style="font-size:0.76rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.name}</div>
          <div style="font-size:0.65rem;color:var(--color-text-dim);">${c.category} · ${part ? part.pins.length : 0} ${c.id==='breadboard'?'holes':'pins'}</div>
        </div>
        <span style="color:var(--color-primary);font-weight:800;font-size:0.9rem;">+</span>
      </div>
    `;
  }).join('');
};

window.addSandboxPart = (compId, customX, customY, skipHistory = false) => {
  const c = DATA.components.find(x => x.id === compId);
  const part = SVGParts.getSandboxPart(compId);
  if (!c || !part) return null;
  if (!skipHistory) pushSandboxHistory();
  const uid = 'p' + (Sandbox.nextUid++);
  const offset = (Sandbox.items.length % 6) * 26;
  const item = {
    uid,
    compId,
    name: c.name,
    x: customX !== undefined ? customX : 120 + offset,
    y: customY !== undefined ? customY : 90 + offset,
  };
  Sandbox.items.push(item);
  Sandbox.selectedUid = uid;
  if (!skipHistory) renderSandboxCanvas();
  return uid;
};

window.removeSandboxPart = (uid) => {
  pushSandboxHistory();
  Sandbox.items = Sandbox.items.filter(i => i.uid !== uid);
  Sandbox.wires = Sandbox.wires.filter(w => w.fromUid !== uid && w.toUid !== uid);
  if (Sandbox.pendingPin && Sandbox.pendingPin.uid === uid) Sandbox.pendingPin = null;
  if (Sandbox.selectedUid === uid) Sandbox.selectedUid = null;
  renderSandboxCanvas();
};

window.deleteSandboxWire = (idx) => {
  pushSandboxHistory();
  Sandbox.wires.splice(idx, 1);
  renderSandboxCanvas();
};

window.clearSandbox = () => {
  if (Sandbox.items.length || Sandbox.wires.length) pushSandboxHistory();
  Sandbox.items = [];
  Sandbox.wires = [];
  Sandbox.pendingPin = null;
  Sandbox.selectedUid = null;
  Sandbox.simulating = false;
  renderSandboxCanvas();
};

window.toggleSandboxSim = () => {
  Sandbox.simulating = !Sandbox.simulating;
  const btn = document.getElementById('sb-sim-btn');
  if (btn) {
    btn.textContent = Sandbox.simulating ? '⏹ Stop Sim' : '▶ Simulate';
    btn.className = Sandbox.simulating ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm';
  }
  renderSandboxCanvas();
};

window.loadSandboxTemplate = (tpl, isInitial = false) => {
  if (!isInitial) pushSandboxHistory();
  Sandbox.items = [];
  Sandbox.wires = [];
  Sandbox.pendingPin = null;
  Sandbox.simulating = false;
  if (tpl === 'led-blink') {
    const uno = addSandboxPart('arduino-uno', 70, 140, true);
    const bb  = addSandboxPart('breadboard', 360, 130, true);
    const res = addSandboxPart('resistor', 430, 185, true);
    const led = addSandboxPart('led', 540, 172, true);
    Sandbox.wires.push(
      { id:'w1', fromUid:uno, fromPin:'D13', toUid:res, toPin:'L1', color:'#3b82f6', lane:-34 },
      { id:'w2', fromUid:res, fromPin:'L2',  toUid:led, toPin:'A',  color:'#f59e0b', lane:0 },
      { id:'w3', fromUid:led, fromPin:'K',   toUid:bb,  toPin:'BN_15', color:'#1e293b', lane:14 },
      { id:'w4', fromUid:uno, fromPin:'GND', toUid:bb,  toPin:'BN_2',  color:'#1e293b', lane:28 }
    );
  } else if (tpl === 'ultrasonic') {
    const uno = addSandboxPart('arduino-uno', 70, 160, true);
    const us  = addSandboxPart('ultrasonic-hcsr04', 380, 90, true);
    Sandbox.wires.push(
      { id:'w1', fromUid:uno, fromPin:'5V',  toUid:us, toPin:'VCC',  color:'#ef4444', lane:28 },
      { id:'w2', fromUid:uno, fromPin:'GND', toUid:us, toPin:'GND',  color:'#1e293b', lane:38 },
      { id:'w3', fromUid:uno, fromPin:'D4',  toUid:us, toPin:'TRIG', color:'#3b82f6', lane:-24 },
      { id:'w4', fromUid:uno, fromPin:'D5',  toUid:us, toPin:'ECHO', color:'#22c55e', lane:-34 }
    );
  } else if (tpl === 'line-follower') {
    const uno = addSandboxPart('arduino-uno', 230, 160, true);
    const irl = addSandboxPart('sensor-ir', 60, 80, true);
    const irr = addSandboxPart('sensor-ir', 60, 220, true);
    const drv = addSandboxPart('l298n', 500, 140, true);
    const ml  = addSandboxPart('dc-motor-bo', 680, 100, true);
    const mr  = addSandboxPart('dc-motor-bo', 680, 210, true);
    Sandbox.wires.push(
      { id:'w1', fromUid:irl, fromPin:'OUT', toUid:uno, toPin:'D2', color:'#3b82f6', lane:-24 },
      { id:'w2', fromUid:irr, fromPin:'OUT', toUid:uno, toPin:'D3', color:'#f59e0b', lane:-14 },
      { id:'w3', fromUid:uno, fromPin:'D8',  toUid:drv, toPin:'IN1', color:'#22c55e', lane:-24 },
      { id:'w4', fromUid:uno, fromPin:'D9',  toUid:drv, toPin:'IN2', color:'#a855f7', lane:-32 },
      { id:'w5', fromUid:drv, fromPin:'OUT1', toUid:ml, toPin:'P', color:'#f59e0b', lane:-12 },
      { id:'w6', fromUid:drv, fromPin:'OUT2', toUid:ml, toPin:'M', color:'#ef4444', lane:12 },
      { id:'w7', fromUid:drv, fromPin:'OUT3', toUid:mr, toPin:'P', color:'#a855f7', lane:-12 },
      { id:'w8', fromUid:drv, fromPin:'OUT4', toUid:mr, toPin:'M', color:'#3b82f6', lane:12 }
    );
  } else if (tpl === 'bldc-esc') {
    const uno = addSandboxPart('arduino-uno', 80, 150, true);
    const bldc = addSandboxPart('bldc-motor', 420, 140, true);
    Sandbox.wires.push(
      { id:'w1', fromUid:uno, fromPin:'D9',  toUid:bldc, toPin:'PWM', color:'#f59e0b', lane:-24 },
      { id:'w2', fromUid:uno, fromPin:'5V',  toUid:bldc, toPin:'BEC', color:'#ef4444', lane:22 },
      { id:'w3', fromUid:uno, fromPin:'GND', toUid:bldc, toPin:'GND', color:'#1e293b', lane:32 }
    );
  }
  renderSandboxPalette();
  renderSandboxCanvas();
};

function renderSandboxWiresOnly() {
  const wiresG = document.getElementById('sb-layer-wires');
  if (!wiresG) return;
  wiresG.innerHTML = Sandbox.wires.map((w, idx) => {
    const p1 = getSandboxPinAbs(w.fromUid, w.fromPin);
    const p2 = getSandboxPinAbs(w.toUid, w.toPin);
    if (!p1 || !p2) return '';
    return `
      <g style="cursor:pointer;" onclick="deleteSandboxWire(${idx})" onmouseenter="document.getElementById('sb-pin-hint').textContent='Click wire to delete (${w.fromPin} → ${w.toPin})'" onmouseleave="document.getElementById('sb-pin-hint').textContent=''">
        <title>Click to delete wire (${w.fromPin} → ${w.toPin})</title>
        <path d="M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}" stroke="transparent" stroke-width="12" fill="none"/>
        ${SVGParts.wire(p1.x, p1.y, p2.x, p2.y, w.color, w.lane || 0)}
      </g>`;
  }).join('');
}

function renderSandboxCanvas() {
  const partsG = document.getElementById('sb-layer-parts');
  const pinsG  = document.getElementById('sb-layer-pins');
  const insp   = document.getElementById('sb-inspector');
  if (!partsG || !pinsG) return;

  // 1. Render parts
  partsG.innerHTML = Sandbox.items.map(item => {
    const part = SVGParts.getSandboxPart(item.compId);
    if (!part) return '';
    const sel = Sandbox.selectedUid === item.uid;
    return `
      <g id="sb-part-${item.uid}" transform="translate(${item.x}, ${item.y})" style="cursor:grab;will-change:transform;" onmousedown="startSandboxDrag(event, '${item.uid}')">
        ${sel ? `<rect x="-5" y="-5" width="${part.w+10}" height="${part.h+10}" rx="6" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,3"/>` : ''}
        ${part.svg}
        <text x="${part.w/2}" y="${part.h+13}" fill="#94a3b8" font-size="8" font-weight="600" text-anchor="middle">${item.name}</text>
      </g>
    `;
  }).join('');

  // 2. Render 2D orthogonal wires
  renderSandboxWiresOnly();

  // 3. Render clickable pin sockets (including every breadboard hole)
  pinsG.innerHTML = Sandbox.items.map(item => {
    const part = SVGParts.getSandboxPart(item.compId);
    if (!part) return '';
    return part.pins.map(pin => {
      const px = item.x + pin.dx;
      const py = item.y + pin.dy;
      const isPending = Sandbox.pendingPin && Sandbox.pendingPin.uid === item.uid && Sandbox.pendingPin.pinId === pin.id;
      const baseR = pin.small ? 2.6 : 4.2;
      const fill = isPending ? '#22c55e' : (pin.small ? (pin.kind === 'vcc' ? 'rgba(239,68,68,0.45)' : pin.kind === 'gnd' ? 'rgba(59,130,246,0.45)' : 'rgba(15,23,42,0.18)') : (pin.kind === 'vcc' ? '#ef4444' : pin.kind === 'gnd' ? '#64748b' : '#fbbf24'));
      const stroke = pin.small ? (isPending ? '#ffffff' : 'transparent') : '#0f172a';
      return `
        <circle class="sb-pin-${item.uid}" data-uid="${item.uid}" data-pin="${pin.id}" data-label="${item.name} [${pin.label}]" data-dx="${pin.dx}" data-dy="${pin.dy}" cx="${px}" cy="${py}" r="${isPending ? 5.5 : baseR}" fill="${fill}" stroke="${stroke}" stroke-width="1.1" style="cursor:crosshair;transition:r 0.1s ease;"
          onmouseenter="this.setAttribute('r','5.5'); document.getElementById('sb-pin-hint').textContent='${item.name} → ${pin.label}'"
          onmouseleave="this.setAttribute('r','${isPending ? 5.5 : baseR}'); if(!Sandbox.pendingPin) document.getElementById('sb-pin-hint').textContent=''"
          onmousedown="startWireDrag(event, '${item.uid}', '${pin.id}', '${item.name} [${pin.label}]', ${px}, ${py})">
          <title>${item.name} — ${pin.label} (Drag to another pin to connect)</title>
        </circle>
      `;
    }).join('');
  }).join('');

  // 4. Simulation visual feedback + On-page Instructions + Inspector
  if (insp) {
    const diag = runSandboxDiagnostics();
    insp.innerHTML = `
      <div style="padding:0.6rem;border-radius:var(--radius-sm);background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);">
        <div style="font-weight:700;color:var(--color-primary);margin-bottom:0.3rem;font-size:0.78rem;">📖 How to Use Sandbox</div>
        <ul style="font-size:0.72rem;color:var(--color-text-muted);line-height:1.55;padding-left:0.9rem;list-style:disc;">
          <li><strong>Connect Wire:</strong> Drag from any pin or breadboard hole and drop onto another.</li>
          <li><strong>Delete Wire:</strong> Click directly on any wire on the canvas, click <strong>✕</strong> below, or press <strong>Ctrl+Z</strong>.</li>
          <li><strong>Move Part:</strong> Drag any component body smoothly.</li>
          <li><strong>Delete Part:</strong> Select a part and press <strong>Del</strong> (or click Remove).</li>
        </ul>
      </div>

      <div style="padding:0.6rem;border-radius:var(--radius-sm);background:${diag.ok ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)'};border:1px solid ${diag.ok ? 'rgba(34,197,94,0.35)' : 'rgba(245,158,11,0.35)'};">
        <div style="font-weight:700;color:${diag.ok ? 'var(--color-green)' : 'var(--color-amber)'};margin-bottom:0.25rem;">
          ${Sandbox.simulating ? (diag.ok ? '✅ Simulation Active' : '⚠️ Check Wiring') : '🔍 Circuit Status'}
        </div>
        <div style="font-size:0.75rem;color:var(--color-text-muted);line-height:1.5;">${diag.msg}</div>
      </div>

      ${Sandbox.selectedUid ? (() => {
        const it = Sandbox.items.find(x => x.uid === Sandbox.selectedUid);
        return it ? `
          <div style="padding:0.6rem;background:var(--color-bg-elevated);border:1px solid var(--color-border);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;">
            <span style="font-weight:600;font-size:0.76rem;">Selected: ${it.name}</span>
            <button class="btn btn-secondary btn-sm" style="padding:0.2rem 0.5rem;font-size:0.7rem;" onclick="removeSandboxPart('${it.uid}')">Remove</button>
          </div>
        ` : '';
      })() : ''}

      <div style="font-weight:700;font-size:0.75rem;color:var(--color-text-dim);text-transform:uppercase;margin-top:0.25rem;">
        Wires (${Sandbox.wires.length})
      </div>
      ${Sandbox.wires.length ? Sandbox.wires.map((w, i) => {
        const a = Sandbox.items.find(x => x.uid === w.fromUid);
        const b = Sandbox.items.find(x => x.uid === w.toUid);
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:0.4rem;padding:0.4rem 0.5rem;background:var(--color-bg-elevated);border-left:3px solid ${w.color};border-radius:4px;font-size:0.73rem;">
            <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;">${a?.name.split(' ')[0]||'?'}:${w.fromPin} → ${b?.name.split(' ')[0]||'?'}:${w.toPin}</span>
            <button onclick="deleteSandboxWire(${i})" style="background:none;border:none;color:var(--color-text-dim);cursor:pointer;">✕</button>
          </div>
        `;
      }).join('') : `<div style="color:var(--color-text-dim);font-size:0.75rem;">No wires yet. Click any pin or breadboard hole to start wiring.</div>`}
    `;
  }
}

function getSandboxPinAbs(uid, pinId) {
  const item = Sandbox.items.find(i => i.uid === uid);
  if (!item) return null;
  const part = SVGParts.getSandboxPart(item.compId);
  if (!part) return null;
  const pin = part.pins.find(p => p.id === pinId);
  if (!pin) return null;
  return { x: item.x + pin.dx, y: item.y + pin.dy };
}

window.startWireDrag = (e, uid, pinId, label, px, py) => {
  e.stopPropagation();
  const svg = document.getElementById('sb-canvas');
  const previewG = document.getElementById('sb-layer-preview');
  const hint = document.getElementById('sb-pin-hint');
  if (!svg || !previewG) return;

  Sandbox.pendingPin = { uid, pinId, label, x: px, y: py };
  if (hint) hint.textContent = `Drag from ${label} → Drop on destination pin…`;

  const pt = svg.createSVGPoint();
  let curX = px, curY = py;
  let rafId = null;

  const drawPreview = () => {
    rafId = null;
    previewG.innerHTML = SVGParts.wire(px, py, curX, curY, Sandbox.wireColor, 0);
  };

  const onMove = (ev) => {
    pt.x = ev.clientX; pt.y = ev.clientY;
    const np = pt.matrixTransform(svg.getScreenCTM().inverse());
    curX = Math.round(np.x);
    curY = Math.round(np.y);
    if (!rafId) rafId = requestAnimationFrame(drawPreview);
  };

  const onUp = (ev) => {
    if (rafId) cancelAnimationFrame(rafId);
    previewG.innerHTML = '';
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);

    const dropEl = document.elementFromPoint(ev.clientX, ev.clientY);
    const targetPin = dropEl && dropEl.closest ? dropEl.closest('circle[data-uid]') : null;
    if (targetPin) {
      const toUid = targetPin.dataset.uid;
      const toPin = targetPin.dataset.pin;
      if (toUid !== uid || toPin !== pinId) {
        pushSandboxHistory();
        const lane = ((Sandbox.wires.length % 5) - 2) * 12;
        Sandbox.wires.push({
          id: 'w' + Date.now(),
          fromUid: uid,
          fromPin: pinId,
          toUid,
          toPin,
          color: Sandbox.wireColor,
          lane,
        });
        Sandbox.pendingPin = null;
        if (hint) hint.textContent = '';
        renderSandboxCanvas();
        return;
      }
    }
    Sandbox.pendingPin = null;
    if (hint) hint.textContent = '';
  };

  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
};

// Smooth 60fps requestAnimationFrame drag (no full DOM rebuild during move)
window.startSandboxDrag = (e, uid) => {
  if (e.target.tagName === 'circle') return;
  const item = Sandbox.items.find(i => i.uid === uid);
  const svg = document.getElementById('sb-canvas');
  if (!item || !svg) return;

  const startSnapshot = snapshotSandbox();
  const startX = item.x;
  const startY = item.y;
  if (Sandbox.selectedUid !== uid) {
    Sandbox.selectedUid = uid;
    renderSandboxCanvas();
  }

  const partGroup = document.getElementById(`sb-part-${uid}`);
  if (partGroup) partGroup.style.cursor = 'grabbing';
  const pinEls = [...document.querySelectorAll(`.sb-pin-${uid}`)];

  const pt = svg.createSVGPoint();
  pt.x = e.clientX; pt.y = e.clientY;
  const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
  const offX = svgP.x - item.x;
  const offY = svgP.y - item.y;

  let rafId = null;
  let targetX = item.x;
  let targetY = item.y;

  const applyFrame = () => {
    rafId = null;
    item.x = targetX;
    item.y = targetY;
    if (partGroup) partGroup.setAttribute('transform', `translate(${item.x}, ${item.y})`);
    for (let i = 0; i < pinEls.length; i++) {
      const el = pinEls[i];
      el.setAttribute('cx', item.x + Number(el.dataset.dx));
      el.setAttribute('cy', item.y + Number(el.dataset.dy));
    }
    renderSandboxWiresOnly();
  };

  const onMove = (ev) => {
    pt.x = ev.clientX; pt.y = ev.clientY;
    const np = pt.matrixTransform(svg.getScreenCTM().inverse());
    targetX = Math.max(8, Math.min(840, Math.round(np.x - offX)));
    targetY = Math.max(8, Math.min(470, Math.round(np.y - offY)));
    if (!rafId) rafId = requestAnimationFrame(applyFrame);
  };

  const onUp = () => {
    if (rafId) { cancelAnimationFrame(rafId); applyFrame(); }
    if (partGroup) partGroup.style.cursor = 'grab';
    if (item.x !== startX || item.y !== startY) {
      Sandbox.history.push(startSnapshot);
      if (Sandbox.history.length > 50) Sandbox.history.shift();
      Sandbox.redoStack = [];
    }
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };

  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
};

function runSandboxDiagnostics() {
  if (!Sandbox.items.length) return { ok: false, msg: 'Add components from the left palette or load a starter circuit.' };
  if (!Sandbox.wires.length) return { ok: false, msg: 'Components placed! Click two pins or breadboard holes to connect a 2D wire.' };
  const hasGnd = Sandbox.wires.some(w =>
    w.fromPin.includes('GND') || w.toPin.includes('GND') ||
    w.fromPin.startsWith('TN_') || w.toPin.startsWith('TN_') ||
    w.fromPin.startsWith('BN_') || w.toPin.startsWith('BN_') ||
    w.fromPin === 'K' || w.toPin === 'K'
  );
  const hasLed = Sandbox.items.some(i => i.compId === 'led');
  const hasRes = Sandbox.items.some(i => i.compId === 'resistor');
  if (hasLed && !hasRes) {
    return { ok: false, msg: '⚠️ LED detected without a current-limiting Resistor (220Ω–470Ω recommended).' };
  }
  if (!hasGnd) {
    return { ok: false, msg: '⚠️ No GND return connection detected yet. Connect GND pins to complete the circuit.' };
  }
  return { ok: true, msg: `${Sandbox.items.length} parts & ${Sandbox.wires.length} 2D wires connected with GND return.` };
}
