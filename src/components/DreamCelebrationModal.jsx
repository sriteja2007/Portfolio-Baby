import React, { useEffect, useRef } from 'react';
import { Sparkles, Moon, X, Trophy, Heart, Star } from 'lucide-react';
import './DreamCelebrationModal.css';
import pipHeroImg from '../../assets/pip_avatar_cloud.png';

function DreamCelebrationModal({ isOpen, onClose }) {
  const closeBtnRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus the close button for accessibility
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="celebration-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-title"
      aria-describedby="celebration-desc"
    >
      {/* Background Star Shower & Celestial Particles */}
      <div className="celebration-backdrop" onClick={onClose} aria-hidden="true"></div>

      <div className="celebration-particles" aria-hidden="true">
        <span className="c-star star-p1">✦</span>
        <span className="c-star star-p2">★</span>
        <span className="c-star star-p3">✦</span>
        <span className="c-star star-p4">⋆</span>
        <span className="c-moon moon-p1">🌙</span>
        <span className="c-moon moon-p2">🌙</span>
        <span className="c-sparkle spk-p1">✨</span>
        <span className="c-sparkle spk-p2">✨</span>
        <span className="c-sparkle spk-p3">✨</span>
      </div>

      {/* Main Celebration Window Card */}
      <div className="celebration-card">
        {/* Retro Window Topbar */}
        <div className="celebration-topbar">
          <div className="window-dots" aria-hidden="true">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-amber"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <span className="celebration-topbar-title">KONAMI_SECRET.EXE // CELESTIAL CELEBRATION</span>
          <button
            type="button"
            className="celebration-close-icon-btn"
            onClick={onClose}
            aria-label="Close dream celebration modal"
            title="Close (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="celebration-body">
          <div className="celebration-badge-pill">
            <Trophy size={14} className="trophy-icon" />
            <span>SECRET DREAM UNLOCKED!</span>
          </div>

          <div className="celebration-avatar-stage">
            <div className="celebration-halo-glow" aria-hidden="true"></div>
            <img
              src={pipHeroImg}
              alt="Pip wearing a starry nightcap resting happily on a cloud"
              className="celebration-pip-img"
            />
          </div>

          <h2 id="celebration-title" className="celebration-heading">
            You Found Pip’s Golden Dream Key!
          </h2>

          <p id="celebration-desc" className="celebration-story">
            By entering the ancient Dream Sequence, you’ve awakened the highest frequency
            at Midnight Nursery. Pip has awarded you the <strong>Honorary Celestial Star Badge</strong>.
            May all your dreams start small and shine brightly forever.
          </p>

          <div className="secret-reward-chip">
            <Star size={14} className="reward-star" />
            <span>Secret Code: ↑ ↑ ↓ ↓ ← → ← → B A — Master Dream Engineer Rank</span>
          </div>

          <div className="celebration-actions">
            <button
              ref={closeBtnRef}
              type="button"
              className="btn-primary celebration-return-btn"
              onClick={onClose}
            >
              <Heart size={16} className="btn-heart-icon" />
              <span>Return to Midnight Nursery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DreamCelebrationModal;
