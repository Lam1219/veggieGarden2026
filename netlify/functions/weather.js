// netlify/functions/weather.js
exports.handler = async (event) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY; // Set in Netlify UI
  const CITY = 'Hamilton';
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY},CA&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed * 3.6),
        desc: data.weather[0].description,
        icon: data.weather[0].icon
      })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};