import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearAll } from '../store/slices/selectionSlice';

export const useSelectionActions = () => {
  const dispatch = useAppDispatch();
  const { selectedPokemons, selectedIds } = useAppSelector(
    (state) => state.selection
  );
  const selectedCount = Object.keys(selectedIds).length;

  const handleDownload = async () => {
    if (selectedCount === 0) return;

    const res = await fetch('/api/csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pokemons: selectedPokemons }),
    });

    if (!res.ok) {
      console.error('CSV generation failed');
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCount}_pokemons.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
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
