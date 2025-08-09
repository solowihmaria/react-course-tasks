import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonDetailsQuery } from '../../../../store/slices/pokemonApi';
import { Card } from '../../../../components/Card/Card';
import { Loader } from '../../../../components/Loader/Loader';
import styles from './RightSide.module.css';

export const RightSide = () => {
  const { page, pokemonId } = useParams();
  const navigate = useNavigate();

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useGetPokemonDetailsQuery(Number(pokemonId), {
    skip: !pokemonId,
  });

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
      ) : isError ? (
        <div className={styles.error}>Error loading Pokémon details</div>
      ) : (
        pokemon && <Card item={pokemon} compact={false} />
      )}
    </div>
  );
};
