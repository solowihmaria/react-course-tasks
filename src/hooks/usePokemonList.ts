import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import type { Pokemon } from '../types/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const usePokemonList = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [items, setItems] = useState<Pokemon[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (term: string = '', page: number = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const { items, totalCount } = await apiService.fetchItems(term, page, 8);
      setItems(items);
      setTotalPages(Math.ceil(totalCount / 8) || 1);
      setSearchTerm(term);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(searchTerm, currentPage);
  }, [currentPage]);

  const handleSearch = (term: string) => {
    setCurrentPage(1);
    fetchItems(term.trim(), 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  return {
    items,
    isLoading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange,
  };
};
