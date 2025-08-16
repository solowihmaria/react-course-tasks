'use client';
import { useRouter } from 'next/navigation';
import { Card } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { togglePokemon } from '../../store/slices/selectionSlice';
import type { Pokemon } from '../../types/types';
import styles from './CardList.module.css';

interface CardListProps {
  items: Pokemon[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  onItemClick?: (item: Pokemon) => void;
}

export const CardList = ({
  items,
  isLoading,
  error,
  currentPage,
}: CardListProps) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => state.selection.selectedIds);

  const handleToggleSelect = (pokemon: Pokemon) => {
    dispatch(togglePokemon(pokemon));
  };

  if (error) {
    return <div className={styles['error-message']}>{error}</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (items.length === 0) {
    return <div className={styles['no-results']}>No Pokémon found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles['card-list']}>
        {items.map((item) => (
          <Card
            key={item.id}
            item={item}
            compact={true}
            isSelected={!!selectedIds[item.id ?? 0]}
            onToggleSelect={handleToggleSelect}
            onClick={() => router.push(`/${currentPage}/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
