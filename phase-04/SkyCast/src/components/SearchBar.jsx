import React, { useState } from "react";
import { SearchIcon, SpinnerIcon } from "./Icons";
import "./SearchBar.css";

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

export default SearchBar;
