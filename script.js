// script.js - Garden Journal Tracker

// --- Plant Care Database ---
const PLANT_CARE_DB = {
    tomato: { 
        water: "Consistent", waterLevel: 4, 
        sun: "Full Sun (8+ hours)", sunLevel: 5,
        start: "Start indoors 6-8 weeks before transplant",
        spacing: "24-36 inches apart",
        tips: "Use cages. Ferment seeds for best saving results."
    },
    cucumber: { 
        water: "High (Consistently Moist)", waterLevel: 5, 
        sun: "Full Sun (6-8 hours)", sunLevel: 5,
        start: "Start indoors in biodegradable pots",
        spacing: "12 inches apart on trellis",
        tips: "Train on trellis. Harvest when small for best flavor."
    },
    zucchini: { 
        water: "Moderate to High", waterLevel: 4, 
        sun: "Full Sun (6-8 hours)", sunLevel: 5,
        start: "Start indoors, transplant mid-May",
        spacing: "36 inches apart (gets very large!)",
        tips: "Limit to 2-4 plants per box. Harvest frequently."
    },
    squash: { 
        water: "Moderate", waterLevel: 3, 
        sun: "Full Sun (6-8 hours)", sunLevel: 5,
        start: "Start indoors, transplant mid-May",
        spacing: "36 inches apart",
        tips: "Allow space to spread. Harvest when small and tender."
    },
    lettuce: { 
        water: "High", waterLevel: 4, 
        sun: "Partial Sun (4-6 hours)", sunLevel: 3,
        start: "Direct sow outside",
        spacing: "6-8 inches apart",
        tips: "Succession sow every 2 weeks for continuous harvest."
    },
    spinach: { 
        water: "Moderate", waterLevel: 3, 
        sun: "Partial Sun", sunLevel: 3,
        start: "Direct sow outside",
        spacing: "4-6 inches apart",
        tips: "Harvest outer leaves to extend production."
    },
    arugula: { 
        water: "Moderate", waterLevel: 3, 
        sun: "Partial Sun", sunLevel: 3,
        start: "Direct sow outside or scatter in gaps",
        spacing: "6 inches apart",
        tips: "Fast growing. Harvest before tomatoes shade it."
    },
    carrot: { 
        water: "Moderate", waterLevel: 3, 
        sun: "Full Sun to Part Shade", sunLevel: 4,
        start: "Direct sow outside",
        spacing: "2-3 inches apart after thinning",
        tips: "Keep soil loose. Thin seedlings to prevent forked roots."
    }
};

// --- Herbs Data ---
const HERBS = [
    { name: 'Mojito Mint', type: 'herb', notes: 'Pot 1 (Moist)' },
    { name: 'Rosemary', type: 'herb', notes: 'Pot 2 (Dry)' },
    { name: 'French Thyme', type: 'herb', notes: 'Pot 3 (Dry)' },
    { name: 'Greek Oregano', type: 'herb', notes: 'Pot 3 (Dry)' },
    { name: 'Regular Sage', type: 'herb', notes: 'Pot 4 (Dry)' },
    { name: 'Pineapple Sage', type: 'herb', notes: 'Pot 4 (Dry)' },
    { name: 'Basil', type: 'herb', notes: 'Pot 5 (Moist)' },
    { name: 'Flat Parsley', type: 'herb', notes: 'Pot 5 (Moist)' },
    { name: 'Cilantro', type: 'herb', notes: 'Pot 6 (Moist)' }
];

// --- Default Initial Data ---
const DEFAULT_PLANTS = [
    // Indoor Plants (Planted April 26)
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
    // Outdoor Greens
    { id: 16, name: 'Lettuce Row 1', variety: 'Super Gourmet Blend', type: 'lettuce', plantDate: '2026-05-03', location: 'outdoor', notes: 'Planned for Box 2', createdAt: new Date().toISOString() },
    { id: 17, name: 'Spinach Row 1', variety: 'Renegade', type: 'spinach', plantDate: '2026-05-03', location: 'outdoor', notes: 'Planned for Box 2', createdAt: new Date().toISOString() },
    { id: 18, name: 'Arugula Patch', variety: 'Astro', type: 'arugula', plantDate: '2026-05-03', location: 'outdoor', notes: 'Planned for Box 1 gaps', createdAt: new Date().toISOString() },
    { id: 19, name: 'Carrot Bed', variety: 'Rainbow Blend', type: 'carrot', plantDate: '2026-05-03', location: 'outdoor', notes: 'Planned for Box 1', createdAt: new Date().toISOString() }
];

