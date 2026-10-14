import type { Experience } from '../types/Index.ts';

// Newest first. Dates use 'YYYY-MM'; leave `end` out for a role that is still ongoing.
// Every text has an English (EN) and a Portuguese (PTBR) version.
// The first 3 highlights are always visible; the others appear with "SHOW MORE".
export const experiences: Experience[] = [
  {
    id: 'gc-promotora',
    role: {
      EN: 'Financial Intern',
      PTBR: 'Estagiário financeiro',
    },
    company: 'GC Promotora',
    companyUrl: 'https://gcpromotora.com.br/',
    type: { EN: 'Technitian', PTBR: 'Graduação' },
    summary: {
      EN: 'Technitian degree in Internet computing.',
      PTBR: 'Graduação em Engenharia de Software com um projeto em equipe a cada semestre.',
    },
    start: '2024-09', 
    location: { EN: 'Belo Horizonte, Brazil', PTBR: 'Belo Horizonte, Brasil' },
    description: {
      EN: 'Financial Department Intern at GC Promotora, responsible for software testing, supporting the organization of internal processes, and managing company resources. Developed skills in quality assurance, problem-solving, organization, and cross-functional collaboration.',
      PTBR: 'Estagiário no setor financeiro da GC Promotora, com atuação em testes de software, apoio à organização de processos internos e gerenciamento de recursos da empresa. Desenvolvi habilidades em controle de qualidade, resolução de problemas, organização e colaboração entre equipes.',
    },
    highlights: {
      EN: [
    'Responsible for testing the company\'s new web system',
    'Responsible for connecting and managing discount spreadsheets sent by banks and partners',
      ],
      PTBR: [
        'Responsável pelo teste do sistema web novo da empresa',
        'Responsável pela conexão e controle das planilhas de descontos enviadas pelos bancos e parceiros.',
      ],
    },
    stack: ['JavaScript', 'HTML', 'CSS', 'Excel'],
  },

  
];