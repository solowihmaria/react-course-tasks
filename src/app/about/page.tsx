import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>About Pokémon App</h1>

        <div className={styles.author}>
          <img
            src="https://github.com/solowihmaria.png"
            alt="Maria Solovykh"
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

export default AboutPage;
