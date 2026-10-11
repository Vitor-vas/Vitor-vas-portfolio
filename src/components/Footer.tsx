import { competencies, links } from '../data/cards';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="chips">
          <span className="chips-label">CORE COMPETENCIES:</span>
          {competencies.map((c) => (
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
        <span>● AVAILABLE FOR COMMISSIONS</span>
        <span>© Vitor A. Souza — All Rights Reserved</span>
      </div>
    </footer>
  );
}