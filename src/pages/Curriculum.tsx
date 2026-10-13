import { Link } from 'react-router-dom';

export default function Curriculum() {
  return (
    <section className="page">
      <Link to="/" className="back-link">← BACK</Link>
      <h2 className="page-title">Curriculum Vitae</h2>
      <p className="page-text">Your CV goes here.</p>
    </section>
  );
}
