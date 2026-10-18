import React from 'react';
import { Moon, Sun, Volume2, VolumeX, Sparkles } from 'lucide-react';
import './NavBar.css';
import logoImg from '../../assets/pip_avatar_cloud.png';

function NavBar({ theme, onToggleTheme, soundEnabled, onToggleSound }) {
  const isNight = theme === 'night';

  return (
    <header className="navbar-container">
      <div className="navbar-window">
        {/* Left: Retro Window Controls + Logo + Nav */}
        <div className="navbar-left">
          <div className="window-dots" aria-hidden="true">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-amber"></span>
            <span className="window-dot dot-green"></span>
          </div>

          <a href="#" className="navbar-brand" aria-label="PipOS Home">
            <div className="logo-badge">
              <img src={logoImg} alt="Pip avatar icon" className="logo" />
            </div>
            <div className="brand-text">
              <span className="brand-title">PipOS</span>
              <span className="brand-ver">v1.0.4</span>
            </div>
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#about" className="nav-link">About</a>
            <a href="#story" className="nav-link">Story</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#guestbook" className="nav-link">Guestbook</a>
          </nav>
        </div>

        {/* Right: Sound Toggle + Dream Mode Toggle + Status */}
        <div className="navbar-right">
          <div className="nursery-status" title="Midnight Nursery Connection">
            <span className="status-dot"></span>
            <span className="status-text">MIDNIGHT NURSERY / ONLINE</span>
          </div>

          {/* Sound On / Sound Off Control */}
          <button
            type="button"
            className={`sound-toggle-btn ${soundEnabled ? 'sound-on' : 'sound-off'}`}
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute all interface sounds' : 'Enable interface sounds'}
            aria-pressed={soundEnabled}
            title={soundEnabled ? 'Interface Sound Active' : 'Interface Sound Disabled'}
          >
            {soundEnabled ? <Volume2 size={16} className="sound-icon on" /> : <VolumeX size={16} className="sound-icon off" />}
            <span className="sound-toggle-label">{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
          </button>

          {/* Clearly Labeled Dream Mode Toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={isNight}
            className={`dream-mode-toggle ${isNight ? 'active' : ''}`}
            onClick={onToggleTheme}
            aria-label={isNight ? 'Dream Mode is on. Click to switch to day shift mode' : 'Dream Mode is off. Click to enable nighttime dream mode'}
            title={isNight ? 'Disable Dream Mode (Switch to Day)' : 'Enable Dream Mode (Nighttime)'}
          >
            {isNight ? <Moon size={15} className="dream-mode-icon night" /> : <Sun size={15} className="dream-mode-icon day" />}
            <span className="dream-mode-label">Dream Mode</span>
            <span className="toggle-switch-track" aria-hidden="true">
              <span className="toggle-switch-knob"></span>
            </span>
            <span className="sr-only">{isNight ? 'Dream Mode enabled' : 'Dream Mode disabled'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
