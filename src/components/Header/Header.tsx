import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/about" className={styles.link}>
          About
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
};
