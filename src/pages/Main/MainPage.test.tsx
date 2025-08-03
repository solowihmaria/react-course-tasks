import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { MainPage } from './MainPage';
import { RightSide } from './parts/RightSide/RightSide';
import { ThemeProvider } from '../../contexts/ThemeProvider';

describe('MainPage', () => {
  const renderWithProviders = (initialEntries: string[]) => {
    return render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route path="/:page" element={<MainPage />}>
                <Route path=":pokemonId" element={<RightSide />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it('renders LeftSide by default without details', () => {
    renderWithProviders(['/1']);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('renders RightSide when pokemonId is present', () => {
    renderWithProviders(['/1/25']);
    expect(
      screen.getByRole('button', { name: /close details/i })
    ).toBeInTheDocument();
  });
});
