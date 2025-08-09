import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from './slices/selectionSlice';
import { pokemonApi } from './slices/pokemonApi';

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
