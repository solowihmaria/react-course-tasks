'use client';

import { useTranslations } from 'next-intl';
import styles from './Loader.module.css';

export const Loader = () => {
  const t = useTranslations('Loader');

  return (
    <div
      className={styles.loader}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.text}>{t('loading')}</p>
    </div>
  );
};
