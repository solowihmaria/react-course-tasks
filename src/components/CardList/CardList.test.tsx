import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { CardList } from './CardList';
import { pikachuMock, minimalPokemonMock } from '../../test-utils/mockPokemon';

const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('CardList Component', () => {
  it('shows loading spinner when isLoading=true', () => {
    renderWithProviders(<CardList items={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when error occurs', () => {
    const errorMsg = 'API Error 404';
    renderWithProviders(
      <CardList items={[]} isLoading={false} error={errorMsg} />
    );
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  it('shows "No Pokémon found" for empty list', () => {
    renderWithProviders(<CardList items={[]} isLoading={false} error={null} />);
    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    const items = [pikachuMock, minimalPokemonMock];
    renderWithProviders(
      <CardList items={items} isLoading={false} error={null} />
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
