import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function StatusBar() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
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
        <b>ARCHIVE VOL. 24</b> · FOLIO DOSSIER
      </span>
      <span>STATUS: <b>AVAILABLE</b></span>
    </motion.div>
  );
}