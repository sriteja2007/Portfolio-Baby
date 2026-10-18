import React from 'react';
import { Sparkles, Moon, ArrowRight, Heart } from 'lucide-react';
import './Hero.css';
import heroImg from '../../assets/pip_avatar_cloud.png';

function Hero() {
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

      {/* Right: The Moonlit Composition Character Stage */}
      <div className="hero-stage-wrapper">
        <div className="hero-stage">
          {/* Moonlit Background Halo */}
          <div className="moonlit-glow" aria-hidden="true"></div>
          <div className="moonlit-ring" aria-hidden="true"></div>

          {/* Floating CSS Decorative Stars */}
          <span className="floating-star star-1" aria-hidden="true">✦</span>
          <span className="floating-star star-2" aria-hidden="true">★</span>
          <span className="floating-star star-3" aria-hidden="true">✦</span>
          <span className="floating-star star-4" aria-hidden="true">⋆</span>

          {/* Floating CSS Decorative Clouds */}
          <div className="floating-cloud cloud-left" aria-hidden="true"></div>
          <div className="floating-cloud cloud-right" aria-hidden="true"></div>

          {/* Pip Character Art */}
          <div className="pip-character-container">
            <img
              src={heroImg}
              alt="Pip, the sleepy skull baby in a starry nightcap resting comfortably on a soft cloud"
              className="pip-character-img"
              loading="eager"
            />
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
