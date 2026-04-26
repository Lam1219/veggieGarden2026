// Garden Journal Tracker - Main JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set current date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Load saved data or initialize with current plants
    loadPlants();
    loadCareLogs();
    updateTransplantProgress();
    
    // Set today's date in log form
    const logDateInput = document.getElementById('log-date');
    if (logDateInput) {
        logDateInput.valueAsDate = new Date();
    }
}

// Data Storage Functions
function getPlants() {
    const plants = localStorage.getItem('gardenPlants');
    if (plants) {
        return JSON.parse(plants);
    }
    // Initialize with current indoor plants
    return [
        {
            id: 1,
            name: 'Cucumber 1',
            variety: 'Lebanese Beit Alpha',
            type: 'cucumber',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Cucumber 2',
            variety: 'Lebanese Beit Alpha',
            type: 'cucumber',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            name: 'Cucumber 3',
            variety: 'Lebanese Beit Alpha',
            type: 'cucumber',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 4,
            name: 'Cucumber 4',
            variety: 'Lebanese Beit Alpha',
            type: 'cucumber',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 5,
            name: 'Cucumber 5',
            variety: 'Lebanese Beit Alpha',
            type: 'cucumber',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 6,
            name: 'Squash 1',
            variety: 'Sunburst',
            type: 'squash',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 7,
            name: 'Squash 2',
            variety: 'Sunburst',
            type: 'squash',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 8,
            name: 'Squash 3',
            variety: 'Sunburst',
            type: 'squash',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 9,
            name: 'Squash 4',
            variety: 'Sunburst',
            type: 'squash',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 10,
            name: 'Zucchini 1',
            variety: 'Jackpot',
            type: 'zucchini',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 11,
            name: 'Zucchini 2',
            variety: 'Jackpot',
            type: 'zucchini',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 12,
            name: 'Zucchini 3',
            variety: 'Jackpot',
            type: 'zucchini',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        },
        {
            id: 13,
            name: 'Zucchini 4',
            variety: 'Jackpot',
            type: 'zucchini',
            plantDate: new Date().toISOString().split('T')[0],
            location: 'indoor',
            notes: 'Started in small pot indoors',
            createdAt: new Date().toISOString()
        }
    ];
}

function savePlants(plants) {
    localStorage.setItem('gardenPlants', JSON.stringify(plants));
}

function getCareLogs() {
    const logs = localStorage.getItem('gardenCareLogs');
    return logs ? JSON.parse(logs) : [];
}

function saveCareLogs(logs) {
    localStorage.setItem('gardenCareLogs', JSON.stringify(logs));
}

