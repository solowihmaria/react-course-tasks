import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Pokemon,
  PokeApiResponse,
  PokemonSprites,
  PokemonType,
} from '../../types/types';

interface PokemonDetailsResponse {
  name: string;
  url: string;
  id: number;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon'],

  endpoints: (builder) => ({
    getPokemons: builder.query<
      { items: Pokemon[]; totalCount: number },
      { page: number; searchTerm?: string; limit?: number }
    >({
      query: ({ page, searchTerm, limit = 8 }) => {
        const offset = (page - 1) * limit;
        return searchTerm
          ? `pokemon/${searchTerm.toLowerCase().trim()}`
          : `pokemon?limit=${limit}&offset=${offset}`;
      },

      transformResponse: (
        response: PokeApiResponse | PokemonDetailsResponse,
        _,
        arg
      ) => {
        if (arg.searchTerm) {
          const pokemon = response as PokemonDetailsResponse;
          return {
            items: [
              {
                name: pokemon.name,
                url: pokemon.url,
                id: pokemon.id,
                sprites: pokemon.sprites,
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types,
              },
            ],
            totalCount: 1,
          };
        }

        const list = response as PokeApiResponse;
        return {
          items: list.results.map((p) => {
            const id = parseInt(p.url.split('/').slice(-2, -1)[0], 10);
            return {
              name: p.name,
              url: p.url,
              id,
              sprites: {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
              },
              height: 0,
              weight: 0,
              types: [],
            };
          }),
          totalCount: list.count,
        };
      },

      providesTags: (result) => {
        const tags: { type: 'Pokemon'; id: string | number }[] = [
          { type: 'Pokemon', id: 'LIST' },
        ];

        if (result) {
          tags.push(
            ...result.items.map(({ id }) => ({ type: 'Pokemon' as const, id }))
          );
        }

        return tags;
      },
    }),

    getPokemonDetails: builder.query<Pokemon, number>({
      query: (id) => `pokemon/${id}`,

      transformResponse: (response: PokemonDetailsResponse): Pokemon => ({
        name: response.name,
        url: response.url,
        id: response.id,
        height: response.height,
        weight: response.weight,
        sprites: response.sprites,
        types: response.types,
      }),

      providesTags: (_, __, id) => [{ type: 'Pokemon', id }],
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = pokemonApi;
