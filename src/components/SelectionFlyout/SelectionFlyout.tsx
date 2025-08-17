'use client';

import { useTranslations } from 'next-intl';
import styles from './SelectionFlyout.module.css';
import { useSelectionActions } from '../../hooks/useSelectionActions';

export const SelectionFlyout = () => {
  const t = useTranslations('SelectionFlyout');
  const { selectedCount, handleDownload, handleClearAll } =
    useSelectionActions();

  if (selectedCount === 0) return null;

  return (
    <div className={styles.flyout}>
      <div className={styles.flyoutContent}>
        <span className={styles.counter}>
          {t('selected', { count: selectedCount })}
        </span>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={handleClearAll}
            aria-label={t('ariaUnselectAll')}
          >
            {t('unselectAll')}
          </button>

          <button
            className={`${styles.button} ${styles.downloadButton}`}
            onClick={handleDownload}
            aria-label={t('ariaDownload')}
          >
            {t('download')}
          </button>
        </div>
      </div>
    </div>
  );
};
