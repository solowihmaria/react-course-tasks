import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RightSide } from './RightSide';
import { apiService } from '../../../../services/api';
import { pikachuMock } from '../../../../test-utils/mockPokemon';

vi.mock('../../../../services/api', () => ({
  apiService: {
    baseUrl: 'https://pokeapi.co/api/v2/pokemon',
    fetchPokemonDetails: vi.fn(),
  },
}));

describe('RightSide component', () => {
  const mockFetchDetails = apiService.fetchPokemonDetails as jest.Mock;

  beforeEach(() => {
    vi.restoreAllMocks();
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
    mockFetchDetails.mockResolvedValue(pikachuMock);

    render(
      <MemoryRouter initialEntries={['/1/25']}>
        <Routes>
          <Route path="/:page/:pokemonId" element={<RightSide />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });

  it('closes on button click', async () => {
    mockFetchDetails.mockResolvedValue(pikachuMock);

    render(
      <MemoryRouter initialEntries={['/1/25']}>
        <Routes>
          <Route path="/:page/:pokemonId" element={<RightSide />} />
          <Route path="/:page" element={<div>Back to list</div>} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/pikachu/i);
    fireEvent.click(screen.getByRole('button'));

    await screen.findByText(/back to list/i);
  });
});
