import NFTCard from './NFTCard';
import './Gallery.css';

/**
 * Gallery — CSS Grid layout for NFT cards
 *
 * Props:
 *   nfts    {Array}  - filtered & sorted NFT list
 *   onSelect {fn}   - opens detail modal with selected NFT
 */
const Gallery = ({ nfts, onSelect }) => {
  if (nfts.length === 0) {
    return (
      <div className="gallery__empty" role="status" aria-live="polite">
        <div className="gallery__empty-icon" aria-hidden="true">◈</div>
        <h3 className="gallery__empty-title">No NFTs found</h3>
        <p className="gallery__empty-desc">
          Try adjusting your search or filters to discover more pieces.
        </p>
      </div>
    );
  }

  return (
    <main className="gallery" aria-label="NFT gallery">
      <div className="gallery__grid">
        {nfts.map((nft, i) => (
          <NFTCard
            key={nft.id}
            nft={nft}
            onClick={onSelect}
            index={i}
          />
        ))}
      </div>
    </main>
  );
};

export default Gallery;
