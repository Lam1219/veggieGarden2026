// netlify/functions/api.js
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    // ✅ Create store automatically on first use
    const store = getStore({ name: 'garden-db' });

    const match = event.path.match(/\/api\/([^\/\?]+)/);
    const key = match ? match[1] : null;

    if (!key) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing key' }) };
    }

    if (event.httpMethod === 'GET') {
      const data = await store.get(key, { type: 'json' });
      if (!data && key === 'plants') {
        return { statusCode: 200, headers, body: JSON.stringify(getDefaultPlants()) };
      }
      return { statusCode: 200, headers, body: JSON.stringify(data || []) };
    }

    if (event.httpMethod === 'POST') {
      const data = event.body ? JSON.parse(event.body) : [];
      await store.setJSON(key, data);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  } catch (error) {
    console.error('❌ Error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};

function getDefaultPlants() {
  const today = new Date().toISOString().split('T')[0];
  return [
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
}