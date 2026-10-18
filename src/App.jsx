import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import MeetPip from './components/MeetPip.jsx';
import OriginStory from './components/OriginStory.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';
import SparkleTrail from './components/SparkleTrail.jsx';
import {
  getStoredSoundPreference,
  setSoundActive,
  playDreamModeSfx,
  playSoftClickSfx,
} from './utils/audioSystem.js';

// Safe localStorage theme reader
const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('pipos_dream_mode');
    if (saved === 'true') return 'night';
    if (saved === 'false') return 'day';
  } catch (e) {
    // Fallback if localStorage is unavailable or blocked
  }
  return 'day';
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [soundEnabled, setSoundEnabledState] = useState(getStoredSoundPreference);

  // Sync theme with documentElement and persist safely
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('pipos_dream_mode', theme === 'night' ? 'true' : 'false');
    } catch (e) {
      // Ignore quota/security errors
    }
  }, [theme]);

  // Toggle Dream Mode (Day / Night Shift)
  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'day' ? 'night' : 'day';
      playDreamModeSfx(nextTheme === 'night');
      return nextTheme;
    });
  };

  // Toggle Global Sound Consent
  const toggleSound = () => {
    setSoundEnabledState((prev) => {
      const next = !prev;
      setSoundActive(next);
      if (next) {
        playSoftClickSfx();
      }
      return next;
    });
  };

  return (
    <div className="app">
      {/* Lightweight Cursor Sparkle Dust */}
      <SparkleTrail />

      {/* Retro OS Title Bar with Dream Mode & Sound Controls */}
      <NavBar
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <main className="main-content">
        <Hero />
        <MeetPip />
        <OriginStory />
        <Projects soundEnabled={soundEnabled} onToggleSound={toggleSound} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
