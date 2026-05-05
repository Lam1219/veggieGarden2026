// script.js - Garden Journal Tracker (Cleaned & Production-Ready)
// --- Plant Care Database ---
const PLANT_CARE_DB = {
  tomato: { water: "Consistent", waterLevel: 4, sun: "Full Sun (8+ hours)", sunLevel: 5, start: "Start indoors 6-8 weeks before transplant", spacing: "24-36 inches apart", tips: "Use cages. Ferment seeds for best saving results." },
  cucumber: { water: "High (Consistently Moist)", waterLevel: 5, sun: "Full Sun (6-8 hours)", sunLevel: 5, start: "Start indoors in biodegradable pots", spacing: "12 inches apart on trellis", tips: "Train on trellis. Harvest when small for best flavor." },
  zucchini: { water: "Moderate to High", waterLevel: 4, sun: "Full Sun (6-8 hours)", sunLevel: 5, start: "Start indoors, transplant mid-May", spacing: "36 inches apart (gets very large!)", tips: "Limit to 2-4 plants per box. Harvest frequently." },
  squash: { water: "Moderate", waterLevel: 3, sun: "Full Sun (6-8 hours)", sunLevel: 5, start: "Start indoors, transplant mid-May", spacing: "36 inches apart", tips: "Allow space to spread. Harvest when small and tender." },
  lettuce: { water: "High", waterLevel: 4, sun: "Partial Sun (4-6 hours)", sunLevel: 3, start: "Direct sow outside", spacing: "6-8 inches apart", tips: "Succession sow every 2 weeks for continuous harvest." },
  spinach: { water: "Moderate", waterLevel: 3, sun: "Partial Sun", sunLevel: 3, start: "Direct sow outside", spacing: "4-6 inches apart", tips: "Harvest outer leaves to extend production." },
  arugula: { water: "Moderate", waterLevel: 3, sun: "Partial Sun", sunLevel: 3, start: "Direct sow outside or scatter in gaps", spacing: "6 inches apart", tips: "Fast growing. Harvest before tomatoes shade it." },
  carrot: { water: "Moderate", waterLevel: 3, sun: "Full Sun to Part Shade", sunLevel: 4, start: "Direct sow outside", spacing: "2-3 inches apart after thinning", tips: "Keep soil loose. Thin seedlings to prevent forked roots." }
};

const HERBS = [
  { name: 'Mojito Mint', type: 'herb', notes: 'Pot 1 (Moist)' }, { name: 'Rosemary', type: 'herb', notes: 'Pot 2 (Dry)' },
  { name: 'French Thyme', type: 'herb', notes: 'Pot 3 (Dry)' }, { name: 'Greek Oregano', type: 'herb', notes: 'Pot 3 (Dry)' },
  { name: 'Regular Sage', type: 'herb', notes: 'Pot 4 (Dry)' }, { name: 'Pineapple Sage', type: 'herb', notes: 'Pot 4 (Dry)' },
  { name: 'Basil', type: 'herb', notes: 'Pot 5 (Moist)' }, { name: 'Flat Parsley', type: 'herb', notes: 'Pot 5 (Moist)' },
  { name: 'Cilantro', type: 'herb', notes: 'Pot 6 (Moist)' }
];

