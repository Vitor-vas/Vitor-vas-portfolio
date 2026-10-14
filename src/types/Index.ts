import type { Dispatch, SetStateAction } from 'react';

export interface CardData {
  id: string;
  tag: string;
  title: string;
  subtitle?: string;
  description: string;
  code?: string;
  footerLabel?: string;
  footerValue?: string;
  action: string;
  path: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export type Lang = 'PTBR' | 'EN';

// Tipo do setter retornado pelo useState<number>
export type SetNumber = Dispatch<SetStateAction<number>>;

export type SendStatus = 'idle' | 'sending' | 'success' | 'error';


export interface Project {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  repo?: string;
  demo?: string;
  image?: string; // path written in projects.ts, shown on the right side of the selected card
}