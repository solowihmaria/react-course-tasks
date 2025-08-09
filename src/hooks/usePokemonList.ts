import { useState } from 'react';
import { useGetPokemonsQuery } from '../store/slices/pokemonApi';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

export const usePokemonList = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const {
    data: pokemonData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetPokemonsQuery({
    page: currentPage,
    searchTerm: searchTerm || undefined,
    limit: 8,
  });

  const handleSearch = (term: string) => {
    setCurrentPage(1);
    setSearchTerm(term.trim());
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  return {
    items: pokemonData?.items || [],
    isLoading: isLoading || isFetching,
    error: error ? 'Failed to fetch Pokémon' : null,
    searchTerm,
    currentPage,
    totalPages: Math.ceil((pokemonData?.totalCount || 0) / 8),
    handleSearch,
    handlePageChange,
  };
};
