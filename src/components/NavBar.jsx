import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import './NavBar.css';
import logoImg from '../../assets/pip_avatar_cloud.png';

function NavBar({ theme, onToggleTheme }) {
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
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#story" className="nav-link">Story</a>
          </nav>
        </div>

        {/* Right: Nursery Status Pill + Theme Toggle */}
        <div className="navbar-right">
          <div className="nursery-status" title="Midnight Nursery Connection">
            <span className="status-dot"></span>
            <span className="status-text">MIDNIGHT NURSERY / ONLINE</span>
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isNight ? 'Switch to Day Shift Mode' : 'Switch to Night Shift Mode'}
            title={isNight ? 'Switch to Day Shift' : 'Switch to Night Shift'}
          >
            {isNight ? <Sun size={18} className="theme-icon sun" /> : <Moon size={18} className="theme-icon moon" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
