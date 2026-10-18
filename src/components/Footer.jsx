import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Moon, ArrowUp, Star } from 'lucide-react';
import './Footer.css';
import logoImg from '../../assets/pip_avatar_cloud.png';
import { playStardustFoundSfx } from '../utils/audioSystem.js';

function Footer({ onOpenCelebration }) {
  const [stardustToast, setStardustToast] = useState(null);
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef(null);
  const toastTimerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Repeated clicks on celestial charm (5 clicks)
  const handleCelestialClick = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    clickCountRef.current += 1;

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      setStardustToast('You found a little piece of stardust! ✨');
      playStardustFoundSfx();

      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => {
        setStardustToast(null);
      }, 5500);
    } else {
      resetTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="footer-container">
        {/* Decorative celestial divider + Secret Clickable Charm */}
        <div className="footer-divider">
          <span className="divider-line" aria-hidden="true"></span>
          <button
            type="button"
            className="divider-stars-btn"
            onClick={handleCelestialClick}
            aria-label="Secret celestial star charm. Tap repeatedly to collect hidden stardust."
            title="A tiny celestial charm... (Tap repeatedly!)"
          >
            ✦ · 🌙 · ✦
          </button>
          <span className="divider-line" aria-hidden="true"></span>
        </div>

        {/* Secret Stardust Toast */}
        {stardustToast && (
          <div className="footer-secret-toast" role="status">
            <div className="stardust-toast-content">
              <Sparkles size={16} className="stardust-icon" />
              <span>{stardustToast}</span>
            </div>
            {onOpenCelebration && (
              <button
                type="button"
                className="stardust-celebration-link"
                onClick={onOpenCelebration}
              >
                Launch Dream Celebration 🎮
              </button>
            )}
          </div>
        )}

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
            {/* Mobile / Accessible Konami Celebration Trigger */}
            {onOpenCelebration && (
              <button
                type="button"
                className="mobile-konami-trigger"
                onClick={onOpenCelebration}
                title="Secret Dream Sequence (↑↑↓↓←→←→BA)"
                aria-label="Unlock Secret Dream Celebration"
              >
                <Star size={14} className="konami-star-icon" />
                <span>Secret Dream Key</span>
              </button>
            )}

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
