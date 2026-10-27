import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../i18n/translations.ts';

interface PageHeaderProps {
  // Leave it out when the page already shows its own big title (About, Experience)
  title?: string;
}

// Back button (always goes to Home) + page title, at the top of every page except Home
export default function PageHeader({ title }: PageHeaderProps) {
  const t = useT();

  return (
    <header className="page-header">
      {/* The button nudges to the left on hover */}
      <motion.div style={{ display: 'inline-block' }} whileHover={{ x: -4 }} whileTap={{ x: -8 }}>
        <Link to="/" className="back-link">← {t.back}</Link>
      </motion.div>
      {title && <h2 className="page-title">{title}</h2>}
    </header>
  );
}