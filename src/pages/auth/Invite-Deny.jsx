import React from "react";
import styles from "./Invite-Deny.module.css";
import AuthLayout from "../../components/layout/AuthLayout";

export default function InviteDeny() {
  return (
    <AuthLayout>
      <div className={styles.contentWrap}>
        <h1 className={styles.title}>Got it.</h1>
        <p className={styles.subtitle}>
          You have chosen not to register into<br />
          Nexgn. We respect your decision and<br />
          appreciate your consideration.
        </p>
      </div>
    </AuthLayout>
  );
}