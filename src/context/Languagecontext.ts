import { createContext, useContext } from 'react';
import type { Lang } from '../types/Index.ts';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

// Layout owns the state and provides it; any page can read it with useLang()
export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageContext.Provider>');
  return ctx;
}

/* ---------- remembering the visitor's choice ---------- */
const STORAGE_KEY = 'portfolio-lang';

// English unless the visitor already picked a language on a previous visit
export function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'EN' || saved === 'PTBR') return saved;
  } catch {
    // storage can be blocked (private mode); just use the default
  }
  return 'EN';
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore: the choice just won't be remembered
  }
}