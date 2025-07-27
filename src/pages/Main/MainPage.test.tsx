import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './MainPage';

describe('MainPage', () => {
  it('renders LeftSide by default without details', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('renders RightSide when pokemonId is present', () => {
    render(
      <MemoryRouter initialEntries={['/1/25']}>
        <Routes>
          <Route path="/:page/:pokemonId" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('button', { name: /close details/i })
    ).toBeInTheDocument();
  });
});
