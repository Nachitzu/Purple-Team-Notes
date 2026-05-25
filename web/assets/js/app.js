// ─────────────────────────────────────────────────────────────────────────────
// Purple Team Notes — Static Site JS
// Fetches markdown files from the repo, parses frontmatter, renders search/nav
// ─────────────────────────────────────────────────────────────────────────────

const REPO_BASE = 'https://raw.githubusercontent.com/Nachitzu/Purple-Team-Notes/main';
const BRANCH = 'main';

// ── State ───────────────────────────────────────────────────────────────────
let allNotes = [];
let activeFilter = 'all';
let activePhase = null;
let activePlatform = null;
let activeRisk = null;
let searchQuery = '';
let darkMode = true;

// ── Phase / section mapping ─────────────────────────────────────────────────
const PHASES = [
  { id: 'recon',            label: '01 — Recon',        icon: '🔍', color: 'recon' },
  { id: 'exploracion',      label: '02 — Exploración',  icon: '🗺️', color: 'exploracion' },
  { id: 'explotacion',      label: '03 — Explotación',  icon: '💥', color: 'explotacion' },
  { id: 'post-explotacion', label: '04 — Post-Explotación', icon: '🎯', color: 'post-explotacion' },
  { id: 'blue-team',        label: '05 — Blue Team',    icon: '🛡️', color: 'blue-team' },
  { id: 'oneliners',        label: '06 — One-liners',   icon: '⚡', color: 'oneliners' },
  { id: 'tools',            label: '07 — Herramientas', icon: '🔧', color: 'tools' },
  { id: 'purple-exercises',  label: '08 — Purple Exercises', icon: '🔷', color: 'purple-exercises' },
  { id: 'threat-intel',      label: '09 — Threat Intel', icon: '🧠', color: 'threat-intel' },
  { id: 'attack-mapping',   label: '10 — ATT&CK',       icon: '📊', color: 'attack-mapping' },
  { id: 'notes',            label: '99 — Notas',         icon: '📋', color: 'notes' },
];

const PLATFORMS = ['linux', 'windows', 'web', 'ad', 'cloud', 'multi'];
const RISKS    = ['critical', 'high', 'medium', 'low'];

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  darkMode = localStorage.getItem('ptn-theme') !== 'light';
  applyTheme();

  await buildSidebar();
  await loadAllNotes();
  renderNotes();
  setupEventListeners();
});

// ── Theme ──────────────────────────────────────────────────────────────────
function applyTheme() {
  document.documentElement.classList.toggle('dark', darkMode);
  document.body.classList.toggle('dark', darkMode);
  document.body.classList.toggle('bg-[#0d1117]', darkMode);
  document.body.classList.toggle('bg-[#f0f6fc]', !darkMode);
}

function toggleTheme() {
  darkMode = !darkMode;
  localStorage.setItem('ptn-theme', darkMode ? 'dark' : 'light');
  applyTheme();
}

