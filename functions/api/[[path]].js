// functions/api/[[path]].js
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const key = url.pathname.replace('/api/', '');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers, status: 200 });
  }

  try {
    // GET: Load data
    if (request.method === 'GET') {
      const data = await env.GARDEN_KV.get(key, { type: 'json' });
      
      // Return defaults if empty
      if (!data && key === 'plants') {
        return new Response(JSON.stringify(getDefaultPlants()), { headers });
      }
      return new Response(JSON.stringify(data || []), { headers });
    }

    // POST: Save data
    if (request.method === 'POST') {
      const body = await request.json();
      await env.GARDEN_KV.put(key, JSON.stringify(body));
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { headers, status: 405 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { headers, status: 500 });
  }
}

// Your seed inventory & garden data
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