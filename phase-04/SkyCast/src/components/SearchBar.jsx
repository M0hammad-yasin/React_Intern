import React, { useState, useRef, useEffect } from "react";
import { SearchIcon, SpinnerIcon } from "./Icons";
import "./SearchBar.css";
import useCity from "../hooks/useCity";

const Cities = ({ cityData, onSelect }) => {
    if (!cityData || cityData.length === 0) return null;

    return (
        <div className="cities-dropdown">
            {cityData.map((city, index) => (
                <button
                    key={`${city.lat}-${city.lon}-${index}`}
                    type="button"
                    onClick={() => onSelect(city.name)}
                >
                    <span className="city-dot" />
                    <span className="city-name">{city.name}</span>
                    {city.state && (
                        <span className="city-country">{city.state}, {city.country}</span>
                    )}
                    {!city.state && city.country && (
                        <span className="city-country">{city.country}</span>
                    )}
                </button>
            ))}
        </div>
    );
};

const SearchBar = ({ onSearch, isLoading }) => {
    const { cityData, fetchCity } = useCity();
    const [city, setCity] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setShowDropdown(false);
        }
    };

    const handleOnChange = (e) => {
        const val = e.target.value;
        setCity(val);
        if (val.trim().length > 1) {
            fetchCity(val.trim());
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const handleSelect = (selectedCity) => {
        setCity(selectedCity);
        setShowDropdown(false);
        onSearch(selectedCity);
    };

    const handleClear = () => {
        setCity("");
        setShowDropdown(false);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="search-row">
                {/* Input wrapper — dropdown lives here so z-index stacks correctly */}
                <div className="search-input-wrap" ref={wrapRef}>
                    <span className="search-icon"><SearchIcon /></span>
                    <input
                        type="text"
                        value={city}
                        onChange={handleOnChange}
                        onFocus={() => cityData?.length > 0 && setShowDropdown(true)}
                        placeholder="Search city..."
                        disabled={isLoading}
                        className="neu-input search-input"
                        aria-label="City name"
                        autoComplete="off"
                    />
                    {city && !isLoading && (
                        <button
                            type="button"
                            className="clear-icon"
                            onClick={handleClear}
                            aria-label="Clear search"
                        >
                            &times;
                        </button>
                    )}

                    {/* Dropdown is INSIDE the input wrapper */}
                    {showDropdown && (
                        <Cities cityData={cityData} onSelect={handleSelect} />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !city.trim()}
                    className="neu-button search-btn"
                >
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