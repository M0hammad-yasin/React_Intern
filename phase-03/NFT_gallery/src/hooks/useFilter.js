import { useState, useMemo } from 'react';

/**
 * useFilter — Custom hook for NFT filtering and sorting
 *
 * Manages:
 *   - Active category filter
 *   - Search query
 *   - Sort order
 *   - Derived filtered + sorted results
 *
 * @param {Array} items - The full NFT array
 * @returns {Object} Filter state and handlers
 */
const useFilter = (items = []) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery]       = useState('');
  const [sortBy, setSortBy]                 = useState('newest');

  const filtered = useMemo(() => {
    let result = [...items];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((item) => item.category === activeCategory);
    }

    // Search filter (title, creator, tags)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.creator.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.includes(q)) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.mintedAt) - new Date(a.mintedAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.mintedAt) - new Date(b.mintedAt));
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'likes':
        result.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    return result;
  }, [items, activeCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSortBy('newest');
  };

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filtered,
    resetFilters,
    totalCount: items.length,
    filteredCount: filtered.length,
  };
};

export default useFilter;
