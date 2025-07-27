import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { LeftSide } from './parts/LeftSide/LeftSide';
import { RightSide } from './parts/RightSide/RightSide';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const { page, pokemonId } = useParams();
  const navigate = useNavigate();
  const hasDetails = !!pokemonId;

  const handleMainClick = () => {
    if (pokemonId) {
      navigate(`/${page}`);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.leftContainer} ${hasDetails ? styles.withDetails : ''}`}
        onClick={handleMainClick}
      >
        <LeftSide currentPage={Number(page)} />
        <Outlet /> {/* RightSide появляется при наличии pokemonId */}
      </div>
      {hasDetails && <RightSide />}
    </div>
  );
};
