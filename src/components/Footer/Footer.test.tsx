import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders footer with correct text', () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2025 Pokémon App - RS School/i)
    ).toBeInTheDocument();
  });
});
