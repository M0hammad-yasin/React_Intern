import React, { useState, useEffect } from "react";
import { SearchIcon, SpinnerIcon } from "./Icons";
import "./SearchBar.css";
import useCity from "../hooks/useCity";

const Cities = ({ cityData }) => {
    console.log("cityData ", cityData);
    return (
        <div className="cities-dropdown">
            {cityData?.map((city) => (
                <button key={city.id}>{city.name}</button>
            ))}
        </div>
    );
};

const SearchBar = ({ onSearch, isLoading }) => {
    const { cityData, fetchCity } = useCity();
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) onSearch(city.trim());

    };
    const handleOnchange = (e) => {
        setCity(e.target.value);
        fetchCity(city);
    }
    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="search-row">
                <div className="search-input-wrap">
                    <span className="search-icon"><SearchIcon /></span>
                    <input
                        type="text"
                        value={city}
                        onChange={handleOnchange}
                        placeholder="Search city..."
                        disabled={isLoading}
                        className="neu-input search-input"
                        aria-label="City name"
                    />
                    {city && !isLoading && (
                        <button className="clear-icon" onClick={() => setCity("")} aria-label="Clear search">
                            &times;
                        </button>
                    )}
                </div>
                <button type="submit" disabled={isLoading || !city.trim()} className="neu-button search-btn">
                    {isLoading ? (
                        <><SpinnerIcon /><span>Searching</span></>
                    ) : (
                        <><SearchIcon /><span>Search</span></>
                    )}
                </button>
                <div >
                    <Cities cityData={cityData} />
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
