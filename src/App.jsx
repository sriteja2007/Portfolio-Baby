import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import MeetPip from './components/MeetPip.jsx';
import OriginStory from './components/OriginStory.jsx';
import Projects from './components/Projects.jsx';
import Guestbook from './components/Guestbook.jsx';
import Footer from './components/Footer.jsx';
import DreamCelebrationModal from './components/DreamCelebrationModal.jsx';
import SparkleTrail from './components/SparkleTrail.jsx';
import {
  getStoredSoundPreference,
  setSoundActive,
  playDreamModeSfx,
  playSoftClickSfx,
  playSecretFanfareSfx,
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
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);

  // Sync theme with documentElement and persist safely
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('pipos_dream_mode', theme === 'night' ? 'true' : 'false');
    } catch (e) {
      // Ignore quota/security errors
    }
  }, [theme]);

  // Secret Konami Code Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    const konamiSequence = [
      'arrowup',
      'arrowup',
      'arrowdown',
      'arrowdown',
      'arrowleft',
      'arrowright',
      'arrowleft',
      'arrowright',
      'b',
      'a',
    ];
    let keyIndex = 0;

    const handleKeyDown = (e) => {
      // Prevent running if user is typing in form inputs or editable areas
      const target = e.target;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      const expectedKey = konamiSequence[keyIndex];

      if (key === expectedKey) {
        keyIndex += 1;
        if (keyIndex === konamiSequence.length) {
          keyIndex = 0;
          setIsCelebrationOpen((prev) => {
            if (!prev) {
              playSecretFanfareSfx();
            }
            return true;
          });
        }
      } else {
        // Reset or restart if the key matches the start of sequence
        keyIndex = key === 'arrowup' ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  // Open secret dream celebration (callable from mobile / buttons)
  const openCelebration = () => {
    setIsCelebrationOpen(true);
    playSecretFanfareSfx();
  };

  return (
    <div className="app">
      {/* Lightweight Cursor Sparkle Dust */}
      <SparkleTrail />

      {/* Full-Screen Secret Dream Celebration Modal (Konami Easter Egg) */}
      <DreamCelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
      />

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
        <Guestbook />
      </main>

      <Footer onOpenCelebration={openCelebration} />
    </div>
  );
}

export default App;
