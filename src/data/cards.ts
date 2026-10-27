import type { CardData, Lang, Localized, SocialLink } from '../types/Index';

// Cards of the Home carousel, one list per language.
// Both lists must keep the same order, ids and paths.
export const cardsByLang: Record<Lang, CardData[]> = {
  EN: [
    {
      id: 'profile',
      tag: 'EDITION 2026 // ACTIVE',
      title: 'About-me',
      subtitle: 'Software Engineer & Full-Stack',
      description:
        'Engineering resilient web architectures, distributed systems, and tactile human interfaces at PUC Minas.',
      code: '$ stack.load(["React", "TypeScript", "Java"])',
      footerLabel: 'Institution',
      footerValue: 'PUC Minas • 2nd Sem',
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
      description: 'Software Engineering — PUC Minas. Full-stack student projects.',
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
      description: 'Internships, technical collaborations and research.',
      action: 'Contact',
      path: '/contact',
    },
  ],

  PTBR: [
    {
      id: 'profile',
      tag: 'EDIÇÃO 2026 // ATIVO',
      title: 'Sobre-mim',
      subtitle: 'Engenheiro de Software & Full-Stack',
      description:
        'Desenvolvendo arquiteturas web resilientes, sistemas distribuídos e interfaces humanas táteis na PUC Minas.',
      code: '$ stack.load(["React", "TypeScript", "Java"])',
      footerLabel: 'Instituição',
      footerValue: 'PUC Minas • 2º Sem',
      action: 'Dossiê',
      path: '/about',
    },
    {
      id: 'pillars',
      tag: '01 // PILARES DO SISTEMA',
      title: 'Projetos',
      description: 'Serviços distribuídos e estruturas de interface determinísticas.',
      action: 'Explorar',
      path: '/projects',
    },
    {
      id: 'trajectory',
      tag: '02 // TRAJETÓRIA',
      title: 'Experiência',
      description: 'Engenharia de Software — PUC Minas. Projetos full-stack como estudante.',
      action: 'Explorar',
      path: '/experience',
    },
    {
      id: 'arsenal',
      tag: '03 // ARSENAL',
      title: 'Currículo',
      description: 'React, TypeScript, Java, Python e mais.',
      action: 'Explorar',
      path: '/curriculum',
    },
    {
      id: 'contact',
      tag: '04 // DIRETO',
      title: 'Fale-comigo',
      description: 'Estágios, colaborações técnicas e pesquisa.',
      action: 'Contato',
      path: '/contact',
    },
  ],
};

export const competencies: Localized<string[]> = {
  EN: ['System Design', 'React Full-Stack', 'PostgreSQL'],
  PTBR: ['Design de Sistemas', 'React Full-Stack', 'PostgreSQL'],
};

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