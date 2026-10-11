import type { Lang } from '../types/Index';

interface HeaderProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LANGS: Lang[] = ['PTBR', 'EN'];

export default function Header({ lang, setLang }: HeaderProps) {
  return (
    <header className="header">
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
        <button className="avatar-btn" aria-label="Profile">👤</button>
      </div>
    </header>
  );
}