// Plant Management
function showAddPlantModal() {
    document.getElementById('add-plant-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('add-plant-modal').style.display = 'none';
}

document.getElementById('add-plant-form')?.addEventListener('submit', function(e) {
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
    
    const plants = getPlants();
    plants.push(plant);
    savePlants(plants);
    
    // Reset form and close modal
    this.reset();
    closeModal();
    
    // Reload plants
    loadPlants();
    
    // Show success message
    alert('Plant added successfully!');
});

function loadPlants() {
    const plants = getPlants();
    const plantsGrid = document.getElementById('plants-grid');
    
    if (!plantsGrid) return;
    
    if (plants.length === 0) {
        plantsGrid.innerHTML = '<p class="no-plants">No plants added yet. Click "Add New Plant" to get started!</p>';
        return;
    }
    
    plantsGrid.innerHTML = plants.map(plant => {
        const daysSincePlanting = Math.floor((new Date() - new Date(plant.plantDate)) / (1000 * 60 * 60 * 24));
        const readyToTransplant = daysSincePlanting >= 21 && plant.location === 'indoor';
        
        return `
            <div class="plant-card ${plant.location} ${readyToTransplant ? 'ready' : ''}" data-location="${plant.location}">
                <div class="plant-header">
                    <div class="plant-name">${plant.name}</div>
                    <span class="plant-badge ${readyToTransplant ? 'ready' : ''}">
                        ${plant.location === 'indoor' ? (readyToTransplant ? '✓ Ready' : '🏠 Indoor') : '🌱 Outdoor'}
                    </span>
                </div>
                <div class="plant-info">
                    <p><strong>Variety:</strong> ${plant.variety || 'N/A'}</p>
                    <p><strong>Type:</strong> ${plant.type}</p>
                    <p><strong>Planted:</strong> ${new Date(plant.plantDate).toLocaleDateString()}</p>
                    <p><strong>Days Growing:</strong> ${daysSincePlanting} days</p>
                    ${plant.notes ? `<p><strong>Notes:</strong> ${plant.notes}</p>` : ''}
                </div>
                <div class="plant-actions">
                    <button onclick="viewPlantDetails(${plant.id})">View</button>
                    <button onclick="editPlant(${plant.id})">Edit</button>
                    <button onclick="deletePlant(${plant.id})" style="background: #CB7A5C; color: #E9E2D8;">Delete</button>
                </div>
            </div>
        `;
    }).join('');
    
    // Update stats
    updateStats(plants);
}

function updateStats(plants) {
    const totalPlants = document.getElementById('total-plants');
    const indoorPlants = document.getElementById('indoor-plants');
    const outdoorPlants = document.getElementById('outdoor-plants');
    
    if (totalPlants) totalPlants.textContent = plants.length;
    if (indoorPlants) indoorPlants.textContent = plants.filter(p => p.location === 'indoor').length;
    if (outdoorPlants) outdoorPlants.textContent = plants.filter(p => p.location === 'outdoor').length;
}

function deletePlant(id) {
    if (confirm('Are you sure you want to delete this plant?')) {
        let plants = getPlants();
        plants = plants.filter(p => p.id !== id);
        savePlants(plants);
        loadPlants();
    }
}

function filterPlants(filter) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const cards = document.querySelectorAll('.plant-card');
    cards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else if (filter === 'ready') {
            const isReady = card.classList.contains('ready');
            card.style.display = isReady ? 'block' : 'none';
        } else {
            const location = card.getAttribute('data-location');
            card.style.display = location === filter ? 'block' : 'none';
        }
    });
}

// Care Log Functions
function showAddLogModal() {
    document.getElementById('add-log-form').scrollIntoView({ behavior: 'smooth' });
    populatePlantDropdown();
}

function populatePlantDropdown() {
    const plants = getPlants();
    const select = document.getElementById('log-plant');
    
    if (!select) return;
    
    select.innerHTML = '<option value="">Select plant...</option>' +
        plants.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
}

function toggleFields() {
    const type = document.getElementById('log-type').value;
    const fertilizerGroup = document.getElementById('fertilizer-type-group');
    
    if (fertilizerGroup) {
        fertilizerGroup.style.display = type === 'fertilizer' ? 'block' : 'none';
    }
}

