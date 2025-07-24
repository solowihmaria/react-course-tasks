import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>About Pokémon App</h1>

        <p className={styles.description}>
          This application was created as part of the RS School React course. It
          uses the PokéAPI to display Pokémon information in a fun, interactive
          way.
        </p>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Visit RS School React Course
        </a>
      </div>
    </div>
  );
};
