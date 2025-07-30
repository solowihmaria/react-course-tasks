import { Outlet, useParams, useNavigate, Navigate } from 'react-router-dom';
import { LeftSide } from './parts/LeftSide/LeftSide';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const { page, pokemonId } = useParams();
  const navigate = useNavigate();
  const pageNum = Number(page);

  const MAX_PAGE = 163;

  const isValidPage =
    !isNaN(pageNum) &&
    Number.isInteger(pageNum) &&
    pageNum > 0 &&
    pageNum <= MAX_PAGE;

  const isValidPokemonId =
    !pokemonId ||
    (!isNaN(Number(pokemonId)) && Number.isInteger(Number(pokemonId)));

  if (!isValidPage || !isValidPokemonId) {
    return <Navigate to="/404" replace />;
  }

  const handleMainClick = () => {
    if (pokemonId) {
      navigate(`/${page}`);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.leftContainer} ${pokemonId ? styles.withDetails : ''}`}
        onClick={handleMainClick}
      >
        <LeftSide currentPage={pageNum} />
      </div>
      <Outlet />
    </div>
  );
};
