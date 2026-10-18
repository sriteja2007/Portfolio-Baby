import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, Star, BookOpen, Music, Lamp, Compass, ArrowRight, Heart } from 'lucide-react';
import './OriginStory.css';
import avatarCloudImg from '../../assets/pip_avatar_cloud.png';
import musicBoxImg from '../../assets/pip_lullaby_box.png';
import lanternImg from '../../assets/pip_dream_lantern.png';
import portraitImg from '../../assets/pip_portrait.png';

const SCENES = [
  {
    id: 1,
    tag: 'SCENE 01 // THE FALLING STAR',
    title: 'It began with one tiny star.',
    text: 'On the quietest night of the year, a tiny golden star tumbled out of the sky and landed beside Pip’s blanket. It hummed a melody softer than a whisper. Pip opened those sleepy amber eyes and discovered something extraordinary: even the smallest light could make the darkest night feel safe.',
    badge: 'Discovery at Midnight',
    bgClass: 'scene-sky-lavender',
    link: null,
  },
  {
    id: 2,
    tag: 'SCENE 02 // THE DREAM WORKSHOP',
    title: 'What if dreams could be made?',
    text: 'Pip carried the little star into a quiet corner of the nursery. There, an old music box began to sing. A tiny lantern glowed. Shadows turned into friendly shapes, and restless little creatures finally smiled in their sleep. Pip had discovered a new kind of magic: building things that helped others feel safe.',
    badge: 'The First Inventions',
    bgClass: 'scene-workshop-blush',
    link: {
      label: 'Explore the dream workshop',
      targetId: 'projects',
    },
  },
  {
    id: 3,
    tag: 'SCENE 03 // THE FIRST DREAM DELIVERY',
    title: 'Every little dream deserves a home.',
    text: 'With a lantern tucked under one arm and a new lullaby in mind, Pip stepped onto the rooftops of Midnight Nursery. One by one, little lights appeared in sleepy windows. From that night onward, Pip became the neighborhood’s Junior Dream Engineer, delivering peaceful dreams to anyone who needed one.',
    badge: 'Purpose Discovered',
    bgClass: 'scene-village-twilight',
    link: {
      label: 'Follow Pip’s route',
      targetId: 'dream-routes',
    },
  },
];