function previewImage(input) {
    const preview = document.getElementById('photo-preview');
    preview.innerHTML = '';
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function saveCareLog(event) {
    event.preventDefault();
    
    const logEntry = {
        id: Date.now(),
        plant: document.getElementById('log-plant').value,
        date: document.getElementById('log-date').value,
        type: document.getElementById('log-type').value,
        fertilizerType: document.getElementById('fertilizer-type')?.value || '',
        notes: document.getElementById('log-notes').value,
        photo: document.getElementById('log-photo').files[0]?.name || '',
        createdAt: new Date().toISOString()
    };
    
    const logs = getCareLogs();
    logs.unshift(logEntry); // Add to beginning
    saveCareLogs(logs);
    
    // Clear form
    clearForm();
    
    // Reload logs
    loadCareLogs();
    
    // Update recent activity on dashboard
    updateRecentActivity();
    
    alert('Care log entry saved!');
}

function clearForm() {
    document.querySelector('form').reset();
    document.getElementById('photo-preview').innerHTML = '';
    document.getElementById('log-date').valueAsDate = new Date();
}

function loadCareLogs() {
    const logs = getCareLogs();
    const logHistory = document.getElementById('log-history');
    
    if (!logHistory) return;
    
    if (logs.length === 0) {
        logHistory.innerHTML = '<p class="no-activity">No care logs yet. Add your first entry above!</p>';
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
            ${log.photo ? `<p><em>📷 Photo attached: ${log.photo}</em></p>` : ''}
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

function updateRecentActivity() {
    const recentLogs = document.getElementById('recent-logs');
    if (!recentLogs) return;
    
    const logs = getCareLogs();
    if (logs.length === 0) {
        recentLogs.innerHTML = '<p class="no-activity">No recent activity. Start logging!</p>';
        return;
    }
    
    recentLogs.innerHTML = logs.slice(0, 5).map(log => `
        <div class="log-entry ${log.type}" style="margin-bottom: 0.5rem;">
            <div class="log-header">
                <span class="log-plant-name">${log.plant}</span>
                <span class="log-date">${new Date(log.date).toLocaleDateString()}</span>
            </div>
            <span class="log-type-badge">${getLogTypeLabel(log.type)}</span>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">${log.notes || 'No notes'}</p>
        </div>
    `).join('');
}

// Transplant Progress
function updateTransplantProgress() {
    // Get planting dates from localStorage or use default
    const today = new Date();
    const plantingDate = new Date(); // Assume planted today
    
    const plants = [
        { name: 'zucchini', label: 'Zucchini (Jackpot)', days: 28 },
        { name: 'cucumber', label: 'Cucumbers (Lebanese)', days: 28 },
        { name: 'squash', label: 'Squash (Sunburst)', days: 28 }
    ];
    
    plants.forEach(plant => {
        const progressEl = document.getElementById(`${plant.name}-progress`);
        const transplantDateEl = document.getElementById(`${plant.name}-transplant-date`);
        
        if (progressEl && transplantDateEl) {
            const daysSincePlanting = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
            const progress = Math.min((daysSincePlanting / plant.days) * 100, 100);
            
            progressEl.style.width = `${progress}%`;
            
            const transplantDate = new Date(plantingDate);
            transplantDate.setDate(transplantDate.getDate() + plant.days);
            transplantDateEl.textContent = transplantDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        }
    });
}

function calculateTransplant() {
    const plantDateInput = document.getElementById('calc-plant-date');
    const resultsDiv = document.getElementById('transplant-results');
    
    if (!plantDateInput || !resultsDiv || !plantDateInput.value) return;
    
    const plantDate = new Date(plantDateInput.value);
    
    // Calculate key dates
    const trueLeavesDate = new Date(plantDate);
    trueLeavesDate.setDate(trueLeavesDate.getDate() + 14);
    
    const hardeningStartDate = new Date(plantDate);
    hardeningStartDate.setDate(hardeningStartDate.getDate() + 21);
    
    const transplantDate = new Date(plantDate);
    transplantDate.setDate(transplantDate.getDate() + 28);
    
    resultsDiv.innerHTML = `
        <div class="calculation-results">
            <div class="result-item">
                <strong>🌱 True Leaves Expected:</strong>
                <p>${trueLeavesDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <div class="result-item">
                <strong>🌤️ Start Hardening Off:</strong>
                <p>${hardeningStartDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <div class="result-item">
                <strong>✅ Ready to Transplant:</strong>
                <p>${transplantDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                <small>Make sure nighttime temps are above 50°F!</small>
            </div>
        </div>
    `;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('add-plant-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// View plant details
function viewPlantDetails(id) {
    const plants = getPlants();
    const plant = plants.find(p => p.id === id);
    
    if (plant) {
        alert(`Plant Details:\n\nName: ${plant.name}\nVariety: ${plant.variety}\nType: ${plant.type}\nPlanted: ${plant.plantDate}\nLocation: ${plant.location}\nNotes: ${plant.notes || 'None'}`);
    }
}

// Edit plant (placeholder)
function editPlant(id) {
    alert('Edit functionality coming soon! For now, delete and re-add the plant.');
}