'use client';

import { useRouter } from 'next/navigation';
import { LeftSide } from '../../../components/LeftSide/LeftSide';
import styles from './layout.module.css';

// берём общий тип из src/types/types, а не из ./layout
import type { Pokemon } from '../../../types/types';

export default function TwoColumnLayout({
  pageNum,
  hasDetails,
  initialItems,
  initialTotalCount,
  pageSize,
  children,
}: {
  pageNum: number;
  hasDetails: boolean;
  initialItems: Pokemon[];
  initialTotalCount: number;
  pageSize: number;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleMainClick = () => {
    if (hasDetails) router.push(`/${pageNum}`); // позже переведём на createNavigation из next-intl
  };

  return (
    <>
      <div
        className={`${styles.leftContainer} ${hasDetails ? styles.withDetails : ''}`}
        onClick={handleMainClick}
      >
        <LeftSide
          currentPage={pageNum}
          initialItems={initialItems}
          initialTotalCount={initialTotalCount}
          pageSize={pageSize}
        />
      </div>

      <div className={styles.rightContainer}>{children}</div>
    </>
  );
}
