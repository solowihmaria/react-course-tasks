import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonDetailsQuery } from '../../../../store/slices/pokemonApi';
import { Card } from '../../../../components/Card/Card';
import { Loader } from '../../../../components/Loader/Loader';
import styles from './RightSide.module.css';

import { useApiError } from '../../../../hooks/useApiError';

export const RightSide = () => {
  const { page, pokemonId } = useParams();
  const navigate = useNavigate();
  const { getErrorMessage } = useApiError();

  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useGetPokemonDetailsQuery(Number(pokemonId), { skip: !pokemonId });

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
        <div className={styles.error}>{getErrorMessage(error)}</div>
      ) : (
        pokemon && <Card item={pokemon} compact={false} />
      )}
    </div>
  );
};
