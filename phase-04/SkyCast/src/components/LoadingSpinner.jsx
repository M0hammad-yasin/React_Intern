import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => (
    <div className="spinner-container animate-fade-in">
        <div className="spinner" />
        <p className="spinner-text">Fetching weather data...</p>
    </div>
);

export default LoadingSpinner;
