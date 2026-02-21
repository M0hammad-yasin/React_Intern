import { CATEGORIES, SORT_OPTIONS } from '../data/nfts';
import './FilterBar.css';

/**
 * FilterBar — Search, category filter, and sort controls
 *
 * Props:
 *   activeCategory  {string}   - currently selected category
 *   setActiveCategory {fn}     - category setter
 *   searchQuery     {string}   - current search text
 *   setSearchQuery  {fn}       - search setter
 *   sortBy          {string}   - current sort key
 *   setSortBy       {fn}       - sort setter
 *   filteredCount   {number}   - visible result count
 *   totalCount      {number}   - total NFT count
 *   onReset         {fn}       - reset all filters
 */
const FilterBar = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filteredCount,
  totalCount,
  onReset,
}) => {
  const hasActiveFilters = activeCategory !== 'All' || searchQuery.trim() !== '' || sortBy !== 'newest';

  return (
    <section className="filterbar" id="gallery" aria-label="Gallery filters">
      <div className="filterbar__inner">

        {/* Top Row: Search + Sort */}
        <div className="filterbar__top">
          {/* Search */}
          <div className="filterbar__search-wrapper">
            <span className="filterbar__search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              className="filterbar__search"
              placeholder="Search by title, creator, or tag…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search NFTs"
            />
            {searchQuery && (
              <button
                className="filterbar__search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="filterbar__sort-wrapper">
            <label htmlFor="sort-select" className="filterbar__sort-label">Sort</label>
            <select
              id="sort-select"
              className="filterbar__sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort NFTs"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="filterbar__sort-arrow" aria-hidden="true">⌄</span>
          </div>
        </div>

        {/* Bottom Row: Category Pills + Result Count */}
        <div className="filterbar__bottom">
          <div className="filterbar__categories" role="group" aria-label="Category filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filterbar__pill ${activeCategory === cat ? 'filterbar__pill--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                aria-label={`Filter by ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="filterbar__meta">
            <span className="filterbar__count" aria-live="polite" aria-atomic="true">
              <span className="filterbar__count-value">{filteredCount}</span>
              <span className="filterbar__count-total"> / {totalCount} NFTs</span>
            </span>
            {hasActiveFilters && (
              <button
                className="filterbar__reset"
                onClick={onReset}
                aria-label="Reset all filters"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
