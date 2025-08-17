'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './AboutPage.module.css';

export const AboutPage = () => {
  const t = useTranslations('About');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('title')}</h1>

        <div className={styles.author}>
          <Image
            src="https://github.com/solowihmaria.png"
            alt="Maria Solovykh"
            width={64}
            height={64}
            className={styles.avatar}
          />
          <div>
            <h3 className={styles.authorName}>Maria Solovykh</h3>
            <a
              href="https://github.com/solowihmaria"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              @solowihmaria
            </a>
          </div>
        </div>

        <p className={styles.description}>{t('description')}</p>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {t('link')}
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
