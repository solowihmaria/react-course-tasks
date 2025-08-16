'use client';
import { CardList } from '../CardList/CardList';
import { Pagination } from '..//Pagination/Pagination';
import { Search } from '..//Search/Search';
import { usePokemonList } from '../../hooks/usePokemonList';
import { SelectionFlyout } from '../SelectionFlyout/SelectionFlyout';
import styles from './LeftSide.module.css';

export const LeftSide = ({ currentPage }: { currentPage: number }) => {
  const {
    items,
    isLoading,
    error,
    searchTerm,
    totalPages,
    handleSearch,
    handlePageChange,
    refreshAll,
  } = usePokemonList(currentPage);

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
            ⟳ Refresh
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
