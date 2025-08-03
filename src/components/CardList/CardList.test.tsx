import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CardList } from './CardList';
import { pikachuMock, minimalPokemonMock } from '../../test-utils/mockPokemon';
import { configureStore } from '@reduxjs/toolkit';
import selectionReducer, {
  togglePokemon,
} from '../../store/slices/selectionSlice';

const mockDispatch = vi.fn();
vi.mock('../../store/hooks', async () => {
  const actual =
    await vi.importActual<typeof import('../../store/hooks')>(
      '../../store/hooks'
    );
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
  };
});

const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => {
  const store = configureStore({
    reducer: {
      selection: selectionReducer,
    },
    preloadedState: {
      selection: {
        selectedIds: {},
        selectedPokemons: [],
      },
    },
  });

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

  it('calls togglePokemon when checkbox is clicked', async () => {
    renderWithProviders(
      <CardList items={[pikachuMock]} isLoading={false} error={null} />
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(togglePokemon(pikachuMock));
  });

  it('navigates to detail page on card click', async () => {
    renderWithProviders(
      <CardList items={[pikachuMock]} isLoading={false} error={null} />,
      { route: '/1' }
    );

    const card = screen.getByRole('button');
    await userEvent.click(card);
  });
});
