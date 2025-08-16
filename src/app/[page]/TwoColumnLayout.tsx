'use client';

import { useRouter } from 'next/navigation';
import { LeftSide } from '../../components/LeftSide/LeftSide';
import styles from './layout.module.css';

export default function TwoColumnLayout({
  pageNum,
  hasDetails,
  children,
}: {
  pageNum: number;
  hasDetails: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleMainClick = () => {
    if (hasDetails) router.push(`/${pageNum}`);
  };

  return (
    <>
      <div
        className={`${styles.leftContainer} ${hasDetails ? styles.withDetails : ''}`}
        onClick={handleMainClick}
      >
        <LeftSide currentPage={pageNum} />
      </div>

      <div className={styles.rightContainer}>{children}</div>
    </>
  );
}
