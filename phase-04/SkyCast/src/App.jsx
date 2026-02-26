import { useState, useEffect, useCallback } from "react";
import "./App.css";
const API_KEY = "401f859a528dc0926b1d387ffbaefd13";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
import useWeatherAPI from "./hooks/useWeatherAPI";
// ─── SVG Icons ────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CloudIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const WindIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const PressureIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const EyeIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const LocationIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const WifiOffIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
  </svg>
);

const WarningIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="btn-spinner" fill="none" viewBox="0 0 24 24">
    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path style={{ opacity: 0.75 }} fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

// ─── Weather emoji map ────────────────────────────────────────────────────────
const WEATHER_ICONS = {
  "01d": "☀️", "01n": "🌙",
  "02d": "⛅", "02n": "☁️",
  "03d": "☁️", "03n": "☁️",
  "04d": "☁️", "04n": "☁️",
  "09d": "🌧️", "09n": "🌧️",
  "10d": "🌦️", "10n": "🌧️",
  "11d": "⛈️", "11n": "⛈️",
  "13d": "❄️", "13n": "❄️",
  "50d": "🌫️", "50n": "🌫️",
};

const WEATHER_GRADIENTS = {
  Clear: "linear-gradient(135deg, rgba(245,158,11,0.2), transparent, rgba(249,115,22,0.1))",
  Clouds: "linear-gradient(135deg, rgba(148,163,184,0.2), transparent, rgba(100,116,139,0.1))",
  Rain: "linear-gradient(135deg, rgba(59,130,246,0.2), transparent, rgba(37,99,235,0.1))",
  Drizzle: "linear-gradient(135deg, rgba(96,165,250,0.2), transparent, rgba(59,130,246,0.1))",
  Thunderstorm: "linear-gradient(135deg, rgba(168,85,247,0.2), transparent, rgba(147,51,234,0.1))",
  Snow: "linear-gradient(135deg, rgba(165,243,252,0.2), transparent, rgba(103,232,249,0.1))",
  Mist: "linear-gradient(135deg, rgba(203,213,225,0.2), transparent, rgba(148,163,184,0.1))",
  default: "linear-gradient(135deg, rgba(6,182,212,0.2), transparent, rgba(20,184,166,0.1))",
};

// ─── Background Orbs ──────────────────────────────────────────────────────────
const BackgroundOrbs = () => (
  <div className="bg-orbs">
    <div className="bg-blob blob-1" />
    <div className="bg-blob blob-2" />
    <div className="bg-blob blob-3" />
    <div className="bg-blob blob-4" />
  </div>
);

// ─── Loading Spinner ──────────────────────────────────────────────────────────
const LoadingSpinner = () => (
  <div className="spinner-container animate-fade-in">
    <div className="spinner" />
    <p className="spinner-text">Fetching weather data...</p>
  </div>
);

