import { useEffect, useRef } from 'react';
import NFTArt from './NFTArt';
import './NFTModal.css';

/**
 * NFTModal — Full-screen detail view for a selected NFT
 *
 * Features:
 *   - Large art display
 *   - Full metadata (attributes, creator, edition, tags)
 *   - Buy/bid actions
 *   - Keyboard trap (Escape to close)
 *   - Focus management for accessibility
 *
 * Props:
 *   nft     {Object|null}  - selected NFT or null
 *   onClose {fn}           - close handler
 */
const NFTModal = ({ nft, onClose }) => {
  const modalRef    = useRef(null);
  const closeBtnRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!nft) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // Focus close button
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [nft, onClose]);

  if (!nft) return null;

  const rarityColor = {
    'Legendary': '#FFB830',
    'Epic':      '#9B6EFF',
    'Rare':      '#00E5FF',
    'Uncommon':  '#4DFFB4',
    'Common':    '#8A9BBE',
  };
  const rarity = nft.attributes.find((a) => a.trait === 'Rarity')?.value || 'Common';
  const accentColor = rarityColor[rarity] || '#8A9BBE';

  const formattedDate = new Date(nft.mintedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`NFT detail: ${nft.title}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      ref={modalRef}
    >
      <div className="modal">
        {/* Close button */}
        <button
          className="modal__close"
          onClick={onClose}
          ref={closeBtnRef}
          aria-label="Close detail view"
        >
          ✕
        </button>

        <div className="modal__body">
          {/* Art Panel */}
          <div className="modal__art-panel">
            <div className="modal__art-frame">
              <NFTArt nft={nft} large />
            </div>

            {/* Quick actions below art */}
            <div className="modal__art-actions">
              <button className="modal__action-btn modal__action-btn--secondary">
                ↗ Share
              </button>
              <button className="modal__action-btn modal__action-btn--secondary">
                ⊕ Watch
              </button>
              <button className="modal__action-btn modal__action-btn--secondary">
                ⧉ View on Chain
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="modal__info-panel">
            {/* Category + Edition */}
            <div className="modal__badges">
              <span className="modal__badge modal__badge--category">
                {nft.category}
              </span>
              <span
                className="modal__badge modal__badge--rarity"
                style={{
                  color: accentColor,
                  borderColor: `${accentColor}40`,
                  background: `${accentColor}12`,
                }}
              >
                {rarity}
              </span>
              <span className="modal__badge modal__badge--edition">
                {nft.edition}
              </span>
            </div>

            {/* Title */}
            <h2 className="modal__title">{nft.title}</h2>

            {/* Creator */}
            <div className="modal__creator">
              <div
                className="modal__creator-avatar"
                style={{ background: nft.gradient }}
                aria-hidden="true"
              >
                {nft.creatorAvatar}
              </div>
              <div>
                <p className="modal__creator-label">Created by</p>
                <p className="modal__creator-name">{nft.creator}</p>
              </div>
              <div className="modal__creator-date">
                <p className="modal__creator-label">Minted</p>
                <p className="modal__creator-name">{formattedDate}</p>
              </div>
            </div>

            {/* Description */}
            <p className="modal__description">{nft.description}</p>

            {/* Price + Buy */}
            <div className="modal__purchase">
              <div className="modal__price">
                <p className="modal__price-label">Current Price</p>
                <p className="modal__price-value">
                  <span className="modal__price-eth">Ξ</span>
                  {nft.price}
                  <span className="modal__price-currency"> ETH</span>
                </p>
              </div>
              <div className="modal__buy-actions">
                <button className="modal__btn modal__btn--primary">
                  Buy Now · Ξ{nft.price}
                </button>
                <button className="modal__btn modal__btn--secondary">
                  Place Bid
                </button>
              </div>
            </div>

            {/* Attributes */}
            <div className="modal__attributes">
              <h3 className="modal__section-title">Attributes</h3>
              <div className="modal__attrs-grid">
                {nft.attributes.map((attr) => (
                  <div key={attr.trait} className="modal__attr">
                    <p className="modal__attr-trait">{attr.trait}</p>
                    <p
                      className="modal__attr-value"
                      style={attr.trait === 'Rarity' ? { color: accentColor } : {}}
                    >
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="modal__tags-section">
              <h3 className="modal__section-title">Tags</h3>
              <div className="modal__tags">
                {nft.tags.map((tag) => (
                  <span key={tag} className="modal__tag">#{tag}</span>
                ))}
              </div>
            </div>

            {/* Token ID / contract info */}
            <div className="modal__chain-info">
              <div className="modal__chain-row">
                <span className="modal__chain-label">Token ID</span>
                <span className="modal__chain-value">#{nft.id}</span>
              </div>
              <div className="modal__chain-row">
                <span className="modal__chain-label">Blockchain</span>
                <span className="modal__chain-value">Ethereum</span>
              </div>
              <div className="modal__chain-row">
                <span className="modal__chain-label">Token Standard</span>
                <span className="modal__chain-value">ERC-721</span>
              </div>
              <div className="modal__chain-row">
                <span className="modal__chain-label">Royalties</span>
                <span className="modal__chain-value">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTModal;
