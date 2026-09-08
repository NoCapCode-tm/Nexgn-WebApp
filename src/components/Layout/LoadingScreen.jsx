import React from "react";
import { ThinkingOrb } from "thinking-orbs";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({
  state = "working",
  size = 64,
  speed,
  theme = "light",
  message
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div className={styles.orbWrapper}>
          <ThinkingOrb
            state={state}
            size={size}
            theme={theme}
            {...(speed !== undefined ? { speed } : {})}
          />
        </div>

        {message && (
          <p className={styles.message}>
            {message}...
          </p>
        )}
      </div>
    </div>
  );
}