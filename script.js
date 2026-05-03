// script.js - Garden Journal Tracker
const PLANT_CARE_DB = {
  tomato: { water: "Consistent", waterLevel: 4, sun: "Full Sun", sunLevel: 5, start: "Start indoors 6-8 weeks before", spacing: "24-36 inches", tips: "Use cages." },
  cucumber: { water: "High", waterLevel: 5, sun: "Full Sun", sunLevel: 5, start: "Start indoors in biodegradable pots", spacing: "12 inches on trellis", tips: "Train on trellis." },
  zucchini: { water: "Moderate to High", waterLevel: 4, sun: "Full Sun", sunLevel: 5, start: "Start indoors", spacing: "36 inches", tips: "Limit to 2-4 plants." },
  squash: { water: "Moderate", waterLevel: 3, sun: "Full Sun", sunLevel: 5, start: "Start indoors", spacing: "36 inches", tips: "Allow space to spread." },
  lettuce: { water: "High", waterLevel: 4, sun: "Partial Sun", sunLevel: 3, start: "Direct sow", spacing: "6-8 inches", tips: "Succession sow." },
  spinach: { water: "Moderate", waterLevel: 3, sun: "Partial Sun", sunLevel: 3, start: "Direct sow", spacing: "4-6 inches", tips: "Harvest outer leaves." },
  arugula: { water: "Moderate", waterLevel: 3, sun: "Partial Sun", sunLevel: 3, start: "Direct sow or scatter", spacing: "6 inches", tips: "Fast growing." },
  carrot: { water: "Moderate", waterLevel: 3, sun: "Full Sun to Part Shade", sunLevel: 4, start: "Direct sow", spacing: "2-3 inches", tips: "Keep soil loose." }
};

const HERBS = [
  { name: 'Mojito Mint', type: 'herb', notes: 'Pot 1' }, { name: 'Rosemary', type: 'herb', notes: 'Pot 2' },
  { name: 'French Thyme', type: 'herb', notes: 'Pot 3' }, { name: 'Greek Oregano', type: 'herb', notes: 'Pot 3' },
  { name: 'Regular Sage', type: 'herb', notes: 'Pot 4' }, { name: 'Pineapple Sage', type: 'herb', notes: 'Pot 4' },
  { name: 'Basil', type: 'herb', notes: 'Pot 5' }, { name: 'Flat Parsley', type: 'herb', notes: 'Pot 5' },
  { name: 'Cilantro', type: 'herb', notes: 'Pot 6' }
];

const DEFAULT_PLANTS = [
  { id: 1, name: 'Pink Bumble Bee 1', variety: 'Pink Bumble Bee', type: 'tomato', plantDate: '2026-04-26', location: 'indoor', notes: '4" pot', createdAt: new Date().toISOString() },
  { id: 2, name: 'Cucumber 1', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Bio pot', createdAt: new Date().toISOString() },
  { id: 3, name: 'Zucchini 1', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Bio pot', createdAt: new Date().toISOString() },
  { id: 4, name: 'Squash 1', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Bio pot', createdAt: new Date().toISOString() },
  { id: 5, name: 'Lettuce Row 1', variety: 'Super Gourmet', type: 'lettuce', plantDate: '2026-05-03', location: 'outdoor', notes: 'Box 2', createdAt: new Date().toISOString() },
  { id: 6, name: 'Carrot Bed', variety: 'Rainbow Blend', type: 'carrot', plantDate: '2026-05-03', location: 'outdoor', notes: 'Box 1', createdAt: new Date().toISOString() }
];

let cachedPlants = [];
let cachedLogs = [];
let cachedTaskStatus = {};
let currentCompressedFile = null;

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  initMobileMenu();
  initImageUpload();
});

async function initializeApp() {
  await loadPlantsFromServer();
  await loadCareLogsFromServer();
  await loadTaskStatusFromServer();
  populatePlantSelector();
  updateTransplantProgress();
  updateTimelineStatus();
  fetchHamiltonWeather();
  updateTodaysTasks();
  updateCurrentDate();
}

// --- Image Upload ---
function initImageUpload() {
  const uploadBtn = document.getElementById('uploadPicBtn');
  const fileInput = document.getElementById('picFileInput');
  const previewImg = document.getElementById('previewImg');
  const uploadStatus = document.getElementById('uploadStatus');
  const removeBtn = document.getElementById('removePicBtn');

  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        updateUploadStatus('❌ Only images allowed', 'error'); return;
      }
      updateUploadStatus('⏳ Compressing...', '');
      try {
        currentCompressedFile = await imageCompression(file, {
          maxSizeMB: 0.4, maxWidthOrHeight: 1920, useWebWorker: true, fileType: 'image/jpeg', exifOrientation: true
        });
        previewImg.src = URL.createObjectURL(currentCompressedFile);
        previewImg.style.display = 'block';
        removeBtn.classList.remove('hidden');
        updateUploadStatus('✅ Ready (~400KB)', 'success');
      } catch (err) {
        console.error(err);
        updateUploadStatus('❌ Compression failed', 'error');
      }
    });
  }
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      currentCompressedFile = null;
      if (fileInput) fileInput.value = '';
      previewImg.style.display = 'none';
      removeBtn.classList.add('hidden');
      updateUploadStatus('', '');
    });
  }
}

