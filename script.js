// Plant Care Database - Based on your seed inventory
const PLANT_CARE_DB = {
    // Your Tomatoes
    'pink-bumble-bee': { 
        water: "Consistent", waterLevel: 4, 
        sun: "Full Sun (8+ hours)", sunLevel: 5,
        start: "Start indoors 6-8 weeks before transplant",
        spacing: "24-36 inches apart",
        tips: "Use cages. Ferment seeds for best saving results."
    },
    'indigo-rose': { 
        water: "Consistent", waterLevel: 4, 
        sun: "Full Sun (8+ hours)", sunLevel: 5,
        start: "Start indoors 6-8 weeks before transplant",
        spacing: "24-36 inches apart",
        tips: "Heirloom variety. Save seeds using fermentation method."
    },
    // Your Cucumbers
    'lebanese-beit-alpha': { 
        water: "High (Consistently Moist)", waterLevel: 5, 
        sun: "Full Sun (6-8 hours)", sunLevel: 5,
        start: "Start indoors in biodegradable pots late April",
        spacing: "12 inches apart on trellis",
        tips: "Train on trellis. Harvest when small for best flavor."
    },
    // Your Squash/Zucchini
    'jackpot-zucchini': { 
        water: "Moderate to High", waterLevel: 4, 
        sun: "Full Sun (6-8 hours)", sunLevel: 5,
        start: "Start indoors late April, transplant mid-May",
        spacing: "36 inches apart (gets very large!)",
        tips: "Limit to 2-4 plants per 42 sq ft box. Harvest frequently."
    },
    'sunburst-squash': { 
        water: "Moderate", waterLevel: 3, 
        sun: "Full Sun (6-8 hours)", sunLevel: 5,
        start: "Start indoors late April, transplant mid-May",
        spacing: "36 inches apart",
        tips: "Allow space to spread. Harvest when small and tender."
    },
    // Your Greens (Direct Sow)
    'rainbow-carrots': { 
        water: "Moderate", waterLevel: 3, 
        sun: "Full Sun to Part Shade", sunLevel: 4,
        start: "Direct sow now - takes 70-80 days",
        spacing: "2-3 inches apart after thinning",
        tips: "Keep soil loose. Thin seedlings to prevent forked roots."
    },
    'super-gourmet-lettuce': { 
        water: "High", waterLevel: 4, 
        sun: "Partial Sun (4-6 hours)", sunLevel: 3,
        start: "Direct sow now - ready in 30-45 days",
        spacing: "6-8 inches apart",
        tips: "Succession sow every 2 weeks for continuous harvest."
    },
    'renegade-spinach': { 
        water: "Moderate", waterLevel: 3, 
        sun: "Partial Sun", sunLevel: 3,
        start: "Direct sow now - cool weather crop",
        spacing: "4-6 inches apart",
        tips: "Harvest outer leaves to extend production."
    },
    'astro-arugula': { 
        water: "Moderate", waterLevel: 3, 
        sun: "Partial Sun", sunLevel: 3,
        start: "Direct sow now or scatter in gaps",
        spacing: "6 inches apart",
        tips: "Fast growing. Harvest before tomatoes shade it."
    }
};

// Your Actual Seed Inventory
const YOUR_SEEDS = [
    { name: 'Pink Bumble Bee', type: 'tomato', variety: 'pink-bumble-bee', count: 'Multiple' },
    { name: 'Indigo Rose', type: 'tomato', variety: 'indigo-rose', count: 'Multiple' },
    { name: 'Lebanese Beit Alpha', type: 'cucumber', variety: 'lebanese-beit-alpha', count: '5 plants' },
    { name: 'Jackpot Zucchini', type: 'zucchini', variety: 'jackpot-zucchini', count: '4 plants' },
    { name: 'Sunburst Squash', type: 'squash', variety: 'sunburst-squash', count: '4 plants' },
    { name: 'Rainbow Blend', type: 'carrot', variety: 'rainbow-carrots', count: '100+ seeds' },
    { name: 'Super Gourmet', type: 'lettuce', variety: 'super-gourmet-lettuce', count: 'Direct sow' },
    { name: 'Renegade', type: 'spinach', variety: 'renegade-spinach', count: 'Direct sow' },
    { name: 'Astro', type: 'arugula', variety: 'astro-arugula', count: 'Direct sow' }
];

