import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { apiService } from './services/api';
import { pikachuMock } from './test-utils/mockPokemon';

vi.mock('./services/api', async () => {
  const actual =
    await vi.importActual<typeof import('./services/api')>('./services/api');
  return {
    ...actual,
    apiService: {
      fetchItems: vi.fn(),
    },
  };
});

describe('App Component', () => {
  const mockFetchItems = apiService.fetchItems as jest.Mock;

  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('renders one card on successful fetch', async () => {
    mockFetchItems.mockResolvedValueOnce({
      items: [pikachuMock],
      totalCount: 1,
    });

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockFetchItems).toHaveBeenCalled();
    });

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('shows error when API fails', async () => {
    mockFetchItems.mockRejectedValueOnce(new Error('Something went wrong'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('calls fetch again when user searches', async () => {
    mockFetchItems.mockResolvedValue({
      items: [pikachuMock],
      totalCount: 1,
    });

    render(<App />);

    await waitFor(() => {
      expect(mockFetchItems).toHaveBeenCalled();
    });

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFetchItems).toHaveBeenCalledTimes(2);
    });
  });

  it('renders fallback UI when error is thrown (ErrorBoundary)', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFetchItems.mockResolvedValue({
      items: [],
      totalCount: 0,
    });

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    const button = screen.getByText(/test error/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
