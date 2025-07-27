import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage Component', () => {
  it('renders 404 and message', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/the pokémon you're looking for fled away/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/back to pokédex/i)).toBeInTheDocument();
  });
});
