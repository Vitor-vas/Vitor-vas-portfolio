import { motion } from 'motion/react';
import type { PanInfo } from 'motion/react';
import Card from './Card';
import type { CardData, SetNumber } from '../types/Index';

interface CardCarouselProps {
  cards: CardData[];
  active: number;
  setActive: SetNumber;
}

const SWIPE_THRESHOLD = 60; // px
const VELOCITY_THRESHOLD = 400; // px/s

export default function CardCarousel({ cards, active, setActive }: CardCarouselProps) {
  const go = (dir: number) =>
    setActive((i) => Math.min(cards.length - 1, Math.max(0, i + dir)));

  // Arrastar: decide pela distância OU pela velocidade do gesto
  const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) go(1);
    else if (offset.x > SWIPE_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) go(-1);
  };

  return (
    <section className="carousel">
      <motion.div
        className="carousel-stage"
        drag="x"
        dragSnapToOrigin // o palco volta ao lugar; só o índice muda
        dragElastic={0.15}
        onDragEnd={onDragEnd}
      >
        {cards.map((card, i) => (
          <Card
            key={card.id}
            card={card}
            offset={i - active}
            onSelect={() => setActive(i)}
          />
        ))}
      </motion.div>
    </section>
  );
}