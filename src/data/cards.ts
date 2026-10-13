import type { CardData, SocialLink } from '../types/Index';

export const cards: CardData[] = [
  {
    id: 'profile',
    tag: 'EDITION 2026 // ACTIVE',
    title: 'About-me',
    subtitle: 'Software Engineer & Full-Stack',
    description:
      'Engineering resilient web architectures, distributed systems, and tactile human interfaces at PUC Minas.',
    code: '$ stack.load(["React", "TypeScript", "Java"])',
    footerLabel: 'Institution',
    footerValue: 'PUC Minas • 5th Sem',
    action: 'Dossier',
    path: '/about',
  },
  {
    id: 'pillars',
    tag: '01 // SYSTEM PILLARS',
    title: 'Projects',
    description: 'Distributed services and deterministic UI structures.',
    action: 'Explore',
    path: '/projects',
  },
  {
    id: 'trajectory',
    tag: '02 // TRAJECTORY',
    title: 'Experience',
    description:
      'Software Engineering — PUC Minas. Full-stack student projects.',
    action: 'Explore',
    path: '/experience',
  },
  {
    id: 'arsenal',
    tag: '03 // ARSENAL',
    title: 'Curriculum Vitae',
    description: 'React, TypeScript, Java, Python and more.',
    action: 'Explore',
    path: '/curriculum',
  },
  {
    id: 'contact',
    tag: '04 // DIRECT',
    title: 'Contact-me',
    description:
      'Internships, technical collaborations and research.',
    action: 'Contact',
    path: '/contact',
  },
];

export const competencies: string[] = [
  'System Design',
  'React Full-Stack',
  'PostgreSQL',
];

export const links: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Vitor-vas',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vitorasouza/',
  },
  {
    label: 'Email',
    href: 'mailto:vitoraugustosouzas007@gmail.com',
  },
];