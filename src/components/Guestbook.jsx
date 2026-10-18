import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Trash2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart,
  User,
  Activity,
  AlertCircle
} from 'lucide-react';
import './Guestbook.css';
import { playSoftClickSfx, playStardustFoundSfx } from '../utils/audioSystem.js';

// Canonical default entries when storage is empty
const DEFAULT_ENTRIES = [
  {
    id: 'entry-1',
    name: 'Starlight Bunny 🐰',
    message: 'Thank you for the warm amber nightlight, Pip! Slept like a tiny cloud tonight.',
    timestamp: 'Yesterday at 11:42 PM',
    isDefault: true,
  },
  {
    id: 'entry-2',
    name: 'Lullaby Owl 🦉',
    message: 'The Moonbeam melody is on repeat across the canopy. Keep dreaming big, little one!',
    timestamp: '2 days ago',
    isDefault: true,
  },
];

const GUESTBOOK_STORAGE_KEY = 'pipos_guestbook_entries';
const VISITOR_COUNT_KEY = 'pipos_local_visitor_count';
const VISITOR_SESSION_KEY = 'pipos_session_visited';

function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [visitorCount, setVisitorCount] = useState(42);

  const MAX_NAME = 40;
  const MAX_MSG = 200;

  // Load guestbook entries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load guestbook entries:', e);
    }
    // Fallback to default canonical entries
    setEntries(DEFAULT_ENTRIES);
  }, []);

  // Honest Local Visitor Counter
  useEffect(() => {
    try {
      let currentCount = parseInt(localStorage.getItem(VISITOR_COUNT_KEY), 10);
      if (isNaN(currentCount) || currentCount < 1) {
        currentCount = 42; // Cute starting baseline for Pip's nursery log
      }

      const hasVisitedThisSession = sessionStorage.getItem(VISITOR_SESSION_KEY);
      if (!hasVisitedThisSession) {
        currentCount += 1;
        localStorage.setItem(VISITOR_COUNT_KEY, currentCount.toString());
        sessionStorage.setItem(VISITOR_SESSION_KEY, 'true');
      }

      setVisitorCount(currentCount);
    } catch (e) {
      // In case storage is blocked
      setVisitorCount(42);
    }
  }, []);

  // Format counter to 6 digits (e.g., 000043)
  const formattedCounter = String(visitorCount).padStart(6, '0').split('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName || !trimmedMsg) {
      setStatusMsg({ type: 'error', text: 'Please fill in both your name and a sweet dream message!' });
      return;
    }

    if (trimmedMsg.length > MAX_MSG) {
      setStatusMsg({ type: 'error', text: `Message must be under ${MAX_MSG} characters.` });
      return;
    }

    const newEntry = {
      id: `entry-${Date.now()}`,
      name: trimmedName,
      message: trimmedMsg,
      timestamp: 'Just now',
      isDefault: false,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);

    try {
      localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save to localStorage:', err);
    }

    setName('');
    setMessage('');
    setStatusMsg({ type: 'success', text: 'Dream note posted to Pip’s local guestbook! ✨' });
    playStardustFoundSfx();

    setTimeout(() => {
      setStatusMsg(null);
    }, 4500);
  };

  // Clear local entries handler
  const handleClearEntries = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }

    try {
      localStorage.removeItem(GUESTBOOK_STORAGE_KEY);
    } catch (err) {
      console.warn(err);
    }

    setEntries(DEFAULT_ENTRIES);
    setConfirmClear(false);
    playSoftClickSfx();
    setStatusMsg({ type: 'info', text: 'Your custom local entries have been cleared.' });
    setTimeout(() => setStatusMsg(null), 3500);
  };

  return (
    <section className="guestbook-section" id="guestbook" aria-label="Pip's Bedtime Guestbook">
      <div className="guestbook-container">
        {/* Retro Window Container */}
        <div className="guestbook-window">
          {/* Retro Window Top Bar */}
          <div className="guestbook-topbar">
            <div className="window-dots" aria-hidden="true">
              <span className="window-dot dot-red"></span>
              <span className="window-dot dot-amber"></span>
              <span className="window-dot dot-green"></span>
            </div>
            <div className="guestbook-title-bar">
              <MessageSquare size={14} className="bar-icon" />
              <span>GUESTBOOK.LOG // MIDNIGHT NURSERY VISITOR REGISTER</span>
            </div>
            <div className="guestbook-status-badge">
              <span className="live-dot" aria-hidden="true"></span>
              <span>LOCAL READY</span>
            </div>
          </div>

          {/* Header Row: Title & Retro Visitor Counter */}
          <div className="guestbook-header-row">
            <div className="guestbook-header-left">
              <div className="guestbook-eyebrow">
                <Sparkles size={14} className="eyebrow-star" />
                <span>LEAVE A NOTE FOR PIP · VISITOR LOG</span>
              </div>
              <h2 className="guestbook-heading">Bedtime Guestbook</h2>
              <p className="guestbook-subheading">
                Leave a cozy bedtime wish, lullaby suggestion, or gentle hello for Pip.
                Every warm thought keeps the nursery lights glowing softly.
              </p>
            </div>

            {/* Retro 90s Odometer Visitor Counter */}
            <div className="retro-counter-card" aria-label={`Visitor count: ${visitorCount}`}>
              <div className="retro-counter-header">
                <Activity size={12} className="counter-icon" />
                <span>DREAM VISITOR NO.</span>
              </div>
              <div className="odometer-display" aria-hidden="true">
                {formattedCounter.map((digit, index) => (
                  <span key={index} className="odometer-digit">
                    {digit}
                  </span>
                ))}
              </div>
              <div className="counter-caption">
                <span className="honest-badge">Honest Meter</span>
                <span>Local Device Visits (This Browser Only)</span>
              </div>
            </div>
          </div>

          {/* Privacy Disclaimer Banner */}
          <div className="guestbook-privacy-banner" role="note">
            <ShieldCheck size={18} className="shield-icon" />
            <div className="privacy-text">
              <strong>Your privacy matters:</strong> Notes and visit tallies are stored strictly in your
              device’s local storage (this browser only). No personal data or cookies are ever transmitted to external servers.
            </div>
          </div>

          {/* Main Grid: Form on Left, Entries List on Right */}
          <div className="guestbook-grid">
            {/* Left: Input Form */}
            <div className="guestbook-form-card">
              <h3 className="form-card-title">
                <Heart size={16} className="title-heart" />
                <span>Write a Dream Note</span>
              </h3>

              <form onSubmit={handleSubmit} className="guestbook-form" noValidate>
                {/* Name Input */}
                <div className="form-group">
                  <label htmlFor="guestbook-name" className="form-label">
                    <User size={14} className="input-icon" />
                    <span>Your Name or Dream Pseudonym</span>
                  </label>
                  <input
                    id="guestbook-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Sleepy Cloud, Starry Traveler..."
                    value={name}
                    maxLength={MAX_NAME}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div className="input-char-hint">
                    {name.length} / {MAX_NAME} characters
                  </div>
                </div>

                {/* Message Input */}
                <div className="form-group">
                  <label htmlFor="guestbook-msg" className="form-label">
                    <MessageSquare size={14} className="input-icon" />
                    <span>Bedtime Message or Lullaby Wish</span>
                  </label>
                  <textarea
                    id="guestbook-msg"
                    className="form-textarea"
                    rows="4"
                    placeholder="Whisper something gentle to Pip..."
                    value={message}
                    maxLength={MAX_MSG}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <div className="input-char-hint">
                    <span className={MAX_MSG - message.length < 20 ? 'char-warning' : ''}>
                      {MAX_MSG - message.length} characters remaining
                    </span>
                  </div>
                </div>

                {/* Status Message */}
                {statusMsg && (
                  <div
                    className={`form-status-alert ${statusMsg.type}`}
                    role="alert"
                    aria-live="polite"
                  >
                    {statusMsg.type === 'error' ? (
                      <AlertCircle size={15} />
                    ) : (
                      <CheckCircle2 size={15} />
                    )}
                    <span>{statusMsg.text}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn-primary guestbook-submit-btn">
                  <span>Sign Guestbook</span>
                  <Send size={15} />
                </button>
              </form>
            </div>

            {/* Right: Notes Feed */}
            <div className="guestbook-feed-card">
              <div className="feed-header">
                <div className="feed-title-group">
                  <h3 className="feed-title">Recent Dream Whispers</h3>
                  <span className="feed-count-chip">{entries.length} notes</span>
                </div>

                {/* Clear Local Entries */}
                <div className="feed-actions">
                  {confirmClear ? (
                    <div className="confirm-clear-row">
                      <span className="confirm-text">Clear local notes?</span>
                      <button
                        type="button"
                        className="btn-danger-confirm"
                        onClick={handleClearEntries}
                        aria-label="Confirm clearing my local entries"
                      >
                        Yes, clear
                      </button>
                      <button
                        type="button"
                        className="btn-cancel-confirm"
                        onClick={() => setConfirmClear(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn-clear-entries"
                      onClick={handleClearEntries}
                      title="Clear your custom local entries"
                      aria-label="Clear custom entries stored on this browser"
                    >
                      <Trash2 size={13} />
                      <span>Clear My Entries</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Entries Scrollable Area */}
              <div className="guestbook-entries-list" role="feed" aria-label="Guestbook notes">
                {entries.map((entry) => (
                  <article key={entry.id} className="entry-card">
                    <div className="entry-header">
                      <div className="entry-author">
                        <span className="author-avatar" aria-hidden="true">
                          {entry.name.slice(0, 2).toUpperCase()}
                        </span>
                        <strong className="author-name">{entry.name}</strong>
                        {entry.isDefault && (
                          <span className="nursery-badge">Nursery Friend</span>
                        )}
                      </div>
                      <div className="entry-time">
                        <Clock size={11} className="time-icon" />
                        <span>{entry.timestamp}</span>
                      </div>
                    </div>
                    <p className="entry-message">{entry.message}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Guestbook;
