import { Component } from 'react';
import styles from './Card.module.css';
import type { Pokemon } from '../../types/types';

interface CardProps {
  item: Pokemon;
  compact?: boolean;
}

class Card extends Component<CardProps> {
  render() {
    const { item, compact = false } = this.props;
    // вариант,когда список всех
    if (compact) {
      return (
        <div className={styles['card-compact']}>
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
    // вариант,когда ищем конкретного
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
  }
}

export default Card;
