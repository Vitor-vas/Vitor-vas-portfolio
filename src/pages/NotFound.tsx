import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page">
      <Link to="/" className="back-link">← BACK</Link>
      <h2 className="page-title">404 — Page not found</h2>
      <p className="page-text">This route does not exist.</p>
    </section>
  );
}
