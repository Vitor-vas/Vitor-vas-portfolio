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