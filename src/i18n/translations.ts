import { useLang } from '../context/Languagecontext.ts';
import type { Lang } from '../types/Index.ts';

// Texts shared by the whole site. TypeScript forces EN and PTBR to have the same keys,
// so a missing translation is a compile error instead of a blank spot on the page.
// (The texts of About, Experience, Projects and the Home cards live next to their data.)
export interface Translations {
  back: string;
  header: {
    tagline: string;
    profile: string;
    nav: { about: string; projects: string; experience: string; cv: string; contact: string };
  };
  statusBar: { archive: string; folio: string; status: string; available: string };
  footer: { competencies: string; available: string; rights: string };
  carousel: { previous: string; next: string; hint: string };
  pages: {
    about: string;
    projects: string;
    experience: string;
    curriculum: string;
    contact: string;
    notFound: string;
  };
  curriculum: { placeholder: string };
  notFound: { text: string };
  projects: {
    project: string;
    hint: string;
    open: string;
    show: string;
    close: string;
    repo: string;
    demo: string;
    preview: string;
    image: string;
  };
  contact: {
    tag: string;
    secure: string;
    title: string;
    subtitle: string;
    findMe: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageMin: (min: number) => string;
    };
    note: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
}

export const translations: Record<Lang, Translations> = {
  EN: {
    back: 'BACK',
    header: {
      tagline: 'ARCHITECT & CREATIVE TECHNOLOGIST',
      profile: 'Profile',
      nav: { about: 'About', projects: 'Projects', experience: 'Experience', cv: 'CV', contact: 'Contact' },
    },
    statusBar: { archive: 'ARCHIVE VOL. 24', folio: 'FOLIO DOSSIER', status: 'STATUS', available: 'AVAILABLE' },
    footer: {
      competencies: 'CORE COMPETENCIES:',
      available: '● AVAILABLE FOR COMMISSIONS',
      rights: '© Vitor A. Souza — All Rights Reserved',
    },
    carousel: {
      previous: 'Previous',
      next: 'Next',
      hint: 'DRAG OR CLICK WINGS TO UNFOLD CAROUSEL',
    },
    pages: {
      about: 'About me',
      projects: 'Projects',
      experience: 'Experience',
      curriculum: 'Curriculum Vitae',
      contact: 'Contact me',
      notFound: '404 — Page not found',
    },
    curriculum: { placeholder: 'Your CV goes here.' },
    notFound: { text: 'This route does not exist.' },
    projects: {
      project: 'PROJECT',
      hint: 'ESC OR CLICK OUTSIDE TO GO BACK',
      open: 'Open',
      show: 'Show',
      close: 'Close project',
      repo: 'REPO',
      demo: 'LIVE DEMO',
      preview: 'preview',
      image: 'IMAGE',
    },
    contact: {
      tag: 'DIRECT DISPATCH',
      secure: 'TLS Encrypted',
      title: 'Send a Message',
      subtitle: 'Fill out the brief form below. Transmissions go straight to my primary inbox.',
      findMe: 'FIND ME ON',
      name: 'NAME',
      email: 'EMAIL',
      subject: 'SUBJECT',
      message: 'MESSAGE',
      namePlaceholder: 'Alex Rivera',
      emailPlaceholder: 'alex@company.com',
      subjectPlaceholder: 'e.g. Engineering Opportunity',
      messagePlaceholder: 'Your message...',
      errors: {
        nameRequired: 'Please tell me your name.',
        emailRequired: 'Please enter your email.',
        emailInvalid: 'This email looks invalid.',
        messageRequired: 'Please write a message.',
        messageMin: (min) => `Message must have at least ${min} characters.`,
      },
      note: 'Encrypted transit · Zero spam',
      send: 'Send Message',
      sending: 'Sending...',
      success: "Message sent! I'll get back to you as soon as possible.",
      error: 'Something went wrong. Please try again or email me directly.',
    },
  },

  PTBR: {
    back: 'VOLTAR',
    header: {
      tagline: 'ARQUITETO & TECNÓLOGO CRIATIVO',
      profile: 'Perfil',
      nav: { about: 'Sobre', projects: 'Projetos', experience: 'Experiência', cv: 'CV', contact: 'Contato' },
    },
    statusBar: { archive: 'ARQUIVO VOL. 24', folio: 'DOSSIÊ', status: 'STATUS', available: 'DISPONÍVEL' },
    footer: {
      competencies: 'COMPETÊNCIAS PRINCIPAIS:',
      available: '● DISPONÍVEL PARA PROJETOS',
      rights: '© Vitor A. Souza — Todos os direitos reservados',
    },
    carousel: {
      previous: 'Anterior',
      next: 'Próximo',
      hint: 'ARRASTE OU CLIQUE NAS LATERAIS PARA ABRIR O CARROSSEL',
    },
    pages: {
      about: 'Sobre mim',
      projects: 'Projetos',
      experience: 'Experiência',
      curriculum: 'Currículo',
      contact: 'Fale comigo',
      notFound: '404 — Página não encontrada',
    },
    curriculum: { placeholder: 'Seu currículo ficará aqui.' },
    notFound: { text: 'Esta rota não existe.' },
    projects: {
      project: 'PROJETO',
      hint: 'ESC OU CLIQUE FORA PARA VOLTAR',
      open: 'Abrir',
      show: 'Mostrar',
      close: 'Fechar projeto',
      repo: 'REPOSITÓRIO',
      demo: 'DEMO',
      preview: 'prévia',
      image: 'IMAGEM',
    },
    contact: {
      tag: 'ENVIO DIRETO',
      secure: 'Criptografia TLS',
      title: 'Envie uma mensagem',
      subtitle: 'Preencha o breve formulário abaixo. As mensagens chegam direto à minha caixa de entrada principal.',
      findMe: 'ME ENCONTRE EM',
      name: 'NOME',
      email: 'E-MAIL',
      subject: 'ASSUNTO',
      message: 'MENSAGEM',
      namePlaceholder: 'Maria Silva',
      emailPlaceholder: 'maria@empresa.com',
      subjectPlaceholder: 'ex.: Oportunidade de estágio',
      messagePlaceholder: 'Sua mensagem...',
      errors: {
        nameRequired: 'Informe seu nome.',
        emailRequired: 'Informe seu e-mail.',
        emailInvalid: 'Este e-mail parece inválido.',
        messageRequired: 'Escreva uma mensagem.',
        messageMin: (min) => `A mensagem deve ter pelo menos ${min} caracteres.`,
      },
      note: 'Transmissão criptografada · Zero spam',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada! Responderei o mais rápido possível.',
      error: 'Algo deu errado. Tente novamente ou me envie um e-mail diretamente.',
    },
  },
};

// In a component: const t = useT();  ->  t.header.nav.about
export function useT(): Translations {
  const { lang } = useLang();
  return translations[lang];
}