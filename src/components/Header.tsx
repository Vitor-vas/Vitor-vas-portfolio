import { motion } from 'motion/react';
import type { Lang } from '../types/Index';

interface HeaderProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LANGS: Lang[] = ['PTBR', 'EN'];

export default function Header({ lang, setLang }: HeaderProps) {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h1 className="logo">VITOR A. SOUZA</h1>
        <p className="logo-sub">ARCHITECT &amp; CREATIVE TECHNOLOGIST</p>
      </div>

      <div className="header-right">
        <div className="lang">
          {LANGS.map((l, i) => (
            <span key={l}>
              {i > 0 && <span className="lang-sep">|</span>}
              <button
                className={lang === l ? 'lang-btn active' : 'lang-btn'}
                onClick={() => setLang(l)}
              >
                {l}
              </button>
            </span>
          ))}
        </div>
        <motion.button
          className="avatar-btn"
          aria-label="Profile"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          👤
        </motion.button>
      </div>
    </motion.header>
  );
}