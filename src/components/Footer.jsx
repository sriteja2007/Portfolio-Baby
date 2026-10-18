import React from 'react';
import { Heart, Sparkles, Moon, ArrowUp } from 'lucide-react';
import './Footer.css';
import logoImg from '../../assets/pip_avatar_cloud.png';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="footer-container">
        {/* Decorative celestial divider */}
        <div className="footer-divider" aria-hidden="true">
          <span className="divider-line"></span>
          <span className="divider-stars">✦ · 🌙 · ✦</span>
          <span className="divider-line"></span>
        </div>

        {/* Footer Main Content */}
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src={logoImg} alt="Pip avatar" className="footer-logo" />
              <div className="footer-title-group">
                <span className="footer-title">PipOS — The Little Dream Operating System</span>
                <span className="footer-tagline">“Good dreams start small.”</span>
              </div>
            </div>
            <p className="footer-character-note">
              Created for the haX.baby <em>“Baby's First Website”</em> Hackathon.
              Pip is a sleepy, gentle Junior Dream Engineer at Midnight Nursery who turns
              restless thoughts into peaceful dreams.
            </p>
          </div>

          <div className="footer-actions">
            <button
              type="button"
              className="back-to-top-btn"
              onClick={scrollToTop}
              aria-label="Scroll back to top of the page"
            >
              <span>Back to Top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom OS Taskbar / Colophon */}
        <div className="footer-bottom-bar">
          <div className="footer-attribution">
            <span>Official haX.baby Skull Baby</span>
            <span className="sep">•</span>
            <span>Character & Artwork &copy; haX.baby</span>
            <span className="sep">•</span>
            <span>All rights reserved</span>
          </div>

          <div className="footer-status-pill">
            <span className="footer-pulse-dot" aria-hidden="true"></span>
            <span>MIDNIGHT NURSERY SHIFT: ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
