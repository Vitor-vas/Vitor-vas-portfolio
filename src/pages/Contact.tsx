import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <section className="page">
      <Link to="/" className="back-link">← BACK</Link>
      <h2 className="page-title">Contact me</h2>
      <p className="page-text">Your contact info goes here.</p>
    </section>
  );
}
