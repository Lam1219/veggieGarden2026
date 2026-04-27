// netlify/functions/api.js
const getStore = () => {
  try {
    return require('@netlify/blobs');
  } catch (e) {
    return null;
  }
};

exports.handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  
  // --- FIX: Robustly extract the key ---
  // Path comes in as /.netlify/functions/api/plants
  // We just want 'plants'
  const pathSegments = path.split('/');
  const key = pathSegments[pathSegments.length - 1];
  
  // Basic validation
  if (!key || key.includes('.')) {
     return { statusCode: 400, body: 'Invalid key' };
  }

  const blobs = getStore();
  const store = blobs ? blobs.getStore({ name: 'garden-db', consistency: 'strong' }) : null;

  try {
    // GET request - Load data
    if (httpMethod === 'GET') {
      const value = store ? await store.get(key, { type: 'json' }) : null;
      
      // If no data exists and it's the plants endpoint, return defaults
      if (!value && key === 'plants') {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getDefaultPlants())
        };
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value || [])
      };
    }

    // POST request - Save data
    if (httpMethod === 'POST') {
      if (!body) return { statusCode: 400, body: 'Missing body' };
      
      const data = JSON.parse(body);
      if (store) {
        await store.setJSON(key, data);
      }
      return { statusCode: 200, body: 'Saved' };
    }

    return { statusCode: 405, body: 'Method Not Allowed' };
  } catch (error) {
    console.error("Server Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

function getDefaultPlants() {
  const today = new Date().toISOString().split('T')[0];
  return [
    { id: 1, name: 'Cucumber 1', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 2, name: 'Cucumber 2', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 3, name: 'Cucumber 3', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 4, name: 'Cucumber 4', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 5, name: 'Cucumber 5', variety: 'Lebanese Beit Alpha', type: 'cucumber', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 6, name: 'Squash 1', variety: 'Sunburst', type: 'squash', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 7, name: 'Squash 2', variety: 'Sunburst', type: 'squash', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 8, name: 'Squash 3', variety: 'Sunburst', type: 'squash', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 9, name: 'Squash 4', variety: 'Sunburst', type: 'squash', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 10, name: 'Zucchini 1', variety: 'Jackpot', type: 'zucchini', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 11, name: 'Zucchini 2', variety: 'Jackpot', type: 'zucchini', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 12, name: 'Zucchini 3', variety: 'Jackpot', type: 'zucchini', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() },
    { id: 13, name: 'Zucchini 4', variety: 'Jackpot', type: 'zucchini', plantDate: today, location: 'indoor', notes: 'Started in small pot indoors', createdAt: new Date().toISOString() }
  ];
}