import { useState, useEffect } from 'react'
import WeatherAPITest from './components/WeatherAPITest'
import {
  Search,
  Wind,
  Droplets,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Eye,
  Gauge,
  Sunrise,
  CloudSun
} from 'lucide-react'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get Coordinates
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Get Weather
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,surface_pressure,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,uv_index_max&timezone=auto`);
      const data = await weatherRes.json();

      const forecast = data.daily.time.slice(1, 6).map((time, i) => ({
        day: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: Math.round(data.daily.temperature_2m_max[i + 1]),
        code: data.daily.weather_code[i + 1]
      }));

      setWeather({
        city: name,
        country: country,
        temp: Math.round(data.current.temperature_2m),
        condition: getWeatherDescription(data.current.weather_code),
        code: data.current.weather_code,
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0]),
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        uv: data.daily.uv_index_max[0],
        visibility: data.current.visibility / 1000,
        pressure: data.current.surface_pressure,
        sunrise: new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        forecast: forecast
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('London'); // Default city
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city);
  };

  const getWeatherDescription = (code) => {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 57) return "Drizzle";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Showers";
    if (code <= 99) return "Thunderstorm";
    return "Cloudy";
  };

  const getWeatherIcon = (code, size = 24) => {
    if (code === 0) return <Sun size={size} color="#fbbf24" />;
    if (code <= 3) return <CloudSun size={size} color="#94a3b8" />;
    if (code <= 48) return <Cloud size={size} color="#64748b" />;
    if (code <= 67) return <CloudRain size={size} color="#60a5fa" />;
    if (code <= 99) return <CloudLightning size={size} color="#818cf8" />;
    return <Cloud size={size} color="#94a3b8" />;
  };

  if (!weather && !loading) return <div className="loading">Loading SkyCast...</div>;

  return (
    <div className="app-container">
      {/* ── Temporary API test – remove when UI is wired up ── */}
      <WeatherAPITest />
      <header className="header">
        <div className="logo">
          <CloudSun size={32} strokeWidth={2.5} /> SkyCast
        </div>
        <form className="search-box" onSubmit={handleSearch}>
          <Search size={20} color="rgba(255,255,255,0.6)" />
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
      </header>

      {error ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#f87171' }}>{error}. Please try another city.</p>
        </div>
      ) : weather && (
        <>
          <main className="main-weather">
            <div className="weather-info">
              <h2 className="city-name">{weather.city}, <span style={{ fontSize: '1.5rem', opacity: 0.7 }}>{weather.country}</span></h2>
              <div className="temp-huge">{weather.temp}°</div>
              <p className="weather-desc">{weather.condition} • H:{weather.high}° L:{weather.low}°</p>
            </div>
            <div className="weather-icon-container" style={{ display: 'flex', justifyContent: 'center' }}>
              {getWeatherIcon(weather.code, 180)}
            </div>
          </main>

          <section className="glass-card">
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 500, fontSize: '0.9rem', opacity: 0.8 }}>5-DAY FORECAST</h3>
            <div className="forecast-grid">
              {weather.forecast.map((f, i) => (
                <div key={i} className="forecast-item">
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{f.day}</span>
                  {getWeatherIcon(f.code, 32)}
                  <span style={{ fontWeight: 600, marginTop: '5px' }}>{f.temp}°</span>
                </div>
              ))}
            </div>
          </section>

          <section className="details-grid">
            <div className="glass-card detail-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wind size={16} color="var(--text-secondary)" />
                <span className="detail-label">Wind</span>
              </div>
              <span className="detail-value">{weather.wind} <small style={{ fontSize: '0.8rem' }}>km/h</small></span>
            </div>
            <div className="glass-card detail-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplets size={16} color="var(--text-secondary)" />
                <span className="detail-label">Humidity</span>
              </div>
              <span className="detail-value">{weather.humidity}%</span>
            </div>
            <div className="glass-card detail-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sun size={16} color="var(--text-secondary)" />
                <span className="detail-label">UV Index</span>
              </div>
              <span className="detail-value">{weather.uv}</span>
            </div>
            <div className="glass-card detail-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={16} color="var(--text-secondary)" />
                <span className="detail-label">Visibility</span>
              </div>
              <span className="detail-value">{weather.visibility} <small style={{ fontSize: '0.8rem' }}>km</small></span>
            </div>
            <div className="glass-card detail-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gauge size={16} color="var(--text-secondary)" />
                <span className="detail-label">Pressure</span>
              </div>
              <span className="detail-value">{weather.pressure} <small style={{ fontSize: '0.8rem' }}>hPa</small></span>
            </div>
            <div className="glass-card detail-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sunrise size={16} color="var(--text-secondary)" />
                <span className="detail-label">Sunrise</span>
              </div>
              <span className="detail-value">{weather.sunrise}</span>
            </div>
          </section>
        </>
      )}

      {loading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', backdropFilter: 'blur(8px)', zIndex: 100
        }}>
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  )
}

export default App
