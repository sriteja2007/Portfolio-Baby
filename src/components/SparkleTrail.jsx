import React, { useState, useEffect, useRef } from 'react';
import './SparkleTrail.css';

const SPARKLE_CHARS = ['✦', '★', '⋆', '·'];
const SPARKLE_COLORS = [
  '#f4d58d', // Pale golden dreamlight
  '#f1d9e3', // Soft blush
  '#a34063', // Berry
  '#ffffff', // Pure starlight
];

function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);
  const lastSpawnRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const idCounterRef = useRef(0);

  const timersRef = useRef(new Set());

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || isTouchOnly) {
      return;
    }

    const handlePointerMove = (e) => {
      const now = performance.now();
      // Throttle: spawn at most once every 55ms
      if (now - lastSpawnRef.current < 55) return;

      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Only spawn if pointer has moved at least 8px
      if (dist < 8) return;

      lastSpawnRef.current = now;
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      const char = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
      const size = Math.floor(Math.random() * 8) + 10; // 10px - 18px
      const offsetX = (Math.random() - 0.5) * 14;
      const offsetY = (Math.random() - 0.5) * 14;
      const id = idCounterRef.current++;

      const newSparkle = {
        id,
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        char,
        color,
        size,
      };

      setSparkles((prev) => {
        // Keep at most 14 particles on screen
        const trimmed = prev.length >= 14 ? prev.slice(prev.length - 13) : prev;
        return [...trimmed, newSparkle];
      });

      // Auto remove this sparkle after animation ends (650ms)
      const timerId = setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
        timersRef.current.delete(timerId);
      }, 650);
      timersRef.current.add(timerId);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      timersRef.current.forEach(clearTimeout);
      timersRef.current.clear();
    };
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div className="sparkle-trail-container" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-dust-particle"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            color: s.color,
            fontSize: `${s.size}px`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}

export default SparkleTrail;
