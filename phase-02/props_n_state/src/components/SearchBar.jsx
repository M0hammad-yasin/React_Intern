import './SearchBar.css';

function SearchBar({ searchQuery, onSearchChange }) {
    return (
        <div className="search-bar">
            <span className="search-bar__icon">🔍</span>
            <input
                type="text"
                className="search-bar__input"
                placeholder="Search users by name..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
                <button
                    className="search-bar__clear"
                    onClick={() => onSearchChange('')}
                    aria-label="Clear search"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default SearchBar;
