import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './MainPage';
import { RightSide } from './parts/RightSide/RightSide';
import { ThemeProvider } from '../../contexts/ThemeProvider';

describe('MainPage', () => {
  it('renders LeftSide by default without details', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path="/:page" element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('renders RightSide when pokemonId is present', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/1/25']}>
          <Routes>
            <Route path="/:page" element={<MainPage />}>
              <Route path=":pokemonId" element={<RightSide />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(
      screen.getByRole('button', { name: /close details/i })
    ).toBeInTheDocument();
  });
});
