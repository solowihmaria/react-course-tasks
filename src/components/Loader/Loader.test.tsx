import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader Component', () => {
  it('shows loading text', () => {
    render(<Loader />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
