import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import Header from './components/Header.tsx';
import StatusBar from './components/Statusbar.tsx';
import CardCarousel from './components/Cardcarousel.tsx';
import CarouselControls from './components/Carouselcontrols.tsx';
import Footer from './components/Footer.tsx';
import { cards } from './data/cards.ts';
import type { Lang } from './types/Index.ts';
import './styles/index.css';

export default function App() {
  const [lang, setLang] = useState<Lang>('EN');
  const [active, setActive] = useState(0);
 
  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
      <Header lang={lang} setLang={setLang} />
      <StatusBar />
      <CardCarousel cards={cards} active={active} setActive={setActive} />
      <CarouselControls total={cards.length} active={active} setActive={setActive} />
      <Footer />
      </div>
    </MotionConfig>
  );
}
