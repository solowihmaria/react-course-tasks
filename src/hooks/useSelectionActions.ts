import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearAll } from '../store/slices/selectionSlice';
import type { Pokemon } from '../types/types';

export const useSelectionActions = () => {
  const dispatch = useAppDispatch();
  const { selectedPokemons, selectedIds } = useAppSelector(
    (state) => state.selection
  );
  const selectedCount = Object.keys(selectedIds).length;

  const convertToCSV = (pokemons: Pokemon[]): string => {
    const headers =
      'Name,ID,Types,Height (m),Weight (kg),Image URL,Details URL\n';
    const rows = pokemons
      .map(
        (p) =>
          `"${p.name}",${p.id},"${p.types?.map((t) => t.type.name).join(' | ') || 'Unknown'}",` +
          `${(p.height || 0) / 10},${(p.weight || 0) / 10},` +
          `"${p.sprites?.front_default || ''}","https://pokeapi.co/api/v2/pokemon/${p.id}"\n`
      )
      .join('');
    return headers + rows;
  };

  const downloadCSV = (csvData: string, filename: string) => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    const csvData = convertToCSV(selectedPokemons);
    downloadCSV(csvData, `${selectedCount}_pokemons.csv`);
  };

  const handleClearAll = () => {
    dispatch(clearAll());
  };

  return {
    selectedCount,
    selectedPokemons,
    handleDownload,
    handleClearAll,
  };
};
