import React from 'react';
import { Sparkles, Music, Lamp, Compass, ArrowUpRight } from 'lucide-react';
import './Projects.css';
import lullabyImg from '../../assets/pip_lullaby_box.png';
import lanternImg from '../../assets/pip_dream_lantern.png';
import routesImg from '../../assets/pip_portrait.png';

const projects = [
  {
    num: '01',
    title: 'The Lullaby Lab',
    category: 'Audio Engineering',
    icon: Music,
    description:
      'A tiny sound studio where Pip composes soothing wind-down chimes, white-noise music boxes, and bedtime melodies to ease restless thoughts.',
    img: lullabyImg,
    alt: 'Pip’s handcrafted Lullaby Music Box decorated with stars and musical notes',
    bgTone: 'tone-blush',
    badge: 'Audio Prototype',
  },
  {
    num: '02',
    title: 'Nightlight Collection',
    category: 'Lighting Design',
    icon: Lamp,
    description:
      'Handcrafted dream lanterns that radiate gentle golden dreamlight, banishing closet shadows and warming cold nursery corners.',
    img: lanternImg,
    alt: 'Pip’s glowing dream lantern with warm amber candlelight',
    bgTone: 'tone-dream',
    badge: 'Physical Artifact',
  },
  {
    num: '03',
    title: 'Dream Delivery Routes',
    category: 'Bedtime Cartography',
    icon: Compass,
    description:
      'A whimsical celestial route map documenting Pip’s nightly airborne paths across the neighborhood delivering sweet dreams before dawn.',
    img: routesImg,
    alt: 'Illustration of Pip charting nocturnal flight coordinates across the stars',
    bgTone: 'tone-cream',
    badge: 'Route Engine',
  },
];

function Projects() {
  return (
    <section className="projects-section" id="projects" aria-label="Showcase Projects">
      {/* Full-width Section Header */}
      <div className="section-header">
        <div className="eyebrow-badge">
          <Sparkles size={13} />
          <span>MIDNIGHT WORKSHOP CATALOGUE</span>
        </div>
        <h2 className="section-title">Showcase Projects</h2>
        <p className="section-subtitle">
          Explore three of Pip’s signature bedtime inventions. Each project is currently
          undergoing sleepy quality testing in the Midnight Nursery.
        </p>
      </div>

      {/* Balanced 3-Column Grid */}
      <div className="project-grid">
        {projects.map((project) => {
          const IconComponent = project.icon;
          return (
            <article
              key={project.num}
              className="project-card"
              tabIndex={0}
              aria-label={`${project.title} — ${project.category}`}
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
                  <span className="preview-badge">{project.badge}</span>
                  <span className="preview-action" aria-hidden="true">
                    <span>Inspect</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
