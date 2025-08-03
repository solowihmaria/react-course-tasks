import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
