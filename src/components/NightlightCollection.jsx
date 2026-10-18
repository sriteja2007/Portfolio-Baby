import React, { useState } from 'react';
import { Lamp, Power, Sun, Sparkles, Moon, Sliders, CheckCircle2 } from 'lucide-react';
import './NightlightCollection.css';
import lanternImg from '../../assets/pip_dream_lantern.png';
import cloudAvatarImg from '../../assets/pip_avatar_cloud.png';
import portraitImg from '../../assets/pip_portrait.png';

const LAMPS = [
  {
    id: 'moonbeam',
    name: 'Moonbeam Lamp',
    tagline: 'Amber Moonlight & Warm Glass',
    img: lanternImg,
    alt: 'Pip’s handcrafted Moonbeam Lamp with glowing amber frosted glass',
    glowColor: '244, 213, 141',
    hexColor: '#f4d58d',
    temp: '2400K Warm Dreamlight',
    description:
      'Forged with captured moonlight from the nursery windowsill. Gentle on tired eyes and guaranteed to melt away scary closet shadows.',
    quirk: 'Tested by Pip while reading storybooks to sleepy hedgehogs until 3 AM.',
  },
  {
    id: 'little-star',
    name: 'Little Star Lantern',
    tagline: 'Starlight Embers & Brass Perforations',
    img: cloudAvatarImg,
    alt: 'Pip resting upon a star-lit cloud lantern casting celestial rays',
    glowColor: '255, 209, 102',
    hexColor: '#ffd166',
    temp: '2700K Honey Starlight',
    description:
      'A whimsical lantern imbued with three starlight embers Pip scooped from the night sky during his 2 AM nursery stroll.',
    quirk: 'Projects tiny soothing constellation silhouettes across the ceiling.',
  },
  {
    id: 'cloud-glow',
    name: 'Cloud Glow',
    tagline: 'Pastel Blush Slumber Fleece',
    img: portraitImg,
    alt: 'Soft portrait of Pip casting a calming lavender-blush bedtime aura',
    glowColor: '241, 217, 227',
    hexColor: '#f1d9e3',
    temp: '2200K Pastel Slumber',
    description:
      'A fluffy cloud-shaped nightlight infused with lullaby whispers. Emits a peaceful blush halo designed for soothing restless dreamers.',
    quirk: 'Subtly pulses at 12 breaths per minute to naturally slow heart rates.',
  },
];

