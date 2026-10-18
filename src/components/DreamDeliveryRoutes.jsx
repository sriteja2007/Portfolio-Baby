import React, { useState, useEffect, useRef } from 'react';
import { Compass, Send, CheckCircle, RefreshCw, Sparkles, Moon, MapPin, Heart } from 'lucide-react';
import './DreamDeliveryRoutes.css';
import pipCloudImg from '../../assets/pip_avatar_cloud.png';

const DESTINATIONS = [
  {
    id: 'bramble',
    name: 'Bramble Cottage',
    residents: 'The Three Little Hedgehogs',
    cargo: '3x Spun-Sugar Berry Lullabies & 1 Warm Milk Bottle',
    x: 180,
    y: 110,
    pathD: 'M 75 275 C 95 190, 135 130, 180 110',
    description:
      'The three baby hedgehogs had a restless evening playing in thorny berry bushes. Pip drops off a fluffy cloud of spun-sugar lullabies so they can safely tuck their quills and dream of rolling mossy hills.',
    soundEffectNote: 'Quiet rustling leaves and warm chimes',
    roofColor: '#a34063',
  },
  {
    id: 'mill',
    name: 'Whistling Mill',
    residents: 'Pippin the Calico Kitten',
    cargo: '1x Celestial Yarn Dream & 432 Hz Purr Frequency',
    x: 330,
    y: 220,
    pathD: 'M 75 275 C 160 300, 250 260, 330 220',
    description:
      'Pippin has been excitedly pouncing on imaginary moon moths in the mill loft. Pip delivers a celestial dream filled with golden yarn and soft milk saucers, coaxing out peaceful kitten purrs.',
    soundEffectNote: 'Gentle creak of windmill sails and soft purring',
    roofColor: '#5c4033',
  },
  {
    id: 'attic',
    name: 'Starlight Attic',
    residents: 'Barnaby the Owlet',
    cargo: '1x Velvet Slumber Cloak & Midnight Lantern Draft',
    x: 480,
    y: 85,
    pathD: 'M 75 275 C 200 170, 350 70, 480 85',
    description:
      'Barnaby is deep into chapter fourteen of his favorite bedtime storybook and rubbing sleepy eyes. Pip floats by his dormer window with a velvet draft of deep rest so Barnaby can finally bookmark his book.',
    soundEffectNote: 'Soft turning pages and distant night breezes',
    roofColor: '#872e4e',
  },
  {
    id: 'burrow',
    name: 'Willow Burrow',
    residents: 'Four Little Rabbit Kits',
    cargo: '4x Meadow Clover Dreams & Lavender Mist Vials',
    x: 610,
    y: 225,
    pathD: 'M 75 275 C 260 320, 460 310, 610 225',
    description:
      'The rabbit kits are too excited for tomorrow’s clover race to keep their floppy ears still. Pip sprinkles soothing lavender bedtime mist down the burrow chimney for deep, twitch-free slumber.',
    soundEffectNote: 'Lavender mist whispers and rhythmic breathing',
    roofColor: '#a34063',
  },
];