// ── Sidebar ─────────────────────────────────────────────────────────────────
async function buildSidebar() {
  const phaseNav  = document.getElementById('phaseNav');
  const platNav   = document.getElementById('platformNav');
  const riskNav   = document.getElementById('riskNav');

  PHASES.forEach(p => {
    phaseNav.innerHTML += `<li>
      <button onclick="setPhase('${p.id}')" data-phase="${p.id}"
        class="sidebar-link w-full text-left px-3 py-1.5 rounded text-sm hover:bg-[#21262d] transition-colors">
        ${p.icon} ${p.label}
      </button>
    </li>`;
  });

  PLATFORMS.forEach(plat => {
    platNav.innerHTML += `<li>
      <button onclick="setPlatform('${plat}')" data-platform="${plat}"
        class="sidebar-link w-full text-left px-3 py-1.5 rounded text-sm hover:bg-[#21262d] transition-colors capitalize">
        ${plat}
      </button>
    </li>`;
  });

  RISKS.forEach(risk => {
    const labels = { critical: '⚫ Critical', high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' };
    riskNav.innerHTML += `<li>
      <button onclick="setRisk('${risk}')" data-risk="${risk}"
        class="sidebar-link w-full text-left px-3 py-1.5 rounded text-sm hover:bg-[#21262d] transition-colors capitalize">
        ${labels[risk]} ${risk}
      </button>
    </li>`;
  });
}

// ── Fetch notes from repo ───────────────────────────────────────────────────
async function loadAllNotes() {
  // Directory -> file list
  const dirs = [
    '00-template',
    '01-recon',
    '02-exploracion',
    '03-explotacion',
    '04-post-explotacion',
    '05-blue-team/detection-engineering',
    '05-blue-team/incident-response',
    '06-oneliners',
    '07-tools',
    '08-purple-exercises',
    '09-threat-intel',
    '10-attack-mapping',
    '99-notes',
  ];

  const files = [
    'README.md',
    'Purple-team-notes.md',
  ];

  // Build list of all files to fetch
  const toFetch = [];
  for (const dir of dirs) {
    toFetch.push({ dir, file: 'index.json', isDir: true });
  }

  let noteList = [];
  try {
    const idxRes = await fetch(`${REPO_BASE}/web/content/notes-index.json?timestamp=${Date.now()}`);
    if (idxRes.ok) {
      noteList = await idxRes.json();
    }
  } catch {}

  if (noteList.length === 0) {
    // Fallback: hardcoded list from known repo structure
    noteList = buildNoteList();
  }

  // Fetch in batches to avoid flooding
  const batchSize = 10;
  for (let i = 0; i < noteList.length; i += batchSize) {
    const batch = noteList.slice(i, i + batchSize);
    await Promise.all(batch.map(n => fetchNote(n)));
  }
}

function buildNoteList() {
  return [
    { path: 'README.md',                    phase: 'meta',    platform: 'multi',   risk: 'low',      title: 'README' },
    { path: 'Purple-team-notes.md',           phase: 'meta',    platform: 'multi',   risk: 'low',      title: 'Master Document' },
    { path: '00-template/cheat-sheet-template.md', phase: 'template', platform: 'multi', risk: 'low', title: 'Cheat Sheet Template' },
    { path: '00-template/detection-template.md',   phase: 'template', platform: 'multi', risk: 'low', title: 'Detection Template' },
    { path: '00-template/exercise-template.md',  phase: 'template', platform: 'multi', risk: 'low', title: 'Exercise Template' },
    { path: '00-template/incident-template.md',  phase: 'template', platform: 'multi', risk: 'low', title: 'Incident Template' },
    { path: '01-recon/passive-recon.md',   phase: 'recon',   platform: 'multi',  risk: 'low',    title: 'Passive Recon' },
    { path: '01-recon/active-recon.md',   phase: 'recon',   platform: 'multi',  risk: 'medium',  title: 'Active Recon' },
    { path: '01-recon/dns.md',            phase: 'recon',   platform: 'multi',  risk: 'medium',  title: 'DNS Enumeration' },
    { path: '01-recon/subdomains.md',     phase: 'recon',   platform: 'web',    risk: 'medium',  title: 'Subdomain Enumeration' },
    { path: '01-recon/osint.md',          phase: 'recon',   platform: 'multi',  risk: 'low',     title: 'OSINT' },
    { path: '01-recon/screenshots.md',    phase: 'recon',   platform: 'web',    risk: 'low',     title: 'Screenshot Recon' },
    { path: '02-exploracion/port-scanning.md', phase: 'exploracion', platform: 'multi', risk: 'medium', title: 'Port Scanning' },
    { path: '02-exploracion/web-enum.md', phase: 'exploracion', platform: 'web',   risk: 'medium',  title: 'Web Enumeration' },
    { path: '02-exploracion/smb-enum.md', phase: 'exploracion', platform: 'ad',    risk: 'high',    title: 'SMB Enumeration' },
    { path: '02-exploracion/ldap-enum.md', phase: 'exploracion', platform: 'ad',   risk: 'high',    title: 'LDAP Enumeration' },
    { path: '02-exploracion/snmp-enum.md', phase: 'exploracion', platform: 'linux', risk: 'medium',  title: 'SNMP Enumeration' },
    { path: '02-exploracion/ftp-ssh-rdp-winrm.md', phase: 'exploracion', platform: 'multi', risk: 'high', title: 'FTP/SSH/RDP/WinRM' },
    { path: '02-exploracion/ad-enum.md',  phase: 'exploracion', platform: 'ad',   risk: 'high',    title: 'AD Enumeration' },
    { path: '03-explotacion/web-common.md', phase: 'explotacion', platform: 'web', risk: 'high',    title: 'Web Vulnerabilities' },
    { path: '03-explotacion/file-upload.md', phase: 'explotacion', platform: 'web', risk: 'critical',title: 'File Upload' },
    { path: '03-explotacion/lfi-rfi.md',  phase: 'explotacion', platform: 'web', risk: 'high',    title: 'LFI / RFI' },
    { path: '03-explotacion/sqli.md',    phase: 'explotacion', platform: 'web', risk: 'critical',title: 'SQL Injection' },
    { path: '03-explotacion/xss.md',     phase: 'explotacion', platform: 'web', risk: 'high',    title: 'XSS' },
    { path: '03-explotacion/deserialization.md', phase: 'explotacion', platform: 'web', risk: 'critical', title: 'Deserialization' },
    { path: '03-explotacion/ad-abuse.md', phase: 'explotacion', platform: 'ad',   risk: 'critical',title: 'AD Abuse' },
    { path: '04-post-explotacion/credentials.md',    phase: 'post-explotacion', platform: 'multi', risk: 'critical', title: 'Credentials' },
    { path: '04-post-explotacion/linux-privesc.md', phase: 'post-explotacion', platform: 'linux', risk: 'high', title: 'Linux Privesc' },
    { path: '04-post-explotacion/windows-privesc.md',phase: 'post-explotacion', platform: 'windows', risk: 'high', title: 'Windows Privesc' },
    { path: '04-post-explotacion/pivoting-tunneling.md', phase: 'post-explotacion', platform: 'multi', risk: 'high', title: 'Pivoting & Tunneling' },
    { path: '04-post-explotacion/persistence.md', phase: 'post-explotacion', platform: 'multi', risk: 'critical', title: 'Persistence' },
    { path: '04-post-explotacion/lateral-movement.md', phase: 'post-explotacion', platform: 'multi', risk: 'high', title: 'Lateral Movement' },
    { path: '04-post-explotacion/data-collection.md', phase: 'post-explotacion', platform: 'multi', risk: 'critical', title: 'Data Collection & Exfil' },
    { path: '05-blue-team/windows-events.md', phase: 'blue-team', platform: 'windows', risk: 'low', title: 'Windows Events' },
    { path: '05-blue-team/sysmon.md',       phase: 'blue-team', platform: 'windows', risk: 'low', title: 'Sysmon' },
    { path: '05-blue-team/linux-logs.md',   phase: 'blue-team', platform: 'linux',   risk: 'low', title: 'Linux Logging' },
    { path: '05-blue-team/web-logs.md',     phase: 'blue-team', platform: 'web',    risk: 'low', title: 'Web Server Logs' },
    { path: '05-blue-team/sigma-rules.md',  phase: 'blue-team', platform: 'multi',   risk: 'medium', title: 'Sigma Rules' },
    { path: '05-blue-team/yara.md',         phase: 'blue-team', platform: 'multi',   risk: 'medium', title: 'YARA Rules' },
    { path: '05-blue-team/triage.md',       phase: 'blue-team', platform: 'multi',  risk: 'medium', title: 'Endpoint Triage' },
    { path: '05-blue-team/threat-hunting.md',phase: 'blue-team', platform: 'multi',  risk: 'medium', title: 'Threat Hunting' },
    { path: '05-blue-team/hardening.md',    phase: 'blue-team', platform: 'multi',  risk: 'medium', title: 'Hardening' },
    { path: '05-blue-team/detection-engineering/lifecycle.md', phase: 'blue-team', platform: 'multi', risk: 'medium', title: 'Detection Lifecycle' },
    { path: '05-blue-team/detection-engineering/quality-checks.md',phase:'blue-team',platform:'multi',risk:'medium',title:'Quality Checks' },
    { path: '05-blue-team/detection-engineering/testing.md', phase:'blue-team', platform:'multi', risk:'medium', title:'Detection Testing' },
    { path: '05-blue-team/detection-engineering/detection-debt.md', phase:'blue-team',platform:'multi',risk:'medium',title:'Detection Debt' },
    { path: '05-blue-team/incident-response/irp-overview.md', phase:'blue-team',platform:'multi',risk:'high',title:'IR Overview' },
    { path: '05-blue-team/incident-response/ransomware-playbook.md',phase:'blue-team',platform:'windows',risk:'critical',title:'Ransomware Playbook' },
    { path: '05-blue-team/incident-response/credential-compromise.md',phase:'blue-team',platform:'multi',risk:'high',title:'Credential Compromise' },
    { path: '05-blue-team/incident-response/webshell-playbook.md', phase:'blue-team',platform:'multi',risk:'critical',title:'Webshell Playbook' },
    { path: '06-oneliners/bash.md',         phase: 'oneliners', platform: 'linux',   risk: 'medium', title: 'Bash One-liners' },
    { path: '06-oneliners/powershell.md',   phase: 'oneliners', platform: 'windows', risk: 'medium', title: 'PowerShell One-liners' },
    { path: '06-oneliners/python.md',       phase: 'oneliners', platform: 'multi',   risk: 'medium', title: 'Python One-liners' },
    { path: '06-oneliners/jq.md',           phase: 'oneliners', platform: 'linux',   risk: 'low',    title: 'JQ One-liners' },
    { path: '06-oneliners/awk-sed-grep.md', phase: 'oneliners', platform: 'linux',   risk: 'low',    title: 'AWK/SED/GREP One-liners' },
    { path: '07-tools/nmap.md',             phase: 'tools', platform: 'multi',      risk: 'medium', title: 'Nmap' },
    { path: '07-tools/rustscan.md',         phase: 'tools', platform: 'multi',      risk: 'medium', title: 'RustScan' },
    { path: '07-tools/ffuf.md',             phase: 'tools', platform: 'web',        risk: 'medium', title: 'FFUF' },
    { path: '07-tools/feroxbuster.md',      phase: 'tools', platform: 'web',        risk: 'medium', title: 'Feroxbuster' },
    { path: '07-tools/netexec.md',          phase: 'tools', platform: 'windows',     risk: 'high',   title: 'NetExec / CrackMapExec' },
    { path: '07-tools/impacket.md',         phase: 'tools', platform: 'windows',     risk: 'critical',title: 'Impacket' },
    { path: '07-tools/bloodhound.md',       phase: 'tools', platform: 'ad',         risk: 'critical',title: 'BloodHound' },
    { path: '07-tools/burp.md',             phase: 'tools', platform: 'web',        risk: 'medium', title: 'Burp Suite' },
    { path: '07-tools/responder.md',        phase: 'tools', platform: 'windows',    risk: 'high',   title: 'Responder' },
    { path: '07-tools/volatility.md',      phase: 'tools', platform: 'windows',    risk: 'high',   title: 'Volatility' },
    { path: '08-purple-exercises/framework.md', phase:'purple-exercises',platform:'multi',risk:'medium',title:'Purple Team Framework' },
    { path: '08-purple-exercises/planning.md', phase:'purple-exercises',platform:'multi',risk:'medium',title:'Exercise Planning' },
    { path: '08-purple-exercises/attack-to-detection.md',phase:'purple-exercises',platform:'multi',risk:'medium',title:'Attack to Detection' },
    { path: '08-purple-exercises/after-action-review.md',phase:'purple-exercises',platform:'multi',risk:'medium',title:'After Action Review' },
    { path: '08-purple-exercises/retesting.md',phase:'purple-exercises',platform:'multi',risk:'medium',title:'Retesting' },
    { path: '09-threat-intel/cti-to-ttp.md',  phase:'threat-intel',platform:'multi',risk:'medium',title:'CTI to TTPs' },
    { path: '09-threat-intel/adversary-emulation.md',phase:'threat-intel',platform:'multi',risk:'high',title:'Adversary Emulation' },
    { path: '09-threat-intel/actor-profiling.md',phase:'threat-intel',platform:'multi',risk:'medium',title:'Actor Profiling' },
    { path: '09-threat-intel/prioritization.md',phase:'threat-intel',platform:'multi',risk:'medium',title:'Threat Intel Prioritization' },
    { path: '10-attack-mapping/mitre-attack-basics.md',phase:'attack-mapping',platform:'multi',risk:'low',title:'MITRE ATT&CK Basics' },
    { path: '10-attack-mapping/tactic-technique-index.md',phase:'attack-mapping',platform:'multi',risk:'medium',title:'ATT&CK Index' },
    { path: '10-attack-mapping/coverage-matrix.md', phase:'attack-mapping',platform:'multi',risk:'medium',title:'Coverage Matrix' },
    { path: '10-attack-mapping/atomic-tests.md',  phase:'attack-mapping',platform:'multi',risk:'medium',title:'Atomic Red Team' },
    { path: '99-notes/methodology.md',   phase: 'notes', platform: 'multi', risk: 'low', title: 'Methodology' },
    { path: '99-notes/reporting.md',     phase: 'notes', platform: 'multi', risk: 'low', title: 'Reporting' },
    { path: '99-notes/opsec.md',         phase: 'notes', platform: 'multi', risk: 'medium',title: 'OPSEC' },
    { path: '99-notes/governance.md',    phase: 'notes', platform: 'multi', risk: 'low', title: 'Governance' },
    { path: '99-notes/metrics-maturity.md', phase:'notes',platform:'multi', risk:'medium',title:'Metrics & Maturity' },
    { path: '99-notes/web-architecture.md', phase:'notes',platform:'multi', risk:'low', title:'Web Architecture' },
    { path: '99-notes/content-style-guide.md',phase:'notes',platform:'multi',risk:'low',title:'Content Style Guide' },
  ];
}

async function fetchNote(meta) {
  try {
    const res = await fetch(`${REPO_BASE}/${meta.path}?timestamp=${Date.now()}`);
    if (!res.ok) return;
    const raw = await res.text();
    const parsed = parseFrontmatter(raw, meta);
    allNotes.push(parsed);
  } catch (e) {
    // Silently skip failed fetches
  }
}

// ── Frontmatter parser ──────────────────────────────────────────────────────
function parseFrontmatter(raw, meta) {
  const fm = {};
  const lines = raw.split('\n');
  let bodyStart = 0;

  if (lines[0].trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        bodyStart = i + 1;
        break;
      }
      const colonIdx = lines[i].indexOf(':');
      if (colonIdx > 0) {
        const key   = lines[i].slice(0, colonIdx).trim();
        const value = lines[i].slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
        fm[key] = value;
      }
    }
  }

  const body = lines.slice(bodyStart).join('\n').trim();

  return {
    path:         meta.path,
    title:        fm.title || meta.title || meta.path.split('/').pop().replace('.md', ''),
    phase:        fm.phase        || meta.phase,
    platform:     fm.platform      || meta.platform,
    risk:         fm.risk         || meta.risk,
    tags:         fm.tags         || '',
    attack_tactic:fm.attack_tactic|| '',
    attack_technique: fm.attack_technique || '',
    data_sources: fm.data_sources || '',
    last_review:  fm.last_review  || '',
    body,
    raw,
  };
}

