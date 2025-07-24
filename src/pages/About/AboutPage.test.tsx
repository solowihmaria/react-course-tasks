import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage Component', () => {
  it('renders title, description and link', () => {
    render(<AboutPage />);

    expect(screen.getByText(/about pokémon app/i)).toBeInTheDocument();
    expect(
      screen.getByText(/this application was created/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /visit rs school react course/i })
    ).toBeInTheDocument();
  });
});
