import { motion } from 'motion/react';
import { Link, NavLink } from 'react-router-dom';
import { useT } from '../i18n/translations.ts';
import type { Lang } from '../types/Index';

interface HeaderProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LANGS: Lang[] = ['PTBR', 'EN'];

const NAV = [
  { to: '/about', key: 'about' },
  { to: '/projects', key: 'projects' },
  { to: '/experience', key: 'experience' },
  { to: '/curriculum', key: 'cv' },
  { to: '/contact', key: 'contact' },
] as const;

export default function Header({ lang, setLang }: HeaderProps) {
  const t = useT();

  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="logo-link">
        <h1 className="logo">VITOR A. SOUZA</h1>
        <p className="logo-sub">{t.header.tagline}</p>
      </Link>

      <nav className="nav">
        {NAV.map((n) => (<NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>{t.header.nav[n.key]}</NavLink>))}
      </nav>

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
          aria-label={t.header.profile}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          👤
        </motion.button>
      </div>
    </motion.header>
  );
}