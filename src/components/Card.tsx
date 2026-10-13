// `motion` is the factory for animatable elements: motion.div, motion.article, motion.button...
// They behave like the normal HTML tags but accept animation props (initial, animate, whileHover...).
import { motion } from 'motion/react';
import type { CardData } from '../types/Index';

// Vite turns an imported image into a URL string at build time.
// Put your card-back image at src/assets/card-back.png (or change the file name/extension here).
import cardBack from '../assets/card-back.png';

/* ------------------------------------------------------------------ */
/* Layout constants – tweak these to change the look of the fan        */
/* ------------------------------------------------------------------ */
const TILT = 60;        // degrees the side cards are rotated around the Y axis
const NEAR_WING_X = 300; // px from the center to the first card on each side
const STEP_X = 36;       // extra px for every card further out (creates the stacked "slivers")
const DEPTH_STEP = 60;   // px each card goes further back (translateZ) per step
const SCALE_STEP = 0.05; // how much smaller each card gets per step

// `interface` describes the SHAPE of an object. TypeScript checks it at compile time only,
// it generates no JavaScript.
interface CardPose {
  x: number;
  z: number;
  rotateY: number;
  scale: number;
  opacity: number;
}

interface CardProps {
  card: CardData;
  offset: number; // 0 = center, negative = left, positive = right
  onOpen: () => void; // called when the button of the CENTER card is clicked
  onSelect: () => void; // `() => void` = a function that takes no arguments and returns nothing
}

// Pure function that turns "how far from the center am I?" into a 3D pose.
// The `: CardPose` after the parameter list is the RETURN TYPE: TS will complain
// if we forget a property or return the wrong type.
function getCardPose(offset: number): CardPose {
  const distance = Math.abs(offset);   // how many slots from the center
  const side = Math.sign(offset);      // -1 (left), 0 (center) or 1 (right)

  // Center card: flat, front facing the viewer.
  if (distance === 0) {
    return { x: 0, z: 0, rotateY: 0, scale: 1, opacity: 1 };
  }

  // Horizontal position: first wing sits next to the center card,
  // the others are only shifted a little so they peek out from behind it.
  const x = side * (NEAR_WING_X + (distance - 1) * STEP_X);

  // rotateY decides which FACE is visible:
  //  - left cards:  +TILT       -> front face, outer edge comes toward the viewer
  //  - right cards: 180 - TILT  -> flipped over, so the BACK face is visible,
  //                                with the same "open book" tilt mirrored
  const rotateY = side < 0 ? TILT : 180 - TILT;

  return {
    x,
    z: -distance * DEPTH_STEP,
    rotateY,
    scale: 1 - distance * SCALE_STEP,
    // Fade out only the far cards so the stack at the sides stays solid white
    opacity: distance > 3 ? 0 : 1 - Math.max(0, distance - 2) * 0.4,
  };
}

export default function Card({ card, offset, onSelect, onOpen }: CardProps) {
  const isActive = offset === 0;
  const pose = getCardPose(offset);

  return (
    // The <article> only moves/rotates in 3D. It has two children (front + back faces).
    // IMPORTANT: no `opacity` here – opacity < 1 flattens `preserve-3d` and would break the flip,
    // so opacity is animated on the faces instead.
    <motion.article
      className={`card ${isActive ? 'card-active' : ''}`}
      // `initial` = values on first render. Only `y` is set, so x, z, rotateY and scale
      // start from their defaults (0 / 0 / 0 / 1) and animate to `animate` on mount:
      // the cards "fly out" of the center and the right ones flip over.
      initial={{ y: 60 }}
      // `animate` = target values. Whenever they change (because `offset` changed),
      // Motion animates from the current values to the new ones automatically.
      // Shorthands like x/z/rotateY/scale are combined into one CSS `transform` for you.
      animate={{
        x: pose.x,
        y: 0,
        z: pose.z,
        rotateY: pose.rotateY,
        scale: pose.scale,
      }}
      // `type: 'spring'` simulates physics instead of a fixed duration:
      // higher stiffness = snappier, lower damping = bouncier, higher mass = heavier.
      transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 0.9 }}
      // `whileHover` applies while the pointer is over the element, then animates back.
      // Passing `undefined` disables it for the center card.
      whileHover={!isActive ? { scale: pose.scale + 0.03 } : undefined}
      // `style` accepts the usual CSS plus Motion values. zIndex/pointerEvents are static here.
      style={{
        zIndex: 10 - Math.abs(offset),
        pointerEvents: pose.opacity === 0 ? 'none' : 'auto',
      }}
      onClick={() => !isActive && onSelect()}
    >
      {/* ---------------- FRONT FACE (center + left cards) ---------------- */}
      <motion.div
        className="card-face card-front"
        // Each face animates its own opacity (see the note on the <article>).
        initial={{ opacity: 0 }}
        animate={{ opacity: pose.opacity }}
      >
        <div className="card-top">
          <span className="card-tag">
            {isActive && <i className="dot" />} {card.tag}
          </span>
        </div>

        <div className="card-body">
          <h2 className="card-title">{card.title}</h2>
          {/* `card.subtitle &&` works because `subtitle?` is optional in CardData:
              its type is `string | undefined`, so we must check it before using it. */}
          {card.subtitle && <p className="card-subtitle">{card.subtitle.toUpperCase()}</p>}
          <p className="card-desc">{card.description}</p>
          {card.code && <code className="card-code">{card.code}</code>}
        </div>

        <div className="card-footer">
          <div>
            {card.footerLabel && <small>{card.footerLabel.toUpperCase()}</small>}
            {card.footerValue && <strong>{card.footerValue}</strong>}
          </div>
          {/* whileTap = while the button is being pressed */}
          <motion.button
            className="card-btn"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
          >
            {card.action} ↓
          </motion.button>
        </div>

        {/* Dark gradient toward the inner edge (right side) to give depth to the left wings.
            It fades out on the center card. */}
        <motion.div
          className="card-shade shade-front"
          initial={false} // `false` = skip the entry animation, start directly at `animate`
          animate={{ opacity: isActive ? 0 : 1 }}
        />
      </motion.div>

      {/* ---------------- BACK FACE (right cards) ---------------- */}
      <motion.div
        className="card-face card-back"
        initial={{ opacity: 0 }}
        animate={{ opacity: pose.opacity }}
        // Inline style is used because the image URL comes from a JS import
        style={{ backgroundImage: `url(${cardBack})` }}
      >
        {/* Same shade, but on the inner edge of the right wings (left side) */}
        <motion.div
          className="card-shade shade-back"
          initial={false}
          animate={{ opacity: isActive ? 0 : 1 }}
        />
      </motion.div>
    </motion.article>
  );
}