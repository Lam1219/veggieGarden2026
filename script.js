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

// --- Initialization ---
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    await loadPlantsFromServer();
    await loadCareLogsFromServer();
    populatePlantDropdown();
    updateTransplantProgress();
    updateTimelineStatus();
}

// --- Server Communication ---
async function fetchFromServer(endpoint) {
  try {
    const response = await fetch(`/api/${endpoint}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn(`⚠️ Server fetch failed for ${endpoint}. Using local fallback.`);
    return []; // Returns empty array so UI still loads
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
    console.error(`❌ Failed to save ${endpoint}:`, error);
    // Silently fail instead of blocking UI
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
    const plantsGrid = document.getElementById('plants-grid');
    if (!plantsGrid) return;
    if (plants.length === 0) {
        plantsGrid.innerHTML = '<p class="no-plants">No plants added yet.</p>';
        return;
    }
    plantsGrid.innerHTML = plants.map(plant => {
        const daysSincePlanting = Math.floor((new Date() - new Date(plant.plantDate)) / (1000 * 60 * 60 * 24));
        const readyToTransplant = daysSincePlanting >= 21 && plant.location === 'indoor';
        return `
            <div class="plant-card ${plant.location} ${readyToTransplant ? 'ready' : ''}" 
                 onclick="showPlantDetails(${plant.id})" 
                 data-location="${plant.location}">
                <div class="plant-card-header">
                    <div class="plant-card-name">${plant.name}</div>
                    <span class="plant-badge ${readyToTransplant ? 'ready' : ''}">
                        ${plant.location === 'indoor' ? (readyToTransplant ? '✓ Ready' : '🏠 Indoor') : '🌱 Outdoor'}
                    </span>
                </div>
                <div class="plant-card-info">
                    <p><strong>Variety:</strong> ${plant.variety || 'N/A'}</p>
                    <p><strong>Type:</strong> ${plant.type}</p>
                    <p><strong>Planted:</strong> ${new Date(plant.plantDate).toLocaleDateString()}</p>
                    <p><strong>Days Growing:</strong> ${daysSincePlanting} days</p>
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
    populatePlantDropdown();
}

async function deletePlant(id) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this plant?')) {
        cachedPlants = cachedPlants.filter(p => p.id !== id);
        await saveToServer('plants', cachedPlants);
        renderPlants(cachedPlants);
        populatePlantDropdown();
    }
}

function filterPlants(filter) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    const cards = document.querySelectorAll('.plant-card');
    cards.forEach(card => {
        const location = card.getAttribute('data-location');
        const isReady = card.classList.contains('ready');
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

// --- Dropdown Population (Plants + Herbs) ---
function populatePlantDropdown() {
    const select = document.getElementById('log-plant');
    if (!select) return;

    // Clear existing options except the first one
    select.innerHTML = '<option value="">Select plant or herb...</option>';
    
    // Create Plants Group
    const plantGroup = document.createElement('optgroup');
    plantGroup.label = "Active Plants";
    
    const sortedPlants = [...cachedPlants].sort((a, b) => a.name.localeCompare(b.name));
    sortedPlants.forEach(plant => {
        const option = document.createElement('option');
        option.value = plant.name;
        option.textContent = `${plant.name} (${plant.variety})`;
        plantGroup.appendChild(option);
    });
    select.appendChild(plantGroup);

    // Create Herbs Group
    const herbGroup = document.createElement('optgroup');
    herbGroup.label = "Herbs (Pots 1-6)";
    
    HERBS.forEach(herb => {
        const option = document.createElement('option');
        option.value = herb.name;
        option.textContent = `${herb.name} ${herb.notes}`;
        herbGroup.appendChild(option);
    });
    select.appendChild(herbGroup);
}

// --- Care Log Logic ---
async function saveCareLog(event) {
    event.preventDefault();
    const logEntry = {
        id: Date.now(),
        plant: document.getElementById('log-plant').value,
        date: document.getElementById('log-date').value,
        type: document.getElementById('log-type').value,
        fertilizerType: document.getElementById('fertilizer-type')?.value || '',
        notes: document.getElementById('log-notes').value,
        createdAt: new Date().toISOString()
    };
    
    if (!cachedLogs) cachedLogs = [];
    cachedLogs.unshift(logEntry);
    await saveToServer('logs', cachedLogs);
    renderLogs(cachedLogs);
    document.getElementById('log-notes').value = '';
    alert('Log entry saved!');
}

async function loadCareLogsFromServer() {
    cachedLogs = await fetchFromServer('logs');
    renderLogs(cachedLogs);
}

function renderLogs(logs) {
    const logHistory = document.getElementById('log-history');
    if (!logHistory) return;
    if (!logs || logs.length === 0) {
        logHistory.innerHTML = '<p class="no-activity">No care logs yet.</p>';
        return;
    }
    logHistory.innerHTML = logs.map(log => `
        <div class="log-entry ${log.type}">
            <div class="log-header">
                <span class="log-plant-name">${log.plant}</span>
                <span class="log-date">${new Date(log.date).toLocaleDateString()}</span>
            </div>
            <span class="log-type-badge">${getLogTypeLabel(log.type)}</span>
            ${log.fertilizerType ? `<p><strong>Fertilizer:</strong> ${log.fertilizerType}</p>` : ''}
            <p>${log.notes || 'No notes'}</p>
        </div>
    `).join('');
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
    if (fertilizerGroup) fertilizerGroup.style.display = type === 'fertilizer' ? 'block' : 'none';
}

function clearForm() {
    document.querySelector('form').reset();
    document.getElementById('fertilizer-type-group').style.display = 'none';
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


// --- Delete Plant Function ---
async function deletePlant(event, id) {
    event.stopPropagation(); // Prevent opening plant details
    
    const plant = cachedPlants.find(p => p.id === id);
    if (!plant) return;
    
    if (confirm(`Delete "${plant.name}"? This cannot be undone.`)) {
        cachedPlants = cachedPlants.filter(p => p.id !== id);
        await saveToServer('plants', cachedPlants);
        renderPlants(cachedPlants);
        populatePlantDropdown(); // Update dropdown in care log
    }
}

// --- Delete Care Log Entry Function ---
async function deleteLogEntry(event, id) {
    event.stopPropagation(); // Prevent any parent click handlers
    
    const entry = cachedLogs.find(l => l.id === id);
    if (!entry) return;
    
    if (confirm(`Delete this log entry for "${entry.plant}"? This cannot be undone.`)) {
        cachedLogs = cachedLogs.filter(l => l.id !== id);
        await saveToServer('logs', cachedLogs);
        renderLogs(cachedLogs);
    }
}

// --- Modals ---
function showAddPlantModal() { document.getElementById('add-plant-modal').style.display = 'block'; }
function closeModal() { document.getElementById('add-plant-modal').style.display = 'none'; }
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