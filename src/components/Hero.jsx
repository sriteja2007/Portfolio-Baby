import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Moon, ArrowRight, Heart } from 'lucide-react';
import './Hero.css';
import heroImg from '../../assets/pip_avatar_cloud.png';
import { playPipReactionSfx } from '../utils/audioSystem.js';

function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 0, glowY: 0 });
  const [isReacting, setIsReacting] = useState(false);
  const [floatingHeart, setFloatingHeart] = useState(false);
  const stageRef = useRef(null);
  const reactionTimerRef = useRef(null);

  // Desktop subtle cursor tracking tilt
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = stageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    // Clamped gentle tilt (max 8 degrees)
    setTilt({
      x: -normY * 7,
      y: normX * 7,
      glowX: normX * 12,
      glowY: normY * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glowX: 0, glowY: 0 });
  };

  // Touch and click cozy sleepy reaction
  const triggerSleepyReaction = () => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);

    setIsReacting(true);
    setFloatingHeart(true);
    playPipReactionSfx();

    reactionTimerRef.current = setTimeout(() => {
      setIsReacting(false);
      setFloatingHeart(false);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    };
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      {/* Left: Headline, Story Intro & CTAs */}
      <div className="hero-content">
        <div className="eyebrow-badge">
          <Sparkles size={14} className="eyebrow-icon" />
          <span>A TINY PORTFOLIO FROM THE MIDNIGHT NURSERY</span>
        </div>

        <h1 className="hero-title">
          Small baby. <br />
          <span className="hero-title-accent">Big dreams.</span>
        </h1>

        <p className="hero-intro">
          Pip is a sleepy, gentle skull baby who crafts lullabies, nightlights,
          and bedtime stories at Midnight Nursery to help every restless little creature
          drift off peacefully.
        </p>

        <div className="hero-status-row">
          <div className="hero-badge">
            <span className="badge-glow-dot"></span>
            <span>Junior Dream Engineer · Night Shift</span>
          </div>
          <span className="hero-tagline">“Good dreams start small.”</span>
        </div>

        <div className="hero-cta-group">
          <a href="#projects" className="btn-primary">
            <span>Explore my dream factory</span>
            <ArrowRight size={18} />
          </a>
          <a href="#about" className="btn-secondary">
            <Heart size={16} className="btn-heart" />
            <span>Meet Pip</span>
          </a>
        </div>
      </div>

      {/* Right: The Moonlit Interactive Character Stage */}
      <div className="hero-stage-wrapper">
        <div
          ref={stageRef}
          className="hero-stage"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Moonlit Background Halo moving with cursor */}
          <div
            className="moonlit-glow"
            style={{
              transform: `translate(calc(-50% + ${tilt.glowX}px), calc(-50% + ${tilt.glowY}px))`,
            }}
            aria-hidden="true"
          ></div>
          <div className="moonlit-ring" aria-hidden="true"></div>

          {/* Floating CSS Decorative Stars */}
          <span className="floating-star star-1" aria-hidden="true">✦</span>
          <span className="floating-star star-2" aria-hidden="true">★</span>
          <span className="floating-star star-3" aria-hidden="true">✦</span>
          <span className="floating-star star-4" aria-hidden="true">⋆</span>

          {/* Floating CSS Decorative Clouds */}
          <div className="floating-cloud cloud-left" aria-hidden="true"></div>
          <div className="floating-cloud cloud-right" aria-hidden="true"></div>

          {/* Interactive Pip Character with Gaze & Tap Reaction */}
          <div
            className={`pip-character-container ${isReacting ? 'is-reacting' : ''}`}
            onClick={triggerSleepyReaction}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerSleepyReaction();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Pip, the sleepy skull baby. Click or tap to wake a sleepy smile."
            style={{
              transform: `perspective(850px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* Ambient eye glow enhancing Pip's warm amber gaze */}
            <div
              className={`pip-eye-aura ${isReacting ? 'bright' : ''}`}
              style={{
                transform: `translate(${tilt.glowX * 0.4}px, ${tilt.glowY * 0.4}px)`,
              }}
              aria-hidden="true"
            ></div>

            <img
              src={heroImg}
              alt="Pip, the sleepy skull baby in a starred nightcap resting comfortably on a soft cloud"
              className="pip-character-img"
              loading="eager"
            />

            {/* Cozy Floating Dream Bubble on Tap */}
            {floatingHeart && (
              <div className="pip-reaction-bubble" aria-hidden="true">
                <span className="bubble-star">✦</span>
                <span className="bubble-heart">💤</span>
              </div>
            )}
          </div>

          {/* Soft Ground Shadow */}
          <div className="hero-ground-shadow" aria-hidden="true"></div>

          {/* Retro OS Whimsical Floating Chip */}
          <div className="hero-floating-chip" aria-hidden="true">
            <Moon size={12} className="chip-moon" />
            <span>PIP.SYS // SLEEP TESTING: 100%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
