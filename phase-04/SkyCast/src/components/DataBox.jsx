import React from "react";
import "./DataBox.css";

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

export default DataBox;
