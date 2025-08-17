'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import styles from './Header.module.css';

export const Header = () => {
  const t = useTranslations('Header');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <Link href="/1" className={styles.link}>
            {t('home')}
          </Link>
          <Link href="/about" className={styles.link}>
            {t('about')}
          </Link>
        </div>

        <div className={styles.navControls}>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