function DreamDeliveryRoutes() {
  const [selectedDestId, setSelectedDestId] = useState('bramble');
  const [deliveryState, setDeliveryState] = useState('idle'); // 'idle' | 'in-flight' | 'completed'
  const [flightProgress, setFlightProgress] = useState(0);

  const animationFrameRef = useRef(null);
  const currentDest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  // Animate flight along the delivery path
  const handleStartDelivery = () => {
    if (deliveryState === 'in-flight') return;
    setDeliveryState('in-flight');
    setFlightProgress(0);

    const startTime = performance.now();
    const duration = 1600; // 1.6s smooth delivery flight

    const animateFlight = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setFlightProgress(eased);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateFlight);
      } else {
        setDeliveryState('completed');
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateFlight);
  };

  const handleResetDelivery = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setDeliveryState('idle');
    setFlightProgress(0);
  };

  const handleSelectDestination = (id) => {
    handleResetDelivery();
    setSelectedDestId(id);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Compute Pip's current x,y along flight based on progress
  const startX = 75;
  const startY = 275;
  const targetX = currentDest.x;
  const targetY = currentDest.y;
  // Quadratic or curved interpolation for flight arc
  const midX = (startX + targetX) / 2;
  const midY = Math.min(startY, targetY) - 45;
  const t = flightProgress;
  const currentPipX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * targetX;
  const currentPipY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * targetY;

  return (
    <div className="dream-routes" id="dream-routes">
      {/* Retro OS Window Titlebar */}
      <div className="routes-window-header">
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot dot-red"></span>
          <span className="window-dot dot-amber"></span>
          <span className="window-dot dot-green"></span>
        </div>
        <div className="routes-header-title">
          <Compass size={14} className="compass-icon" />
          <span>PIP_NAVIGATOR.SYS // CELESTIAL DREAM DELIVERY ROUTES</span>
        </div>
        <span className={`flight-status-tag ${deliveryState}`}>
          <span className="flight-dot"></span>
          <span>
            {deliveryState === 'in-flight'
              ? 'STATUS: AIRBORNE'
              : deliveryState === 'completed'
              ? 'STATUS: DELIVERED'
              : 'STATUS: READY FOR FLIGHT'}
          </span>
        </span>
      </div>

      <div className="routes-body">
        {/* Whimsical Illustrated SVG Map */}
        <div className="illustrated-map-wrapper">
          <svg
            viewBox="0 0 700 360"
            className="illustrated-map-svg"
            role="img"
            aria-label="Celestial Dream Delivery Map showing rooftops across the nursery neighborhood"
          >
            <defs>
              {/* Sky Background Gradient */}
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2c1a35" />
                <stop offset="60%" stopColor="#43264c" />
                <stop offset="100%" stopColor="#5c3866" />
              </linearGradient>

              {/* Path glow filter */}
              <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Sky Backdrop */}
            <rect width="700" height="360" rx="12" fill="url(#skyGrad)" />

            {/* Distant Stars & Constellations */}
            <g className="map-stars" aria-hidden="true">
              <circle cx="90" cy="40" r="1.5" fill="#f4d58d" opacity="0.8" />
              <circle cx="210" cy="30" r="1.2" fill="#fff" opacity="0.6" />
              <circle cx="280" cy="70" r="2" fill="#f4d58d" opacity="0.9" />
              <circle cx="370" cy="35" r="1.5" fill="#fff" opacity="0.7" />
              <circle cx="490" cy="25" r="2.2" fill="#f4d58d" opacity="0.85" />
              <circle cx="630" cy="55" r="1.5" fill="#fff" opacity="0.65" />
              <circle cx="150" cy="180" r="1.2" fill="#f4d58d" opacity="0.5" />
              <circle cx="420" cy="160" r="1.5" fill="#fff" opacity="0.5" />
            </g>

            {/* Crescent Moon */}
            <path
              d="M 640 40 A 22 22 0 1 0 658 72 A 18 18 0 1 1 640 40 Z"
              fill="#f4d58d"
              filter="url(#pathGlow)"
              opacity="0.9"
            />

            {/* Friendly Silhouetted Rooftops & Ground */}
            <g className="map-rooftops" aria-hidden="true">
              {/* Soft Distant Hills */}
              <path
                d="M 0 320 Q 180 280, 360 310 T 700 290 L 700 360 L 0 360 Z"
                fill="#201127"
                opacity="0.95"
              />

              {/* Bramble Cottage Rooftop */}
              <path d="M 140 145 L 180 115 L 220 145 Z" fill="#a34063" />
              <rect x="155" y="145" width="50" height="30" fill="#321b36" rx="2" />
              <rect x="175" y="152" width="10" height="12" fill="#f4d58d" opacity="0.75" />
              <rect x="195" y="105" width="8" height="20" fill="#5c4033" />

              {/* Whistling Mill Rooftop & Sail */}
              <rect x="310" y="240" width="40" height="50" fill="#321b36" rx="4" />
              <path d="M 305 240 L 330 205 L 355 240 Z" fill="#5c4033" />
              <circle cx="330" cy="225" r="4" fill="#f4d58d" />
              <line x1="310" y1="210" x2="350" y2="240" stroke="#f4d58d" strokeWidth="1.5" opacity="0.6" />
              <line x1="350" y1="210" x2="310" y2="240" stroke="#f4d58d" strokeWidth="1.5" opacity="0.6" />

              {/* Starlight Attic Rooftop */}
              <path d="M 440 120 L 480 85 L 520 120 Z" fill="#872e4e" />
              <rect x="455" y="120" width="50" height="40" fill="#321b36" rx="2" />
              <polygon points="475,98 485,98 480,90" fill="#f4d58d" opacity="0.8" />
              <rect x="477" y="98" width="6" height="8" fill="#f4d58d" opacity="0.9" />

              {/* Willow Burrow Rooftop / Mound */}
              <path d="M 570 255 Q 610 205, 650 255 Z" fill="#a34063" />
              <rect x="595" y="255" width="30" height="35" fill="#321b36" rx="3" />
              <circle cx="610" cy="245" r="7" fill="#f4d58d" opacity="0.85" />
            </g>

            {/* Headquarters: Midnight Nursery HQ */}
            <g className="map-hq">
              <rect x="50" y="270" width="50" height="60" fill="#2d1633" rx="4" />
              <path d="M 45 270 L 75 240 L 105 270 Z" fill="#a34063" />
              <rect x="68" y="280" width="14" height="18" fill="#f4d58d" opacity="0.85" />
              <text x="75" y="345" textAnchor="middle" fill="#f4d58d" fontSize="9" fontWeight="700" fontFamily="sans-serif">
                NURSERY HQ
              </text>
            </g>

            {/* Winding Flight Paths */}
            {DESTINATIONS.map((dest) => {
              const isSelected = dest.id === selectedDestId;
              return (
                <path
                  key={dest.id}
                  d={dest.pathD}
                  fill="none"
                  stroke={isSelected ? '#f4d58d' : 'rgba(244, 213, 141, 0.22)'}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  strokeDasharray={isSelected ? '6,5' : '4,4'}
                  filter={isSelected ? 'url(#pathGlow)' : 'none'}
                  className={isSelected && deliveryState === 'in-flight' ? 'path-active-pulse' : ''}
                />
              );
            })}

            {/* Selectable Destination Hotspots */}
            {DESTINATIONS.map((dest) => {
              const isSelected = dest.id === selectedDestId;
              return (
                <g
                  key={dest.id}
                  className={`destination-marker ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectDestination(dest.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select ${dest.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectDestination(dest.id);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Glowing selection rings */}
                  {isSelected && (
                    <circle
                      cx={dest.x}
                      cy={dest.y}
                      r="18"
                      fill="none"
                      stroke="#f4d58d"
                      strokeWidth="2"
                      opacity="0.8"
                      className="marker-pulse-ring"
                    />
                  )}
                  <circle
                    cx={dest.x}
                    cy={dest.y}
                    r={isSelected ? '9' : '7'}
                    fill={isSelected ? '#f4d58d' : '#f1d9e3'}
                    stroke="#a34063"
                    strokeWidth="2"
                  />
                  <text
                    x={dest.x}
                    y={dest.y - 14}
                    textAnchor="middle"
                    fill={isSelected ? '#fff' : '#d4b8ca'}
                    fontSize="11"
                    fontFamily="sans-serif"
                    fontWeight={isSelected ? '700' : '500'}
                  >
                    {dest.name}
                  </text>
                </g>
              );
            })}

            {/* Airborne Pip Character Avatar Icon */}
            <g
              transform={`translate(${currentPipX - 16}, ${currentPipY - 16})`}
              className={`pip-flight-avatar ${deliveryState === 'in-flight' ? 'flying' : ''}`}
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="14" fill="#f4d58d" opacity="0.3" filter="url(#pathGlow)" />
              <image href={pipCloudImg} x="0" y="0" width="32" height="32" />
            </g>
          </svg>
        </div>

        {/* Destination Story & Dispatch Controls */}
        <div className="routes-info-panel">
          <div className="destination-header">
            <div className="eyebrow-badge">
              <MapPin size={13} />
              <span>SELECTED ROOFTOP DESTINATION</span>
            </div>
            <h3 className="destination-title">{currentDest.name}</h3>
            <span className="destination-residents">Home of: {currentDest.residents}</span>
          </div>

          <div className="destination-cargo-card">
            <span className="cargo-label">Bedtime Cargo Package:</span>
            <span className="cargo-value">{currentDest.cargo}</span>
          </div>

          <p className="destination-story">{currentDest.description}</p>

          {/* Destination Selector Pills for easy touch/click access */}
          <div className="destination-pills" role="radiogroup" aria-label="Rooftop Destination List">
            {DESTINATIONS.map((d) => (
              <button
                key={d.id}
                type="button"
                role="radio"
                aria-checked={selectedDestId === d.id}
                className={`dest-pill ${selectedDestId === d.id ? 'active' : ''}`}
                onClick={() => handleSelectDestination(d.id)}
              >
                <span>{d.name}</span>
                {selectedDestId === d.id && <span className="pill-star">✦</span>}
              </button>
            ))}
          </div>

          {/* Action Dispatch Buttons & Completion Banner */}
          <div className="delivery-action-area">
            {deliveryState === 'completed' ? (
              <div className="delivery-completed-card" role="status">
                <div className="completed-header">
                  <CheckCircle size={20} className="check-icon" />
                  <span className="completed-title">Dream Delivery Complete!</span>
                </div>
                <p className="completed-msg">
                  Pip arrived safely at {currentDest.name}. The little creatures are now sound asleep!
                </p>
                <button
                  type="button"
                  className="btn-secondary re-deliver-btn"
                  onClick={handleResetDelivery}
                >
                  <RefreshCw size={15} />
                  <span>Deliver Again or Pick Another Stop</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-primary deliver-btn"
                onClick={handleStartDelivery}
                disabled={deliveryState === 'in-flight'}
              >
                {deliveryState === 'in-flight' ? (
                  <>
                    <Sparkles size={18} className="spin-sparkle" />
                    <span>Pip is Flying the Route...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Dispatch Pip to {currentDest.name}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DreamDeliveryRoutes;
