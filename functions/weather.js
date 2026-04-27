// functions/weather.js
export async function onRequest({ env }) {
  const API_KEY = env.OPENWEATHER_API_KEY;
  const CITY = 'Hamilton';
  
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY},CA&units=metric&appid=${API_KEY}`);
    const data = await res.json();
    
    return new Response(JSON.stringify({
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6),
      desc: data.weather[0].description,
      icon: data.weather[0].icon
    }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}