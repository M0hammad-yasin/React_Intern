import { useState, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * useWeatherAPI
 * Custom hook for fetching weather data from OpenWeatherMap.
 *
 * Endpoints used:
 *  - Current weather : GET /weather?q={city}&appid={key}&units=metric
 *  - 5-day forecast  : GET /forecast?q={city}&appid={key}&units=metric
 *
 * Returns: { data, loading, error, fetchWeather }
 */
const useWeatherAPI = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = useCallback(async (city) => {
        if (!city || !city.trim()) return;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            // --- Current Weather ---
            const currentRes = await fetch(
                `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
            );

            if (!currentRes.ok) {
                const errData = await currentRes.json();
                throw new Error(errData.message || `HTTP error! status: ${currentRes.status}`);
            }

            const currentData = await currentRes.json();

            // --- 5-Day / 3-Hour Forecast ---
            const forecastRes = await fetch(
                `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
            );

            if (!forecastRes.ok) {
                const errData = await forecastRes.json();
                throw new Error(errData.message || `HTTP error! status: ${forecastRes.status}`);
            }

            const forecastData = await forecastRes.json();

            // Combine both responses into one neat object
            const combined = {
                current: currentData,
                forecast: forecastData,
            };

            setData(combined);

            // ✅ Log to console for inspection (remove later when wiring up the UI)
            console.group('🌤️ OpenWeatherMap API Response');
            console.log('📍 City :', city);
            console.log('🌡️ Current Weather:', currentData);
            console.log('📅 5-Day Forecast :', forecastData);
            console.groupEnd();

        } catch (err) {
            console.error('❌ useWeatherAPI Error:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, fetchWeather };
};

export default useWeatherAPI;
