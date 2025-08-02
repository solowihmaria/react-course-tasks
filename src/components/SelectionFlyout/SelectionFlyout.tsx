import styles from './SelectionFlyout.module.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { clearAll } from '../../store/slices/selectionSlice';

export const SelectionFlyout = () => {
  const selectedIds = useAppSelector((state) => state.selection.selectedIds);
  const dispatch = useAppDispatch();

  const selectedCount = Object.keys(selectedIds).length;

  if (selectedCount === 0) return null;

  return (
    <div className={styles.flyout}>
      <div className={styles.flyoutContent}>
        <span className={styles.counter}>
          {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
        </span>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => dispatch(clearAll())}
            aria-label="Unselect all"
          >
            Unselect All
          </button>

          <button
            className={`${styles.button} ${styles.downloadButton}`}
            onClick={() => console.log('Download clicked')} // пока заглушка
            aria-label="Download selected"
          >
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};
