import type { SetNumber } from '../types/Index';

interface CarouselControlsProps {
  total: number;
  active: number;
  setActive: SetNumber;
}

export default function CarouselControls({ total, active, setActive }: CarouselControlsProps) {
  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(total - 1, i + 1));

  return (
    <div className="controls-wrap">
      <div className="controls">
        <button onClick={prev} aria-label="Previous">←</button>
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={i === active ? 'pager active' : 'pager'}
            onClick={() => setActive(i)}
          >
            {String(i).padStart(2, '0')}
          </button>
        ))}
        <button onClick={next} aria-label="Next">→</button>
      </div>
      <p className="hint">DRAG OR CLICK WINGS TO UNFOLD CAROUSEL</p>
    </div>
  );
}