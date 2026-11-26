// ============================================================
// LAB MATE – Application Core
// Router, state, utilities, shared components
// ============================================================

// ── State ─────────────────────────────────────────────────
const State = {
  currentPage: 'home',
  currentLesson: null,
  currentComponent: null,
  currentExperiment: null,
  currentQuiz: null,
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  bookmarks: JSON.parse(localStorage.getItem('lm_bookmarks') || '[]'),
  progress: JSON.parse(localStorage.getItem('lm_progress') || '{}'),
  chatHistory: [],
  calcId: 'ohms-law',
  user: JSON.parse(localStorage.getItem('lm_auth_user') || 'null') || { name: 'Guest', level: 'Beginner', streak: 7, xp: 1240, avatar: '👨‍💻', provider: null, email: null },
};

// ── Router ────────────────────────────────────────────────
function navigate(pageId, params = {}) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.topnav-link, .sidebar-link').forEach(l => l.classList.remove('active'));

  const page = document.getElementById(`page-${pageId}`);
  if (!page) return;
  page.classList.add('active');
  State.currentPage = pageId;

  document.querySelectorAll(`[data-nav="${pageId}"]`).forEach(l => l.classList.add('active'));

  // Run page init
  const inits = {
    home: renderHome,
    dashboard: renderDashboard,
    learn: renderLearn,
    lesson: () => renderLesson(params.id),
    components: renderComponents,
    component: () => renderComponent(params.id),
    'circuit-studio': renderCircuitStudio,
    sandbox: renderSandbox,
    'virtual-lab': renderVirtualLab,
    experiment: () => renderExperiment(params.id),
    'ask-lab-mate': renderAIChat,
    practice: renderPractice,
    projects: renderProjects,
  };
  if (inits[pageId]) inits[pageId]();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Utils ─────────────────────────────────────────────────
const utils = {
  levelColor: (level) => ({
    'Beginner':     'badge-green',
    'Intermediate': 'badge-amber',
    'Advanced':     'badge-red',
  }[level] || 'badge-slate'),

  categoryColor: (cat) => {
    const map = { 'Passive':'badge-blue', 'Active':'badge-purple', 'Semiconductor':'badge-amber',
                  'Sensors':'badge-cyan', 'Embedded':'badge-green', 'Electromechanical':'badge-red',
                  'Connectivity':'badge-amber', 'Power':'badge-amber' };
    return map[cat] || 'badge-slate';
  },

  toggleBookmark(id) {
    const idx = State.bookmarks.indexOf(id);
    if (idx === -1) { State.bookmarks.push(id); showToast('Bookmarked! ⭐', 'success'); }
    else { State.bookmarks.splice(idx, 1); showToast('Bookmark removed', 'info'); }
    localStorage.setItem('lm_bookmarks', JSON.stringify(State.bookmarks));
    return idx === -1;
  },

  isBookmarked: (id) => State.bookmarks.includes(id),

  markProgress(id) {
    State.progress[id] = true;
    localStorage.setItem('lm_progress', JSON.stringify(State.progress));
  },

  getProgress: (id) => !!State.progress[id],

  progressCount(subject) {
    const subj = DATA.subjects.find(s => s.id === subject);
    if (!subj) return 0;
    return subj.topics.filter(t => utils.getProgress(t.id)).length;
  },

  highlight(text, query) {
    if (!query) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark style="background:rgba(59,130,246,0.3);border-radius:2px;padding:0 2px;">$1</mark>');
  },
};

// ── Toast ──────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const icon = { success: '✅', info: 'ℹ️', warn: '⚠️' }[type] || 'ℹ️';
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'none'; toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ── SVG Icons (inline) ─────────────────────────────────────
const icons = {
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  home: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  book: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  chip: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="6" height="6"/><path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2M3 3h4M17 3h4M3 21h4M17 21h4"/></svg>`,
  circuit: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="4" height="12" rx="1"/><rect x="18" y="6" width="4" height="12" rx="1"/><line x1="6" y1="9" x2="18" y2="9"/><line x1="6" y1="15" x2="18" y2="15"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/></svg>`,
  beaker: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3H15M6 3h12M9 3v10l-3 7h12l-3-7V3"/></svg>`,
  bot: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 11V5"/><circle cx="12" cy="4" r="1"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/><path d="M7 11V9a5 5 0 0 1 10 0v2"/></svg>`,
  puzzle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z"/></svg>`,
  rocket: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  bookmark: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  star: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  x: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  arrow_right: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  arrow_left: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m7 7-7-7 7-7"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  dashboard: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  user: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  settings: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  send: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  external: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  zap: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  flask: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6m-6 0v7l-7 11h18L13 10V3M9 3"/></svg>`,
  calculator: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="16" y2="18"/></svg>`,
  fire: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
};

