import { useState, useCallback } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';

const useCity = () => {
    const [cityData, setCityData] = useState(null);
    const [errorCity, setErrorCity] = useState(null);
    const [loadingCity, setLoadingCity] = useState(false);

    const fetchCity = useCallback(async (query) => {
        if (!query || !String(query).trim()) {
            setCityData(null);
            return;
        }

        setLoadingCity(true);
        setErrorCity(null);

        try {
            const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`);
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCityData(data);
        } catch (err) {
            console.error('❌ useCity Error:', err.message);
            setErrorCity(err.message);
            setCityData(null);
        } finally {
            setLoadingCity(false);
        }
    }, [])

    return { cityData, loadingCity, errorCity, fetchCity };
}

export default useCity;