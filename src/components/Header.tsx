import { motion } from 'motion/react';
import { Link, NavLink } from 'react-router-dom';
import type { Lang } from '../types/Index';

interface HeaderProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LANGS: Lang[] = ['PTBR', 'EN'];

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/curriculum', label: 'CV' },
  { to: '/contact', label: 'Contact' },
];

export default function Header({ lang, setLang }: HeaderProps) {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="logo-link">
        <h1 className="logo">VITOR A. SOUZA</h1>
        <p className="logo-sub">SOFTWARE ENGINEER &amp; CREATIVE DEVELOPER</p>
      </Link>

      <nav className="nav">
        {NAV.map((n) => (<NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>{n.label}</NavLink>))}
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

      </div>
    </motion.header>
  );
}