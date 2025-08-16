import { notFound } from 'next/navigation';
import { LeftSide } from '../../components/LeftSide/LeftSide';
import styles from './MainPage.module.css';

type Props = {
  params: { page: string };
};

const MAX_PAGE = 163;

export default function Page({ params }: Props) {
  const pageNum = Number(params.page);

  const isValidPage =
    !isNaN(pageNum) &&
    Number.isInteger(pageNum) &&
    pageNum > 0 &&
    pageNum <= MAX_PAGE;

  if (!isValidPage) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <LeftSide currentPage={pageNum} />
      </div>
    </div>
  );
}
