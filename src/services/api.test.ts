import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiService } from './api';
import { pikachuMock } from '../test-utils/mockPokemon';

describe('apiService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches Pokemon details correctly', async () => {
    const mockResponse = {
      ok: true,
      json: async () => pikachuMock,
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse as Response));

    const result = await apiService.fetchPokemonDetails(
      'https://pokeapi.co/api/v2/pokemon/25'
    );
    expect(result).toEqual(pikachuMock);
  });

  it('fetches a single Pokemon by name', async () => {
    const mockResponse = {
      ok: true,
      json: async () => pikachuMock,
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse as Response));

    const result = await apiService.fetchItems('pikachu');
    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('pikachu');
  });

  it('returns empty array when Pokemon is not found (404)', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      json: async () => ({}),
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse as Response));

    const result = await apiService.fetchItems('notfound');
    expect(result.items).toEqual([]);
    expect(result.totalCount).toBe(0);
  });

  it('throws server error on 500', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: async () => ({}),
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse as Response));

    await expect(apiService.fetchItems('serverError')).rejects.toThrow(
      'Server error'
    );
  });

  it('throws simulated API error when searchTerm is TEST_API_ERROR', async () => {
    await expect(apiService.fetchItems('TEST_API_ERROR')).rejects.toThrow(
      'Simulated API error for testing'
    );
  });

  it('fetches list of Pokemon and calls fetchPokemonDetails', async () => {
    const listData = {
      count: 2,
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'minimal', url: 'https://pokeapi.co/api/v2/pokemon/999/' },
      ],
    };

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ ok: true, json: async () => listData })
        .mockResolvedValue({ ok: true, json: async () => pikachuMock })
    );

    const result = await apiService.fetchItems('', 1, 2);
    expect(result.items).toHaveLength(2);
    expect(result.totalCount).toBe(2);
  });
});
