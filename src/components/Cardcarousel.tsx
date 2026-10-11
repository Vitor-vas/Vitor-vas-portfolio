import { useRef } from 'react';
import type { PointerEvent } from 'react';
import Card from './Card';
import type { CardData, SetNumber } from '../types/Index';

interface CardCarouselProps {
  cards: CardData[];
  active: number;
  setActive: SetNumber;
}

export default function CardCarousel({ cards, active, setActive }: CardCarouselProps) {
  const startX = useRef<number | null>(null);

  const go = (dir: number) =>
    setActive((i) => Math.min(cards.length - 1, Math.max(0, i + dir)));

  // Arrastar com mouse/touch
  const onDown = (e: PointerEvent<HTMLElement>) => {
    startX.current = e.clientX;
  };
  const onUp = (e: PointerEvent<HTMLElement>) => {
    if (startX.current === null) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 50) go(diff < 0 ? 1 : -1);
    startX.current = null;
  };

  return (
    <section className="carousel" onPointerDown={onDown} onPointerUp={onUp}>
      <div className="carousel-stage">
        {cards.map((card, i) => (
          <Card
            key={card.id}
            card={card}
            offset={i - active}
            onSelect={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}