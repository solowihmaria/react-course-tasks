import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.css';
import { useState } from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [forceError, setForceError] = useState(false);

  const throwTestError = () => {
    setForceError(true);
  };

  if (forceError) {
    throw new Error('Test Error Boundary');
  }

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer onTestError={throwTestError} />
    </div>
  );
};
