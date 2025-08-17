'use client';

import { useTranslations } from 'next-intl';
import { CardList } from '../CardList/CardList';
import { Pagination } from '..//Pagination/Pagination';
import { Search } from '..//Search/Search';
import { usePokemonList } from '../../hooks/usePokemonList';
import { SelectionFlyout } from '../SelectionFlyout/SelectionFlyout';
import styles from './LeftSide.module.css';
import type { Pokemon } from '../../types/types';

export const LeftSide = ({
  currentPage,
  initialItems,
  initialTotalCount,
  pageSize,
}: {
  currentPage: number;
  initialItems: Pokemon[];
  initialTotalCount: number;
  pageSize: number;
}) => {
  const t = useTranslations('LeftSide');

  const {
    items,
    isLoading,
    error,
    searchTerm,
    totalPages,
    handleSearch,
    handlePageChange,
    refreshAll,
  } = usePokemonList({
    initialPage: currentPage,
    initialItems,
    initialTotalCount,
    pageSize,
  });

  return (
    <div className={styles.leftSide}>
      <div className={styles.topSection}>
        <Search onSearch={handleSearch} initialValue={searchTerm} />
      </div>

      <div className={styles.mainSection}>
        <div className={styles.controls}>
          <button
            onClick={() => refreshAll()}
            disabled={isLoading}
            className={styles.refreshButton}
            aria-label="Refresh list"
          >
            ⟳ {t('refresh')}
          </button>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <CardList
          items={items}
          isLoading={isLoading}
          error={error}
          currentPage={currentPage}
        />
        <SelectionFlyout />
      </div>
    </div>
  );
};
