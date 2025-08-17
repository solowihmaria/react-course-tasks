'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const t = useTranslations('NotFound');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        <div className={styles.pokeball}>
          <div className={styles.top}></div>
          <div className={styles.bottom}></div>
          <div className={styles.center}></div>
        </div>

        <p className={styles.message}>{t('message')}</p>

        <Link href="/1" className={styles.homeLink}>
          {t('back')}
        </Link>
      </div>
    </div>
  );
};
