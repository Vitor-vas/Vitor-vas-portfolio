import { useEffect, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';

import Header from './Header.tsx';
import StatusBar from './Statusbar.tsx';
import Footer from './Footer.tsx';
import { LanguageContext } from '../context/Languagecontext.ts';

import type { Lang } from '../types/Index.ts';

export default function Layout() {
  const [lang, setLang] = useState<Lang>('EN');
  const location = useLocation();
  // useOutlet() gives us the current page element so we can animate it ourselves
  // (the plain <Outlet /> can't be kept alive during an exit animation).
  const outlet = useOutlet();

  // Keep the <html lang="..."> attribute in sync (good for accessibility and SEO)
  useEffect(() => {
    document.documentElement.lang = lang === 'PTBR' ? 'pt-BR' : 'en';
  }, [lang]);

  return (
    // Every page inside <Layout> can now call useLang()
    <LanguageContext.Provider value={{ lang, setLang }}>
      <MotionConfig reducedMotion="user">
        <div className="app">
          <Header lang={lang} setLang={setLang} />
          <StatusBar />

          {/* mode="wait": the old page finishes its exit before the new one enters.
              The `key` tells AnimatePresence "this is a different page". */}
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              className="page-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {outlet}
            </motion.main>
          </AnimatePresence>

          <Footer />
        </div>
      </MotionConfig>
    </LanguageContext.Provider>
  );
}