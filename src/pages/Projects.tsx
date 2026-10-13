import { Link } from 'react-router-dom';

export default function Projects() {
  return (
    <section className="page">
      <Link to="/" className="back-link">← BACK</Link>
      <h2 className="page-title">Projects</h2>
      <p className="page-text">Your projects go here.</p>
    </section>
  );
}
