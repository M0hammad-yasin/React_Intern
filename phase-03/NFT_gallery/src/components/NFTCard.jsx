import { useState } from 'react';
import NFTArt from './NFTArt';
import './NFTCard.css';

/**
 * NFTCard — Gallery card for a single NFT
 *
 * Features:
 *   - Dynamically rendered SVG art (no external images needed)
 *   - Like toggle with count
 *   - Hover reveal for quick-buy/view actions
 *   - Smooth entrance animation via CSS
 *
 * Props:
 *   nft     {Object}  - NFT data object
 *   onClick {fn}      - opens detail modal
 *   index   {number}  - for staggered animation delay
 */
const NFTCard = ({ nft, onClick, index }) => {
  const [liked, setLiked]     = useState(false);
  const [likeCount, setCount] = useState(nft.likes);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = !prev;
      setCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  const rarityColor = {
    'Legendary': '#FFB830',
    'Epic':      '#9B6EFF',
    'Rare':      '#00E5FF',
    'Uncommon':  '#4DFFB4',
    'Common':    '#8A9BBE',
  };
  const rarity = nft.attributes.find((a) => a.trait === 'Rarity')?.value || 'Common';
  const accentColor = rarityColor[rarity] || '#8A9BBE';

  return (
    <article
      className="nft-card"
      style={{ animationDelay: `${(index % 12) * 60}ms` }}
      onClick={() => onClick(nft)}
      role="button"
      tabIndex={0}
      aria-label={`View ${nft.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick(nft)}
    >
      {/* Art area */}
      <div className="nft-card__art-wrapper">
        <NFTArt nft={nft} />

        {/* Hover overlay */}
        <div className="nft-card__overlay" aria-hidden="true">
          <button className="nft-card__view-btn" onClick={() => onClick(nft)}>
            View Details
          </button>
        </div>

        {/* Rarity badge */}
        <div
          className="nft-card__rarity"
          style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}12` }}
          aria-label={`Rarity: ${rarity}`}
        >
          {rarity}
        </div>

        {/* Like button */}
        <button
          className={`nft-card__like ${liked ? 'nft-card__like--active' : ''}`}
          onClick={handleLike}
          aria-label={`${liked ? 'Unlike' : 'Like'} ${nft.title}. ${likeCount} likes`}
          aria-pressed={liked}
        >
          <span className="nft-card__like-icon">{liked ? '♥' : '♡'}</span>
          <span className="nft-card__like-count">
            {likeCount >= 1000
              ? `${(likeCount / 1000).toFixed(1)}k`
              : likeCount}
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="nft-card__info">
        <div className="nft-card__meta">
          <div className="nft-card__creator">
            <div
              className="nft-card__avatar"
              style={{ background: nft.gradient }}
              aria-hidden="true"
            >
              {nft.creatorAvatar}
            </div>
            <div>
              <p className="nft-card__creator-label">Creator</p>
              <p className="nft-card__creator-name">{nft.creator}</p>
            </div>
          </div>
          <div className="nft-card__edition" aria-label={`Edition: ${nft.edition}`}>
            {nft.edition}
          </div>
        </div>

        <h3 className="nft-card__title">{nft.title}</h3>

        <div className="nft-card__footer">
          <div className="nft-card__price">
            <p className="nft-card__price-label">Current Price</p>
            <p className="nft-card__price-value">
              <span className="nft-card__price-eth">Ξ</span>
              {nft.price}
            </p>
          </div>
          <button
            className="nft-card__buy-btn"
            onClick={(e) => { e.stopPropagation(); onClick(nft); }}
            aria-label={`Buy ${nft.title} for ${nft.price} ETH`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default NFTCard;
