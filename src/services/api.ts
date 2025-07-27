import type { Pokemon, PokeApiResponse } from '../types/types';

class ApiService {
  public baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

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

  async fetchItems(
    searchTerm: string = '',
    page: number = 1,
    limit: number = 8
  ): Promise<{
    items: Pokemon[];
    totalCount: number;
  }> {
    const offset = (page - 1) * limit;
    const url = searchTerm
      ? `${this.baseUrl}/${searchTerm.toLowerCase().trim()}`
      : `${this.baseUrl}?limit=${limit}&offset=${offset}`;

    try {
      if (searchTerm === 'TEST_API_ERROR') {
        throw new Error('Simulated API error for testing');
      }

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404 && searchTerm) {
          return { items: [], totalCount: 0 };
        }
        throw new Error(this.getErrorMessage(response.status, searchTerm));
      }

      const data = await response.json();

      if (searchTerm) {
        return {
          items: [
            {
              name: data.name,
              url: `${this.baseUrl}/${data.id}`,
              id: data.id,
              height: data.height,
              weight: data.weight,
              sprites: data.sprites,
              types: data.types,
            },
          ],
          totalCount: 1,
        };
      }

      const listResponse = data as PokeApiResponse;
      const pokemons = await Promise.all(
        listResponse.results.map((pokemon) =>
          this.fetchPokemonDetails(pokemon.url)
        )
      );

      return {
        items: pokemons,
        totalCount: listResponse.count,
      };
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
