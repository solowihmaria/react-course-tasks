import type { Pokemon, PokeApiResponse } from '../types/types';

class ApiService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  async fetchPokemonDetails(url: string): Promise<Pokemon> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
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
      : `${this.baseUrl}?limit=20`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404 && searchTerm) return [];
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Одиночный покемон(подробная инфа)
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
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