// ── Markdown renderer ───────────────────────────────────────────────────────
function renderMarkdown(md) {
  // Very lightweight markdown-to-HTML (avoid external deps)
  let html = md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre><code class="lang-${lang}">${escapeHtml(code.trim())}</code></pre>`)
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headings
    .replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Unordered lists
    .replace(/^[\-\*]\s+(.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    // Blockquote
    .replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>')
    // HR
    .replace(/^---$/gm, '<hr>')
    // Paragraphs (lines not already wrapped)
    .replace(/^(?!<[a-z]|$)(.+)$/gm, '<p>$1</p>');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`);
  // Wrap consecutive <p> in proper paragraphs
  // Clean up extra blank paragraphs
  html = html.replace(/<p><\/p>/g, '');
  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Filter logic ────────────────────────────────────────────────────────────
function getFiltered() {
  return allNotes.filter(n => {
    if (n.phase === 'meta' || n.phase === 'template') return false;
    if (activeFilter !== 'all' && n.phase !== activeFilter) return false;
    if (activePhase   && n.phase    !== activePhase)     return false;
    if (activePlatform && !matchPlatform(n.platform, activePlatform)) return false;
    if (activeRisk    && n.risk     !== activeRisk)       return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const hay = [n.title, n.tags, n.phase, n.platform, n.body]
        .join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function matchPlatform(plat, filter) {
  if (!plat) return false;
  const p = Array.isArray(plat) ? plat : [plat];
  return p.some(x => x.toLowerCase().includes(filter.toLowerCase()));
}

// ── Render ──────────────────────────────────────────────────────────────────
function renderNotes() {
  const grid      = document.getElementById('notesGrid');
  const detail    = document.getElementById('noteDetail');
  const hero      = document.getElementById('heroSection');
  const empty     = document.getElementById('emptyState');

  if (detail.classList.contains('hidden') === false) return; // Don't overwrite open note

  hero.classList.toggle('hidden', searchQuery || activePhase || activePlatform || activeRisk || activeFilter !== 'all');

  const notes = getFiltered();

  if (notes.length === 0) {
    grid.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.classList.remove('hidden');

  grid.innerHTML = notes.map(n => `
    <div class="note-card" onclick="openNote('${encodeURIComponent(n.path)}')">
      <div class="flex items-start justify-between mb-2">
        <h3 class="font-semibold text-sm leading-tight text-[#e6edf3]">${n.title}</h3>
        ${n.risk && n.risk !== 'low' ? `<span class="tag-sm risk-${n.risk} capitalize ml-2 flex-shrink-0">${n.risk}</span>` : ''}
      </div>
      <div class="flex flex-wrap gap-1 mb-2">
        <span class="tag-sm phase-${n.phase}">${phaseLabel(n.phase)}</span>
        ${platformBadge(n.platform)}
      </div>
      <div class="text-xs text-gray-500 line-clamp-2 leading-relaxed">
        ${snippet(n.body)}
      </div>
      ${n.attack_technique ? `<div class="mt-2 text-xs font-mono text-purple-400">${n.attack_tactic ? n.attack_tactic + ' / ' : ''}${n.attack_technique}</div>` : ''}
    </div>
  `).join('');
}

function phaseLabel(phase) {
  const map = {
    'recon':'Recon','exploracion':'Exploración','explotacion':'Explotación',
    'post-explotacion':'Post-Exploit','blue-team':'Blue Team','oneliners':'One-liners',
    'tools':'Tools','purple-exercises':'Purple','threat-intel':'Threat Intel',
    'attack-mapping':'ATT&CK','notes':'Notas','template':'Template','meta':'Meta',
  };
  return map[phase] || phase;
}

function platformBadge(plat) {
  if (!plat) return '';
  const plats = Array.isArray(plat) ? plat : [plat];
  return plats.map(p => `<span class="tag-sm bg-[#21262d] text-gray-300 border border-[#30363d] capitalize">${p}</span>`).join('');
}

function snippet(body, len = 100) {
  const text = body.replace(/[#*`>\-\[\]()]/g, '').replace(/\n/g, ' ').trim();
  return text.length > len ? text.slice(0, len) + '…' : text;
}

// ── Note detail view ────────────────────────────────────────────────────────
async function openNote(encodedPath) {
  const path = decodeURIComponent(encodedPath);
  const note = allNotes.find(n => n.path === path);
  if (!note) return;

  document.getElementById('heroSection').classList.add('hidden');
  document.getElementById('notesGrid').classList.add('hidden');
  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('noteDetail').classList.remove('hidden');

  window.scrollTo(0, 0);

  const content = document.getElementById('noteContent');
  content.innerHTML = renderNoteHTML(note);

  // Highlight code blocks with simple styling
  content.querySelectorAll('pre code').forEach(block => {
    block.parentElement.style.overflowX = 'auto';
  });
}

function renderNoteHTML(note) {
  const fmHtml = `
  <div class="frontmatter">
    <div class="frontmatter-grid">
      ${note.title       ? `<div class="frontmatter-item"><span class="frontmatter-label">Title</span><span class="frontmatter-value">${note.title}</span></div>` : ''}
      ${note.phase       ? `<div class="frontmatter-item"><span class="frontmatter-label">Phase</span><span class="frontmatter-value phase-${note.phase}">${phaseLabel(note.phase)}</span></div>` : ''}
      ${note.platform    ? `<div class="frontmatter-item"><span class="frontmatter-label">Platform</span><span class="frontmatter-value capitalize">${Array.isArray(note.platform)?note.platform.join(', '):note.platform}</span></div>` : ''}
      ${note.risk        ? `<div class="frontmatter-item"><span class="frontmatter-label">Risk</span><span class="frontmatter-value risk-${note.risk} capitalize">${note.risk}</span></div>` : ''}
      ${note.attack_tactic ? `<div class="frontmatter-item"><span class="frontmatter-label">Tactic</span><span class="frontmatter-value">${note.attack_tactic}</span></div>` : ''}
      ${note.attack_technique ? `<div class="frontmatter-item"><span class="frontmatter-label">Technique</span><span class="frontmatter-value">${note.attack_technique}</span></div>` : ''}
      ${note.data_sources ? `<div class="frontmatter-item"><span class="frontmatter-label">Data Sources</span><span class="frontmatter-value">${note.data_sources}</span></div>` : ''}
      ${note.last_review  ? `<div class="frontmatter-item"><span class="frontmatter-label">Last Review</span><span class="frontmatter-value">${note.last_review}</span></div>` : ''}
    </div>
  </div>`;

  return fmHtml + renderMarkdown(note.body);
}

function closeNote() {
  document.getElementById('noteDetail').classList.add('hidden');
  document.getElementById('heroSection').classList.remove('hidden');
  document.getElementById('notesGrid').classList.remove('hidden');
  renderNotes();
}

// ── Event listeners ─────────────────────────────────────────────────────────
function setupEventListeners() {
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderNotes();
  });

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeFilter = chip.dataset.filter;
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      clearOtherFilters();
      renderNotes();
    });
  });
}

