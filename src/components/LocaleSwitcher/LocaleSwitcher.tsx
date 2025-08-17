'use client';

import { useRouter } from '../../i18n/navigation';
import { usePathname } from '../../i18n/navigation';
import { routing } from '../../i18n/routing';
import styles from './LocaleSwitcher.module.css';
import { useLocale } from 'next-intl';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLocaleChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return (
    <div className={styles.switcher} data-locale={currentLocale}>
      {routing.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={styles.localeButton}
          aria-label={`Switch to ${locale} language`}
          data-active={locale === currentLocale}
        >
          {locale.toUpperCase()}
        </button>
      ))}
      <div className={styles.thumb} />
    </div>
  );
};
