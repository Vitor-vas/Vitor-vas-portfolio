import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo, type Variants } from 'motion/react';

import CarouselControls from '../components/Carouselcontrols.tsx';
import { projects } from '../data/projects.ts';
import type { Project } from '../types/Index.ts';
import '../styles/projects.css';

/* ------------------------------------------------------------------ */
/* Layout constants (keep FAN_W / FAN_H in sync with projects.css)     */
/* ------------------------------------------------------------------ */
const FAN_W = 280;
const FAN_H = 420;
const PIVOT_DISTANCE = 700;                // px below the card where the fan "hinge" sits
const ORIGIN_Y = `${FAN_H / 2 + PIVOT_DISTANCE}px`; // px (not %), so it doesn't change when the card is resized
const FAN_Y = 140;                         // px the fan sits below the center of the stage
const STEP = 16;                           // degrees between neighbouring cards
const VISIBLE = 2;                         // how many cards are visible on each side of the center

const SELECTED_MAX_W = 680;                // selected card (landscape, image on the right)
const SELECTED_H = 380;
const SELECTED_H_COMPACT = 520;            // on small screens the image goes on top of the text

const SWIPE_THRESHOLD = 60;                // px
const VELOCITY_THRESHOLD = 400;            // px/s

// Cards get bluer the further they are from the center
const SHADES = ['#ffffff', '#dfe4ff', '#bfc9ff', '#a9b6ff'];
const shadeFor = (offset: number) => SHADES[Math.min(SHADES.length - 1, Math.abs(offset))];
const clamp = (n: number, max: number) => Math.max(-max, Math.min(max, n));

type CardState = 'fan' | 'selected' | 'hidden';

interface SelectedSize {
  w: number;
  h: number;
}

// `custom` = offset of the card from the active one (negative = left, positive = right).
// Every card pivots around a point below it, so changing `rotate` opens the fan.
function makeVariants(sel: SelectedSize): Variants {
  return {
    fan: (offset: number) => ({
      opacity: Math.abs(offset) > VISIBLE ? 0 : 1,
      rotate: clamp(offset, VISIBLE + 1) * STEP,
      y: FAN_Y,
      scale: 1,
      width: FAN_W,
      height: FAN_H,
      marginLeft: -FAN_W / 2,
      marginTop: -FAN_H / 2,
      backgroundColor: shadeFor(offset),
      transition: { type: 'spring', stiffness: 110, damping: 18 },
    }),
    // The chosen card turns into a landscape card in the center of the stage
    selected: {
      opacity: 1,
      rotate: 0,
      y: 0,
      scale: 1,
      width: sel.w,
      height: sel.h,
      marginLeft: -sel.w / 2,
      marginTop: -sel.h / 2,
      backgroundColor: '#ffffff',
      transition: { type: 'spring', stiffness: 130, damping: 22 },
    },
    hidden: (offset: number) => ({
      opacity: 0,
      rotate: clamp(offset, VISIBLE + 1) * STEP * 1.4,
      y: FAN_Y + 80,
      scale: 0.9,
      transition: { duration: 0.35 },
    }),
  };
}

function useViewportWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}

interface ProjectCardProps {
  project: Project;
  offset: number;
  state: CardState;
  variants: Variants;
  selected: SelectedSize;
  compact: boolean;
  onClick: () => void;
  onClose: () => void;
}

