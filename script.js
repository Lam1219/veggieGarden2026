// script.js - Garden Journal Tracker

// --- Plant Care Database ---
// This data is used to populate the detailed modal cards
const PLANT_CARE_DB = {
    cucumber: { 
        water: "High (Consistently Moist)", 
        waterLevel: 4, 
        sun: "Full Sun (6-8 hours)", 
        sunLevel: 5, 
        tips: "Needs lots of water for juicy fruit. Avoid wetting leaves to prevent disease." 
    },
    zucchini: { 
        water: "Moderate to High", 
        waterLevel: 4, 
        sun: "Full Sun (6-8 hours)", 
        sunLevel: 5, 
        tips: "Water deeply at the base to prevent powdery mildew. Harvest frequently." 
    },
    squash: { 
        water: "Moderate", 
        waterLevel: 3, 
        sun: "Full Sun (6-8 hours)", 
        sunLevel: 5, 
        tips: "Allow soil to dry slightly between waterings. Watch for vine borers." 
    },
    tomato: { 
        water: "Consistent", 
        waterLevel: 4, 
        sun: "Full Sun (8+ hours)", 
        sunLevel: 5, 
        tips: "Avoid wetting foliage. Consistent watering prevents blossom end rot." 
    },
    carrot: { 
        water: "Moderate", 
        waterLevel: 3, 
        sun: "Full Sun to Part Shade", 
        sunLevel: 4, 
        tips: "Keep soil loose. Inconsistent water causes roots to split." 
    },
    lettuce: { 
        water: "High", 
        waterLevel: 4, 
        sun: "Partial Sun", 
        sunLevel: 3, 
        tips: "Keep cool. Bolt (go to seed) quickly in hot sun." 
    },
    spinach: { 
        water: "Moderate", 
        waterLevel: 3, 
        sun: "Partial Sun", 
        sunLevel: 3, 
        tips: "Prefers cooler weather. Mulch to keep roots cool." 
    },
    arugula: { 
        water: "Moderate", 
        waterLevel: 3, 
        sun: "Partial Sun", 
        sunLevel: 3, 
        tips: "Fast growing. Harvest outer leaves to encourage more growth." 
    }
};

// --- Default Initial Data (Your Indoor Plants) ---
const DEFAULT_PLANTS = [
    // 5 Cucumbers
    { id: 1, name: 'Cucumber 1', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 2, name: 'Cucumber 2', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 3, name: 'Cucumber 3', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 4, name: 'Cucumber 4', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 5, name: 'Cucumber 5', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    // 4 Squash
    { id: 6, name: 'Squash 1', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 7, name: 'Squash 2', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 8, name: 'Squash 3', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 9, name: 'Squash 4', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    // 4 Zucchini
    { id: 10, name: 'Zucchini 1', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 11, name: 'Zucchini 2', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 12, name: 'Zucchini 3', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 13, name: 'Zucchini 4', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() }
];

let cachedPlants = [];
let cachedLogs = [];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    // Load data from Netlify Server
    await loadPlantsFromServer();
    await loadCareLogsFromServer();
    
    // Populate dropdowns
    populatePlantDropdown();
    
    // Dashboard specific functions
    updateTransplantProgress();
    updateTimelineStatus();
}

// --- Server Communication Functions ---
async function fetchFromServer(endpoint) {
    try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) throw new Error('Network error');
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
        if (!response.ok) throw new Error('Save failed');
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
    
    // If server is empty, initialize with default plants and save them
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
    populatePlantDropdown(); // Update dropdown in care log
}

async function deletePlant(id) {
    event.stopPropagation(); // Stop click event from opening details
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
        if (filter === 'all') card.style.display = 'block';
        else if (filter === 'ready') card.style.display = card.classList.contains('ready') ? 'block' : 'none';
        else card.style.display = card.getAttribute('data-location') === filter ? 'block' : 'none';
    });
}

// --- Plant Details Modal ---

