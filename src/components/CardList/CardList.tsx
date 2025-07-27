import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import type { Pokemon } from '../../types/types';
import styles from './CardList.module.css';

interface CardListProps {
  items: Pokemon[];
  isLoading: boolean;
  error: string | null;
  onItemClick?: (item: Pokemon) => void;
}

export const CardList = ({ items, isLoading, error }: CardListProps) => {
  const navigate = useNavigate();
  const { page } = useParams();
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
    <div className={styles['card-list']}>
      {items.map((item) => (
        <Card
          key={item.id}
          item={item}
          compact={true}
          onClick={() => navigate(`/${page}/${item.id}`)}
        />
      ))}
    </div>
  );
};