let cachedPlants = [];
let cachedLogs = [];

// --- Image Upload & Compression State ---
let currentImageFile = null;
let currentImageUrl = null;

// DOM Elements
const uploadBtn = document.getElementById('uploadPicBtn');
const fileInput = document.getElementById('picFileInput');
const previewImg = document.getElementById('previewImg');
const uploadStatus = document.getElementById('uploadStatus');
const removeBtn = document.getElementById('removePicBtn');

// Attach listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (uploadBtn) uploadBtn.addEventListener('click', () => fileInput?.click());
  if (removeBtn) removeBtn.addEventListener('click', resetImageUpload);
  
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        uploadStatus.textContent = '❌ Only image files allowed.';
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        uploadStatus.textContent = '❌ File too large (Max 15MB).';
        return;
      }

      uploadStatus.textContent = '⏳ Compressing...';
      try {
        const options = {
          maxSizeMB: 0.4,           // Target ~400KB
          maxWidthOrHeight: 1920,   // Cap resolution
          useWebWorker: true,       // Keeps UI responsive
          fileType: 'image/jpeg',   // Better compression for photos
          exifOrientation: true     // Fixes iPhone/Android rotation
        };
        
        currentImageFile = await imageCompression(file, options);
        previewImg.src = URL.createObjectURL(currentImageFile);
        previewImg.style.display = 'block';
        removeBtn.classList.remove('hidden');
        uploadStatus.textContent = '✅ Ready (~400KB)';
        uploadStatus.style.color = 'var(--color-success)';
      } catch (err) {
        console.error('Compression error:', err);
        uploadStatus.textContent = '❌ Failed to compress image.';
        uploadStatus.style.color = '#dc2626';
      }
    });
  }
});

function resetImageUpload() {
  currentImageFile = null;
  currentImageUrl = null;
  if (fileInput) fileInput.value = '';
  if (previewImg) { previewImg.src = ''; previewImg.style.display = 'none'; }
  if (removeBtn) removeBtn.classList.add('hidden');
  if (uploadStatus) { uploadStatus.textContent = ''; uploadStatus.style.color = ''; }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
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

// Global cache for daily task completion
let cachedTaskStatus = {}; 

// Load task status from server
async function loadTaskStatusFromServer() {
    try {
        const data = await fetchFromServer('task_status');
        cachedTaskStatus = data || {};
    } catch (error) {
        console.warn('⚠️ Failed to load task status, starting fresh:', error);
        cachedTaskStatus = {};
    }
}

// Save a single task toggle to server
async function saveTaskStatus(dateKey, taskSlug, isChecked) {
    if (!cachedTaskStatus[dateKey]) {
        cachedTaskStatus[dateKey] = {};
    }
    cachedTaskStatus[dateKey][taskSlug] = isChecked;
    await saveToServer('task_status', cachedTaskStatus);
}

// --- Live Weather Fetch (Cloudflare Function Proxy) ---
async function fetchHamiltonWeather() {
    try {
        const response = await fetch('/weather');
        
        if (!response.ok) throw new Error('Weather fetch failed');
        
        const data = await response.json();
        
        // Update UI elements
        document.getElementById('weather-temp').textContent = `${data.temp}°C`;
        document.getElementById('weather-humidity').textContent = `${data.humidity}%`;
        document.getElementById('weather-wind').textContent = `${data.wind} km/h`;
        document.getElementById('weather-desc').textContent = data.desc;
        
        // Update icon based on weather condition
        const iconMap = {
            '01d': 'fa-sun', '01n': 'fa-moon',
            '02d': 'fa-cloud-sun', '02n': 'fa-cloud-moon',
            '03d': 'fa-cloud', '03n': 'fa-cloud',
            '04d': 'fa-cloud', '04n': 'fa-cloud',
            '09d': 'fa-cloud-rain', '09n': 'fa-cloud-rain',
            '10d': 'fa-cloud-showers-heavy', '10n': 'fa-cloud-rain',
            '11d': 'fa-bolt', '11n': 'fa-bolt',
            '13d': 'fa-snowflake', '13n': 'fa-snowflake',
            '50d': 'fa-smog', '50n': 'fa-smog'
        };
        document.getElementById('weather-icon').className = `fas ${iconMap[data.icon] || 'fa-cloud'}`;
        
    } catch (error) {
        console.warn('⚠️ Weather fetch failed, using fallback:', error.message);
        // Fallback values
        document.getElementById('weather-temp').textContent = '18°C';
        document.getElementById('weather-humidity').textContent = '65%';
        document.getElementById('weather-wind').textContent = '12 km/h';
        document.getElementById('weather-desc').textContent = 'Partly cloudy';
        document.getElementById('weather-icon').className = 'fas fa-cloud-sun';
    }
}

// --- Server Communication ---
async function fetchFromServer(endpoint) {
    try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [];
    }
}

