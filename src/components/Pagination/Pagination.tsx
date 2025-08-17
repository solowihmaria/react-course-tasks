'use client';

import { useTranslations } from 'next-intl';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  disabled = false,
  onPageChange,
}: PaginationProps) => {
  const t = useTranslations('Pagination');

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1 || disabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {t('prev')}
      </button>

      <span>{t('pageInfo', { currentPage, totalPages })}</span>

      <button
        disabled={currentPage === totalPages || disabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {t('next')}
      </button>
    </div>
  );
};