function ProjectCard({ project, offset, state, variants, selected, compact, onClick, onClose }: ProjectCardProps) {
  const isSelected = state === 'selected';
  const visible = Math.abs(offset) <= VISIBLE;
  // Cards on the right are covered on their left side by the center card,
  // so their text sticks to the right (and vice versa) to stay readable.
  const side = offset === 0 ? 'center' : offset < 0 ? 'left' : 'right';

  return (
    <motion.article
      className={`proj-card${isSelected ? ' is-selected' : ''}`}
      custom={offset}
      variants={variants}
      initial={{ opacity: 0, y: FAN_Y + 160, rotate: 0, scale: 0.9, backgroundColor: shadeFor(offset) }}
      animate={state}
      whileHover={state === 'fan' && visible ? { y: FAN_Y - 24 } : undefined}
      style={{
        originX: 0.5,
        originY: ORIGIN_Y,
        zIndex: isSelected ? 30 : Math.max(0, 10 - Math.abs(offset)),
        pointerEvents: state === 'hidden' || !visible ? 'none' : 'auto',
      }}
      role={isSelected ? undefined : 'button'}
      tabIndex={state === 'fan' && visible ? 0 : -1}
      aria-hidden={state === 'hidden' || !visible}
      aria-label={isSelected ? undefined : `${offset === 0 ? 'Open' : 'Show'} ${project.title}`}
      onClick={(e) => {
        e.stopPropagation(); // don't trigger the stage "click outside to close"
        onClick();
      }}
      onKeyDown={(e) => {
        if (state === 'fan' && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* ---------- Layer 1: portrait card used by the carousel ---------- */}
      <motion.div
        className={`proj-layer proj-fan side-${side}`}
        initial={false}
        animate={{ opacity: isSelected ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="proj-top">
          <span className="proj-tag">
            <i className="dot" /> {project.tag}
          </span>
        </div>
        <div className="proj-body">
          <h2 className="proj-title">{project.title}</h2>
          <p className="proj-subtitle">{project.subtitle.toUpperCase()}</p>
        </div>
        <div className="proj-footer">{project.stack.slice(0, 3).join(' · ')}</div>
      </motion.div>

      {/* ---------- Layer 2: landscape card (text left, image right) ---------- */}
      <motion.div
        className={`proj-layer proj-sel${compact ? ' compact' : ''}`}
        style={{ width: selected.w, height: selected.h, pointerEvents: isSelected ? 'auto' : 'none' }}
        initial={false}
        animate={{ opacity: isSelected ? 1 : 0 }}
        // wait for the card to grow before the content appears
        transition={{ duration: 0.3, delay: isSelected ? 0.3 : 0 }}
      >
        <div className="proj-sel-text">
          <div className="proj-top">
            <span className="proj-tag">
              <i className="dot" /> {project.tag}
            </span>
            <button className="proj-close" onClick={onClose} aria-label="Close project" tabIndex={isSelected ? 0 : -1}>
              ✕
            </button>
          </div>

          <h2 className="proj-title">{project.title}</h2>
          <p className="proj-subtitle">{project.subtitle.toUpperCase()}</p>
          <p className="proj-desc">{project.description}</p>

          <ul className="proj-stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="proj-links">
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" tabIndex={isSelected ? 0 : -1}>REPO ↗</a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" tabIndex={isSelected ? 0 : -1}>LIVE DEMO ↗</a>
            )}
          </div>
        </div>

        {/* Image slot: shows project.image, or a placeholder until you add one */}
        <div className="proj-image">
          {project.image ? (
            <img src={project.image} alt={`${project.title} preview`} draggable={false} />
          ) : (
            <span>IMAGE</span>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  // After a swipe the browser still fires a "click"; this flag lets us ignore it
  const swiped = useRef(false);

  const total = projects.length;
  const viewport = useViewportWidth();
  const compact = viewport < 640;
  const selected: SelectedSize = {
    w: Math.min(SELECTED_MAX_W, viewport - 32),
    h: compact ? SELECTED_H_COMPACT : SELECTED_H,
  };
  const variants = makeVariants(selected);

  const go = (dir: number) => setActive((i) => Math.min(total - 1, Math.max(0, i + dir)));
  const close = () => setOpen(false);

  // Keyboard: ← → move the carousel, Esc closes the open project
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) {
        if (e.key === 'Escape') setOpen(false);
        return;
      }
      if (e.key === 'ArrowLeft') setActive((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setActive((i) => Math.min(total - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, total]);

  // Swipe / drag on the stage moves the carousel (the stage itself doesn't move)
  const onPanEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (open) return;
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > 10) {
      swiped.current = true;
      setTimeout(() => (swiped.current = false), 50);
    }
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) go(1);
    else if (offset.x > SWIPE_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) go(-1);
  };

  const handleCardClick = (index: number) => {
    if (swiped.current || open) return;
    if (index === active) setOpen(true); // center card -> open it
    else setActive(index);               // side card -> bring it to the center
  };

  return (
    // Clicking the empty stage while a project is open brings the carousel back
    <motion.section className="projects-stage" onPanEnd={onPanEnd} onClick={open ? close : undefined}>
      {/* Carousel controls (hidden while a project is open) */}
      <motion.div
        className="projects-controls"
        animate={{ opacity: open ? 0 : 1 }}
        style={{ pointerEvents: open ? 'none' : 'auto' }}
      >
        <CarouselControls total={total} active={active} setActive={setActive} />
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.p
            className="projects-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ESC OR CLICK OUTSIDE TO GO BACK
          </motion.p>
        )}
      </AnimatePresence>

      {projects.map((project, i) => {
        const state: CardState = !open ? 'fan' : i === active ? 'selected' : 'hidden';

        return (
          <ProjectCard
            key={project.id}
            project={project}
            offset={i - active}
            state={state}
            variants={variants}
            selected={selected}
            compact={compact}
            onClick={() => handleCardClick(i)}
            onClose={close}
          />
        );
      })}
    </motion.section>
  );
}