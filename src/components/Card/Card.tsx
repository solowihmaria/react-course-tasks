import styles from './Card.module.css';
import type { Pokemon } from '../../types/types';

interface CardProps {
  item: Pokemon;
  compact?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  onToggleSelect?: (id: number) => void;
}

export const Card = ({
  item,
  compact = false,
  onClick,
  isSelected = false,
  onToggleSelect,
}: CardProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggleSelect?.(item.id ?? 0);
  };

  if (compact) {
    return (
      <div
        className={`${styles['card-compact']} ${isSelected ? styles.selected : ''}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className={styles.checkbox}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Select ${item.name}`}
        />

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
