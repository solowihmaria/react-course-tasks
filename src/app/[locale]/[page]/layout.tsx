import { notFound } from 'next/navigation';
import styles from './layout.module.css';
import ClientShell from './TwoColumnLayout';

const MAX_PAGE = 163;

export default async function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ page: string; pokemonId?: string }>;
}) {
  const { page, pokemonId } = await params;

  const pageNum = Number(page);
  const isValidPage =
    !isNaN(pageNum) &&
    Number.isInteger(pageNum) &&
    pageNum > 0 &&
    pageNum <= MAX_PAGE;

  if (!isValidPage) {
    notFound();
  }

  const hasDetails = Boolean(pokemonId);

  return (
    <div className={styles.container}>
      <ClientShell pageNum={pageNum} hasDetails={hasDetails}>
        {children}
      </ClientShell>
    </div>
  );
}