// ── Global Search ──────────────────────────────────────────
function setupSearch() {
  const input = document.getElementById('global-search-input');
  const results = document.getElementById('search-results');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q || q.length < 2) { results.style.display = 'none'; return; }

    const matches = [];
    DATA.components.forEach(c => {
      if (c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
        matches.push({ type: 'Component', name: c.name, page: 'component', params: { id: c.id }, icon: '🔧' });
    });
    DATA.subjects.forEach(s => {
      s.topics.forEach(t => {
        if (t.title.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
          matches.push({ type: 'Lesson', name: t.title, sub: s.name, page: 'lesson', params: { id: t.id }, icon: '📖' });
      });
    });
    DATA.experiments.forEach(e => {
      if (e.name.toLowerCase().includes(q))
        matches.push({ type: 'Experiment', name: e.name, page: 'experiment', params: { id: e.id }, icon: '🔬' });
    });
    DATA.circuits.forEach(c => {
      if (c.name.toLowerCase().includes(q))
        matches.push({ type: 'Circuit', name: c.name, page: 'circuit-studio', icon: '〰️' });
    });

    if (matches.length === 0) {
      results.innerHTML = `<div style="padding:1rem;color:var(--color-text-dim);text-align:center;">No results for "${q}"</div>`;
    } else {
      results.innerHTML = matches.slice(0, 6).map(m => `
        <div class="search-result-item" style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;cursor:pointer;border-bottom:1px solid var(--color-border);" onmouseover="this.style.background='var(--color-bg-elevated)'" onmouseout="this.style.background='transparent'" onclick="navigate('${m.page}', ${JSON.stringify(m.params || {}).replace(/"/g, '&quot;')}); document.getElementById('search-results').style.display='none'; document.getElementById('global-search-input').value='';">
          <span style="font-size:1.1rem;">${m.icon}</span>
          <div>
            <div style="font-size:0.875rem;font-weight:500;">${utils.highlight(m.name, q)}</div>
            <div style="font-size:0.75rem;color:var(--color-text-dim);">${m.type}${m.sub ? ' · ' + m.sub : ''}</div>
          </div>
        </div>
      `).join('');
    }
    results.style.display = 'block';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#search-wrapper')) results.style.display = 'none';
  });
}

// ── Theme Toggle (Dark / Light Mode) ───────────────────────
function initTheme() {
  const saved = localStorage.getItem('lm_theme') || 'dark';
  document.body.classList.toggle('light-theme', saved === 'light');
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = saved === 'light' ? '🌙' : '☀️';
}

