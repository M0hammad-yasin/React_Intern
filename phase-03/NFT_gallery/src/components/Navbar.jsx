import { useState, useEffect } from 'react';
import './Navbar.css';

/**
 * Navbar — Top navigation bar
 * Features: Logo, wallet mock, scroll-aware styling
 */
const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [walletConnected, setWallet]  = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="NEXUS Home">
          <span className="navbar__logo-icon">⬡</span>
          <span className="navbar__logo-text">NΞXUS</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="navbar__links" role="list">
          <li><a href="#gallery" className="navbar__link">Gallery</a></li>
          <li><a href="#" className="navbar__link">Explore</a></li>
          <li><a href="#" className="navbar__link">Creators</a></li>
          <li><a href="#" className="navbar__link">Stats</a></li>
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            className={`navbar__wallet-btn ${walletConnected ? 'navbar__wallet-btn--connected' : ''}`}
            onClick={() => setWallet(!walletConnected)}
            aria-label={walletConnected ? 'Wallet connected' : 'Connect wallet'}
          >
            <span className="navbar__wallet-dot" />
            {walletConnected ? '0x4a…3f8e' : 'Connect Wallet'}
          </button>

          {/* Mobile hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <a href="#gallery" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Gallery</a>
        <a href="#" className="navbar__mobile-link">Explore</a>
        <a href="#" className="navbar__mobile-link">Creators</a>
        <a href="#" className="navbar__mobile-link">Stats</a>
        <button
          className={`navbar__wallet-btn ${walletConnected ? 'navbar__wallet-btn--connected' : ''}`}
          onClick={() => { setWallet(!walletConnected); setMenuOpen(false); }}
        >
          <span className="navbar__wallet-dot" />
          {walletConnected ? '0x4a…3f8e' : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