function setPhase(phase) {
  activePhase = activePhase === phase ? null : phase;
  clearOtherFilters();
  document.querySelectorAll('[data-phase]').forEach(b => {
    b.classList.toggle('bg-[#21262d]', b.dataset.phase === activePhase);
    b.classList.toggle('text-white', b.dataset.phase === activePhase);
  });
  renderNotes();
}

function setPlatform(plat) {
  activePlatform = activePlatform === plat ? null : plat;
  clearOtherFilters();
  document.querySelectorAll('[data-platform]').forEach(b => {
    b.classList.toggle('bg-[#21262d]', b.dataset.platform === activePlatform);
    b.classList.toggle('text-white', b.dataset.platform === activePlatform);
  });
  renderNotes();
}

function setRisk(risk) {
  activeRisk = activeRisk === risk ? null : risk;
  clearOtherFilters();
  document.querySelectorAll('[data-risk]').forEach(b => {
    b.classList.toggle('bg-[#21262d]', b.dataset.risk === activeRisk);
    b.classList.toggle('text-white', b.dataset.risk === activeRisk);
  });
  renderNotes();
}

function clearOtherFilters() {
  activeFilter = 'all';
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.filter === 'all');
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');
}

// Keyboard shortcut: Escape closes note / clears search
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!document.getElementById('noteDetail').classList.contains('hidden')) {
      closeNote();
    } else if (searchQuery) {
      document.getElementById('searchInput').value = '';
      searchQuery = '';
      renderNotes();
    }
  }
});
