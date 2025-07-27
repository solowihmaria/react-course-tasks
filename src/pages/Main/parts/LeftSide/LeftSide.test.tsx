import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LeftSide } from './LeftSide';
import * as usePokemonListHook from '../../../../hooks/usePokemonList';

describe('LeftSide Component', () => {
  const mockHandleSearch = vi.fn();
  const mockHandlePageChange = vi.fn();

  beforeEach(() => {
    vi.spyOn(usePokemonListHook, 'usePokemonList').mockReturnValue({
      items: [],
      isLoading: false,
      error: null,
      searchTerm: 'pikachu',
      totalPages: 3,
      handleSearch: mockHandleSearch,
      handlePageChange: mockHandlePageChange,
      currentPage: 1,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('renders Search, Pagination and CardList components', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<LeftSide currentPage={1} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/search pokémon/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls handleSearch when search button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<LeftSide currentPage={1} />} />
        </Routes>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search pokémon/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith('bulbasaur');
    });
  });
});
