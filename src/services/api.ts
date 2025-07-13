import type { Pokemon, PokeApiResponse } from '../types/types';

class ApiService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  private getErrorMessage(status: number, searchTerm: string): string {
    const errorMessages: Record<number, string> = {
      400: 'Invalid request',
      401: 'Authentication required',
      403: 'Access forbidden',
      404: searchTerm ? `Pokémon "${searchTerm}" not found` : 'Data not found',
      500: 'Server error',
      502: 'Bad gateway',
      503: 'Service unavailable',
      504: 'Gateway timeout',
    };

    return errorMessages[status] || `Request failed with status ${status}`;
  }

  async fetchPokemonDetails(url: string): Promise<Pokemon> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(this.getErrorMessage(response.status, ''));
    }
    const data = await response.json();

    return {
      name: data.name,
      url: data.url,
      id: data.id,
      height: data.height,
      weight: data.weight,
      sprites: data.sprites,
      types: data.types,
    };
  }

  async fetchItems(searchTerm: string = ''): Promise<Pokemon[]> {
    const url = searchTerm
      ? `${this.baseUrl}/${searchTerm.toLowerCase().trim()}`
      : `${this.baseUrl}?limit=10`;

    try {
      // Для тестирования ошибок
      if (searchTerm === 'TEST_API_ERROR') {
        throw new Error('Simulated API error for testing');
      }

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404 && searchTerm) {
          return [];
        }
        throw new Error(this.getErrorMessage(response.status, searchTerm));
      }

      const data = await response.json();

      // Одиночный покемон
      if (searchTerm) {
        return [
          {
            name: data.name,
            url: `${this.baseUrl}/${data.id}`,
            id: data.id,
            height: data.height,
            weight: data.weight,
            sprites: data.sprites,
            types: data.types,
          },
        ];
      }

      // Список покемонов
      const listResponse = data as PokeApiResponse;
      const pokemons = await Promise.all(
        listResponse.results.map((pokemon) =>
          this.fetchPokemonDetails(pokemon.url)
        )
      );

      return pokemons;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
