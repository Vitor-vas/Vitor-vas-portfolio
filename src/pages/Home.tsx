import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CardCarousel from '../components/Cardcarousel.tsx';
import CarouselControls from '../components/Carouselcontrols.tsx';
import { cards } from '../data/cards.ts';

export default function Home() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <CardCarousel
        cards={cards}
        active={active}
        setActive={setActive}
        // Each card carries its own `path` (see data/cards.ts)
        onOpen={(card) => navigate(card.path)}
      />
      <CarouselControls total={cards.length} active={active} setActive={setActive} />
    </>
  );
}
