import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../../../services/api';
import { useEffect, useState } from 'react';
import type { Pokemon } from '../../../../types/types';
import { Card } from '../../../../components/Card/Card';
import { Loader } from '../../../../components/Loader/Loader';
import styles from './RightSide.module.css';

export const RightSide = () => {
  const { page, pokemonId } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchPokemonData = async () => {
      setIsLoading(true);
      try {
        const pokemonUrl = `${apiService.baseUrl}/${pokemonId}`;
        const data = await apiService.fetchPokemonDetails(pokemonUrl);
        setPokemon(data);
      } catch (error) {
        console.error('Failed to fetch pokemon details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  const handleClose = () => navigate(`/${page}`);

  if (!pokemonId) return null;

  return (
    <div className={styles.rightSide}>
      <button
        onClick={handleClose}
        className={styles.closeButton}
        aria-label="Close details"
      >
        ✕
      </button>
      {isLoading ? (
        <Loader />
      ) : (
        pokemon && <Card item={pokemon} compact={false} />
      )}
    </div>
  );
};
