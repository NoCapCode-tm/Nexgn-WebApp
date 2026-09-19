import React from "react";
import { Ban } from "lucide-react";
import styles from "./Overlay.module.css";

export default function RevokedOverlay({ onReturnHome }) {
  return (
    <div className={styles.overlayBackdrop}>
      <div className={styles.overlayCard}>
        <div className={`${styles.iconWrapper} ${styles.revoked}`}>
          <Ban size={28} strokeWidth={2} />
        </div>
        
        <h2 className={styles.title}>Document Unavailable</h2>
        
        <p className={styles.description}>
          The sender has revoked or canceled this signature request. 
          You no longer have access to view or sign this document. If you believe this is an error, please contact the sender.
        </p>

        <div className={styles.buttonGroup}>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onReturnHome}>
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}