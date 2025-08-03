import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../../types/types';

interface SelectionState {
  selectedIds: Record<number, boolean>;
  selectedPokemons: Pokemon[];
}

const initialState: SelectionState = {
  selectedIds: {},
  selectedPokemons: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    togglePokemon: (state, action: PayloadAction<Pokemon>) => {
      const pokemon = action.payload;
      const id = pokemon.id ?? 0;

      if (state.selectedIds[id]) {
        const { [id]: _, ...restIds } = state.selectedIds; // eslint-disable-line @typescript-eslint/no-unused-vars
        state.selectedIds = restIds;
        state.selectedPokemons = state.selectedPokemons.filter(
          (p) => p.id !== id
        );
      } else {
        state.selectedIds = { ...state.selectedIds, [id]: true };
        state.selectedPokemons = [...state.selectedPokemons, pokemon];
      }
    },
    clearAll: (state) => {
      state.selectedIds = {};
      state.selectedPokemons = [];
    },
  },
});

export const { togglePokemon, clearAll } = selectionSlice.actions;
export default selectionSlice.reducer;
