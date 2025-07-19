import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import {
  pikachuMock,
  pikachuWithoutImageMock,
} from '../../test-utils/mockPokemon';

describe('Card Component', () => {
  it('shows pokemon name and types in compact mode', () => {
    render(<Card item={pikachuMock} compact={true} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('electric, mouse')).toBeInTheDocument();
  });

  it('shows detailed info when not compact', () => {
    render(<Card item={pikachuMock} compact={false} />);
    expect(screen.getByText('PIKACHU')).toBeInTheDocument();
    expect(screen.getByText('Height: 4m')).toBeInTheDocument();
    expect(screen.getByText('Weight: 6kg')).toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    render(<Card item={pikachuWithoutImageMock} compact={true} />);
    const image = screen.getByAltText('pikachu');
    expect(image).toHaveAttribute('src', '/placeholder-pokemon.png');
  });
});
