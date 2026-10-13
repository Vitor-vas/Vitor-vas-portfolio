import { Link } from 'react-router-dom';

export default function Experiences() {
  return (
    <section className="page">
      <Link to="/" className="back-link">← BACK</Link>
      <h2 className="page-title">Experience</h2>
      <p className="page-text">Your experience goes here.</p>
    </section>
  );
}
