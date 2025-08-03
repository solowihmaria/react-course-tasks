import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeProvider';

describe('Layout Component', () => {
  it('renders header, footer and outlet content', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Test Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2025 pokémon app/i)).toBeInTheDocument();
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });
});
