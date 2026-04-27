// netlify/functions/api.js
const { getStore, connectLambda } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  // ✅ CRITICAL FIX: Initialize environment context INSIDE the handler
  // This resolves the "MissingBlobsEnvironmentError" by manually configuring 
  // the runtime environment for automatic context detection
  connectLambda(event);

  // ✅ Initialize store AFTER connectLambda, inside the handler
  const store = getStore({ name: 'garden-db' });

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Extract key from URL path safely
    const match = event.path.match(/\/api\/([^\/\?]+)/);
    const key = match ? match[1] : null;

    if (!key) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing key in URL' }) };
    }

    // GET request
    if (event.httpMethod === 'GET') {
      const data = await store.get(key, { type: 'json' });
      
      // Return seed inventory defaults if empty
      if (!data && key === 'plants') {
        return { statusCode: 200, headers, body: JSON.stringify(getDefaultPlants()) };
      }
      
      return { statusCode: 200, headers, body: JSON.stringify(data || []) };
    }

    // POST request
    if (event.httpMethod === 'POST') {
      let data;
      try {
        data = event.body ? JSON.parse(event.body) : [];
      } catch (parseError) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON payload' }) };
      }

      await store.setJSON(key, data);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  } catch (error) {
    console.error('❌ Function error:', error);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};

// 🌱 Your Complete Seed Inventory & Garden Data
function getDefaultPlants() {
  const today = new Date().toISOString().split('T')[0];
  return [
    // 🍅 Tomatoes (Start Indoors - Late April)
    { id: 1, name: 'Pink Bumble Bee 1', variety: 'Pink Bumble Bee', type: 'tomato', plantDate: '2026-04-26', location: 'indoor', notes: 'Heirloom, 6-8 weeks indoors before transplant', createdAt: new Date().toISOString() },
    { id: 2, name: 'Pink Bumble Bee 2', variety: 'Pink Bumble Bee', type: 'tomato', plantDate: '2026-04-26', location: 'indoor', notes: 'Heirloom, 6-8 weeks indoors before transplant', createdAt: new Date().toISOString() },
    { id: 3, name: 'Indigo Rose 1', variety: 'Indigo Rose Organic', type: 'tomato', plantDate: '2026-04-26', location: 'indoor', notes: 'Organic heirloom, save seeds using fermentation method', createdAt: new Date().toISOString() },
    { id: 4, name: 'Indigo Rose 2', variety: 'Indigo Rose Organic', type: 'tomato', plantDate: '2026-04-26', location: 'indoor', notes: 'Organic heirloom, save seeds using fermentation method', createdAt: new Date().toISOString() },
    
    // 🥒 Cucurbits (Start Indoors in Biodegradable Pots)
    { id: 5, name: 'Cucumber 1', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, transplant mid-May', createdAt: new Date().toISOString() },
    { id: 6, name: 'Cucumber 2', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, transplant mid-May', createdAt: new Date().toISOString() },
    { id: 7, name: 'Cucumber 3', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, transplant mid-May', createdAt: new Date().toISOString() },
    { id: 8, name: 'Cucumber 4', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, transplant mid-May', createdAt: new Date().toISOString() },
    { id: 9, name: 'Cucumber 5', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, transplant mid-May', createdAt: new Date().toISOString() },
    { id: 10, name: 'Zucchini 1', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, limit 2-4 plants per 42sqft box', createdAt: new Date().toISOString() },
    { id: 11, name: 'Zucchini 2', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, limit 2-4 plants per 42sqft box', createdAt: new Date().toISOString() },
    { id: 12, name: 'Zucchini 3', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, limit 2-4 plants per 42sqft box', createdAt: new Date().toISOString() },
    { id: 13, name: 'Zucchini 4', variety: 'Jackpot', type: 'zucchini', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, limit 2-4 plants per 42sqft box', createdAt: new Date().toISOString() },
    { id: 14, name: 'Squash 1', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, spreads after greens harvest', createdAt: new Date().toISOString() },
    { id: 15, name: 'Squash 2', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, spreads after greens harvest', createdAt: new Date().toISOString() },
    { id: 16, name: 'Squash 3', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, spreads after greens harvest', createdAt: new Date().toISOString() },
    { id: 17, name: 'Squash 4', variety: 'Sunburst', type: 'squash', plantDate: '2026-04-26', location: 'indoor', notes: 'Biodegradable pot, spreads after greens harvest', createdAt: new Date().toISOString() },
    
    // 🥬 Direct Sow Greens (Plant Now / Next Week)
    { id: 18, name: 'Lettuce Row 1', variety: 'Super Gourmet Blend', type: 'lettuce', plantDate: '2026-05-03', location: 'outdoor', notes: 'Direct sow, ready in 30-45 days, succession sow every 2 weeks', createdAt: new Date().toISOString() },
    { id: 19, name: 'Spinach Row 1', variety: 'Renegade', type: 'spinach', plantDate: '2026-05-03', location: 'outdoor', notes: 'Direct sow, loves cool weather, harvest outer leaves', createdAt: new Date().toISOString() },
    { id: 20, name: 'Arugula Patch', variety: 'Astro', type: 'arugula', plantDate: '2026-05-03', location: 'outdoor', notes: 'Scatter in Box 1 gaps, fast growing, harvest before shade', createdAt: new Date().toISOString() },
    { id: 21, name: 'Carrot Bed', variety: 'Rainbow Blend', type: 'carrot', plantDate: '2026-05-03', location: 'outdoor', notes: 'Direct sow 100+ seeds, thin to strongest 50-100, 70-80 days to harvest', createdAt: new Date().toISOString() }
  ];
}