function OriginStory() {
  const [activeScene, setActiveScene] = useState(1);
  const sceneRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    const options = {
      root: null,
      rootMargin: '-20% 0px -25% 0px',
      threshold: 0.35,
    };

    sceneRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScene(index + 1);
          }
        });
      }, options);

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToScene = (sceneIndex) => {
    const target = sceneRefs.current[sceneIndex - 1];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="origin-story-section" id="story" aria-label="Pip’s Cinematic Origin Story">
      {/* Story Window Header */}
      <div className="story-window-chrome">
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot dot-red"></span>
          <span className="window-dot dot-amber"></span>
          <span className="window-dot dot-green"></span>
        </div>
        <div className="story-chrome-title">
          <BookOpen size={14} className="book-icon" />
          <span>STORYBOOK_ENGINE.SYS // “A LITTLE STAR, A VERY BIG DREAM”</span>
        </div>
        <div className="story-progress-pill" aria-label={`Current scene: ${activeScene} of 3`}>
          <span className="progress-star">✦</span>
          <span>SCENE {activeScene} OF 3</span>
        </div>
      </div>

      {/* Sticky Story Navigation / Progress Stepper */}
      <nav className="story-nav-stepper" aria-label="Story chapter navigation">
        <div className="stepper-track">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              type="button"
              className={`stepper-btn ${activeScene === scene.id ? 'active' : ''}`}
              onClick={() => scrollToScene(scene.id)}
              aria-label={`Jump to Scene ${scene.id}: ${scene.title}`}
            >
              <span className="stepper-dot"></span>
              <span className="stepper-label">
                Scene {scene.id}: {scene.id === 1 ? 'Falling Star' : scene.id === 2 ? 'Dream Workshop' : 'First Delivery'}
              </span>
            </button>
          ))}
        </div>
        <div className="stepper-progress-bar" style={{ width: `${(activeScene / 3) * 100}%` }} aria-hidden="true"></div>
      </nav>

      {/* Main Story Container with 3 Sequential Cinematic Scenes */}
      <div className="story-scenes-container">
        {/* ====================================================================
            SCENE 1: THE FALLING STAR
           ==================================================================== */}
        <article
          ref={(el) => (sceneRefs.current[0] = el)}
          className={`story-scene scene-1 ${activeScene === 1 ? 'is-active' : ''}`}
          data-scene="1"
          aria-label="Scene 1: The Falling Star"
        >
          <div className="scene-content">
            <div className="scene-eyebrow">
              <span className="scene-num-badge">01</span>
              <span>{SCENES[0].tag}</span>
            </div>

            <h3 className="scene-title">{SCENES[0].title}</h3>

            <p className="scene-text">{SCENES[0].text}</p>

            <div className="scene-meta-pill">
              <Sparkles size={13} className="meta-sparkle" />
              <span>{SCENES[0].badge}</span>
            </div>
          </div>

          <div className="scene-visual visual-falling-star">
            {/* Illustrated Sky Backdrop */}
            <div className="scene-sky-stage" aria-hidden="true">
              <div className="celestial-halo"></div>

              {/* Traveling Golden Star Animation */}
              <div className="traveling-star-track">
                <div className="falling-golden-star">
                  <span className="star-core">★</span>
                  <div className="star-trail"></div>
                </div>
              </div>

              {/* Twinkling ambient stars */}
              <span className="ambient-star a-star-1">✦</span>
              <span className="ambient-star a-star-2">⋆</span>
              <span className="ambient-star a-star-3">★</span>
              <span className="ambient-star a-star-4">✦</span>

              {/* Pip resting on his cozy starry blanket */}
              <div className="pip-blanket-pod">
                <img
                  src={avatarCloudImg}
                  alt="Pip sleeping warmly on a soft cloud blanket as a golden star arrives"
                  className="scene-pip-avatar"
                />
              </div>

              {/* Floating soft clouds */}
              <div className="story-cloud cloud-a"></div>
              <div className="story-cloud cloud-b"></div>
            </div>
          </div>
        </article>

        {/* ====================================================================
            SCENE 2: THE DREAM WORKSHOP
           ==================================================================== */}
        <article
          ref={(el) => (sceneRefs.current[1] = el)}
          className={`story-scene scene-2 ${activeScene === 2 ? 'is-active' : ''}`}
          data-scene="2"
          aria-label="Scene 2: The Dream Workshop"
        >
          <div className="scene-content">
            <div className="scene-eyebrow">
              <span className="scene-num-badge">02</span>
              <span>{SCENES[1].tag}</span>
            </div>

            <h3 className="scene-title">{SCENES[1].title}</h3>

            <p className="scene-text">{SCENES[1].text}</p>

            <div className="scene-actions-row">
              <div className="scene-meta-pill">
                <Heart size={13} className="meta-heart" />
                <span>{SCENES[1].badge}</span>
              </div>

              <a
                href="#projects"
                className="story-interactive-link"
                onClick={(e) => handleLinkClick(e, 'projects')}
                aria-label="Explore the dream workshop projects"
              >
                <span>Explore the dream workshop</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="scene-visual visual-workshop">
            {/* Workshop Hearth & Inventions Stage */}
            <div className="scene-workshop-stage" aria-hidden="true">
              <div className="workshop-warmth-glow"></div>

              {/* Floating Musical Notes and Sparkles */}
              <div className="workshop-particles">
                <span className="sparkle-particle sp-1">♫</span>
                <span className="sparkle-particle sp-2">✦</span>
                <span className="sparkle-particle sp-3">♪</span>
                <span className="sparkle-particle sp-4">★</span>
              </div>

              {/* Duo Display: Lullaby Box & Glowing Dream Lantern */}
              <div className="workshop-artifacts-pod">
                <div className="artifact-item box-artifact">
                  <img src={musicBoxImg} alt="Pip’s singing lullaby music box" className="artifact-img" />
                  <span className="artifact-tag">Lullaby Box</span>
                </div>
                <div className="artifact-item lantern-artifact">
                  <img src={lanternImg} alt="Pip’s glowing dream lantern" className="artifact-img" />
                  <span className="artifact-tag">Dream Lantern</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ====================================================================
            SCENE 3: THE FIRST DREAM DELIVERY
           ==================================================================== */}
        <article
          ref={(el) => (sceneRefs.current[2] = el)}
          className={`story-scene scene-3 ${activeScene === 3 ? 'is-active' : ''}`}
          data-scene="3"
          aria-label="Scene 3: The First Dream Delivery"
        >
          <div className="scene-content">
            <div className="scene-eyebrow">
              <span className="scene-num-badge">03</span>
              <span>{SCENES[2].tag}</span>
            </div>

            <h3 className="scene-title">{SCENES[2].title}</h3>

            <p className="scene-text">{SCENES[2].text}</p>

            <div className="scene-actions-row">
              <div className="scene-meta-pill">
                <Moon size={13} className="meta-moon" />
                <span>{SCENES[2].badge}</span>
              </div>

              <a
                href="#dream-routes"
                className="story-interactive-link"
                onClick={(e) => handleLinkClick(e, 'dream-routes')}
                aria-label="Follow Pip’s celestial delivery route"
              >
                <span>Follow Pip’s route</span>
                <Compass size={15} />
              </a>
            </div>
          </div>

          <div className="scene-visual visual-delivery">
            {/* Illustrated Midnight Village Rooftops */}
            <div className="scene-village-stage" aria-hidden="true">
              <div className="village-sky-glow"></div>

              {/* Crescent Moon in Sky */}
              <div className="story-crescent-moon">🌙</div>

              {/* Silhouetted Rooftops with Sleepy Windows */}
              <div className="story-rooftops-row">
                <div className="story-roof roof-1">
                  <div className="roof-triangle"></div>
                  <div className="roof-window lit"></div>
                </div>
                <div className="story-roof roof-2">
                  <div className="roof-triangle"></div>
                  <div className="roof-window lit"></div>
                </div>
                <div className="story-roof roof-3">
                  <div className="roof-triangle"></div>
                  <div className="roof-window lit"></div>
                </div>
              </div>

              {/* Glowing Curved Route Arch */}
              <svg className="story-flight-path-svg" viewBox="0 0 300 120" preserveAspectRatio="none">
                <path
                  d="M 20 100 Q 150 20, 280 90"
                  fill="none"
                  stroke="#f4d58d"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  filter="drop-shadow(0 0 6px #f4d58d)"
                />
              </svg>

              {/* Pip Airborne with Lantern */}
              <div className="airborne-pip-figure">
                <img
                  src={portraitImg}
                  alt="Pip floating over the rooftops delivering peaceful dreams"
                  className="airborne-pip-img"
                />
                <span className="airborne-lantern-glow"></span>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Storybook Footer Note */}
      <div className="story-colophon-note">
        <Sparkles size={14} className="colophon-sparkle" />
        <span>“And so the Midnight Nursery found its sleepy guardian.”</span>
      </div>
    </section>
  );
}

export default OriginStory;
