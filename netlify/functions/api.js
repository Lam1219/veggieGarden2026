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
  const key = path.replace('/api/', '');
  
  const blobs = getStore();
  const store = blobs ? blobs.getStore({ name: 'garden-db', consistency: 'strong' }) : null;

  // GET request - Load data
  if (httpMethod === 'GET') {
    try {
      const value = store ? await store.get(key, { type: 'json' }) : null;
      // Return default plants if empty
      if (!value && key === 'plants') {
        return {
          statusCode: 200,
          body: JSON.stringify(getDefaultPlants())
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(value || [])
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }

  // POST request - Save data
  if (httpMethod === 'POST') {
    try {
      const data = JSON.parse(body);
      if (store) {
        await store.setJSON(key, data);
      }
      return { statusCode: 200, body: 'Saved' };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }

  return { statusCode: 404, body: 'Not Found' };
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