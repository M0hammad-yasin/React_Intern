import { useState, useEffect } from 'react';
import useWeatherAPI from '../hooks/useWeatherAPI';

/**
 * WeatherAPITest
 * A temporary component for testing the OpenWeatherMap API hook.
 * It fetches weather for a default city on mount and also lets you
 * search for any city manually. All data is logged to the console.
 *
 * Remove / replace this component once the UI is ready.
 */
const WeatherAPITest = () => {
    const [city, setCity] = useState('');
    const { data, loading, error, fetchWeather } = useWeatherAPI();

    // Fetch a default city on mount so you see data in the console immediately
    useEffect(() => {
        fetchWeather('London');
    }, [fetchWeather]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) fetchWeather(city.trim());
    };

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>🌤️ OpenWeatherMap — API Test</h2>
            <p style={styles.subtitle}>Open your browser DevTools Console to see the raw API response.</p>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name…"
                    style={styles.input}
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Fetching…' : 'Fetch'}
                </button>
            </form>

            {/* Status indicators */}
            {loading && <p style={styles.info}>⏳ Loading…</p>}
            {error && <p style={styles.error}>❌ Error: {error}</p>}

            {data && (
                <div style={styles.card}>
                    <p style={styles.success}>✅ Data received! Check the console for details.</p>
                    <p style={styles.meta}>
                        <strong>City:</strong> {data.current.name}, {data.current.sys.country}
                    </p>
                    <p style={styles.meta}>
                        <strong>Temp:</strong> {data.current.main.temp}°C
                    </p>
                    <p style={styles.meta}>
                        <strong>Condition:</strong> {data.current.weather[0].description}
                    </p>
                    <p style={styles.meta}>
                        <strong>Forecast entries:</strong> {data.forecast.list.length} (every 3 hrs, 5 days)
                    </p>
                </div>
            )}
        </div>
    );
};

// Minimal inline styles — no dependency on App.css
const styles = {
    wrapper: {
        maxWidth: '480px',
        margin: '4rem auto',
        padding: '2rem',
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#e2e8f0',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    },
    title: {
        margin: '0 0 0.25rem',
        fontSize: '1.4rem',
        fontWeight: 700,
    },
    subtitle: {
        margin: '0 0 1.5rem',
        fontSize: '0.85rem',
        opacity: 0.6,
    },
    form: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem',
    },
    input: {
        flex: 1,
        padding: '0.6rem 1rem',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'rgba(255,255,255,0.05)',
        color: '#e2e8f0',
        outline: 'none',
        fontSize: '0.9rem',
    },
    button: {
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(135deg, #60a5fa, #818cf8)',
        color: '#fff',
        fontWeight: 600,
        cursor: 'pointer',
        fontSize: '0.9rem',
    },
    info: { opacity: 0.7, fontSize: '0.9rem' },
    error: { color: '#f87171', fontSize: '0.9rem' },
    success: { color: '#4ade80', marginBottom: '0.75rem', fontWeight: 600 },
    card: {
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.1)',
    },
    meta: { margin: '0.3rem 0', fontSize: '0.9rem' },
};

export default WeatherAPITest;
