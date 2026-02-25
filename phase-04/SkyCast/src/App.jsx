import { useEffect } from 'react'
import { useState } from 'react'
import useWeatherAPI from './hooks/useWeatherAPI'
import Loader from './components/Loader'
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
  const { data, loading, error, fetchWeather } = useWeatherAPI();

  // Map raw OpenWeatherMap response → UI-friendly shape
  const weather = data ? (() => {
    const c = data.current;
    const f = data.forecast;

    // Build a daily forecast: OWM /forecast gives 3-hour slots; group by date
    const dailyMap = {};
    f.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyMap[date]) dailyMap[date] = [];
      dailyMap[date].push(item);
    });

    const today = Object.keys(dailyMap)[0];
    const forecastDays = Object.entries(dailyMap)
      .filter(([date]) => date !== today)
      .slice(0, 5)
      .map(([date, items]) => ({
        day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: Math.round(Math.max(...items.map((i) => i.main.temp_max))),
        id: items[0].weather[0].id,
      }));

    const sunriseMs = c.sys.sunrise * 1000;

    return {
      city: c.name,
      country: c.sys.country,
      temp: Math.round(c.main.temp),
      condition: c.weather[0].description
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      id: c.weather[0].id,
      high: Math.round(c.main.temp_max),
      low: Math.round(c.main.temp_min),
      humidity: c.main.humidity,
      wind: Math.round(c.wind.speed * 3.6), // m/s → km/h
      uv: '—',                              // not in this endpoint
      visibility: (c.visibility / 1000).toFixed(1),
      pressure: c.main.pressure,
      sunrise: new Date(sunriseMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      forecast: forecastDays,
    };
  })() : null;

  useEffect(() => {
    fetchWeather('Islamabad'); // Default city
  }, [fetchWeather]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city);
  };

  // OpenWeatherMap uses weather condition IDs (https://openweathermap.org/weather-conditions)
  const getWeatherIcon = (id, size = 24) => {
    if (id === 800) return <Sun size={size} color="#fbbf24" />;
    if (id >= 801 && id <= 804) return <CloudSun size={size} color="#94a3b8" />;
    if (id >= 700 && id < 800) return <Cloud size={size} color="#64748b" />; // atmosphere
    if (id >= 500 && id < 600) return <CloudRain size={size} color="#60a5fa" />; // rain
    if (id >= 300 && id < 400) return <CloudRain size={size} color="#93c5fd" />; // drizzle
    if (id >= 200 && id < 300) return <CloudLightning size={size} color="#818cf8" />; // thunderstorm
    return <Cloud size={size} color="#94a3b8" />;
  };

  if (!weather && !error && !loading) return <div className="loading">Loading SkyCast...</div>;
  return (
    <div className="app-container">
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

      {loading ? <Loader /> :
        error ? (
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
                {getWeatherIcon(weather.id, 180)}
              </div>
            </main>

            <section className="glass-card">
              <h3 style={{ marginBottom: '1.5rem', fontWeight: 500, fontSize: '0.9rem', opacity: 0.8 }}>5-DAY FORECAST</h3>
              <div className="forecast-grid">
                {weather.forecast.map((f, i) => (
                  <div key={i} className="forecast-item">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{f.day}</span>
                    {getWeatherIcon(f.id, 32)}
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
    </div>
  )
}

export default App
