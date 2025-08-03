import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectionFlyout } from './SelectionFlyout';
import { vi } from 'vitest';
import type { Mock } from 'vitest';

import { useSelectionActions } from '../../hooks/useSelectionActions';
vi.mock('../../hooks/useSelectionActions');

describe('SelectionFlyout', () => {
  it('does not render if selectedCount is 0', () => {
    (useSelectionActions as Mock).mockReturnValue({
      selectedCount: 0,
      handleClearAll: vi.fn(),
      handleDownload: vi.fn(),
    });

    const { container } = render(<SelectionFlyout />);
    expect(container.firstChild).toBeNull();
  });

  it('renders flyout and calls handlers on button click', async () => {
    const handleClearAll = vi.fn();
    const handleDownload = vi.fn();

    (useSelectionActions as Mock).mockReturnValue({
      selectedCount: 2,
      handleClearAll,
      handleDownload,
    });

    render(<SelectionFlyout />);

    expect(screen.getByText(/2 pokemons selected/i)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /Unselect all/i })
    );
    await userEvent.click(
      screen.getByRole('button', { name: /Download selected/i })
    );

    expect(handleClearAll).toHaveBeenCalledTimes(1);
    expect(handleDownload).toHaveBeenCalledTimes(1);
  });
});
