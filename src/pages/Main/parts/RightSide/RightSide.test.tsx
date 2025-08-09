import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RightSide } from './RightSide';
import { pikachuMock } from '../../../../test-utils/mockPokemon';
import { useGetPokemonDetailsQuery } from '../../../../store/slices/pokemonApi';

vi.mock('../../../../store/slices/pokemonApi', () => ({
  useGetPokemonDetailsQuery: vi.fn(),
}));

describe('RightSide component', () => {
  const mockUseGetPokemonDetailsQuery = vi.mocked(useGetPokemonDetailsQuery);

  const mockQueryResult = (overrides = {}) => ({
    data: undefined,
    isLoading: false,
    isError: false,
    error: undefined,
    refetch: vi.fn(),
    currentData: undefined,
    isFetching: false,
    isSuccess: false,
    isUninitialized: false,
    status: 'fulfilled',
    ...overrides,
  });

  beforeEach(() => {
    mockUseGetPokemonDetailsQuery.mockReturnValue(mockQueryResult());
  });

  it('does not render if pokemonId is missing', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<RightSide />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders details when pokemonId is present', async () => {
    mockUseGetPokemonDetailsQuery.mockReturnValue(
      mockQueryResult({
        data: pikachuMock,
        isSuccess: true,
      })
    );

    render(
      <MemoryRouter initialEntries={['/1/25']}>
        <Routes>
          <Route path="/:page/:pokemonId" element={<RightSide />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/PIKACHU/i)).toBeInTheDocument();
  });

  it('closes on button click', async () => {
    mockUseGetPokemonDetailsQuery.mockReturnValue(
      mockQueryResult({
        data: pikachuMock,
        isSuccess: true,
      })
    );

    render(
      <MemoryRouter initialEntries={['/1/25']}>
        <Routes>
          <Route path="/:page/:pokemonId" element={<RightSide />} />
          <Route path="/:page" element={<div>Back to list</div>} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/PIKACHU/i);
    fireEvent.click(screen.getByRole('button', { name: /close details/i }));
    expect(await screen.findByText(/back to list/i)).toBeInTheDocument();
  });
});
