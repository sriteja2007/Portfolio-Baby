/* ==========================================================================
   audioSystem.js — Centralized Web Audio Synthesizer & SFX Manager
   ========================================================================== */

let sharedAudioCtx = null;
let soundEnabled = false;

// Safe localStorage access
export const getStoredSoundPreference = () => {
  try {
    return localStorage.getItem('pipos_sound_enabled') === 'true';
  } catch (e) {
    return false;
  }
};

export const setStoredSoundPreference = (enabled) => {
  try {
    localStorage.setItem('pipos_sound_enabled', enabled ? 'true' : 'false');
  } catch (e) {
    // Ignore storage quota/permission errors
  }
};

// Initialize or resume shared Web Audio context on user gesture
export const getAudioContext = () => {
  if (typeof window === 'undefined') return null;

  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    try {
      sharedAudioCtx = new AudioContextClass();
    } catch (e) {
      console.warn('AudioContext failed to initialize:', e);
      return null;
    }
  }

  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }

  return sharedAudioCtx;
};

export const isSoundActive = () => soundEnabled;

export const setSoundActive = (active) => {
  soundEnabled = active;
  setStoredSoundPreference(active);
  if (active) {
    getAudioContext();
  }
};

/**
 * Play a single gentle sine wave chime note
 */
export const playGentleChime = (freq, durationMs = 280, volume = 0.18) => {
  if (!soundEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const durationSec = durationMs / 1000;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Mellow music-box envelope: 15ms attack, exponential fade (no sudden click)
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSec);
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
};

/**
 * Dream Mode Switch Sound Effect:
 * Upward celestial arpeggio when falling asleep (Night Mode),
 * Downward morning wake chimes when rising (Day Mode).
 */
export const playDreamModeSfx = (isNight) => {
  if (!soundEnabled) return;
  if (isNight) {
    // Entering Dream Mode: C5 -> E5 -> G5 -> C6
    playGentleChime(523.25, 180, 0.14);
    setTimeout(() => playGentleChime(659.25, 200, 0.14), 90);
    setTimeout(() => playGentleChime(783.99, 240, 0.15), 180);
    setTimeout(() => playGentleChime(1046.5, 450, 0.16), 280);
  } else {
    // Returning to Day Shift: G5 -> E5 -> C5
    playGentleChime(783.99, 180, 0.14);
    setTimeout(() => playGentleChime(659.25, 200, 0.14), 100);
    setTimeout(() => playGentleChime(523.25, 380, 0.15), 200);
  }
};

/**
 * Delivery Success Sound Effect:
 * 3-note celebration chime when Pip reaches a rooftop destination.
 */
export const playDeliveryCompleteSfx = () => {
  if (!soundEnabled) return;
  playGentleChime(659.25, 200, 0.15); // E5
  setTimeout(() => playGentleChime(783.99, 220, 0.16), 110); // G5
  setTimeout(() => playGentleChime(1046.5, 550, 0.18), 230); // C6
};

/**
 * Sleepy Pip Reaction Chime:
 * Cute, warm two-note purr when the visitor taps or hovers on Pip.
 */
export const playPipReactionSfx = () => {
  if (!soundEnabled) return;
  playGentleChime(440.0, 150, 0.12); // A4
  setTimeout(() => playGentleChime(587.33, 300, 0.14), 80); // D5
};

/**
 * Soft Interface Click Sound:
 * Tiny warm droplet tap for buttons.
 */
export const playSoftClickSfx = () => {
  if (!soundEnabled) return;
  playGentleChime(880.0, 60, 0.08);
};

/**
 * Secret Celebration Fanfare (Konami Code Easter Egg):
 * 5-note joyful music-box arpeggio.
 */
export const playSecretFanfareSfx = () => {
  if (!soundEnabled) return;
  playGentleChime(523.25, 180, 0.16); // C5
  setTimeout(() => playGentleChime(659.25, 180, 0.16), 100); // E5
  setTimeout(() => playGentleChime(783.99, 200, 0.17), 200); // G5
  setTimeout(() => playGentleChime(1046.5, 260, 0.18), 300); // C6
  setTimeout(() => playGentleChime(1318.5, 600, 0.20), 420); // E6
};

/**
 * Stardust Discovery Chime:
 * Twinkling 3-note starlight chime.
 */
export const playStardustFoundSfx = () => {
  if (!soundEnabled) return;
  playGentleChime(783.99, 150, 0.14); // G5
  setTimeout(() => playGentleChime(987.77, 180, 0.15), 90); // B5
  setTimeout(() => playGentleChime(1174.7, 450, 0.17), 180); // D6
};

