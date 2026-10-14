import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { experiences } from '../data/experiences.ts';
import { useLang } from '../context/Languagecontext.ts';
import type { Experience, Lang } from '../types/Index.ts';
import '../styles/experience.css';

/* ---------------- texts of the page itself ---------------- */
interface UiText {
  tag: string;
  title: string;
  count: (roles: number, year: number) => string;
  present: string;
  showMore: string;
  showLess: string;
  year: [string, string]; // [singular, plural]
  month: [string, string];
  months: string[];
}

const UI: Record<Lang, UiText> = {
  EN: {
    tag: '03',
    title: 'Experience',
    count: (n, y) => `${n} ${n === 1 ? 'role' : 'roles'} since ${y}`,
    present: 'PRESENT',
    showMore: 'SHOW MORE',
    showLess: 'SHOW LESS',
    year: ['YR', 'YRS'],
    month: ['MO', 'MOS'],
    months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  },
  PTBR: {
    tag: '03',
    title: 'Experiência',
    count: (n, y) => `${n} ${n === 1 ? 'experiência' : 'experiências'} desde ${y}`,
    present: 'ATUAL',
    showMore: 'VER MAIS',
    showLess: 'VER MENOS',
    year: ['ANO', 'ANOS'],
    month: ['MÊS', 'MESES'],
    months: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
  },
};

const VISIBLE_HIGHLIGHTS = 3;

/* ---------------- date helpers ---------------- */
const parse = (ym: string): [number, number] => {
  const [y, m] = ym.split('-').map(Number);
  return [y, m];
};

function formatMonth(ym: string, ui: UiText) {
  const [y, m] = parse(ym);
  return `${ui.months[m - 1]} ${y}`;
}

// Counts both the first and the last month, so Jan → Jan is "1 MO"
function formatDuration(start: string, end: string | undefined, ui: UiText) {
  const [sy, sm] = parse(start);
  const now = new Date();
  const [ey, em] = end ? parse(end) : [now.getFullYear(), now.getMonth() + 1];
  const total = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const years = Math.floor(total / 12);
  const months = total % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? ui.year[0] : ui.year[1]}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? ui.month[0] : ui.month[1]}`);
  return parts.join(' ');
}

/* ---------------- small icons ---------------- */
function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ---------------- one timeline item ---------------- */
interface ItemProps {
  exp: Experience;
  index: number;
  lang: Lang;
  ui: UiText;
}

function ExperienceItem({ exp, index, lang, ui }: ItemProps) {
  const [expanded, setExpanded] = useState(false);

  const highlights = exp.highlights[lang];
  const shown = highlights.slice(0, VISIBLE_HIGHLIGHTS);
  const extra = highlights.slice(VISIBLE_HIGHLIGHTS);

  const period = `${formatMonth(exp.start, ui)} — ${exp.end ? formatMonth(exp.end, ui) : ui.present}`;
  const duration = formatDuration(exp.start, exp.end, ui);

  return (
    <motion.li
      className="exp-item"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.15, duration: 0.5, ease: 'easeOut' }}
    >
      <motion.span
        className="exp-marker"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.3 + index * 0.15 }}
      />

      <h3 className="exp-role">{exp.role[lang]}</h3>

      <p className="exp-company">
        {exp.companyUrl ? (
          <a href={exp.companyUrl} target="_blank" rel="noreferrer">
            {exp.company} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <strong>{exp.company}</strong>
        )}
        <span className="exp-type"> · {exp.type[lang]}</span>
      </p>

      <p className="exp-summary">{exp.summary[lang]}</p>

      <p className="exp-meta">
        <span><CalendarIcon /> {period} · {duration}</span>
        <span><PinIcon /> {exp.location[lang].toUpperCase()}</span>
      </p>

      <p className="exp-description">{exp.description[lang]}</p>

      <ul className="exp-highlights">
        {shown.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>

      {/* The rest of the highlights slide open */}
      <AnimatePresence initial={false}>
        {expanded && extra.length > 0 && (
          <motion.ul
            key="extra"
            className="exp-highlights exp-extra"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {extra.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {extra.length > 0 && (
        <button className="exp-toggle" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
          {expanded ? ui.showLess : ui.showMore}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} className="exp-chevron">
            <ChevronIcon />
          </motion.span>
        </button>
      )}

      <ul className="exp-tags">
        {exp.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </motion.li>
  );
}

/* ---------------- the page ---------------- */
export default function Experiences() {
  const { lang } = useLang();
  const ui = UI[lang];

  const firstYear = Math.min(...experiences.map((e) => parse(e.start)[0]));

  return (
    <section className="exp-page">
      <motion.aside
        className="exp-aside"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="exp-tag">{ui.tag}</span>
        <h2 className="exp-title">{ui.title}</h2>
        <p className="exp-count">{ui.count(experiences.length, firstYear)}</p>
      </motion.aside>

      <div className="exp-timeline-wrap">
        {/* The vertical line draws itself from top to bottom */}
        <motion.span
          className="exp-line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
        <ol className="exp-timeline">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} lang={lang} ui={ui} />
          ))}
        </ol>
      </div>
    </section>
  );
}