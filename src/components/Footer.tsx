import { motion } from 'motion/react';
import { competencies, links } from '../data/cards';
import { useLang } from '../context/Languagecontext.ts';
import { useT } from '../i18n/translations.ts';

export default function Footer() {
  const { lang } = useLang();
  const t = useT();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.8 }}
    >
      <div className="footer-row">
        <div className="chips">
          <span className="chips-label">{t.footer.competencies}</span>
          {competencies[lang].map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
        <nav className="footer-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label.toUpperCase()} ↗
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-row footer-bottom">
        <span>{t.footer.available}</span>
        <span>{t.footer.rights}</span>
      </div>
    </motion.footer>
  );
}