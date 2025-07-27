import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage Component', () => {
  it('renders title, description and links', () => {
    render(<AboutPage />);

    expect(screen.getByText(/about pokémon app/i)).toBeInTheDocument();
    expect(
      screen.getByText(/this application was created/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /visit rs school react course/i })
    ).toBeInTheDocument();

    expect(screen.getByText('Maria Solovykh')).toBeInTheDocument();
    expect(screen.getByText('@solowihmaria')).toBeInTheDocument();

    const avatar = screen.getByAltText('Maria Solovykh');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute(
      'src',
      'https://github.com/solowihmaria.png'
    );

    const githubLink = screen.getByRole('link', { name: '@solowihmaria' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/solowihmaria'
    );
  });
});
