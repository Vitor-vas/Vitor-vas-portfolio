import { Link } from 'react-router-dom';

export default function Aboutme() {
  return (
    <section className="page">
      <Link to="/" className="back-link">← BACK</Link>
      <h2 className="page-title">About me</h2>
      <p className="page-text">Write your presentation here.</p>
    </section>
  );
}
