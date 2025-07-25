import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import { pikachuMock, minimalPokemonMock } from '../../test-utils/mockPokemon';

describe('CardList Component', () => {
  it('shows loading spinner when isLoading=true', () => {
    render(<CardList items={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when error occurs', () => {
    const errorMsg = 'API Error 404';
    render(<CardList items={[]} isLoading={false} error={errorMsg} />);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  it('shows "No Pokémon found" for empty list', () => {
    render(<CardList items={[]} isLoading={false} error={null} />);
    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    const items = [pikachuMock, minimalPokemonMock];
    render(<CardList items={items} isLoading={false} error={null} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
