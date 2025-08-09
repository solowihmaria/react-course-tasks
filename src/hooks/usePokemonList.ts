import { useState } from 'react';
import { useGetPokemonsQuery } from '../store/slices/pokemonApi';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useApiError } from './useApiError';

export const usePokemonList = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const { getErrorMessage } = useApiError();

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

  const handleSearch = (term: string) => {
    setCurrentPage(1);
    setSearchTerm(term.trim());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/${page}`);
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
  };
};
