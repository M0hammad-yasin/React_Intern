import { useState, useEffect, useCallback } from "react";
import "./App.css";
import useWeatherAPI from "./hooks/useWeatherAPI";

// Import modular components
import BackgroundOrbs from "./components/BackgroundOrbs";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorCard from "./components/ErrorCard";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import InitialState from "./components/InitialState";

export default function App() {
  const { data, loading, error, fetchWeather, setError } = useWeatherAPI();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchWeather("Islamabad");
  }, [fetchWeather]);

  const handleSearch = useCallback((city) => fetchWeather(city), [fetchWeather]);
  const handleDismissError = useCallback(() => setError(null), [setError]);

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
