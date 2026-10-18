import React, { useState } from 'react';
import { Sparkles, Music, Lamp, Compass, ArrowDown, ExternalLink } from 'lucide-react';
import './Projects.css';
import lullabyImg from '../../assets/pip_lullaby_box.png';
import lanternImg from '../../assets/pip_dream_lantern.png';
import routesImg from '../../assets/pip_portrait.png';

import LullabyLab from './LullabyLab.jsx';
import NightlightCollection from './NightlightCollection.jsx';
import DreamDeliveryRoutes from './DreamDeliveryRoutes.jsx';

const PROJECT_CARDS = [
  {
    id: 'lullaby',
    num: '01',
    title: 'The Lullaby Lab',
    category: 'Audio Engineering',
    icon: Music,
    description:
      'A tiny sound studio where Pip composes soothing wind-down chimes, white-noise music boxes, and bedtime melodies to ease restless thoughts.',
    img: lullabyImg,
    alt: 'Pip’s handcrafted Lullaby Music Box decorated with stars and musical notes',
    bgTone: 'tone-blush',
    badge: 'Interactive Audio',
    actionLabel: 'Launch Music Box',
  },
  {
    id: 'nightlight',
    num: '02',
    title: 'Nightlight Collection',
    category: 'Lighting Design',
    icon: Lamp,
    description:
      'Handcrafted dream lanterns that radiate gentle golden dreamlight, banishing closet shadows and warming cold nursery corners.',
    img: lanternImg,
    alt: 'Pip’s glowing dream lantern with warm amber candlelight',
    bgTone: 'tone-dream',
    badge: 'Ambient Gallery',
    actionLabel: 'Test Nightlights',
  },
  {
    id: 'routes',
    num: '03',
    title: 'Dream Delivery Routes',
    category: 'Bedtime Cartography',
    icon: Compass,
    description:
      'A whimsical celestial route map documenting Pip’s nightly airborne paths across the neighborhood delivering sweet dreams before dawn.',
    img: routesImg,
    alt: 'Illustration of Pip charting nocturnal flight coordinates across the stars',
    bgTone: 'tone-cream',
    badge: 'Illustrated Map',
    actionLabel: 'Navigate Routes',
  },
];

function Projects({ soundEnabled, onToggleSound }) {
  const [activeProjectId, setActiveProjectId] = useState('lullaby');

  const handleCardClick = (id) => {
    setActiveProjectId(id);
    const workbenchEl = document.getElementById('project-workbench');
    if (workbenchEl) {
      workbenchEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section className="projects-section" id="projects" aria-label="Showcase Projects and Interactive Workshops">
      {/* Full-width Section Header */}
      <div className="section-header">
        <div className="eyebrow-badge">
          <Sparkles size={13} />
          <span>MIDNIGHT WORKSHOP CATALOGUE</span>
        </div>
        <h2 className="section-title">Showcase Projects</h2>
        <p className="section-subtitle">
          Explore Pip’s three signature bedtime inventions. Select any project card below to launch
          its live interactive testing workbench.
        </p>
      </div>

      {/* Balanced 3-Column Grid of Project Cards */}
      <div className="project-grid">
        {PROJECT_CARDS.map((project) => {
          const IconComponent = project.icon;
          const isActive = activeProjectId === project.id;

          return (
            <article
              key={project.id}
              className={`project-card ${isActive ? 'active-workshop-card' : ''}`}
              tabIndex={0}
              onClick={() => handleCardClick(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(project.id);
                }
              }}
              role="button"
              aria-pressed={isActive}
              aria-label={`${project.title} — ${project.category}. Click to open interactive workbench.`}
            >
              {/* Card Window Topbar */}
              <div className="card-topbar">
                <div className="window-dots" aria-hidden="true">
                  <span className="window-dot dot-red"></span>
                  <span className="window-dot dot-amber"></span>
                  <span className="window-dot dot-green"></span>
                </div>
                <div className="card-meta">
                  <span className="card-num">{project.num}</span>
                  <span className="card-sep">//</span>
                  <span className="card-category">{project.category}</span>
                </div>
              </div>

              {/* Generous Well-Proportioned Image Stage */}
              <div className={`card-image-stage ${project.bgTone}`}>
                <div className="stage-halo" aria-hidden="true"></div>
                <img
                  src={project.img}
                  alt={project.alt}
                  className="project-img"
                  loading="lazy"
                />
              </div>

              {/* Card Content & Details */}
              <div className="card-body">
                <div className="card-title-row">
                  <h3 className="card-title">{project.title}</h3>
                  <div className="card-icon-pill" aria-hidden="true">
                    <IconComponent size={16} />
                  </div>
                </div>

                <p className="card-desc">{project.description}</p>

                <div className="card-footer">
                  <span className={`preview-badge ${isActive ? 'active-badge' : ''}`}>
                    {isActive ? '✦ Active Workbench' : project.badge}
                  </span>
                  <span className="card-action-trigger" aria-hidden="true">
                    <span>{isActive ? 'Open Below' : project.actionLabel}</span>
                    <ArrowDown size={14} className={isActive ? 'bounce-arrow' : ''} />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Dedicated Interactive Testing Workbench */}
      <div className="workbench-anchor-wrapper" id="project-workbench">
        {/* Whimsical Workbench Tab Switcher Bar */}
        <div className="workbench-tab-bar" role="tablist" aria-label="Interactive Project Workbenches">
          <span className="workbench-label">ACTIVE WORKBENCH:</span>
          <div className="workbench-tab-buttons">
            {PROJECT_CARDS.map((proj) => {
              const Icon = proj.icon;
              const isCurrent = activeProjectId === proj.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  className={`workbench-tab-btn ${isCurrent ? 'selected' : ''}`}
                  onClick={() => setActiveProjectId(proj.id)}
                >
                  <Icon size={15} />
                  <span>{proj.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Active Workshop Component */}
        <div className="workbench-stage" role="tabpanel">
          {activeProjectId === 'lullaby' && (
            <LullabyLab
              isActive={activeProjectId === 'lullaby'}
              soundEnabled={soundEnabled}
              onToggleSound={onToggleSound}
            />
          )}
          {activeProjectId === 'nightlight' && <NightlightCollection isActive={activeProjectId === 'nightlight'} />}
          {activeProjectId === 'routes' && <DreamDeliveryRoutes isActive={activeProjectId === 'routes'} />}
        </div>
      </div>
    </section>
  );
}

export default Projects;