function NightlightCollection() {
  const [selectedLampId, setSelectedLampId] = useState('moonbeam');
  const [isOn, setIsOn] = useState(true);
  const [intensity, setIntensity] = useState(80);

  const currentLamp = LAMPS.find((l) => l.id === selectedLampId) || LAMPS[0];

  // Dynamic CSS variables for the real glow effect
  const glowAlpha = isOn ? (intensity / 100) * 0.85 : 0;
  const glowBlur = isOn ? Math.round((intensity / 100) * 55 + 15) : 0;
  const glowSpread = isOn ? Math.round((intensity / 100) * 30 + 5) : 0;
  const filterBrightness = isOn ? 1 + (intensity / 100) * 0.28 : 0.75;

  const dynamicGlowStyle = {
    '--lamp-glow-color': currentLamp.glowColor,
    '--lamp-glow-alpha': glowAlpha,
    '--lamp-glow-blur': `${glowBlur}px`,
    '--lamp-glow-spread': `${glowSpread}px`,
    '--lamp-filter-brightness': filterBrightness,
  };

  const handleTogglePower = () => {
    setIsOn((prev) => !prev);
  };

  const handleIntensityChange = (e) => {
    setIntensity(parseInt(e.target.value, 10));
  };

  return (
    <div className="nightlight-collection" id="nightlight-collection" style={dynamicGlowStyle}>
      {/* Retro OS Window Titlebar */}
      <div className="nightlight-window-header">
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot dot-red"></span>
          <span className="window-dot dot-amber"></span>
          <span className="window-dot dot-green"></span>
        </div>
        <div className="nightlight-header-title">
          <Lamp size={14} className="lamp-icon" />
          <span>PIP_LUMEN_STUDIO.SYS // NIGHTLIGHT COLLECTION</span>
        </div>
        <span className={`power-status-tag ${isOn ? 'online' : 'standby'}`}>
          <span className="status-indicator-dot"></span>
          <span>{isOn ? `POWER: ON (${intensity}%)` : 'POWER: STANDBY'}</span>
        </span>
      </div>

      <div className="nightlight-body">
        {/* Gallery Selector Cards (3 Imaginary Lamps) */}
        <div className="lamp-selector-rail" role="radiogroup" aria-label="Select Nightlight Model">
          <div className="rail-eyebrow">
            <Sparkles size={13} />
            <span>SELECT A NIGHTLIGHT MODEL:</span>
          </div>

          <div className="lamp-cards-list">
            {LAMPS.map((lamp) => {
              const isSelected = lamp.id === selectedLampId;
              return (
                <button
                  key={lamp.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`lamp-select-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedLampId(lamp.id)}
                >
                  <div className="lamp-thumb-wrapper">
                    <img
                      src={lamp.img}
                      alt={lamp.name}
                      className="lamp-thumb-img"
                      loading="lazy"
                      decoding="async"
                    />
                    {isSelected && <span className="selected-check-badge">✦</span>}
                  </div>
                  <div className="lamp-card-info">
                    <div className="lamp-card-title-row">
                      <span className="lamp-card-name">{lamp.name}</span>
                      <span className="color-swatch" style={{ background: lamp.hexColor }}></span>
                    </div>
                    <span className="lamp-card-tagline">{lamp.tagline}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Live Ambient Testing Chamber */}
        <div className="chamber-container">
          <div className="chamber-display-stage">
            {/* Ambient Background Aura reflecting the exact glow intensity */}
            <div
              className={`chamber-glow-halo ${isOn ? 'active' : 'dimmed'}`}
              aria-hidden="true"
            ></div>

            {/* Showcase Lamp with immediate visual glow */}
            <div className="chamber-lamp-pod">
              <img
                src={currentLamp.img}
                alt={currentLamp.alt}
                className={`chamber-lamp-img ${isOn ? 'lit' : 'unlit'}`}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Lamp Specs Floating Tag */}
            <div className="chamber-spec-chip">
              <span className="spec-color-dot" style={{ background: currentLamp.hexColor }}></span>
              <span>{isOn ? `${currentLamp.temp} · ${intensity}% Glow` : 'Lamp Powered Down'}</span>
            </div>
          </div>

          {/* Interactive Controls & Character Story */}
          <div className="chamber-controls-panel">
            <div className="lamp-header-details">
              <div className="eyebrow-badge">
                <Sun size={13} />
                <span>NURSERY LIGHTING SPEC</span>
              </div>
              <h3 className="selected-lamp-title">{currentLamp.name}</h3>
              <p className="selected-lamp-desc">{currentLamp.description}</p>
              <div className="lamp-quirk-box">
                <span className="quirk-star">★</span>
                <span className="quirk-text">{currentLamp.quirk}</span>
              </div>
            </div>

            {/* Physical-Feel Control Deck */}
            <div className="control-deck-card">
              {/* Power Switch */}
              <div className="control-row power-row">
                <div className="control-label-group">
                  <span className="control-title">Lamp Power</span>
                  <span className="control-hint">Toggle bedtime illumination</span>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isOn}
                  className={`power-switch-btn ${isOn ? 'on' : 'off'}`}
                  onClick={handleTogglePower}
                  aria-label={isOn ? 'Turn nightlight off' : 'Turn nightlight on'}
                >
                  <Power size={18} className="power-icon" />
                  <span>{isOn ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {/* Real-time Glow Intensity Slider */}
              <div className="control-row slider-row">
                <div className="control-label-group">
                  <div className="slider-label-header">
                    <span className="control-title">Glow Intensity</span>
                    <span className="intensity-numeric">{isOn ? `${intensity}%` : '0% (Off)'}</span>
                  </div>
                  <span className="control-hint">Adjust warm lumen brightness</span>
                </div>

                <div className="slider-container">
                  <label htmlFor="nightlight-intensity-slider" className="sr-only">
                    Nightlight Glow Intensity Slider
                  </label>
                  <input
                    id="nightlight-intensity-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={isOn ? intensity : 0}
                    disabled={!isOn}
                    onChange={handleIntensityChange}
                    className={`vintage-slider glow-slider ${!isOn ? 'disabled' : ''}`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={isOn ? intensity : 0}
                    aria-valuetext={`${intensity} percent glow brightness`}
                  />
                  <div className="slider-ticks" aria-hidden="true">
                    <span>Soft Candle</span>
                    <span>Story Reading</span>
                    <span>Full Moonlight</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NightlightCollection;
