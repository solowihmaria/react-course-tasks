'use client';

import { useMemo, useState } from 'react';
import {
  useGetPokemonsQuery,
  useInvalidatePokemonCacheMutation,
} from '../store/slices/pokemonApi';
import { useLocalStorage } from './useLocalStorage';
import { useRouter } from '../i18n/navigation';
import { useApiError } from './useApiError';
import type { Pokemon } from '../types/types';

type UsePokemonListArgs = {
  initialPage?: number;
  initialItems?: Pokemon[];
  initialTotalCount?: number;
  pageSize?: number;
};

export const usePokemonList = ({
  initialPage = 1,
  initialItems = [],
  initialTotalCount = 0,
  pageSize = 8,
}: UsePokemonListArgs) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const { getErrorMessage } = useApiError();
  const [invalidateCache] = useInvalidatePokemonCacheMutation();

  //  серверный режим - когда нет поиска
  const isServerMode = useMemo(
    () => (searchTerm ?? '').trim() === '',
    [searchTerm]
  );

  //  client-mode включаем RTK Query
  const {
    data: pokemonData,
    isLoading,
    isFetching,
    error,
  } = useGetPokemonsQuery(
    {
      page: currentPage,
      searchTerm: isServerMode ? undefined : searchTerm || undefined,
      limit: pageSize,
    },
    { skip: isServerMode }
  );

  const items: Pokemon[] = isServerMode
    ? initialItems
    : pokemonData?.items || [];

  const totalPages: number = isServerMode
    ? Math.ceil((initialTotalCount || 0) / pageSize)
    : Math.ceil((pokemonData?.totalCount || 0) / pageSize);

  const mappedError: string | null = isServerMode
    ? null
    : error
      ? getErrorMessage(error)
      : null;

  const loading = isServerMode ? false : isLoading || isFetching;

  const handleRefreshAll = async () => {
    if (isServerMode) {
      router.refresh();
      return;
    }
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
    items,
    isLoading: loading,
    error: mappedError,
    searchTerm,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange,
    refreshAll: handleRefreshAll,
  };
};
