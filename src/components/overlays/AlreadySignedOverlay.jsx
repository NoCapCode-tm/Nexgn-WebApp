import React from "react";
import { CheckCircle2 } from "lucide-react";
import styles from "./Overlay.module.css";

export default function AlreadySignedOverlay({ onViewDocument, onReturnHome }) {
  return (
    <div className={styles.overlayBackdrop}>
      <div className={styles.overlayCard}>
        <div className={`${styles.iconWrapper} ${styles.success}`}>
          <CheckCircle2 size={28} strokeWidth={2} />
        </div>
        
        <h2 className={styles.title}>Already Signed</h2>
        
        <p className={styles.description}>
          Our records indicate that you have already successfully signed this document. 
          No further action is required on your part.
        </p>

        <div className={styles.buttonGroup}>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onViewDocument}>
            View Signed Document
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onReturnHome}>
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}