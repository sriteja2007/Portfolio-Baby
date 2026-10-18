import React from 'react';
import { Cookie, Moon, Sparkles, Clock, Bed, Heart } from 'lucide-react';
import './MeetPip.css';
import portraitImg from '../../assets/pip_portrait.png';

function MeetPip() {
  return (
    <section className="meet-pip-section" id="about" aria-label="About Pip">
      {/* Whimsical Retro OS Window Dossier */}
      <div className="os-window-card">
        {/* Window Chrome Titlebar */}
        <div className="window-chrome">
          <div className="window-dots" aria-hidden="true">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-amber"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <span className="window-title">PIP_PROFILE.SYS — Dream Engineer Dossier</span>
          <span className="window-status-tag">STATUS: ON SHIFT</span>
        </div>

        {/* Window Content Layout */}
        <div className="meet-pip-grid">
          {/* Left: Cameo Portrait */}
          <div className="portrait-column">
            <div className="portrait-cameo">
              <div className="cameo-backdrop" aria-hidden="true"></div>
              <img
                src={portraitImg}
                alt="Portrait of Pip wearing a starred bedtime nightcap with a pink ribbon"
                className="portrait-img"
                loading="lazy"
                decoding="async"
              />
              <div className="portrait-stars" aria-hidden="true">
                <span className="cameo-star star-top-left">✦</span>
                <span className="cameo-star star-bottom-right">★</span>
              </div>
            </div>
            <div className="portrait-caption">
              <span className="caption-badge">Official haX.baby Character</span>
            </div>
          </div>

          {/* Right: Bio & Canonical Quirks */}
          <div className="bio-column">
            <div className="bio-header">
              <div className="eyebrow-badge">
                <Sparkles size={13} />
                <span>MEET THE CREATOR</span>
              </div>
              <h2 className="bio-title">Meet Pip</h2>
              <p className="bio-role">Junior Dream Engineer at Midnight Nursery</p>
            </div>

            <p className="bio-text">
              Pip is a sleepy, gentle skull baby with a smooth, round skull face, huge soft
              eye sockets that glow with warm amber light, and a tiny crooked smile. Always
              tucked under a cozy bedtime nightcap decorated with golden stars and a pink bow,
              Pip spends every quiet night designing lullabies, nightlights, and soothing dreamscapes.
            </p>

            {/* Quick Facts Grid */}
            <div className="quirks-grid">
              <div className="quirk-card">
                <div className="quirk-icon-wrap cookie">
                  <Cookie size={18} />
                </div>
                <div className="quirk-details">
                  <span className="quirk-label">Favorite Snack</span>
                  <span className="quirk-value">Moon-shaped butter cookies</span>
                </div>
              </div>

              <div className="quirk-card">
                <div className="quirk-icon-wrap sleep">
                  <Bed size={18} />
                </div>
                <div className="quirk-details">
                  <span className="quirk-label">Work Habit</span>
                  <span className="quirk-value">Falls asleep during quality testing</span>
                </div>
              </div>

              <div className="quirk-card">
                <div className="quirk-icon-wrap magic">
                  <Sparkles size={18} />
                </div>
                <div className="quirk-details">
                  <span className="quirk-label">Specialty</span>
                  <span className="quirk-value">Turning restless thoughts into sweet dreams</span>
                </div>
              </div>

              <div className="quirk-card">
                <div className="quirk-icon-wrap clock">
                  <Clock size={18} />
                </div>
                <div className="quirk-details">
                  <span className="quirk-label">Shift Hours</span>
                  <span className="quirk-value">8:00 PM – Dawn (Night Shift)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeetPip;
