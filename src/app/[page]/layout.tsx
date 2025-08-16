import { notFound } from 'next/navigation';
import styles from './layout.module.css';
import ClientShell from './TwoColumnLayout';

const MAX_PAGE = 163;

export default function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { page: string; pokemonId?: string };
}) {
  const pageNum = Number(params.page);
  const isValidPage =
    !isNaN(pageNum) &&
    Number.isInteger(pageNum) &&
    pageNum > 0 &&
    pageNum <= MAX_PAGE;

  if (!isValidPage) {
    notFound();
  }

  const hasDetails = Boolean(params.pokemonId);

  return (
    <div className={styles.container}>
      <ClientShell pageNum={pageNum} hasDetails={hasDetails}>
        {children}
      </ClientShell>
    </div>
  );
}
