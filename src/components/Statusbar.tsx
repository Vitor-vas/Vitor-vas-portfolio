import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useT } from '../i18n/translations.ts';

export default function StatusBar() {
  const t = useT();
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const clock = time.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false,
  });

  return (
    <motion.div
      className="status-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <span>BELO HORIZONTE, MG <em>/ UTC-03 {clock}</em></span>
      <span>
        <b>{t.statusBar.archive}</b> · {t.statusBar.folio}
      </span>
      <span>{t.statusBar.status}: <b>{t.statusBar.available}</b></span>
    </motion.div>
  );
}