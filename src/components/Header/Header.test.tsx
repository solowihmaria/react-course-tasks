import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeProvider';

describe('Header Component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
    expect(aboutLink.getAttribute('href')).toBe('/about');
  });
});
