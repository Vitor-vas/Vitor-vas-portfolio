import type { Project } from '../types/Index';

// PLACEHOLDERS: replace these with your real projects.
// Add or remove items freely, the carousel adapts to the number of projects.
//
// To show an image on the selected card, put the file in src/assets/projects/
// and import it:
//   import shot1 from '../assets/projects/project-1.png';
// then add `image: shot1` to the project. Without `image`, a placeholder is shown.
export const projects: Project[] = [
  {
    id: 'project-1',
    tag: '01 // PROJECT',
    title: 'Project One',
    subtitle: 'Full-Stack Web App',
    description: 'Short description of what this project does and the problem it solves.',
    stack: ['React', 'TypeScript', 'PostgreSQL'],
    repo: 'https://github.com/Vitor-vas',
  },
  {
    id: 'project-2',
    tag: '02 // PROJECT',
    title: 'Project Two',
    subtitle: 'Distributed Service',
    description: 'Short description of what this project does and the problem it solves.',
    stack: ['Java', 'REST', 'Docker'],
    repo: 'https://github.com/Vitor-vas',
  },
  {
    id: 'project-3',
    tag: '03 // PROJECT',
    title: 'Project Three',
    subtitle: 'Interactive UI',
    description: 'Short description of what this project does and the problem it solves.',
    stack: ['React', 'Motion', 'CSS'],
    repo: 'https://github.com/Vitor-vas',
  },
  {
    id: 'project-4',
    tag: '04 // PROJECT',
    title: 'Project Four',
    subtitle: 'Automation / Data',
    description: 'Short description of what this project does and the problem it solves.',
    stack: ['Python', 'SQL'],
    repo: 'https://github.com/Vitor-vas',
  },
  {
    id: 'project-5',
    tag: '05 // PROJECT',
    title: 'Project Five',
    subtitle: 'Academic Project',
    description: 'Short description of what this project does and the problem it solves.',
    stack: ['Java', 'System Design'],
    repo: 'https://github.com/Vitor-vas',
  },
];