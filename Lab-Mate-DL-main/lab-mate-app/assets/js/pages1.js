// ============================================================
// LAB MATE – Page Renderers (Part 1)
// Home, Dashboard, Learn, Lesson, Component Library, Component Detail
// ============================================================

// ── HOME / LANDING PAGE ────────────────────────────────────
function renderHome() {
  document.getElementById('page-home').innerHTML = `
    <!-- Hero -->
    <section class="hero" style="padding:5rem 0 4rem;">
      <div class="container" style="text-align:center;">
        <div class="hero-badge">
          ${icons.zap}
          Electronics education, reimagined
        </div>
        <h1 class="hero-title">
          Your <span class="gradient-text">Companion</span><br>in the Lab
        </h1>
        <p class="hero-sub">Learn electronics theory, understand components, explore circuits, run virtual experiments and get AI-powered help — all in one place.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" onclick="navigate('dashboard')">
            ${icons.rocket} Start Learning
          </button>
          <button class="btn btn-secondary btn-lg" onclick="navigate('components')">
            ${icons.chip} Browse Components
          </button>
        </div>
        <!-- Stats row -->
        <div style="display:flex;gap:2rem;justify-content:center;margin-top:3rem;flex-wrap:wrap;">
          ${[['100+','Components','badge-blue'],['50+','Experiments','badge-green'],['200+','Circuits','badge-amber'],['AI Tutor','Ask Anything','badge-purple']].map(([v,l,b])=>`
            <div class="card card-compact" style="text-align:center;min-width:120px;">
              <div class="stat-value gradient-text">${v}</div>
              <div class="stat-label">${l}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Module grid -->
    <section style="padding:3rem 0 5rem;">
      <div class="container">
        <div style="text-align:center;margin-bottom:2.5rem;">
          <h2>One ecosystem. <span class="gradient-text">Seven learning modules.</span></h2>
          <p style="max-width:500px;margin:0.75rem auto 0;">Every module connects to the others — study a component, then find its circuit, experiment, and AI explanation.</p>
        </div>
        <div class="grid-auto stagger">
          ${[
            { id:'learn', icon:'📚', label:'Learn', desc:'Theory, courses, structured lessons and notes', color:'#3b82f6', bg:'rgba(59,130,246,0.1)', accent:'#3b82f6' },
            { id:'components', icon:'🔧', label:'Components', desc:'Complete encyclopedia of electronic components', color:'#8b5cf6', bg:'rgba(139,92,246,0.1)', accent:'#8b5cf6' },
            { id:'circuit-studio', icon:'〰️', label:'Circuit Studio', desc:'Circuit library, simulators and calculators', color:'#06b6d4', bg:'rgba(6,182,212,0.1)', accent:'#06b6d4' },
            { id:'virtual-lab', icon:'🔬', label:'Virtual Lab', desc:'Step-by-step experiments with lab reports', color:'#22c55e', bg:'rgba(34,197,94,0.1)', accent:'#22c55e' },
            { id:'ask-lab-mate', icon:'🤖', label:'Ask AI', desc:'Electronics AI tutor with source citations', color:'#a855f7', bg:'rgba(168,85,247,0.1)', accent:'#a855f7' },
            { id:'practice', icon:'🎯', label:'Practice', desc:'Quizzes, flashcards and mock assessments', color:'#f59e0b', bg:'rgba(245,158,11,0.1)', accent:'#f59e0b' },
            { id:'projects', icon:'🚀', label:'Projects', desc:'Guided projects from beginner to advanced', color:'#ef4444', bg:'rgba(239,68,68,0.1)', accent:'#ef4444' },
          ].map(m => `
            <div class="module-card" style="--accent:${m.accent};" onclick="navigate('${m.id}')">
              <div class="module-icon" style="background:${m.bg};">${m.icon}</div>
              <h3 style="font-size:1.1rem;">${m.label}</h3>
              <p style="font-size:0.875rem;margin:0;">${m.desc}</p>
              <div style="margin-top:auto;padding-top:0.75rem;">
                <span class="text-primary text-sm font-semibold flex items-center gap-2">Explore ${icons.arrow_right}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Learning path -->
    <section style="padding:3rem 0;background:var(--color-bg-alt);border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border);">
      <div class="container">
        <h2 style="text-align:center;margin-bottom:2.5rem;">The Learning Journey</h2>
        <div style="display:flex;align-items:center;gap:0;flex-wrap:wrap;justify-content:center;">
          ${[['Learn','Study theory & concepts','📖','#3b82f6'],['Understand','Explore components','🔧','#8b5cf6'],['Simulate','Test in Circuit Studio','〰️','#06b6d4'],['Build','Create real projects','🚀','#22c55e']].map((s,i,a)=>`
            <div style="display:flex;align-items:center;gap:0;">
              <div style="text-align:center;padding:1.5rem 1.25rem;">
                <div style="width:60px;height:60px;border-radius:50%;background:rgba(${i===0?'59,130,246':i===1?'139,92,246':i===2?'6,182,212':'34,197,94'},0.15);border:2px solid ${s[3]};display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin:0 auto 0.75rem;">${s[2]}</div>
                <div style="font-weight:700;color:${s[3]};">${s[0]}</div>
                <div style="font-size:0.8rem;color:var(--color-text-dim);max-width:100px;">${s[1]}</div>
              </div>
              ${i < a.length-1 ? `<div style="color:var(--color-text-dim);font-size:1.5rem;padding:0 0.5rem;">→</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Featured components -->
    <section style="padding:4rem 0;">
      <div class="container">
        <div class="section-header">
          <div class="section-title"><span class="icon">🔧</span><h2>Featured Components</h2></div>
          <button class="btn btn-secondary btn-sm" onclick="navigate('components')">View all ${icons.arrow_right}</button>
        </div>
        <div class="grid-auto stagger">
          ${DATA.components.slice(0,6).map(c => `
            <div class="comp-card" onclick="navigate('component',{id:'${c.id}'})">
              <div class="comp-symbol">${c.symbol_svg ? c.symbol_svg : `<span style="font-size:1.3rem;font-family:var(--font-mono);color:var(--color-primary);">${c.symbol}</span>`}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-weight:600;margin-bottom:0.25rem;">${c.name}</div>
                <span class="badge ${utils.categoryColor(c.category)}">${c.category}</span>
                <p style="font-size:0.8rem;margin-top:0.5rem;line-height:1.5;">${c.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section style="padding:4rem 0 5rem;text-align:center;">
      <div class="container">
        <div class="card" style="max-width:600px;margin:0 auto;background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(99,102,241,0.1));border-color:rgba(59,130,246,0.25);">
          <div style="font-size:2.5rem;margin-bottom:1rem;">🤖</div>
          <h2 style="margin-bottom:0.75rem;">Have a question?</h2>
          <p>Ask Lab Mate AI — your personal electronics tutor. Get explained at your level with source citations.</p>
          <button class="btn btn-primary btn-lg" style="margin-top:1.5rem;" onclick="navigate('ask-lab-mate')">${icons.bot} Ask Lab Mate AI</button>
        </div>
      </div>
    </section>
  `;
}

// ── DASHBOARD ─────────────────────────────────────────────
function renderDashboard() {
  const u = State.user;
  const totalProgress = Math.round((Object.keys(State.progress).length / 20) * 100);

  document.getElementById('page-dashboard').innerHTML = `
    <div class="page-with-sidebar">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">Navigation</div>
          ${[
            { id:'dashboard',     label:'Dashboard',    icon:icons.dashboard },
            { id:'learn',         label:'Learn',        icon:icons.book },
            { id:'components',    label:'Components',   icon:icons.chip },
            { id:'circuit-studio',label:'Circuit Studio',icon:icons.circuit },
            { id:'virtual-lab',   label:'Virtual Lab',  icon:icons.beaker },
            { id:'ask-lab-mate',  label:'Ask AI',       icon:icons.bot },
            { id:'practice',      label:'Practice',     icon:icons.puzzle },
            { id:'projects',      label:'Projects',     icon:icons.rocket },
          ].map(l=>`
            <div class="sidebar-link ${State.currentPage===l.id?'active':''}" onclick="navigate('${l.id}')" data-nav="${l.id}">
              <span class="icon">${l.icon}</span>${l.label}
            </div>
          `).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">My Progress</div>
          <div style="padding:0.75rem;background:var(--color-bg-card);border-radius:var(--radius-md);border:1px solid var(--color-border);">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.5rem;">
              <span class="text-muted">Overall</span><span style="color:var(--color-primary);font-weight:700;">${totalProgress}%</span>
            </div>
            <div class="progress-bar"><div class="progress-bar-fill" style="width:${totalProgress}%;"></div></div>
            <div style="margin-top:1rem;display:flex;gap:0.5rem;flex-direction:column;">
              <div style="display:flex;justify-content:space-between;font-size:0.78rem;">
                <span class="text-dim">🔥 Streak</span><span style="color:var(--color-amber);font-weight:600;">${u.streak} days</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.78rem;">
                <span class="text-dim">⭐ XP</span><span style="color:var(--color-green);font-weight:600;">${u.xp.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Bookmarks</div>
          ${State.bookmarks.length === 0
            ? `<div style="padding:0.5rem 0.75rem;font-size:0.8rem;color:var(--color-text-dim);">No bookmarks yet</div>`
            : State.bookmarks.slice(0,4).map(id => {
                const c = DATA.components.find(x=>x.id===id);
                return c ? `<div class="sidebar-link" onclick="navigate('component',{id:'${c.id}'})">${icons.bookmark}<span>${c.name}</span></div>` : '';
              }).join('')
          }
        </div>
      </aside>

      <!-- Main content -->
      <main class="page-content">
        <!-- Welcome -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:2rem;gap:1rem;flex-wrap:wrap;">
          <div>
            <h1 style="font-size:1.6rem;">Good ${new Date().getHours()<12?'morning':new Date().getHours()<18?'afternoon':'evening'}, ${u.avatar} ${u.name}!</h1>
            <p style="margin-top:0.25rem;">What would you like to understand today?</p>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <span class="badge badge-amber">${icons.fire} ${u.streak}-day streak</span>
            <span class="badge badge-green">Level: ${u.level}</span>
          </div>
        </div>

        <!-- Search -->
        <div id="search-wrapper" style="position:relative;margin-bottom:2rem;">
          <div class="search-bar" style="border-radius:var(--radius-lg);">
            <span class="search-icon">${icons.search}</span>
            <input id="global-search-input" type="text" placeholder="Search components, circuits, lessons, experiments…">
            <kbd style="font-size:0.7rem;color:var(--color-text-dim);padding:0.2rem 0.4rem;background:var(--color-bg);border:1px solid var(--color-border);border-radius:4px;">Ctrl+K</kbd>
          </div>
          <div id="search-results" style="display:none;position:absolute;top:calc(100%+8px);left:0;right:0;background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-lg);z-index:50;overflow:hidden;box-shadow:var(--shadow-lg);">
          </div>
        </div>

        <!-- Quick access cards -->
        <div class="grid-4 stagger" style="margin-bottom:2rem;">
          ${[
            { id:'learn',          icon:'📚', label:'Continue Learning', val:'Fundamentals', sub:'65% complete', color:'#3b82f6' },
            { id:'components',     icon:'🔧', label:'Components',       val:'100+ parts',   sub:'Browse library', color:'#8b5cf6' },
            { id:'virtual-lab',    icon:'🔬', label:'Virtual Lab',      val:'4 experiments',sub:'Ready to run',  color:'#22c55e' },
            { id:'practice',       icon:'🎯', label:'Practice Quiz',    val:'150 questions',sub:'Test yourself',  color:'#f59e0b' },
          ].map(c=>`
            <div class="card card-compact" style="cursor:pointer;border-left:3px solid ${c.color};" onclick="navigate('${c.id}')">
              <div style="font-size:1.5rem;margin-bottom:0.5rem;">${c.icon}</div>
              <div style="font-size:0.75rem;color:var(--color-text-dim);text-transform:uppercase;letter-spacing:0.05em;">${c.label}</div>
              <div style="font-weight:700;font-size:1rem;margin-top:0.25rem;">${c.val}</div>
              <div style="font-size:0.78rem;color:var(--color-text-muted);margin-top:0.15rem;">${c.sub}</div>
            </div>
          `).join('')}
        </div>

        <!-- Two-column layout -->
        <div class="grid-2">
          <!-- Continue learning -->
          <div>
            <div class="section-header">
              <div class="section-title">${icons.book} <h3>Continue Learning</h3></div>
              <button class="btn btn-ghost btn-sm" onclick="navigate('learn')">View all</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
              ${DATA.subjects.slice(0,4).map(s => {
                const done = utils.progressCount(s.id);
                const pct = Math.round((done/s.topics.length)*100);
                return `
                  <div class="card card-compact" style="cursor:pointer;" onclick="navigate('learn')">
                    <div style="display:flex;align-items:center;gap:1rem;">
                      <div style="font-size:1.5rem;">${s.icon}</div>
                      <div style="flex:1;min-width:0;">
                        <div style="font-weight:600;font-size:0.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.name}</div>
                        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.35rem;">
                          <div class="progress-bar" style="flex:1;height:4px;"><div class="progress-bar-fill" style="width:${pct}%;"></div></div>
                          <span style="font-size:0.72rem;color:var(--color-text-dim);flex-shrink:0;">${pct}%</span>
                        </div>
                      </div>
                      <span class="badge ${utils.levelColor(s.level)}">${s.level}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Recent activity -->
          <div>
            <div class="section-header">
              <div class="section-title">${icons.zap} <h3>Quick Actions</h3></div>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
              ${[
                { icon:'🤖', title:'Ask Lab Mate AI', desc:'Get instant electronics help', page:'ask-lab-mate', color:'#a855f7' },
                { icon:'〰️', title:'Open Falstad Simulator', desc:'Simulate circuits in browser', url:'https://falstad.com/circuit/', color:'#06b6d4' },
                { icon:'🔬', title:'Run an Experiment', desc:'Ohm\'s Law verification guide', page:'experiment', params:{id:'ohms-law'}, color:'#22c55e' },
                { icon:'🎯', title:'Take a Quiz', desc:'Test your electronics knowledge', page:'practice', color:'#f59e0b' },
                { icon:'🚀', title:'Build a Project', desc:'LED Blink with Arduino', page:'projects', color:'#ef4444' },
              ].map(a=>`
                <div class="card card-compact" style="cursor:pointer;display:flex;align-items:center;gap:1rem;" onclick="${a.url?`window.open('${a.url}','_blank')`:`navigate('${a.page}'${a.params?','+JSON.stringify(a.params):''})`}">
                  <div style="width:38px;height:38px;border-radius:var(--radius-sm);background:rgba(${a.color==='#a855f7'?'168,85,247':a.color==='#06b6d4'?'6,182,212':a.color==='#22c55e'?'34,197,94':a.color==='#f59e0b'?'245,158,11':'239,68,68'},0.12);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;">${a.icon}</div>
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:0.875rem;">${a.title}</div>
                    <div style="font-size:0.78rem;color:var(--color-text-dim);">${a.desc}</div>
                  </div>
                  ${a.url ? `<span style="color:var(--color-text-dim);">${icons.external}</span>` : `<span style="color:var(--color-text-dim);">${icons.arrow_right}</span>`}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Recommended -->
        <div style="margin-top:2rem;">
          <div class="section-header">
            <div class="section-title">${icons.star} <h3>Recommended for You</h3></div>
          </div>
          <div class="grid-3 stagger">
            ${[
              { icon:'🔧', title:'Resistor Colour Code', desc:'Learn to read resistor values quickly', page:'component', params:{id:'resistor'}, badge:'Beginner', badgeClass:'badge-green' },
              { icon:'🔬', title:"Ohm's Law Experiment", desc:"Verify Ohm's law in the virtual lab", page:'experiment', params:{id:'ohms-law'}, badge:'Lab', badgeClass:'badge-blue' },
              { icon:'📚', title:'What is Voltage?', desc:'Start from the very basics', page:'lesson', params:{id:'voltage'}, badge:'10 min', badgeClass:'badge-slate' },
            ].map(r=>`
              <div class="card" style="cursor:pointer;" onclick="navigate('${r.page}',${JSON.stringify(r.params||{})})">
                <div style="font-size:1.8rem;margin-bottom:0.75rem;">${r.icon}</div>
                <span class="badge ${r.badgeClass}" style="margin-bottom:0.5rem;">${r.badge}</span>
                <h4 style="margin-bottom:0.4rem;">${r.title}</h4>
                <p style="font-size:0.85rem;">${r.desc}</p>
                <div style="margin-top:1rem;"><span class="text-primary text-sm flex items-center gap-1">Start ${icons.arrow_right}</span></div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
    </div>
  `;

  setupSearch();
}

// ── LEARN ─────────────────────────────────────────────────
function renderLearn() {
  document.getElementById('page-learn').innerHTML = `
    <div class="page-with-sidebar">
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">Subjects</div>
          ${DATA.subjects.map(s=>`
            <div class="sidebar-link" onclick="document.getElementById('subj-${s.id}').scrollIntoView({behavior:'smooth'})">
              <span class="icon">${s.icon}</span>${s.name}
              <span class="count">${s.lessons}</span>
            </div>
          `).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Filter by Level</div>
          ${['All','Beginner','Intermediate','Advanced'].map(l=>`
            <div class="sidebar-link ${l==='All'?'active':''}" onclick="filterLearn('${l}',this)">
              <span class="difficulty-dot ${l!=='All'?`diff-${l.toLowerCase()}`:''}" style="background:${l==='All'?'#64748b':l==='Beginner'?'#22c55e':l==='Intermediate'?'#f59e0b':'#ef4444'};"></span>
              ${l}
            </div>
          `).join('')}
        </div>
      </aside>
      <main class="page-content">
        <div class="page-header">
          <h1 class="page-title">📚 Learn Electronics</h1>
          <p>Structured lessons from beginner to advanced — learn at your own pace.</p>
          <div class="tabs" style="margin-top:1.5rem;">
            <button class="tab-btn active" onclick="switchLearnTab('subjects',this)">Subjects</button>
            <button class="tab-btn" onclick="switchLearnTab('roadmap',this)">Learning Roadmap</button>
            <button class="tab-btn" onclick="switchLearnTab('notes',this)">Notes & Tutorials</button>
          </div>
        </div>

        <div id="learn-tab-subjects">
          ${DATA.subjects.map(s => {
            const done = utils.progressCount(s.id);
            const pct = Math.round((done/s.topics.length)*100);
            return `
              <div id="subj-${s.id}" style="margin-bottom:3rem;" class="animate-fadein">
                <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap;">
                  <div style="font-size:2rem;">${s.icon}</div>
                  <div style="flex:1;">
                    <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
                      <h2 style="font-size:1.3rem;">${s.name}</h2>
                      <span class="badge ${utils.levelColor(s.level)}">${s.level}</span>
                    </div>
                    <p style="font-size:0.875rem;margin-top:0.25rem;">${s.desc}</p>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-size:1.5rem;font-weight:800;color:${s.color};">${pct}%</div>
                    <div style="font-size:0.75rem;color:var(--color-text-dim);">${done}/${s.topics.length} done</div>
                  </div>
                </div>
                <div class="progress-bar" style="margin-bottom:1.25rem;"><div class="progress-bar-fill" style="width:${pct}%;"></div></div>
                <div style="display:flex;flex-direction:column;gap:0.6rem;">
                  ${s.topics.map(t => {
                    const done = utils.getProgress(t.id);
                    return `
                      <div class="card card-compact" style="cursor:pointer;display:flex;align-items:center;gap:1rem;" onclick="navigate('lesson',{id:'${t.id}'})">
                        <div style="width:28px;height:28px;border-radius:50%;border:2px solid ${done?'var(--color-green)':'var(--color-border)'};background:${done?'rgba(34,197,94,0.15)':'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${done?'var(--color-green)':'var(--color-text-dim)'};">
                          ${done ? icons.check : ''}
                        </div>
                        <div style="flex:1;">
                          <div style="font-weight:500;font-size:0.9rem;">${t.title}</div>
                        </div>
                        <span style="font-size:0.78rem;color:var(--color-text-dim);">⏱ ${t.duration}</span>
                        <span style="color:var(--color-text-dim);">${icons.arrow_right}</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div id="learn-tab-roadmap" style="display:none;">
          <div class="card" style="text-align:center;padding:3rem;">
            <div style="font-size:3rem;margin-bottom:1rem;">🗺️</div>
            <h3>Personalized Learning Roadmap</h3>
            <p>Based on your level (${State.user.level}), here's your recommended path:</p>
            <div style="margin-top:2rem;display:flex;flex-direction:column;gap:1rem;max-width:500px;margin:2rem auto 0;">
              ${[
                {step:1,name:'Electrical Fundamentals',status:'In Progress',color:'#3b82f6'},
                {step:2,name:'Basic Electronics',status:'Up Next',color:'#8b5cf6'},
                {step:3,name:'Analog Electronics',status:'Locked',color:'#64748b'},
                {step:4,name:'Digital Electronics',status:'Locked',color:'#64748b'},
                {step:5,name:'Embedded Systems',status:'Locked',color:'#64748b'},
              ].map(r=>`
                <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:var(--color-bg-elevated);border-radius:var(--radius-md);border:1px solid var(--color-border);">
                  <div style="width:36px;height:36px;border-radius:50%;background:${r.color}22;border:2px solid ${r.color};display:flex;align-items:center;justify-content:center;font-weight:700;color:${r.color};">${r.step}</div>
                  <span style="flex:1;font-weight:500;text-align:left;">${r.name}</span>
                  <span class="badge ${r.status==='In Progress'?'badge-blue':r.status==='Up Next'?'badge-amber':'badge-slate'}">${r.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div id="learn-tab-notes" style="display:none;">
          <div class="grid-3">
            ${['Ohm\'s Law Quick Reference','Resistor Colour Code Chart','Logic Gate Truth Tables','Capacitor Charge/Discharge','BJT Biasing Guide','Arduino Pin Reference'].map(n=>`
              <div class="card" style="cursor:pointer;">
                <div style="font-size:1.5rem;margin-bottom:0.75rem;">📄</div>
                <h4>${n}</h4>
                <p style="font-size:0.82rem;margin-top:0.5rem;">Quick reference note for lab use</p>
                <button class="btn btn-secondary btn-sm" style="margin-top:1rem;">Download PDF</button>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}

function switchLearnTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  ['subjects','roadmap','notes'].forEach(t => {
    const el = document.getElementById(`learn-tab-${t}`);
    if(el) el.style.display = t === tab ? 'block' : 'none';
  });
}

function filterLearn(level, el) {
  if (el) {
    document.querySelectorAll('#page-learn .sidebar-section:nth-child(2) .sidebar-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
  }
  DATA.subjects.forEach(s => {
    const block = document.getElementById(`subj-${s.id}`);
    if (block) block.style.display = (level === 'All' || s.level === level) ? 'block' : 'none';
  });
  showToast(`Showing ${level} subjects`, 'info');
}

// ── LESSON ────────────────────────────────────────────────
function renderLesson(id) {
  let lesson = DATA.lessons[id];
  if (!lesson) {
    const parentSubj = DATA.subjects.find(s => s.topics.some(t => t.id === id));
    const topicObj = parentSubj?.topics.find(t => t.id === id);
    if (topicObj && parentSubj) {
      lesson = {
        title: topicObj.title,
        subject: parentSubj.name,
        level: parentSubj.level,
        duration: topicObj.duration,
        objectives: [
          `Understand the core principles of ${topicObj.title}`,
          `Identify how ${topicObj.title} applies in practical circuits`,
          `Connect theory to hands-on components and experiments`,
        ],
        content: `
          <h3>${topicObj.title}</h3>
          <p>Welcome to <strong>${topicObj.title}</strong> in the <strong>${parentSubj.name}</strong> track (${parentSubj.level} level).</p>
          <p>${parentSubj.desc}</p>
          <div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:10px;padding:1rem;margin:1rem 0;">
            <strong style="color:#60a5fa;">🤖 Interactive Study Tip</strong>
            <p style="margin-top:0.5rem;">Want a step-by-step walkthrough or worked examples for <strong>${topicObj.title}</strong>? Click <strong>Ask Lab Mate AI</strong> below or explore related components in the Component Library.</p>
          </div>
          <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1rem;">
            <button class="btn btn-primary btn-sm" onclick="navigate('ask-lab-mate')">${icons.bot} Ask AI about ${topicObj.title}</button>
            <button class="btn btn-secondary btn-sm" onclick="navigate('components')">${icons.chip} Browse Components</button>
          </div>
        `,
        quiz: [
          { q: `Which subject track covers "${topicObj.title}"?`, options: ['Mechanical Design', parentSubj.name, 'Organic Chemistry', 'Civil Surveying'], answer: 1, explanation: `${topicObj.title} is part of ${parentSubj.name}.` }
        ],
        related: parentSubj.topics.filter(t => t.id !== id).slice(0, 3).map(t => t.id),
      };
    } else {
      lesson = DATA.lessons['voltage'];
    }
  }
  let quizState = { idx: 0, answered: false, score: 0 };

  document.getElementById('page-lesson').innerHTML = `
    <div class="page-with-sidebar">
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">In This Lesson</div>
          <div style="padding:0.5rem 0.75rem;">
            <h4 style="font-size:0.875rem;margin-bottom:0.75rem;">${lesson.title}</h4>
            <div style="display:flex;flex-direction:column;gap:0.5rem;">
              ${lesson.objectives.map((o,i)=>`
                <div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.8rem;color:var(--color-text-muted);">
                  <span style="color:var(--color-primary);flex-shrink:0;margin-top:1px;">${icons.check}</span>
                  <span>${o}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Related Lessons</div>
          ${(lesson.related||[]).map(r => {
            const rel = DATA.subjects.flatMap(s=>s.topics).find(t=>t.id===r);
            return rel ? `<div class="sidebar-link" onclick="navigate('lesson',{id:'${r}'})">${icons.book} ${rel.title}</div>` : '';
          }).join('')}
        </div>
      </aside>
      <main class="page-content" style="max-width:860px;">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <span onclick="navigate('learn')" style="cursor:pointer;">Learn</span>
          <span class="breadcrumb-sep">›</span>
          <span>${lesson.subject}</span>
          <span class="breadcrumb-sep">›</span>
          <span style="color:var(--color-text);">${lesson.title}</span>
        </div>

        <!-- Header -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:2rem;flex-wrap:wrap;">
          <div>
            <div style="display:flex;gap:0.5rem;margin-bottom:0.75rem;flex-wrap:wrap;">
              <span class="badge ${utils.levelColor(lesson.level)}">${lesson.level}</span>
              <span class="badge badge-slate">⏱ ${lesson.duration}</span>
              <span class="badge badge-blue">📖 ${lesson.subject}</span>
            </div>
            <h1 style="font-size:1.8rem;">${lesson.title}</h1>
          </div>
          <button class="btn btn-secondary" onclick="utils.toggleBookmark('lesson-${id}')">
            ${icons.bookmark} Bookmark
          </button>
        </div>

        <!-- Objectives -->
        <div class="card card-elevated" style="margin-bottom:2rem;border-left:3px solid var(--color-primary);">
          <h4 style="margin-bottom:0.75rem;color:var(--color-primary);">Learning Objectives</h4>
          <ul style="display:flex;flex-direction:column;gap:0.5rem;">
            ${lesson.objectives.map(o=>`
              <li style="display:flex;align-items:flex-start;gap:0.6rem;font-size:0.9rem;color:var(--color-text-muted);">
                <span style="color:var(--color-green);flex-shrink:0;margin-top:2px;">${icons.check}</span>${o}
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Content -->
        <div class="lesson-content" style="line-height:1.9;">
          ${lesson.content}
        </div>

        <!-- Knowledge check -->
        <div style="margin-top:3rem;">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
            <div style="width:4px;height:28px;background:var(--color-primary);border-radius:2px;"></div>
            <h2 style="font-size:1.3rem;">Knowledge Check</h2>
          </div>
          <div id="lesson-quiz"></div>
        </div>

        <!-- Navigation -->
        <div style="display:flex;justify-content:space-between;margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--color-border);">
          <button class="btn btn-secondary" onclick="navigate('learn')">${icons.arrow_left} Back to Learn</button>
          <button class="btn btn-primary" onclick="utils.markProgress('${id}');showToast('Lesson complete! ✅','success');navigate('learn')">
            Mark Complete ${icons.check}
          </button>
        </div>
      </main>
    </div>
  `;

  renderLessonQuiz(lesson.quiz, 0, quizState);
}

function renderLessonQuiz(questions, idx, state) {
  const container = document.getElementById('lesson-quiz');
  if (!container || idx >= questions.length) return;
  const q = questions[idx];

  container.innerHTML = `
    <div class="card card-elevated animate-fadein">
      <div style="display:flex;justify-content:space-between;margin-bottom:1rem;">
        <span class="text-muted text-sm">Question ${idx+1} of ${questions.length}</span>
        <span class="text-sm font-semibold text-primary">Score: ${state.score}/${questions.length}</span>
      </div>
      <div class="progress-bar" style="margin-bottom:1.25rem;"><div class="progress-bar-fill" style="width:${((idx)/questions.length)*100}%;"></div></div>
      <h3 style="margin-bottom:1.25rem;font-size:1rem;">${q.q}</h3>
      <div style="display:flex;flex-direction:column;gap:0.6rem;" id="quiz-options">
        ${q.options.map((o,i)=>`
          <div class="quiz-option" onclick="answerLessonQuiz(${i},${q.answer},${idx})">${String.fromCharCode(65+i)}. ${o}</div>
        `).join('')}
      </div>
      <div id="quiz-feedback" style="display:none;"></div>
    </div>
  `;

  window.answerLessonQuiz = (chosen, correct, qIdx) => {
    if (state.answered) return;
    state.answered = true;
    const opts = document.querySelectorAll('.quiz-option');
    opts[correct].classList.add('correct');
    if (chosen !== correct) opts[chosen].classList.add('wrong');
    else state.score++;

    document.getElementById('quiz-feedback').innerHTML = `
      <div style="margin-top:1rem;padding:1rem;border-radius:var(--radius-md);background:${chosen===correct?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)'};border:1px solid ${chosen===correct?'rgba(34,197,94,0.3)':'rgba(239,68,68,0.3)'};">
        <div style="font-weight:700;color:${chosen===correct?'var(--color-green)':'var(--color-red)'};">${chosen===correct?'✅ Correct!':'❌ Incorrect'}</div>
        <div style="font-size:0.875rem;margin-top:0.5rem;color:var(--color-text-muted);">📖 ${q.explanation||'Good try!'}</div>
        ${qIdx+1 < questions.length ? `<button class="btn btn-primary btn-sm" style="margin-top:0.75rem;" onclick="state_answered_reset()">Next Question ${icons.arrow_right}</button>` : `<button class="btn btn-green btn-sm" style="margin-top:0.75rem;" onclick="showToast('Lesson quiz complete! Score: ${state.score}/${questions.length} 🎉','success')">Finish Quiz ✅</button>`}
      </div>
    `;
    document.getElementById('quiz-feedback').style.display = 'block';

    window.state_answered_reset = () => {
      state.answered = false;
      renderLessonQuiz(questions, qIdx+1, state);
    };
  };
}

// ── COMPONENTS PAGE ───────────────────────────────────────
function renderComponents() {
  let activeCat = 'All';
  let activeLevel = 'All';
  let searchQ = '';

  function applyCompFilters() {
    const filtered = DATA.components.filter(c => {
      const matchCat = activeCat === 'All' || c.category === activeCat;
      const matchLvl = activeLevel === 'All' || c.tip === activeLevel;
      const matchQ = !searchQ || c.name.toLowerCase().includes(searchQ) || c.desc.toLowerCase().includes(searchQ) || c.category.toLowerCase().includes(searchQ);
      return matchCat && matchLvl && matchQ;
    });
    document.getElementById('comp-grid').innerHTML = renderCompCards(filtered, searchQ);
  }

  document.getElementById('page-components').innerHTML = `
    <div class="page-with-sidebar">
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">Categories</div>
          ${['All','Passive','Active','Semiconductor','Sensors','Embedded','Electromechanical','Connectivity','Power'].map(cat=>`
            <div class="sidebar-link comp-cat-link ${cat==='All'?'active':''}" onclick="filterComponents('${cat}',this)">${cat}</div>
          `).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Level</div>
          ${['All','Beginner','Intermediate','Advanced'].map(l=>`
            <div class="sidebar-link comp-lvl-link ${l==='All'?'active':''}" onclick="filterByLevel('${l}',this)">${l}</div>
          `).join('')}
        </div>
      </aside>
      <main class="page-content">
        <div class="page-header">
          <h1 class="page-title">🔧 Component Library</h1>
          <p>Your encyclopedia of electronic components — symbols, specs, datasheets and examples (${DATA.components.length} components).</p>
          <div class="search-bar" style="margin-top:1rem;max-width:460px;">
            <span class="search-icon">${icons.search}</span>
            <input id="comp-search" type="text" placeholder="Search components (e.g. Arduino, ESP32, L298N, sensor)…" oninput="searchComponents(this.value)">
          </div>
        </div>
        <div class="grid-auto stagger" id="comp-grid">
          ${renderCompCards(DATA.components)}
        </div>
      </main>
    </div>
  `;

  window.filterComponents = (cat, el) => {
    document.querySelectorAll('.comp-cat-link').forEach(l=>l.classList.remove('active'));
    if (el) el.classList.add('active');
    activeCat = cat;
    applyCompFilters();
  };

  window.searchComponents = (q) => {
    searchQ = q.trim().toLowerCase();
    applyCompFilters();
  };

  window.filterByLevel = (l, el) => {
    document.querySelectorAll('.comp-lvl-link').forEach(link=>link.classList.remove('active'));
    if (el) el.classList.add('active');
    activeLevel = l;
    applyCompFilters();
  };
}

function renderCompCards(list, highlight='') {
  if (!list.length) return `<div class="empty-state"><div class="empty-icon">🔍</div><p>No components found</p></div>`;
  return list.map(c=>{
    const thumb = (typeof SVGParts !== 'undefined' && SVGParts.getComponentDiagram(c.id)) || c.symbol_svg;
    return `
    <div class="comp-card" onclick="navigate('component',{id:'${c.id}'})">
      <div class="comp-symbol" style="overflow:hidden;padding:0.25rem;">
        ${thumb ? `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">${thumb}</div>` : `<span style="font-size:1.1rem;font-family:var(--font-mono);color:var(--color-primary);">${c.symbol}</span>`}
      </div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.35rem;">
          <span style="font-weight:600;">${highlight ? utils.highlight(c.name, highlight) : c.name}</span>
          <span class="badge ${utils.categoryColor(c.category)}">${c.category}</span>
        </div>
        <p style="font-size:0.8rem;margin:0;line-height:1.5;">${c.desc}</p>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem;">
          <span class="badge ${utils.levelColor(c.tip)}">${c.tip}</span>
          <span style="font-size:0.75rem;color:var(--color-text-dim);">${c.unit}</span>
        </div>
      </div>
    </div>
  `;}).join('');
}

// ── COMPONENT DETAIL PAGE ─────────────────────────────────
function renderComponent(id) {
  const c = DATA.components.find(x=>x.id===id) || DATA.components[0];

  document.getElementById('page-component').innerHTML = `
    <div class="page-with-sidebar">
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">Related Components</div>
          ${(c.related||[]).map(r => {
            const rc = DATA.components.find(x=>x.id===r);
            return rc ? `<div class="sidebar-link" onclick="navigate('component',{id:'${r}'})">${icons.chip} ${rc.name}</div>` : '';
          }).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-label">Learn More</div>
          <div class="sidebar-link" onclick="navigate('ask-lab-mate')">${icons.bot} Ask AI about ${c.name}</div>
          <div class="sidebar-link" onclick="navigate('virtual-lab')">${icons.beaker} Find Experiments</div>
          <div class="sidebar-link" onclick="navigate('circuit-studio')">${icons.circuit} Find Circuits</div>
        </div>
      </aside>
      <main class="page-content" style="max-width:860px;">
        <div class="breadcrumb">
          <span onclick="navigate('components')" style="cursor:pointer;">Components</span>
          <span class="breadcrumb-sep">›</span>
          <span style="color:var(--color-text);">${c.name}</span>
        </div>

        <!-- Header -->
        <div style="display:flex;align-items:flex-start;gap:2rem;margin-bottom:2.5rem;flex-wrap:wrap;">
          <div style="width:100px;height:100px;background:var(--color-bg-elevated);border:2px solid var(--color-border);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:1rem;">
            ${c.symbol_svg || `<span style="font-size:2rem;font-family:var(--font-mono);color:var(--color-primary);">${c.symbol}</span>`}
          </div>
          <div style="flex:1;">
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">
              <span class="badge ${utils.categoryColor(c.category)}">${c.category}</span>
              <span class="badge ${utils.levelColor(c.tip)}">${c.tip}</span>
            </div>
            <h1 style="font-size:2rem;margin-bottom:0.5rem;">${c.name}</h1>
            <p>${c.longDesc || c.desc}</p>
            <div style="margin-top:1rem;display:flex;gap:0.75rem;flex-wrap:wrap;">
              <button class="btn btn-primary btn-sm" onclick="navigate('ask-lab-mate')">${icons.bot} Ask AI</button>
              <button class="btn btn-secondary btn-sm" id="comp-bm-btn" onclick="const added=utils.toggleBookmark('${c.id}'); this.innerHTML=icons.bookmark + ' ' + (added?'Bookmarked':'Bookmark');">${icons.bookmark} ${utils.isBookmarked(c.id)?'Bookmarked':'Bookmark'}</button>
              <button class="btn btn-secondary btn-sm" onclick="navigate('virtual-lab')">${icons.beaker} Find Experiment</button>
            </div>
          </div>
        </div>

        <!-- Component Realistic Pinout & Socket Diagram -->
        ${typeof SVGParts !== 'undefined' && SVGParts.getComponentDiagram(c.id) ? `
          <div class="card" style="margin-bottom:1.5rem;padding:1.25rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
              <h4 style="margin:0;">📐 Hardware Diagram &amp; Pinout</h4>
              <span class="badge badge-blue">Accurate Pin &amp; Socket Labels</span>
            </div>
            <div style="background:#0d1117;border:1px solid var(--color-border);border-radius:var(--radius-md);padding:1rem;text-align:center;">
              ${SVGParts.getComponentDiagram(c.id)}
            </div>
          </div>
        ` : ''}

        <!-- Formula highlight -->
        ${c.formula ? `
          <div class="card card-elevated" style="margin-bottom:1.5rem;border-left:3px solid var(--color-primary);">
            <div style="font-size:0.75rem;color:var(--color-text-dim);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.5rem;">Key Formula</div>
            <div class="calc-formula" style="font-size:1.2rem;">${c.formula}</div>
          </div>
        ` : ''}

        <!-- Tabs -->
        <div class="tabs" id="comp-tabs">
          <button class="tab-btn active" onclick="switchCompTab('specs',this)">Specifications</button>
          <button class="tab-btn" onclick="switchCompTab('working',this)">How It Works</button>
          <button class="tab-btn" onclick="switchCompTab('uses',this)">Applications</button>
          <button class="tab-btn" onclick="switchCompTab('colour',this)" style="${c.id!=='resistor'?'display:none':''}">Colour Code</button>
        </div>

        <!-- Specs tab -->
        <div id="comp-tab-specs">
          <div class="card">
            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr style="border-bottom:1px solid var(--color-border);">
                  <th style="text-align:left;padding:0.75rem 0;font-size:0.8rem;color:var(--color-text-dim);text-transform:uppercase;">Parameter</th>
                  <th style="text-align:left;padding:0.75rem 0;font-size:0.8rem;color:var(--color-text-dim);text-transform:uppercase;">Value</th>
                </tr>
              </thead>
              <tbody>
                ${(c.specs||[]).map(s=>`
                  <tr style="border-bottom:1px solid var(--color-border);">
                    <td style="padding:0.75rem 0;color:var(--color-text-muted);font-size:0.9rem;">${s.param}</td>
                    <td style="padding:0.75rem 0;font-weight:500;font-family:var(--font-mono);font-size:0.875rem;">${s.value}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Working tab -->
        <div id="comp-tab-working" style="display:none;">
          <div class="card">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
              <div style="width:48px;height:48px;background:var(--color-bg-elevated);border:1px solid var(--color-border);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;">
                ${c.symbol_svg || `<span style="font-family:var(--font-mono);color:var(--color-primary);">${c.symbol}</span>`}
              </div>
              <div>
                <h4>${c.name} — Working Principle</h4>
                <span class="badge ${utils.categoryColor(c.category)}">${c.type || c.category}</span>
              </div>
            </div>
            <p style="line-height:1.9;">${c.longDesc || c.desc}</p>
            <div class="card card-elevated" style="margin-top:1.5rem;">
              <strong style="color:var(--color-primary);">💡 Key Formula</strong>
              <div class="calc-formula" style="margin-top:0.75rem;">${c.formula || 'See datasheet'}</div>
            </div>
          </div>
        </div>

        <!-- Uses tab -->
        <div id="comp-tab-uses" style="display:none;">
          <div class="grid-2">
            ${(c.uses||[]).map((u,i)=>`
              <div class="card card-compact">
                <div style="font-size:1.5rem;margin-bottom:0.5rem;">${['⚡','🔋','📡','🔊','💡','🤖','🎚️','📱'][i%8]}</div>
                <div style="font-weight:600;">${u}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Colour Code tab (Resistor only) -->
        <div id="comp-tab-colour" style="display:none;">
          <div class="card">
            <h4 style="margin-bottom:1.25rem;">Resistor Colour Code Calculator</h4>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1.5rem;">
              ${[
                { label: 'Band 1', opts: ['Black(0)','Brown(1)','Red(2)','Orange(3)','Yellow(4)','Green(5)','Blue(6)','Violet(7)','Grey(8)','White(9)'], def: 4 },
                { label: 'Band 2', opts: ['Black(0)','Brown(1)','Red(2)','Orange(3)','Yellow(4)','Green(5)','Blue(6)','Violet(7)','Grey(8)','White(9)'], def: 7 },
                { label: 'Band 3 (Multiplier)', opts: ['Black(×1)','Brown(×10)','Red(×100)','Orange(×1k)','Yellow(×10k)','Green(×100k)','Blue(×1M)','Violet(×10M)'], def: 2 },
                { label: 'Band 4 (Tolerance)', opts: ['Brown(±1%)','Red(±2%)','Gold(±5%)','Silver(±10%)'], def: 2 },
              ].map((b,i)=>`
                <div style="flex:1;min-width:140px;">
                  <label style="font-size:0.8rem;color:var(--color-text-dim);display:block;margin-bottom:0.4rem;">${b.label}</label>
                  <select class="input" id="colour-band-${i}" onchange="calcColourCode()">
                    ${b.opts.map((opt, idx)=>`<option value="${idx}" ${idx===b.def?'selected':''}>${opt}</option>`).join('')}
                  </select>
                </div>
              `).join('')}
            </div>
            <div class="calc-result" id="colour-result">
              <div style="font-size:0.85rem;color:var(--color-text-muted);">Calculated Resistance</div>
              <div class="value" id="colour-value">4.7 kΩ ±5%</div>
            </div>
            <!-- Colour chart -->
            <div style="margin-top:1.5rem;">
              <h5 style="margin-bottom:0.75rem;">Quick Reference</h5>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:0.5rem;">
                ${[['Black','#000','0','1'],['Brown','#92400e','1','10'],['Red','#dc2626','2','100'],['Orange','#ea580c','3','1k'],['Yellow','#ca8a04','4','10k'],['Green','#16a34a','5','100k'],['Blue','#2563eb','6','1M'],['Violet','#7c3aed','7',''],['Grey','#6b7280','8',''],['White','#f9fafb','9','']].map(([name,col,dig,mult])=>`
                  <div style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0.6rem;border-radius:4px;border:1px solid var(--color-border);">
                    <div style="width:24px;height:14px;border-radius:2px;background:${col};border:1px solid rgba(255,255,255,0.1);"></div>
                    <span style="font-size:0.78rem;">${name} = ${dig}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  window.switchCompTab = (tab, btn) => {
    document.querySelectorAll('#comp-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    ['specs','working','uses','colour'].forEach(t => {
      const el = document.getElementById(`comp-tab-${t}`);
      if(el) el.style.display = t===tab ? 'block' : 'none';
    });
  };

  window.calcColourCode = () => {
    const b1 = parseInt(document.getElementById('colour-band-0')?.value || '0', 10);
    const b2 = parseInt(document.getElementById('colour-band-1')?.value || '0', 10);
    const multIdx = parseInt(document.getElementById('colour-band-2')?.value || '0', 10);
    const tolSel = document.getElementById('colour-band-3');
    const tolText = tolSel ? tolSel.options[tolSel.selectedIndex].text.match(/\(([^)]+)\)/)?.[1] || '±5%' : '±5%';
    const val = (b1 * 10 + b2) * Math.pow(10, multIdx);
    const formatted = val >= 1e6 ? `${+(val/1e6).toFixed(2)} MΩ` : val >= 1000 ? `${+(val/1000).toFixed(2)} kΩ` : `${val} Ω`;
    const resEl = document.getElementById('colour-value');
    if (resEl) resEl.textContent = `${formatted} ${tolText}`;
  };
}
