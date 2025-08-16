'use client';
import { useState } from 'react';
import {
  useGetPokemonsQuery,
  useInvalidatePokemonCacheMutation,
} from '../store/slices/pokemonApi';
import { useLocalStorage } from './useLocalStorage';
import { useRouter } from 'next/navigation';
import { useApiError } from './useApiError';

export const usePokemonList = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const { getErrorMessage } = useApiError();
  const [invalidateCache] = useInvalidatePokemonCacheMutation();

  const {
    data: pokemonData,
    isLoading,
    isFetching,
    error,
  } = useGetPokemonsQuery({
    page: currentPage,
    searchTerm: searchTerm || undefined,
    limit: 8,
  });

  const handleRefreshAll = async () => {
    await invalidateCache({});
  };

  const handleSearch = (term: string) => {
    setCurrentPage(1);
    setSearchTerm(term.trim());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/${page}`);
  };

  return {
    items: pokemonData?.items || [],
    isLoading: isLoading || isFetching,
    error: error ? getErrorMessage(error) : null,
    searchTerm,
    currentPage,
    totalPages: Math.ceil((pokemonData?.totalCount || 0) / 8),
    handleSearch,
    handlePageChange,
    refreshAll: handleRefreshAll,
  };
};
