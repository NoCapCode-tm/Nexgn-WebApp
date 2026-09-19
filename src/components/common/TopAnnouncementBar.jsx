import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { X, Rocket } from "lucide-react";
import styles from "./TopAnnouncementBar.module.css";

export default function TopAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);
  // Track closure in memory instead of localStorage so it resets on refresh
  const [isClosed, setIsClosed] = useState(false); 
  const location = useLocation();

  useEffect(() => {
    // 1. Check if the user is actually logged in
    const userId = localStorage.getItem("nexgn_user_id");
    
    // 2. Ensure we are not on public auth pages
    const isAuthPage = 
      location.pathname === "/" || 
      location.pathname === "/login" || 
      location.pathname === "/signup" ||
      location.pathname === "/forgot";

    // 3. Show if logged in, not on auth page, and hasn't been closed THIS session
    if (userId && !isAuthPage && !isClosed) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [location.pathname, isClosed]);

  const handleDismiss = () => {
    // Setting this in state hides it immediately, but will reset to false on a hard refresh
    setIsClosed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <span className={styles.highlight}>Nexgn Beta Roll-out (Sep 20, 2026)</span> 
        <Rocket size={14} className={styles.icon} />
        You may encounter occasional bugs. The upcoming stable version will feature major upgrades to UI/UX, security, sustainability, and core features.
      </div>

      <button 
        type="button" 
        className={styles.closeBtn} 
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}