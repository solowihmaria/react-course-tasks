'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetPokemonDetailsQuery } from '../../../store/slices/pokemonApi';
import { Card } from '../../../components/Card/Card';
import { Loader } from '../../../components/Loader/Loader';
import styles from './RightSide.module.css';
import { useApiError } from '../../../hooks/useApiError';

export default function RightSidePage() {
  const params = useParams();
  const router = useRouter();
  const { getErrorMessage } = useApiError();

  const page = params?.page as string | undefined;
  const pokemonId = params?.pokemonId as string | undefined;

  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useGetPokemonDetailsQuery(Number(pokemonId), { skip: !pokemonId });

  const handleClose = () => {
    if (page) router.push(`/${page}`);
  };

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
}