window.toggleTheme = () => {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('lm_theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = isLight ? '🌙' : '☀️';
  showToast(isLight ? 'Light Mode enabled ☀️' : 'Dark Mode enabled 🌙', 'info');
};

// ── Gmail & GitHub Account Login System ────────────────────
function updateAuthUI() {
  const btn = document.getElementById('auth-nav-btn');
  if (!btn) return;
  if (State.user && State.user.provider) {
    const badge = State.user.provider === 'gmail' ? 'G' : '🐙';
    btn.innerHTML = `<span style="font-weight:800;">${badge}</span> ${State.user.name}`;
    btn.title = `Signed in via ${State.user.provider.toUpperCase()} (${State.user.email || State.user.handle})`;
  } else {
    btn.innerHTML = '🔑 Login';
    btn.title = 'Sign in with Gmail or GitHub';
  }
}

window.openAuthModal = () => {
  const existing = document.getElementById('auth-modal-overlay');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'auth-modal-overlay';
  modal.className = 'modal-overlay';

  if (State.user && State.user.provider) {
    modal.innerHTML = `
      <div class="modal" style="max-width:440px;">
        <div class="modal-header">
          <h3>👤 Account Profile</h3>
          <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-ghost">${icons.x}</button>
        </div>
        <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:var(--color-bg-elevated);border-radius:var(--radius-md);margin-bottom:1.25rem;">
          ${State.user.avatarUrl
            ? `<img src="${State.user.avatarUrl}" alt="Avatar" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid var(--color-primary);">`
            : `<div style="width:52px;height:52px;border-radius:50%;background:var(--color-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:800;">${State.user.name.charAt(0).toUpperCase()}</div>`
          }
          <div>
            <div style="font-weight:700;font-size:1.05rem;">${State.user.name}</div>
            <div style="font-size:0.82rem;color:var(--color-text-muted);">${State.user.email || '@' + State.user.handle}</div>
            <span class="badge ${State.user.provider === 'gmail' ? 'badge-red' : 'badge-purple'}" style="margin-top:0.35rem;">
              Connected via ${State.user.provider === 'gmail' ? 'Google (Gmail)' : 'GitHub'}
            </span>
          </div>
        </div>
        <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
          <button class="btn btn-primary" style="background:var(--color-red);" onclick="logoutUser()">Sign Out</button>
        </div>
      </div>
    `;
  } else {
    modal.innerHTML = `
      <div class="modal" style="max-width:460px;">
        <div class="modal-header">
          <div>
            <h3 style="margin-bottom:0.2rem;">🔑 Sign In to Lab Mate</h3>
            <p style="font-size:0.82rem;margin:0;color:var(--color-text-muted);">Sync your bookmarks, progress, and circuits</p>
          </div>
          <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-ghost">${icons.x}</button>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.25rem;">
          <button class="btn btn-secondary" id="tab-auth-gmail" onclick="switchAuthTab('gmail')" style="justify-content:center;border-color:var(--color-primary);background:var(--color-primary-glow);">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 11v3.8h5.3c-.2 1.2-1.4 3.6-5.3 3.6-3.2 0-5.8-2.6-5.8-5.9s2.6-5.9 5.8-5.9c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.6 4.1 14.5 3.2 12 3.2 7 3.2 3 7.2 3 12.2s4 9 9 9c5.2 0 8.6-3.6 8.6-8.8 0-.6-.1-1-.2-1.4H12z"/></svg>
            Gmail
          </button>
          <button class="btn btn-secondary" id="tab-auth-github" onclick="switchAuthTab('github')" style="justify-content:center;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub
          </button>
        </div>

        <!-- Gmail Form -->
        <form id="auth-form-gmail" onsubmit="event.preventDefault(); loginWithGmail();">
          <div style="margin-bottom:0.85rem;">
            <label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Gmail Address</label>
            <input class="input" id="gmail-email" type="email" required placeholder="yourname@gmail.com">
          </div>
          <div style="margin-bottom:1.1rem;">
            <label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">Display Name</label>
            <input class="input" id="gmail-name" type="text" placeholder="e.g. Priyanshu">
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Continue with Gmail</button>
        </form>

        <!-- GitHub Form -->
        <form id="auth-form-github" style="display:none;" onsubmit="event.preventDefault(); loginWithGitHub();">
          <div style="margin-bottom:1.1rem;">
            <label style="font-size:0.8rem;color:var(--color-text-muted);display:block;margin-bottom:0.3rem;">GitHub Username</label>
            <input class="input" id="github-username" type="text" required placeholder="e.g. torvalds or octocat">
          </div>
          <button type="submit" id="github-submit-btn" class="btn btn-primary" style="width:100%;justify-content:center;">Continue with GitHub</button>
        </form>
      </div>
    `;
  }

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
};

window.switchAuthTab = (provider) => {
  const gForm = document.getElementById('auth-form-gmail');
  const ghForm = document.getElementById('auth-form-github');
  const gTab = document.getElementById('tab-auth-gmail');
  const ghTab = document.getElementById('tab-auth-github');
  if (!gForm || !ghForm) return;
  const isG = provider === 'gmail';
  gForm.style.display = isG ? 'block' : 'none';
  ghForm.style.display = isG ? 'none' : 'block';
  gTab.style.borderColor = isG ? 'var(--color-primary)' : 'var(--color-border)';
  gTab.style.background = isG ? 'var(--color-primary-glow)' : '';
  ghTab.style.borderColor = !isG ? 'var(--color-primary)' : 'var(--color-border)';
  ghTab.style.background = !isG ? 'var(--color-primary-glow)' : '';
};

window.loginWithGmail = () => {
  const email = document.getElementById('gmail-email')?.value.trim();
  const rawName = document.getElementById('gmail-name')?.value.trim();
  if (!email || !email.includes('@')) { showToast('Please enter a valid Gmail address', 'warn'); return; }
  const name = rawName || email.split('@')[0];
  State.user = { ...State.user, name, email, provider: 'gmail', avatarUrl: null, avatar: 'G' };
  localStorage.setItem('lm_auth_user', JSON.stringify(State.user));
  document.getElementById('auth-modal-overlay')?.remove();
  updateAuthUI();
  navigate(State.currentPage);
  showToast(`Signed in with Gmail as ${name} ✅`, 'success');
};

window.loginWithGitHub = async () => {
  const handle = document.getElementById('github-username')?.value.trim().replace(/^@/, '');
  if (!handle) { showToast('Please enter a GitHub username', 'warn'); return; }
  const btn = document.getElementById('github-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Connecting to GitHub…'; }
  let name = handle;
  let avatarUrl = null;
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(handle)}`);
    if (res.ok) {
      const data = await res.json();
      name = data.name || data.login || handle;
      avatarUrl = data.avatar_url || null;
    }
  } catch (_) { /* Offline fallback works seamlessly */ }
  State.user = { ...State.user, name, handle, email: `${handle}@users.noreply.github.com`, provider: 'github', avatarUrl, avatar: '🐙' };
  localStorage.setItem('lm_auth_user', JSON.stringify(State.user));
  document.getElementById('auth-modal-overlay')?.remove();
  updateAuthUI();
  navigate(State.currentPage);
  showToast(`Signed in with GitHub as @${handle} ✅`, 'success');
};

window.logoutUser = () => {
  localStorage.removeItem('lm_auth_user');
  State.user = { name: 'Guest', level: 'Beginner', streak: 7, xp: 1240, avatar: '👨‍💻', provider: null, email: null };
  document.getElementById('auth-modal-overlay')?.remove();
  updateAuthUI();
  navigate(State.currentPage);
  showToast('Signed out successfully', 'info');
};
