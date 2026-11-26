// ============================================================
// LAB MATE – Accurate Fritzing-Style Graphic Vector Parts,
// Pinout Diagrams, Breadboards & Verified Wiring Diagrams
// ============================================================

const SVGParts = {
  // ── 2D Orthogonal (Manhattan) Jumper Wire with Halo Casing ─
  wire(x1, y1, x2, y2, color = '#ef4444', lane = 0) {
    let path = '';
    if (Math.abs(x1 - x2) <= 3 || Math.abs(y1 - y2) <= 3) {
      path = `M ${x1} ${y1} L ${x2} ${y2}`;
    } else if (lane < 0) {
      const my = Math.min(y1, y2) + lane;
      path = `M ${x1} ${y1} L ${x1} ${my} L ${x2} ${my} L ${x2} ${y2}`;
    } else if (lane > 0) {
      const my = Math.max(y1, y2) + lane;
      path = `M ${x1} ${y1} L ${x1} ${my} L ${x2} ${my} L ${x2} ${y2}`;
    } else {
      const mx = Math.round((x1 + x2) / 2);
      path = `M ${x1} ${y1} L ${mx} ${y1} L ${mx} ${y2} L ${x2} ${y2}`;
    }
    return `
      <path d="${path}" fill="none" stroke="rgba(13,17,23,0.92)" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="${path}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
      <rect x="${x1-2.5}" y="${y1-2.5}" width="5" height="5" rx="1" fill="#0f172a" stroke="#e2e8f0" stroke-width="0.7"/>
      <rect x="${x2-2.5}" y="${y2-2.5}" width="5" height="5" rx="1" fill="#0f172a" stroke="#e2e8f0" stroke-width="0.7"/>
    `;
  },

  // ── Solderless Breadboard (830-pt style with labeled rails) ─
  breadboard(x, y, w = 260, h = 130) {
    let holes = '';
    for (let cx = x + 18; cx <= x + w - 16; cx += 11) {
      holes += `<rect x="${cx-1.3}" y="${y+10}" width="2.6" height="2.6" rx="0.5" fill="#1e293b"/>`;
      holes += `<rect x="${cx-1.3}" y="${y+18}" width="2.6" height="2.6" rx="0.5" fill="#1e293b"/>`;
      for (let r = 0; r < 3; r++) {
        holes += `<rect x="${cx-1.3}" y="${y+34+r*9}" width="2.6" height="2.6" rx="0.5" fill="#1e293b"/>`;
        holes += `<rect x="${cx-1.3}" y="${y+h-56+r*9}" width="2.6" height="2.6" rx="0.5" fill="#1e293b"/>`;
      }
      holes += `<rect x="${cx-1.3}" y="${y+h-20}" width="2.6" height="2.6" rx="0.5" fill="#1e293b"/>`;
      holes += `<rect x="${cx-1.3}" y="${y+h-12}" width="2.6" height="2.6" rx="0.5" fill="#1e293b"/>`;
    }
    return `
      <g>
        <rect x="${x+2}" y="${y+3}" width="${w}" height="${h}" rx="6" fill="rgba(0,0,0,0.45)"/>
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
        <line x1="${x+12}" y1="${y+6}" x2="${x+w-10}" y2="${y+6}" stroke="#ef4444" stroke-width="1.5"/>
        <line x1="${x+12}" y1="${y+24}" x2="${x+w-10}" y2="${y+24}" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="${x+6}" y="${y+13}" fill="#dc2626" font-size="8" font-weight="900">+</text>
        <text x="${x+6}" y="${y+22}" fill="#2563eb" font-size="8" font-weight="900">−</text>
        <rect x="${x+8}" y="${y+h/2-4}" width="${w-16}" height="7" rx="2" fill="#cbd5e1"/>
        <line x1="${x+12}" y1="${y+h-24}" x2="${x+w-10}" y2="${y+h-24}" stroke="#ef4444" stroke-width="1.5"/>
        <line x1="${x+12}" y1="${y+h-6}" x2="${x+w-10}" y2="${y+h-6}" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="${x+6}" y="${y+h-16}" fill="#dc2626" font-size="8" font-weight="900">+</text>
        <text x="${x+6}" y="${y+h-8}" fill="#2563eb" font-size="8" font-weight="900">−</text>
        ${holes}
        <text x="${x+w-12}" y="${y+h/2+1.5}" fill="#64748b" font-size="6.5" font-weight="800" text-anchor="end">BREADBOARD</text>
      </g>
    `;
  },

  // ── Arduino Uno R3 (Exact Pin Header Positions & Labels) ───
  // Top header y = y+7: GND(x+44), D13(x+54), D12(x+64), D11(x+74), D10(x+84), D9(x+94), D8(x+104), D7(x+115), D6(x+124), D5(x+133), D4(x+142), D3(x+151), D2(x+160), TX1(x+169), RX0(x+178)
  // Bot header y = y+117: 3V3(x+58), 5V(x+69), GND(x+80), GND(x+90), VIN(x+100), A0(x+118), A1(x+129), A2(x+140), A3(x+151), A4(x+162), A5(x+173)
  arduinoUno(x, y) {
    const topPins = [
      ['GND',44],['13',54],['12',64],['~11',74],['~10',84],['~9',94],['8',104],
      ['7',115],['~6',124],['~5',133],['4',142],['~3',151],['2',160],['TX',169],['RX',178]
    ];
    const botPins = [
      ['3V3',58],['5V',69],['GND',80],['GND',90],['VIN',100],
      ['A0',118],['A1',129],['A2',140],['A3',151],['A4',162],['A5',173]
    ];
    return `
      <g>
        <rect x="${x+2}" y="${y+3}" width="188" height="124" rx="5" fill="rgba(0,0,0,0.45)"/>
        <rect x="${x}" y="${y}" width="188" height="124" rx="5" fill="#00878f" stroke="#0e7490" stroke-width="1.5"/>
        <!-- USB-B Port -->
        <rect x="${x-9}" y="${y+16}" width="26" height="24" rx="2" fill="#cbd5e1" stroke="#64748b" stroke-width="1.2"/>
        <rect x="${x-5}" y="${y+20}" width="18" height="16" fill="#94a3b8"/>
        <!-- DC Barrel Jack -->
        <rect x="${x-7}" y="${y+84}" width="28" height="22" rx="2" fill="#1e293b" stroke="#0f172a" stroke-width="1"/>
        <!-- Reset Button -->
        <rect x="${x+18}" y="${y+5}" width="11" height="11" rx="2" fill="#e2e8f0"/>
        <circle cx="${x+23.5}" cy="${y+10.5}" r="3" fill="#ef4444"/>
        <!-- Top Digital Header -->
        <rect x="${x+38}" y="${y+3}" width="146" height="9" rx="1" fill="#0f172a"/>
        ${topPins.map(([lbl,ox])=>`
          <rect x="${x+ox-1.8}" y="${y+5}" width="3.6" height="4" fill="#fbbf24"/>
          <text x="${x+ox}" y="${y+20}" fill="#e2e8f0" font-size="5" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
        <!-- Bottom Power + Analog Header -->
        <rect x="${x+52}" y="${y+112}" width="128" height="9" rx="1" fill="#0f172a"/>
        ${botPins.map(([lbl,ox])=>`
          <rect x="${x+ox-1.8}" y="${y+115}" width="3.6" height="4" fill="#fbbf24"/>
          <text x="${x+ox}" y="${y+109}" fill="#e2e8f0" font-size="5" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
        <!-- ATmega328P DIP Chip -->
        <rect x="${x+72}" y="${y+64}" width="66" height="19" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <circle cx="${x+77}" cy="${y+73.5}" r="2" fill="#64748b"/>
        <!-- 16MHz Crystal -->
        <rect x="${x+42}" y="${y+50}" width="18" height="7" rx="3" fill="#e2e8f0" stroke="#64748b" stroke-width="0.8"/>
        <!-- ON LED -->
        <circle cx="${x+158}" cy="${y+42}" r="2.5" fill="#22c55e"/>
        <text x="${x+108}" y="${y+44}" fill="#ffffff" font-size="10.5" font-weight="800" text-anchor="middle">ARDUINO</text>
        <text x="${x+108}" y="${y+54}" fill="#cffafe" font-size="7.5" font-weight="700" text-anchor="middle">UNO R3</text>
      </g>
    `;
  },

  // ── Arduino Nano (Exact Labeled Pins) ──────────────────────
  // Top row y = y+4: D12(22), D11(32), D10(42), D9(52), D8(62), D7(72), D6(82), D5(92), D4(102), D3(112), D2(122), GND(132)
  // Bot row y = y+54: D13(22), 3V3(32), A0(44), A1(54), A2(64), A3(74), A4(84), A5(94), 5V(106), GND(118), VIN(130)
  arduinoNano(x, y) {
    const topPins = [['D12',22],['D11',32],['D10',42],['D9',52],['D8',62],['D7',72],['D6',82],['D5',92],['D4',102],['D3',112],['D2',122],['GND',132]];
    const botPins = [['D13',22],['3V3',32],['A0',44],['A1',54],['A2',64],['A3',74],['A4',84],['A5',94],['5V',106],['GND',118],['VIN',130]];
    return `
      <g>
        <rect x="${x+2}" y="${y+3}" width="144" height="58" rx="4" fill="rgba(0,0,0,0.45)"/>
        <rect x="${x}" y="${y}" width="144" height="58" rx="4" fill="#1d4ed8" stroke="#3b82f6" stroke-width="1.5"/>
        <rect x="${x-6}" y="${y+19}" width="16" height="20" rx="2" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
        ${topPins.map(([lbl,ox])=>`
          <circle cx="${x+ox}" cy="${y+4}" r="2" fill="#fbbf24"/>
          <text x="${x+ox}" y="${y+13}" fill="#e2e8f0" font-size="4.6" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
        ${botPins.map(([lbl,ox])=>`
          <circle cx="${x+ox}" cy="${y+54}" r="2" fill="#fbbf24"/>
          <text x="${x+ox}" y="${y+48}" fill="#e2e8f0" font-size="4.6" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
        <rect x="${x+60}" y="${y+20}" width="18" height="18" transform="rotate(45 ${x+69} ${y+29})" fill="#0f172a" stroke="#475569" stroke-width="1"/>
        <circle cx="${x+38}" cy="${y+29}" r="4.5" fill="#e2e8f0"/>
        <circle cx="${x+38}" cy="${y+29}" r="2" fill="#ef4444"/>
        <text x="${x+106}" y="${y+32}" fill="#ffffff" font-size="8.5" font-weight="800" text-anchor="middle">NANO</text>
      </g>
    `;
  },

  // ── ESP32 DevKit V1 (30-Pin Labeled) ───────────────────────
  esp32(x, y) {
    const topPins = [['3V3',18],['GND',30],['D15',42],['D2',54],['D4',66],['RX2',78],['TX2',90],['D5',102],['D18',114],['D19',126],['D21',138],['D22',150],['D23',162]];
    const botPins = [['VIN',18],['GND',30],['D13',42],['D12',54],['D14',66],['D27',78],['D26',90],['D25',102],['D33',114],['D32',126],['D35',138],['D34',150],['EN',162]];
    return `
      <g>
        <rect x="${x+2}" y="${y+3}" width="176" height="74" rx="4" fill="rgba(0,0,0,0.45)"/>
        <rect x="${x}" y="${y}" width="176" height="74" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <rect x="${x+116}" y="${y+17}" width="46" height="40" rx="2" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>
        <text x="${x+139}" y="${y+39}" fill="#1e293b" font-size="7" font-weight="800" text-anchor="middle">ESP-WROOM</text>
        <rect x="${x-5}" y="${y+27}" width="13" height="20" rx="2" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>
        ${topPins.map(([lbl,ox])=>`
          <circle cx="${x+ox}" cy="${y+5}" r="2.2" fill="#fbbf24"/>
          <text x="${x+ox}" y="${y+14}" fill="#94a3b8" font-size="4.8" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
        ${botPins.map(([lbl,ox])=>`
          <circle cx="${x+ox}" cy="${y+69}" r="2.2" fill="#fbbf24"/>
          <text x="${x+ox}" y="${y+63}" fill="#94a3b8" font-size="4.8" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
        <text x="${x+62}" y="${y+39}" fill="#22d3ee" font-size="9" font-weight="800" text-anchor="middle">ESP32 DevKit</text>
      </g>
    `;
  },

  // ── Axial Resistor (Tan Body + 4 Color Bands) ──────────────
  resistor(x, y, b1 = '#dc2626', b2 = '#dc2626', b3 = '#92400e', label = '220Ω') {
    return `
      <g>
        <line x1="${x}" y1="${y+7}" x2="${x+52}" y2="${y+7}" stroke="#cbd5e1" stroke-width="2.2"/>
        <rect x="${x+10}" y="${y+1}" width="32" height="12" rx="4" fill="#e7c99b" stroke="#b48a5a" stroke-width="1"/>
        <rect x="${x+15}" y="${y+1}" width="3.5" height="12" fill="${b1}"/>
        <rect x="${x+22}" y="${y+1}" width="3.5" height="12" fill="${b2}"/>
        <rect x="${x+29}" y="${y+1}" width="3.5" height="12" fill="${b3}"/>
        <rect x="${x+36}" y="${y+1}" width="2.5" height="12" fill="#d97706"/>
        <text x="${x+26}" y="${y-3}" fill="#93c5fd" font-size="7.5" font-weight="700" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── Realistic Dome LED (Anode + long leg at x+8, Cathode − at x+16) ─
  led(x, y, color = '#22c55e', label = 'LED') {
    return `
      <g>
        <circle cx="${x+12}" cy="${y+12}" r="14" fill="${color}" opacity="0.18"/>
        <line x1="${x+8}" y1="${y+22}" x2="${x+8}" y2="${y+36}" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="${x+16}" y1="${y+22}" x2="${x+16}" y2="${y+32}" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M ${x+4} ${y+22} L ${x+4} ${y+12} A 8 8 0 0 1 ${x+20} ${y+12} L ${x+20} ${y+22} Z" fill="${color}" stroke="#ffffff" stroke-width="0.8" opacity="0.92"/>
        <rect x="${x+2}" y="${y+20}" width="20" height="3" rx="1" fill="${color}"/>
        <ellipse cx="${x+9}" cy="${y+10}" rx="2" ry="3" fill="#ffffff" opacity="0.5"/>
        <text x="${x+5}" y="${y+34}" fill="#f87171" font-size="6.5" font-weight="900">+</text>
        <text x="${x+19}" y="${y+32}" fill="#94a3b8" font-size="6.5" font-weight="900">−</text>
        <text x="${x+12}" y="${y-3}" fill="#e2e8f0" font-size="7.5" font-weight="700" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── L298N Dual H-Bridge Motor Driver (Exact Labeled Terminals) ─
  // Left Blue Screw: OUT1(x+6,y+30), OUT2(x+6,y+44)
  // Right Blue Screw: OUT3(x+100,y+30), OUT4(x+100,y+44)
  // Bottom Blue Screw: +12V(x+32,y+86), GND(x+50,y+86), +5V(x+68,y+86)
  // Control Header y=y+64: ENA(24), IN1(35), IN2(46), IN3(57), IN4(68), ENB(79)
  l298n(x, y) {
    const ctrl = [['ENA',24],['IN1',35],['IN2',46],['IN3',57],['IN4',68],['ENB',79]];
    return `
      <g>
        <rect x="${x+2}" y="${y+3}" width="108" height="94" rx="5" fill="rgba(0,0,0,0.45)"/>
        <rect x="${x}" y="${y}" width="108" height="94" rx="5" fill="#b91c1c" stroke="#ef4444" stroke-width="1.5"/>
        <!-- Heatsink -->
        <rect x="${x+30}" y="${y+6}" width="48" height="28" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
        <line x1="${x+40}" y1="${y+6}" x2="${x+40}" y2="${y+34}" stroke="#64748b" stroke-width="2"/>
        <line x1="${x+54}" y1="${y+6}" x2="${x+54}" y2="${y+34}" stroke="#64748b" stroke-width="2"/>
        <line x1="${x+68}" y1="${y+6}" x2="${x+68}" y2="${y+34}" stroke="#64748b" stroke-width="2"/>
        <!-- Left Motor A Terminal -->
        <rect x="${x+3}" y="${y+22}" width="16" height="28" rx="1" fill="#2563eb"/>
        <text x="${x+11}" y="${y+31}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">OUT1</text>
        <text x="${x+11}" y="${y+45}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">OUT2</text>
        <!-- Right Motor B Terminal -->
        <rect x="${x+89}" y="${y+22}" width="16" height="28" rx="1" fill="#2563eb"/>
        <text x="${x+97}" y="${y+31}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">OUT3</text>
        <text x="${x+97}" y="${y+45}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">OUT4</text>
        <!-- Bottom Power Terminal -->
        <rect x="${x+22}" y="${y+76}" width="64" height="15" rx="1" fill="#2563eb"/>
        <text x="${x+33}" y="${y+86}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">+12V</text>
        <text x="${x+54}" y="${y+86}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">GND</text>
        <text x="${x+75}" y="${y+86}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">+5V</text>
        <!-- 6-pin Control Header -->
        <rect x="${x+18}" y="${y+58}" width="72" height="9" rx="1" fill="#0f172a"/>
        ${ctrl.map(([lbl,ox])=>`
          <rect x="${x+ox-1.5}" y="${y+61}" width="3" height="3.5" fill="#fbbf24"/>
          <text x="${x+ox}" y="${y+55}" fill="#fecaca" font-size="4.8" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
        <text x="${x+54}" y="${y+44}" fill="#ffffff" font-size="7.5" font-weight="800" text-anchor="middle">L298N</text>
      </g>
    `;
  },

  // ── BO Geared DC Motor + Yellow Wheel (2 Terminal Tabs) ────
  boMotor(x, y, label = 'Motor') {
    return `
      <g>
        <rect x="${x}" y="${y}" width="18" height="44" rx="5" fill="#0f172a" stroke="#475569" stroke-width="1.2"/>
        <rect x="${x+3}" y="${y+6}" width="12" height="32" rx="3" fill="#eab308"/>
        <rect x="${x+18}" y="${y+11}" width="38" height="22" rx="3" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
        <rect x="${x+56}" y="${y+13}" width="16" height="18" rx="2" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
        <rect x="${x+72}" y="${y+15}" width="5" height="3" fill="#d97706"/>
        <rect x="${x+72}" y="${y+26}" width="5" height="3" fill="#d97706"/>
        <text x="${x+37}" y="${y+25}" fill="#422006" font-size="7" font-weight="800" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── IR Sensor Module (VCC, GND, OUT labeled) ───────────────
  irSensor(x, y, label = 'IR') {
    return `
      <g>
        <rect x="${x}" y="${y}" width="64" height="32" rx="3" fill="#1e40af" stroke="#3b82f6" stroke-width="1.2"/>
        <circle cx="${x-4}" cy="${y+9}" r="4" fill="#0f172a" stroke="#475569" stroke-width="1"/>
        <circle cx="${x-4}" cy="${y+23}" r="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
        <rect x="${x+12}" y="${y+9}" width="13" height="13" rx="1" fill="#0284c7"/>
        <circle cx="${x+18.5}" cy="${y+15.5}" r="3.5" fill="#e2e8f0"/>
        <text x="${x+36}" y="${y+18}" fill="#ffffff" font-size="7" font-weight="800" text-anchor="middle">${label}</text>
        <text x="${x+58}" y="${y+8}" fill="#fca5a5" font-size="5" font-weight="800" text-anchor="end">VCC</text>
        <text x="${x+58}" y="${y+18}" fill="#cbd5e1" font-size="5" font-weight="800" text-anchor="end">GND</text>
        <text x="${x+58}" y="${y+28}" fill="#93c5fd" font-size="5" font-weight="800" text-anchor="end">OUT</text>
      </g>
    `;
  },

  // ── Multi-Channel IR Array (VCC, GND, S1..S5 labeled) ───────
  irArray(x, y) {
    let leds = '';
    for (let i = 0; i < 6; i++) {
      leds += `<rect x="${x+8+i*15}" y="${y+28}" width="8" height="10" rx="1" fill="#0f172a" stroke="#64748b" stroke-width="0.8"/>`;
    }
    return `
      <g>
        <rect x="${x}" y="${y}" width="106" height="42" rx="4" fill="#0e7490" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="${x+53}" y="${y+13}" fill="#cffafe" font-size="7.5" font-weight="800" text-anchor="middle">IR ARRAY (5–10ch)</text>
        <text x="${x+53}" y="${y+22}" fill="#e2e8f0" font-size="5.5" font-weight="700" text-anchor="middle">VCC   GND   S1..S5</text>
        ${leds}
      </g>
    `;
  },

  // ── Ultrasonic Sensor HC-SR04 (VCC, TRIG, ECHO, GND) ───────
  ultrasonic(x, y) {
    const pins = [['VCC',26],['TRIG',38],['ECHO',50],['GND',62]];
    return `
      <g>
        <rect x="${x}" y="${y}" width="88" height="44" rx="4" fill="#1d4ed8" stroke="#60a5fa" stroke-width="1.5"/>
        <circle cx="${x+22}" cy="${y+20}" r="13" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
        <circle cx="${x+22}" cy="${y+20}" r="8" fill="#334155"/>
        <circle cx="${x+66}" cy="${y+20}" r="13" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
        <circle cx="${x+66}" cy="${y+20}" r="8" fill="#334155"/>
        <text x="${x+44}" y="${y+9}" fill="#bfdbfe" font-size="6.5" font-weight="800" text-anchor="middle">HC-SR04</text>
        ${pins.map(([lbl,ox])=>`
          <rect x="${x+ox-1.5}" y="${y+44}" width="3" height="6" fill="#cbd5e1"/>
          <text x="${x+ox}" y="${y+41}" fill="#ffffff" font-size="4.6" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
      </g>
    `;
  },

  // ── SG90 Micro Servo (Orange=PWM, Red=5V, Brown=GND) ───────
  servo(x, y, label = 'SG90') {
    return `
      <g>
        <rect x="${x}" y="${y}" width="54" height="32" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2"/>
        <rect x="${x-6}" y="${y+10}" width="66" height="6" rx="1" fill="#0284c7"/>
        <circle cx="${x+38}" cy="${y+16}" r="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        <rect x="${x+34}" y="${y+2}" width="8" height="28" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="0.8"/>
        <circle cx="${x+38}" cy="${y+16}" r="2.5" fill="#64748b"/>
        <text x="${x+16}" y="${y+20}" fill="#ffffff" font-size="7.5" font-weight="700" text-anchor="middle">${label}</text>
        <!-- 3-pin wire pigtail -->
        <line x1="${x+10}" y1="${y+32}" x2="${x+10}" y2="${y+40}" stroke="#f59e0b" stroke-width="2"/>
        <line x1="${x+16}" y1="${y+32}" x2="${x+16}" y2="${y+40}" stroke="#ef4444" stroke-width="2"/>
        <line x1="${x+22}" y1="${y+32}" x2="${x+22}" y2="${y+40}" stroke="#78350f" stroke-width="2"/>
      </g>
    `;
  },

  // ── Sound Sensor Module KY-038 / MAX4466 (AO, G, +, DO) ────
  soundSensor(x, y) {
    const pins = [['AO',12],['G',22],['+',32],['DO',42]];
    return `
      <g>
        <rect x="${x}" y="${y}" width="74" height="38" rx="3" fill="#991b1b" stroke="#ef4444" stroke-width="1.2"/>
        <circle cx="${x+15}" cy="${y+19}" r="11" fill="#cbd5e1" stroke="#64748b" stroke-width="1.2"/>
        <circle cx="${x+15}" cy="${y+19}" r="7" fill="#1e293b"/>
        <rect x="${x+34}" y="${y+7}" width="13" height="13" rx="1" fill="#0284c7"/>
        <circle cx="${x+40.5}" cy="${y+13.5}" r="3" fill="#e2e8f0"/>
        <text x="${x+58}" y="${y+15}" fill="#fecaca" font-size="6.5" font-weight="800" text-anchor="middle">KY-038</text>
        ${pins.map(([lbl,ox])=>`
          <rect x="${x+ox+16}" y="${y+38}" width="2.5" height="6" fill="#fbbf24"/>
          <text x="${x+ox+17}" y="${y+34}" fill="#ffffff" font-size="4.8" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
      </g>
    `;
  },

  // ── WS2812B NeoPixel RGB Strip (+5V, DIN, GND) ─────────────
  ws2812b(x, y) {
    const cols = ['#ef4444','#f59e0b','#22c55e','#06b6d4','#3b82f6','#a855f7'];
    let chips = '';
    cols.forEach((c, i) => {
      chips += `
        <rect x="${x+28+i*22}" y="${y+5}" width="14" height="14" rx="1.5" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.8"/>
        <circle cx="${x+35+i*22}" cy="${y+12}" r="4.5" fill="${c}"/>
      `;
    });
    return `
      <g>
        <rect x="${x}" y="${y}" width="164" height="26" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
        <text x="${x+12}" y="${y+7}" fill="#fca5a5" font-size="5" font-weight="800">+5V</text>
        <text x="${x+12}" y="${y+15}" fill="#93c5fd" font-size="5" font-weight="800">DIN</text>
        <text x="${x+12}" y="${y+23}" fill="#cbd5e1" font-size="5" font-weight="800">GND</text>
        ${chips}
        <text x="${x+82}" y="${y+36}" fill="#f472b6" font-size="7.5" font-weight="700" text-anchor="middle">WS2812B NeoPixel Strip</text>
      </g>
    `;
  },

  // ── 5V Relay Module (VCC, GND, IN | NO, COM, NC) ───────────
  relay5v(x, y) {
    return `
      <g>
        <rect x="${x}" y="${y}" width="84" height="54" rx="4" fill="#991b1b" stroke="#ef4444" stroke-width="1.2"/>
        <rect x="${x+20}" y="${y+6}" width="38" height="42" rx="2" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
        <text x="${x+39}" y="${y+29}" fill="#ffffff" font-size="7.5" font-weight="800" text-anchor="middle">5V RELAY</text>
        <!-- Left Input Pins -->
        <text x="${x+4}" y="${y+16}" fill="#fca5a5" font-size="5" font-weight="800">VCC</text>
        <text x="${x+4}" y="${y+29}" fill="#cbd5e1" font-size="5" font-weight="800">GND</text>
        <text x="${x+4}" y="${y+42}" fill="#93c5fd" font-size="5" font-weight="800">IN</text>
        <!-- Right Output Screw Terminals -->
        <rect x="${x+64}" y="${y+6}" width="16" height="42" rx="1" fill="#16a34a"/>
        <text x="${x+72}" y="${y+16}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">NO</text>
        <text x="${x+72}" y="${y+29}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">COM</text>
        <text x="${x+72}" y="${y+42}" fill="#ffffff" font-size="5" font-weight="800" text-anchor="middle">NC</text>
      </g>
    `;
  },

  // ── 16x2 LCD Display (16 Labeled Pins) ─────────────────────
  lcd16x2(x, y) {
    const pins = ['VSS','VDD','V0','RS','RW','E','D4','D5','D6','D7','A','K'];
    return `
      <g>
        <rect x="${x}" y="${y}" width="144" height="62" rx="4" fill="#15803d" stroke="#22c55e" stroke-width="1.5"/>
        <rect x="${x+8}" y="${y+15}" width="128" height="38" rx="2" fill="#0f172a"/>
        <rect x="${x+12}" y="${y+19}" width="120" height="30" rx="1" fill="#65a30d"/>
        <text x="${x+72}" y="${y+37}" fill="#0f172a" font-size="9" font-family="monospace" font-weight="700" text-anchor="middle">Temp: 25.4 C</text>
        ${pins.map((lbl,i)=>`
          <circle cx="${x+12+i*11}" cy="${y+5}" r="1.8" fill="#fbbf24"/>
          <text x="${x+12+i*11}" y="${y+12}" fill="#dcfce7" font-size="4.3" font-weight="700" text-anchor="middle">${lbl}</text>
        `).join('')}
      </g>
    `;
  },

  // ── 10kΩ Potentiometer (Pin 1, Wiper, Pin 3) ───────────────
  potentiometer(x, y, label = '10kΩ') {
    return `
      <g>
        <rect x="${x}" y="${y}" width="28" height="24" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
        <circle cx="${x+14}" cy="${y+12}" r="7" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
        <line x1="${x+14}" y1="${y+12}" x2="${x+19}" y2="${y+7}" stroke="#1e293b" stroke-width="2"/>
        <line x1="${x+6}" y1="${y+24}" x2="${x+6}" y2="${y+34}" stroke="#cbd5e1" stroke-width="1.8"/>
        <line x1="${x+14}" y1="${y+24}" x2="${x+14}" y2="${y+34}" stroke="#cbd5e1" stroke-width="1.8"/>
        <line x1="${x+22}" y1="${y+24}" x2="${x+22}" y2="${y+34}" stroke="#cbd5e1" stroke-width="1.8"/>
        <text x="${x+14}" y="${y-4}" fill="#c084fc" font-size="7.5" font-weight="700" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── LDR Photoresistor ──────────────────────────────────────
  ldr(x, y, label = 'LDR') {
    return `
      <g>
        <line x1="${x+7}" y1="${y+16}" x2="${x+7}" y2="${y+28}" stroke="#cbd5e1" stroke-width="1.8"/>
        <line x1="${x+17}" y1="${y+16}" x2="${x+17}" y2="${y+28}" stroke="#cbd5e1" stroke-width="1.8"/>
        <ellipse cx="${x+12}" cy="${y+10}" rx="11" ry="8" fill="#e7c99b" stroke="#b48a5a" stroke-width="1"/>
        <path d="M ${x+5} ${y+10} Q ${x+9} ${y+5} ${x+12} ${y+10} T ${x+19} ${y+10}" fill="none" stroke="#b91c1c" stroke-width="1.5"/>
        <text x="${x+12}" y="${y-3}" fill="#fbbf24" font-size="7.5" font-weight="700" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── 18650 2S Battery Pack (Red +7.4V, Black GND) ───────────
  battery18650(x, y) {
    return `
      <g>
        <rect x="${x}" y="${y}" width="86" height="46" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
        <rect x="${x+5}" y="${y+5}" width="76" height="16" rx="3" fill="#16a34a" stroke="#4ade80" stroke-width="0.8"/>
        <rect x="${x+5}" y="${y+25}" width="76" height="16" rx="3" fill="#16a34a" stroke="#4ade80" stroke-width="0.8"/>
        <text x="${x+43}" y="${y+16}" fill="#ffffff" font-size="7" font-weight="800" text-anchor="middle">18650 3.7V</text>
        <text x="${x+43}" y="${y+36}" fill="#ffffff" font-size="7" font-weight="800" text-anchor="middle">2S Pack (7.4V)</text>
      </g>
    `;
  },

  // ── CR2032 Coin Cell ───────────────────────────────────────
  cr2032(x, y) {
    return `
      <g>
        <circle cx="${x+22}" cy="${y+22}" r="22" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
        <circle cx="${x+22}" cy="${y+22}" r="18" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>
        <text x="${x+22}" y="${y+19}" fill="#1e293b" font-size="7.5" font-weight="800" text-anchor="middle">CR2032</text>
        <text x="${x+22}" y="${y+29}" fill="#334155" font-size="7" font-weight="700" text-anchor="middle">+3V / −</text>
      </g>
    `;
  },

  // ── 9V PP3 Battery ─────────────────────────────────────────
  battery9v(x, y) {
    return `
      <g>
        <rect x="${x+2}" y="${y+3}" width="44" height="72" rx="5" fill="rgba(0,0,0,0.45)"/>
        <rect x="${x}" y="${y+8}" width="44" height="64" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1.2"/>
        <rect x="${x}" y="${y+8}" width="44" height="20" rx="3" fill="#d97706"/>
        <rect x="${x+10}" y="${y+2}" width="8" height="6" rx="1" fill="#cbd5e1" stroke="#64748b" stroke-width="0.8"/>
        <rect x="${x+26}" y="${y+2}" width="8" height="6" rx="1" fill="#cbd5e1" stroke="#64748b" stroke-width="0.8"/>
        <text x="${x+14}" y="${y+21}" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">+</text>
        <text x="${x+30}" y="${y+21}" fill="#0f172a" font-size="8" font-weight="900" text-anchor="middle">−</text>
        <text x="${x+22}" y="${y+50}" fill="#fbbf24" font-size="11" font-weight="800" text-anchor="middle">9V</text>
        <text x="${x+22}" y="${y+61}" fill="#94a3b8" font-size="6.5" font-weight="700" text-anchor="middle">BATTERY</text>
      </g>
    `;
  },

  // ── Axial Diode (DO-41 Black + Silver Cathode Band) ────────
  diode(x, y, label = '1N4007') {
    return `
      <g>
        <line x1="${x}" y1="${y+7}" x2="${x+48}" y2="${y+7}" stroke="#cbd5e1" stroke-width="2.2"/>
        <rect x="${x+10}" y="${y+1}" width="28" height="12" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <rect x="${x+31}" y="${y+1}" width="4" height="12" fill="#e2e8f0"/>
        <text x="${x+24}" y="${y-3}" fill="#93c5fd" font-size="7.5" font-weight="600" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── Electrolytic Capacitor (Radial Can) ────────────────────
  capElectrolytic(x, y, label = '100µF') {
    return `
      <g>
        <line x1="${x+7}" y1="${y+24}" x2="${x+7}" y2="${y+36}" stroke="#cbd5e1" stroke-width="1.8"/>
        <line x1="${x+15}" y1="${y+24}" x2="${x+15}" y2="${y+34}" stroke="#cbd5e1" stroke-width="1.8"/>
        <rect x="${x+2}" y="${y+2}" width="18" height="24" rx="3" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1"/>
        <rect x="${x+14}" y="${y+2}" width="5" height="24" rx="1" fill="#cbd5e1" opacity="0.85"/>
        <ellipse cx="${x+11}" cy="${y+3}" rx="9" ry="2.5" fill="#cbd5e1" stroke="#64748b" stroke-width="0.8"/>
        <text x="${x+5}" y="${y+35}" fill="#f87171" font-size="6" font-weight="900">+</text>
        <text x="${x+17}" y="${y+35}" fill="#94a3b8" font-size="6" font-weight="900">−</text>
        <text x="${x+11}" y="${y-3}" fill="#38bdf8" font-size="7.5" font-weight="700" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── Ceramic Disc Capacitor ─────────────────────────────────
  capCeramic(x, y, label = '100nF') {
    return `
      <g>
        <line x1="${x+6}" y1="${y+14}" x2="${x+6}" y2="${y+26}" stroke="#cbd5e1" stroke-width="1.6"/>
        <line x1="${x+14}" y1="${y+14}" x2="${x+14}" y2="${y+26}" stroke="#cbd5e1" stroke-width="1.6"/>
        <circle cx="${x+10}" cy="${y+10}" r="8" fill="#d97706" stroke="#b45309" stroke-width="1"/>
        <text x="${x+10}" y="${y+12.5}" fill="#fef3c7" font-size="5.5" font-weight="800" text-anchor="middle">104</text>
        <text x="${x+10}" y="${y-2}" fill="#fbbf24" font-size="7" font-weight="700" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── TO-92 Transistor / LM35 ────────────────────────────────
  transistorTO92(x, y, label = 'BC547', p1 = 'C', p2 = 'B', p3 = 'E') {
    return `
      <g>
        <line x1="${x+5}" y1="${y+14}" x2="${x+5}" y2="${y+30}" stroke="#cbd5e1" stroke-width="1.6"/>
        <line x1="${x+12}" y1="${y+14}" x2="${x+12}" y2="${y+30}" stroke="#cbd5e1" stroke-width="1.6"/>
        <line x1="${x+19}" y1="${y+14}" x2="${x+19}" y2="${y+30}" stroke="#cbd5e1" stroke-width="1.6"/>
        <path d="M ${x+2} ${y+14} L ${x+2} ${y+6} A 10 8 0 0 1 ${x+22} ${y+6} L ${x+22} ${y+14} Z" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
        <text x="${x+5}" y="${y+38}" fill="#94a3b8" font-size="5" font-weight="700" text-anchor="middle">${p1}</text>
        <text x="${x+12}" y="${y+38}" fill="#94a3b8" font-size="5" font-weight="700" text-anchor="middle">${p2}</text>
        <text x="${x+19}" y="${y+38}" fill="#94a3b8" font-size="5" font-weight="700" text-anchor="middle">${p3}</text>
        <text x="${x+12}" y="${y-3}" fill="#c084fc" font-size="7.5" font-weight="700" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── DIP IC (NE555 / LM741 / 7408 / L293D) ──────────────────
  dipIC(x, y, pinsPerSide = 4, label = 'NE555') {
    const w = Math.max(40, pinsPerSide * 11 + 8);
    let pins = '';
    for (let i = 0; i < pinsPerSide; i++) {
      const px = x + 7 + i * 11;
      pins += `<rect x="${px}" y="${y-5}" width="4" height="5" fill="#cbd5e1"/>`;
      pins += `<rect x="${px}" y="${y+26}" width="4" height="5" fill="#cbd5e1"/>`;
    }
    return `
      <g>
        ${pins}
        <rect x="${x}" y="${y}" width="${w}" height="26" rx="2" fill="#0f172a" stroke="#475569" stroke-width="1.2"/>
        <path d="M ${x} ${y+9} A 4 4 0 0 1 ${x} ${y+17}" fill="#334155"/>
        <circle cx="${x+6}" cy="${y+20}" r="1.5" fill="#64748b"/>
        <text x="${x+w/2}" y="${y+16}" fill="#e2e8f0" font-size="7.5" font-weight="800" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── Tactile Push Button ────────────────────────────────────
  pushButton(x, y, label = 'BTN') {
    return `
      <g>
        <rect x="${x}" y="${y}" width="22" height="22" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
        <circle cx="${x+11}" cy="${y+11}" r="6" fill="#1e293b"/>
        <circle cx="${x+11}" cy="${y+11}" r="4.5" fill="#334155"/>
        <text x="${x+11}" y="${y-3}" fill="#93c5fd" font-size="7" font-weight="700" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── Step-Down Transformer ──────────────────────────────────
  transformer(x, y, label = '12V AC') {
    return `
      <g>
        <rect x="${x}" y="${y}" width="58" height="62" rx="4" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
        <rect x="${x+12}" y="${y+8}" width="34" height="46" rx="2" fill="#b45309" stroke="#d97706" stroke-width="1"/>
        <line x1="${x+29}" y1="${y+8}" x2="${x+29}" y2="${y+54}" stroke="#475569" stroke-width="3"/>
        <text x="${x+29}" y="${y-4}" fill="#fbbf24" font-size="7.5" font-weight="700" text-anchor="middle">${label}</text>
      </g>
    `;
  },

  // ── DHT22 Digital Temp & Humidity Sensor (VCC, DATA, NC, GND) ─
  dht22(x, y) {
    const pins = [['VCC',8],['DATA',17],['NC',26],['GND',35]];
    return `
      <g>
        <rect x="${x}" y="${y}" width="44" height="44" rx="3" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
        <rect x="${x+7}" y="${y+6}" width="30" height="24" rx="1" fill="#cbd5e1"/>
        <text x="${x+22}" y="${y+21}" fill="#334155" font-size="7.5" font-weight="800" text-anchor="middle">DHT22</text>
        ${pins.map(([lbl,ox])=>`
          <line x1="${x+ox}" y1="${y+44}" x2="${x+ox}" y2="${y+56}" stroke="#cbd5e1" stroke-width="1.8"/>
          <text x="${x+ox}" y="${y+41}" fill="#1e293b" font-size="4.3" font-weight="800" text-anchor="middle">${lbl}</text>
        `).join('')}
      </g>
    `;
  },

  // ── HC-05 Bluetooth Module (VCC, GND, TXD, RXD) ────────────
  hc05(x, y) {
    const pins = [['VCC',12],['GND',25],['TXD',38],['RXD',51]];
    return `
      <g>
        <rect x="${x}" y="${y}" width="64" height="42" rx="4" fill="#15803d" stroke="#22c55e" stroke-width="1.2"/>
        <rect x="${x+8}" y="${y+5}" width="48" height="20" rx="2" fill="#0f172a" stroke="#475569"/>
        <text x="${x+32}" y="${y+18}" fill="#4ade80" font-size="7.5" font-weight="800" text-anchor="middle">HC-05 BT</text>
        ${pins.map(([lbl,ox])=>`
          <rect x="${x+ox-1.5}" y="${y+42}" width="3" height="6" fill="#fbbf24"/>
          <text x="${x+ox}" y="${y+38}" fill="#dcfce7" font-size="4.8" font-weight="800" text-anchor="middle">${lbl}</text>
        `).join('')}
      </g>
    `;
  },

  // ── Component-Level Pinout & Hardware Diagrams (All 38) ────
  getComponentDiagram(id) {
    const P = this;
    const compDiagrams = {
      'resistor': `<svg viewBox="0 0 340 120" width="100%" style="max-height:140px;">
        <line x1="35" y1="60" x2="305" y2="60" stroke="#cbd5e1" stroke-width="4"/>
        <rect x="95" y="38" width="150" height="44" rx="14" fill="#e7c99b" stroke="#b48a5a" stroke-width="2"/>
        <rect x="118" y="38" width="14" height="44" fill="#dc2626"/>
        <rect x="148" y="38" width="14" height="44" fill="#dc2626"/>
        <rect x="178" y="38" width="14" height="44" fill="#92400e"/>
        <rect x="215" y="38" width="10" height="44" fill="#d97706"/>
        <text x="125" y="28" fill="#f87171" font-size="8.5" font-weight="700" text-anchor="middle">1st (2)</text>
        <text x="155" y="28" fill="#f87171" font-size="8.5" font-weight="700" text-anchor="middle">2nd (2)</text>
        <text x="185" y="28" fill="#fbbf24" font-size="8.5" font-weight="700" text-anchor="middle">×10¹</text>
        <text x="220" y="28" fill="#fcd34d" font-size="8.5" font-weight="700" text-anchor="middle">±5%</text>
        <text x="55" y="52" fill="#94a3b8" font-size="8.5" text-anchor="middle">Lead 1</text>
        <text x="285" y="52" fill="#94a3b8" font-size="8.5" text-anchor="middle">Lead 2</text>
        <text x="170" y="106" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">Non-Polarized 220Ω ±5% Carbon Film Resistor</text>
      </svg>`,

      'capacitor': `<svg viewBox="0 0 360 150" width="100%" style="max-height:165px;">
        <!-- Electrolytic -->
        <line x1="88" y1="88" x2="88" y2="126" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="114" y1="88" x2="114" y2="116" stroke="#cbd5e1" stroke-width="3"/>
        <rect x="74" y="28" width="52" height="62" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5"/>
        <rect x="110" y="28" width="14" height="62" fill="#cbd5e1" opacity="0.9"/>
        <text x="117" y="62" fill="#1e293b" font-size="11" font-weight="900" text-anchor="middle">−</text>
        <text x="78" y="135" fill="#f87171" font-size="9" font-weight="800" text-anchor="middle">+ Long Lead (Anode)</text>
        <text x="128" y="124" fill="#94a3b8" font-size="8.5" font-weight="700">− Short</text>
        <!-- Ceramic -->
        <line x1="252" y1="74" x2="252" y2="116" stroke="#cbd5e1" stroke-width="2.5"/>
        <line x1="274" y1="74" x2="274" y2="116" stroke="#cbd5e1" stroke-width="2.5"/>
        <circle cx="263" cy="54" r="24" fill="#d97706" stroke="#b45309" stroke-width="1.5"/>
        <text x="263" y="58" fill="#fef3c7" font-size="11" font-weight="800" text-anchor="middle">104</text>
        <text x="263" y="135" fill="#fbbf24" font-size="9" font-weight="700" text-anchor="middle">Ceramic (Non-Polarized)</text>
      </svg>`,

      'inductor': `<svg viewBox="0 0 340 130" width="100%" style="max-height:145px;">
        <line x1="40" y1="75" x2="95" y2="75" stroke="#cbd5e1" stroke-width="3.5"/>
        <line x1="245" y1="75" x2="300" y2="75" stroke="#cbd5e1" stroke-width="3.5"/>
        <rect x="95" y="52" width="150" height="46" rx="4" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
        ${[0,1,2,3,4,5,6].map(i=>`<rect x="${106+i*19}" y="46" width="11" height="58" rx="4" fill="#d97706" stroke="#f59e0b" stroke-width="1"/>`).join('')}
        <text x="170" y="30" fill="#fbbf24" font-size="10" font-weight="700" text-anchor="middle">Enamelled Copper Windings on Ferrite Core</text>
        <text x="65" y="66" fill="#94a3b8" font-size="8.5" text-anchor="middle">Pin 1</text>
        <text x="275" y="66" fill="#94a3b8" font-size="8.5" text-anchor="middle">Pin 2</text>
      </svg>`,

      'diode': `<svg viewBox="0 0 340 120" width="100%" style="max-height:140px;">
        <line x1="40" y1="60" x2="300" y2="60" stroke="#cbd5e1" stroke-width="4"/>
        <rect x="105" y="38" width="130" height="44" rx="5" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
        <rect x="205" y="38" width="18" height="44" fill="#e2e8f0"/>
        <text x="70" y="48" fill="#f87171" font-size="10" font-weight="800" text-anchor="middle">Anode (+)</text>
        <text x="270" y="48" fill="#93c5fd" font-size="10" font-weight="800" text-anchor="middle">Cathode (−)</text>
        <text x="170" y="104" fill="#e2e8f0" font-size="9.5" font-weight="700" text-anchor="middle">1N4007 DO-41 (Silver Band = Cathode −)</text>
      </svg>`,

      'led': `<svg viewBox="0 0 300 150" width="100%" style="max-height:165px;">
        <circle cx="150" cy="48" r="32" fill="#22c55e" opacity="0.18"/>
        <line x1="138" y1="74" x2="138" y2="128" stroke="#cbd5e1" stroke-width="3.5"/>
        <line x1="162" y1="74" x2="162" y2="112" stroke="#cbd5e1" stroke-width="3.5"/>
        <path d="M 124 72 L 124 46 A 26 26 0 0 1 176 46 L 176 72 Z" fill="#22c55e" stroke="#ffffff" stroke-width="1.2"/>
        <rect x="118" y="68" width="64" height="8" rx="2" fill="#22c55e"/>
        <text x="105" y="128" fill="#f87171" font-size="9.5" font-weight="800" text-anchor="end">Anode (+) Long Leg</text>
        <text x="180" y="114" fill="#94a3b8" font-size="9.5" font-weight="800">Cathode (−) Flat Edge</text>
      </svg>`,

      'transistor-bjt': `<svg viewBox="0 0 320 150" width="100%" style="max-height:165px;">
        <line x1="135" y1="72" x2="135" y2="118" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="160" y1="72" x2="160" y2="118" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="185" y1="72" x2="185" y2="118" stroke="#cbd5e1" stroke-width="3"/>
        <path d="M 124 72 L 124 38 A 36 26 0 0 1 196 38 L 196 72 Z" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
        <text x="160" y="56" fill="#c084fc" font-size="11" font-weight="800" text-anchor="middle">BC547</text>
        <text x="122" y="135" fill="#38bdf8" font-size="9.5" font-weight="800" text-anchor="middle">1: Collector (C)</text>
        <text x="160" y="146" fill="#4ade80" font-size="9.5" font-weight="800" text-anchor="middle">2: Base (B)</text>
        <text x="200" y="135" fill="#fbbf24" font-size="9.5" font-weight="800" text-anchor="middle">3: Emitter (E)</text>
      </svg>`,

      'mosfet': `<svg viewBox="0 0 320 160" width="100%" style="max-height:175px;">
        <rect x="124" y="16" width="72" height="24" rx="2" fill="#cbd5e1" stroke="#64748b"/>
        <circle cx="160" cy="28" r="6" fill="#0f172a"/>
        <rect x="124" y="38" width="72" height="54" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
        <text x="160" y="68" fill="#e2e8f0" font-size="10" font-weight="800" text-anchor="middle">IRFZ44N</text>
        <line x1="136" y1="92" x2="136" y2="128" stroke="#cbd5e1" stroke-width="3.5"/>
        <line x1="160" y1="92" x2="160" y2="128" stroke="#cbd5e1" stroke-width="3.5"/>
        <line x1="184" y1="92" x2="184" y2="128" stroke="#cbd5e1" stroke-width="3.5"/>
        <text x="120" y="144" fill="#38bdf8" font-size="9.5" font-weight="800" text-anchor="middle">1: Gate (G)</text>
        <text x="160" y="155" fill="#f87171" font-size="9.5" font-weight="800" text-anchor="middle">2: Drain (D)</text>
        <text x="202" y="144" fill="#4ade80" font-size="9.5" font-weight="800" text-anchor="middle">3: Source (S)</text>
      </svg>`,

      'op-amp': `<svg viewBox="0 0 360 155" width="100%" style="max-height:170px;">
        ${P.dipIC(125, 60, 4, 'LM741')}
        <text x="134" y="42" fill="#94a3b8" font-size="7.5" text-anchor="middle">8:NC</text>
        <text x="158" y="42" fill="#f87171" font-size="7.5" font-weight="700" text-anchor="middle">7:V+</text>
        <text x="182" y="42" fill="#4ade80" font-size="7.5" font-weight="700" text-anchor="middle">6:OUT</text>
        <text x="206" y="42" fill="#94a3b8" font-size="7.5" text-anchor="middle">5:OS</text>
        <text x="134" y="114" fill="#94a3b8" font-size="7.5" text-anchor="middle">1:OS</text>
        <text x="158" y="114" fill="#38bdf8" font-size="7.5" font-weight="700" text-anchor="middle">2:IN(−)</text>
        <text x="182" y="114" fill="#fbbf24" font-size="7.5" font-weight="700" text-anchor="middle">3:IN(+)</text>
        <text x="206" y="114" fill="#cbd5e1" font-size="7.5" font-weight="700" text-anchor="middle">4:V−</text>
      </svg>`,

      'arduino-uno': `<svg viewBox="0 0 340 165" width="100%" style="max-height:190px;">${P.arduinoUno(76, 20)}</svg>`,
      'sensor-ir': `<svg viewBox="0 0 260 110" width="100%" style="max-height:140px;">${P.irSensor(95, 38, 'IR Module')}</svg>`,
      'arduino-nano': `<svg viewBox="0 0 300 120" width="100%" style="max-height:150px;">${P.arduinoNano(78, 30)}</svg>`,
      'arduino-mega': `<svg viewBox="0 0 360 155" width="100%" style="max-height:175px;">
        <rect x="40" y="18" width="280" height="120" rx="5" fill="#00878f" stroke="#0e7490" stroke-width="1.5"/>
        <rect x="30" y="34" width="24" height="22" rx="2" fill="#cbd5e1"/>
        <rect x="30" y="96" width="24" height="22" rx="2" fill="#1e293b"/>
        <rect x="90" y="21" width="218" height="9" fill="#0f172a"/>
        <rect x="90" y="126" width="218" height="9" fill="#0f172a"/>
        <rect x="298" y="26" width="14" height="104" fill="#0f172a"/>
        <rect x="135" y="58" width="40" height="40" rx="2" fill="#1e293b"/>
        <text x="155" y="81" fill="#94a3b8" font-size="6.5" text-anchor="middle">ATmega2560</text>
        <text x="195" y="39" fill="#e2e8f0" font-size="6.5" text-anchor="middle">PWM D2–D13 | TX/RX 1–3 (D14–D21)</text>
        <text x="195" y="122" fill="#e2e8f0" font-size="6.5" text-anchor="middle">3V3 / 5V / GND / VIN | Analog A0–A15</text>
        <text x="292" y="82" fill="#fbbf24" font-size="6.5" text-anchor="end">D22–D53</text>
      </svg>`,
      'raspberry-pi': `<svg viewBox="0 0 360 165" width="100%" style="max-height:185px;">
        <rect x="55" y="18" width="240" height="130" rx="6" fill="#15803d" stroke="#22c55e" stroke-width="1.5"/>
        <!-- 40-pin GPIO Header -->
        <rect x="75" y="24" width="175" height="16" rx="2" fill="#0f172a"/>
        <text x="162" y="35" fill="#fbbf24" font-size="6.5" font-weight="800" text-anchor="middle">40-Pin GPIO (3V3, 5V, GND, I2C, SPI, UART)</text>
        <!-- SoC -->
        <rect x="135" y="64" width="44" height="44" rx="2" fill="#cbd5e1" stroke="#64748b"/>
        <text x="157" y="88" fill="#1e293b" font-size="7" font-weight="800" text-anchor="middle">BCM2711</text>
        <!-- USB & Ethernet -->
        <rect x="268" y="28" width="32" height="32" rx="2" fill="#cbd5e1"/>
        <text x="284" y="47" fill="#1e293b" font-size="6.5" font-weight="800" text-anchor="middle">LAN</text>
        <rect x="268" y="68" width="32" height="28" rx="2" fill="#cbd5e1"/>
        <rect x="268" y="102" width="32" height="28" rx="2" fill="#cbd5e1"/>
        <!-- USB-C + Micro-HDMI -->
        <rect x="72" y="138" width="22" height="12" rx="2" fill="#e2e8f0"/>
        <text x="83" y="158" fill="#93c5fd" font-size="6.5" text-anchor="middle">USB-C 5V</text>
        <rect x="115" y="138" width="18" height="10" rx="1" fill="#e2e8f0"/>
        <rect x="145" y="138" width="18" height="10" rx="1" fill="#e2e8f0"/>
        <text x="138" y="158" fill="#94a3b8" font-size="6.5" text-anchor="middle">Micro-HDMI</text>
      </svg>`,
      'esp32': `<svg viewBox="0 0 320 130" width="100%" style="max-height:155px;">${P.esp32(72, 28)}</svg>`,
      'esp8266': `<svg viewBox="0 0 320 130" width="100%" style="max-height:155px;">
        <rect x="68" y="24" width="184" height="80" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <rect x="188" y="40" width="46" height="48" rx="2" fill="#cbd5e1"/>
        <text x="211" y="66" fill="#1e293b" font-size="7" font-weight="800" text-anchor="middle">ESP-12E</text>
        <rect x="62" y="54" width="14" height="20" rx="2" fill="#e2e8f0"/>
        <text x="135" y="37" fill="#94a3b8" font-size="6" font-weight="700" text-anchor="middle">D0 D1 D2 D3 D4 3V3 GND D5 D6 D7 D8</text>
        <text x="135" y="96" fill="#94a3b8" font-size="6" font-weight="700" text-anchor="middle">A0  GND  VU  S3  S2  RST  EN  3V3  VIN</text>
        <text x="130" y="67" fill="#38bdf8" font-size="9" font-weight="800" text-anchor="middle">NodeMCU</text>
      </svg>`,
      'jumper-wires': `<svg viewBox="0 0 340 130" width="100%" style="max-height:145px;">
        ${P.wire(40, 35, 300, 35, '#ef4444', -12)}
        ${P.wire(40, 65, 300, 65, '#3b82f6', 0)}
        ${P.wire(40, 95, 300, 95, '#22c55e', 12)}
        <text x="170" y="20" fill="#f87171" font-size="8.5" font-weight="700" text-anchor="middle">Male-to-Male (M-M) — Breadboard ↔ Arduino</text>
        <text x="170" y="56" fill="#60a5fa" font-size="8.5" font-weight="700" text-anchor="middle">Male-to-Female (M-F) — Sensors ↔ Breadboard</text>
        <text x="170" y="118" fill="#4ade80" font-size="8.5" font-weight="700" text-anchor="middle">Female-to-Female (F-F) — Module ↔ Module</text>
      </svg>`,
      'breadboard': `<svg viewBox="0 0 320 155" width="100%" style="max-height:175px;">${P.breadboard(30, 12, 260, 130)}</svg>`,
      'l298n': `<svg viewBox="0 0 260 135" width="100%" style="max-height:165px;">${P.l298n(76, 18)}</svg>`,
      'l293d': `<svg viewBox="0 0 360 150" width="100%" style="max-height:165px;">
        ${P.dipIC(110, 58, 8, 'L293D')}
        <text x="155" y="42" fill="#94a3b8" font-size="6.5" text-anchor="middle">VCC1  IN4  OUT4  GND  GND  OUT3  IN3  EN2</text>
        <text x="155" y="106" fill="#94a3b8" font-size="6.5" text-anchor="middle">EN1   IN1  OUT1  GND  GND  OUT2  IN2  VCC2</text>
      </svg>`,
      'ultrasonic-hcsr04': `<svg viewBox="0 0 240 110" width="100%" style="max-height:140px;">${P.ultrasonic(76, 26)}</svg>`,
      'dht11-dht22': `<svg viewBox="0 0 200 110" width="100%" style="max-height:140px;">${P.dht22(78, 22)}</svg>`,
      'ldr': `<svg viewBox="0 0 200 100" width="100%" style="max-height:130px;">${P.ldr(88, 36, 'LDR (Non-Polarized)')}</svg>`,
      'pir-sensor': `<svg viewBox="0 0 260 135" width="100%" style="max-height:150px;">
        <rect x="82" y="24" width="96" height="72" rx="4" fill="#15803d" stroke="#22c55e" stroke-width="1.5"/>
        <circle cx="130" cy="56" r="24" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="130" y="60" fill="#334155" font-size="7.5" font-weight="800" text-anchor="middle">Fresnel</text>
        <text x="106" y="114" fill="#f87171" font-size="7.5" font-weight="700" text-anchor="middle">VCC (5V)</text>
        <text x="132" y="124" fill="#4ade80" font-size="7.5" font-weight="700" text-anchor="middle">OUT</text>
        <text x="158" y="114" fill="#94a3b8" font-size="7.5" font-weight="700" text-anchor="middle">GND</text>
      </svg>`,
      'mq2-gas': `<svg viewBox="0 0 240 130" width="100%" style="max-height:150px;">
        <rect x="76" y="22" width="88" height="68" rx="4" fill="#1d4ed8" stroke="#60a5fa" stroke-width="1.5"/>
        <circle cx="120" cy="52" r="22" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
        <text x="120" y="55" fill="#1e293b" font-size="7.5" font-weight="800" text-anchor="middle">MQ-2</text>
        <text x="120" y="108" fill="#e2e8f0" font-size="7.5" font-weight="700" text-anchor="middle">VCC   GND   DO   AO</text>
      </svg>`,
      'soil-moisture': `<svg viewBox="0 0 280 120" width="100%" style="max-height:145px;">
        <rect x="38" y="34" width="96" height="44" rx="4" fill="#991b1b" stroke="#ef4444" stroke-width="1.2"/>
        <rect x="52" y="78" width="14" height="30" rx="2" fill="#fbbf24"/>
        <rect x="104" y="78" width="14" height="30" rx="2" fill="#fbbf24"/>
        <rect x="166" y="36" width="76" height="42" rx="4" fill="#1d4ed8" stroke="#60a5fa"/>
        <text x="204" y="55" fill="#ffffff" font-size="7.5" font-weight="800" text-anchor="middle">LM393 PCB</text>
        <text x="204" y="70" fill="#bfdbfe" font-size="6.5" text-anchor="middle">VCC GND DO AO</text>
        <line x1="134" y1="50" x2="166" y2="50" stroke="#ef4444" stroke-width="2"/>
        <line x1="134" y1="64" x2="166" y2="64" stroke="#1e293b" stroke-width="2"/>
      </svg>`,
      'ir-array': `<svg viewBox="0 0 260 110" width="100%" style="max-height:140px;">${P.irArray(77, 32)}</svg>`,
      'sound-sensor': `<svg viewBox="0 0 240 110" width="100%" style="max-height:140px;">${P.soundSensor(83, 30)}</svg>`,
      'ws2812b': `<svg viewBox="0 0 260 100" width="100%" style="max-height:130px;">${P.ws2812b(48, 32)}</svg>`,
      'servo-sg90': `<svg viewBox="0 0 280 130" width="100%" style="max-height:150px;">
        ${P.servo(110, 26, 'SG90')}
        <text x="115" y="84" fill="#f59e0b" font-size="7.5" font-weight="700" text-anchor="end">Orange: PWM</text>
        <text x="128" y="96" fill="#ef4444" font-size="7.5" font-weight="700" text-anchor="middle">Red: +5V</text>
        <text x="148" y="84" fill="#94a3b8" font-size="7.5" font-weight="700">Brown: GND</text>
      </svg>`,
      'dc-motor-bo': `<svg viewBox="0 0 260 110" width="100%" style="max-height:140px;">
        ${P.boMotor(86, 30, 'BO Motor')}
        <text x="172" y="48" fill="#f87171" font-size="7.5" font-weight="700">+ Terminal</text>
        <text x="172" y="62" fill="#94a3b8" font-size="7.5" font-weight="700">− Terminal</text>
      </svg>`,
      'bldc-motor': `<svg viewBox="0 0 360 150" width="100%" style="max-height:165px;">
        <!-- Outrunner BLDC Motor -->
        <circle cx="84" cy="70" r="34" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/>
        <circle cx="84" cy="70" r="24" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
        <circle cx="84" cy="70" r="7" fill="#e2e8f0"/>
        <text x="84" y="118" fill="#22d3ee" font-size="8" font-weight="800" text-anchor="middle">BLDC Outrunner</text>
        <!-- 3 Phase Wires U, V, W -->
        ${P.wire(118, 54, 176, 54, '#ef4444', -6)}
        ${P.wire(118, 70, 176, 70, '#f59e0b', 0)}
        ${P.wire(118, 86, 176, 86, '#3b82f6', 6)}
        <text x="147" y="45" fill="#cbd5e1" font-size="6.5" font-weight="700" text-anchor="middle">3-Phase U/V/W</text>
        <!-- 30A ESC -->
        <rect x="176" y="42" width="84" height="56" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="218" y="68" fill="#fbbf24" font-size="8.5" font-weight="800" text-anchor="middle">30A ESC</text>
        <text x="218" y="82" fill="#94a3b8" font-size="6.5" text-anchor="middle">5V BEC + PWM</text>
        <!-- Servo Signal Plug -->
        <line x1="260" y1="54" x2="296" y2="54" stroke="#f59e0b" stroke-width="2.2"/>
        <line x1="260" y1="70" x2="296" y2="70" stroke="#ef4444" stroke-width="2.2"/>
        <line x1="260" y1="86" x2="296" y2="86" stroke="#1e293b" stroke-width="2.2"/>
        <text x="302" y="57" fill="#fbbf24" font-size="7" font-weight="700">PWM (D9)</text>
        <text x="302" y="73" fill="#f87171" font-size="7" font-weight="700">5V BEC</text>
        <text x="302" y="89" fill="#94a3b8" font-size="7" font-weight="700">GND</text>
      </svg>`,
      'stepper-motor': `<svg viewBox="0 0 360 155" width="100%" style="max-height:170px;">
        <!-- NEMA 17 Body -->
        <rect x="34" y="34" width="76" height="76" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
        <circle cx="72" cy="72" r="24" fill="#334155" stroke="#94a3b8"/>
        <circle cx="72" cy="72" r="6" fill="#e2e8f0"/>
        <text x="72" y="126" fill="#c084fc" font-size="8" font-weight="800" text-anchor="middle">NEMA 17 Stepper</text>
        <!-- 4 Coil Wires -->
        ${P.wire(110, 48, 178, 48, '#ef4444', 0)}
        ${P.wire(110, 62, 178, 62, '#3b82f6', 0)}
        ${P.wire(110, 76, 178, 76, '#22c55e', 0)}
        ${P.wire(110, 90, 178, 90, '#1e293b', 0)}
        <text x="144" y="38" fill="#cbd5e1" font-size="6.5" font-weight="700" text-anchor="middle">1A 1B 2A 2B</text>
        <!-- A4988 Stepper Driver -->
        <rect x="178" y="34" width="84" height="76" rx="4" fill="#991b1b" stroke="#ef4444" stroke-width="1.5"/>
        <rect x="206" y="54" width="28" height="28" rx="2" fill="#cbd5e1"/>
        <text x="220" y="102" fill="#fecaca" font-size="7.5" font-weight="800" text-anchor="middle">A4988 Driver</text>
        <text x="270" y="48" fill="#fbbf24" font-size="7" font-weight="700">STEP / DIR</text>
        <text x="270" y="68" fill="#f87171" font-size="7" font-weight="700">VMOT (12V)</text>
        <text x="270" y="88" fill="#94a3b8" font-size="7" font-weight="700">VDD / GND</text>
      </svg>`,
      'relay-5v': `<svg viewBox="0 0 240 110" width="100%" style="max-height:140px;">${P.relay5v(78, 28)}</svg>`,
      'hc05-bluetooth': `<svg viewBox="0 0 220 110" width="100%" style="max-height:140px;">${P.hc05(78, 28)}</svg>`,
      'potentiometer': `<svg viewBox="0 0 220 110" width="100%" style="max-height:140px;">
        ${P.potentiometer(96, 30, '10kΩ Pot')}
        <text x="82" y="76" fill="#f87171" font-size="6.5" text-anchor="end">1: VCC</text>
        <text x="110" y="86" fill="#4ade80" font-size="6.5" text-anchor="middle">2: Wiper</text>
        <text x="138" y="76" fill="#94a3b8" font-size="6.5">3: GND</text>
      </svg>`,
      'cr2032-battery': `<svg viewBox="0 0 200 100" width="100%" style="max-height:130px;">${P.cr2032(78, 26)}</svg>`,
      'slide-switch': `<svg viewBox="0 0 240 110" width="100%" style="max-height:140px;">
        <rect x="84" y="34" width="72" height="28" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="96" y="40" width="22" height="16" rx="2" fill="#e2e8f0"/>
        <line x1="98" y1="62" x2="98" y2="80" stroke="#cbd5e1" stroke-width="2.5"/>
        <line x1="120" y1="62" x2="120" y2="80" stroke="#cbd5e1" stroke-width="2.5"/>
        <line x1="142" y1="62" x2="142" y2="80" stroke="#cbd5e1" stroke-width="2.5"/>
        <text x="92" y="92" fill="#93c5fd" font-size="7" text-anchor="middle">Pin 1</text>
        <text x="120" y="92" fill="#fbbf24" font-size="7" text-anchor="middle">COM</text>
        <text x="148" y="92" fill="#93c5fd" font-size="7" text-anchor="middle">Pin 3</text>
      </svg>`,
      'battery-18650': `<svg viewBox="0 0 240 110" width="100%" style="max-height:140px;">${P.battery18650(77, 30)}</svg>`,
    };
    return compDiagrams[id] || '';
  },

  // ── Circuit Studio Diagram Builder (Verified Breadboard Wiring) ─
  getCircuitDiagram(id) {
    const P = this;
    const circuits = {
      'voltage-divider': `<svg viewBox="0 0 470 200" width="100%" style="max-height:215px;">
        ${P.battery9v(20, 52)}
        ${P.breadboard(110, 32, 330, 130)}
        ${P.resistor(170, 72, '#92400e', '#0f172a', '#ea580c', 'R1 10kΩ')}
        ${P.resistor(265, 72, '#92400e', '#0f172a', '#ea580c', 'R2 10kΩ')}
        ${P.wire(34, 54, 145, 43, '#ef4444', -16)}
        ${P.wire(50, 54, 145, 150, '#1e293b', 28)}
        ${P.wire(145, 43, 170, 79, '#ef4444', 0)}
        ${P.wire(222, 79, 265, 79, '#22c55e', -12)}
        ${P.wire(317, 79, 317, 150, '#1e293b', 0)}
        ${P.wire(244, 79, 385, 112, '#22c55e', 14)}
        <text x="394" y="116" fill="#4ade80" font-size="9" font-weight="800">Vout (4.5V)</text>
        <text x="235" y="186" fill="#94a3b8" font-size="8.5" text-anchor="middle">Red: +9V → R1 → Green Midpoint (Vout) → R2 → Black: GND</text>
      </svg>`,

      'led-resistor': `<svg viewBox="0 0 460 195" width="100%" style="max-height:210px;">
        ${P.battery9v(24, 52)}
        ${P.breadboard(120, 35, 305, 125)}
        ${P.resistor(175, 78, '#eab308', '#a855f7', '#92400e', '470Ω')}
        ${P.led(290, 66, '#22c55e', 'Green LED')}
        ${P.wire(38, 54, 145, 46, '#ef4444', -16)}
        ${P.wire(54, 54, 145, 148, '#1e293b', 28)}
        ${P.wire(145, 46, 175, 85, '#ef4444', 0)}
        ${P.wire(227, 85, 298, 102, '#f59e0b', -10)}
        ${P.wire(306, 98, 306, 148, '#1e293b', 0)}
        <text x="230" y="182" fill="#94a3b8" font-size="8.5" text-anchor="middle">Red: +9V → 470Ω Resistor → LED Anode (+) | Black: Cathode (−) → GND</text>
      </svg>`,

      'half-wave-rectifier': `<svg viewBox="0 0 480 200" width="100%" style="max-height:215px;">
        ${P.transformer(20, 62, '12V AC')}
        ${P.breadboard(120, 35, 330, 130)}
        ${P.diode(155, 76, '1N4007')}
        ${P.capElectrolytic(250, 74, '470µF')}
        ${P.resistor(320, 76, '#92400e', '#0f172a', '#dc2626', 'R_L 1kΩ')}
        ${P.wire(78, 76, 155, 83, '#f59e0b', -14)}
        ${P.wire(78, 110, 145, 153, '#3b82f6', 20)}
        ${P.wire(203, 83, 257, 110, '#ef4444', -10)}
        ${P.wire(257, 110, 320, 83, '#ef4444', -10)}
        ${P.wire(265, 108, 265, 153, '#1e293b', 0)}
        ${P.wire(372, 83, 372, 153, '#1e293b', 0)}
        <text x="240" y="186" fill="#94a3b8" font-size="8.5" text-anchor="middle">AC Transformer → 1N4007 Diode (Silver = Cathode) → 470µF Cap → 1kΩ Load</text>
      </svg>`,

      'ce-amplifier': `<svg viewBox="0 0 480 205" width="100%" style="max-height:220px;">
        ${P.battery9v(18, 56)}
        ${P.breadboard(100, 32, 355, 140)}
        ${P.capCeramic(130, 86, 'Cin')}
        ${P.resistor(175, 62, '#92400e', '#0f172a', '#ea580c', 'R1')}
        ${P.resistor(175, 114, '#92400e', '#0f172a', '#92400e', 'R2')}
        ${P.transistorTO92(265, 86, 'BC547', 'C', 'B', 'E')}
        ${P.resistor(315, 62, '#dc2626', '#dc2626', '#dc2626', 'Rc')}
        ${P.resistor(315, 114, '#92400e', '#0f172a', '#92400e', 'Re')}
        ${P.capElectrolytic(395, 76, 'Cout')}
        ${P.wire(32, 58, 120, 43, '#ef4444', -16)}
        ${P.wire(48, 58, 120, 160, '#1e293b', 28)}
        ${P.wire(144, 112, 277, 116, '#3b82f6', 14)}
        ${P.wire(270, 116, 315, 69, '#22c55e', -12)}
        ${P.wire(315, 69, 402, 112, '#a855f7', 12)}
        <text x="240" y="192" fill="#94a3b8" font-size="8.5" text-anchor="middle">Voltage-Divider Bias (R1/R2) → BC547 NPN (C/B/E) → Rc/Re + Coupling Caps</text>
      </svg>`,

      'inverting-amp': `<svg viewBox="0 0 460 195" width="100%" style="max-height:210px;">
        ${P.breadboard(55, 32, 350, 130)}
        ${P.resistor(100, 74, '#92400e', '#0f172a', '#dc2626', 'Rin 1kΩ')}
        ${P.dipIC(195, 78, 4, 'LM741')}
        ${P.resistor(290, 74, '#92400e', '#0f172a', '#ea580c', 'Rf 10kΩ')}
        ${P.wire(75, 81, 100, 81, '#3b82f6', 0)}
        ${P.wire(152, 81, 213, 109, '#f59e0b', 16)}
        ${P.wire(213, 109, 290, 81, '#22c55e', -18)}
        ${P.wire(342, 81, 224, 73, '#a855f7', -22)}
        ${P.wire(224, 109, 224, 150, '#1e293b', 0)}
        <text x="230" y="182" fill="#94a3b8" font-size="8.5" text-anchor="middle">Blue: Vin → Rin → LM741 Pin 2 (−) | Pin 3 (+) → GND | Rf Feedback to Pin 6 (OUT)</text>
      </svg>`,

      'rc-oscillator': `<svg viewBox="0 0 470 200" width="100%" style="max-height:215px;">
        ${P.breadboard(45, 32, 380, 135)}
        ${P.capCeramic(80, 70, 'C1')}
        ${P.capCeramic(135, 70, 'C2')}
        ${P.capCeramic(190, 70, 'C3')}
        ${P.resistor(80, 116, '#92400e', '#0f172a', '#ea580c', 'R1')}
        ${P.resistor(145, 116, '#92400e', '#0f172a', '#ea580c', 'R2')}
        ${P.transistorTO92(280, 82, 'BC547', 'C', 'B', 'E')}
        ${P.resistor(345, 78, '#dc2626', '#dc2626', '#dc2626', 'Rc')}
        ${P.wire(94, 96, 141, 96, '#3b82f6', -10)}
        ${P.wire(149, 96, 196, 96, '#3b82f6', -10)}
        ${P.wire(204, 96, 292, 112, '#22c55e', 14)}
        ${P.wire(285, 112, 345, 85, '#f59e0b', -12)}
        ${P.wire(397, 85, 86, 70, '#a855f7', -32)}
        <text x="235" y="186" fill="#94a3b8" font-size="8.5" text-anchor="middle">3-Stage RC Phase-Shift Network (180°) + BC547 CE Amplifier (180°) = 360°</text>
      </svg>`,

      'logic-gates': `<svg viewBox="0 0 470 200" width="100%" style="max-height:215px;">
        ${P.breadboard(45, 32, 380, 135)}
        ${P.pushButton(85, 78, 'In A')}
        ${P.pushButton(130, 78, 'In B')}
        ${P.dipIC(200, 76, 7, '7408 AND')}
        ${P.resistor(315, 78, '#dc2626', '#dc2626', '#92400e', '220Ω')}
        ${P.led(385, 66, '#22c55e', 'Y = A·B')}
        ${P.wire(96, 100, 207, 107, '#3b82f6', 14)}
        ${P.wire(141, 100, 218, 107, '#f59e0b', 20)}
        ${P.wire(229, 107, 315, 85, '#22c55e', -12)}
        ${P.wire(367, 85, 393, 102, '#22c55e', 0)}
        ${P.wire(401, 98, 401, 155, '#1e293b', 0)}
        <text x="235" y="186" fill="#94a3b8" font-size="8.5" text-anchor="middle">7408 Quad AND IC: Pin 1 (A) &amp; Pin 2 (B) → Pin 3 (Y) → 220Ω → Green LED</text>
      </svg>`,

      '555-timer': `<svg viewBox="0 0 470 200" width="100%" style="max-height:215px;">
        ${P.battery9v(14, 56)}
        ${P.breadboard(90, 32, 355, 135)}
        ${P.resistor(125, 68, '#92400e', '#0f172a', '#dc2626', 'Ra 1kΩ')}
        ${P.resistor(125, 114, '#eab308', '#a855f7', '#ea580c', 'Rb 47kΩ')}
        ${P.dipIC(215, 76, 4, 'NE555')}
        ${P.capElectrolytic(285, 92, '10µF')}
        ${P.resistor(330, 74, '#dc2626', '#dc2626', '#92400e', '220Ω')}
        ${P.led(395, 64, '#ef4444', 'Pulse LED')}
        ${P.wire(28, 58, 110, 43, '#ef4444', -16)}
        ${P.wire(44, 58, 110, 155, '#1e293b', 28)}
        ${P.wire(244, 107, 330, 81, '#22c55e', -10)}
        ${P.wire(382, 81, 403, 100, '#f59e0b', 0)}
        ${P.wire(411, 96, 411, 155, '#1e293b', 0)}
        <text x="235" y="186" fill="#94a3b8" font-size="8.5" text-anchor="middle">NE555 Astable Timer: Ra/Rb + 10µF Cap → Pin 3 Output → 220Ω → Red LED</text>
      </svg>`,
    };
    return circuits[id] || '';
  },

  // ── Verified Project Wiring Diagrams (All 13 Projects) ─────
  // Every wire connects exact labeled pins/sockets matching Arduino/ESP32 code
  getProjectDiagram(id) {
    const P = this;
    const diagrams = {
      // 1. LED Blink: Uno D13 (x=22+54=76, y=50+6=56) -> 220R -> LED+ -> LED- -> Rail -> Uno GND (x=22+80=102, y=50+117=167)
      'led-blink': `<svg viewBox="0 0 540 230" width="100%" style="max-height:255px;">
        ${P.arduinoUno(18, 45)}
        ${P.breadboard(240, 42, 275, 130)}
        ${P.resistor(295, 86, '#dc2626', '#dc2626', '#92400e', '220Ω')}
        ${P.led(395, 74, '#22c55e', 'Green LED')}
        ${P.wire(72, 51, 295, 93, '#3b82f6', -28)}
        ${P.wire(347, 93, 403, 110, '#f59e0b', -10)}
        ${P.wire(411, 106, 411, 160, '#1e293b', 0)}
        ${P.wire(98, 162, 265, 160, '#1e293b', 22)}
        <text x="270" y="212" fill="#94a3b8" font-size="9" text-anchor="middle">Blue: Uno D13 → 220Ω Resistor → LED Anode (+) | Black: LED Cathode (−) → Breadboard (−) Rail → Uno GND</text>
      </svg>`,

      // 2. Traffic Light: Uno D2(178), D3(169), D4(160) -> 3x 220R -> 3x LEDs -> Common GND rail -> Uno GND(98)
      'traffic-light': `<svg viewBox="0 0 550 245" width="100%" style="max-height:265px;">
        ${P.arduinoUno(16, 48)}
        ${P.breadboard(235, 30, 295, 165)}
        ${P.resistor(275, 68, '#dc2626', '#dc2626', '#92400e', '220Ω')}
        ${P.led(365, 52, '#ef4444', 'Red')}
        ${P.resistor(275, 108, '#dc2626', '#dc2626', '#92400e', '220Ω')}
        ${P.led(415, 52, '#f59e0b', 'Yellow')}
        ${P.resistor(275, 148, '#dc2626', '#dc2626', '#92400e', '220Ω')}
        ${P.led(465, 52, '#22c55e', 'Green')}
        ${P.wire(176, 54, 275, 75, '#ef4444', -22)}
        ${P.wire(167, 54, 275, 115, '#f59e0b', -12)}
        ${P.wire(158, 54, 275, 155, '#22c55e', 16)}
        ${P.wire(327, 75, 373, 88, '#ef4444', -8)}
        ${P.wire(327, 115, 423, 88, '#f59e0b', 10)}
        ${P.wire(327, 155, 473, 88, '#22c55e', 20)}
        ${P.wire(381, 84, 381, 183, '#1e293b', 0)}
        ${P.wire(431, 84, 431, 183, '#1e293b', 0)}
        ${P.wire(481, 84, 481, 183, '#1e293b', 0)}
        ${P.wire(96, 165, 255, 183, '#1e293b', 22)}
        <text x="275" y="226" fill="#94a3b8" font-size="9" text-anchor="middle">Uno D2 (Red), D3 (Yellow), D4 (Green) → 220Ω Resistors → LED Anodes (+) | All Cathodes (−) → Common GND Rail</text>
      </svg>`,

      // 3. Digital Thermometer: LM35 (5V, A0, GND) + 10k Pot (5V, V0, GND) + 16x2 LCD (D2..D5, D11, D12, 5V, GND)
      'temp-sensor': `<svg viewBox="0 0 560 250" width="100%" style="max-height:270px;">
        ${P.arduinoUno(16, 62)}
        ${P.breadboard(235, 95, 305, 125)}
        ${P.lcd16x2(355, 12)}
        ${P.potentiometer(270, 134, '10kΩ V0')}
        ${P.transistorTO92(355, 134, 'LM35', '+Vs', 'Out', 'GND')}
        <!-- 5V & GND to Breadboard rails -->
        ${P.wire(85, 179, 255, 105, '#ef4444', 22)}
        ${P.wire(96, 179, 255, 208, '#1e293b', 28)}
        <!-- LM35 5V, A0, GND -->
        ${P.wire(360, 164, 360, 105, '#ef4444', 0)}
        ${P.wire(374, 164, 374, 208, '#1e293b', 0)}
        ${P.wire(134, 179, 367, 164, '#f59e0b', 34)}
        <!-- Potentiometer 5V, V0, GND -->
        ${P.wire(276, 168, 276, 105, '#ef4444', 0)}
        ${P.wire(292, 168, 292, 208, '#1e293b', 0)}
        ${P.wire(284, 168, 389, 17, '#a855f7', -32)}
        <!-- LCD Data & Control -->
        ${P.wire(80, 68, 400, 17, '#3b82f6', -36)}
        ${P.wire(158, 68, 433, 17, '#22c55e', -26)}
        ${P.wire(367, 17, 367, 105, '#ef4444', 0)}
        ${P.wire(356, 17, 356, 208, '#1e293b', 0)}
        <text x="280" y="238" fill="#94a3b8" font-size="8.5" text-anchor="middle">LM35 (+Vs/Out/GND → 5V/A0/GND) | 10kΩ Pot → LCD V0 Contrast | Uno D2–D5,D11,D12 → 16×2 LCD</text>
      </svg>`,

      // 4. Automatic Street Light: Breadboard +5V/GND rails -> LDR + 10k Pot divider -> BC547 (C/B/E) -> 5V Relay -> Lamp LED
      'auto-light': `<svg viewBox="0 0 540 235" width="100%" style="max-height:255px;">
        ${P.battery9v(16, 62)}
        ${P.breadboard(86, 35, 315, 145)}
        ${P.potentiometer(125, 86, '10kΩ')}
        ${P.ldr(190, 92, 'LDR')}
        ${P.transistorTO92(265, 90, 'BC547', 'C', 'B', 'E')}
        ${P.relay5v(430, 42)}
        ${P.resistor(420, 128, '#dc2626', '#dc2626', '#92400e', '220Ω')}
        ${P.led(492, 114, '#f59e0b', 'Lamp')}
        ${P.wire(30, 64, 105, 45, '#ef4444', -16)}
        ${P.wire(46, 64, 105, 168, '#1e293b', 28)}
        <!-- Divider & BC547 -->
        ${P.wire(131, 120, 131, 45, '#ef4444', 0)}
        ${P.wire(139, 120, 197, 120, '#f59e0b', 12)}
        ${P.wire(207, 120, 207, 168, '#1e293b', 0)}
        ${P.wire(197, 120, 277, 120, '#3b82f6', 14)}
        ${P.wire(284, 120, 284, 168, '#1e293b', 0)}
        <!-- BC547 Collector -> Relay IN; Relay VCC/GND/COM/NO -->
        ${P.wire(270, 120, 430, 84, '#a855f7', -20)}
        ${P.wire(385, 45, 430, 58, '#ef4444', -14)}
        ${P.wire(385, 168, 430, 71, '#1e293b', 18)}
        ${P.wire(510, 71, 472, 135, '#22c55e', 16)}
        ${P.wire(472, 135, 500, 150, '#f59e0b', 0)}
        ${P.wire(508, 146, 385, 168, '#1e293b', 22)}
        <text x="270" y="214" fill="#94a3b8" font-size="8.5" text-anchor="middle">LDR + 10kΩ Pot Divider → BC547 Base (B) | Collector (C) drives 5V Relay IN → Switches Lamp LED</text>
      </svg>`,

      // 5. IoT Monitor: ESP32 (3V3, GND, GPIO4) -> Breadboard -> DHT22 (VCC, DATA, NC, GND) + 10kΩ Pull-up (3V3 <-> DATA)
      'iot-monitor': `<svg viewBox="0 0 540 225" width="100%" style="max-height:245px;">
        ${P.esp32(18, 62)}
        ${P.breadboard(235, 38, 280, 140)}
        ${P.dht22(290, 72)}
        ${P.resistor(375, 86, '#92400e', '#0f172a', '#ea580c', '10kΩ Pull-up')}
        ${P.wire(36, 67, 255, 48, '#ef4444', -24)}
        ${P.wire(48, 67, 255, 166, '#1e293b', 34)}
        ${P.wire(84, 67, 307, 128, '#3b82f6', -28)}
        ${P.wire(298, 128, 298, 48, '#ef4444', 0)}
        ${P.wire(325, 128, 325, 166, '#1e293b', 0)}
        ${P.wire(307, 128, 375, 93, '#22c55e', 12)}
        ${P.wire(427, 93, 427, 48, '#ef4444', 0)}
        <text x="270" y="206" fill="#94a3b8" font-size="8.5" text-anchor="middle">ESP32 3V3 &amp; GND → Rails | GPIO4 → DHT22 DATA + 10kΩ Pull-up Resistor to +3.3V</text>
      </svg>`,

      // 6. Basic 2-Sensor Line Follower: IR-L(D2), IR-R(D3), Arduino Uno(D8..D11), L298N, 2x BO Motors, 18650 2S Pack
      'line-follower-basic': `<svg viewBox="0 0 580 265" width="100%" style="max-height:285px;">
        ${P.irSensor(14, 24, 'IR-L')}
        ${P.irSensor(14, 72, 'IR-R')}
        ${P.battery18650(14, 155)}
        ${P.arduinoUno(132, 52)}
        ${P.l298n(360, 42)}
        ${P.boMotor(488, 20, 'Left')}
        ${P.boMotor(488, 92, 'Right')}
        <!-- IR Sensors Signal + Power -->
        ${P.wire(78, 52, 292, 58, '#3b82f6', -24)}
        ${P.wire(78, 100, 283, 58, '#f59e0b', -14)}
        ${P.wire(78, 32, 201, 169, '#ef4444', 32)}
        ${P.wire(78, 42, 212, 169, '#1e293b', 36)}
        <!-- 18650 7.4V to L298N +12V/GND & Common GND + 5V to Uno -->
        ${P.wire(100, 170, 393, 128, '#ef4444', 44)}
        ${P.wire(100, 185, 414, 128, '#1e293b', 48)}
        ${P.wire(222, 169, 414, 128, '#1e293b', 28)}
        ${P.wire(435, 128, 232, 169, '#f97316', 36)}
        <!-- Uno D8-D11 -> L298N IN1-IN4 -->
        ${P.wire(236, 58, 395, 104, '#22c55e', -22)}
        ${P.wire(226, 58, 406, 104, '#a855f7', -16)}
        ${P.wire(216, 58, 417, 104, '#06b6d4', -10)}
        ${P.wire(206, 58, 428, 104, '#eab308', -4)}
        <!-- L298N OUT1/2 -> Left Motor, OUT3/4 -> Right Motor -->
        ${P.wire(366, 73, 560, 35, '#f59e0b', -18)}
        ${P.wire(366, 87, 560, 46, '#ef4444', -10)}
        ${P.wire(457, 73, 560, 107, '#a855f7', -8)}
        ${P.wire(457, 87, 560, 118, '#3b82f6', 8)}
        <text x="290" y="250" fill="#94a3b8" font-size="8.5" text-anchor="middle">IR-L/R (D2/D3, 5V, GND) → Uno D8–D11 → L298N IN1–IN4 | OUT1/2 &amp; OUT3/4 → Motors (7.4V 18650 + Common GND)</text>
      </svg>`,

      // 7. PID Line Follower: 5-10ch IR Array -> Arduino Nano on Breadboard -> L298N (ENA D5, ENB D6, IN1..4 D7..D10) -> Motors
      'line-follower-pid': `<svg viewBox="0 0 580 265" width="100%" style="max-height:285px;">
        ${P.irArray(12, 36)}
        ${P.battery18650(14, 155)}
        ${P.breadboard(140, 48, 185, 130)}
        ${P.arduinoNano(160, 84)}
        ${P.l298n(360, 42)}
        ${P.boMotor(488, 20, 'M-L')}
        ${P.boMotor(488, 92, 'M-R')}
        ${P.wire(118, 56, 204, 138, '#06b6d4', 18)}
        ${P.wire(100, 170, 393, 128, '#ef4444', 44)}
        ${P.wire(100, 185, 414, 128, '#1e293b', 48)}
        ${P.wire(278, 138, 414, 128, '#1e293b', 28)}
        ${P.wire(435, 128, 266, 138, '#f97316', 34)}
        <!-- Nano D5/D6 (PWM ENA/ENB) & D7-D10 (IN1-IN4) -> L298N -->
        ${P.wire(252, 88, 384, 104, '#22c55e', -22)}
        ${P.wire(242, 88, 439, 104, '#a855f7', -16)}
        ${P.wire(232, 88, 395, 104, '#3b82f6', -10)}
        ${P.wire(212, 88, 417, 104, '#eab308', -4)}
        <!-- Motors -->
        ${P.wire(366, 73, 560, 35, '#f59e0b', -18)}
        ${P.wire(366, 87, 560, 46, '#ef4444', -10)}
        ${P.wire(457, 73, 560, 107, '#a855f7', -8)}
        ${P.wire(457, 87, 560, 118, '#3b82f6', 8)}
        <text x="290" y="250" fill="#94a3b8" font-size="8.5" text-anchor="middle">IR Array (A0–A4) → Nano on Breadboard → PWM D5/D6 (ENA/ENB) + D7–D10 (IN1–IN4) → L298N &amp; Motors</text>
      </svg>`,

      // 8. Sound-Reactive Music LED: KY-038/MAX4466 (A0, 5V, GND) -> Nano (D6) -> 330R -> WS2812B (DIN, +5V, GND) + 1000uF Cap across 5V/GND
      'sound-reactive-led': `<svg viewBox="0 0 550 245" width="100%" style="max-height:260px;">
        ${P.soundSensor(14, 48)}
        ${P.breadboard(115, 32, 235, 150)}
        ${P.arduinoNano(145, 76)}
        ${P.resistor(295, 96, '#ea580c', '#ea580c', '#92400e', '330Ω')}
        ${P.capElectrolytic(390, 44, '1000µF')}
        ${P.ws2812b(368, 128)}
        <!-- Mic AO->A0, +->5V, G->GND -->
        ${P.wire(42, 92, 189, 130, '#a855f7', 24)}
        ${P.wire(62, 92, 135, 42, '#ef4444', -26)}
        ${P.wire(52, 92, 135, 168, '#1e293b', 28)}
        <!-- Nano 5V/GND to rails -->
        ${P.wire(251, 130, 251, 42, '#ef4444', 0)}
        ${P.wire(263, 130, 263, 168, '#1e293b', 0)}
        <!-- Nano D6 -> 330R -> WS2812B DIN -->
        ${P.wire(227, 80, 295, 103, '#3b82f6', -14)}
        ${P.wire(347, 103, 368, 141, '#22c55e', 0)}
        <!-- 1000uF Cap across 5V/GND & Strip +5V/GND -->
        ${P.wire(397, 80, 397, 42, '#ef4444', 0)}
        ${P.wire(405, 80, 405, 168, '#1e293b', 0)}
        ${P.wire(368, 133, 330, 42, '#ef4444', -14)}
        ${P.wire(368, 149, 330, 168, '#1e293b', 10)}
        <text x="275" y="226" fill="#94a3b8" font-size="8.5" text-anchor="middle">Mic AO → Nano A0 | D6 → 330Ω → WS2812B DIN | 1000µF Cap across +5V &amp; GND Rails</text>
      </svg>`,

      // 9. Clap Switch: KY-038 (DO->D2, +->5V, G->GND) -> Uno -> D7 -> 5V Relay (VCC, GND, IN | COM->5V, NO->220R->LED->GND)
      'clap-switch': `<svg viewBox="0 0 560 245" width="100%" style="max-height:260px;">
        ${P.soundSensor(14, 52)}
        ${P.arduinoUno(118, 48)}
        ${P.relay5v(350, 28)}
        ${P.breadboard(330, 114, 210, 92)}
        ${P.resistor(365, 148, '#dc2626', '#dc2626', '#92400e', '220Ω')}
        ${P.led(460, 134, '#22c55e', 'Load LED')}
        <!-- Mic DO->D2, VCC->5V, GND->GND -->
        ${P.wire(72, 96, 278, 54, '#a855f7', -28)}
        ${P.wire(62, 96, 187, 165, '#ef4444', 32)}
        ${P.wire(52, 96, 198, 165, '#1e293b', 36)}
        <!-- Uno D7 -> Relay IN; 5V/GND -> Relay & Breadboard -->
        ${P.wire(233, 54, 350, 68, '#22c55e', -20)}
        ${P.wire(187, 165, 350, 42, '#ef4444', 18)}
        ${P.wire(198, 165, 350, 55, '#1e293b', 22)}
        ${P.wire(198, 165, 345, 194, '#1e293b', 24)}
        <!-- Relay COM(+5V) -> NO -> 220R -> Load LED -> GND -->
        ${P.wire(430, 55, 350, 42, '#ef4444', -16)}
        ${P.wire(430, 42, 365, 155, '#f59e0b', 22)}
        ${P.wire(417, 155, 468, 170, '#22c55e', 0)}
        ${P.wire(476, 166, 476, 194, '#1e293b', 0)}
        <text x="280" y="228" fill="#94a3b8" font-size="8.5" text-anchor="middle">KY-038 DO → Uno D2 | Uno D7 → 5V Relay IN | Relay COM(+5V)/NO → 220Ω → Load LED → GND</text>
      </svg>`,

      // 10. Glowing Butterfly: CR2032 (+3V) -> Slide Switch -> Parallel 2x 100R -> Wing L & R RGB LEDs -> CR2032 (-)
      'glowing-butterfly': `<svg viewBox="0 0 510 220" width="100%" style="max-height:240px;">
        <path d="M 265 95 C 185 18, 125 40, 155 105 C 130 148, 200 180, 265 120 C 330 180, 400 148, 375 105 C 405 40, 345 18, 265 95 Z" fill="rgba(236,72,153,0.12)" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="4,3"/>
        ${P.cr2032(22, 78)}
        <rect x="98" y="42" width="42" height="18" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1.2"/>
        <rect x="106" y="46" width="12" height="10" rx="1" fill="#e2e8f0"/>
        <text x="119" y="36" fill="#e2e8f0" font-size="7.5" font-weight="700" text-anchor="middle">Switch</text>
        ${P.resistor(165, 44, '#92400e', '#0f172a', '#92400e', '100Ω')}
        ${P.led(185, 84, '#ec4899', 'Wing L')}
        ${P.resistor(290, 44, '#92400e', '#0f172a', '#92400e', '100Ω')}
        ${P.led(310, 84, '#a855f7', 'Wing R')}
        ${P.wire(44, 78, 98, 51, '#ef4444', -14)}
        ${P.wire(140, 51, 165, 51, '#ef4444', 0)}
        ${P.wire(140, 51, 290, 51, '#ef4444', -18)}
        ${P.wire(217, 51, 193, 120, '#f59e0b', 10)}
        ${P.wire(342, 51, 318, 120, '#f59e0b', 10)}
        ${P.wire(201, 116, 44, 122, '#1e293b', 28)}
        ${P.wire(326, 116, 44, 122, '#1e293b', 40)}
        <text x="255" y="204" fill="#94a3b8" font-size="8.5" text-anchor="middle">CR2032 (+3V) → Slide Switch → Parallel 100Ω Resistors → RGB LED Anodes (+) | Cathodes (−) → CR2032 (−)</text>
      </svg>`,

      // 11. 4-DOF Robotic Arm: 4x Pots (5V, A0-A3, GND) + External 5V 3A PSU -> 4x Servos (D3,D5,D6,D9) + Common GND!
      'robotic-arm': `<svg viewBox="0 0 580 265" width="100%" style="max-height:285px;">
        ${P.arduinoUno(14, 60)}
        ${P.breadboard(225, 108, 335, 115)}
        ${P.potentiometer(250, 138, 'Pot 1')}
        ${P.potentiometer(315, 138, 'Pot 2')}
        ${P.potentiometer(380, 138, 'Pot 3')}
        ${P.potentiometer(445, 138, 'Pot 4')}
        ${P.servo(235, 22, 'Base')}
        ${P.servo(310, 22, 'Shldr')}
        ${P.servo(385, 22, 'Elbow')}
        ${P.servo(460, 22, 'Grip')}
        <!-- Ext 5V 3A PSU block -->
        <rect x="20" y="198" width="130" height="34" rx="4" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
        <text x="85" y="213" fill="#fca5a5" font-size="7.5" font-weight="800" text-anchor="middle">Ext 5V 3A PSU</text>
        <text x="85" y="225" fill="#94a3b8" font-size="6.5" text-anchor="middle">(+5V &amp; Common GND)</text>
        <!-- 4 Pots Wipers -> A0..A3 -->
        ${P.wire(132, 177, 264, 172, '#8b5cf6', 24)}
        ${P.wire(143, 177, 329, 172, '#06b6d4', 28)}
        ${P.wire(154, 177, 394, 172, '#ec4899', 32)}
        ${P.wire(165, 177, 459, 172, '#eab308', 36)}
        <!-- Uno PWM D3, D5, D6, D9 -> 4 Servos Orange Signal -->
        ${P.wire(165, 66, 245, 62, '#f59e0b', -22)}
        ${P.wire(147, 66, 320, 62, '#22c55e', -28)}
        ${P.wire(138, 66, 395, 62, '#3b82f6', -34)}
        ${P.wire(108, 66, 470, 62, '#a855f7', -40)}
        <!-- Common GND Uno + PSU + Breadboard -->
        ${P.wire(94, 177, 150, 215, '#1e293b', 10)}
        ${P.wire(150, 215, 245, 210, '#1e293b', 14)}
        <text x="290" y="252" fill="#94a3b8" font-size="8.5" text-anchor="middle">4× Pots (5V/GND/A0–A3) | Uno PWM (D3,D5,D6,D9) → 4× Servos | Ext 5V 3A PSU + Common GND</text>
      </svg>`,

      // 12. Bluetooth + Ultrasonic Rover: HC-05(D0/D1,5V,GND), HC-SR04(D4/D5,5V,GND), SG90(D6), L298N(D8..D11) + Motors + 18650
      'bluetooth-obstacle-rover': `<svg viewBox="0 0 580 265" width="100%" style="max-height:285px;">
        ${P.hc05(14, 20)}
        ${P.ultrasonic(12, 84)}
        ${P.servo(18, 156, 'Pan')}
        ${P.arduinoUno(134, 52)}
        ${P.l298n(360, 40)}
        ${P.boMotor(488, 18, 'Left')}
        ${P.boMotor(488, 90, 'Right')}
        ${P.battery18650(368, 160)}
        <!-- HC-05 TXD->RX(D0), RXD<-TX(D1) -->
        ${P.wire(52, 68, 312, 58, '#3b82f6', -28)}
        ${P.wire(65, 68, 303, 58, '#60a5fa', -20)}
        <!-- HC-SR04 TRIG(D4), ECHO(D5) -->
        ${P.wire(50, 134, 276, 58, '#06b6d4', -14)}
        ${P.wire(62, 134, 267, 58, '#22d3ee', -8)}
        <!-- SG90 Pan Servo (D6) -->
        ${P.wire(28, 196, 258, 58, '#f59e0b', 24)}
        <!-- Uno D8-D11 -> L298N IN1-IN4 -->
        ${P.wire(238, 58, 395, 102, '#22c55e', -20)}
        ${P.wire(228, 58, 406, 102, '#a855f7', -14)}
        ${P.wire(218, 58, 417, 102, '#eab308', -8)}
        ${P.wire(208, 58, 428, 102, '#ec4899', -2)}
        <!-- 18650 Power & Common GND -->
        ${P.wire(393, 160, 393, 126, '#ef4444', 0)}
        ${P.wire(414, 160, 414, 126, '#1e293b', 0)}
        ${P.wire(224, 169, 414, 126, '#1e293b', 28)}
        <!-- Motors -->
        ${P.wire(366, 71, 560, 33, '#f59e0b', -18)}
        ${P.wire(366, 85, 560, 44, '#ef4444', -10)}
        ${P.wire(457, 71, 560, 105, '#a855f7', -8)}
        ${P.wire(457, 85, 560, 116, '#3b82f6', 8)}
        <text x="290" y="250" fill="#94a3b8" font-size="8.5" text-anchor="middle">HC-05 (TX/RX) + HC-SR04 (D4/D5) + SG90 (D6) → Uno D8–D11 → L298N &amp; Motors (7.4V 18650 + Common GND)</text>
      </svg>`,

      // 13. Dual-LDR Solar Tracker: Breadboard 5V/GND rails -> LDR-E + 10kR -> A0; LDR-W + 10kR -> A1; SG90 Servo -> D9, 5V, GND
      'solar-tracker': `<svg viewBox="0 0 550 240" width="100%" style="max-height:260px;">
        ${P.arduinoUno(16, 52)}
        ${P.breadboard(225, 38, 220, 140)}
        ${P.ldr(258, 66, 'LDR-E')}
        ${P.resistor(246, 124, '#92400e', '#0f172a', '#ea580c', '10kΩ')}
        ${P.ldr(358, 66, 'LDR-W')}
        ${P.resistor(346, 124, '#92400e', '#0f172a', '#ea580c', '10kΩ')}
        ${P.servo(472, 74, 'Tracker')}
        <!-- Uno 5V & GND -> Breadboard Rails -->
        ${P.wire(85, 169, 245, 48, '#ef4444', 24)}
        ${P.wire(96, 169, 245, 166, '#1e293b', 28)}
        <!-- LDR-E + 10k Divider -> A0 -->
        ${P.wire(265, 94, 265, 48, '#ef4444', 0)}
        ${P.wire(275, 94, 275, 131, '#f59e0b', 8)}
        ${P.wire(298, 131, 298, 166, '#1e293b', 0)}
        ${P.wire(134, 169, 275, 112, '#f59e0b', 26)}
        <!-- LDR-W + 10k Divider -> A1 -->
        ${P.wire(365, 94, 365, 48, '#ef4444', 0)}
        ${P.wire(375, 94, 375, 131, '#a855f7', 8)}
        ${P.wire(398, 131, 398, 166, '#1e293b', 0)}
        ${P.wire(145, 169, 375, 112, '#a855f7', 34)}
        <!-- SG90 Servo: D9 (Orange), 5V (Red), GND (Black) -->
        ${P.wire(110, 58, 482, 114, '#3b82f6', -36)}
        ${P.wire(420, 48, 488, 114, '#ef4444', -14)}
        ${P.wire(420, 166, 494, 114, '#1e293b', 14)}
        <text x="275" y="218" fill="#94a3b8" font-size="8.5" text-anchor="middle">East &amp; West LDR + 10kΩ Dividers (5V/GND) → Uno A0 &amp; A1 | Blue: Pin D9 → SG90 Servo (+5V &amp; GND)</text>
      </svg>`,
    };
    return diagrams[id] || '';
  },

  // ── Interactive 2D Sandbox Part Definitions (All 38 Components) ─
  getSandboxPart(id) {
    const P = this;
    const parts = {
      'arduino-uno': {
        w: 188, h: 124, svg: P.arduinoUno(0, 0),
        pins: [
          { id:'GND_T', label:'GND', dx:44, dy:6, kind:'gnd' },
          { id:'D13', label:'D13', dx:54, dy:6, kind:'io' },
          { id:'D12', label:'D12', dx:64, dy:6, kind:'io' },
          { id:'D11', label:'D11', dx:74, dy:6, kind:'io' },
          { id:'D10', label:'D10', dx:84, dy:6, kind:'io' },
          { id:'D9',  label:'D9',  dx:94, dy:6, kind:'io' },
          { id:'D8',  label:'D8',  dx:104, dy:6, kind:'io' },
          { id:'D7',  label:'D7',  dx:115, dy:6, kind:'io' },
          { id:'D6',  label:'D6',  dx:124, dy:6, kind:'io' },
          { id:'D5',  label:'D5',  dx:133, dy:6, kind:'io' },
          { id:'D4',  label:'D4',  dx:142, dy:6, kind:'io' },
          { id:'D3',  label:'D3',  dx:151, dy:6, kind:'io' },
          { id:'D2',  label:'D2',  dx:160, dy:6, kind:'io' },
          { id:'TX',  label:'TX1', dx:169, dy:6, kind:'io' },
          { id:'RX',  label:'RX0', dx:178, dy:6, kind:'io' },
          { id:'3V3', label:'3.3V', dx:58, dy:117, kind:'vcc' },
          { id:'5V',  label:'5V',  dx:69, dy:117, kind:'vcc' },
          { id:'GND', label:'GND', dx:80, dy:117, kind:'gnd' },
          { id:'VIN', label:'VIN', dx:100, dy:117, kind:'vcc' },
          { id:'A0',  label:'A0',  dx:118, dy:117, kind:'io' },
          { id:'A1',  label:'A1',  dx:129, dy:117, kind:'io' },
          { id:'A2',  label:'A2',  dx:140, dy:117, kind:'io' },
          { id:'A3',  label:'A3',  dx:151, dy:117, kind:'io' },
        ]
      },
      'arduino-nano': {
        w: 144, h: 58, svg: P.arduinoNano(0, 0),
        pins: [
          { id:'D12', label:'D12', dx:22, dy:4, kind:'io' }, { id:'D10', label:'D10', dx:42, dy:4, kind:'io' },
          { id:'D9',  label:'D9',  dx:52, dy:4, kind:'io' }, { id:'D6',  label:'D6',  dx:82, dy:4, kind:'io' },
          { id:'D5',  label:'D5',  dx:92, dy:4, kind:'io' }, { id:'D2',  label:'D2',  dx:122, dy:4, kind:'io' },
          { id:'A0',  label:'A0',  dx:44, dy:54, kind:'io' }, { id:'A1',  label:'A1',  dx:54, dy:54, kind:'io' },
          { id:'5V',  label:'5V',  dx:106, dy:54, kind:'vcc' }, { id:'GND', label:'GND', dx:118, dy:54, kind:'gnd' },
        ]
      },
      'arduino-mega': {
        w: 210, h: 100,
        svg: `<rect x="0" y="0" width="210" height="100" rx="5" fill="#00878f" stroke="#0e7490" stroke-width="1.5"/>
              <rect x="44" y="34" width="32" height="32" rx="2" fill="#1e293b"/>
              <text x="115" y="54" fill="#ffffff" font-size="9" font-weight="800" text-anchor="middle">ARDUINO MEGA 2560</text>`,
        pins: [
          { id:'D13', label:'D13', dx:45, dy:5, kind:'io' }, { id:'D9', label:'D9', dx:75, dy:5, kind:'io' },
          { id:'D2', label:'D2', dx:115, dy:5, kind:'io' }, { id:'D22', label:'D22', dx:198, dy:30, kind:'io' },
          { id:'5V', label:'5V', dx:55, dy:95, kind:'vcc' }, { id:'GND', label:'GND', dx:75, dy:95, kind:'gnd' },
          { id:'A0', label:'A0', dx:115, dy:95, kind:'io' },
        ]
      },
      'raspberry-pi': {
        w: 200, h: 112,
        svg: `<rect x="0" y="0" width="200" height="112" rx="5" fill="#15803d" stroke="#22c55e" stroke-width="1.5"/>
              <rect x="20" y="6" width="140" height="12" rx="2" fill="#0f172a"/>
              <text x="90" y="58" fill="#ffffff" font-size="9" font-weight="800" text-anchor="middle">RASPBERRY PI 4/5</text>
              <text x="90" y="72" fill="#bbf7d0" font-size="6.5" text-anchor="middle">40-Pin GPIO Header</text>`,
        pins: [
          { id:'3V3', label:'3V3', dx:26, dy:12, kind:'vcc' }, { id:'5V', label:'5V', dx:40, dy:12, kind:'vcc' },
          { id:'GND', label:'GND', dx:54, dy:12, kind:'gnd' }, { id:'GPIO4', label:'GPIO4', dx:72, dy:12, kind:'io' },
          { id:'GPIO17', label:'GPIO17', dx:94, dy:12, kind:'io' }, { id:'GPIO18', label:'GPIO18', dx:116, dy:12, kind:'io' },
        ]
      },
      'esp32': {
        w: 176, h: 74, svg: P.esp32(0, 0),
        pins: [
          { id:'3V3', label:'3V3', dx:18, dy:5, kind:'vcc' }, { id:'GND', label:'GND', dx:30, dy:5, kind:'gnd' },
          { id:'D4', label:'GPIO4', dx:66, dy:5, kind:'io' }, { id:'D5', label:'GPIO5', dx:102, dy:5, kind:'io' },
          { id:'D18', label:'GPIO18', dx:114, dy:5, kind:'io' }, { id:'VIN', label:'VIN', dx:18, dy:69, kind:'vcc' },
          { id:'D13', label:'GPIO13', dx:42, dy:69, kind:'io' }, { id:'D14', label:'GPIO14', dx:66, dy:69, kind:'io' },
        ]
      },
      'esp8266': {
        w: 160, h: 70,
        svg: `<rect x="0" y="0" width="160" height="70" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
              <rect x="108" y="14" width="38" height="42" rx="2" fill="#cbd5e1"/>
              <text x="58" y="38" fill="#38bdf8" font-size="8.5" font-weight="800" text-anchor="middle">NodeMCU</text>`,
        pins: [
          { id:'3V3', label:'3V3', dx:22, dy:5, kind:'vcc' }, { id:'GND', label:'GND', dx:40, dy:5, kind:'gnd' },
          { id:'D1', label:'D1', dx:64, dy:5, kind:'io' }, { id:'D2', label:'D2', dx:82, dy:5, kind:'io' },
          { id:'A0', label:'A0', dx:22, dy:65, kind:'io' }, { id:'VIN', label:'VIN', dx:98, dy:65, kind:'vcc' },
        ]
      },
      'breadboard': (() => {
        const pins = [];
        const topRowNames = ['A', 'B', 'C'];
        const botRowNames = ['D', 'E', 'F'];
        for (let cx = 18, col = 1; cx <= 240 - 16; cx += 11, col++) {
          pins.push({ id:`TP_${col}`, label:`Top + Rail (C${col})`, dx:cx, dy:11, kind:'vcc', small:true });
          pins.push({ id:`TN_${col}`, label:`Top − Rail (C${col})`, dx:cx, dy:19, kind:'gnd', small:true });
          for (let r = 0; r < 3; r++) {
            pins.push({ id:`T_${col}_${r}`, label:`${topRowNames[r]}${col}`, dx:cx, dy:35 + r*9, kind:'io', small:true });
            pins.push({ id:`B_${col}_${r}`, label:`${botRowNames[r]}${col}`, dx:cx, dy:65 + r*9, kind:'io', small:true });
          }
          pins.push({ id:`BP_${col}`, label:`Bot + Rail (C${col})`, dx:cx, dy:101, kind:'vcc', small:true });
          pins.push({ id:`BN_${col}`, label:`Bot − Rail (C${col})`, dx:cx, dy:109, kind:'gnd', small:true });
        }
        return { w: 240, h: 120, svg: P.breadboard(0, 0, 240, 120), pins };
      })(),
      'resistor': { w: 52, h: 18, svg: P.resistor(0, 2, '#dc2626', '#dc2626', '#92400e', '220Ω'), pins: [{ id:'L1', label:'Lead 1', dx:2, dy:9, kind:'io' }, { id:'L2', label:'Lead 2', dx:50, dy:9, kind:'io' }] },
      'capacitor': { w: 24, h: 38, svg: P.capElectrolytic(0, 2, '100µF'), pins: [{ id:'POS', label:'+ Anode', dx:7, dy:36, kind:'vcc' }, { id:'NEG', label:'− Cathode', dx:15, dy:35, kind:'gnd' }] },
      'inductor': { w: 54, h: 24, svg: `<line x1="0" y1="12" x2="54" y2="12" stroke="#cbd5e1" stroke-width="2"/><rect x="12" y="5" width="30" height="14" rx="3" fill="#d97706"/>`, pins: [{ id:'P1', label:'Pin 1', dx:2, dy:12, kind:'io' }, { id:'P2', label:'Pin 2', dx:52, dy:12, kind:'io' }] },
      'diode': { w: 48, h: 18, svg: P.diode(0, 2, '1N4007'), pins: [{ id:'A', label:'Anode +', dx:2, dy:9, kind:'io' }, { id:'K', label:'Cathode −', dx:46, dy:9, kind:'io' }] },
      'led': { w: 24, h: 38, svg: P.led(0, 2, '#22c55e', 'LED'), pins: [{ id:'A', label:'Anode (+)', dx:8, dy:36, kind:'io' }, { id:'K', label:'Cathode (−)', dx:16, dy:34, kind:'gnd' }] },
      'transistor-bjt': { w: 26, h: 36, svg: P.transistorTO92(0, 2, 'BC547', 'C', 'B', 'E'), pins: [{ id:'C', label:'Collector', dx:5, dy:30, kind:'io' }, { id:'B', label:'Base', dx:12, dy:30, kind:'io' }, { id:'E', label:'Emitter', dx:19, dy:30, kind:'gnd' }] },
      'mosfet': { w: 32, h: 42, svg: `<rect x="4" y="2" width="24" height="22" fill="#1e293b" stroke="#64748b"/><text x="16" y="16" fill="#e2e8f0" font-size="6" text-anchor="middle">MOSFET</text><line x1="8" y1="24" x2="8" y2="38" stroke="#cbd5e1" stroke-width="2"/><line x1="16" y1="24" x2="16" y2="38" stroke="#cbd5e1" stroke-width="2"/><line x1="24" y1="24" x2="24" y2="38" stroke="#cbd5e1" stroke-width="2"/>`, pins: [{ id:'G', label:'Gate', dx:8, dy:38, kind:'io' }, { id:'D', label:'Drain', dx:16, dy:38, kind:'io' }, { id:'S', label:'Source', dx:24, dy:38, kind:'gnd' }] },
      'op-amp': { w: 54, h: 34, svg: P.dipIC(2, 4, 4, 'LM741'), pins: [{ id:'IN_N', label:'IN(−)', dx:20, dy:31, kind:'io' }, { id:'IN_P', label:'IN(+)', dx:31, dy:31, kind:'io' }, { id:'VCC', label:'V+', dx:20, dy:0, kind:'vcc' }, { id:'OUT', label:'OUT', dx:31, dy:0, kind:'io' }, { id:'GND', label:'V−', dx:42, dy:31, kind:'gnd' }] },
      'sensor-ir': { w: 64, h: 32, svg: P.irSensor(0, 0, 'IR'), pins: [{ id:'VCC', label:'VCC', dx:60, dy:7, kind:'vcc' }, { id:'GND', label:'GND', dx:60, dy:16, kind:'gnd' }, { id:'OUT', label:'OUT', dx:60, dy:26, kind:'io' }] },
      'ir-array': { w: 106, h: 42, svg: P.irArray(0, 0), pins: [{ id:'VCC', label:'VCC', dx:22, dy:20, kind:'vcc' }, { id:'GND', label:'GND', dx:50, dy:20, kind:'gnd' }, { id:'S1', label:'S1..S5', dx:82, dy:20, kind:'io' }] },
      'ultrasonic-hcsr04': { w: 88, h: 50, svg: P.ultrasonic(0, 0), pins: [{ id:'VCC', label:'VCC', dx:26, dy:46, kind:'vcc' }, { id:'TRIG', label:'TRIG', dx:38, dy:46, kind:'io' }, { id:'ECHO', label:'ECHO', dx:50, dy:46, kind:'io' }, { id:'GND', label:'GND', dx:62, dy:46, kind:'gnd' }] },
      'dht11-dht22': { w: 44, h: 56, svg: P.dht22(0, 0), pins: [{ id:'VCC', label:'VCC', dx:8, dy:54, kind:'vcc' }, { id:'DATA', label:'DATA', dx:17, dy:54, kind:'io' }, { id:'GND', label:'GND', dx:35, dy:54, kind:'gnd' }] },
      'ldr': { w: 26, h: 30, svg: P.ldr(0, 2, 'LDR'), pins: [{ id:'L1', label:'Pin 1', dx:7, dy:28, kind:'io' }, { id:'L2', label:'Pin 2', dx:17, dy:28, kind:'io' }] },
      'pir-sensor': { w: 64, h: 48, svg: `<rect x="0" y="0" width="64" height="44" rx="4" fill="#15803d" stroke="#22c55e"/><circle cx="32" cy="20" r="14" fill="#f8fafc"/><text x="32" y="42" fill="#dcfce7" font-size="5" text-anchor="middle">VCC OUT GND</text>`, pins: [{ id:'VCC', label:'VCC', dx:16, dy:45, kind:'vcc' }, { id:'OUT', label:'OUT', dx:32, dy:45, kind:'io' }, { id:'GND', label:'GND', dx:48, dy:45, kind:'gnd' }] },
      'mq2-gas': { w: 60, h: 48, svg: `<rect x="0" y="0" width="60" height="44" rx="4" fill="#1d4ed8"/><circle cx="30" cy="18" r="14" fill="#cbd5e1"/><text x="30" y="21" fill="#1e293b" font-size="6.5" font-weight="800" text-anchor="middle">MQ-2</text>`, pins: [{ id:'VCC', label:'VCC', dx:12, dy:45, kind:'vcc' }, { id:'GND', label:'GND', dx:24, dy:45, kind:'gnd' }, { id:'DO', label:'DO', dx:36, dy:45, kind:'io' }, { id:'AO', label:'AO', dx:48, dy:45, kind:'io' }] },
      'soil-moisture': { w: 68, h: 42, svg: `<rect x="0" y="0" width="68" height="36" rx="3" fill="#991b1b"/><text x="34" y="20" fill="#fecaca" font-size="7" font-weight="800" text-anchor="middle">SOIL PROBE</text>`, pins: [{ id:'VCC', label:'VCC', dx:14, dy:37, kind:'vcc' }, { id:'GND', label:'GND', dx:34, dy:37, kind:'gnd' }, { id:'AO', label:'AO', dx:54, dy:37, kind:'io' }] },
      'sound-sensor': { w: 74, h: 44, svg: P.soundSensor(0, 0), pins: [{ id:'AO', label:'AO', dx:29, dy:40, kind:'io' }, { id:'GND', label:'G', dx:39, dy:40, kind:'gnd' }, { id:'VCC', label:'+', dx:49, dy:40, kind:'vcc' }, { id:'DO', label:'DO', dx:59, dy:40, kind:'io' }] },
      'ws2812b': { w: 164, h: 30, svg: P.ws2812b(0, 0), pins: [{ id:'VCC', label:'+5V', dx:4, dy:5, kind:'vcc' }, { id:'DIN', label:'DIN', dx:4, dy:13, kind:'io' }, { id:'GND', label:'GND', dx:4, dy:21, kind:'gnd' }] },
      'l298n': {
        w: 108, h: 94, svg: P.l298n(0, 0),
        pins: [
          { id:'OUT1', label:'OUT1', dx:6, dy:30, kind:'io' }, { id:'OUT2', label:'OUT2', dx:6, dy:44, kind:'io' },
          { id:'OUT3', label:'OUT3', dx:102, dy:30, kind:'io' }, { id:'OUT4', label:'OUT4', dx:102, dy:44, kind:'io' },
          { id:'V12', label:'+12V', dx:33, dy:88, kind:'vcc' }, { id:'GND', label:'GND', dx:54, dy:88, kind:'gnd' }, { id:'V5', label:'+5V', dx:75, dy:88, kind:'vcc' },
          { id:'ENA', label:'ENA', dx:24, dy:62, kind:'io' }, { id:'IN1', label:'IN1', dx:35, dy:62, kind:'io' },
          { id:'IN2', label:'IN2', dx:46, dy:62, kind:'io' }, { id:'IN3', label:'IN3', dx:57, dy:62, kind:'io' },
          { id:'IN4', label:'IN4', dx:68, dy:62, kind:'io' }, { id:'ENB', label:'ENB', dx:79, dy:62, kind:'io' },
        ]
      },
      'l293d': { w: 96, h: 34, svg: P.dipIC(2, 4, 8, 'L293D'), pins: [{ id:'EN1', label:'EN1', dx:9, dy:31, kind:'io' }, { id:'IN1', label:'IN1', dx:20, dy:31, kind:'io' }, { id:'OUT1', label:'OUT1', dx:31, dy:31, kind:'io' }, { id:'GND', label:'GND', dx:42, dy:31, kind:'gnd' }, { id:'VCC', label:'VCC1', dx:9, dy:0, kind:'vcc' }] },
      'servo-sg90': { w: 54, h: 42, svg: P.servo(0, 0, 'SG90'), pins: [{ id:'PWM', label:'PWM', dx:10, dy:40, kind:'io' }, { id:'VCC', label:'+5V', dx:16, dy:40, kind:'vcc' }, { id:'GND', label:'GND', dx:22, dy:40, kind:'gnd' }] },
      'dc-motor-bo': { w: 78, h: 44, svg: P.boMotor(0, 0, 'BO'), pins: [{ id:'P', label:'+', dx:76, dy:16, kind:'io' }, { id:'M', label:'−', dx:76, dy:27, kind:'io' }] },
      'bldc-motor': {
        w: 112, h: 58,
        svg: `<circle cx="28" cy="28" r="24" fill="#0f172a" stroke="#06b6d4" stroke-width="1.8"/><circle cx="28" cy="28" r="7" fill="#e2e8f0"/><rect x="64" y="10" width="46" height="36" rx="3" fill="#1e293b" stroke="#f59e0b"/><text x="87" y="31" fill="#fbbf24" font-size="7" font-weight="800" text-anchor="middle">BLDC+ESC</text>`,
        pins: [{ id:'PWM', label:'PWM', dx:110, dy:18, kind:'io' }, { id:'BEC', label:'5V BEC', dx:110, dy:28, kind:'vcc' }, { id:'GND', label:'GND', dx:110, dy:38, kind:'gnd' }]
      },
      'stepper-motor': {
        w: 112, h: 58,
        svg: `<rect x="4" y="6" width="46" height="46" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/><circle cx="27" cy="29" r="14" fill="#334155"/><rect x="62" y="8" width="48" height="42" rx="3" fill="#991b1b" stroke="#ef4444"/><text x="86" y="32" fill="#fecaca" font-size="6.5" font-weight="800" text-anchor="middle">A4988</text>`,
        pins: [{ id:'STEP', label:'STEP', dx:108, dy:14, kind:'io' }, { id:'DIR', label:'DIR', dx:108, dy:24, kind:'io' }, { id:'VMOT', label:'12V', dx:108, dy:34, kind:'vcc' }, { id:'GND', label:'GND', dx:108, dy:44, kind:'gnd' }]
      },
      'relay-5v': { w: 84, h: 54, svg: P.relay5v(0, 0), pins: [{ id:'VCC', label:'VCC', dx:4, dy:14, kind:'vcc' }, { id:'GND', label:'GND', dx:4, dy:27, kind:'gnd' }, { id:'IN', label:'IN', dx:4, dy:40, kind:'io' }, { id:'NO', label:'NO', dx:80, dy:14, kind:'io' }, { id:'COM', label:'COM', dx:80, dy:27, kind:'io' }] },
      'hc05-bluetooth': { w: 64, h: 48, svg: P.hc05(0, 0), pins: [{ id:'VCC', label:'VCC', dx:12, dy:46, kind:'vcc' }, { id:'GND', label:'GND', dx:25, dy:46, kind:'gnd' }, { id:'TXD', label:'TXD', dx:38, dy:46, kind:'io' }, { id:'RXD', label:'RXD', dx:51, dy:46, kind:'io' }] },
      'potentiometer': { w: 28, h: 36, svg: P.potentiometer(0, 0, '10kΩ'), pins: [{ id:'P1', label:'VCC', dx:6, dy:34, kind:'vcc' }, { id:'W', label:'Wiper', dx:14, dy:34, kind:'io' }, { id:'P3', label:'GND', dx:22, dy:34, kind:'gnd' }] },
      'cr2032-battery': { w: 44, h: 44, svg: P.cr2032(0, 0), pins: [{ id:'VCC', label:'+3V', dx:22, dy:2, kind:'vcc' }, { id:'GND', label:'− GND', dx:22, dy:42, kind:'gnd' }] },
      'slide-switch': { w: 44, h: 28, svg: `<rect x="0" y="0" width="44" height="18" rx="3" fill="#1e293b" stroke="#94a3b8"/><rect x="8" y="4" width="12" height="10" rx="1" fill="#e2e8f0"/>`, pins: [{ id:'P1', label:'In', dx:8, dy:22, kind:'io' }, { id:'COM', label:'COM', dx:22, dy:22, kind:'io' }, { id:'P3', label:'Out', dx:36, dy:22, kind:'io' }] },
      'battery-18650': { w: 86, h: 46, svg: P.battery18650(0, 0), pins: [{ id:'VCC', label:'+7.4V', dx:84, dy:12, kind:'vcc' }, { id:'GND', label:'− GND', dx:84, dy:34, kind:'gnd' }] },
      'jumper-wires': { w: 60, h: 20, svg: P.wire(4, 10, 56, 10, '#3b82f6', 0), pins: [{ id:'A', label:'End A', dx:4, dy:10, kind:'io' }, { id:'B', label:'End B', dx:56, dy:10, kind:'io' }] },
    };
    return parts[id] || null;
  },
};
