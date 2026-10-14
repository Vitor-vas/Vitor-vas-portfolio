import { useRef } from 'react';
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react';

import { useLang } from '../context/Languagecontext.ts';
import type { Lang } from '../types/Index.ts';
import '../styles/aboutme.css';

interface AboutContent {
  tag: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  stack: string[];
  footerLabel: string;
  footerValue: string;
  hint: string;
}

// One entry per language. The key must match the values of the Lang type.
const CONTENT: Record<Lang, AboutContent> = {
  EN: {
    tag: '01 // PROFILE',
    title: 'About me',
    subtitle: 'Software Engineer & Full-Stack',
    paragraphs: [
      "I'm Vitor Augusto de Souza, a Software Engineering student at PUC Minas (2nd semester) based in Belo Horizonte, Brazil. I build resilient web architectures, distributed systems and interfaces based on human interactions (HCI).",
      "I enjoy full-stack work, building systems based on OOP principles and polishing the details of a UI animation. I'm open to internships and freelance jobs, seeking oportunities in such areas.",
    ],
    stack: ['React', 'TypeScript', 'Java', 'Python'],
    footerLabel: 'Institution',
    footerValue: 'PUC Minas • 2nd Sem',
    hint: '⠿ DRAG ME · DOUBLE-CLICK TO RESET',
  },
  PTBR: {
    tag: '01 // PERFIL',
    title: 'Sobre mim',
    subtitle: 'Engenheiro de Software & Full-Stack',
    paragraphs: [
      'Sou Vitor Augusto de Souza, estudante de Engenharia de Software na PUC Minas (2º semestre) residente em Belo Horizonte, Brasil. Desenvolvo arquiteturas web resilientes, sistemas distribuídos e interfaces baseadas em interação humano-computador (IHC).',
      'Gosto de trabalho full-stack, da construção de sistemas baseados nas regras de POO e do refinamento dos detalhes de animações de UI. Estou aberto a oportunidades de estágio e trabalhos como freelancer. Procurando oportunidades nessas áreas',
    ],
    stack: ['React', 'TypeScript', 'Java', 'Python'],
    footerLabel: 'Instituição',
    footerValue: 'PUC Minas • 2º Sem',
    hint: '⠿ ARRASTE · CLIQUE DUAS VEZES PARA RESETAR',
  },
};

export default function Aboutme() {
  // Current language, chosen with the buttons in the Header
  const { lang } = useLang();
  const about = CONTENT[lang];

  // The card can only be dragged inside this container
  const stageRef = useRef<HTMLDivElement>(null);

  // Motion values hold the card position without re-rendering React on every frame
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Tilt the card a little depending on how far it is from the center
  const rotate = useTransform(x, [-400, 0, 400], [-8, 0, 8]);

  // Double-click: spring back to the center
  const recenter = () => {
    const spring = { type: 'spring', stiffness: 160, damping: 18 } as const;
    animate(x, 0, spring);
    animate(y, 0, spring);
  };

  return (
    <section className="about-stage" ref={stageRef}>
      <motion.article
        className="about-card"
        style={{ x, y, rotate }}
        drag
        dragConstraints={stageRef}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 22 }}
        whileDrag={{ scale: 1.04, boxShadow: '0 40px 90px rgba(0,0,0,.55)' }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        onDoubleClick={recenter}
      >
        {/* The card itself stays where it is; only its content fades when the language changes.
            `key={lang}` tells AnimatePresence the content is "a different one". */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={lang}
            className="about-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="about-top">
              <span className="about-tag">
                <i className="dot" /> {about.tag}
              </span>
            </div>

            <div className="about-body">
              <h2 className="about-title">{about.title}</h2>
              <p className="about-subtitle">{about.subtitle.toUpperCase()}</p>

              {about.paragraphs.map((text) => (
                <p key={text} className="about-text">{text}</p>
              ))}

              <ul className="about-stack">
                {about.stack.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="about-footer">
              <div>
                <small>{about.footerLabel.toUpperCase()}</small>
                <strong>{about.footerValue}</strong>
              </div>
              <span className="about-hint">{about.hint}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.article>
    </section>
  );
}