const DEFAULT_PLANTS = [
  { id: 1, name: 'Pink Bumble Bee 1', variety: 'Pink Bumble Bee', type: 'tomato', plantDate: '2026-04-26', location: 'indoor', notes: 'Planted in 4" pot', createdAt: new Date().toISOString() },
  { id: 2, name: 'Pink Bumble Bee 2', variety: 'Pink Bumble Bee', type: 'tomato', plantDate: '2026-04-26', location: 'indoor', notes: 'Planted in 4" pot', createdAt: new Date().toISOString() },
  { id: 3, name: 'Cucumber 1', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 4, name: 'Cucumber 2', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 5, name: 'Cucumber 3', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 6, name: 'Cucumber 4', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 7, name: 'Cucumber 5', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 8, name: 'Zucchini 1', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 9, name: 'Zucchini 2', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 10, name: 'Zucchini 3', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 11, name: 'Zucchini 4', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 12, name: 'Squash 1', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 13, name: 'Squash 2', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 14, name: 'Squash 3', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 15, name: 'Squash 4', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot', createdAt: new Date().toISOString() },
  { id: 16, name: 'Lettuce Row 1', variety: 'Super Gourmet Blend', type: 'lettuce', plantDate: '2026-05-03', location: 'outdoor', notes: 'Planned for Box 2', createdAt: new Date().toISOString() },
  { id: 17, name: 'Spinach Row 1', variety: 'Renegade', type: 'spinach', plantDate: '2026-05-03', location: 'outdoor', notes: 'Planned for Box 2', createdAt: new Date().toISOString() },
  { id: 18, name: 'Arugula Patch', variety: 'Astro', type: 'arugula', plantDate: '2026-05-03', location: 'outdoor', notes: 'Planned for Box 1 gaps', createdAt: new Date().toISOString() },
  { id: 19, name: 'Carrot Bed', variety: 'Rainbow Blend', type: 'carrot', plantDate: '2026-05-03', location: 'outdoor', notes: 'Planned for Box 1', createdAt: new Date().toISOString() }
];

let cachedPlants = [];
let cachedLogs = [];
let cachedTaskStatus = {};
let currentCompressedFile = null;

// --- Initialization ---
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

// --- Server Communication ---
async function fetchFromServer(endpoint) {
  try {
    const res = await fetch(`/api/${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`⚠️ Failed to fetch ${endpoint}:`, error);
    return null;
  }
}

async function saveToServer(endpoint, data) {
  try {
    const res = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to save ${endpoint}:`, error);
    return false;
  }
}

// --- Plant Management ---
async function loadPlantsFromServer() {
  let plants = await fetchFromServer('plants');
  if (!plants || plants.length === 0) {
    plants = DEFAULT_PLANTS;
    await saveToServer('plants', plants);
  }
  cachedPlants = plants;
  renderPlants(plants);
}

function renderPlants(plants) {
  const container = document.getElementById('plants-grid');
  if (!container) return;
  if (!plants.length) {
    container.innerHTML = '<p class="no-plants">No plants added yet.</p>';
    return;
  }

  const groups = {};
  plants.forEach(p => {
    const key = `${p.variety}_${p.location}`;
    if (!groups[key]) groups[key] = { variety: p.variety, location: p.location, type: p.type, count: 0, list: [], maxDays: 0, allReady: true };
    groups[key].count++;
    groups[key].list.push(p);
    const days = Math.floor((new Date() - new Date(p.plantDate)) / 86400000);
    if (days > groups[key].maxDays) groups[key].maxDays = days;
    if (days < 21 || p.location !== 'indoor') groups[key].allReady = false;
  });

  const typeEmojis = { tomato: '🍅', cucumber: '🥒', zucchini: '🥒', squash: '🎃', lettuce: '🥬', spinach: '🥬', arugula: '🌿', carrot: '🥕' };
  
  container.innerHTML = Object.values(groups).map(group => {
    const statusBadge = group.allReady ? `<span class="status-badge ready">✓ Ready</span>` : `<span class="status-badge growing">${group.maxDays} days</span>`;
    const locationIcon = group.location === 'indoor' ? '🏠' : '🌱';
    const emoji = typeEmojis[group.type] || '🌱';

    return `
      <div class="plant-group-card" data-location="${group.location}" data-ready="${group.allReady}" onclick="this.classList.toggle('expanded')">
        <div class="group-header">
          <div class="group-main">
            <span class="group-icon">${emoji}</span>
            <div><h3 class="group-variety">${group.variety}</h3><span class="group-meta">${group.count} plant${group.count > 1 ? 's' : ''} • ${locationIcon} ${group.location}</span></div>
          </div>
          <div class="group-status">${statusBadge}<i class="fas fa-chevron-down toggle-icon"></i></div>
        </div>
        <div class="group-details">${group.list.map(p => `<div class="plant-detail-row" onclick="event.stopPropagation(); showPlantDetails(${p.id})"><span class="plant-name">${p.name}</span><span class="plant-note">${p.notes || ''}</span></div>`).join('')}</div>
      </div>`;
  }).join('');
}

async function addPlant(plant) {
  if (!cachedPlants) cachedPlants = [];
  cachedPlants.push(plant);
  await saveToServer('plants', cachedPlants);
  renderPlants(cachedPlants);
  populatePlantSelector();
}

async function deletePlant(event, id) {
  event.stopPropagation();
  const plant = cachedPlants.find(p => p.id === id);
  if (!plant) return;
  if (confirm(`Delete "${plant.name}"? This cannot be undone.`)) {
    cachedPlants = cachedPlants.filter(p => p.id !== id);
    await saveToServer('plants', cachedPlants);
    renderPlants(cachedPlants);
    populatePlantSelector();
  }
}

function filterPlants(filter) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.plant-group-card').forEach(card => {
    const location = card.dataset.location;
    const isReady = card.dataset.ready === 'true';
    if (filter === 'all') card.style.display = 'block';
    else if (filter === 'ready') card.style.display = isReady ? 'block' : 'none';
    else card.style.display = location === filter ? 'block' : 'none';
  });
}

