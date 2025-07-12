import { Component } from 'react';
import Card from '../Card/Card';
import type { Pokemon } from '../../types/types';
import styles from './CardList.module.css';

interface CardListProps {
  items: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

class CardList extends Component<CardListProps> {
  render() {
    const { items, isLoading, error } = this.props;

    if (error) {
      return <div className={styles['error-message']}>{error}</div>;
    }

    if (isLoading) {
      return <div className={styles['loader']}>Loading...</div>;
    }

    if (items.length === 0) {
      return <div className={styles['no-results']}>No Pokémon found</div>;
    }

    return (
      <div className={styles['card-list']}>
        {items.map((item) => (
          <Card key={item.id} item={item} compact={true} />
        ))}
      </div>
    );
  }
}

export default CardList;
