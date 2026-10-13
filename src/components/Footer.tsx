import { motion } from 'motion/react';
import { competencies, links } from '../data/cards';

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.8 }}
    >
      <div className="footer-row">
        <div className="chips">
          <span className="chips-label">DESIRED ROLES:</span>
          {competencies.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
        <nav className="footer-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label.toUpperCase()} ↗
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-row footer-bottom">
        <span>● AVAILABLE FOR HIRING</span>
        <span>© Vitor A. Souza — All Rights Reserved</span>
      </div>
    </motion.footer>
  );
}