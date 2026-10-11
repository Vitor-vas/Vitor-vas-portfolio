import type { CardData, SocialLink } from '../types/Index';

// Conteúdo dos cards do carrossel. Edite aqui sem mexer nos componentes.
export const cards: CardData[] = [
  {
    id: 'profile',
    tag: 'EDITION 2025 // ACTIVE',
    title: 'Vitor A. Souza',
    subtitle: 'Software Engineer & Full-Stack',
    description:
      'Engineering resilient web architectures, distributed systems, and tactile human interfaces at PUC Minas.',
    code: '$ stack.load(["Next.js", "Go", "Docker"])',
    footerLabel: 'Institution',
    footerValue: 'PUC Minas • 5th Sem',
    action: 'Dossier',
  },
  {
    id: 'pillars',
    tag: '01 // SYSTEM PILLARS',
    title: 'System Pillars',
    description: 'Distributed services and deterministic UI structures.',
    action: 'Explore',
  },
  {
    id: 'trajectory',
    tag: '02 // TRAJECTORY',
    title: 'Trajectory',
    description: 'B.S. Software Engineering — PUC Minas. Full-stack lead on student projects.',
    action: 'Explore',
  },
  {
    id: 'arsenal',
    tag: '03 // ARSENAL',
    title: 'Arsenal',
    description: 'Next.js, Go, Docker, PostgreSQL and more.',
    action: 'Explore',
  },
  {
    id: 'contact',
    tag: '04 // DIRECT',
    title: 'Dialogue',
    description: 'Internships, technical collaborations and research fellowships.',
    action: 'Contact',
  },
];

export const competencies: string[] = ['System Design', 'Next.js Full-Stack', 'PostgreSQL'];

export const links: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Vitor-vas' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Email', href: 'mailto:you@email.com' },
];