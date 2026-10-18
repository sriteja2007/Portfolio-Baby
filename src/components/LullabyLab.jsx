import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Sparkles, Moon, Cloud, Music, Radio } from 'lucide-react';
import './LullabyLab.css';
import boxImg from '../../assets/pip_lullaby_box.png';
import { getAudioContext } from '../utils/audioSystem.js';

// Gentle pentatonic lullaby melodies (frequencies in Hz)
const MOOD_MELODIES = {
  stardust: {
    name: 'Stardust Arpeggio',
    tempo: 340,
    icon: Sparkles,
    desc: 'Light, twinkling high-register chimes reminiscent of bedtime stars.',
    notes: [
      { freq: 523.25, note: 'C5' },
      { freq: 659.25, note: 'E5' },
      { freq: 783.99, note: 'G5' },
      { freq: 1046.5, note: 'C6' },
      { freq: 880.0, note: 'A5' },
      { freq: 783.99, note: 'G5' },
      { freq: 659.25, note: 'E5' },
      { freq: 587.33, note: 'D5' },
    ],
  },
  moonbeam: {
    name: 'Moonbeam Waltz',
    tempo: 420,
    icon: Moon,
    desc: 'Warm, slow, reassuring melody designed to ease nighttime worries.',
    notes: [
      { freq: 329.63, note: 'E4' },
      { freq: 392.0, note: 'G4' },
      { freq: 523.25, note: 'C5' },
      { freq: 493.88, note: 'B4' },
      { freq: 440.0, note: 'A4' },
      { freq: 392.0, note: 'G4' },
      { freq: 329.63, note: 'E4' },
      { freq: 293.66, note: 'D4' },
      { freq: 261.63, note: 'C4' },
    ],
  },
  cloud: {
    name: 'Cloud Dreams',
    tempo: 520,
    icon: Cloud,
    desc: 'Deep, airy floating notes creating a cozy blanket of peaceful sound.',
    notes: [
      { freq: 261.63, note: 'C4' },
      { freq: 329.63, note: 'E4' },
      { freq: 392.0, note: 'G4' },
      { freq: 440.0, note: 'A4' },
      { freq: 392.0, note: 'G4' },
      { freq: 329.63, note: 'E4' },
      { freq: 293.66, note: 'D4' },
      { freq: 261.63, note: 'C4' },
    ],
  },
};