function updateUploadStatus(msg, type) {
  const status = document.getElementById('uploadStatus');
  if (status) { status.textContent = msg; status.className = `upload-status ${type}`; }
}

// --- Server Communication ---
async function fetchFromServer(endpoint) {
  try {
    const res = await fetch(`/api/${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) { console.warn(`Fetch ${endpoint} failed`, e); return null; }
}

async function saveToServer(endpoint, data) {
  try {
    const res = await fetch(`/api/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (e) { console.error(`Save ${endpoint} failed`, e); return false; }
}

// --- Plant Management ---
async function loadPlantsFromServer() {
  const data = await fetchFromServer('plants');
  cachedPlants = data || DEFAULT_PLANTS;
  renderPlants(cachedPlants);
}

function renderPlants(plants) {
  const container = document.getElementById('plants-grid');
  if (!container) return;
  if (!plants.length) { container.innerHTML = '<p class="no-plants">No plants added.</p>'; return; }
  
  const groups = {};
  plants.forEach(p => {
    const key = `${p.variety}_${p.location}`;
    if (!groups[key]) groups[key] = { variety: p.variety, location: p.location, type: p.type, count: 0, list: [] };
    groups[key].count++; groups[key].list.push(p);
  });

  container.innerHTML = Object.values(groups).map(group => {
    const emoji = {tomato:'🍅', cucumber:'🥒', zucchini:'🥒', squash:'🎃', lettuce:'🥬', spinach:'🥬', arugula:'🌿', carrot:'🥕'}[group.type] || '🌱';
    return `
      <div class="plant-group-card" onclick="this.classList.toggle('expanded')">
        <div class="group-header">
          <div class="group-main"><span class="group-icon">${emoji}</span><div><h3 class="group-variety">${group.variety}</h3><span class="group-meta">${group.count} plants • ${group.location}</span></div></div>
          <div class="group-status"><i class="fas fa-chevron-down toggle-icon"></i></div>
        </div>
        <div class="group-details">${group.list.map(p => `<div class="plant-detail-row"><span class="plant-name">${p.name}</span><span class="plant-note">${p.notes||''}</span></div>`).join('')}</div>
      </div>`;
  }).join('');
}

// --- Care Log & Selector ---
function populatePlantSelector() {
  const container = document.getElementById('plant-groups');
  if (!container) return;
  if (!cachedPlants?.length) { container.innerHTML = '<div style="padding:1rem;color:var(--color-text-secondary);text-align:center;">Loading plants...</div>'; return; }
  
  const groups = {
    'Tomatoes': cachedPlants.filter(p => p.type === 'tomato'),
    'Cucurbits': cachedPlants.filter(p => ['cucumber','zucchini','squash'].includes(p.type)),
    'Leafy Greens': cachedPlants.filter(p => ['lettuce','spinach','arugula'].includes(p.type)),
    'Root Vegetables': cachedPlants.filter(p => p.type === 'carrot'),
    'Herbs': HERBS
  };

  container.innerHTML = Object.entries(groups).map(([name, items], i) => {
    if (!items.length) return '';
    const gid = name.replace(/\W/g,'');
    return `<div class="plant-group ${i===0?'expanded':''}" id="group-${gid}">
      <div class="group-header" onclick="toggleGroup('${gid}')">
        <input type="checkbox" class="group-checkbox" data-group="${gid}" onclick="event.stopPropagation(); toggleGroupSelection('${gid}', this)">
        <span class="group-name">${name}</span><span class="group-count">(${items.length})</span>
        <i class="fas fa-chevron-down toggle-icon" style="transform:${i===0?'rotate(0)':'rotate(-90deg)'}"></i>
      </div>
      <div class="group-options">${items.map(p => {
        const n = p.name || p;
        const v = p.variety || p.notes || '';
        const id = `plant-${n.replace(/\W/g,'')}`;
        return `<label class="plant-option" for="${id}"><input type="checkbox" id="${id}" value="${n}" class="plant-checkbox" data-group="${gid}" onchange="updateGroupCheckbox('${gid}')"><span>${n} ${v?`(${v})`:''}</span></label>`;
      }).join('')}</div>
    </div>`;
  }).join('');
}

function toggleGroup(gid) {
  const g = document.getElementById(`group-${gid}`);
  if (!g) return;
  const exp = g.classList.toggle('expanded');
  g.querySelector('.toggle-icon').style.transform = exp ? 'rotate(0)' : 'rotate(-90deg)';
}
function toggleGroupSelection(gid, cb) {
  document.querySelectorAll(`.plant-checkbox[data-group="${gid}"]`).forEach(c => c.checked = cb.checked);
  updateSelectAllCheckbox();
}
function updateGroupCheckbox(gid) {
  const cbs = document.querySelectorAll(`.plant-checkbox[data-group="${gid}"]`);
  const gc = document.querySelector(`.group-checkbox[data-group="${gid}"]`);
  if (gc) { gc.checked = Array.from(cbs).every(c => c.checked); gc.indeterminate = cbs.length && !gc.checked; }
  updateSelectAllCheckbox();
}
function toggleAllPlants(e) {
  if (e.target.id !== 'select-all-plants') {
    const sa = document.getElementById('select-all-plants');
    sa.checked = !sa.checked;
  }
  const val = document.getElementById('select-all-plants').checked;
  document.querySelectorAll('.plant-checkbox, .group-checkbox').forEach(c => { c.checked = val; c.indeterminate = false; });
}
function updateSelectAllCheckbox() {
  const all = document.querySelectorAll('.plant-checkbox');
  const sa = document.getElementById('select-all-plants');
  if (!all.length || !sa) return;
  sa.checked = Array.from(all).every(c => c.checked);
  sa.indeterminate = all.length && !sa.checked;
}

async function saveCareLog(e) {
  e.preventDefault();
  const saveBtn = document.getElementById('saveBtn');
  const selected = Array.from(document.querySelectorAll('.plant-checkbox:checked')).map(c => c.value);
  if (!selected.length) { alert('Select at least one plant'); return; }
  
  saveBtn.disabled = true; saveBtn.textContent = 'Saving...';
  let imageUrl = null;
  
  if (currentCompressedFile) {
    updateUploadStatus('⏫ Uploading...', '');
    try {
      const fd = new FormData();
      fd.append('image', currentCompressedFile, 'care-log.jpg');
      const res = await fetch('/api/upload-image', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      imageUrl = (await res.json()).url;
    } catch (err) { console.warn('Image upload skipped', err); updateUploadStatus('⚠️ Saved without photo', 'error'); }
  }

  const log = { id: Date.now(), plants: selected, date: document.getElementById('log-date').value, type: document.getElementById('log-type').value, fertilizerType: document.getElementById('fertilizer-type')?.value || '', notes: document.getElementById('log-notes').value, imageUrl, createdAt: new Date().toISOString() };
  cachedLogs = cachedLogs || [];
  cachedLogs.unshift(log);
  
  if (await saveToServer('logs', cachedLogs)) {
    renderLogs(cachedLogs); clearForm();
    updateUploadStatus('✅ Saved', 'success');
  } else { alert('Failed to save'); }
  
  saveBtn.disabled = false; saveBtn.textContent = 'Save Entry';
}

async function loadCareLogsFromServer() {
  cachedLogs = await fetchFromServer('logs') || [];
  renderLogs(cachedLogs);
}

function renderLogs(logs) {
  const logHistory = document.getElementById('log-history');
  if (!logHistory) return;
  if (!logs || logs.length === 0) {
    logHistory.innerHTML = '<p class="no-activity">No care logs yet.</p>';
    return;
  }

  logHistory.innerHTML = logs.map(log => {
    const plantNames = Array.isArray(log.plants) ? log.plants.join(', ') : log.plant || 'Unknown';
    const imageHtml = log.imageUrl 
      ? `<img src="${log.imageUrl}" class="log-entry-image" onclick="event.stopPropagation(); window.open('${log.imageUrl}', '_blank')" alt="Care log photo">` 
      : '';

    return `
      <div class="log-entry ${log.type}" onclick="openLogDetailModal(${log.id})">
        <div class="log-header">
          <span class="log-plant-name">${plantNames}</span>
          <span class="log-date">${new Date(log.date).toLocaleDateString()}</span>
          <button class="btn-log-delete" onclick="event.stopPropagation(); deleteLogEntry(event, ${log.id})" title="Delete entry">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <span class="log-type-badge">${getLogTypeLabel(log.type)}</span>
        ${log.fertilizerType ? `<p><strong>Fertilizer:</strong> ${log.fertilizerType}</p>` : ''}
        <p>${log.notes || 'No notes'}</p>
        ${imageHtml}
      </div>
    `;
  }).join('');
}

function openLogDetailModal(logId) {
  const log = cachedLogs.find(l => l.id === logId);
  if (!log) return;

  const plants = Array.isArray(log.plants) ? log.plants.join(', ') : (log.plant || 'Unknown');
  const date = new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const type = getLogTypeLabel(log.type);

  const body = document.getElementById('log-detail-body');
  body.innerHTML = `
    <div class="log-detail-row"><span class="log-detail-label">Date</span><span class="log-detail-value">${date}</span></div>
    <div class="log-detail-row"><span class="log-detail-label">Activity</span><span class="log-detail-value">${type}</span></div>
    <div class="log-detail-row"><span class="log-detail-label">Plants</span><span class="log-detail-value">${plants}</span></div>
    ${log.fertilizerType ? `<div class="log-detail-row"><span class="log-detail-label">Fertilizer</span><span class="log-detail-value">${log.fertilizerType}</span></div>` : ''}
    <div class="log-detail-row"><span class="log-detail-label">Notes</span><span class="log-detail-value ${!log.notes ? 'empty' : ''}">${log.notes || 'No notes added'}</span></div>
    ${log.imageUrl ? `<img src="${log.imageUrl}" class="log-detail-image" onclick="window.open('${log.imageUrl}', '_blank')" alt="Care log photo">` : ''}
  `;

  document.getElementById('log-detail-modal').style.display = 'flex';
}

function closeLogDetailModal() {
  document.getElementById('log-detail-modal').style.display = 'none';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLogDetailModal();
});

async function deleteLogEntry(id) {
  if (!confirm('Delete this entry?')) return;
  cachedLogs = cachedLogs.filter(l => l.id !== id);
  await saveToServer('logs', cachedLogs);
  renderLogs(cachedLogs);
}

function clearForm() {
  document.getElementById('care-log-form').reset();
  document.getElementById('fertilizer-type-group').style.display = 'none';
  document.querySelectorAll('.plant-checkbox, .group-checkbox, #select-all-plants').forEach(c => { c.checked = false; c.indeterminate = false; });
  document.querySelectorAll('.plant-group').forEach(g => { g.classList.remove('expanded'); g.querySelector('.toggle-icon').style.transform = 'rotate(-90deg)'; });
  updateUploadStatus('', '');
  document.getElementById('previewImg').style.display = 'none';
  document.getElementById('removePicBtn').classList.add('hidden');
  currentCompressedFile = null;
}
function toggleFields() {
  document.getElementById('fertilizer-type-group').style.display = document.getElementById('log-type').value === 'fertilizer' ? 'block' : 'none';
}

// --- Tasks & Weather ---
async function loadTaskStatusFromServer() { cachedTaskStatus = await fetchFromServer('task_status') || {}; }
async function saveTaskStatus(date, slug, val) {
  if (!cachedTaskStatus[date]) cachedTaskStatus[date] = {};
  cachedTaskStatus[date][slug] = val;
  await saveToServer('task_status', cachedTaskStatus);
}

async function fetchHamiltonWeather() {
  try {
    const res = await fetch('/weather');
    if (!res.ok) throw new Error('Weather API error');
    const d = await res.json();
    document.getElementById('weather-temp').textContent = `${Math.round(d.temp)}°C`;
    document.getElementById('weather-humidity').textContent = `${d.humidity}%`;
    document.getElementById('weather-wind').textContent = `${d.wind} km/h`;
    document.getElementById('weather-desc').textContent = d.desc;
  } catch (e) {
    console.warn('Weather fetch failed', e);
    document.getElementById('weather-temp').textContent = '18°C';
    document.getElementById('weather-humidity').textContent = '65%';
    document.getElementById('weather-wind').textContent = '12 km/h';
    document.getElementById('weather-desc').textContent = 'Partly cloudy';
  }
}

function updateTodaysTasks() {
  const el = document.getElementById('tasks-container');
  if (!el) return;
  const today = new Date().toISOString().split('T')[0];
  const plantsReady = cachedPlants.filter(p => p.location === 'indoor' && (new Date() - new Date(p.plantDate)) / 86400000 >= 21);
  const tasks = plantsReady.length ? getTransplantTasks(plantsReady) : getSeedlingTasks();
  const status = cachedTaskStatus[today] || {};

  el.innerHTML = tasks.map(t => {
    const slug = t.title.replace(/\W/g, '_').toLowerCase();
    const checked = status[slug] === true;
    return `<div class="task-item ${checked?'completed':''}"><div class="task-checkbox"><input type="checkbox" data-slug="${slug}" ${checked?'checked':''}></div><div class="task-content"><div class="task-title">${t.title}</div><div class="task-desc">${t.desc}</div>${t.plants?`<div class="task-plants mt-xs text-muted">${t.plants}</div>`:''}</div></div>`;
  }).join('');

  el.querySelectorAll('input').forEach(cb => {
    cb.onchange = async (e) => {
      await saveTaskStatus(today, e.target.dataset.slug, e.target.checked);
      e.target.closest('.task-item').classList.toggle('completed', e.target.checked);
    };
  });
}
function getSeedlingTasks() {
  return [
    { title: 'Check moisture', desc: 'Keep soil moist' }, { title: 'Ensure light', desc: '6-8 hours of light' },
    { title: 'Monitor temp', desc: '70-85°F ideal' }, { title: 'Thin seedlings', desc: 'Keep strongest per pot' }
  ];
}
function getTransplantTasks(plants) {
  return [
    { title: '🌱 Harden off', desc: 'Start with 2-3 hrs outside' },
    { title: '🌡️ Check forecast', desc: 'Ensure >50°F for 7 days' },
    { title: '🪴 Prepare beds', desc: 'Add compost & trellises' },
    { title: '🌤️ Transplant', desc: 'Move on cloudy day/evening' }
  ];
}

function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn'), sb = document.getElementById('sidebar'), ov = document.getElementById('sidebarOverlay');
  if (!btn || !sb) return;
  const toggle = () => { sb.classList.toggle('active'); ov.classList.toggle('active'); };
  btn.onclick = toggle;
  ov.onclick = () => { sb.classList.remove('active'); ov.classList.remove('active'); };
}

function updateTransplantProgress() {
  const days = Math.floor((new Date() - new Date('2026-04-26')) / 86400000);
  const rem = Math.max(0, 21 - days);
  document.querySelectorAll('.countdown-days').forEach(e => e.textContent = `${rem} days`);
  document.querySelectorAll('.progress').forEach(e => e.style.width = `${Math.min(100, (days/21)*100)}%`);
}
function updateTimelineStatus() {
  const days = Math.floor((new Date() - new Date('2026-04-26')) / 86400000);
  document.querySelectorAll('.timeline-step').forEach((s, i) => s.classList.toggle('active', i <= (days > 14 ? 1 : 0)));
}
function updateCurrentDate() {
  const d = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  if (document.getElementById('header-date')) document.getElementById('header-date').textContent = d;
  if (document.getElementById('current-date')) document.getElementById('current-date').textContent = d;
}