import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockReset();
  });

  it('renders input and button', () => {
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('shows initial value', () => {
    render(<Search onSearch={mockOnSearch} initialValue="pikachu" />);
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'charizard' } });
    expect(input).toHaveValue('charizard');
  });

  it('triggers search on button click', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(mockOnSearch).toHaveBeenCalledWith('bulbasaur');
  });

  it('disables button when empty', () => {
    render(<Search onSearch={mockOnSearch} />);
    const button = screen.getByRole('button', { name: 'Search' });

    expect(button).toBeDisabled();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'a' } });

    expect(button).toBeEnabled();
  });
});
