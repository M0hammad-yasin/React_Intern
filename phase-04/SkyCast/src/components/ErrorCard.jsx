import React from "react";
import { LocationIcon, WifiOffIcon, WarningIcon, CloseIcon } from "./Icons";
import "./ErrorCard.css";

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

export default ErrorCard;
