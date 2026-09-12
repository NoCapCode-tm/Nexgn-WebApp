import React from 'react';
import styles from './Skeleton.module.css';

export function Skeleton({ width = '100%', height = '16px', borderRadius, style = {}, className = '' }) {
  return (
    <span
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        ...(borderRadius ? { borderRadius } : {}),
        ...style,
      }}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className={styles.statCardSkeleton}>
      <Skeleton width="40%" height="14px" style={{ marginBottom: '14px' }} />
      <Skeleton width="60%" height="36px" style={{ marginBottom: '18px' }} />
      <Skeleton width="50%" height="12px" />
    </div>
  );
}

export function TableRowSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={styles.tableRowSkeleton}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Skeleton width="20px" height="20px" borderRadius="4px" />
            <Skeleton width="70%" height="14px" />
          </div>
          <Skeleton width="60%" height="14px" className={styles.hideOnTablet} />
          <Skeleton width="45%" height="14px" className={styles.hideOnTablet} />
          <Skeleton width="55%" height="14px" className={styles.hideOnTablet} />
          <Skeleton width="50px" height="20px" borderRadius="12px" />
          <Skeleton width="65%" height="14px" />
          <Skeleton width="24px" height="24px" borderRadius="4px" style={{ justifySelf: 'end' }} />
        </div>
      ))}
    </>
  );
}