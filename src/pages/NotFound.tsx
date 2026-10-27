import PageHeader from '../components/Pageheader.tsx';
import { useT } from '../i18n/translations.ts';

export default function NotFound() {
  const t = useT();

  return (
    <>
      <PageHeader title={t.pages.notFound} />
      <section className="page">
        <p className="page-text">{t.notFound.text}</p>
      </section>
    </>
  );
}