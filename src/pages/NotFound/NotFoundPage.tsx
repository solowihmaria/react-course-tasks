import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Page Not Found</p>
        <div className={styles.pokeball}>
          <div className={styles.top}></div>
          <div className={styles.bottom}></div>
          <div className={styles.center}></div>
        </div>
        <p className={styles.message}>
          The Pokémon you&apos;re looking for fled away!
        </p>
        <a href="/" className={styles.homeLink}>
          Back to Pokédex
        </a>
      </div>
    </div>
  );
};
