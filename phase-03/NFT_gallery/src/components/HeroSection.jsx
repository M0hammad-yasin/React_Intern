import './HeroSection.css';

/**
 * HeroSection — Landing banner above the gallery
 * Features: Animated headline, live stats, decorative elements
 */
const HeroSection = ({ totalNFTs }) => {
  return (
    <section className="hero" aria-label="Hero section">
      {/* Background decorative orbs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      {/* Grid lines decorative */}
      <div className="hero__grid-lines" aria-hidden="true" />

      <div className="hero__content">
        {/* Eyebrow label */}
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          Curated Digital Art on Ethereum
        </div>

        {/* Main headline */}
        <h1 className="hero__headline">
          <span className="hero__headline-line hero__headline-line--1">Discover &amp;</span>
          <span className="hero__headline-line hero__headline-line--2">Collect</span>
          <span className="hero__headline-line hero__headline-line--3">
            Exceptional <span className="hero__headline-accent">NFTs</span>
          </span>
        </h1>

        {/* Description */}
        <p className="hero__description">
          The premier gallery for curated digital art, generative masterpieces,
          and tokenized creativity from the world's most innovative on-chain artists.
        </p>

        {/* CTAs */}
        <div className="hero__ctas">
          <a href="#gallery" className="hero__btn hero__btn--primary">
            <span>Explore Gallery</span>
            <span className="hero__btn-arrow">→</span>
          </a>
          <a href="#" className="hero__btn hero__btn--secondary">
            List Your NFT
          </a>
        </div>

        {/* Stats row */}
        <div className="hero__stats" role="list" aria-label="Platform statistics">
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-value">{totalNFTs}</span>
            <span className="hero__stat-label">Total NFTs</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-value">4</span>
            <span className="hero__stat-label">Creators</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-value">47.2</span>
            <span className="hero__stat-label">ETH Volume</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-value">18.3K</span>
            <span className="hero__stat-label">Total Likes</span>
          </div>
        </div>
      </div>

      {/* Featured NFT preview card (decorative) */}
      <div className="hero__preview" aria-hidden="true">
        <div className="hero__preview-card">
          <div className="hero__preview-art" style={{
            background: 'linear-gradient(135deg, #0D0020 0%, #1A0040 30%, #9B6EFF 70%, #00E5FF 100%)'
          }}>
            <div className="hero__preview-shimmer" />
          </div>
          <div className="hero__preview-info">
            <div className="hero__preview-title-line" />
            <div className="hero__preview-meta">
              <div className="hero__preview-price">4.2 ETH</div>
              <div className="hero__preview-badge">LIVE</div>
            </div>
          </div>
        </div>
        <div className="hero__preview-float hero__preview-float--1">
          <span>⬡</span> Genesis Collection
        </div>
        <div className="hero__preview-float hero__preview-float--2">
          <span>♦</span> 847 Likes
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