// Your Garden Box Layouts
const GARDEN_BOXES = [
    {
        name: "Box 1: The Vertical Box",
        size: "6ft × 7ft (42 sq ft)",
        plants: [
            { name: 'Tomatoes', count: '4-6 plants', note: 'With cages' },
            { name: 'Cucumbers', count: '4-6 plants', note: 'On trellis' },
            { name: 'Carrots', count: '50-100 after thinning', note: 'Sow 100+ now' },
            { name: 'Arugula', count: 'Scatter in gaps', note: 'Harvest before shade' }
        ],
        layout: "Trellis along back for climbing plants"
    },
    {
        name: "Box 2: The Succession Box",
        size: "6ft × 7ft (42 sq ft)",
        plants: [
            { name: 'Lettuce/Spinach', count: 'Rows in empty space', note: 'Plant NOW' },
            { name: 'Zucchini', count: '1-2 plants center', note: 'Transplant mid-May' },
            { name: 'Sunburst Squash', count: '2 plants', note: 'Transplant mid-May' }
        ],
        layout: "Greens harvested in 30-45 days, then squash spreads"
    }
];

// Your Herb Pot Organization
const HERB_POTS = [
    { pot: 1, herbs: ['Mojito Mint'], water: 'Keep moist', note: '⚠️ MUST be alone - invasive!' },
    { pot: 2, herbs: ['Rosemary'], water: 'Let dry between watering', note: 'Gets large and woody' },
    { pot: 3, herbs: ['French Thyme', 'Greek Oregano'], water: 'Let dry between watering', note: 'Both Mediterranean' },
    { pot: 4, herbs: ['Regular Sage', 'Pineapple Sage'], water: 'Let dry between watering', note: 'Similar growth habits' },
    { pot: 5, herbs: ['Basil', 'Flat Parsley'], water: 'Keep consistently moist', note: 'Both prefer rich soil' },
    { pot: 6, herbs: ['Cilantro'], water: 'Keep moist; afternoon shade', note: 'Bolts quickly' }
];

// Your Planting Calendar
const PLANTING_CALENDAR = [
    { timing: 'Late April (Now)', actions: [
        'Start tomatoes indoors',
        'Direct sow carrots, lettuce, spinach, arugula',
        'Start cucumbers/squash indoors in biodegradable pots'
    ]},
    { timing: 'Mid-May', actions: [
        'Transplant tomatoes, cucumbers, squash outdoors',
        'Succession sow more lettuce/spinach',
        'Harden off indoor seedlings first'
    ]},
    { timing: 'May-June', actions: [
        'Harvest early greens (30-45 days)',
        'Squash spreads into empty space',
        'Install trellises for climbing plants'
    ]},
    { timing: 'July-August', actions: [
        'Harvest tomatoes, cucumbers, squash',
        'Save seeds from best fruits using fermentation',
        'Succession plant fall crops'
    ]}
];

// Add this function to script.js
function renderHerbPots() {
    const herbGrid = document.querySelector('.herb-grid');
    if (!herbGrid) return;
    
    herbGrid.innerHTML = HERB_POTS.map(pot => `
        <div class="herb-pot">
            <div class="herb-pot-header">
                <div class="herb-pot-number">${pot.pot}</div>
                <span class="text-muted">${pot.water}</span>
            </div>
            <div class="herb-names">${pot.herbs.join(' + ')}</div>
            <div class="herb-note">${pot.note}</div>
        </div>
    `).join('');
}

// Call this in initializeApp()
async function initializeApp() {
    await loadPlantsFromServer();
    await loadCareLogsFromServer();
    populatePlantDropdown();
    updateTransplantProgress();
    updateTimelineStatus();
    renderHerbPots(); // Add this line
}