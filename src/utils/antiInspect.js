/**
 * Anti-Inspect & DevTools Deterrent Utility
 * Supports Windows, macOS, ChromeOS, and Linux shortcuts.
 * Includes a developer bypass mechanism.
 */

const DEV_SECRET_PASSCODE = import.meta.env.VITE_DEV_PASSCODE;

export const initAntiInspect = () => {
  if (typeof window === "undefined") return;

  // 1. Check for URL query parameter bypass (e.g. ?dev_secret=NexgnDev_Secret_2026)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("dev_secret") === DEV_SECRET_PASSCODE) {
    localStorage.setItem("nexgn_dev_access", "true");
    // Clean up query param from URL bar
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // 2. Check Developer Mode State
  const isDevMode = localStorage.getItem("nexgn_dev_access") === "true";
  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );

  // If unlocked via dev_secret OR if you want to bypass on localhost:
  if (isDevMode) {
    console.log("[Security] DevTools protection bypassed for developer mode.");
    return;
  }

  // 3. Disable Right-Click (Context Menu)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // 4. Block Keyboard Shortcuts across all Operating Systems
  document.addEventListener("keydown", (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    // F12 key
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }

    // Ctrl/Cmd + Shift/Option + (I, J, C)
    if (cmdOrCtrl && (e.shiftKey || (isMac && e.altKey))) {
      const key = e.key.toUpperCase();
      if (key === "I" || key === "J" || key === "C") {
        e.preventDefault();
        return false;
      }
    }

    // Ctrl/Cmd + U (View Source)
    if (cmdOrCtrl && (e.key === "u" || e.key === "U")) {
      e.preventDefault();
      return false;
    }

    // Ctrl/Cmd + S (Save Page)
    if (cmdOrCtrl && (e.key === "s" || e.key === "S")) {
      e.preventDefault();
      return false;
    }
  });

  // 5. Active Debugger Trap (Pauses if DevTools is opened via browser UI)
  setInterval(() => {
    const startTime = performance.now();
    debugger;
    const endTime = performance.now();

    if (endTime - startTime > 100) {
      document.body.innerHTML = `
        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #FF0915;
          text-align: center;
          background: #ffffff;
        ">
          <div>
            <h1 style="font-size: 32px; font-weight: 700;">Security Violation</h1>
            <p style="font-size: 16px; color: #1a1a1a;">Developer tools access is restricted on this platform.</p>
          </div>
        </div>
      `;
    }
  }, 1000);
};

export const enableDeveloperMode = (passcode) => {
  if (passcode === DEV_SECRET_PASSCODE) {
    localStorage.setItem("nexgn_dev_access", "true");
    window.location.reload();
  } else {
    console.error("Invalid developer passcode.");
  }
};

export const disableDeveloperMode = () => {
  localStorage.removeItem("nexgn_dev_access");
  window.location.reload();
};