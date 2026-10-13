import { Link } from 'react-router-dom';
import '../styles/Curriculum.css'

export default function Curriculum() {
  return (
    <section className="page curriculum-page">
      <Link to="/" className="back-link">
        ← BACK
      </Link>

      <div className="curriculum-header">
        <div>
          <h2 className="page-title">Curriculum Vitae</h2>
          <p className="page-text">
            My professional experience, education, and skills.
          </p>
        </div>

        <a
          href="/curriculum.pdf"
          download="Vitor-Augusto-CV.pdf"
          className="cv-download"
        >
          ↓ Download CV
        </a>
      </div>

      <div className="cv-viewer">
        <iframe
          src="/curriculum.pdf"
          title="Curriculum Vitae"
          width="100%"
          height="100%"
        />
      </div>
    </section>
  );
}