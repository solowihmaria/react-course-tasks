import styles from './Card.module.css';
import type { Pokemon } from '../../types/types';

interface CardProps {
  item: Pokemon;
  compact?: boolean;
  onClick?: () => void;
}

export const Card = ({ item, compact = false, onClick }: CardProps) => {
  // Компактный вариант (для списка)
  if (compact) {
    return (
      <div
        className={styles['card-compact']}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <img
          src={item.sprites?.front_default || '/placeholder-pokemon.png'}
          alt={item.name}
          className={styles['pokemon-thumbnail']}
        />
        <div className={styles['pokemon-info']}>
          <h4>{item.name}</h4>
          <p className={styles.types}>
            {item.types?.map((t) => t.type.name).join(', ')}
          </p>
        </div>
      </div>
    );
  }

  // Детальный вариант
  return (
    <div className={styles['card-detailed']}>
      <img
        src={item.sprites?.front_default || '/placeholder-pokemon.png'}
        alt={item.name}
        className={styles['pokemon-image']}
      />
      <div className={styles['pokemon-details']}>
        <h3>{item.name.toUpperCase()}</h3>
        <p>Type: {item.types?.map((t) => t.type.name).join(', ')}</p>
        <p>Height: {(item.height || 0) / 10}m</p>
        <p>Weight: {(item.weight || 0) / 10}kg</p>
      </div>
    </div>
  );
};
