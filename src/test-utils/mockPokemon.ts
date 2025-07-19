import type { Pokemon } from '../types/types';

export const pikachuMock: Pokemon = {
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon/25/',
  types: [
    {
      slot: 1,
      type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
    },
    {
      slot: 2,
      type: { name: 'mouse', url: 'https://pokeapi.co/api/v2/type/999/' },
    },
  ],
  sprites: {
    front_default: 'pikachu.png',
    front_shiny: 'pikachu-shiny.png',
  },
  height: 40,
  weight: 60,
  id: 25,
};

// Мок для случая с отсутствующим изображением
export const pikachuWithoutImageMock: Pokemon = {
  ...pikachuMock,
  sprites: {
    front_default: '',
    front_shiny: '',
  },
};

// Минимальный мок для негативных тестов
export const minimalPokemonMock: Pokemon = {
  name: 'minimal',
  url: '',
  sprites: {
    front_default: '',
    front_shiny: '',
  },
  types: [],
  height: 0,
  weight: 0,
};
