import { motion } from 'motion/react';
import type { CardData } from '../types/Index';

interface CardProps {
  card: CardData;
  offset: number; // 0 = centro, negativo = esquerda, positivo = direita
  onSelect: () => void;
}

export default function Card({ card, offset, onSelect }: CardProps) {
  const isActive = offset === 0;
  const distance = Math.abs(offset);
  const baseScale = 1 - distance * 0.06;
  const hidden = distance > 3;

  return (
    <motion.article
      className={`card ${isActive ? 'card-active' : ''}`}
      // entrada: sobe e aparece
      initial={{ opacity: 0, y: 60 }}
      animate={{
        x: `${offset * 70}%`,
        y: 0,
        z: -distance * 80,
        rotateY: offset * -18,
        scale: baseScale,
        opacity: hidden ? 0 : 1 - distance * 0.18,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.9 }}
      // cards laterais "respondem" ao hover
      whileHover={!isActive ? { scale: baseScale + 0.03 } : undefined}
      style={{ zIndex: 10 - distance, pointerEvents: hidden ? 'none' : 'auto' }}
      onClick={() => !isActive && onSelect()}
    >
      <div className="card-top">
        <span className="card-tag">
          {isActive && <i className="dot" />} {card.tag}
        </span>
      </div>

      <div className="card-body">
        <h2 className="card-title">{card.title}</h2>
        {card.subtitle && <p className="card-subtitle">{card.subtitle.toUpperCase()}</p>}
        <p className="card-desc">{card.description}</p>
        {card.code && <code className="card-code">{card.code}</code>}
      </div>

      <div className="card-footer">
        <div>
          {card.footerLabel && <small>{card.footerLabel.toUpperCase()}</small>}
          {card.footerValue && <strong>{card.footerValue}</strong>}
        </div>
        <motion.button
          className="card-btn"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          {card.action} ↓
        </motion.button>
      </div>
    </motion.article>
  );
}