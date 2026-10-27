import { motion } from 'motion/react';
import { useT } from '../i18n/translations.ts';
import type { SetNumber } from '../types/Index';

interface CarouselControlsProps {
  total: number;
  active: number;
  setActive: SetNumber;
}

export default function CarouselControls({ total, active, setActive }: CarouselControlsProps) {
  const t = useT();
  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(total - 1, i + 1));

  return (
    <motion.div
      className="controls-wrap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="controls">
        <motion.button whileTap={{ x: -4 }} onClick={prev} aria-label={t.carousel.previous}>←</motion.button>

        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={i === active ? 'pager active' : 'pager'}
            onClick={() => setActive(i)}
          >
            {String(i).padStart(2, '0')}
            {/* o ponto "desliza" entre os números graças ao layoutId */}
            {i === active && (
              <motion.span
                layoutId="pager-dot"
                className="pager-dot"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}

        <motion.button whileTap={{ x: 4 }} onClick={next} aria-label={t.carousel.next}>→</motion.button>
      </div>
      <p className="hint">{t.carousel.hint}</p>
    </motion.div>
  );
}