async function saveToServer(endpoint, data) {
    try {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return true;
    } catch (error) {
        console.error(`Error saving ${endpoint}:`, error);
        alert('Failed to save to server.');
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

  // 📦 Group by variety + location
  const groups = {};
  plants.forEach(p => {
    const key = `${p.variety}_${p.location}`;
    if (!groups[key]) {
      groups[key] = {
        variety: p.variety,
        location: p.location,
        type: p.type,
        count: 0,
        list: [],
        maxDays: 0,
        allReady: true
      };
    }
    groups[key].count++;
    groups[key].list.push(p);
    
    const days = Math.floor((new Date() - new Date(p.plantDate)) / 86400000);
    if (days > groups[key].maxDays) groups[key].maxDays = days;
    if (days < 21 || p.location !== 'indoor') groups[key].allReady = false;
  });

  const typeEmojis = {
    tomato: '🍅', cucumber: '🥒', zucchini: '🥒', squash: '🎃',
    lettuce: '🥬', spinach: '🥬', arugula: '🌿', carrot: '🥕'
  };

  container.innerHTML = Object.values(groups).map(group => {
    const statusBadge = group.allReady 
      ? `<span class="status-badge ready">✓ Ready</span>` 
      : `<span class="status-badge growing">${group.maxDays} days</span>`;
    
    const locationIcon = group.location === 'indoor' ? '🏠' : '🌱';
    const emoji = typeEmojis[group.type] || '🌱';

    return `
      <div class="plant-group-card" 
           data-location="${group.location}" 
           data-ready="${group.allReady}"
           onclick="this.classList.toggle('expanded')">
        <div class="group-header">
          <div class="group-main">
            <span class="group-icon">${emoji}</span>
            <div class="group-text">
              <h3 class="group-variety">${group.variety}</h3>
              <span class="group-meta">${group.count} plant${group.count > 1 ? 's' : ''} • ${locationIcon} ${group.location}</span>
            </div>
          </div>
          <div class="group-status">
            ${statusBadge}
            <i class="fas fa-chevron-down toggle-icon"></i>
          </div>
        </div>
        <div class="group-details">
          ${group.list.map(p => `
            <div class="plant-detail-row" onclick="event.stopPropagation(); showPlantDetails(${p.id})">
              <span class="plant-name">${p.name}</span>
              <span class="plant-note">${p.notes || ''}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}
async function addPlant(plant) {
    if (!cachedPlants) cachedPlants = [];
    cachedPlants.push(plant);
    await saveToServer('plants', cachedPlants);
    renderPlants(cachedPlants);
    populatePlantSelector(); // ✅ Updated
}

async function deletePlant(event, id) {
    event.stopPropagation();
    const plant = cachedPlants.find(p => p.id === id);
    if (!plant) return;
    
    if (confirm(`Delete "${plant.name}"? This cannot be undone.`)) {
        cachedPlants = cachedPlants.filter(p => p.id !== id);
        await saveToServer('plants', cachedPlants);
        renderPlants(cachedPlants);
        populatePlantSelector(); // ✅ Updated
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
    
    const modal = document.getElementById('plant-details-modal');
    const careInfo = PLANT_CARE_DB[plant.type] || PLANT_CARE_DB['tomato'];
    
    document.getElementById('detail-water').textContent = careInfo.water;
    document.getElementById('detail-sun').textContent = careInfo.sun;
    document.getElementById('detail-tips').textContent = careInfo.tips;
    document.getElementById('detail-spacing').textContent = careInfo.spacing;
    document.getElementById('detail-start').textContent = careInfo.start;
    
    renderIndicator('detail-water-indicator', careInfo.waterLevel);
    renderIndicator('detail-sun-indicator', careInfo.sunLevel);
    
    modal.style.display = 'block';
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

function closePlantDetailsModal() {
    document.getElementById('plant-details-modal').style.display = 'none';
}

// --- Checkbox Tree Selector Population ---
function populatePlantSelector() {
  const container = document.getElementById('plant-groups');
  if (!container) return;

  // Show loading state if data isn't ready yet
  if (!cachedPlants || cachedPlants.length === 0) {
    container.innerHTML = '<div style="padding: 1rem; color: var(--color-text-secondary); text-align: center;">Loading plants...</div>';
    return;
  }

  container.innerHTML = '';
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
          <span class="group-name">${groupName}</span>
          <span class="group-count">(${plants.length})</span>
          <i class="fas fa-chevron-down toggle-icon" style="transform: ${index === 0 ? 'rotate(0)' : 'rotate(-90deg)'}"></i>
        </div>
        <div class="group-options">
          ${plants.map(plant => {
            const name = plant.name || plant;
            const variety = plant.variety || plant.notes || '';
            const plantId = `plant-${name.replace(/[^a-zA-Z0-9]/g, '')}`;
            return `
              <label class="plant-option" for="${plantId}">
                <input type="checkbox" id="${plantId}" value="${name}" class="plant-checkbox" data-group="${groupId}" onchange="updateGroupCheckbox('${groupId}')">
                <span>${name} ${variety ? `(${variety})` : ''}</span>
              </label>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// --- Checkbox Tree Control Functions ---
function toggleGroup(groupId) {
    const group = document.getElementById(`group-${groupId}`);
    if (group) {
        const isExpanded = group.classList.toggle('expanded');
        const icon = group.querySelector('.toggle-icon');
        icon.style.transform = isExpanded ? 'rotate(0)' : 'rotate(-90deg)';
    }
}

function toggleGroupSelection(groupId, checkbox) {
    const isChecked = checkbox.checked;
    const checkboxes = document.querySelectorAll(`.plant-checkbox[data-group="${groupId}"]`);
    checkboxes.forEach(cb => cb.checked = isChecked);
    updateSelectAllCheckbox();
}

function updateGroupCheckbox(groupId) {
    const checkboxes = document.querySelectorAll(`.plant-checkbox[data-group="${groupId}"]`);
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    const someChecked = Array.from(checkboxes).some(cb => cb.checked);
    const groupCheckbox = document.querySelector(`.group-checkbox[data-group="${groupId}"]`);
    
    if (groupCheckbox) {
        groupCheckbox.checked = allChecked;
        groupCheckbox.indeterminate = someChecked && !allChecked;
    }
    updateSelectAllCheckbox();
}

function toggleAllPlants(event) {
    if (event.target.id === 'select-all-plants' || event.target.tagName === 'LABEL') return;
    
    const selectAll = document.getElementById('select-all-plants');
    selectAll.checked = !selectAll.checked;
    
    document.querySelectorAll('.plant-checkbox, .group-checkbox').forEach(cb => {
        cb.checked = selectAll.checked;
        cb.indeterminate = false;
    });
}

function updateSelectAllCheckbox() {
    const allCheckboxes = document.querySelectorAll('.plant-checkbox');
    const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
    const someChecked = Array.from(allCheckboxes).some(cb => cb.checked);
    const selectAll = document.getElementById('select-all-plants');
    
    selectAll.checked = allChecked;
    selectAll.indeterminate = someChecked && !allChecked;
}

// --- Care Log Management (Checkbox Tree Support) ---
async function saveCareLog(event) {
  event.preventDefault();
  const selectedCheckboxes = document.querySelectorAll('.plant-checkbox:checked');
  const selectedPlants = Array.from(selectedCheckboxes).map(cb => cb.value);

  if (selectedPlants.length === 0) {
    alert('Please select at least one plant');
    return;
  }

  // 📤 Upload image if present
  let imageUrl = currentImageUrl;
  if (currentImageFile && !currentImageUrl) {
    uploadStatus.textContent = '⏫ Uploading...';
    try {
      const formData = new FormData();
      formData.append('image', currentImageFile, 'care-log.jpg');
      
      // Replace with your actual upload endpoint
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      imageUrl = data.url;
      currentImageUrl = imageUrl;
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Image upload failed. Please try again.');
      return;
    }
  }

  const logEntry = {
    id: Date.now(),
    plants: selectedPlants,
    date: document.getElementById('log-date').value,
    type: document.getElementById('log-type').value,
    fertilizerType: document.getElementById('fertilizer-type')?.value || '',
    notes: document.getElementById('log-notes').value,
    imageUrl: imageUrl || null, // ✅ Store compressed image URL
    createdAt: new Date().toISOString()
  };

  if (!cachedLogs) cachedLogs = [];
  cachedLogs.unshift(logEntry);
  await saveToServer('logs', cachedLogs);
  renderLogs(cachedLogs);
  clearForm();
  alert('Log entry saved!');
}

async function loadCareLogsFromServer() {
    cachedLogs = await fetchFromServer('logs');
    renderLogs(cachedLogs);
}

async function saveCareLog(event) {
  event.preventDefault();
  const selectedCheckboxes = document.querySelectorAll('.plant-checkbox:checked');
  const selectedPlants = Array.from(selectedCheckboxes).map(cb => cb.value);

  if (selectedPlants.length === 0) {
    alert('Please select at least one plant');
    return;
  }

  // 📤 Upload image if present
  let imageUrl = currentImageUrl;
  if (currentImageFile && !currentImageUrl) {
    uploadStatus.textContent = '⏫ Uploading...';
    try {
      const formData = new FormData();
      formData.append('image', currentImageFile, 'care-log.jpg');
      
      // Replace with your actual upload endpoint
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      imageUrl = data.url;
      currentImageUrl = imageUrl;
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Image upload failed. Please try again.');
      return;
    }
  }

  const logEntry = {
    id: Date.now(),
    plants: selectedPlants,
    date: document.getElementById('log-date').value,
    type: document.getElementById('log-type').value,
    fertilizerType: document.getElementById('fertilizer-type')?.value || '',
    notes: document.getElementById('log-notes').value,
    imageUrl: imageUrl || null, // ✅ Store compressed image URL
    createdAt: new Date().toISOString()
  };

  if (!cachedLogs) cachedLogs = [];
  cachedLogs.unshift(logEntry);
  await saveToServer('logs', cachedLogs);
  renderLogs(cachedLogs);
  clearForm();
  alert('Log entry saved!');
}
async function deleteLogEntry(event, id) {
    event.stopPropagation();
    const entry = cachedLogs.find(l => l.id === id);
    if (!entry) return;
    
    const plantNames = Array.isArray(entry.plants) 
        ? entry.plants.join(', ') 
        : entry.plant || 'this entry';
    
    if (confirm(`Delete this log entry for "${plantNames}"? This cannot be undone.`)) {
        cachedLogs = cachedLogs.filter(l => l.id !== id);
        await saveToServer('logs', cachedLogs);
        renderLogs(cachedLogs);
    }
}

function getLogTypeLabel(type) {
    const labels = {
        watering: '💧 Watering',
        fertilizer: '🌿 Fertilizer',
        pest: '🐛 Pest/Disease',
        maintenance: '🔧 Maintenance',
        observation: '👁️ Observation'
    };
    return labels[type] || type;
}

function toggleFields() {
    const type = document.getElementById('log-type').value;
    const fertilizerGroup = document.getElementById('fertilizer-type-group');
    if (fertilizerGroup) {
        fertilizerGroup.style.display = type === 'fertilizer' ? 'block' : 'none';
    }
}

async function saveCareLog(event) {
  event.preventDefault();
  const selectedCheckboxes = document.querySelectorAll('.plant-checkbox:checked');
  const selectedPlants = Array.from(selectedCheckboxes).map(cb => cb.value);

  if (selectedPlants.length === 0) {
    alert('Please select at least one plant');
    return;
  }

  // 📤 Upload image if present
  let imageUrl = currentImageUrl;
  if (currentImageFile && !currentImageUrl) {
    uploadStatus.textContent = '⏫ Uploading...';
    try {
      const formData = new FormData();
      formData.append('image', currentImageFile, 'care-log.jpg');
      
      // Replace with your actual upload endpoint
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      imageUrl = data.url;
      currentImageUrl = imageUrl;
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Image upload failed. Please try again.');
      return;
    }
  }

  const logEntry = {
    id: Date.now(),
    plants: selectedPlants,
    date: document.getElementById('log-date').value,
    type: document.getElementById('log-type').value,
    fertilizerType: document.getElementById('fertilizer-type')?.value || '',
    notes: document.getElementById('log-notes').value,
    imageUrl: imageUrl || null, // ✅ Store compressed image URL
    createdAt: new Date().toISOString()
  };

  if (!cachedLogs) cachedLogs = [];
  cachedLogs.unshift(logEntry);
  await saveToServer('logs', cachedLogs);
  renderLogs(cachedLogs);
  clearForm();
  alert('Log entry saved!');
}
// --- Dynamic Task Generator (Server-Synced) ---
function updateTodaysTasks() {
    const container = document.getElementById('tasks-container');
    const dateEl = document.getElementById('task-date');
    if (!container) return;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // e.g., "2026-04-26"
    dateEl.textContent = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Check which plants are ready to transplant (21+ days old, indoor location)
    const plantsReady = cachedPlants.filter(p => 
        p.location === 'indoor' && 
        (new Date() - new Date(p.plantDate)) / (1000 * 60 * 60 * 24) >= 21
    );

    const hasReadyPlants = plantsReady.length > 0;
    const tasks = hasReadyPlants ? getTransplantTasks(plantsReady) : getSeedlingTasks();

    // Get today's cached status from server
    const todayTasksStatus = cachedTaskStatus[todayStr] || {};

    container.innerHTML = tasks.map((task) => {
        // Create a stable slug for server storage
        const taskSlug = task.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        const isChecked = todayTasksStatus[taskSlug] === true;

        return `
            <div class="task-item ${isChecked ? 'completed' : ''}">
                <div class="task-checkbox">
                    <input type="checkbox" data-task-slug="${taskSlug}">
                </div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-desc">${task.desc}</div>
                    ${task.plants ? `<div class="task-plants text-muted mt-xs">${task.plants}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');

    // Attach event listeners for server sync
    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = todayTasksStatus[checkbox.dataset.taskSlug] === true;
        
        checkbox.addEventListener('change', async (e) => {
            const slug = e.target.dataset.taskSlug;
            const isChecked = e.target.checked;
            
            // 💾 Save to server immediately
            await saveTaskStatus(todayStr, slug, isChecked);
            
            // 🎨 Update UI styling
            const taskItem = e.target.closest('.task-item');
            if (isChecked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
        });
    });
}

function getSeedlingTasks() {
    return [
        {
            title: 'Check seedling moisture',
            desc: 'Indoor pots - soil should be moist but not waterlogged'
        },
        {
            title: 'Ensure adequate light',
            desc: '6-8 hours of light for all seedlings; rotate pots for even growth'
        },
        {
            title: 'Monitor temperature',
            desc: 'Keep between 70-85°F (21-29°C) for optimal germination'
        },
        {
            title: 'Inspect for damping-off',
            desc: 'Watch for thin, weak stems or mold at soil line'
        },
        {
            title: 'Thin crowded seedlings',
            desc: 'Snip weakest at soil level; keep strongest per pot'
        }
    ];
}

function getTransplantTasks(readyPlants) {
    const plantNames = readyPlants.map(p => p.name).join(', ');
    
    return [
        {
            title: '🌱 Harden off seedlings',
            desc: 'Start with 2-3 hours outside in shade; gradually increase exposure over 7-10 days',
            plants: `Ready: ${plantNames}`
        },
        {
            title: '🌡️ Check nighttime forecast',
            desc: 'Ensure temps stay above 50°F (10°C) for 7+ days before transplanting'
        },
        {
            title: '🪴 Prepare garden boxes',
            desc: 'Add compost, install trellises for cucumbers/tomatoes, mark planting spots'
        },
        {
            title: '💧 Pre-water transplant holes',
            desc: 'Water holes deeply before moving plants to reduce transplant shock'
        },
        {
            title: '🌤️ Transplant on cloudy day',
            desc: 'Move plants in evening or on overcast day; water deeply after planting'
        }
    ];
}

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    // Exit if elements don't exist
    if (!menuBtn || !sidebar) return;
    
    // Toggle sidebar
    function toggleMenu() {
        const isActive = sidebar.classList.toggle('active');
        overlay.classList.toggle('active', isActive);
        document.body.classList.toggle('menu-open', isActive);
    }
    
    // Close sidebar
    function closeMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Event listeners
    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Close when clicking a nav link (mobile only)
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close if resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// Initialize after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// --- Dynamic Date Updater ---
function updateCurrentDate() {
    // Format: "Monday, April 26, 2026"
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    
    const headerDate = document.getElementById('header-date');
    const currentDatespan = document.getElementById('current-date');
    
    if (headerDate) headerDate.textContent = today;
    if (currentDatespan) currentDatespan.textContent = today;
}

// --- Visual Updates ---
function updateTransplantProgress() {
    const plantingDate = new Date('2026-04-26');
    const today = new Date();
    const daysSince = Math.max(0, Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24)));
    const totalDays = 21;
    const progress = Math.min((daysSince / totalDays) * 100, 100);
    const daysRemaining = Math.max(0, totalDays - daysSince);
    
    document.querySelectorAll('.countdown-days').forEach(el => el.textContent = daysRemaining);
    document.querySelectorAll('.progress').forEach(el => el.style.width = `${progress}%`);
}

function updateTimelineStatus() {
    const plantingDate = new Date('2026-04-26');
    const today = new Date();
    const daysSince = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
    const timelineSteps = document.querySelectorAll('.timeline-step');
    
    if (timelineSteps.length >= 5) {
        timelineSteps.forEach(step => step.classList.remove('active'));
        let currentStepIndex = 0;
        if (daysSince > 14) currentStepIndex = 1;
        else if (daysSince > 7) currentStepIndex = 0;
        
        for (let i = 0; i <= currentStepIndex; i++) {
            if (timelineSteps[i]) timelineSteps[i].classList.add('active');
        }
    }
}

// --- Modals ---
function showAddPlantModal() {
    document.getElementById('add-plant-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('add-plant-modal').style.display = 'none';
}

document.getElementById('add-plant-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const plant = {
        id: Date.now(),
        name: document.getElementById('plant-name').value,
        variety: document.getElementById('plant-variety').value,
        type: document.getElementById('plant-type').value,
        plantDate: document.getElementById('plant-date').value,
        location: document.getElementById('location').value,
        notes: document.getElementById('notes').value,
        createdAt: new Date().toISOString()
    };
    
    await addPlant(plant);
    this.reset();
    closeModal();
});

window.onclick = function(event) {
    if (event.target === document.getElementById('plant-details-modal')) closePlantDetailsModal();
    if (event.target === document.getElementById('add-plant-modal')) closeModal();
}