function LullabyLab({ isActive = true, soundEnabled = false, onToggleSound }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState('stardust');
  const [volume, setVolume] = useState(0.7);
  const [activeNoteIdx, setActiveNoteIdx] = useState(-1);
  const [audioSupported, setAudioSupported] = useState(true);

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const timerRef = useRef(null);
  const noteIndexRef = useRef(0);
  const activeOscsRef = useRef([]);

  const isMuted = !soundEnabled;

  // Initialize Web Audio API safely on first user action
  const initAudio = () => {
    if (audioCtxRef.current) return true;
    try {
      const ctx = getAudioContext();
      if (!ctx) {
        setAudioSupported(false);
        return false;
      }
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      gain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = gain;
      return true;
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
      setAudioSupported(false);
      return false;
    }
  };

  // Play a single gentle sine wave chime
  const playChime = (freq, durationMs) => {
    if (!audioCtxRef.current || !masterGainRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const now = ctx.currentTime;
      const durationSec = durationMs / 1000;
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Smooth music-box envelope: 20ms attack, exponential decay (no sudden clicks)
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.24, now + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec * 0.95);

      osc.connect(noteGain);
      noteGain.connect(masterGainRef.current);

      osc.start(now);
      osc.stop(now + durationSec);

      activeOscsRef.current.push(osc);
      osc.onended = () => {
        activeOscsRef.current = activeOscsRef.current.filter((o) => o !== osc);
      };
    } catch (err) {
      console.warn('Note play error:', err);
    }
  };

  // Stop all active timers and audio oscillations
  const stopAudioLoop = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (activeOscsRef.current.length > 0) {
      activeOscsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (_) {}
      });
      activeOscsRef.current = [];
    }
  };

  // Step function to play the sequence in a continuous lullaby loop
  const stepMelody = (moodKey) => {
    const mood = MOOD_MELODIES[moodKey];
    if (!mood) return;

    const notes = mood.notes;
    const idx = noteIndexRef.current % notes.length;
    const note = notes[idx];

    setActiveNoteIdx(idx);
    playChime(note.freq, mood.tempo);

    noteIndexRef.current = (idx + 1) % notes.length;
    timerRef.current = setTimeout(() => {
      stepMelody(moodKey);
    }, mood.tempo);
  };

  // Start Playback
  const handlePlay = () => {
    if (!soundEnabled && onToggleSound) {
      onToggleSound();
    }
    if (!initAudio()) return;

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }

    stopAudioLoop();
    setIsPlaying(true);
    stepMelody(currentMood);
  };

  // Pause Playback
  const handlePause = () => {
    stopAudioLoop();
    setIsPlaying(false);
  };

  // Stop & Rewind to Beginning
  const handleStop = () => {
    stopAudioLoop();
    setIsPlaying(false);
    noteIndexRef.current = 0;
    setActiveNoteIdx(-1);
  };

  // Change Lullaby Mood
  const handleMoodSelect = (moodKey) => {
    setCurrentMood(moodKey);
    noteIndexRef.current = 0;
    setActiveNoteIdx(-1);

    if (isPlaying) {
      stopAudioLoop();
      // Smoothly restart with the new mood
      timerRef.current = setTimeout(() => {
        stepMelody(moodKey);
      }, 100);
    }
  };

  // Volume Change
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.setValueAtTime(soundEnabled ? newVol : 0, now);
    }
  };

  // Mute / Unmute Toggle syncs with global sound switch
  const toggleMute = () => {
    if (onToggleSound) {
      onToggleSound();
    }
  };

  // Update master gain whenever soundEnabled changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.setValueAtTime(soundEnabled ? volume : 0, now);
    }
  }, [soundEnabled]);

  // Lifecycle Cleanup: stop sound when component unmounts or becomes inactive
  useEffect(() => {
    if (!isActive && isPlaying) {
      handlePause();
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      stopAudioLoop();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close().catch(() => {});
        } catch (_) {}
      }
    };
  }, []);

  const activeMood = MOOD_MELODIES[currentMood];
  const MoodIcon = activeMood.icon;

  return (
    <div className="lullaby-lab" id="lullaby-lab">
      {/* Top Retro OS Window Header */}
      <div className="lullaby-window-header">
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot dot-red"></span>
          <span className="window-dot dot-amber"></span>
          <span className="window-dot dot-green"></span>
        </div>
        <div className="lullaby-header-title">
          <Radio size={14} className="radio-icon" />
          <span>PIP_LULLABY_STUDIO.SYS // AUDIO SYNTHESIZER</span>
        </div>
        <span className={`live-status-pill ${isPlaying ? 'playing' : 'idle'}`}>
          <span className="live-dot"></span>
          <span>{isPlaying ? 'CHIME ACTIVE' : 'STANDBY'}</span>
        </span>
      </div>

      <div className="lullaby-body">
        {/* Left Column: Visual Music Box Presentation */}
        <div className="music-box-stage">
          <div className="music-box-glow" aria-hidden="true"></div>

          {/* Floating animated musical notes when playing */}
          <div className={`notes-emitter ${isPlaying ? 'emitting' : ''}`} aria-hidden="true">
            <span className="floating-note note-1">♪</span>
            <span className="floating-note note-2">♫</span>
            <span className="floating-note note-3">♩</span>
            <span className="floating-note note-4">✦</span>
          </div>

          <div className="music-box-frame">
            <img
              src={boxImg}
              alt="Pip’s handcrafted Lullaby Music Box adorned with star carvings and wind-up key"
              className={`music-box-img ${isPlaying ? 'swaying' : ''}`}
            />
          </div>

          {/* Active Note Chime Visualizer */}
          <div className="chime-bars" aria-label="Visual audio step indicator">
            {activeMood.notes.map((n, idx) => (
              <div
                key={idx}
                className={`chime-bar ${activeNoteIdx === idx ? 'active' : ''}`}
                title={n.note}
              >
                <span className="chime-bar-fill"></span>
                <span className="chime-note-label">{n.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Toy-Like Control Panel */}
        <div className="lullaby-controls">
          <div className="control-section-header">
            <div className="eyebrow-badge">
              <Music size={13} />
              <span>NATIVE WEB AUDIO ENGINE</span>
            </div>
            <h3 className="lab-title">The Lullaby Lab</h3>
            <p className="lab-subtitle">{activeMood.desc}</p>
          </div>

          {/* Mood Selectors */}
          <div className="mood-selector-group" role="radiogroup" aria-label="Lullaby Mood Selection">
            <span className="group-label">Select Bedtime Frequency:</span>
            <div className="mood-buttons">
              {Object.entries(MOOD_MELODIES).map(([key, mood]) => {
                const Icon = mood.icon;
                const isSelected = currentMood === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`mood-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleMoodSelect(key)}
                  >
                    <Icon size={16} className="mood-icon" />
                    <span className="mood-name">{mood.name.split(' ')[0]}</span>
                    {isSelected && <span className="mood-indicator">✦</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Playback Transport Controls */}
          <div className="transport-row">
            {isPlaying ? (
              <button
                type="button"
                className="btn-primary transport-btn"
                onClick={handlePause}
                aria-label="Pause lullaby playback"
              >
                <Pause size={18} />
                <span>Pause Lullaby</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary transport-btn"
                onClick={handlePlay}
                aria-label="Play lullaby melody"
              >
                <Play size={18} />
                <span>Play Lullaby</span>
              </button>
            )}

            <button
              type="button"
              className="btn-secondary stop-btn"
              onClick={handleStop}
              aria-label="Stop and rewind to start"
              title="Stop and Rewind"
            >
              <Square size={16} />
              <span>Stop</span>
            </button>
          </div>

          {/* Volume and Mute Controls */}
          <div className="volume-controls-card">
            <div className="volume-header">
              <button
                type="button"
                className={`mute-toggle-btn ${isMuted ? 'muted' : ''}`}
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute music box' : 'Mute music box'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                <span>{isMuted ? 'Sound Muted' : 'Sound Active'}</span>
              </button>
              <span className="volume-readout">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            <div className="slider-wrapper">
              <label htmlFor="lullaby-volume-slider" className="sr-only">
                Lullaby Volume Control
              </label>
              <input
                id="lullaby-volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="vintage-slider"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={isMuted ? 0 : Math.round(volume * 100)}
                aria-valuetext={isMuted ? 'Muted' : `${Math.round(volume * 100)} percent volume`}
              />
            </div>
          </div>

          {!audioSupported && (
            <div className="audio-unsupported-note" role="alert">
              <span>Note: Web Audio API is unavailable in this environment. Visual chime visualizer is operating.</span>
            </div>
          )}

          <div className="lab-footer-note">
            <span className="note-dot"></span>
            <span>Gentle sine-wave synthesis · 0% Autoplay · Safe for sleepy ears</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LullabyLab;
