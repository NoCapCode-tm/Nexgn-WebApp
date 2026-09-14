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

// 1. Contact Card Skeleton
export function ContactCardSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '0 20px', height: '64px', border: '1px solid #e4e4e4', borderRadius: '18px', background: '#fff', marginBottom: '14px' }}>
          <Skeleton width="40px" height="40px" borderRadius="50%" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton width="140px" height="16px" />
            <Skeleton width="180px" height="12px" />
          </div>
          <Skeleton width="24px" height="24px" borderRadius="50%" />
        </div>
      ))}
    </>
  );
}

// 2. Document Viewer Skeleton (3-pane layout)
export function DocumentViewerSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8F9FA' }}>
      <header style={{ height: '60px', padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <Skeleton width="300px" height="24px" />
      </header>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <aside style={{ width: '240px', padding: '20px', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Skeleton width="80px" height="16px" />
          <Skeleton width="100%" height="220px" borderRadius="8px" />
          <Skeleton width="100%" height="220px" borderRadius="8px" />
        </aside>
        <main style={{ flex: 1, padding: '32px', display: 'flex', justifyContent: 'center' }}>
          <Skeleton width="100%" maxWidth="800px" height="100%" borderRadius="8px" />
        </main>
        <aside style={{ width: '320px', padding: '24px', borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <Skeleton width="80px" height="14px" style={{ marginBottom: '12px' }} />
            <Skeleton width="100%" height="40px" borderRadius="6px" />
          </div>
          <div>
            <Skeleton width="60px" height="14px" style={{ marginBottom: '12px' }} />
            <Skeleton width="100%" height="56px" borderRadius="6px" style={{ marginBottom: '12px' }} />
            <Skeleton width="100%" height="56px" borderRadius="6px" />
          </div>
        </aside>
      </div>
    </div>
  );
}