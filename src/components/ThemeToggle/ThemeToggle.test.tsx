import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';
import { vi } from 'vitest';
import type { Mock } from 'vitest';

import { useTheme } from '../../contexts/useTheme';
vi.mock('../../contexts/useTheme');

describe('ThemeToggle', () => {
  it('calls toggleTheme on click', async () => {
    const toggleThemeMock = vi.fn();

    (useTheme as Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', {
      name: /switch to light mode/i,
    });

    await userEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
