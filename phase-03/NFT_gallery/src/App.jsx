import { useState } from 'react';
import { nfts } from './data/nfts';
import useFilter from './hooks/useFilter';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import Gallery from './components/Gallery';
import NFTModal from './components/NFTModal';
import Footer from './components/Footer';

/**
 * App — Root component
 *
 * Coordinates:
 *   - Filter + sort state (via useFilter hook)
 *   - Selected NFT for detail modal
 *   - Top-level layout composition
 */
const App = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);

  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filtered,
    resetFilters,
    totalCount,
    filteredCount,
  } = useFilter(nfts);

  return (
    <>
      <Navbar />

      <HeroSection totalNFTs={totalCount} />

      <FilterBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredCount={filteredCount}
        totalCount={totalCount}
        onReset={resetFilters}
      />

      <Gallery
        nfts={filtered}
        onSelect={setSelectedNFT}
      />

      <Footer />

      {/* Detail Modal */}
      <NFTModal
        nft={selectedNFT}
        onClose={() => setSelectedNFT(null)}
      />
    </>
  );
};

export default App;
