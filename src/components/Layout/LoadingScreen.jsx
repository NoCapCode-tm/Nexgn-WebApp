import React from "react";
import { ThinkingOrb } from "thinking-orbs";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({
  state = "listening",
  size = 64,
  speed,
 //   theme="dark",
  message
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <ThinkingOrb
          state={state}
          size={size}
        //   theme={theme}
          {...(speed !== undefined ? { speed } : {})}
        />

        {message && (
          <p className={styles.message}>
            {message}...
          </p>
        )}
      </div>
    </div>
  );
}