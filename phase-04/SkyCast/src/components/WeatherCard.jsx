import React from "react";
import { WEATHER_ICONS, WEATHER_GRADIENTS, CloudIcon, WindIcon, PressureIcon, EyeIcon } from "./Icons";
import DataBox from "./DataBox";
import "./WeatherCard.css";

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

export default WeatherCard;
