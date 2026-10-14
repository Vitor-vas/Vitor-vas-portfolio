import type { Project } from '../types/Index';

// Projects made by me no need to change id nor tag
export const projects: Project[] = [
  {
    id: 'project-1',
    tag: '01 // PROJECT',
    title: 'Psyche',
    subtitle: 'Psychologist-Pacient management system',
    description: 'System that connects psychologists and their pacients, with dashboard. Puc 1st semester.',
    stack: ['JavaScript', 'JSONServer', 'HTML', 'CSS'],
    repo: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0438100-innertrip-2',
    image: 'InnertripDashboard.jpeg',
  },
  {
    id: 'project-2',
    tag: '02 // PROJECT',
    title: 'Collect Game',
    subtitle: 'Python dungeon crawler',
    description: 'Short dungeon crawler game made with python.',
    stack: ['Python', 'Pygame', 'Pytest'],
    repo: 'https://github.com/Vitor-vas/CollectGame_Python',
    image: 'CollectGame.jpg',
  },
  {
    id: 'project-3',
    tag: '03 // PROJECT',
    title: 'Portoes do Ceu',
    subtitle: 'Hospital management system',
    description: 'System that manages a hospital and its workers, with dashboard. Puc 2st semester. Ongoing',
    stack: ['Thymeleaf', 'Java', 'Springboot'],
    repo: 'https://github.com/leopettersen/TP-sistema-hospitalar',
    image: 'PortoesDoCeu.jpg',
  },
  {
    id: 'project-4',
    tag: '04 // PROJECT',
    title: 'Athenas',
    subtitle: 'Universisties information distribution',
    description: 'System that connects workers and graduates with to be students to share information about a broad range of courses. Puc 2st semester. Ongoing.',
    stack: ['React', 'Typescript'],
    repo: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-2-ti2-8243100-atenas/',
    image: 'Athenas.jpg', 
  },
];