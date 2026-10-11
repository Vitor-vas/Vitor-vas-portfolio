import type { CSSProperties } from 'react';
import type { CardData } from '../types/Index';

interface CardProps {
  card: CardData;
  offset: number;
  onSelect: () => void;
}

export default function Card({ card, offset, onSelect }: CardProps) {
  const isActive = offset === 0;

  // offset: 0 = centro, negativo = esquerda, positivo = direita
  const style: CSSProperties = {
    transform: `
      translateX(${offset * 70}%)
      translateZ(${-Math.abs(offset) * 80}px)
      rotateY(${offset * -18}deg)
      scale(${1 - Math.abs(offset) * 0.06})
    `,
    opacity: Math.abs(offset) > 3 ? 0 : 1 - Math.abs(offset) * 0.18,
    zIndex: 10 - Math.abs(offset),
    pointerEvents: Math.abs(offset) > 3 ? 'none' : 'auto',
  };

  return (
    <article
      className={`card ${isActive ? 'card-active' : ''}`}
      style={style}
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
        <button className="card-btn">{card.action} ↓</button>
      </div>
    </article>
  );
}