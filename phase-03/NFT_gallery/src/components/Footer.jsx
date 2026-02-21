import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__left">
        <span className="footer__logo">⬡ NΞXUS</span>
        <p className="footer__tagline">The premier gallery for exceptional digital art.</p>
      </div>
      <div className="footer__links">
        <a href="#" className="footer__link">About</a>
        <a href="#" className="footer__link">Docs</a>
        <a href="#" className="footer__link">GitHub</a>
        <a href="#" className="footer__link">Discord</a>
        <a href="#" className="footer__link">Twitter</a>
      </div>
      <div className="footer__right">
        <p className="footer__meta">Built with React + Vite</p>
        <p className="footer__meta">© 2024 NΞXUS Gallery</p>
      </div>
    </div>
  </footer>
);

export default Footer;
