export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  front_shiny?: string;
}

export interface Pokemon {
  name: string;
  url: string;
  id?: number;
  sprites?: PokemonSprites;
  height?: number;
  weight?: number;
  types?: PokemonType[];
}

export interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
