import { useParams } from 'react-router-dom';
import { CardList } from '../../../../components/CardList/CardList';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { Search } from '../../../../components/Search/Search';
import { usePokemonList } from '../../../../hooks/usePokemonList';
import styles from './LeftSide.module.css';

export const LeftSide = ({ currentPage }: { currentPage: number }) => {
  const { pokemonId } = useParams();
  const {
    items,
    isLoading,
    error,
    searchTerm,
    totalPages,
    handleSearch,
    handlePageChange,
  } = usePokemonList(currentPage);

  return (
    <div className={styles.leftSide}>
      <div className={styles.topSection}>
        <Search onSearch={handleSearch} initialValue={searchTerm} />
      </div>

      <div className={styles.mainSection}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={!!pokemonId}
        />
        <CardList items={items} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};