function showPlantDetails(id) {
    const plant = cachedPlants.find(p => p.id === id);
    if (!plant) return;

    const modal = document.getElementById('plant-details-modal');
    const careInfo = PLANT_CARE_DB[plant.type] || PLANT_CARE_DB['cucumber']; // Default to cucumber if unknown
    
    // Populate Text
    document.getElementById('detail-name').textContent = plant.name;
    document.getElementById('detail-variety').textContent = plant.variety;
    document.getElementById('detail-planted').textContent = new Date(plant.plantDate).toLocaleDateString();
    document.getElementById('detail-days').textContent = Math.floor((new Date() - new Date(plant.plantDate)) / (1000 * 60 * 60 * 24));
    document.getElementById('detail-location').textContent = plant.location.charAt(0).toUpperCase() + plant.location.slice(1);
    document.getElementById('detail-notes').textContent = plant.notes || "No notes added";
    document.getElementById('detail-water').textContent = careInfo.water;
    document.getElementById('detail-sun').textContent = careInfo.sun;
    document.getElementById('detail-tips').textContent = careInfo.tips;

    // Populate Indicators
    renderIndicator('detail-water-indicator', careInfo.waterLevel);
    renderIndicator('detail-sun-indicator', careInfo.sunLevel);

    // Store current ID for editing
    modal.dataset.currentId = id;
    
    // Show Modal
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

// --- Care Log Management ---

function populatePlantDropdown() {
    const select = document.getElementById('log-plant');
    if (!select) return;

    // Keep the first option (placeholder)
    select.innerHTML = '<option value="">Select a plant...</option>';
    
    // Add plants sorted by name
    const sortedPlants = [...cachedPlants].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedPlants.forEach(plant => {
        const option = document.createElement('option');
        option.value = plant.name;
        option.textContent = `${plant.name} (${plant.variety})`;
        select.appendChild(option);
    });
}

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
    cachedLogs.unshift(logEntry); // Add new logs to the top
    await saveToServer('logs', cachedLogs);
    renderLogs(cachedLogs);
    
    // Reset form
    document.getElementById('log-notes').value = '';
    document.getElementById('fertilizer-type-group').style.display = 'none';
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
    if (fertilizerGroup) {
        fertilizerGroup.style.display = type === 'fertilizer' ? 'block' : 'none';
    }
}

function clearForm() {
    document.querySelector('form').reset();
    document.getElementById('fertilizer-type-group').style.display = 'none';
}

// --- Dashboard Visuals ---

function updateTransplantProgress() {
    // Hardcoded start date based on your request
    const plantingDate = new Date('2026-04-26');
    const today = new Date();
    const daysSince = Math.max(0, Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24)));
    const totalDays = 28; // Standard transplant time for these crops
    
    const progress = Math.min((daysSince / totalDays) * 100, 100);
    const daysRemaining = Math.max(0, totalDays - daysSince);
    
    // Update UI elements
    document.querySelectorAll('.time-value').forEach(el => el.textContent = daysRemaining);
    document.querySelectorAll('.progress').forEach(el => el.style.width = `${progress}%`);
    
    // Calculate target date
    const transplantDate = new Date(plantingDate);
    transplantDate.setDate(transplantDate.getDate() + totalDays);
    document.querySelectorAll('.transplant-date').forEach(el => {
        el.textContent = `Ready: ${transplantDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    });
}

function updateTimelineStatus() {
    const plantingDate = new Date('2026-04-26');
    const today = new Date();
    const daysSince = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
    
    // Logic to highlight current phase
    // Week 1-2 (0-14 days), Week 3 (14-21), etc.
    const timelineSteps = document.querySelectorAll('.timeline-step');
    
    if (timelineSteps.length >= 6) {
        // Reset all
        timelineSteps.forEach(step => step.classList.remove('active'));
        
        // Determine current step
        let currentStepIndex = 0;
        if (daysSince > 21) currentStepIndex = 2; // Week 4
        else if (daysSince > 14) currentStepIndex = 1; // Week 3
        else if (daysSince > 7) currentStepIndex = 0; // Week 1-2
        
        // Activate current and previous steps
        for (let i = 0; i <= currentStepIndex; i++) {
            if (timelineSteps[i]) timelineSteps[i].classList.add('active');
        }
    }
}

// --- Modal Controls ---

function showAddPlantModal() {
    document.getElementById('add-plant-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('add-plant-modal').style.display = 'none';
}

// Handle Add Plant Form
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

// Close modal when clicking outside
window.onclick = function(event) {
    const plantModal = document.getElementById('plant-details-modal');
    const addModal = document.getElementById('add-plant-modal');
    if (event.target === plantModal) closePlantDetailsModal();
    if (event.target === addModal) closeModal();
}