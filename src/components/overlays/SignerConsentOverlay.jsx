import React from "react";
import { ShieldCheck } from "lucide-react";
import styles from "./Overlay.module.css";

export default function SignerConsentOverlay({ onAccept}) {
  return (
    <div className={styles.overlayBackdrop}>
      <div className={styles.overlayCard}>
        <div className={`${styles.iconWrapper} ${styles.consent}`}>
          <ShieldCheck size={28} strokeWidth={2} />
        </div>
        
        <h2 className={styles.title}>Data Collection Consent</h2>
        
        <p className={styles.description}>
          To ensure the legal validity and security of this document, we collect 
          telemetry data (such as IP address and timestamp) to generate a secure Audit Certificate. 
          <br /><br />
          <strong>Note:</strong> Consenting to this data collection <strong>does not</strong> mean you are signing the document. You can still review the document and decline to sign it later.
        </p>

        <div className={`${styles.buttonGroup} ${styles.row}`}>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onAccept}>
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}