// --- Plant Details Modal ---
function showPlantDetails(id) {
  const plant = cachedPlants.find(p => p.id === id);
  if (!plant) return;
  const careInfo = PLANT_CARE_DB[plant.type] || PLANT_CARE_DB['tomato'];
  document.getElementById('detail-water').textContent = careInfo.water;
  document.getElementById('detail-sun').textContent = careInfo.sun;
  document.getElementById('detail-tips').textContent = careInfo.tips;
  document.getElementById('detail-spacing').textContent = careInfo.spacing;
  document.getElementById('detail-start').textContent = careInfo.start;
  renderIndicator('detail-water-indicator', careInfo.waterLevel);
  renderIndicator('detail-sun-indicator', careInfo.sunLevel);
  document.getElementById('plant-details-modal').style.display = 'block';
}

function renderIndicator(elementId, level) {
  const container = document.getElementById(elementId);
  container.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const dot = document.createElement('div');
    dot.className = i < level ? 'indicator-dot active' : 'indicator-dot';
    container.appendChild(dot);
  }
}

function closePlantDetailsModal() { document.getElementById('plant-details-modal').style.display = 'none'; }

// --- Checkbox Tree Selector ---
function populatePlantSelector() {
  const container = document.getElementById('plant-groups');
  if (!container) return;
  if (!cachedPlants || cachedPlants.length === 0) {
    container.innerHTML = '<div style="padding: 1rem; color: var(--color-text-secondary); text-align: center;">Loading plants...</div>';
    return;
  }

  const groups = {
    'Tomatoes': cachedPlants.filter(p => p.type === 'tomato'),
    'Cucurbits': cachedPlants.filter(p => ['cucumber', 'zucchini', 'squash'].includes(p.type)),
    'Leafy Greens': cachedPlants.filter(p => ['lettuce', 'spinach', 'arugula'].includes(p.type)),
    'Root Vegetables': cachedPlants.filter(p => p.type === 'carrot'),
    'Herbs': HERBS
  };

  container.innerHTML = Object.entries(groups).map(([groupName, plants], index) => {
    if (plants.length === 0) return '';
    const groupId = groupName.replace(/[^a-zA-Z0-9]/g, '');
    return `
      <div class="plant-group ${index === 0 ? 'expanded' : ''}" id="group-${groupId}">
        <div class="group-header" onclick="toggleGroup('${groupId}')">
          <input type="checkbox" class="group-checkbox" data-group="${groupId}" onclick="event.stopPropagation(); toggleGroupSelection('${groupId}', this)">
          <span class="group-name">${groupName}</span><span class="group-count">(${plants.length})</span>
          <i class="fas fa-chevron-down toggle-icon" style="transform: ${index === 0 ? 'rotate(0)' : 'rotate(-90deg)'}"></i>
        </div>
        <div class="group-options">${plants.map(plant => {
          const name = plant.name || plant;
          const variety = plant.variety || plant.notes || '';
          const plantId = `plant-${name.replace(/[^a-zA-Z0-9]/g, '')}`;
          return `<label class="plant-option" for="${plantId}"><input type="checkbox" id="${plantId}" value="${name}" class="plant-checkbox" data-group="${groupId}" onchange="updateGroupCheckbox('${groupId}')"><span>${name} ${variety ? `(${variety})` : ''}</span></label>`;
        }).join('')}</div>
      </div>`;
  }).join('');
}

