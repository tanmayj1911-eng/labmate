// ============================================================
// LAB MATE – Application Data Layer
// Mock data for all modules
// ============================================================

const DATA = {

  // ── Components ────────────────────────────────────────────
  components: [
    {
      id: 'resistor', name: 'Resistor', category: 'Passive', type: 'passive',
      symbol: 'R', desc: 'Controls current flow by providing electrical resistance.',
      longDesc: 'A resistor is a passive two-terminal electrical component that implements electrical resistance as a circuit element. It reduces current flow and lowers voltage levels within circuits.',
      unit: 'Ohm (Ω)', color: '#3b82f6',
      specs: [
        { param: 'Typical Range', value: '1Ω – 10MΩ' },
        { param: 'Standard Values', value: 'E12, E24, E96 series' },
        { param: 'Tolerance', value: '±1%, ±5%, ±10%' },
        { param: 'Power Rating', value: '0.125W – 2W (common)' },
        { param: 'Temperature Coeff.', value: '50–200 ppm/°C' },
      ],
      uses: ['Current limiting', 'Voltage division', 'Pull-up/pull-down', 'Biasing'],
      related: ['capacitor', 'led', 'transistor-bjt'],
      formula: 'V = I × R',
      colorCode: true, tip: 'Beginner',
      symbol_svg: `<svg width="60" height="30" viewBox="0 0 60 30">
        <line x1="0" y1="15" x2="10" y2="15" stroke="#3b82f6" stroke-width="2"/>
        <rect x="10" y="8" width="40" height="14" stroke="#3b82f6" stroke-width="2" fill="none" rx="2"/>
        <line x1="50" y1="15" x2="60" y2="15" stroke="#3b82f6" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'capacitor', name: 'Capacitor', category: 'Passive', type: 'passive',
      symbol: 'C', desc: 'Stores electrical energy in an electric field.',
      longDesc: 'A capacitor is a device that stores electrical energy by holding a charge on two parallel plates separated by an insulating material (dielectric). It blocks DC and passes AC signals.',
      unit: 'Farad (F)', color: '#8b5cf6',
      specs: [
        { param: 'Common Range', value: '1pF – 10,000µF' },
        { param: 'Types', value: 'Ceramic, Electrolytic, Film' },
        { param: 'Voltage Rating', value: '6.3V – 450V' },
        { param: 'ESR', value: 'mΩ – Ω range' },
      ],
      uses: ['Energy storage', 'Filtering', 'Coupling/decoupling', 'Timing circuits'],
      related: ['resistor', 'inductor', 'diode'],
      formula: 'Q = C × V',
      tip: 'Beginner',
      symbol_svg: `<svg width="50" height="40" viewBox="0 0 50 40">
        <line x1="0" y1="20" x2="20" y2="20" stroke="#8b5cf6" stroke-width="2"/>
        <line x1="20" y1="8" x2="20" y2="32" stroke="#8b5cf6" stroke-width="2.5"/>
        <line x1="25" y1="8" x2="25" y2="32" stroke="#8b5cf6" stroke-width="2.5"/>
        <line x1="25" y1="20" x2="50" y2="20" stroke="#8b5cf6" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'inductor', name: 'Inductor', category: 'Passive', type: 'passive',
      symbol: 'L', desc: 'Stores energy in a magnetic field when current flows through it.',
      longDesc: 'An inductor is a coil of wire that stores energy in a magnetic field. It resists changes in current and is used in filters, transformers, and oscillators.',
      unit: 'Henry (H)', color: '#06b6d4',
      specs: [
        { param: 'Common Range', value: '1µH – 10H' },
        { param: 'Types', value: 'Air core, Iron core, Toroidal' },
        { param: 'Q Factor', value: '20–200 typical' },
        { param: 'Self-Resonant Freq.', value: 'kHz – GHz range' },
      ],
      uses: ['Energy storage', 'Filtering', 'Transformers', 'RF circuits'],
      related: ['capacitor', 'resistor', 'diode'],
      formula: 'V = L × (di/dt)',
      tip: 'Intermediate',
      symbol_svg: `<svg width="70" height="30" viewBox="0 0 70 30">
        <line x1="0" y1="15" x2="10" y2="15" stroke="#06b6d4" stroke-width="2"/>
        <path d="M10,15 Q17.5,2 25,15 Q32.5,2 40,15 Q47.5,2 55,15 Q62.5,2 70,15" stroke="#06b6d4" stroke-width="2" fill="none"/>
      </svg>`
    },
    {
      id: 'diode', name: 'Diode (PN Junction)', category: 'Semiconductor', type: 'semiconductor',
      symbol: 'D', desc: 'Allows current to flow in only one direction.',
      longDesc: 'A diode is a semiconductor device with two terminals: anode and cathode. It allows current in one direction (forward bias) and blocks it in the other (reverse bias). Forward voltage: ~0.7V for silicon.',
      unit: 'V (threshold)', color: '#f59e0b',
      specs: [
        { param: 'Forward Voltage', value: '0.6–0.7V (Si), 0.2–0.3V (Ge)' },
        { param: 'Peak Inverse Voltage', value: '50V – 1kV' },
        { param: 'Forward Current', value: '10mA – 10A' },
        { param: 'Common Part', value: '1N4007, 1N914, 1N4148' },
      ],
      uses: ['Rectification', 'Clipping', 'Clamping', 'Protection'],
      related: ['led', 'capacitor', 'transistor-bjt'],
      formula: 'V_D ≈ 0.7V (Si)',
      tip: 'Beginner',
      symbol_svg: `<svg width="60" height="30" viewBox="0 0 60 30">
        <line x1="0" y1="15" x2="20" y2="15" stroke="#f59e0b" stroke-width="2"/>
        <polygon points="20,6 20,24 40,15" stroke="#f59e0b" stroke-width="2" fill="rgba(245,158,11,0.2)"/>
        <line x1="40" y1="6" x2="40" y2="24" stroke="#f59e0b" stroke-width="2.5"/>
        <line x1="40" y1="15" x2="60" y2="15" stroke="#f59e0b" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'led', name: 'LED', category: 'Semiconductor', type: 'semiconductor',
      symbol: 'LED', desc: 'A diode that emits light when forward biased.',
      longDesc: 'A Light Emitting Diode (LED) emits light when current flows through it in the forward direction. LEDs are used in displays, indicators, and lighting. Always use a current-limiting resistor.',
      unit: 'V / mA', color: '#22c55e',
      specs: [
        { param: 'Forward Voltage', value: '1.8–3.3V (colour dependent)' },
        { param: 'Operating Current', value: '10–30mA typical' },
        { param: 'Wavelength', value: '400–700nm (visible)' },
        { param: 'Luminous Intensity', value: '5–20 mcd typical' },
      ],
      uses: ['Indicators', 'Displays', 'Lighting', 'Optocouplers'],
      related: ['resistor', 'diode', 'transistor-bjt'],
      formula: 'R = (V_supply - V_f) / I_f',
      tip: 'Beginner',
      symbol_svg: `<svg width="70" height="36" viewBox="0 0 70 36">
        <line x1="0" y1="18" x2="20" y2="18" stroke="#22c55e" stroke-width="2"/>
        <polygon points="20,8 20,28 40,18" stroke="#22c55e" stroke-width="2" fill="rgba(34,197,94,0.2)"/>
        <line x1="40" y1="8" x2="40" y2="28" stroke="#22c55e" stroke-width="2.5"/>
        <line x1="40" y1="18" x2="60" y2="18" stroke="#22c55e" stroke-width="2"/>
        <line x1="45" y1="8" x2="52" y2="2" stroke="#22c55e" stroke-width="1.5" marker-end="url(#arrow)"/>
        <line x1="50" y1="12" x2="57" y2="6" stroke="#22c55e" stroke-width="1.5"/>
      </svg>`
    },
    {
      id: 'transistor-bjt', name: 'Transistor (BJT)', category: 'Active', type: 'active',
      symbol: 'Q', desc: 'Amplifies or switches electronic signals.',
      longDesc: 'A Bipolar Junction Transistor (BJT) has three terminals: Base, Collector, and Emitter. A small base current controls a larger collector-emitter current, enabling amplification and switching.',
      unit: 'Current Gain (hFE)', color: '#a855f7',
      specs: [
        { param: 'Types', value: 'NPN, PNP' },
        { param: 'Common Parts', value: 'BC547, 2N2222, BC557, TIP31' },
        { param: 'hFE (gain)', value: '50–500 typical' },
        { param: 'Vce (max)', value: '30–60V typical' },
        { param: 'Ic (max)', value: '100mA – 10A' },
      ],
      uses: ['Amplification', 'Switching', 'Oscillators', 'Signal processing'],
      related: ['resistor', 'diode', 'mosfet'],
      formula: 'Ic = β × Ib',
      tip: 'Intermediate',
      symbol_svg: `<svg width="60" height="50" viewBox="0 0 60 50">
        <line x1="0" y1="25" x2="22" y2="25" stroke="#a855f7" stroke-width="2"/>
        <line x1="22" y1="10" x2="22" y2="40" stroke="#a855f7" stroke-width="2.5"/>
        <line x1="22" y1="18" x2="45" y2="8" stroke="#a855f7" stroke-width="2"/>
        <line x1="22" y1="32" x2="45" y2="42" stroke="#a855f7" stroke-width="2"/>
        <line x1="45" y1="8" x2="45" y2="0" stroke="#a855f7" stroke-width="2"/>
        <line x1="45" y1="42" x2="45" y2="50" stroke="#a855f7" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'mosfet', name: 'MOSFET', category: 'Active', type: 'active',
      symbol: 'M', desc: 'Voltage-controlled transistor used for amplification and switching.',
      longDesc: 'Metal-Oxide-Semiconductor Field-Effect Transistor. A gate voltage controls current between drain and source. N-channel MOSFETs are ON when Vgs > Vth. Widely used in power electronics and digital logic.',
      unit: 'Vgs threshold (V)', color: '#ef4444',
      specs: [
        { param: 'Types', value: 'N-channel, P-channel, Enhancement, Depletion' },
        { param: 'Common Parts', value: 'IRF540, BS170, IRLZ44N, 2N7000' },
        { param: 'Vgs(th)', value: '1–5V typical' },
        { param: 'Rds(on)', value: 'mΩ – Ω range' },
        { param: 'Id (max)', value: '100mA – 100A' },
      ],
      uses: ['Power switching', 'Motor control', 'Voltage regulation', 'Logic gates'],
      related: ['transistor-bjt', 'resistor', 'l298n'],
      formula: 'Id ∝ (Vgs - Vth)²',
      tip: 'Intermediate',
      symbol_svg: `<svg width="60" height="50" viewBox="0 0 60 50">
        <line x1="0" y1="25" x2="20" y2="25" stroke="#ef4444" stroke-width="2"/>
        <line x1="20" y1="12" x2="20" y2="38" stroke="#ef4444" stroke-width="2"/>
        <line x1="22" y1="12" x2="22" y2="22" stroke="#ef4444" stroke-width="2.5"/>
        <line x1="22" y1="28" x2="22" y2="38" stroke="#ef4444" stroke-width="2.5"/>
        <line x1="22" y1="17" x2="45" y2="8" stroke="#ef4444" stroke-width="2"/>
        <line x1="22" y1="33" x2="45" y2="42" stroke="#ef4444" stroke-width="2"/>
        <line x1="22" y1="25" x2="35" y2="25" stroke="#ef4444" stroke-width="1.5"/>
        <line x1="45" y1="8" x2="45" y2="0" stroke="#ef4444" stroke-width="2"/>
        <line x1="45" y1="42" x2="45" y2="50" stroke="#ef4444" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'op-amp', name: 'Op-Amp', category: 'Active', type: 'ic',
      symbol: 'U', desc: 'High-gain differential amplifier with wide range of applications.',
      longDesc: 'An Operational Amplifier is an integrated circuit with two inputs (inverting and non-inverting) and one output. With feedback resistors it can amplify, compare, integrate, and differentiate signals.',
      unit: 'Gain (dB)', color: '#06b6d4',
      specs: [
        { param: 'Common Parts', value: 'LM741, LM358, TL071, LM324' },
        { param: 'Open-loop Gain', value: '100,000–200,000 (100–106dB)' },
        { param: 'Input Impedance', value: 'MΩ – GΩ' },
        { param: 'Supply Voltage', value: '±5V to ±18V' },
        { param: 'GBW Product', value: '1MHz – 100MHz' },
      ],
      uses: ['Inverting amplifier', 'Non-inverting amplifier', 'Comparator', 'Integrator', 'Active filters'],
      related: ['resistor', 'capacitor', 'transistor-bjt'],
      formula: 'Av = -Rf/Rin (inverting)',
      tip: 'Intermediate',
      symbol_svg: `<svg width="60" height="50" viewBox="0 0 60 50">
        <polygon points="10,5 10,45 55,25" stroke="#06b6d4" stroke-width="2" fill="rgba(6,182,212,0.08)"/>
        <line x1="0" y1="17" x2="10" y2="17" stroke="#06b6d4" stroke-width="2"/>
        <line x1="0" y1="33" x2="10" y2="33" stroke="#06b6d4" stroke-width="2"/>
        <line x1="55" y1="25" x2="62" y2="25" stroke="#06b6d4" stroke-width="2"/>
        <text x="14" y="20" fill="#06b6d4" font-size="9">+</text>
        <text x="14" y="37" fill="#06b6d4" font-size="9">−</text>
      </svg>`
    },
    {
      id: 'arduino-uno', name: 'Arduino Uno', category: 'Embedded', type: 'microcontroller',
      symbol: 'MCU', desc: 'Open-source microcontroller development board.',
      longDesc: 'Arduino Uno is a microcontroller board based on ATmega328P. It has 14 digital I/O pins, 6 analog inputs, a 16 MHz crystal, USB connection, and ICSP header. Perfect for beginners to learn embedded programming.',
      unit: 'Digital / Analog pins', color: '#22c55e',
      specs: [
        { param: 'Microcontroller', value: 'ATmega328P' },
        { param: 'Operating Voltage', value: '5V' },
        { param: 'Digital I/O Pins', value: '14 (6 PWM)' },
        { param: 'Analog Input Pins', value: '6' },
        { param: 'Clock Speed', value: '16 MHz' },
        { param: 'Flash Memory', value: '32 KB' },
      ],
      uses: ['Prototyping', 'Robotics', 'IoT', 'Sensor interfacing', 'Automation'],
      related: ['resistor', 'led', 'sensor-ir'],
      formula: 'analogRead() → 0–1023 (10-bit ADC)',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'sensor-ir', name: 'IR Sensor Module', category: 'Sensors', type: 'sensor',
      symbol: 'IR', desc: 'Detects infrared light for proximity and obstacle sensing.',
      longDesc: 'An infrared sensor module uses an IR LED and photodiode pair to detect objects. The IR LED emits infrared light; the photodiode detects reflected light. Output is LOW when object detected.',
      unit: 'Digital / Analog output', color: '#f59e0b',
      specs: [
        { param: 'Operating Voltage', value: '3.3V – 5V' },
        { param: 'Detection Range', value: '2–30cm (adjustable)' },
        { param: 'Output Type', value: 'Digital (D0) + Analog (A0)' },
        { param: 'Operating Freq.', value: '38kHz (IR)' },
      ],
      uses: ['Obstacle detection', 'Line following', 'Object counting', 'Proximity sensing'],
      related: ['arduino-uno', 'led', 'jumper-wires'],
      formula: 'Digital: HIGH=no object, LOW=object detected',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'arduino-nano', name: 'Arduino Nano', category: 'Embedded', type: 'microcontroller',
      symbol: 'NANO', desc: 'Compact, breadboard-friendly ATmega328P microcontroller board.',
      longDesc: 'The Arduino Nano has nearly the same functionality as the Arduino Uno (ATmega328P, 5V logic, 16 MHz) in a tiny DIP-style package that plugs directly into a solderless breadboard. Uses Mini-USB or USB-C depending on the version.',
      unit: '22 Digital / 8 Analog', color: '#22c55e',
      specs: [
        { param: 'Microcontroller', value: 'ATmega328P' },
        { param: 'Operating Voltage', value: '5V (Vin: 7–12V)' },
        { param: 'Digital I/O Pins', value: '14 (6 PWM)' },
        { param: 'Analog Input Pins', value: '8 (A0–A7)' },
        { param: 'Clock Speed', value: '16 MHz' },
        { param: 'Form Factor', value: '18 × 45 mm (Breadboard ready)' },
      ],
      uses: ['Compact wearables', 'Breadboard prototyping', 'Mini robots', 'Sensor nodes'],
      related: ['arduino-uno', 'breadboard', 'jumper-wires'],
      formula: 'Pinout compatible with Uno + 2 extra Analog pins (A6, A7)',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'arduino-mega', name: 'Arduino Mega 2560', category: 'Embedded', type: 'microcontroller',
      symbol: 'MEGA', desc: 'High-pin-count microcontroller board for large robotics and 3D printer projects.',
      longDesc: 'Based on the ATmega2560, the Arduino Mega provides 54 digital I/O pins, 16 analog inputs, 4 hardware UART serial ports, and 256 KB of flash memory — ideal when an Uno runs out of pins or memory.',
      unit: '54 Digital / 16 Analog', color: '#10b981',
      specs: [
        { param: 'Microcontroller', value: 'ATmega2560' },
        { param: 'Operating Voltage', value: '5V' },
        { param: 'Digital I/O Pins', value: '54 (15 PWM)' },
        { param: 'Analog Input Pins', value: '16' },
        { param: 'Hardware Serial', value: '4× UART' },
        { param: 'Flash Memory', value: '256 KB' },
      ],
      uses: ['3D printers (RAMPS)', 'Multi-axis robotics', 'Home automation hubs', 'Large LED matrices'],
      related: ['arduino-uno', 'l298n', 'jumper-wires'],
      formula: '4× Serial ports allow GPS + Bluetooth + USB debugging simultaneously',
      tip: 'Intermediate',
      symbol_svg: null
    },
    {
      id: 'raspberry-pi', name: 'Raspberry Pi (4 / 5)', category: 'Embedded', type: 'sbc',
      symbol: 'RPi', desc: 'Credit-card-sized Linux single-board computer with 40-pin GPIO.',
      longDesc: 'Unlike Arduino (a microcontroller), the Raspberry Pi is a full computer running Linux (Raspberry Pi OS). It has HDMI, USB, Ethernet/Wi-Fi, and a 40-pin 3.3V GPIO header for controlling electronics using Python.',
      unit: '3.3V GPIO (40-pin)', color: '#ef4444',
      specs: [
        { param: 'Processor', value: 'Quad-core ARM Cortex-A72/A76' },
        { param: 'GPIO Logic Level', value: '3.3V (NOT 5V tolerant!)' },
        { param: 'Power Supply', value: '5V DC via USB-C (3A–5A)' },
        { param: 'Interfaces', value: 'I2C, SPI, UART, PWM, HDMI' },
        { param: 'Languages', value: 'Python, C/C++, Node.js' },
      ],
      uses: ['Computer vision', 'IoT servers', 'Retro gaming', 'AI edge projects', 'Home Assistant'],
      related: ['esp32', 'jumper-wires', 'dht11-dht22'],
      formula: '⚠️ Never apply 5V directly to Raspberry Pi GPIO pins (max 3.3V)',
      tip: 'Intermediate',
      symbol_svg: null
    },
    {
      id: 'esp32', name: 'ESP32 DevKit', category: 'Embedded', type: 'microcontroller',
      symbol: 'ESP32', desc: 'Dual-core 32-bit microcontroller with built-in Wi-Fi and Bluetooth.',
      longDesc: 'The ESP32 is a powerhouse 3.3V microcontroller featuring dual-core Xtensa LX6 processors up to 240 MHz, built-in Wi-Fi & Bluetooth/BLE, capacitive touch pins, DACs, and 12-bit ADCs. Programmable via Arduino IDE or MicroPython.',
      unit: '3.3V / Wi-Fi + BLE', color: '#06b6d4',
      specs: [
        { param: 'CPU', value: 'Dual-core 32-bit @ 240 MHz' },
        { param: 'Operating Voltage', value: '3.3V logic (5V via USB/VIN)' },
        { param: 'Wireless', value: 'Wi-Fi 802.11 b/g/n + Bluetooth 4.2/BLE' },
        { param: 'GPIO Pins', value: '34 (ADC, DAC, Touch, PWM, I2C, SPI)' },
        { param: 'Flash Memory', value: '4 MB typical' },
      ],
      uses: ['IoT dashboards', 'Smart home devices', 'Wireless sensor networks', 'Web servers'],
      related: ['esp8266', 'dht11-dht22', 'raspberry-pi'],
      formula: '12-bit ADC: 0–3.3V → 0–4095',
      tip: 'Intermediate',
      symbol_svg: null
    },
    {
      id: 'esp8266', name: 'ESP8266 (NodeMCU)', category: 'Embedded', type: 'microcontroller',
      symbol: 'ESP8266', desc: 'Low-cost Wi-Fi microcontroller board ideal for beginner IoT projects.',
      longDesc: 'The NodeMCU ESP8266 integrates a 32-bit Tensilica processor and Wi-Fi transceiver onto a breadboard-friendly board with USB-to-serial built in. Great for simple Wi-Fi switches and sensor loggers.',
      unit: '3.3V / Wi-Fi', color: '#3b82f6',
      specs: [
        { param: 'CPU', value: '32-bit @ 80/160 MHz' },
        { param: 'Operating Voltage', value: '3.3V logic (5V via Micro-USB)' },
        { param: 'Digital GPIO', value: '11 usable pins' },
        { param: 'Analog Input', value: '1× ADC (0–1V raw, 0–3.3V on NodeMCU)' },
        { param: 'Wireless', value: 'Wi-Fi 802.11 b/g/n' },
      ],
      uses: ['Wi-Fi smart plugs', 'Weather stations', 'MQTT IoT nodes', 'Blynk apps'],
      related: ['esp32', 'dht11-dht22', 'jumper-wires'],
      formula: 'NodeMCU pin D1 = GPIO5, D2 = GPIO4 (check pinout map!)',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'jumper-wires', name: 'Jumper Wires (M-M, M-F, F-F)', category: 'Connectivity', type: 'connectivity',
      symbol: 'WIRE', desc: 'Flexible connector cables for solderless breadboards and header pins.',
      longDesc: 'Jumper wires let you build and test circuits without soldering. They come in three gender combinations: Male-to-Male (breadboard to breadboard/Arduino), Male-to-Female (breadboard/Arduino to sensor pins), and Female-to-Female (Raspberry Pi/module to module).',
      unit: '2.54mm (0.1") Pitch', color: '#f59e0b',
      specs: [
        { param: 'Pin Pitch', value: '2.54 mm (0.1 inch standard)' },
        { param: 'Types', value: 'Male-Male, Male-Female, Female-Female' },
        { param: 'Wire Gauge', value: '24–28 AWG (signal, < 1A)' },
        { param: 'Colour Convention', value: 'Red = +VCC, Black/Brown = GND, Others = Signal' },
      ],
      uses: ['Breadboard prototyping', 'Connecting sensors to Arduino/RPi', 'Quick debugging'],
      related: ['breadboard', 'arduino-uno', 'ultrasonic-hcsr04'],
      formula: 'Always use Red for +V and Black for GND to avoid short circuits!',
      tip: 'Beginner',
      symbol_svg: `<svg width="64" height="30" viewBox="0 0 64 30">
        <rect x="2" y="11" width="10" height="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="1"/>
        <line x1="0" y1="15" x2="2" y2="15" stroke="#94a3b8" stroke-width="2"/>
        <path d="M12,15 C24,4 40,26 52,15" stroke="#f59e0b" stroke-width="2.5" fill="none"/>
        <rect x="52" y="11" width="10" height="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="1"/>
        <line x1="62" y1="15" x2="64" y2="15" stroke="#94a3b8" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'breadboard', name: 'Solderless Breadboard', category: 'Connectivity', type: 'connectivity',
      symbol: 'BB', desc: 'Reusable prototyping board with interconnected spring-clip rows.',
      longDesc: 'A breadboard lets you plug in components and jumper wires to build circuits without soldering. The top and bottom +/- power rails run horizontally; the central terminal strips run vertically in groups of 5 holes separated by a center ravine (for DIP ICs).',
      unit: '400 / 830 Tie-Points', color: '#94a3b8',
      specs: [
        { param: 'Sizes', value: '170 (mini), 400 (half), 830 (full) tie-points' },
        { param: 'Hole Spacing', value: '2.54 mm (fits DIP ICs & Arduino Nano)' },
        { param: 'Max Current', value: '~1A recommended (not for high-power motors)' },
        { param: 'Center Gap', value: '0.3 inch (isolates opposite pins of DIP ICs)' },
      ],
      uses: ['Testing circuits before PCB', 'Learning electronics', 'Arduino Nano prototyping'],
      related: ['jumper-wires', 'arduino-nano', 'resistor'],
      formula: 'Power rails = horizontal; Central A-E and F-J rows = vertical (5 holes)',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'l298n', name: 'L298N Motor Driver', category: 'Electromechanical', type: 'driver',
      symbol: 'L298N', desc: 'Dual H-Bridge module for controlling speed and direction of DC & stepper motors.',
      longDesc: 'Microcontroller pins can only supply ~20–40mA, which is too weak to drive motors. The L298N Dual H-Bridge uses external battery power (5V–35V) to drive two DC motors independently with forward/reverse direction (IN1–IN4) and PWM speed control (ENA/ENB).',
      unit: 'Up to 2A / channel', color: '#ef4444',
      specs: [
        { param: 'Motor Supply (VMS)', value: '5V – 35V DC' },
        { param: 'Logic Supply', value: '5V (built-in 78M05 regulator when VMS ≤ 12V)' },
        { param: 'Max Current', value: '2A per channel (peak)' },
        { param: 'Channels', value: '2× DC motors or 1× Bipolar Stepper' },
        { param: 'Control Pins', value: 'ENA, IN1, IN2 (Motor A) | ENB, IN3, IN4 (Motor B)' },
      ],
      uses: ['Robot cars', 'Line followers', 'Stepper motor control', 'Conveyor belts'],
      related: ['arduino-uno', 'mosfet', 'jumper-wires'],
      formula: 'IN1=HIGH, IN2=LOW → Forward | IN1=LOW, IN2=HIGH → Reverse | ENA=PWM → Speed',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'l293d', name: 'L293D Motor Driver IC', category: 'Electromechanical', type: 'driver',
      symbol: 'L293D', desc: '16-pin DIP quadruple half-H driver IC for small DC motors.',
      longDesc: 'The L293D is a breadboard-friendly 16-pin IC that can drive two small DC motors in both directions. It includes built-in clamp diodes to protect against inductive voltage spikes from motor coils.',
      unit: '600mA / channel', color: '#f59e0b',
      specs: [
        { param: 'Package', value: '16-pin DIP (Breadboard friendly)' },
        { param: 'Motor Voltage (Vcc2)', value: '4.5V – 36V' },
        { param: 'Output Current', value: '600mA continuous (1.2A peak) per channel' },
        { param: 'Protection', value: 'Internal flyback clamp diodes' },
      ],
      uses: ['Small hobby DC motors', 'Breadboard robotics', 'Bi-directional actuator control'],
      related: ['l298n', 'breadboard', 'arduino-uno'],
      formula: 'Pin 8 (Vcc2) = Motor Battery + | Pin 16 (Vcc1) = 5V Logic',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'ultrasonic-hcsr04', name: 'Ultrasonic Sensor (HC-SR04)', category: 'Sensors', type: 'sensor',
      symbol: 'HC-SR04', desc: 'Measures distance from 2cm to 400cm using ultrasonic sound waves.',
      longDesc: 'The HC-SR04 sends out a 40 kHz ultrasonic pulse from the Trigger (Trig) pin and measures how long it takes for the Echo to bounce back from an object. Very popular for obstacle-avoidance robots and water-level monitoring.',
      unit: '2cm – 400cm', color: '#06b6d4',
      specs: [
        { param: 'Operating Voltage', value: '5V DC' },
        { param: 'Measuring Range', value: '2 cm – 400 cm (±3 mm accuracy)' },
        { param: 'Pins', value: 'VCC, Trig, Echo, GND' },
        { param: 'Ultrasonic Freq.', value: '40 kHz' },
      ],
      uses: ['Obstacle-avoiding robots', 'Parking sensors', 'Tank level measurement'],
      related: ['arduino-uno', 'l298n', 'jumper-wires'],
      formula: 'Distance (cm) = (Echo_time_µs × 0.0343) / 2',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'dht11-dht22', name: 'DHT11 / DHT22 Temp & Humidity', category: 'Sensors', type: 'sensor',
      symbol: 'DHT', desc: 'Digital temperature and relative humidity sensor with single-wire output.',
      longDesc: 'DHT11 (budget, ±2°C) and DHT22 (higher precision, ±0.5°C) measure both temperature and humidity and send calibrated digital data over a single data pin. Requires a 4.7kΩ–10kΩ pull-up resistor if using the bare 4-pin sensor.',
      unit: '°C & %RH', color: '#22c55e',
      specs: [
        { param: 'Operating Voltage', value: '3.3V – 5V' },
        { param: 'DHT11 Range', value: '0–50°C (±2°C) | 20–80% RH' },
        { param: 'DHT22 Range', value: '-40–80°C (±0.5°C) | 0–100% RH' },
        { param: 'Interface', value: 'Single-wire digital protocol' },
      ],
      uses: ['Weather stations', 'Smart greenhouses', 'HVAC monitoring', 'IoT dashboards'],
      related: ['esp32', 'arduino-uno', 'resistor'],
      formula: 'Use 10kΩ pull-up resistor between VCC and DATA pin',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'ldr', name: 'LDR (Photoresistor)', category: 'Sensors', type: 'sensor',
      symbol: 'LDR', desc: 'Light-dependent resistor whose resistance drops as light intensity increases.',
      longDesc: 'A Light Dependent Resistor (LDR) is a passive semiconductor sensor. In darkness its resistance is very high (MΩ); in bright light its resistance drops to a few hundred Ohms. Pair it with a fixed 10kΩ resistor in a voltage divider to read light levels on an Arduino analog pin.',
      unit: 'Ω (light dependent)', color: '#f59e0b',
      specs: [
        { param: 'Dark Resistance', value: '1 MΩ – 10 MΩ' },
        { param: 'Light Resistance', value: '100 Ω – 1 kΩ' },
        { param: 'Peak Spectral Response', value: '~540 nm (visible green/yellow)' },
        { param: 'Polarity', value: 'Non-polarized (connect either way)' },
      ],
      uses: ['Automatic street lights', 'Day/night switches', 'Light-following robots', 'Camera exposure'],
      related: ['resistor', 'transistor-bjt', 'arduino-uno'],
      formula: 'Vout = 5V × R_fixed / (R_LDR + R_fixed)',
      tip: 'Beginner',
      symbol_svg: `<svg width="64" height="36" viewBox="0 0 64 36">
        <line x1="0" y1="20" x2="14" y2="20" stroke="#f59e0b" stroke-width="2"/>
        <rect x="14" y="13" width="36" height="14" stroke="#f59e0b" stroke-width="2" fill="none" rx="2"/>
        <line x1="50" y1="20" x2="64" y2="20" stroke="#f59e0b" stroke-width="2"/>
        <line x1="18" y1="2" x2="26" y2="10" stroke="#fbbf24" stroke-width="1.5"/>
        <line x1="28" y1="2" x2="36" y2="10" stroke="#fbbf24" stroke-width="1.5"/>
      </svg>`
    },
    {
      id: 'pir-sensor', name: 'PIR Motion Sensor (HC-SR501)', category: 'Sensors', type: 'sensor',
      symbol: 'PIR', desc: 'Detects human or animal movement by sensing infrared heat changes.',
      longDesc: 'A Passive Infrared (PIR) sensor detects changes in infrared radiation emitted by warm bodies moving across its Fresnel lens. It outputs a clean 3.3V HIGH pulse on the OUT pin when motion is detected, with onboard potentiometers for sensitivity and delay time.',
      unit: 'Digital HIGH/LOW', color: '#a855f7',
      specs: [
        { param: 'Operating Voltage', value: '4.5V – 20V DC' },
        { param: 'Output Signal', value: '3.3V Digital HIGH when motion detected' },
        { param: 'Detection Range', value: 'Up to 7 meters (110° cone)' },
        { param: 'Pins', value: 'VCC, OUT, GND' },
      ],
      uses: ['Burglar alarms', 'Automatic hallway lights', 'Smart energy savers'],
      related: ['arduino-uno', 'esp32', 'led'],
      formula: 'Allow 30–60s warm-up time on power-up for stable readings',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'mq2-gas', name: 'MQ-2 Gas & Smoke Sensor', category: 'Sensors', type: 'sensor',
      symbol: 'MQ-2', desc: 'Detects LPG, propane, methane, hydrogen, and smoke concentrations.',
      longDesc: 'The MQ-2 uses a heated tin-dioxide (SnO2) sensing element whose conductivity increases when combustible gases or smoke are present. The module provides both an Analog (A0) reading for concentration and a threshold-adjustable Digital (D0) alarm pin.',
      unit: '200 – 10,000 ppm', color: '#ef4444',
      specs: [
        { param: 'Operating Voltage', value: '5V DC (internal heater draws ~150mA)' },
        { param: 'Detectable Gases', value: 'LPG, Methane, Propane, Hydrogen, Smoke' },
        { param: 'Outputs', value: 'Analog (A0) + Digital (D0)' },
        { param: 'Preheat Time', value: '20–60 seconds before accurate reading' },
      ],
      uses: ['Kitchen gas leak alarms', 'Fire/smoke detectors', 'Air quality monitors'],
      related: ['arduino-uno', 'led', 'jumper-wires'],
      formula: 'Higher gas concentration → Lower sensor resistance → Higher A0 voltage',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'soil-moisture', name: 'Soil Moisture Sensor', category: 'Sensors', type: 'sensor',
      symbol: 'SOIL', desc: 'Measures water content in soil for automated plant watering systems.',
      longDesc: 'Available in resistive (2-prong fork) and capacitive (corrosion-resistant) versions. Capacitive soil sensors measure the dielectric change of wet vs dry soil and output an analog voltage without corroding over time.',
      unit: 'Analog / Digital', color: '#22c55e',
      specs: [
        { param: 'Operating Voltage', value: '3.3V – 5V' },
        { param: 'Types', value: 'Capacitive (recommended) & Resistive' },
        { param: 'Output', value: 'Analog voltage (dry ≈ high, wet ≈ low)' },
      ],
      uses: ['Auto plant watering', 'Smart agriculture', 'Greenhouse automation'],
      related: ['arduino-uno', 'esp8266', 'dht11-dht22'],
      formula: 'Calibrate in air (0% wet) and water (100% wet) using map()',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'ir-array', name: 'IR Sensor Array (5–8 Channel)', category: 'Sensors', type: 'sensor',
      symbol: 'IR-8', desc: 'Multi-channel TCRT5000 reflective optical array for high-speed PID line followers.',
      longDesc: 'Instead of just 2 sensors, a 5-channel, 8-channel, or 10-channel IR array places closely spaced TCRT5000 emitter/phototransistor pairs in a row. This gives continuous line position feedback so a PID controller can steer smoothly around sharp curves.',
      unit: '5 / 8 / 10 Channels', color: '#06b6d4',
      specs: [
        { param: 'Channels', value: '5-ch, 8-ch (QTR-8RC), or 10-ch array' },
        { param: 'Operating Voltage', value: '3.3V – 5V DC' },
        { param: 'Optimal Height', value: '3 – 10 mm above floor' },
        { param: 'Output', value: 'Analog or Digital per channel' },
      ],
      uses: ['PID line-following robots', 'Maze solving robots', 'High-speed racing bots'],
      related: ['sensor-ir', 'arduino-nano', 'l298n'],
      formula: 'Weighted Position = Σ(i × sensor[i]) / Σ(sensor[i])',
      tip: 'Intermediate',
      symbol_svg: null
    },
    {
      id: 'sound-sensor', name: 'Sound Sensor (KY-038 / MAX4466)', category: 'Sensors', type: 'sensor',
      symbol: 'MIC', desc: 'Electret microphone module that detects claps, voice, and music beat amplitude.',
      longDesc: 'A sound sensor pairs an electret condenser microphone with an amplifier/comparator (LM393 on KY-038, or low-noise op-amp on MAX4466). Use D0 for simple clap detection, or A0 for real-time audio volume / beat visualization.',
      unit: 'Analog (A0) / Digital (D0)', color: '#a855f7',
      specs: [
        { param: 'Operating Voltage', value: '3.3V – 5V DC' },
        { param: 'Outputs', value: 'Analog (waveform/envelope) + Digital (threshold)' },
        { param: 'Adjustment', value: 'Onboard trimpot for sensitivity' },
      ],
      uses: ['Sound-reactive LED strips', 'Clap-activated switches', 'Music visualizers', 'Noise meters'],
      related: ['ws2812b', 'arduino-nano', 'relay-5v'],
      formula: 'Peak-to-Peak Amplitude = max(analogRead) - min(analogRead)',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'ws2812b', name: 'WS2812B NeoPixel RGB LED Strip', category: 'Semiconductor', type: 'semiconductor',
      symbol: 'RGB', desc: 'Individually addressable full-colour RGB LEDs controlled over a single data wire.',
      longDesc: 'Each WS2812B LED contains a tiny driver chip inside the 5050 package. By daisy-chaining DOUT to DIN, you can control hundreds of LEDs in 16.7 million colours using a single microcontroller pin (FastLED / Adafruit_NeoPixel library).',
      unit: '5V / 60mA max per LED', color: '#ec4899',
      specs: [
        { param: 'Supply Voltage', value: '5V DC' },
        { param: 'Max Current', value: '~60 mA per LED (full white)' },
        { param: 'Protocol', value: 'Single-wire 800 kHz timing' },
        { param: 'Protection', value: '330Ω data resistor + 1000µF cap across 5V/GND' },
      ],
      uses: ['Music visualizers', 'Ambient PC lighting', 'Glowing art installations', 'Wearables'],
      related: ['sound-sensor', 'arduino-nano', 'capacitor'],
      formula: 'Max Amps = Number_of_LEDs × 0.06A (use external 5V PSU for >10 LEDs)',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'servo-sg90', name: 'Servo Motor (SG90 / MG995)', category: 'Electromechanical', type: 'actuator',
      symbol: 'SERVO', desc: 'Closed-loop geared motor that rotates precisely to an angle (0°–180°).',
      longDesc: 'Servo motors contain a DC motor, gearbox, potentiometer feedback, and control circuit. Sending a 50 Hz PWM pulse (1ms to 2ms width) sets the exact shaft angle. SG90 is light (9g) for sensors; MG995 has metal gears for robotic arms.',
      unit: '0° – 180° (50Hz PWM)', color: '#f59e0b',
      specs: [
        { param: 'Operating Voltage', value: '4.8V – 6V DC' },
        { param: 'Wire Colours', value: 'Brown/Black = GND, Red = +5V, Orange/Yellow = Signal' },
        { param: 'SG90 Torque', value: '1.8 kg·cm (plastic gears)' },
        { param: 'MG995 Torque', value: '10 kg·cm (metal gears, needs external PSU)' },
      ],
      uses: ['Robotic arms', 'Ultrasonic pan-tilt scanners', 'Solar trackers', 'Steering'],
      related: ['arduino-uno', 'potentiometer', 'ultrasonic-hcsr04'],
      formula: '1.0ms pulse → 0° | 1.5ms → 90° | 2.0ms → 180°',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'dc-motor-bo', name: 'BO Geared DC Motor & Wheel', category: 'Electromechanical', type: 'actuator',
      symbol: 'MOTOR', desc: 'Lightweight plastic-geared DC motor for beginner wheeled robots.',
      longDesc: 'BO (Battery Operated) geared motors reduce high-RPM DC motor speed into usable torque for small 2WD and 4WD robot chassis. Always drive them through a motor driver (L298N/L293D) — never directly from Arduino pins.',
      unit: '3V – 12V / 150–300 RPM', color: '#3b82f6',
      specs: [
        { param: 'Operating Voltage', value: '3V – 12V DC (6–9V ideal)' },
        { param: 'No-Load Speed', value: '150 – 300 RPM typical' },
        { param: 'Stall Current', value: '~600–800 mA' },
      ],
      uses: ['Line following robots', 'Obstacle-avoiding cars', 'Bluetooth RC rovers'],
      related: ['l298n', 'l293d', 'battery-18650', 'bldc-motor', 'stepper-motor'],
      formula: 'Reverse polarity (+ and −) to reverse spin direction',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'bldc-motor', name: 'BLDC Motor & ESC (Brushless DC)', category: 'Electromechanical', type: 'actuator',
      symbol: 'BLDC', desc: 'High-efficiency, high-RPM 3-phase brushless motor driven by an Electronic Speed Controller (ESC).',
      longDesc: 'Unlike brushed DC motors, a Brushless DC (BLDC) motor has permanent magnets on the rotor and 3-phase copper windings on the stator—no physical brushes to wear out. An ESC (Electronic Speed Controller) converts DC battery power into timed 3-phase AC pulses and is controlled by an Arduino/flight controller using standard 50Hz servo PWM (1000µs = stop, 2000µs = full throttle).',
      unit: 'KV Rating / 3-Phase', color: '#06b6d4',
      specs: [
        { param: 'Speed Constant (KV)', value: '1000 – 2400 KV (RPM per Volt)' },
        { param: 'Operating Voltage', value: '7.4V – 22.2V (2S–6S LiPo via ESC)' },
        { param: 'Phase Wires', value: '3 Thick Wires (U, V, W) — swap any 2 to reverse spin' },
        { param: 'ESC Control Plug', value: 'Orange/White = PWM Signal, Red = 5V BEC, Brown/Black = GND' },
      ],
      uses: ['Quadcopters & drones', 'RC planes & EDF jets', 'Electric skateboards & high-speed robots'],
      related: ['servo-sg90', 'stepper-motor', 'dc-motor-bo', 'arduino-uno'],
      formula: 'No-Load RPM = KV × Battery Voltage (V)',
      tip: 'Intermediate',
      symbol_svg: null
    },
    {
      id: 'stepper-motor', name: 'Stepper Motor (28BYJ-48 / NEMA 17)', category: 'Electromechanical', type: 'actuator',
      symbol: 'STEP', desc: 'Precision brushless motor that moves in exact discrete angular steps without feedback.',
      longDesc: 'Stepper motors divide a full 360° rotation into many equal steps (e.g. 200 steps = 1.8°/step for NEMA 17, or 2048 steps with gearing for 28BYJ-48). Energizing electromagnetic coils in sequence advances the rotor one step at a time. Driven by A4988/TMC2209 (bipolar 4-wire) or ULN2003 (unipolar 5-wire) drivers.',
      unit: '1.8° / step (200 steps/rev)', color: '#a855f7',
      specs: [
        { param: 'NEMA 17 Step Angle', value: '1.8° per full step (200 steps/rev)' },
        { param: '28BYJ-48 Step Angle', value: '5.625°/64 (~2048 steps/rev with 1:64 gearbox)' },
        { param: 'Driver Interface', value: 'A4988 (STEP, DIR, 1A/1B/2A/2B) or ULN2003 (IN1–IN4)' },
        { param: 'Operating Voltage', value: '5V (28BYJ-48) | 12V–24V (NEMA 17 VMOT)' },
      ],
      uses: ['3D printers & CNC machines', 'Laser engravers', 'Camera sliders & precision turntables'],
      related: ['servo-sg90', 'bldc-motor', 'l298n', 'arduino-uno'],
      formula: 'Angle = Step Count × Step Angle (°)',
      tip: 'Intermediate',
      symbol_svg: null
    },
    {
      id: 'relay-5v', name: '5V Relay Module', category: 'Electromechanical', type: 'switch',
      symbol: 'RLY', desc: 'Electrically isolated switch allowing low-voltage MCUs to control high-power loads.',
      longDesc: 'A 5V relay uses an internal electromagnet (coil) and optocoupler to physically open/close heavy-duty contacts (COM, NO, NC). Most modules are Active-LOW (IN = LOW turns relay ON).',
      unit: '5V Coil / 10A 250VAC', color: '#ef4444',
      specs: [
        { param: 'Trigger Voltage', value: '5V DC (optocoupler isolated)' },
        { param: 'Contact Rating', value: '10A @ 250V AC / 30V DC' },
        { param: 'Terminals', value: 'COM (Common), NO (Normally Open), NC (Normally Closed)' },
      ],
      uses: ['Clap switches', 'Smart home appliances', 'Automated pumps & lights'],
      related: ['sound-sensor', 'arduino-uno', 'ldr'],
      formula: '⚠️ High-voltage AC wiring requires adult/lab supervision and insulation',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'hc05-bluetooth', name: 'Bluetooth Module (HC-05)', category: 'Connectivity', type: 'wireless',
      symbol: 'BT', desc: 'Classic Serial Bluetooth (SPP) module for wireless robot and phone control.',
      longDesc: 'The HC-05 creates a wireless UART serial link between your Arduino and an Android phone or PC at 9600 baud. Connect TX→RX and RX→TX (use a 1kΩ/2kΩ voltage divider on HC-05 RX since its logic is 3.3V).',
      unit: 'UART 9600–115200 bps', color: '#3b82f6',
      specs: [
        { param: 'Supply Voltage', value: '3.6V – 6V DC' },
        { param: 'UART Logic Level', value: '3.3V (voltage divider needed on RX)' },
        { param: 'Range', value: '~10 meters (Class 2)' },
      ],
      uses: ['Bluetooth RC robots', 'Wireless telemetry', 'Phone-controlled home automation'],
      related: ['arduino-uno', 'l298n', 'jumper-wires'],
      formula: 'Disconnect HC-05 RX/TX pins while uploading code to Arduino Uno!',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'potentiometer', name: 'Potentiometer (10kΩ)', category: 'Passive', type: 'passive',
      symbol: 'POT', desc: 'Three-terminal variable resistor used as a rotary knob or voltage divider.',
      longDesc: 'A potentiometer has a resistive track between outer pins 1 & 3 and a movable wiper on center pin 2. Turning the shaft varies the voltage at the wiper smoothly from 0V to VCC — great for controlling servo angles, LED brightness, or thresholds.',
      unit: '10kΩ (typical)', color: '#8b5cf6',
      specs: [
        { param: 'Common Values', value: '1kΩ, 10kΩ, 50kΩ, 100kΩ' },
        { param: 'Taper', value: 'Linear (B) for sensors/MCUs, Log (A) for audio' },
        { param: 'Rotation', value: '~270°–300°' },
      ],
      uses: ['Robotic arm joint control', 'LCD contrast adjustment', 'Speed/volume knobs'],
      related: ['resistor', 'servo-sg90', 'arduino-uno'],
      formula: 'V_wiper = Vcc × (θ / θ_max)',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'cr2032-battery', name: 'CR2032 Coin Cell & Holder', category: 'Power', type: 'power',
      symbol: '3V', desc: 'Compact 3V lithium coin battery for wearable LEDs and glowing paper/PCB art.',
      longDesc: 'A CR2032 delivers 3V in a tiny 20mm coin package (~220mAh). Because its internal resistance naturally limits current slightly, it is the safest, easiest power source for beginner Glowing Butterfly badges, LED greeting cards, and RTC backup.',
      unit: '3V / ~220mAh', color: '#f59e0b',
      specs: [
        { param: 'Nominal Voltage', value: '3.0V DC' },
        { param: 'Capacity', value: '210 – 240 mAh' },
        { param: 'Diameter × Height', value: '20 mm × 3.2 mm' },
      ],
      uses: ['Glowing butterfly badges', 'Wearable e-textiles', 'Paper circuits', 'RTC backup'],
      related: ['led', 'slide-switch', 'resistor'],
      formula: 'Runtime (hrs) ≈ 220mAh / Total_LED_mA',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'slide-switch', name: 'Slide / Tactile Switch', category: 'Electromechanical', type: 'switch',
      symbol: 'SW', desc: 'Manual mechanical switch to turn circuits ON/OFF or trigger digital inputs.',
      longDesc: 'A slide switch (SPDT) stays in its ON or OFF position, ideal for battery-powered badges like the Glowing Butterfly. A tactile push-button is momentary (ON only while pressed) and requires a pull-up or pull-down resistor with microcontrollers.',
      unit: 'SPST / SPDT', color: '#94a3b8',
      specs: [
        { param: 'Types', value: 'SPDT Slide Switch, 4-pin Tactile Pushbutton' },
        { param: 'Rating', value: '50mA – 500mA @ 12V DC' },
      ],
      uses: ['Power ON/OFF on badges', 'User input buttons', 'Mode selectors'],
      related: ['cr2032-battery', 'led', 'resistor'],
      formula: 'Arduino input: use pinMode(pin, INPUT_PULLUP) to avoid external resistors',
      tip: 'Beginner',
      symbol_svg: null
    },
    {
      id: 'battery-18650', name: '18650 Li-Ion Battery Pack (2S)', category: 'Power', type: 'power',
      symbol: '7.4V', desc: 'Rechargeable high-current lithium cells for robotics and motor drivers.',
      longDesc: 'Standard 9V rectangular batteries run out quickly when powering motors. Two 18650 Li-Ion cells in series (2S) provide 7.4V nominal (8.4V full) with 2000–3000mAh capacity and high discharge current — ideal for L298N motor drivers and robots.',
      unit: '7.4V (2S) / 2500mAh', color: '#22c55e',
      specs: [
        { param: 'Single Cell Voltage', value: '3.7V nominal (4.2V full, 3.0V cutoff)' },
        { param: '2S Pack Voltage', value: '7.4V nominal (8.4V max)' },
        { param: 'Safety', value: 'Always use a BMS / protected cells & proper Li-Ion charger' },
      ],
      uses: ['Line following robots', 'RC rovers', 'Portable ESP32 nodes'],
      related: ['l298n', 'dc-motor-bo', 'arduino-uno'],
      formula: '⚠️ Never short-circuit Li-Ion cells; always use a battery holder with switch',
      tip: 'Beginner',
      symbol_svg: null
    },
  ],

  // ── Learn content ─────────────────────────────────────────
  subjects: [
    {
      id: 'fundamentals', name: 'Electrical Fundamentals', icon: '⚡', color: '#3b82f6',
      desc: 'Master voltage, current, resistance and Ohm\'s law.',
      level: 'Beginner', lessons: 12,
      topics: [
        { id: 'voltage', title: 'What is Voltage?', duration: '8 min', done: true },
        { id: 'current', title: 'Electric Current', duration: '7 min', done: true },
        { id: 'resistance', title: 'Resistance & Ohm\'s Law', duration: '10 min', done: false },
        { id: 'power', title: 'Electrical Power', duration: '9 min', done: false },
        { id: 'series-parallel', title: 'Series & Parallel Circuits', duration: '12 min', done: false },
      ]
    },
    {
      id: 'basic-electronics', name: 'Basic Electronics', icon: '🔌', color: '#8b5cf6',
      desc: 'Resistors, capacitors, inductors, diodes and their circuits.',
      level: 'Beginner', lessons: 18,
      topics: [
        { id: 'resistors', title: 'Resistors & Colour Codes', duration: '10 min', done: false },
        { id: 'capacitors', title: 'Capacitors & Charging', duration: '11 min', done: false },
        { id: 'diodes', title: 'PN Junction Diodes', duration: '13 min', done: false },
        { id: 'rectifiers', title: 'Half & Full-Wave Rectifiers', duration: '14 min', done: false },
        { id: 'led-circuits', title: 'LED Circuits', duration: '8 min', done: false },
      ]
    },
    {
      id: 'analog', name: 'Analog Electronics', icon: '〰️', color: '#06b6d4',
      desc: 'Transistors, amplifiers, oscillators and filters.',
      level: 'Intermediate', lessons: 24,
      topics: [
        { id: 'bjt-basics', title: 'BJT Basics & Biasing', duration: '15 min', done: false },
        { id: 'ce-amplifier', title: 'Common Emitter Amplifier', duration: '14 min', done: false },
        { id: 'op-amp-intro', title: 'Introduction to Op-Amps', duration: '16 min', done: false },
        { id: 'filters', title: 'RC & Active Filters', duration: '15 min', done: false },
      ]
    },
    {
      id: 'digital', name: 'Digital Electronics', icon: '1️⃣', color: '#22c55e',
      desc: 'Logic gates, Boolean algebra, flip-flops and counters.',
      level: 'Intermediate', lessons: 20,
      topics: [
        { id: 'logic-gates', title: 'Logic Gates (AND, OR, NOT)', duration: '12 min', done: false },
        { id: 'boolean', title: 'Boolean Algebra', duration: '14 min', done: false },
        { id: 'flipflops', title: 'Flip-Flops & Latches', duration: '16 min', done: false },
        { id: 'counters', title: 'Counters & Registers', duration: '15 min', done: false },
      ]
    },
    {
      id: 'embedded', name: 'Embedded Systems', icon: '🤖', color: '#f59e0b',
      desc: 'Arduino, ESP32, microcontrollers and sensor interfacing.',
      level: 'Intermediate', lessons: 22,
      topics: [
        { id: 'arduino-intro', title: 'Getting Started with Arduino', duration: '12 min', done: false },
        { id: 'gpio', title: 'GPIO: Digital I/O', duration: '10 min', done: false },
        { id: 'adc', title: 'Analog Inputs & ADC', duration: '11 min', done: false },
        { id: 'sensors', title: 'Sensor Interfacing', duration: '13 min', done: false },
        { id: 'esp32', title: 'ESP32 & WiFi', duration: '15 min', done: false },
      ]
    },
    {
      id: 'semiconductor', name: 'Semiconductor Technology', icon: '💎', color: '#a855f7',
      desc: 'PN junctions, MOSFETs, fabrication processes and ICs.',
      level: 'Advanced', lessons: 16,
      topics: [
        { id: 'pn-theory', title: 'PN Junction Theory', duration: '18 min', done: false },
        { id: 'mosfet-theory', title: 'MOSFET Operation', duration: '17 min', done: false },
        { id: 'cmos', title: 'CMOS Logic', duration: '16 min', done: false },
      ]
    },
    {
      id: 'advanced', name: 'Advanced Electronics', icon: '🚀', color: '#ef4444',
      desc: 'VLSI, communication systems and signal processing.',
      level: 'Advanced', lessons: 20,
      topics: [
        { id: 'signals', title: 'Signals & Systems', duration: '20 min', done: false },
        { id: 'comm', title: 'Communication Circuits', duration: '18 min', done: false },
        { id: 'vlsi', title: 'Introduction to VLSI', duration: '22 min', done: false },
      ]
    },
  ],

  // ── Lesson content ─────────────────────────────────────────
  lessons: {
    'voltage': {
      title: 'What is Voltage?',
      subject: 'Electrical Fundamentals',
      level: 'Beginner', duration: '8 min',
      objectives: [
        'Define voltage and explain its physical meaning',
        'Understand the relationship between voltage and electric potential',
        'Identify voltage sources in everyday life',
      ],
      content: `
        <h3>What is Voltage?</h3>
        <p>Voltage, also called <strong>Electric Potential Difference</strong>, is the amount of energy per unit charge needed to move a positive charge between two points in an electric field.</p>
        <p>Think of voltage as <strong>water pressure</strong> in a pipe. Just as higher water pressure pushes more water through a pipe, higher voltage pushes more electric current through a conductor.</p>

        <div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:10px;padding:1rem;margin:1rem 0;">
          <strong style="color:#60a5fa;">💡 Simple Analogy</strong>
          <p style="margin-top:0.5rem;">Water Tank → Battery<br>Water Pressure → Voltage<br>Water Flow → Current<br>Narrow Pipe → Resistance</p>
        </div>

        <h3>The Formula</h3>
        <p>Voltage is measured in <strong>Volts (V)</strong>, named after Alessandro Volta.</p>

        <div class="calc-formula" style="margin:1rem 0;font-size:1.1rem;">V = W / Q</div>
        <p>Where: V = Voltage (Volts), W = Work/Energy (Joules), Q = Charge (Coulombs)</p>

        <h3>Types of Voltage Sources</h3>
        <ul style="color:#94a3b8;line-height:2;">
          <li>⚡ <strong>Batteries</strong> — Chemical energy → Electrical energy (1.5V AA, 9V, 12V)</li>
          <li>🔌 <strong>Power Supplies</strong> — Regulated DC output (5V, 12V, 24V)</li>
          <li>🏭 <strong>AC Mains</strong> — 230V AC (India), 120V AC (USA)</li>
          <li>☀️ <strong>Solar Cells</strong> — Light → Electrical energy</li>
        </ul>

        <h3>Measuring Voltage</h3>
        <p>Use a <strong>Digital Multimeter</strong> set to Volts (V). Connect the red probe to the positive terminal and black probe to negative. Always measure in <em>parallel</em> with the component.</p>

        <div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);border-radius:10px;padding:1rem;margin:1rem 0;">
          <strong style="color:#4ade80;">🔑 Key Fact</strong>
          <p style="margin-top:0.5rem;">Voltage is always measured between two points — it's a <em>difference</em>, not an absolute value. Ground (0V) is our reference.</p>
        </div>
      `,
      quiz: [
        { q: 'What is the SI unit of voltage?', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], answer: 1 },
        { q: 'Voltage is analogous to which property in a water system?', options: ['Water flow', 'Pipe diameter', 'Water pressure', 'Tank volume'], answer: 2 },
        { q: 'How should a voltmeter be connected in a circuit?', options: ['In series', 'In parallel', 'Either way', 'In the ground wire'], answer: 1 },
      ],
      related: ['current', 'resistance', 'power'],
    },
    'resistance': {
      title: 'Resistance & Ohm\'s Law',
      subject: 'Electrical Fundamentals',
      level: 'Beginner', duration: '10 min',
      objectives: [
        'Define electrical resistance and its unit',
        'State and apply Ohm\'s Law',
        'Calculate unknown quantities using V = IR',
      ],
      content: `
        <h3>What is Resistance?</h3>
        <p>Resistance is the opposition that a material offers to the flow of electric current. The higher the resistance, the less current flows for a given voltage.</p>

        <h3>Ohm's Law</h3>
        <p>The most fundamental law in electronics, stated by Georg Simon Ohm in 1827:</p>
        <div class="calc-formula" style="margin:1rem 0;font-size:1.3rem;">V = I × R</div>
        <p>Where: <strong>V</strong> = Voltage (V), <strong>I</strong> = Current (A), <strong>R</strong> = Resistance (Ω)</p>

        <h3>The Ohm's Law Triangle</h3>
        <div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:10px;padding:1.5rem;margin:1rem 0;text-align:center;">
          <div style="font-size:2rem;font-family:var(--font-mono);color:#60a5fa;">
            <div style="border-bottom:2px solid #60a5fa;display:inline-block;padding:0 2rem;margin-bottom:0.5rem;">V</div>
            <div>I &nbsp; × &nbsp; R</div>
          </div>
          <p style="margin-top:1rem;font-size:0.85rem;">Cover the unknown: the remaining two show the formula!</p>
        </div>

        <h3>Practical Example</h3>
        <p>If a 9V battery drives current through a 470Ω resistor:</p>
        <div class="code-block">I = V / R = 9V / 470Ω = 0.019A = 19mA</div>

        <h3>Factors Affecting Resistance</h3>
        <ul style="color:#94a3b8;line-height:2;">
          <li>📏 <strong>Length</strong> — Longer wire = more resistance</li>
          <li>📐 <strong>Cross-sectional area</strong> — Thicker wire = less resistance</li>
          <li>🧪 <strong>Material</strong> — Copper vs. nichrome vs. carbon</li>
          <li>🌡️ <strong>Temperature</strong> — Most metals increase resistance with temperature</li>
        </ul>
      `,
      quiz: [
        { q: 'What is the formula for Ohm\'s Law?', options: ['V = P × I', 'V = I × R', 'I = V × R', 'R = V + I'], answer: 1 },
        { q: 'A 12V battery powers a 1kΩ resistor. What is the current?', options: ['12mA', '1.2mA', '120mA', '0.12mA'], answer: 0 },
        { q: 'What happens to resistance when wire length doubles?', options: ['Halves', 'Stays same', 'Doubles', 'Quadruples'], answer: 2 },
      ],
      related: ['voltage', 'current', 'power'],
    },
  },

  // ── Circuits ──────────────────────────────────────────────
  circuits: [
    {
      id: 'voltage-divider', name: 'Voltage Divider', category: 'Basic Circuits',
      desc: 'Divides input voltage using two resistors in series.',
      formula: 'Vout = Vin × R2/(R1+R2)',
      difficulty: 'Beginner', components: ['2× Resistors'],
      svg: `<svg width="200" height="120" viewBox="0 0 200 120">
        <line x1="30" y1="10" x2="170" y2="10" stroke="#3b82f6" stroke-width="2"/>
        <line x1="30" y1="10" x2="30" y2="40" stroke="#3b82f6" stroke-width="2"/>
        <rect x="20" y="40" width="20" height="40" stroke="#3b82f6" stroke-width="2" fill="rgba(59,130,246,0.1)" rx="2"/>
        <text x="30" y="63" fill="#94a3b8" font-size="10" text-anchor="middle">R1</text>
        <line x1="30" y1="80" x2="30" y2="110" stroke="#3b82f6" stroke-width="2"/>
        <rect x="20" y="110" width="20" height="40" stroke="#3b82f6" stroke-width="2" fill="rgba(59,130,246,0.1)" rx="2"/>
        <text x="30" y="133" fill="#94a3b8" font-size="10" text-anchor="middle">R2</text>
        <line x1="30" y1="150" x2="30" y2="160" stroke="#3b82f6" stroke-width="2"/>
        <line x1="10" y1="160" x2="50" y2="160" stroke="#3b82f6" stroke-width="2"/>
        <line x1="30" y1="100" x2="80" y2="100" stroke="#22c55e" stroke-width="2"/>
        <text x="90" y="104" fill="#22c55e" font-size="11">Vout</text>
        <text x="150" y="30" fill="#f59e0b" font-size="12">Vin</text>
      </svg>`
    },
    {
      id: 'led-resistor', name: 'LED with Resistor', category: 'Basic Circuits',
      desc: 'Basic LED circuit with current-limiting resistor.',
      formula: 'R = (Vs - Vf) / If',
      difficulty: 'Beginner', components: ['LED', 'Resistor', 'Battery'],
      svg: `<svg width="200" height="100" viewBox="0 0 200 100">
        <line x1="10" y1="20" x2="10" y2="80" stroke="#3b82f6" stroke-width="2"/>
        <line x1="10" y1="20" x2="60" y2="20" stroke="#3b82f6" stroke-width="2"/>
        <rect x="60" y="12" width="30" height="16" stroke="#3b82f6" stroke-width="2" fill="rgba(59,130,246,0.1)" rx="2"/>
        <text x="75" y="23" fill="#94a3b8" font-size="9" text-anchor="middle">R</text>
        <line x1="90" y1="20" x2="110" y2="20" stroke="#3b82f6" stroke-width="2"/>
        <polygon points="110,12 110,28 130,20" stroke="#22c55e" stroke-width="2" fill="rgba(34,197,94,0.15)"/>
        <line x1="130" y1="12" x2="130" y2="28" stroke="#22c55e" stroke-width="2"/>
        <line x1="130" y1="20" x2="190" y2="20" stroke="#3b82f6" stroke-width="2"/>
        <line x1="190" y1="20" x2="190" y2="80" stroke="#3b82f6" stroke-width="2"/>
        <line x1="10" y1="80" x2="190" y2="80" stroke="#3b82f6" stroke-width="2"/>
        <line x1="96" y1="12" x2="104" y2="4" stroke="#22c55e" stroke-width="1.5"/>
        <line x1="103" y1="16" x2="111" y2="8" stroke="#22c55e" stroke-width="1.5"/>
      </svg>`
    },
    {
      id: 'half-wave-rectifier', name: 'Half-Wave Rectifier', category: 'Rectifiers',
      desc: 'Converts AC to pulsating DC using a single diode.',
      formula: 'Vdc = Vm / π',
      difficulty: 'Beginner', components: ['Diode', 'Transformer', 'Load resistor'],
      svg: null
    },
    {
      id: 'ce-amplifier', name: 'Common Emitter Amplifier', category: 'Amplifiers',
      desc: 'Basic BJT amplifier with voltage gain and 180° phase shift.',
      formula: 'Av = -Rc / re',
      difficulty: 'Intermediate', components: ['NPN Transistor', '4× Resistors', '3× Capacitors'],
      svg: null
    },
    {
      id: 'inverting-amp', name: 'Inverting Op-Amp', category: 'Amplifiers',
      desc: 'Op-amp configured for inverting voltage amplification.',
      formula: 'Av = -Rf / Rin',
      difficulty: 'Intermediate', components: ['Op-Amp (LM741)', '2× Resistors'],
      svg: null
    },
    {
      id: 'rc-oscillator', name: 'RC Phase-Shift Oscillator', category: 'Oscillators',
      desc: 'Generates a sine wave using RC networks and an amplifier.',
      formula: 'f = 1/(2π√6RC)',
      difficulty: 'Advanced', components: ['BJT', '3× RC networks', 'Resistors'],
      svg: null
    },
    {
      id: 'logic-gates', name: 'Basic Logic Gates', category: 'Digital Logic',
      desc: 'AND, OR, NOT gates with their truth tables.',
      formula: 'Y = A · B  (AND)',
      difficulty: 'Beginner', components: ['IC 7400/7408/7404'],
      svg: null
    },
    {
      id: '555-timer', name: '555 Timer – Astable Mode', category: 'Timers',
      desc: 'Self-triggering pulse generator using 555 timer IC.',
      formula: 'f = 1.44 / ((Ra + 2Rb) × C)',
      difficulty: 'Intermediate', components: ['IC 555', '2× Resistors', '2× Capacitors'],
      svg: null
    },
  ],

  // ── Experiments ───────────────────────────────────────────
  experiments: [
    {
      id: 'ohms-law', name: "Ohm's Law Verification", num: 'EXP-01',
      aim: "To verify Ohm's law and find the resistance of a conductor.",
      apparatus: ['Variable DC power supply', 'Digital multimeter (×2)', 'Resistor (100Ω)', 'Connecting wires', 'Breadboard'],
      procedure: [
        'Connect the power supply, ammeter (in series), and resistor on the breadboard.',
        'Connect the voltmeter in parallel across the resistor.',
        'Set the power supply to 1V. Record voltage (V) and current (I).',
        'Increase voltage in steps of 1V up to 10V. Record V and I at each step.',
        'Calculate R = V/I for each reading and find the average.',
        'Plot a V-I graph. The slope = Resistance.',
      ],
      observations: ['V(V)', 'I(mA)', 'R=V/I (Ω)'],
      conclusion: 'V is directly proportional to I. The slope of V-I graph = R (constant), verifying Ohm\'s Law.',
      vivaQA: [
        { q: 'State Ohm\'s Law.', a: 'At constant temperature, current through a conductor is proportional to voltage: V = IR.' },
        { q: 'Why is temperature kept constant?', a: 'Resistance changes with temperature; constant temp ensures the linear V-I relationship holds.' },
        { q: 'What is the SI unit of resistance?', a: 'Ohm (Ω), named after Georg Simon Ohm.' },
      ],
      level: 'Beginner', category: 'Basic Electrical', time: '45 min',
    },
    {
      id: 'diode-characteristics', name: 'PN Junction Diode Characteristics', num: 'EXP-02',
      aim: 'To draw the forward and reverse bias V-I characteristics of a PN junction diode.',
      apparatus: ['DC power supply (0-20V)', 'Digital multimeter (×2)', 'Silicon diode (1N4007)', 'Resistor (1kΩ)', 'Connecting wires'],
      procedure: [
        'For forward bias: Connect + terminal to anode, – terminal to cathode.',
        'Start from 0V, increase in 0.1V steps. Record voltage across diode and current.',
        'Note the knee voltage (≈0.7V for Si) where current rises sharply.',
        'For reverse bias: Reverse the diode connections.',
        'Increase reverse voltage in 2V steps up to 20V. Record reverse current (µA).',
        'Plot V-I graph with both characteristics.',
      ],
      observations: ['Vf (V)', 'If (mA)', 'Vr (V)', 'Ir (µA)'],
      conclusion: 'Silicon diode conducts above ≈0.7V forward bias. Reverse current is negligible until breakdown. Knee voltage ≈ 0.6–0.7V confirmed.',
      vivaQA: [
        { q: 'What is the knee voltage of a Silicon diode?', a: 'Approximately 0.6–0.7V.' },
        { q: 'What is depletion layer?', a: 'The region at the PN junction depleted of charge carriers, creating a potential barrier.' },
        { q: 'Why does reverse current not increase proportionally?', a: 'Only minority carriers (thermally generated) cross in reverse bias — very few at room temperature.' },
      ],
      level: 'Beginner', category: 'Semiconductor Devices', time: '60 min',
    },
    {
      id: 'ce-amp-exp', name: 'Common Emitter Amplifier', num: 'EXP-03',
      aim: 'To design and study the frequency response of a CE amplifier.',
      apparatus: ['Signal generator', 'Oscilloscope', 'Regulated DC supply', 'BC547 transistor', 'Resistors and capacitors'],
      procedure: [
        'Assemble the CE amplifier circuit with voltage divider biasing.',
        'Set Q-point: Vce ≈ Vcc/2 for maximum swing.',
        'Apply a 1kHz, 10mV sine wave at the input.',
        'Observe and record output on oscilloscope. Measure gain = Vout/Vin.',
        'Vary frequency from 10Hz to 1MHz. Record Vout at each frequency.',
        'Calculate voltage gain in dB: Av(dB) = 20 log(Vout/Vin)',
        'Plot the Bode plot (frequency response curve).',
      ],
      observations: ['Freq (Hz)', 'Vin (mV)', 'Vout (mV)', 'Av (dB)'],
      conclusion: 'CE amplifier shows maximum gain in mid-band. Gain reduces at low frequencies (coupling cap) and high frequencies (Miller effect).',
      vivaQA: [
        { q: 'What is the phase shift in CE amplifier?', a: '180° — the output is inverted relative to input.' },
        { q: 'What limits the high-frequency response?', a: 'Miller effect and transistor junction capacitances.' },
        { q: 'What is the voltage gain formula?', a: 'Av = -Rc / re, where re = 26mV/Ic.' },
      ],
      level: 'Intermediate', category: 'Analog Electronics', time: '90 min',
    },
    {
      id: 'logic-gates-exp', name: 'Logic Gates Verification', num: 'EXP-04',
      aim: 'To verify the truth tables of basic logic gates (AND, OR, NOT, NAND, NOR).',
      apparatus: ['IC 7408 (AND)', 'IC 7432 (OR)', 'IC 7404 (NOT)', 'IC 7400 (NAND)', '+5V power supply', 'LEDs with resistors'],
      procedure: [
        'Connect Vcc (+5V) to pin 14 and GND to pin 7 of each IC.',
        'For AND gate (IC 7408): Connect inputs to pin 1, 2 and output at pin 3.',
        'Apply all combinations of logic 0 (0V) and logic 1 (5V) at inputs.',
        'Observe output LED (ON = Logic 1, OFF = Logic 0).',
        'Record observations and compare with standard truth table.',
        'Repeat for OR, NOT, NAND, NOR, XOR gates.',
      ],
      observations: ['Gate', 'A', 'B', 'Y (observed)', 'Y (expected)'],
      conclusion: 'Truth tables for all gates verified. Practical values match theoretical Boolean expressions.',
      vivaQA: [
        { q: 'Which gate is called universal gate?', a: 'NAND and NOR — any Boolean function can be realized using only NAND or only NOR gates.' },
        { q: 'What is TTL logic levels?', a: 'Logic 0: 0–0.8V, Logic 1: 2–5V. Noise margin ≈ 0.4V.' },
        { q: 'What is De Morgan\'s theorem?', a: "NOT(A·B) = NOT(A)+NOT(B); NOT(A+B) = NOT(A)·NOT(B)." },
      ],
      level: 'Beginner', category: 'Digital Electronics', time: '60 min',
    },
  ],

  // ── Practice questions ────────────────────────────────────
  quizzes: {
    'fundamentals': [
      { q: "What is Ohm's Law?", options: ["V = P × R", "V = I × R", "V = I / R", "V = I + R"], answer: 1, explanation: "Ohm's Law states V = I × R, where V=voltage, I=current, R=resistance." },
      { q: "If V=12V and R=4Ω, what is the current?", options: ["3A", "0.33A", "48A", "16A"], answer: 0, explanation: "I = V/R = 12/4 = 3A" },
      { q: "What is the unit of electrical resistance?", options: ["Volt", "Ampere", "Ohm", "Farad"], answer: 2, explanation: "Resistance is measured in Ohms (Ω)." },
      { q: "In a parallel circuit, what is the same across all components?", options: ["Current", "Resistance", "Voltage", "Power"], answer: 2, explanation: "In a parallel circuit, all components share the same voltage." },
      { q: "What is the SI unit of electric charge?", options: ["Volt", "Coulomb", "Ampere", "Joule"], answer: 1, explanation: "Electric charge is measured in Coulombs (C)." },
      { q: "Power = ?", options: ["V + I", "V × I", "V / I", "V - I"], answer: 1, explanation: "Electrical power P = V × I (Watts). Also P = I²R = V²/R." },
      { q: "Which material is a good conductor of electricity?", options: ["Wood", "Rubber", "Copper", "Glass"], answer: 2, explanation: "Copper has very low resistivity (1.7 × 10⁻⁸ Ω·m) making it an excellent conductor." },
    ],
    'components': [
      { q: "Which component stores electrical energy in a magnetic field?", options: ["Resistor", "Capacitor", "Inductor", "Diode"], answer: 2, explanation: "An inductor stores energy in a magnetic field when current flows through it." },
      { q: "What does LED stand for?", options: ["Light Emitting Diode", "Low Energy Device", "Linear Electronic Detector", "Light Electrical Device"], answer: 0, explanation: "LED = Light Emitting Diode — it emits light when forward biased." },
      { q: "What is the forward voltage of a silicon diode?", options: ["0.2V", "0.3V", "0.7V", "1.5V"], answer: 2, explanation: "Silicon diodes have a forward voltage drop of approximately 0.6–0.7V." },
      { q: "In an NPN transistor, what controls the collector current?", options: ["Emitter voltage", "Base current", "Collector resistance", "Supply voltage"], answer: 1, explanation: "In an NPN BJT, the base current controls the larger collector current: Ic = β × Ib." },
      { q: "What is the purpose of a bypass capacitor on a power supply pin?", options: ["Increase voltage", "Filter high-frequency noise", "Store energy long-term", "Increase current"], answer: 1, explanation: "Bypass capacitors filter high-frequency noise and stabilize supply voltage at IC pins." },
    ],
    'digital': [
      { q: "What is the output of a NAND gate when both inputs are HIGH?", options: ["HIGH", "LOW", "Undefined", "Depends on power"], answer: 1, explanation: "NAND: output is LOW only when ALL inputs are HIGH." },
      { q: "Which Boolean expression represents an AND gate?", options: ["Y = A + B", "Y = A · B", "Y = A ⊕ B", "Y = Ā"], answer: 1, explanation: "AND gate: Y = A · B (output HIGH only when both A and B are HIGH)." },
      { q: "How many bits can a byte hold?", options: ["4", "8", "16", "32"], answer: 1, explanation: "1 byte = 8 bits. It can represent 256 (2⁸) different values." },
      { q: "What is the decimal equivalent of binary 1010?", options: ["8", "9", "10", "12"], answer: 2, explanation: "1010 = 1×8 + 0×4 + 1×2 + 0×1 = 8+2 = 10" },
    ],
  },

  // ── Projects ──────────────────────────────────────────────
  projects: [
    {
      id: 'led-blink', name: 'LED Blink with Arduino', level: 'Beginner',
      desc: 'Your first Arduino project — make an LED blink at 1Hz.',
      time: '30 min', category: 'Embedded',
      components: ['Arduino Uno', 'LED (any colour)', '220Ω Resistor', 'USB cable'],
      workingPrinciple: 'Arduino Pin 13 alternates between 5V (HIGH) and 0V (LOW) every 500ms. Current flows from Pin 13 through the 220Ω resistor (limiting current to ~13mA so the LED does not burn out), lights up the LED, and returns to GND.',
      componentRoles: [
        { name: 'Arduino Uno', role: 'Brain of the circuit; outputs 5V digital HIGH/LOW pulses on Pin 13.' },
        { name: '220Ω Resistor', role: 'Limits current to ~13.6mA ((5V − 2V) / 220Ω) to protect the LED and Arduino pin.' },
        { name: 'LED', role: 'Converts electrical current into visible light when forward-biased (Anode → Cathode).' },
        { name: 'USB Cable', role: 'Uploads the compiled C++ sketch and supplies 5V power.' },
      ],
      diagram: `<svg viewBox="0 0 460 150" width="100%" style="max-height:170px;">
        <rect x="20" y="25" width="120" height="100" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="80" y="65" fill="#22c55e" font-size="12" font-weight="700" text-anchor="middle">Arduino Uno</text>
        <text x="132" y="55" fill="#94a3b8" font-size="10" text-anchor="end">D13</text>
        <text x="132" y="105" fill="#94a3b8" font-size="10" text-anchor="end">GND</text>
        <line x1="140" y1="51" x2="205" y2="51" stroke="#3b82f6" stroke-width="2.5"/>
        <rect x="205" y="41" width="60" height="20" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
        <text x="235" y="55" fill="#93c5fd" font-size="10" text-anchor="middle">220Ω</text>
        <line x1="265" y1="51" x2="325" y2="51" stroke="#3b82f6" stroke-width="2.5"/>
        <polygon points="325,39 325,63 350,51" fill="rgba(34,197,94,0.25)" stroke="#22c55e" stroke-width="2"/>
        <line x1="350" y1="39" x2="350" y2="63" stroke="#22c55e" stroke-width="2.5"/>
        <text x="338" y="30" fill="#4ade80" font-size="10" text-anchor="middle">LED (+ → −)</text>
        <polyline points="350,51 395,51 395,101 140,101" fill="none" stroke="#64748b" stroke-width="2.5"/>
        <text x="270" y="116" fill="#94a3b8" font-size="10" text-anchor="middle">Return path to GND (0V)</text>
      </svg>`,
      code: `void setup() {\n  pinMode(13, OUTPUT); // Set pin 13 as output\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH); // LED ON\n  delay(500);              // Wait 500ms\n  digitalWrite(13, LOW);  // LED OFF\n  delay(500);              // Wait 500ms\n}`,
    },
    {
      id: 'traffic-light', name: 'Traffic Light Controller', level: 'Beginner',
      desc: 'Simulate a traffic light using Arduino and 3 LEDs.',
      time: '45 min', category: 'Embedded',
      components: ['Arduino Uno', 'Red LED', 'Yellow LED', 'Green LED', '3× 220Ω Resistors'],
      workingPrinciple: 'Three separate digital pins (D2, D3, D4) drive three LEDs in a timed sequence: Green (5s) → Yellow (2s) → Red (5s). Each LED has its own 220Ω resistor and shares a common GND rail.',
      componentRoles: [
        { name: 'Arduino Uno', role: 'Runs the state timing loop and switches pins D2, D3, D4 sequentially.' },
        { name: 'Red / Yellow / Green LEDs', role: 'Visual traffic signal indicators connected to pins D2, D3, D4.' },
        { name: '3× 220Ω Resistors', role: 'Each LED gets its own current-limiting resistor so brightness stays even and safe.' },
      ],
      diagram: `<svg viewBox="0 0 460 165" width="100%" style="max-height:175px;">
        <rect x="20" y="20" width="115" height="125" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="77" y="80" fill="#22c55e" font-size="12" font-weight="700" text-anchor="middle">Arduino Uno</text>
        <text x="128" y="42" fill="#94a3b8" font-size="10" text-anchor="end">D2</text>
        <text x="128" y="74" fill="#94a3b8" font-size="10" text-anchor="end">D3</text>
        <text x="128" y="106" fill="#94a3b8" font-size="10" text-anchor="end">D4</text>
        <text x="128" y="135" fill="#94a3b8" font-size="10" text-anchor="end">GND</text>
        <line x1="135" y1="38" x2="195" y2="38" stroke="#ef4444" stroke-width="2"/>
        <rect x="195" y="30" width="52" height="16" rx="2" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="221" y="42" fill="#93c5fd" font-size="9" text-anchor="middle">220Ω</text>
        <line x1="247" y1="38" x2="295" y2="38" stroke="#ef4444" stroke-width="2"/>
        <circle cx="310" cy="38" r="10" fill="rgba(239,68,68,0.25)" stroke="#ef4444" stroke-width="2"/>
        <text x="330" y="42" fill="#f87171" font-size="10">Red</text>
        <line x1="135" y1="70" x2="195" y2="70" stroke="#f59e0b" stroke-width="2"/>
        <rect x="195" y="62" width="52" height="16" rx="2" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="221" y="74" fill="#93c5fd" font-size="9" text-anchor="middle">220Ω</text>
        <line x1="247" y1="70" x2="295" y2="70" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="310" cy="70" r="10" fill="rgba(245,158,11,0.25)" stroke="#f59e0b" stroke-width="2"/>
        <text x="330" y="74" fill="#fbbf24" font-size="10">Yellow</text>
        <line x1="135" y1="102" x2="195" y2="102" stroke="#22c55e" stroke-width="2"/>
        <rect x="195" y="94" width="52" height="16" rx="2" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="221" y="106" fill="#93c5fd" font-size="9" text-anchor="middle">220Ω</text>
        <line x1="247" y1="102" x2="295" y2="102" stroke="#22c55e" stroke-width="2"/>
        <circle cx="310" cy="102" r="10" fill="rgba(34,197,94,0.25)" stroke="#22c55e" stroke-width="2"/>
        <text x="330" y="106" fill="#4ade80" font-size="10">Green</text>
        <polyline points="320,38 395,38 395,131 135,131" fill="none" stroke="#64748b" stroke-width="2"/>
        <line x1="320" y1="70" x2="395" y2="70" stroke="#64748b" stroke-width="2"/>
        <line x1="320" y1="102" x2="395" y2="102" stroke="#64748b" stroke-width="2"/>
        <text x="405" y="90" fill="#94a3b8" font-size="10">Common GND</text>
      </svg>`,
      code: `// Traffic Light Controller — Pins D2 (Red), D3 (Yellow), D4 (Green)
const int RED_PIN = 2, YELLOW_PIN = 3, GREEN_PIN = 4;

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(YELLOW_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
}

void loop() {
  digitalWrite(GREEN_PIN, HIGH);  delay(5000); digitalWrite(GREEN_PIN, LOW);
  digitalWrite(YELLOW_PIN, HIGH); delay(2000); digitalWrite(YELLOW_PIN, LOW);
  digitalWrite(RED_PIN, HIGH);    delay(5000); digitalWrite(RED_PIN, LOW);
}`,
    },
    {
      id: 'temp-sensor', name: 'Digital Thermometer', level: 'Intermediate',
      desc: 'Read temperature using LM35 sensor and display on LCD.',
      time: '2 hrs', category: 'Sensors',
      components: ['Arduino Uno', 'LM35 Sensor', '16×2 LCD', '10kΩ Potentiometer', '220Ω Resistor'],
      workingPrinciple: 'The LM35 outputs an analog voltage proportional to Celsius temperature (10mV per °C). Arduino reads this on Analog pin A0, converts the 10-bit ADC value (0–1023) to °C, and prints it to the 16×2 LCD.',
      componentRoles: [
        { name: 'LM35 Sensor', role: 'Outputs linear 10mV/°C analog voltage (e.g. 250mV = 25°C) to pin A0.' },
        { name: 'Arduino Uno', role: 'Reads A0 via its 10-bit ADC, calculates °C, and drives the LCD data pins.' },
        { name: '16×2 LCD', role: 'Displays live temperature text over 4-bit parallel data pins (D4–D7, RS, E).' },
        { name: '10kΩ Potentiometer', role: 'Adjusts voltage on LCD pin V0 to set screen contrast so characters are crisp.' },
        { name: '220Ω Resistor', role: 'Limits current to the LCD backlight LED (pins A and K).' },
      ],
      diagram: `<svg viewBox="0 0 460 165" width="100%" style="max-height:175px;">
        <rect x="20" y="30" width="95" height="90" rx="6" fill="#111827" stroke="#06b6d4" stroke-width="2"/>
        <text x="67" y="65" fill="#22d3ee" font-size="11" font-weight="700" text-anchor="middle">LM35</text>
        <text x="67" y="82" fill="#94a3b8" font-size="9" text-anchor="middle">10mV / °C</text>
        <rect x="175" y="20" width="110" height="125" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="230" y="75" fill="#22c55e" font-size="12" font-weight="700" text-anchor="middle">Arduino Uno</text>
        <text x="183" y="55" fill="#94a3b8" font-size="9">5V</text>
        <text x="183" y="78" fill="#94a3b8" font-size="9">A0</text>
        <text x="183" y="102" fill="#94a3b8" font-size="9">GND</text>
        <text x="277" y="55" fill="#94a3b8" font-size="9" text-anchor="end">D2–D7</text>
        <text x="277" y="102" fill="#94a3b8" font-size="9" text-anchor="end">5V/GND</text>
        <line x1="115" y1="51" x2="175" y2="51" stroke="#ef4444" stroke-width="2"/>
        <line x1="115" y1="74" x2="175" y2="74" stroke="#f59e0b" stroke-width="2"/>
        <line x1="115" y1="98" x2="175" y2="98" stroke="#64748b" stroke-width="2"/>
        <rect x="340" y="25" width="105" height="95" rx="6" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
        <text x="392" y="60" fill="#60a5fa" font-size="11" font-weight="700" text-anchor="middle">16×2 LCD</text>
        <text x="392" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">RS, E, D4–D7</text>
        <line x1="285" y1="51" x2="340" y2="51" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="285" y1="98" x2="340" y2="98" stroke="#64748b" stroke-width="2"/>
        <rect x="352" y="130" width="80" height="24" rx="4" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="392" y="146" fill="#c084fc" font-size="9" text-anchor="middle">10kΩ Pot → V0</text>
      </svg>`,
      code: `#include <LiquidCrystal.h>
// LCD pins: RS=12, E=11, D4=5, D5=4, D6=3, D7=2
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);
  lcd.print("Lab Mate Temp:");
}

void loop() {
  int raw = analogRead(A0);                // LM35 Vout on A0
  float voltage = raw * (5.0 / 1023.0);    // Convert ADC to Volts
  float tempC = voltage * 100.0;           // 10mV per °C
  lcd.setCursor(0, 1);
  lcd.print("Temp: "); lcd.print(tempC, 1); lcd.print(" C   ");
  delay(500);
}`,
    },
    {
      id: 'auto-light', name: 'Automatic Street Light', level: 'Intermediate',
      desc: 'LDR-based automatic light that turns ON at night.',
      time: '1.5 hrs', category: 'Automation',
      components: ['LDR', 'BC547 Transistor', '10kΩ Potentiometer', 'Relay 5V', 'LED/Bulb'],
      workingPrinciple: 'The LDR and 10kΩ potentiometer form a voltage divider. In daylight, LDR resistance is low so base voltage stays below 0.7V (transistor OFF). At night, LDR resistance rises to MΩ, pushing base voltage above 0.7V, turning ON the BC547 transistor which energizes the 5V relay to switch ON the light.',
      componentRoles: [
        { name: 'LDR (Photoresistor)', role: 'Senses ambient light — high resistance in dark, low resistance in bright light.' },
        { name: '10kΩ Potentiometer', role: 'Sets the darkness threshold at which the street light triggers ON.' },
        { name: 'BC547 Transistor', role: 'Acts as an electronic switch; amplifies tiny LDR divider current to drive the relay.' },
        { name: '5V Relay Module', role: 'Isolates and switches the high-power street lamp / LED load safely.' },
        { name: 'LED / Bulb', role: 'The output light load controlled by the relay contacts.' },
      ],
      diagram: `<svg viewBox="0 0 460 165" width="100%" style="max-height:175px;">
        <line x1="30" y1="25" x2="430" y2="25" stroke="#ef4444" stroke-width="2"/>
        <text x="40" y="18" fill="#f87171" font-size="10">+5V DC Rail</text>
        <line x1="30" y1="145" x2="430" y2="145" stroke="#64748b" stroke-width="2"/>
        <text x="40" y="158" fill="#94a3b8" font-size="10">GND (0V)</text>
        <line x1="90" y1="25" x2="90" y2="50" stroke="#ef4444" stroke-width="2"/>
        <rect x="65" y="50" width="50" height="26" rx="4" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="90" y="67" fill="#c084fc" font-size="10" text-anchor="middle">10kΩ Pot</text>
        <line x1="90" y1="76" x2="90" y2="100" stroke="#f59e0b" stroke-width="2"/>
        <rect x="65" y="100" width="50" height="26" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="117" fill="#fbbf24" font-size="10" text-anchor="middle">LDR</text>
        <line x1="90" y1="126" x2="90" y2="145" stroke="#64748b" stroke-width="2"/>
        <line x1="90" y1="88" x2="185" y2="88" stroke="#3b82f6" stroke-width="2"/>
        <circle cx="210" cy="88" r="24" fill="#111827" stroke="#a855f7" stroke-width="2"/>
        <text x="210" y="85" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">BC547</text>
        <text x="210" y="98" fill="#94a3b8" font-size="9" text-anchor="middle">NPN</text>
        <line x1="210" y1="112" x2="210" y2="145" stroke="#64748b" stroke-width="2"/>
        <polyline points="210,64 210,45 300,45" fill="none" stroke="#3b82f6" stroke-width="2"/>
        <rect x="300" y="35" width="90" height="55" rx="6" fill="#111827" stroke="#ef4444" stroke-width="2"/>
        <text x="345" y="58" fill="#f87171" font-size="11" font-weight="700" text-anchor="middle">5V Relay</text>
        <text x="345" y="74" fill="#94a3b8" font-size="9" text-anchor="middle">→ Lamp / LED</text>
        <line x1="345" y1="25" x2="345" y2="35" stroke="#ef4444" stroke-width="2"/>
      </svg>`,
      code: `// Pure Analog Hardware Circuit — No Microcontroller Needed!
//
// +9V/+5V ──► [10kΩ Pot] ──┬──► [BC547 Base (B)]
//                          └──► [LDR] ──► GND
//
// BC547 Emitter (E) ──► GND
// BC547 Collector (C) ──► [5V Relay IN] (Active-LOW)
// Relay COM (+5V) ──► Relay NO ──► [220Ω] ──► Street Lamp LED (+) ──► GND`,
    },
    {
      id: 'iot-monitor', name: 'IoT Sensor Dashboard', level: 'Advanced',
      desc: 'ESP32-based sensor data uploaded to ThingSpeak cloud.',
      time: '4 hrs', category: 'IoT',
      components: ['ESP32 DevKit', 'DHT22 Sensor', '10kΩ Pull-up Resistor', 'WiFi connection', 'ThingSpeak account'],
      workingPrinciple: 'The ESP32 reads digital temperature and humidity packets from the DHT22 on GPIO4 every 15 seconds, connects to local Wi-Fi, and sends an HTTP POST/GET request with the readings to ThingSpeak cloud charts.',
      componentRoles: [
        { name: 'ESP32 DevKit', role: 'Reads sensor data and uses its built-in Wi-Fi radio to send HTTPS requests.' },
        { name: 'DHT22 Sensor', role: 'Measures temperature & humidity digitally and sends data over 1-wire GPIO4.' },
        { name: '10kΩ Pull-up Resistor', role: 'Keeps the DHT22 DATA line idle HIGH for clean digital communication.' },
        { name: 'ThingSpeak Cloud', role: 'Receives API updates and plots live graphs accessible from anywhere.' },
      ],
      diagram: `<svg viewBox="0 0 460 155" width="100%" style="max-height:170px;">
        <rect x="20" y="30" width="95" height="90" rx="6" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="67" y="68" fill="#4ade80" font-size="11" font-weight="700" text-anchor="middle">DHT22</text>
        <text x="67" y="85" fill="#94a3b8" font-size="9" text-anchor="middle">Temp &amp; RH</text>
        <rect x="175" y="25" width="115" height="105" rx="8" fill="#111827" stroke="#06b6d4" stroke-width="2"/>
        <text x="232" y="72" fill="#22d3ee" font-size="12" font-weight="700" text-anchor="middle">ESP32 DevKit</text>
        <text x="232" y="90" fill="#94a3b8" font-size="9" text-anchor="middle">Wi-Fi Built-in</text>
        <line x1="115" y1="50" x2="175" y2="50" stroke="#ef4444" stroke-width="2"/>
        <text x="145" y="45" fill="#f87171" font-size="9" text-anchor="middle">3.3V</text>
        <line x1="115" y1="75" x2="175" y2="75" stroke="#3b82f6" stroke-width="2"/>
        <text x="145" y="70" fill="#60a5fa" font-size="9" text-anchor="middle">GPIO4</text>
        <line x1="115" y1="100" x2="175" y2="100" stroke="#64748b" stroke-width="2"/>
        <text x="145" y="113" fill="#94a3b8" font-size="9" text-anchor="middle">GND</text>
        <line x1="290" y1="75" x2="345" y2="75" stroke="#a855f7" stroke-width="2" stroke-dasharray="4,3"/>
        <rect x="345" y="40" width="95" height="70" rx="12" fill="#111827" stroke="#a855f7" stroke-width="2"/>
        <text x="392" y="72" fill="#c084fc" font-size="11" font-weight="700" text-anchor="middle">ThingSpeak</text>
        <text x="392" y="88" fill="#94a3b8" font-size="9" text-anchor="middle">Cloud API</text>
      </svg>`,
      code: `#include <WiFi.h>
#include <DHT.h>

#define DHTPIN 4       // DHT22 DATA connected to GPIO4 (+10kΩ pull-up to 3.3V)
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "YOUR_WIFI_SSID";
const char* pass = "YOUR_WIFI_PASS";
String apiKey = "THINGSPEAK_WRITE_KEY";

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) delay(500);
}

void loop() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  WiFiClient client;
  if (!isnan(t) && client.connect("api.thingspeak.com", 80)) {
    String url = "/update?api_key=" + apiKey + "&field1=" + String(t) + "&field2=" + String(h);
    client.print(String("GET ") + url + " HTTP/1.1\r\nHost: api.thingspeak.com\r\nConnection: close\r\n\r\n");
  }
  delay(15000); // ThingSpeak 15s rate limit
}`,
    },
    {
      id: 'line-follower-basic', name: 'Line Following Robot (Basic 2-Sensor)', level: 'Beginner',
      desc: 'Build a classic 2-sensor robot that tracks a black tape line using simple left/right IR logic.',
      time: '3 hrs', category: 'Robotics',
      components: ['Arduino Uno', '2× IR Sensor Modules', 'L298N Motor Driver', '2× BO Geared DC Motors & Wheels', '2WD Chassis', '18650 Battery Pack (2S)', 'Jumper Wires'],
      workingPrinciple: 'White surfaces reflect IR light (sensor outputs LOW); black tape absorbs IR light (sensor outputs HIGH). The 2 IR sensors straddle the black line: if both see white, both motors drive forward; if the left sensor hits black, the robot turns left; if the right hits black, it turns right.',
      componentRoles: [
        { name: '2× IR Sensor Modules', role: 'Left (D2) and Right (D3) sensors detect black tape vs white floor.' },
        { name: 'Arduino Uno', role: 'Reads D2 & D3 and sends direction signals to the L298N motor driver (D8–D11).' },
        { name: 'L298N Motor Driver', role: 'Dual H-Bridge that boosts Arduino logic signals into high-current 7.4V motor power.' },
        { name: '2× BO Geared Motors', role: 'Left and right wheels that steer by differential drive (stopping/reversing one side).' },
        { name: '18650 Battery Pack (2S)', role: 'Provides 7.4V high-current power to the L298N and 5V (via regulator) to Arduino.' },
      ],
      diagram: `<svg viewBox="0 0 480 180" width="100%" style="max-height:190px;">
        <rect x="15" y="20" width="95" height="55" rx="6" fill="#111827" stroke="#f59e0b" stroke-width="2"/>
        <text x="62" y="45" fill="#fbbf24" font-size="10" font-weight="700" text-anchor="middle">IR Left (D2)</text>
        <text x="62" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Black = HIGH</text>
        <rect x="15" y="95" width="95" height="55" rx="6" fill="#111827" stroke="#f59e0b" stroke-width="2"/>
        <text x="62" y="120" fill="#fbbf24" font-size="10" font-weight="700" text-anchor="middle">IR Right (D3)</text>
        <text x="62" y="135" fill="#94a3b8" font-size="9" text-anchor="middle">White = LOW</text>
        <rect x="165" y="30" width="110" height="110" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="220" y="80" fill="#22c55e" font-size="11" font-weight="700" text-anchor="middle">Arduino Uno</text>
        <text x="220" y="96" fill="#94a3b8" font-size="9" text-anchor="middle">D8–D11 → L298N</text>
        <line x1="110" y1="48" x2="165" y2="58" stroke="#3b82f6" stroke-width="2"/>
        <line x1="110" y1="122" x2="165" y2="112" stroke="#3b82f6" stroke-width="2"/>
        <rect x="325" y="30" width="135" height="110" rx="8" fill="#111827" stroke="#ef4444" stroke-width="2"/>
        <text x="392" y="62" fill="#f87171" font-size="11" font-weight="700" text-anchor="middle">L298N Driver</text>
        <text x="392" y="82" fill="#94a3b8" font-size="9" text-anchor="middle">OUT1/2 → Left Motor</text>
        <text x="392" y="98" fill="#94a3b8" font-size="9" text-anchor="middle">OUT3/4 → Right Motor</text>
        <text x="392" y="122" fill="#4ade80" font-size="9" text-anchor="middle">7.4V 18650 Pack</text>
        <line x1="275" y1="70" x2="325" y2="70" stroke="#22c55e" stroke-width="2.5"/>
        <line x1="275" y1="100" x2="325" y2="100" stroke="#22c55e" stroke-width="2.5"/>
      </svg>`,
      code: `// Basic 2-Sensor Line Follower
const int IR_L = 2, IR_R = 3;
const int IN1 = 8, IN2 = 9, IN3 = 10, IN4 = 11;

void setup() {
  pinMode(IR_L, INPUT); pinMode(IR_R, INPUT);
  for (int p = 8; p <= 11; p++) pinMode(p, OUTPUT);
}

void loop() {
  int L = digitalRead(IR_L); // HIGH = black line
  int R = digitalRead(IR_R);
  if (L == LOW && R == LOW)       forward();
  else if (L == HIGH && R == LOW) turnLeft();
  else if (L == LOW && R == HIGH) turnRight();
  else                            stopMotors();
}

void forward()    { digitalWrite(IN1,1); digitalWrite(IN2,0); digitalWrite(IN3,1); digitalWrite(IN4,0); }
void turnLeft()   { digitalWrite(IN1,0); digitalWrite(IN2,0); digitalWrite(IN3,1); digitalWrite(IN4,0); }
void turnRight()  { digitalWrite(IN1,1); digitalWrite(IN2,0); digitalWrite(IN3,0); digitalWrite(IN4,0); }
void stopMotors() { digitalWrite(IN1,0); digitalWrite(IN2,0); digitalWrite(IN3,0); digitalWrite(IN4,0); }`,
    },
    {
      id: 'line-follower-pid', name: 'PID Line Following Robot (5–10 Sensors)', level: 'Advanced',
      desc: 'High-speed competition robot using a 5 to 10 channel IR sensor array and PID feedback control.',
      time: '8 hrs', category: 'Robotics',
      components: ['Arduino Nano', 'IR Sensor Array (5–8 Channel)', 'L298N Motor Driver', '2× BO Geared DC Motors', '18650 Li-Ion Battery Pack', 'Jumper Wires'],
      workingPrinciple: 'Instead of jerky ON/OFF turns, a 5–10 sensor array calculates a weighted line position error (e.g. −4 far left to +4 far right). A PID loop computes Proportional (instant steering), Integral (steady drift fix), and Derivative (damping oscillation) corrections to vary left/right PWM speeds smoothly.',
      componentRoles: [
        { name: 'IR Sensor Array (5–10 ch)', role: 'Measures exact line offset across 5–10 closely spaced optical sensors.' },
        { name: 'Arduino Nano', role: 'Samples the array, runs the PID math every few milliseconds, and outputs PWM on ENA/ENB.' },
        { name: 'L298N Motor Driver', role: 'Uses PWM on ENA (Pin 5) and ENB (Pin 6) to smoothly vary left and right wheel speeds.' },
        { name: '2× High-RPM Motors', role: 'Respond proportionally to PWM speed differences for fast, smooth cornering.' },
        { name: '18650 Li-Ion Pack (2S)', role: 'Supplies steady 7.4V–8.4V high-discharge current so motors never brown out.' },
      ],
      diagram: `<svg viewBox="0 0 480 180" width="100%" style="max-height:190px;">
        <rect x="15" y="30" width="110" height="115" rx="6" fill="#111827" stroke="#06b6d4" stroke-width="2"/>
        <text x="70" y="55" fill="#22d3ee" font-size="10" font-weight="700" text-anchor="middle">5–10 Ch IR Array</text>
        <g fill="#f59e0b">
          <circle cx="30" cy="80" r="4"/><circle cx="46" cy="80" r="4"/><circle cx="62" cy="80" r="4"/>
          <circle cx="78" cy="80" r="4"/><circle cx="94" cy="80" r="4"/><circle cx="110" cy="80" r="4"/>
        </g>
        <text x="70" y="108" fill="#94a3b8" font-size="9" text-anchor="middle">Weighted Error</text>
        <text x="70" y="124" fill="#94a3b8" font-size="9" text-anchor="middle">(−4 … 0 … +4)</text>
        <rect x="175" y="35" width="115" height="105" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="232" y="72" fill="#22c55e" font-size="11" font-weight="700" text-anchor="middle">Arduino Nano</text>
        <text x="232" y="90" fill="#60a5fa" font-size="9" text-anchor="middle">PID Control Loop</text>
        <text x="232" y="106" fill="#94a3b8" font-size="9" text-anchor="middle">PWM ENA/ENB (D5,D6)</text>
        <line x1="125" y1="88" x2="175" y2="88" stroke="#06b6d4" stroke-width="2.5"/>
        <rect x="335" y="35" width="125" height="105" rx="8" fill="#111827" stroke="#ef4444" stroke-width="2"/>
        <text x="397" y="68" fill="#f87171" font-size="11" font-weight="700" text-anchor="middle">Motor Driver</text>
        <text x="397" y="88" fill="#94a3b8" font-size="9" text-anchor="middle">Left Speed = Base + PID</text>
        <text x="397" y="104" fill="#94a3b8" font-size="9" text-anchor="middle">Right Speed = Base − PID</text>
        <line x1="290" y1="88" x2="335" y2="88" stroke="#22c55e" stroke-width="2.5"/>
      </svg>`,
      code: `// 5-Sensor PID Line Follower (Arduino Nano + L298N)
const int ENA = 5, ENB = 6, IN1 = 7, IN2 = 8, IN3 = 9, IN4 = 10;
const int S_PINS[5] = {A0, A1, A2, A3, A4};
const int WEIGHTS[5] = {-2, -1, 0, 1, 2};
float Kp = 35, Ki = 0, Kd = 18;
int baseSpeed = 150, lastError = 0, integral = 0;

void setup() {
  for (int i = 0; i < 5; i++) pinMode(S_PINS[i], INPUT);
  for (int p = 5; p <= 10; p++) pinMode(p, OUTPUT);
}

int readLineError() {
  int sum = 0, count = 0;
  for (int i = 0; i < 5; i++) {
    int val = digitalRead(S_PINS[i]); // HIGH = black line
    if (val == HIGH) { sum += WEIGHTS[i]; count++; }
  }
  return count > 0 ? sum / count : lastError;
}

void setMotorSpeeds(int leftSpd, int rightSpd) {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENA, leftSpd);
  analogWrite(ENB, rightSpd);
}

void loop() {
  int error = readLineError();
  integral += error;
  int derivative = error - lastError;
  int correction = (Kp * error) + (Ki * integral) + (Kd * derivative);
  lastError = error;
  setMotorSpeeds(constrain(baseSpeed + correction, 0, 255),
                 constrain(baseSpeed - correction, 0, 255));
}`,
    },
    {
      id: 'sound-reactive-led', name: 'Sound-Reactive Music LED Visualizer', level: 'Intermediate',
      desc: 'Make a WS2812B NeoPixel strip pulse, bounce, and change colours in sync with music beats.',
      time: '2 hrs', category: 'Audio & LED',
      components: ['Arduino Nano', 'Sound Sensor (MAX4466 / KY-038)', 'WS2812B NeoPixel Strip', '330Ω Resistor', '1000µF Capacitor', 'Breadboard & Jumper Wires'],
      workingPrinciple: 'The microphone samples sound pressure waves into an analog voltage on pin A0. Arduino measures the peak-to-peak amplitude over a 30ms window and maps that volume to the number of lit WS2812B LEDs on Pin D6.',
      componentRoles: [
        { name: 'Sound Sensor (MAX4466)', role: 'Captures audio waves and outputs amplified analog voltage to A0.' },
        { name: 'Arduino Nano', role: 'Computes peak-to-peak volume and sends 800kHz NeoPixel data on D6.' },
        { name: 'WS2812B LED Strip', role: 'Addressable RGB LEDs that light up as a real-time VU meter.' },
        { name: '330Ω Data Resistor', role: 'Protects the first WS2812B data input pin from voltage ringing/spikes.' },
        { name: '1000µF Capacitor', role: 'Placed across 5V and GND to absorb sudden current surges when LEDs flash.' },
      ],
      diagram: `<svg viewBox="0 0 470 165" width="100%" style="max-height:175px;">
        <rect x="15" y="40" width="95" height="80" rx="6" fill="#111827" stroke="#a855f7" stroke-width="2"/>
        <text x="62" y="72" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">Sound Mic</text>
        <text x="62" y="88" fill="#94a3b8" font-size="9" text-anchor="middle">OUT → A0</text>
        <rect x="165" y="30" width="110" height="100" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="220" y="75" fill="#22c55e" font-size="11" font-weight="700" text-anchor="middle">Arduino Nano</text>
        <text x="220" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">D6 → Data</text>
        <line x1="110" y1="80" x2="165" y2="80" stroke="#f59e0b" stroke-width="2"/>
        <line x1="275" y1="70" x2="310" y2="70" stroke="#3b82f6" stroke-width="2"/>
        <rect x="310" y="61" width="42" height="18" rx="2" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="331" y="74" fill="#93c5fd" font-size="9" text-anchor="middle">330Ω</text>
        <line x1="352" y1="70" x2="375" y2="70" stroke="#3b82f6" stroke-width="2"/>
        <rect x="375" y="35" width="80" height="90" rx="6" fill="#111827" stroke="#ec4899" stroke-width="2"/>
        <text x="415" y="65" fill="#f472b6" font-size="10" font-weight="700" text-anchor="middle">WS2812B</text>
        <text x="415" y="82" fill="#94a3b8" font-size="9" text-anchor="middle">RGB Strip</text>
        <text x="415" y="102" fill="#fbbf24" font-size="8" text-anchor="middle">1000µF across 5V/GND</text>
      </svg>`,
      code: `#include <Adafruit_NeoPixel.h>
#define LED_PIN 6
#define NUM_LEDS 30
Adafruit_NeoPixel strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() { strip.begin(); strip.show(); }

void loop() {
  int peak = 0;
  unsigned long start = millis();
  int sMin = 1023, sMax = 0;
  while (millis() - start < 30) {
    int v = analogRead(A0);
    sMin = min(sMin, v); sMax = max(sMax, v);
  }
  int level = map(sMax - sMin, 20, 500, 0, NUM_LEDS);
  for (int i = 0; i < NUM_LEDS; i++) {
    strip.setPixelColor(i, i < level ? strip.Color(0, 150, 255) : 0);
  }
  strip.show();
}`,
    },
    {
      id: 'clap-switch', name: 'Sound-Reactive Clap Switch', level: 'Beginner',
      desc: 'Toggle a lamp or LED ON and OFF with a single clap using a microphone module and relay.',
      time: '45 min', category: 'Audio & LED',
      components: ['Arduino Uno', 'Sound Sensor (KY-038)', '5V Relay Module', 'LED + 220Ω Resistor', 'Jumper Wires'],
      workingPrinciple: 'When you clap, the KY-038 comparator triggers a HIGH pulse on Pin D2. Arduino flips a boolean state variable (ON ↔ OFF), switches the 5V Relay on Pin D7, and waits 350ms to ignore room echoes.',
      componentRoles: [
        { name: 'Sound Sensor (KY-038)', role: 'Detects sharp clap sound spikes and sends a digital HIGH pulse to D2.' },
        { name: 'Arduino Uno', role: 'Tracks toggle state (ON/OFF) and debounces echoes with a short delay.' },
        { name: '5V Relay Module', role: 'Acts as an electrically isolated switch for the output lamp or LED.' },
        { name: 'LED + 220Ω Resistor', role: 'Provides safe low-voltage visual feedback when testing the clap toggle.' },
      ],
      diagram: `<svg viewBox="0 0 460 155" width="100%" style="max-height:170px;">
        <rect x="20" y="35" width="95" height="80" rx="6" fill="#111827" stroke="#a855f7" stroke-width="2"/>
        <text x="67" y="70" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">KY-038 Mic</text>
        <text x="67" y="86" fill="#94a3b8" font-size="9" text-anchor="middle">D0 → Pin D2</text>
        <rect x="170" y="25" width="115" height="100" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="227" y="70" fill="#22c55e" font-size="11" font-weight="700" text-anchor="middle">Arduino Uno</text>
        <text x="227" y="88" fill="#94a3b8" font-size="9" text-anchor="middle">Toggle + Debounce</text>
        <line x1="115" y1="75" x2="170" y2="75" stroke="#a855f7" stroke-width="2"/>
        <rect x="335" y="35" width="105" height="80" rx="6" fill="#111827" stroke="#ef4444" stroke-width="2"/>
        <text x="387" y="70" fill="#f87171" font-size="10" font-weight="700" text-anchor="middle">5V Relay</text>
        <text x="387" y="86" fill="#94a3b8" font-size="9" text-anchor="middle">IN ← Pin D7</text>
        <line x1="285" y1="75" x2="335" y2="75" stroke="#22c55e" stroke-width="2"/>
      </svg>`,
      code: `const int MIC_PIN = 2, RELAY_PIN = 7;
bool state = false;

void setup() {
  pinMode(MIC_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(MIC_PIN) == HIGH) {
    state = !state;
    digitalWrite(RELAY_PIN, state ? LOW : HIGH); // Active-LOW relay
    delay(350); // Debounce echo
  }
}`,
    },
    {
      id: 'glowing-butterfly', name: 'Glowing Butterfly LED Art Badge', level: 'Beginner',
      desc: 'Craft a solderless or soldered glowing butterfly with translucent wings, coin cell, and colour-changing LEDs.',
      time: '40 min', category: 'Creative Art',
      components: ['CR2032 Coin Cell & Holder', '2× RGB / Slow-Fade LEDs', '2× 100Ω Resistors', 'Slide Switch', 'Copper Tape / Perfboard'],
      workingPrinciple: 'A pure hardware parallel circuit! Flipping the slide switch connects the 3V CR2032 battery to two parallel LED branches (left wing and right wing). Each LED has a 100Ω resistor and glows through translucent vellum wings.',
      componentRoles: [
        { name: 'CR2032 Coin Cell (3V)', role: 'Lightweight, safe 3V power source mounted on the butterfly body.' },
        { name: 'Slide Switch', role: 'Opens/closes the positive 3V path to turn the butterfly ON or OFF.' },
        { name: '2× 100Ω Resistors', role: 'Balances current equally across both LEDs and extends battery life.' },
        { name: '2× RGB / Slow-Fade LEDs', role: 'Built-in IC inside each LED cycles smoothly through rainbow colours.' },
        { name: 'Copper Tape / Perfboard', role: 'Forms the conductive traces along the cardboard or PCB wings.' },
      ],
      diagram: `<svg viewBox="0 0 460 165" width="100%" style="max-height:175px;">
        <circle cx="55" cy="82" r="28" fill="#111827" stroke="#f59e0b" stroke-width="2"/>
        <text x="55" y="79" fill="#fbbf24" font-size="10" font-weight="700" text-anchor="middle">CR2032</text>
        <text x="55" y="93" fill="#94a3b8" font-size="9" text-anchor="middle">3.0V</text>
        <line x1="83" y1="68" x2="125" y2="68" stroke="#ef4444" stroke-width="2"/>
        <rect x="125" y="56" width="65" height="24" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="157" y="72" fill="#e2e8f0" font-size="9" text-anchor="middle">Slide Switch</text>
        <polyline points="190,68 220,68 220,42 250,42" fill="none" stroke="#ef4444" stroke-width="2"/>
        <polyline points="220,68 220,102 250,102" fill="none" stroke="#ef4444" stroke-width="2"/>
        <rect x="250" y="33" width="46" height="18" rx="2" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="273" y="45" fill="#93c5fd" font-size="9" text-anchor="middle">100Ω</text>
        <rect x="250" y="93" width="46" height="18" rx="2" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="273" y="105" fill="#93c5fd" font-size="9" text-anchor="middle">100Ω</text>
        <line x1="296" y1="42" x2="335" y2="42" stroke="#ef4444" stroke-width="2"/>
        <line x1="296" y1="102" x2="335" y2="102" stroke="#ef4444" stroke-width="2"/>
        <circle cx="350" cy="42" r="14" fill="rgba(236,72,153,0.25)" stroke="#ec4899" stroke-width="2"/>
        <text x="350" y="45" fill="#f472b6" font-size="8" text-anchor="middle">Wing L</text>
        <circle cx="350" cy="102" r="14" fill="rgba(168,85,247,0.25)" stroke="#a855f7" stroke-width="2"/>
        <text x="350" y="105" fill="#c084fc" font-size="8" text-anchor="middle">Wing R</text>
        <polyline points="364,42 405,42 405,135 55,135 55,110" fill="none" stroke="#64748b" stroke-width="2"/>
        <line x1="364" y1="102" x2="405" y2="102" stroke="#64748b" stroke-width="2"/>
        <text x="230" y="150" fill="#94a3b8" font-size="9" text-anchor="middle">Return (−) to CR2032 Negative</text>
      </svg>`,
      code: `// Pure Hardware Circuit — No Coding Needed!
//
// CR2032 (+3V) ──► [Slide Switch] ──┬──► [100Ω] ──► [LED 1 (+)] ──┐
//                                   └──► [100Ω] ──► [LED 2 (+)] ──┴──► CR2032 (-)
//
// Tip: Place translucent vellum or tracing paper over the LEDs to diffuse light across the butterfly wings!`,
    },
    {
      id: 'robotic-arm', name: '4-DOF Servo Robotic Arm', level: 'Intermediate',
      desc: 'Control a 4-axis robotic arm (base, shoulder, elbow, gripper) using potentiometers and servo motors.',
      time: '5 hrs', category: 'Robotics',
      components: ['Arduino Uno', '4× Servo Motors (SG90 / MG995)', '4× 10kΩ Potentiometers', 'External 5V 3A Power Supply', 'Breadboard & Jumper Wires'],
      workingPrinciple: 'Turning any of the 4 potentiometers changes the voltage on Analog pins A0–A3 (0–1023). Arduino maps each reading to a 0°–180° angle and sends 50Hz PWM control pulses to the 4 servo motors.',
      componentRoles: [
        { name: '4× 10kΩ Potentiometers', role: 'Manual joystick knobs outputting 0–5V to Arduino pins A0–A3.' },
        { name: 'Arduino Uno', role: 'Reads A0–A3 and generates 4 independent servo PWM signals (D3, D5, D6, D9).' },
        { name: '4× Servo Motors', role: 'Move Base, Shoulder, Elbow, and Gripper joints to the exact target angle.' },
        { name: 'External 5V 3A PSU', role: 'Powers the servos directly (Arduino 5V pin cannot handle 4 servos!). Share GND.' },
      ],
      diagram: `<svg viewBox="0 0 470 165" width="100%" style="max-height:175px;">
        <rect x="15" y="25" width="105" height="115" rx="6" fill="#111827" stroke="#8b5cf6" stroke-width="2"/>
        <text x="67" y="55" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">4× Pots (10kΩ)</text>
        <text x="67" y="80" fill="#94a3b8" font-size="9" text-anchor="middle">Wipers → A0–A3</text>
        <text x="67" y="100" fill="#94a3b8" font-size="9" text-anchor="middle">Outer → 5V / GND</text>
        <rect x="175" y="25" width="110" height="115" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="230" y="75" fill="#22c55e" font-size="11" font-weight="700" text-anchor="middle">Arduino Uno</text>
        <text x="230" y="95" fill="#94a3b8" font-size="9" text-anchor="middle">map(ADC, 0..180°)</text>
        <line x1="120" y1="82" x2="175" y2="82" stroke="#8b5cf6" stroke-width="2.5"/>
        <rect x="335" y="25" width="120" height="115" rx="6" fill="#111827" stroke="#f59e0b" stroke-width="2"/>
        <text x="395" y="55" fill="#fbbf24" font-size="10" font-weight="700" text-anchor="middle">4× Servos</text>
        <text x="395" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">PWM ← D3,D5,D6,D9</text>
        <text x="395" y="102" fill="#f87171" font-size="9" text-anchor="middle">Ext 5V 3A PSU</text>
        <text x="395" y="118" fill="#94a3b8" font-size="8" text-anchor="middle">(Common GND!)</text>
        <line x1="285" y1="75" x2="335" y2="75" stroke="#f59e0b" stroke-width="2.5"/>
      </svg>`,
      code: `#include <Servo.h>
Servo s1, s2, s3, s4;

void setup() {
  s1.attach(3); s2.attach(5); s3.attach(6); s4.attach(9);
}

void loop() {
  s1.write(map(analogRead(A0), 0, 1023, 0, 180));
  s2.write(map(analogRead(A1), 0, 1023, 0, 180));
  s3.write(map(analogRead(A2), 0, 1023, 0, 180));
  s4.write(map(analogRead(A3), 0, 1023, 0, 180));
  delay(15);
}`,
    },
    {
      id: 'bluetooth-obstacle-rover', name: 'Bluetooth + Ultrasonic Smart Rover', level: 'Intermediate',
      desc: 'Drive a robot car from your phone via HC-05 Bluetooth while auto-braking before obstacles.',
      time: '4 hrs', category: 'Robotics',
      components: ['Arduino Uno', 'HC-05 Bluetooth Module', 'Ultrasonic Sensor (HC-SR04)', 'Servo Motor (SG90)', 'L298N Motor Driver', '2× BO Motors', '18650 Battery Pack'],
      workingPrinciple: 'Your smartphone sends F/B/L/R commands via Bluetooth to the HC-05 module. Meanwhile, the HC-SR04 ultrasonic sensor mounted on an SG90 servo scans ahead; if an obstacle is within 20cm, Arduino overrides forward commands and brakes automatically.',
      componentRoles: [
        { name: 'HC-05 Bluetooth', role: 'Receives wireless serial commands (F/B/L/R/S) from a phone app.' },
        { name: 'Ultrasonic HC-SR04', role: 'Measures distance ahead using 40kHz sound echoes to prevent collisions.' },
        { name: 'Servo Motor (SG90)', role: 'Pans the ultrasonic sensor left and right to scan for clear paths.' },
        { name: 'Arduino Uno', role: 'Combines phone commands with obstacle safety logic to drive the L298N.' },
        { name: 'L298N + BO Motors', role: 'Drives the left and right wheels from the 7.4V 18650 battery pack.' },
      ],
      diagram: `<svg viewBox="0 0 480 175" width="100%" style="max-height:185px;">
        <rect x="15" y="20" width="105" height="55" rx="6" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
        <text x="67" y="45" fill="#60a5fa" font-size="10" font-weight="700" text-anchor="middle">HC-05 Bluetooth</text>
        <text x="67" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">TX/RX ↔ D0/D1</text>
        <rect x="15" y="95" width="105" height="55" rx="6" fill="#111827" stroke="#06b6d4" stroke-width="2"/>
        <text x="67" y="120" fill="#22d3ee" font-size="10" font-weight="700" text-anchor="middle">HC-SR04 + SG90</text>
        <text x="67" y="135" fill="#94a3b8" font-size="9" text-anchor="middle">Trig/Echo → D4/D5</text>
        <rect x="175" y="30" width="115" height="110" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="232" y="80" fill="#22c55e" font-size="11" font-weight="700" text-anchor="middle">Arduino Uno</text>
        <text x="232" y="96" fill="#94a3b8" font-size="9" text-anchor="middle">Auto-Brake Logic</text>
        <line x1="120" y1="48" x2="175" y2="62" stroke="#3b82f6" stroke-width="2"/>
        <line x1="120" y1="122" x2="175" y2="108" stroke="#06b6d4" stroke-width="2"/>
        <rect x="340" y="30" width="120" height="110" rx="8" fill="#111827" stroke="#ef4444" stroke-width="2"/>
        <text x="400" y="72" fill="#f87171" font-size="11" font-weight="700" text-anchor="middle">L298N + Motors</text>
        <text x="400" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">7.4V 18650 Pack</text>
        <line x1="290" y1="85" x2="340" y2="85" stroke="#22c55e" stroke-width="2.5"/>
      </svg>`,
      code: `#include <Servo.h>
Servo panServo;
const int TRIG = 4, ECHO = 5, SERVO_PIN = 6;
const int IN1 = 8, IN2 = 9, IN3 = 10, IN4 = 11;

void setup() {
  Serial.begin(9600); // HC-05 on D0 (RX) / D1 (TX)
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  for (int p = 8; p <= 11; p++) pinMode(p, OUTPUT);
  panServo.attach(SERVO_PIN); panServo.write(90);
}

long getDistanceCm() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  return pulseIn(ECHO, HIGH, 25000) * 0.034 / 2;
}

void loop() {
  if (getDistanceCm() < 20) { stopMotors(); } // Auto-brake safety
  if (Serial.available()) {
    char cmd = Serial.read();
    if (cmd == 'F' && getDistanceCm() >= 20) forward();
    else if (cmd == 'B') backward();
    else if (cmd == 'L') left();
    else if (cmd == 'R') right();
    else stopMotors();
  }
}
void forward()    { digitalWrite(IN1,1); digitalWrite(IN2,0); digitalWrite(IN3,1); digitalWrite(IN4,0); }
void backward()   { digitalWrite(IN1,0); digitalWrite(IN2,1); digitalWrite(IN3,0); digitalWrite(IN4,1); }
void left()       { digitalWrite(IN1,0); digitalWrite(IN2,1); digitalWrite(IN3,1); digitalWrite(IN4,0); }
void right()      { digitalWrite(IN1,1); digitalWrite(IN2,0); digitalWrite(IN3,0); digitalWrite(IN4,1); }
void stopMotors() { digitalWrite(IN1,0); digitalWrite(IN2,0); digitalWrite(IN3,0); digitalWrite(IN4,0); }`,
    },
    {
      id: 'solar-tracker', name: 'Dual-LDR Servo Solar Tracker', level: 'Intermediate',
      desc: 'Automatically rotate a solar panel toward the brightest light source using 2 LDRs and a servo.',
      time: '2.5 hrs', category: 'Robotics',
      components: ['Arduino Uno', '2× LDR (Photoresistors)', '2× 10kΩ Resistors', 'Servo Motor (SG90)', 'Breadboard & Jumper Wires'],
      workingPrinciple: 'Two LDR voltage dividers (East on A0, West on A1) compare light intensity on each side of the solar panel. If East is brighter than West, Arduino steps the SG90 servo toward East until both LDR readings balance.',
      componentRoles: [
        { name: '2× LDRs', role: 'Left and Right light sensors separated by a small shadow divider.' },
        { name: '2× 10kΩ Resistors', role: 'Pair with each LDR to form voltage dividers readable by Analog pins A0 and A1.' },
        { name: 'Arduino Uno', role: 'Compares A0 vs A1; if difference exceeds deadband, adjusts servo angle.' },
        { name: 'Servo Motor (SG90)', role: 'Tilts the solar panel smoothly toward the brightest light source.' },
      ],
      diagram: `<svg viewBox="0 0 460 165" width="100%" style="max-height:175px;">
        <rect x="15" y="25" width="110" height="50" rx="6" fill="#111827" stroke="#f59e0b" stroke-width="2"/>
        <text x="70" y="47" fill="#fbbf24" font-size="10" font-weight="700" text-anchor="middle">LDR East + 10kΩ</text>
        <text x="70" y="63" fill="#94a3b8" font-size="9" text-anchor="middle">Divider → A0</text>
        <rect x="15" y="90" width="110" height="50" rx="6" fill="#111827" stroke="#f59e0b" stroke-width="2"/>
        <text x="70" y="112" fill="#fbbf24" font-size="10" font-weight="700" text-anchor="middle">LDR West + 10kΩ</text>
        <text x="70" y="128" fill="#94a3b8" font-size="9" text-anchor="middle">Divider → A1</text>
        <rect x="175" y="30" width="110" height="105" rx="8" fill="#111827" stroke="#22c55e" stroke-width="2"/>
        <text x="230" y="75" fill="#22c55e" font-size="11" font-weight="700" text-anchor="middle">Arduino Uno</text>
        <text x="230" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">Compare A0 vs A1</text>
        <line x1="125" y1="50" x2="175" y2="62" stroke="#f59e0b" stroke-width="2"/>
        <line x1="125" y1="115" x2="175" y2="102" stroke="#f59e0b" stroke-width="2"/>
        <rect x="335" y="45" width="105" height="75" rx="6" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
        <text x="387" y="78" fill="#60a5fa" font-size="10" font-weight="700" text-anchor="middle">SG90 Servo</text>
        <text x="387" y="95" fill="#94a3b8" font-size="9" text-anchor="middle">Signal ← Pin D9</text>
        <line x1="285" y1="82" x2="335" y2="82" stroke="#3b82f6" stroke-width="2.5"/>
      </svg>`,
      code: `#include <Servo.h>
Servo tracker;
int angle = 90;
const int DEADBAND = 25;

void setup() {
  tracker.attach(9); // SG90 Signal on Pin D9
  tracker.write(angle);
}

void loop() {
  int east = analogRead(A0); // East LDR divider on A0
  int west = analogRead(A1); // West LDR divider on A1
  int diff = east - west;
  if (abs(diff) > DEADBAND) {
    angle = constrain(angle + (diff > 0 ? 1 : -1), 15, 165);
    tracker.write(angle);
  }
  delay(30);
}`,
    },
  ],

  // ── Calculators ───────────────────────────────────────────
  calculators: [
    {
      id: 'ohms-law', name: "Ohm's Law",
      desc: 'Calculate Voltage, Current or Resistance.',
      icon: '⚡', formula: 'V = I × R',
      inputs: ['Voltage (V)', 'Current (mA)', 'Resistance (Ω)'],
    },
    {
      id: 'led-resistor', name: 'LED Resistor',
      desc: 'Find the right resistor for your LED.',
      icon: '💡', formula: 'R = (Vs - Vf) / If',
      inputs: ['Supply Voltage (V)', 'LED Forward Voltage (V)', 'LED Current (mA)'],
    },
    {
      id: 'voltage-divider', name: 'Voltage Divider',
      desc: 'Calculate output voltage from two resistors.',
      icon: '📐', formula: 'Vout = Vin × R2 / (R1 + R2)',
      inputs: ['Input Voltage (V)', 'R1 (Ω)', 'R2 (Ω)'],
    },
    {
      id: 'series-resistors', name: 'Series Resistors',
      desc: 'Total resistance of resistors in series.',
      icon: '🔗', formula: 'Rt = R1 + R2 + R3 + ...',
      inputs: ['R1 (Ω)', 'R2 (Ω)', 'R3 (Ω)', 'R4 (Ω)'],
    },
    {
      id: 'parallel-resistors', name: 'Parallel Resistors',
      desc: 'Total resistance of resistors in parallel.',
      icon: '📊', formula: '1/Rt = 1/R1 + 1/R2 + ...',
      inputs: ['R1 (Ω)', 'R2 (Ω)', 'R3 (Ω)', 'R4 (Ω)'],
    },
    {
      id: 'rc-time', name: 'RC Time Constant',
      desc: 'Calculate capacitor charge/discharge time.',
      icon: '⏱️', formula: 'τ = R × C',
      inputs: ['Resistance (Ω)', 'Capacitance (µF)'],
    },
    {
      id: 'power', name: 'Electrical Power',
      desc: 'Calculate power, voltage or current.',
      icon: '🔋', formula: 'P = V × I = I²R = V²/R',
      inputs: ['Voltage (V)', 'Current (mA)', 'Resistance (Ω)'],
    },
    {
      id: 'frequency', name: 'Frequency & Period',
      desc: 'Convert between frequency and period.',
      icon: '〰️', formula: 'T = 1/f',
      inputs: ['Frequency (Hz)', 'Period (ms)'],
    },
  ],

  // ── AI suggested questions ────────────────────────────────
  aiSuggestions: [
    'How does a transistor work as a switch?',
    'What is the difference between AC and DC?',
    'Explain how a capacitor charges and discharges',
    'What is PWM and how is it used?',
    'How do I read a resistor colour code?',
    'What causes a short circuit?',
    'Explain op-amp virtual ground concept',
    'How does a half-wave rectifier work?',
    'What is impedance?',
    'How do I choose the right transistor?',
  ],

  // ── AI canned responses (electronics tutor) ───────────────
  aiResponses: {
    default: (q) => `I understand you're asking about "${q}". In electronics, this is an important concept. Let me break it down step by step:

**Key Points:**
- This relates to fundamental circuit theory
- Always verify component ratings before applying power
- Use simulation tools like Falstad to test your circuit first

**Suggested Resources in Lab Mate:**
- 📖 Check the Learn module for detailed theory
- 🔬 Virtual Lab has hands-on experiments on this topic
- 🧩 Component Library has component-specific details

Would you like me to explain further, or point you to a specific experiment?`,
    'transistor': `**How a Transistor Works**

A BJT (Bipolar Junction Transistor) has 3 terminals: **Base, Collector, Emitter**.

**As a Switch:**
- When Base current (Ib) is 0 → Transistor is **OFF** (open switch)
- When sufficient Ib flows → Transistor is **ON** (closed switch)

**Rule:** Ic = β × Ib (where β = current gain, typically 100–300)

**Example:** BC547 (β ≈ 200), with Ib = 0.1mA → Ic = 20mA

\`\`\`
        Vcc
         |
        [Rc] ← Collector load
         |
         C
Ib →  B─┤NPN
         E
         |
        GND
\`\`\`

**Key tip:** Always calculate the base resistor: Rb = (Vin - 0.7) / Ib`,
    'ohms law': `**Ohm's Law — The Foundation of Electronics**

V = I × R

| Known | Find | Formula |
|---|---|---|
| I and R | V | V = I × R |
| V and R | I | I = V / R |
| V and I | R | R = V / I |

**Worked Example:**
- Supply: 9V, Resistor: 470Ω
- Current = 9 / 470 = **0.019A = 19mA**
- Power = V × I = 9 × 0.019 = **0.17W = 170mW**

> **Safety:** Ensure the resistor's power rating exceeds the calculated power! Choose a 0.25W or 0.5W resistor here.`,
    'led': `**LED Circuit Design**

LEDs need a current-limiting resistor — without one, they'll burn out instantly!

**Formula:** R = (Vs - Vf) / If

**Typical Values:**
| Colour | Forward Voltage (Vf) | Typical If |
|---|---|---|
| Red | 1.8–2.0V | 20mA |
| Green | 2.0–2.4V | 20mA |
| Blue/White | 3.0–3.4V | 20mA |

**Example (5V supply, Red LED):**
R = (5 - 2.0) / 0.020 = **150Ω → use 220Ω** (nearest standard, safer)

Use our **LED Resistor Calculator** in Circuit Studio for instant results!`,
    'capacitor': `**How Capacitors Work**

A capacitor stores electric charge on two parallel plates separated by an insulator (dielectric).

**Key Formula:** Q = C × V

**Charging:** Voltage rises exponentially toward supply voltage
**Time Constant:** τ = R × C (63.2% charged in one τ)

**Types:**
- **Ceramic**: 1pF–100nF, non-polarized, general purpose
- **Electrolytic**: 1µF–10,000µF, polarized (+ and - terminals), higher capacitance
- **Film**: Precision, stable, used in audio/filter circuits

**Common Uses:**
1. Power supply filtering (smooth out ripple)
2. Coupling (pass AC, block DC between stages)
3. Timing (RC circuits with 555 timer)
4. Energy storage (camera flash)

> ⚠️ **Safety:** Electrolytic capacitors must be connected with correct polarity! Reverse connection can cause explosion.`,
  },
};
