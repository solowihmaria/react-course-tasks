import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardList } from './CardList';
import { pikachuMock, minimalPokemonMock } from '../../test-utils/mockPokemon';

describe('CardList Component', () => {
  const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
  };

  it('shows loading spinner when isLoading=true', () => {
    renderWithRouter(<CardList items={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when error occurs', () => {
    const errorMsg = 'API Error 404';
    renderWithRouter(
      <CardList items={[]} isLoading={false} error={errorMsg} />
    );
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  it('shows "No Pokémon found" for empty list', () => {
    renderWithRouter(<CardList items={[]} isLoading={false} error={null} />);
    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    const items = [pikachuMock, minimalPokemonMock];
    renderWithRouter(<CardList items={items} isLoading={false} error={null} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
