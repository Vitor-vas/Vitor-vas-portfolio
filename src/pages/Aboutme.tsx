import { useRef } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import '../styles/aboutme.css';

// Edit your texts here
const ABOUT = {
  tag: '01 // PROFILE',
  title: 'About me',
  subtitle: 'Software Engineer & Full-Stack',
  paragraphs: [
    "I'm Vitor A. Souza, a Software Engineering student at PUC Minas (5th semester) based in Belo Horizonte, Brazil. I build resilient web architectures, distributed systems and tactile human interfaces.",
    "I enjoy full-stack work, from modelling data in PostgreSQL to polishing the details of a UI animation. I'm open to internships, technical collaborations and research.",
  ],
  stack: ['React', 'TypeScript', 'Java', 'Python', 'PostgreSQL'],
  footerLabel: 'Institution',
  footerValue: 'PUC Minas • 5th Sem',
};

export default function Aboutme() {
  // The card can only be dragged inside this container
  const stageRef = useRef<HTMLDivElement>(null);

  // Motion values hold the card position without re-rendering React on every frame
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Tilt the card a little depending on how far it is from the center
  const rotate = useTransform(x, [-400, 0, 400], [-8, 0, 8]);

  // Double-click: spring back to the center
  const recenter = () => {
    const spring = { type: 'spring', stiffness: 160, damping: 18 } as const;
    animate(x, 0, spring);
    animate(y, 0, spring);
  };

  return (
    <section className="about-stage" ref={stageRef}>
      <motion.article
        className="about-card"
        style={{ x, y, rotate }}
        drag
        dragConstraints={stageRef}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 22 }}
        whileDrag={{ scale: 1.04, boxShadow: '0 40px 90px rgba(0,0,0,.55)' }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        onDoubleClick={recenter}
      >
        <div className="about-top">
          <span className="about-tag">
            <i className="dot" /> {ABOUT.tag}
          </span>
        </div>

        <div className="about-body">
          <h2 className="about-title">{ABOUT.title}</h2>
          <p className="about-subtitle">{ABOUT.subtitle.toUpperCase()}</p>

          {ABOUT.paragraphs.map((text) => (
            <p key={text} className="about-text">{text}</p>
          ))}

          <ul className="about-stack">
            {ABOUT.stack.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="about-footer">
          <div>
            <small>{ABOUT.footerLabel.toUpperCase()}</small>
            <strong>{ABOUT.footerValue}</strong>
          </div>
          <span className="about-hint">⠿ DRAG ME · DOUBLE-CLICK TO RESET</span>
        </div>
      </motion.article>
    </section>
  );
}