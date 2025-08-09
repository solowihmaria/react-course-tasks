export const useApiError = () => {
  const getErrorMessage = (error: unknown): string => {
    if (!error || typeof error !== 'object') return '';

    const err = error as {
      status?: number | string;
      originalStatus?: number;
      data?: unknown;
      error?: string;
    };

    if (err.status === 'PARSING_ERROR') {
      if (err.originalStatus === 404) return 'Pokémon not found';
      if (err.originalStatus === 400) return 'Bad request';
      if (err.originalStatus && err.originalStatus >= 500)
        return 'Server error';
      return 'Unexpected response format';
    }

    if (err.status === 'FETCH_ERROR')
      return 'Network error — please check your connection';
    if (typeof err.status === 'number') return `Error: ${err.status}`;

    return 'Unexpected error';
  };

  return { getErrorMessage };
};
