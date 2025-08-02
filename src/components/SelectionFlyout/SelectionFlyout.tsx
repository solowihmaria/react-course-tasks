import styles from './SelectionFlyout.module.css';
import { useSelectionActions } from '../../hooks/useSelectionActions';

export const SelectionFlyout = () => {
  const { selectedCount, handleDownload, handleClearAll } =
    useSelectionActions();

  if (selectedCount === 0) return null;

  return (
    <div className={styles.flyout}>
      <div className={styles.flyoutContent}>
        <span className={styles.counter}>
          {selectedCount} {selectedCount === 1 ? 'pokemon' : 'pokemons'}{' '}
          selected
        </span>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={handleClearAll}
            aria-label="Unselect all"
          >
            Unselect All
          </button>

          <button
            className={`${styles.button} ${styles.downloadButton}`}
            onClick={handleDownload}
            aria-label="Download selected"
          >
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};
