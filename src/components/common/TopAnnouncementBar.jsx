import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { X, Rocket } from "lucide-react";
import styles from "./TopAnnouncementBar.module.css";

export default function TopAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 1. Check if the user is actually logged in
    const userId = localStorage.getItem("nexgn_user_id");
    
    // 2. Check if the user has already dismissed it
    const dismissed = localStorage.getItem("nexgn_beta_banner_dismissed");
    
    // 3. Ensure we are not on public auth pages
    const isAuthPage = 
      location.pathname === "/" || 
      location.pathname === "/login" || 
      location.pathname === "/signup" ||
      location.pathname === "/forgot";

    if (userId && !dismissed && !isAuthPage) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [location.pathname]);

  const handleDismiss = () => {
    localStorage.setItem("nexgn_beta_banner_dismissed", "true");
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