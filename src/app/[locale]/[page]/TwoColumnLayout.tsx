'use client';

import { useParams } from 'next/navigation';
import { LeftSide } from '../../../components/LeftSide/LeftSide';
import styles from './layout.module.css';
import type { Pokemon } from '../../../types/types';

export default function TwoColumnLayout({
  pageNum,
  initialItems,
  initialTotalCount,
  pageSize,
  children,
}: {
  pageNum: number;
  initialItems: Pokemon[];
  initialTotalCount: number;
  pageSize: number;
  children: React.ReactNode;
}) {
  const params = useParams();
  const hasDetails = !!params?.pokemonId;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.leftContainer} ${hasDetails ? styles.withDetails : ''}`}
      >
        <LeftSide
          currentPage={pageNum}
          initialItems={initialItems}
          initialTotalCount={initialTotalCount}
          pageSize={pageSize}
        />
      </div>

      <div
        className={`${styles.rightContainer} ${hasDetails ? styles.withDetails : ''}`}
      >
        {hasDetails && children}
      </div>
    </div>
  );
}