// ─── Error Card ───────────────────────────────────────────────────────────────
const ErrorCard = ({ type, message, onDismiss }) => {
  const config = {
    city: { icon: <LocationIcon />, title: "City Not Found", color: "var(--error)" },
    network: { icon: <WifiOffIcon />, title: "Network Error", color: "var(--warning)" },
    api: { icon: <WarningIcon />, title: "API Limit Exceeded", color: "var(--warning)" },
  };
  const c = config[type] || config.city;

  return (
    <div className="glass-card error-card animate-slide-up animate-shake" style={{ borderColor: c.color }}>
      <div className="error-body">
        <div className="error-icon-box"
          style={{ background: `linear-gradient(145deg, ${c.color}33, ${c.color}1a)`, color: c.color }}>
          {c.icon}
        </div>
        <div className="error-text">
          <h3 className="error-title" style={{ color: c.color }}>{c.title}</h3>
          <p className="error-message">{message}</p>
        </div>
        <button className="error-dismiss" onClick={onDismiss} aria-label="Dismiss error">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

// ─── Data Box ─────────────────────────────────────────────────────────────────
const DataBox = ({ icon, label, value, unit, delay }) => (
  <div className="neu-data-box animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
    <div className="data-box-header">
      <span className="data-box-icon">{icon}</span>
      <span className="data-box-label">{label}</span>
    </div>
    <div>
      <span className="data-box-value">{value}</span>
      <span className="data-box-unit">{unit}</span>
    </div>
  </div>
);

// ─── Weather Card ─────────────────────────────────────────────────────────────
const WeatherCard = ({ data }) => {
  const currentData = data.current;
  const iconCode = currentData.weather[0].icon;
  const weatherEmoji = WEATHER_ICONS[iconCode] || "🌡️";
  const mainCondition = currentData.weather[0].main;
  const gradient = WEATHER_GRADIENTS[mainCondition] || WEATHER_GRADIENTS.default;

  return (
    <div className="glass-card weather-card animate-slide-up">
      <div className="weather-gradient-overlay" style={{ background: gradient }} />

      <div className="weather-inner">
        {/* City & Condition */}
        <div className="weather-city-block">
          <h2 className="weather-city-name">{currentData.name}</h2>
          <p className="weather-condition">{currentData.weather[0].description}</p>
        </div>

        {/* Main Temp */}
        <div className="weather-main-display">
          <div className="weather-emoji">{weatherEmoji}</div>
          <div>
            <div>
              <span className="weather-temp-value">{Math.round(currentData.main.temp)}</span>
              <span className="weather-temp-unit">°C</span>
            </div>
            <p className="weather-feels">Feels like {Math.round(currentData.main.feels_like)}°C</p>
          </div>
        </div>

        {/* Data Grid */}
        <div className="data-grid">
          <DataBox icon={<CloudIcon />} label="Humidity" value={currentData.main.humidity} unit="%" delay={100} />
          <DataBox icon={<WindIcon />} label="Wind Speed" value={Math.round(currentData.wind.speed * 3.6)} unit="km/h" delay={200} />
          <DataBox icon={<PressureIcon />} label="Pressure" value={currentData.main.pressure} unit="hPa" delay={300} />
          <DataBox icon={<EyeIcon />} label="Visibility" value={Math.round(currentData.visibility / 1000)} unit="km" delay={400} />
        </div>

        {/* Min / Max */}
        <div className="weather-minmax">
          <div className="minmax-item">
            <p className="minmax-label">Min</p>
            <p className="minmax-value">{Math.round(currentData.main.temp_min)}°C</p>
          </div>
          <div className="minmax-divider" />
          <div className="minmax-item">
            <p className="minmax-label">Max</p>
            <p className="minmax-value">{Math.round(currentData.main.temp_max)}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Search Bar ───────────────────────────────────────────────────────────────
const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-row">
        <div className="search-input-wrap">
          <span className="search-icon"><SearchIcon /></span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            disabled={isLoading}
            className="neu-input search-input"
            aria-label="City name"
          />
        </div>
        <button type="submit" disabled={isLoading || !city.trim()} className="neu-button search-btn">
          {isLoading ? (
            <><SpinnerIcon /><span>Searching</span></>
          ) : (
            <><SearchIcon /><span>Search</span></>
          )}
        </button>
      </div>
    </form>
  );
};

// ─── Initial State ────────────────────────────────────────────────────────────
const InitialState = ({ onCityClick }) => (
  <div className="initial-state animate-fade-in">
    <div className="initial-icon-circle">
      <CloudIcon />
    </div>
    <h2 className="initial-title">Weather at a Glance</h2>
    <p className="initial-desc">
      Enter a city name above to get real-time weather information with a beautiful visualization
    </p>
    <div className="initial-suggestions">
      {["London", "Tokyo", "New York"].map((city) => (
        <button key={city} className="suggestion-btn" onClick={() => onCityClick(city)}>
          {city}
        </button>
      ))}
    </div>
  </div>
);


// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { data, loading, error, fetchWeather } = useWeatherAPI();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchWeather("Islamabad");
  }, []);

  const handleSearch = useCallback((city) => fetchWeather(city), [fetchWeather]);
  const handleDismissError = useCallback(() => setError(null), []);

  return (
    <div className="app-wrapper">
      <BackgroundOrbs />

      <div className="app-content">
        {/* Header */}
        <header className="app-header animate-slide-up">
          <h1 className="app-title">
            Weather<span>Dashboard</span>
          </h1>
          <p className="app-subtitle">Real-time weather data with beautiful visualization</p>
        </header>

        {/* Search */}
        <div className="search-section animate-slide-up" style={{ animationDelay: "100ms" }}>
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && !data && !loading && (
          <div className="search-history animate-fade-in">
            <span className="history-label">Recent:</span>
            {searchHistory.map((city) => (
              <button key={city} className="history-chip" onClick={() => handleSearch(city)}>
                {city}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <main className="content-area">
          {loading && <LoadingSpinner />}
          {error && <ErrorCard type={error.type} message={error.message} onDismiss={handleDismissError} />}
          {data && !loading && <WeatherCard data={data} />}
          {!data && !loading && !error && <InitialState onCityClick={handleSearch} />}
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>Powered by OpenWeather API</p>
        </footer>
      </div>
    </div>
  );
}
