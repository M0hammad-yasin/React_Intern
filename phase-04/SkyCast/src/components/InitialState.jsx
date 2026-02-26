import React from "react";
import { CloudIcon } from "./Icons";
import "./InitialState.css";

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

export default InitialState;
