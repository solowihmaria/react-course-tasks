import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SelectionState {
  selectedIds: Record<number, boolean>;
}

const initialState: SelectionState = {
  selectedIds: {},
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    togglePokemon: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const { [id]: _, ...rest } = state.selectedIds; // eslint-disable-line @typescript-eslint/no-unused-vars

      if (state.selectedIds[id]) {
        state.selectedIds = rest;
      } else {
        state.selectedIds = { ...rest, [id]: true };
      }
    },
    clearAll: (state) => {
      state.selectedIds = {};
    },
  },
});

export const { togglePokemon, clearAll } = selectionSlice.actions;
export default selectionSlice.reducer;
