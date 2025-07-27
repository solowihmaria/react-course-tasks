import styles from './Footer.module.css';

interface FooterProps {
  onTestError?: () => void;
}

export const Footer = ({ onTestError }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© 2025 Pokémon App - RS School</p>
        {onTestError && (
          <button
            onClick={onTestError}
            className={styles.errorButton}
            aria-label="Test error boundary"
          >
            Test Error Boundary
          </button>
        )}
      </div>
    </footer>
  );
};
