import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
      <p>Loading...</p>
    </div>
  );
};
