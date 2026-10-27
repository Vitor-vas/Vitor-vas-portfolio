import type { Project } from '../types/Index';

// Add or remove items freely, the carousel adapts to the number of projects.
// `subtitle` and `description` have an English (EN) and a Portuguese (PTBR) text.
//
// IMAGE (shown on the right side of the selected card), pick one way:
//   image: 'psyche.png'              -> file in src/assets/projects/psyche.png
//   image: '/projects/psyche.png'    -> file in public/projects/psyche.png
//   image: 'https://site.com/a.png'  -> external image
// Without `image`, a placeholder is shown.
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Psyche',
    subtitle: {
      EN: 'Psychologist-Patient management system',
      PTBR: 'Sistema de gestão psicólogo-paciente',
    },
    description: {
      EN: 'System that connects psychologists and their patients, with dashboard. PUC 1st semester.',
      PTBR: 'Sistema que conecta psicólogos e seus pacientes, com dashboard. PUC, 1º semestre.',
    },
    stack: ['JavaScript', 'JSONServer', 'HTML', 'CSS'],
    repo: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0438100-innertrip-2',
  },
  {
    id: 'project-2',
    title: 'Collect Game',
    subtitle: {
      EN: 'Python dungeon crawler',
      PTBR: 'Dungeon crawler em Python',
    },
    description: {
      EN: 'Short dungeon crawler game made with Python.',
      PTBR: 'Pequeno jogo de dungeon crawler feito com Python.',
    },
    stack: ['Python', 'Pygame', 'Pytest'],
    repo: 'https://github.com/Vitor-vas/CollectGame_Python',
  },
  {
    id: 'project-3',
    title: 'Portoes do Ceu',
    subtitle: {
      EN: 'Hospital management system',
      PTBR: 'Sistema de gestão hospitalar',
    },
    description: {
      EN: 'System that manages a hospital and its workers, with dashboard. PUC 2nd semester. Ongoing.',
      PTBR: 'Sistema que gerencia um hospital e seus funcionários, com dashboard. PUC, 2º semestre. Em andamento.',
    },
    stack: ['Thymeleaf', 'Java', 'Springboot'],
    repo: 'https://github.com/leopettersen/TP-sistema-hospitalar',
  },
  {
    id: 'project-4',
    title: 'Athenas',
    subtitle: {
      EN: 'University information distribution',
      PTBR: 'Distribuição de informações universitárias',
    },
    description: {
      EN: 'System that connects workers and graduates with prospective students to share information about a broad range of courses. PUC 2nd semester. Ongoing.',
      PTBR: 'Sistema que conecta profissionais e formados com futuros alunos para compartilhar informações sobre uma grande variedade de cursos. PUC, 2º semestre. Em andamento.',
    },
    stack: ['React', 'Typescript'],
    repo: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-2-ti2-8243100-atenas/',
  },
];