function toggleGroup(groupId) {
  const group = document.getElementById(`group-${groupId}`);
  if (group) {
    const isExpanded = group.classList.toggle('expanded');
    group.querySelector('.toggle-icon').style.transform = isExpanded ? 'rotate(0)' : 'rotate(-90deg)';
  }
}
function toggleGroupSelection(groupId, checkbox) {
  document.querySelectorAll(`.plant-checkbox[data-group="${groupId}"]`).forEach(cb => cb.checked = checkbox.checked);
  updateSelectAllCheckbox();
}
function updateGroupCheckbox(groupId) {
  const checkboxes = document.querySelectorAll(`.plant-checkbox[data-group="${groupId}"]`);
  const gc = document.querySelector(`.group-checkbox[data-group="${groupId}"]`);
  if (gc) { gc.checked = Array.from(checkboxes).every(c => c.checked); gc.indeterminate = checkboxes.length && !gc.checked; }
  updateSelectAllCheckbox();
}
function toggleAllPlants(event) {
  if (event.target.id !== 'select-all-plants') document.getElementById('select-all-plants').checked = !document.getElementById('select-all-plants').checked;
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

// --- Care Log Management ---
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
    const thumbHtml = log.imageUrl 
      ? `<img src="${log.imageUrl}" class="log-entry-image" alt="Log thumbnail">` 
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
        ${thumbHtml}
      </div>
    `;
  }).join('');
}

async function saveCareLog(event) {
  event.preventDefault();
  const saveBtn = document.getElementById('saveBtn');
  const uploadStatus = document.getElementById('uploadStatus');
  const selectedPlants = Array.from(document.querySelectorAll('.plant-checkbox:checked')).map(cb => cb.value);

  if (selectedPlants.length === 0) { alert('Please select at least one plant'); return; }

  saveBtn.disabled = true; saveBtn.textContent = 'Saving...';
  let imageUrl = null;

  if (currentCompressedFile) {
    uploadStatus.textContent = '⏫ Uploading...';
    try {
      const formData = new FormData();
      formData.append('image', currentCompressedFile, 'care-log.jpg');
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      imageUrl = (await res.json()).url;
    } catch (err) {
      console.warn('⚠️ Image upload failed, saving without photo:', err);
      uploadStatus.textContent = '⚠️ Saved without photo';
      uploadStatus.className = 'upload-status error';
    }
  }

  const logEntry = {
    id: Date.now(), plants: selectedPlants, date: document.getElementById('log-date').value,
    type: document.getElementById('log-type').value, fertilizerType: document.getElementById('fertilizer-type')?.value || '',
    notes: document.getElementById('log-notes').value, imageUrl: imageUrl, createdAt: new Date().toISOString()
  };

  cachedLogs = cachedLogs || [];
  cachedLogs.unshift(logEntry);

  if (await saveToServer('logs', cachedLogs)) {
    renderLogs(cachedLogs);
    clearForm();
    uploadStatus.textContent = '✅ Entry saved';
    uploadStatus.className = 'upload-status success';
  } else {
    alert('Failed to save entry.');
  }

  saveBtn.disabled = false; saveBtn.textContent = 'Save Entry';
}

async function deleteLogEntry(id) {
  if (!confirm('Delete this log entry?')) return;
  cachedLogs = cachedLogs.filter(l => l.id !== id);
  await saveToServer('logs', cachedLogs);
  renderLogs(cachedLogs);
}

function getLogTypeLabel(type) {
  return { watering: '💧 Watering', fertilizer: '🌿 Fertilizer', pest: '🐛 Pest/Disease', maintenance: '🔧 Maintenance', observation: '👁️ Observation' }[type] || type;
}

function toggleFields() {
  const fertilizerGroup = document.getElementById('fertilizer-type-group');
  if (fertilizerGroup) fertilizerGroup.style.display = document.getElementById('log-type').value === 'fertilizer' ? 'block' : 'none';
}

function clearForm() {
  document.querySelector('form').reset();
  document.getElementById('fertilizer-type-group').style.display = 'none';
  document.querySelectorAll('.plant-checkbox, .group-checkbox, #select-all-plants').forEach(cb => { cb.checked = false; cb.indeterminate = false; });
  document.querySelectorAll('.plant-group').forEach(g => { g.classList.remove('expanded'); g.querySelector('.toggle-icon').style.transform = 'rotate(-90deg)'; });
  currentCompressedFile = null;
  document.getElementById('previewImg').style.display = 'none';
  document.getElementById('removePicBtn').classList.add('hidden');
  const uploadStatus = document.getElementById('uploadStatus');
  if (uploadStatus) { uploadStatus.textContent = ''; uploadStatus.className = 'upload-status'; }
}

// --- Log Detail Modal (UX Optimized) ---
function openLogDetailModal(logId) {
  const log = cachedLogs.find(l => l.id === logId);
  if (!log) return;
  const plants = Array.isArray(log.plants) ? log.plants.join(', ') : (log.plant || 'Unknown');
  const date = new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('log-detail-body').innerHTML = `
    <div class="log-detail-row"><span class="log-detail-label">Date</span><span class="log-detail-value">${date}</span></div>
    <div class="log-detail-row"><span class="log-detail-label">Activity</span><span class="log-detail-value">${getLogTypeLabel(log.type)}</span></div>
    <div class="log-detail-row"><span class="log-detail-label">Plants</span><span class="log-detail-value">${plants}</span></div>
    ${log.fertilizerType ? `<div class="log-detail-row"><span class="log-detail-label">Fertilizer</span><span class="log-detail-value">${log.fertilizerType}</span></div>` : ''}
    <div class="log-detail-row"><span class="log-detail-label">Notes</span><span class="log-detail-value ${!log.notes ? 'empty' : ''}">${log.notes || 'No notes added'}</span></div>
    ${log.imageUrl ? `<img src="${log.imageUrl}" class="log-detail-image" onclick="window.open('${log.imageUrl}', '_blank')" alt="Care log photo">` : ''}
  `;
  document.getElementById('log-detail-modal').style.display = 'flex';
}
function closeLogDetailModal() { document.getElementById('log-detail-modal').style.display = 'none'; }
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLogDetailModal(); });

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
      if (!file.type.startsWith('image/')) { updateUploadStatus('❌ Only images allowed', 'error'); return; }
      updateUploadStatus('⏳ Compressing...', '');
      try {
        currentCompressedFile = await imageCompression(file, { maxSizeMB: 0.4, maxWidthOrHeight: 1920, useWebWorker: true, fileType: 'image/jpeg', exifOrientation: true });
        previewImg.src = URL.createObjectURL(currentCompressedFile);
        previewImg.style.display = 'block';
        removeBtn.classList.remove('hidden');
        updateUploadStatus('✅ Ready (~400KB)', 'success');
      } catch (err) { console.error(err); updateUploadStatus('❌ Compression failed', 'error'); }
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

// --- Tasks & Weather ---
async function loadTaskStatusFromServer() { cachedTaskStatus = await fetchFromServer('task_status') || {}; }
async function saveTaskStatus(dateKey, taskSlug, isChecked) {
  if (!cachedTaskStatus[dateKey]) cachedTaskStatus[dateKey] = {};
  cachedTaskStatus[dateKey][taskSlug] = isChecked;
  await saveToServer('task_status', cachedTaskStatus);
}

function updateTodaysTasks() {
  const container = document.getElementById('tasks-container');
  const dateEl = document.getElementById('task-date');
  if (!container) return;
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  dateEl.textContent = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const plantsReady = cachedPlants.filter(p => p.location === 'indoor' && (new Date() - new Date(p.plantDate)) / 86400000 >= 21);
  const tasks = plantsReady.length ? getTransplantTasks(plantsReady) : getSeedlingTasks();
  const todayTasksStatus = cachedTaskStatus[todayStr] || {};

  container.innerHTML = tasks.map(task => {
    const slug = task.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const checked = todayTasksStatus[slug] === true;
    return `<div class="task-item ${checked ? 'completed' : ''}"><div class="task-checkbox"><input type="checkbox" data-task-slug="${slug}"></div><div class="task-content"><div class="task-title">${task.title}</div><div class="task-desc">${task.desc}</div>${task.plants ? `<div class="task-plants text-muted mt-xs">${task.plants}</div>` : ''}</div></div>`;
  }).join('');

  container.querySelectorAll('input').forEach(cb => {
    cb.checked = todayTasksStatus[cb.dataset.taskSlug] === true;
    cb.addEventListener('change', async (e) => {
      await saveTaskStatus(todayStr, e.target.dataset.taskSlug, e.target.checked);
      e.target.closest('.task-item').classList.toggle('completed', e.target.checked);
    });
  });
}
function getSeedlingTasks() { return [ { title: 'Check seedling moisture', desc: 'Indoor pots - soil should be moist but not waterlogged' }, { title: 'Ensure adequate light', desc: '6-8 hours of light for all seedlings' }, { title: 'Monitor temperature', desc: 'Keep between 70-85°F (21-29°C)' }, { title: 'Inspect for damping-off', desc: 'Watch for thin, weak stems or mold' }, { title: 'Thin crowded seedlings', desc: 'Snip weakest at soil level; keep strongest per pot' } ]; }
function getTransplantTasks(readyPlants) { const names = readyPlants.map(p => p.name).join(', '); return [ { title: '🌱 Harden off seedlings', desc: 'Start with 2-3 hours outside in shade', plants: `Ready: ${names}` }, { title: '🌡️ Check nighttime forecast', desc: 'Ensure temps stay above 50°F (10°C) for 7+ days' }, { title: '🪴 Prepare garden boxes', desc: 'Add compost, install trellises, mark spots' }, { title: '💧 Pre-water transplant holes', desc: 'Water deeply before moving plants' }, { title: '🌤️ Transplant on cloudy day', desc: 'Move in evening or overcast; water deeply after' } ]; }

async function fetchHamiltonWeather() {
  try {
    const res = await fetch('/weather');
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();
    document.getElementById('weather-temp').textContent = `${Math.round(data.temp)}°C`;
    document.getElementById('weather-humidity').textContent = `${data.humidity}%`;
    document.getElementById('weather-wind').textContent = `${data.wind} km/h`;
    document.getElementById('weather-desc').textContent = data.desc;
    const iconMap = { '01d': 'fa-sun', '01n': 'fa-moon', '02d': 'fa-cloud-sun', '03d': 'fa-cloud', '04d': 'fa-cloud', '09d': 'fa-cloud-rain', '10d': 'fa-cloud-showers-heavy', '11d': 'fa-bolt', '13d': 'fa-snowflake', '50d': 'fa-smog' };
    document.getElementById('weather-icon').className = `fas ${iconMap[data.icon] || 'fa-cloud-sun'}`;
  } catch (error) {
    console.warn('⚠️ Weather fetch failed:', error.message);
    document.getElementById('weather-temp').textContent = '18°C';
    document.getElementById('weather-humidity').textContent = '65%';
    document.getElementById('weather-wind').textContent = '12 km/h';
    document.getElementById('weather-desc').textContent = 'Partly cloudy';
    document.getElementById('weather-icon').className = 'fas fa-cloud-sun';
  }
}

// --- Utilities & Mobile ---
function updateTransplantProgress() {
  const days = Math.max(0, Math.floor((new Date() - new Date('2026-04-26')) / 86400000));
  const rem = Math.max(0, 21 - days);
  document.querySelectorAll('.countdown-days').forEach(el => el.textContent = rem);
  document.querySelectorAll('.progress').forEach(el => el.style.width = `${Math.min(100, (days/21)*100)}%`);
}
function updateTimelineStatus() {
  const days = Math.floor((new Date() - new Date('2026-04-26')) / 86400000);
  document.querySelectorAll('.timeline-step').forEach((s, i) => s.classList.toggle('active', i <= (days > 14 ? 1 : 0)));
}
function updateCurrentDate() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  if (document.getElementById('header-date')) document.getElementById('header-date').textContent = today;
  if (document.getElementById('current-date')) document.getElementById('current-date').textContent = today;
}
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!menuBtn || !sidebar) return;
  const toggle = () => { sidebar.classList.toggle('active'); overlay.classList.toggle('active'); };
  menuBtn.addEventListener('click', toggle);
  overlay.addEventListener('click', () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); });
  document.querySelectorAll('.nav-item').forEach(link => link.addEventListener('click', () => { if (window.innerWidth <= 768) overlay.click(); }));
}
function showAddPlantModal() { document.getElementById('add-plant-modal').style.display = 'block'; }
function closeModal() { document.getElementById('add-plant-modal').style.display = 'none'; }
document.getElementById('add-plant-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  await addPlant({ id: Date.now(), name: document.getElementById('plant-name').value, variety: document.getElementById('plant-variety').value, type: document.getElementById('plant-type').value, plantDate: document.getElementById('plant-date').value, location: document.getElementById('location').value, notes: document.getElementById('notes').value, createdAt: new Date().toISOString() });
  this.reset(); closeModal();
});
window.onclick = function(event) {
  if (event.target === document.getElementById('plant-details-modal')) closePlantDetailsModal();
  if (event.target === document.getElementById('add-plant-modal')) closeModal();
  if (event.target === document.getElementById('log-detail-modal')) closeLogDetailModal();
}