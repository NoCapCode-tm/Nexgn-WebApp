import React, { useState, useEffect } from "react";
import MemberSidebar from "./MemberSidebar";
import MemberMobileNavbar from "./MemberMobileNavbar";
import MemberTopbarIcons from "./MemberTopbarIcons";
import useWindowWidth from "./useWindowWidth";
import { Menu } from "lucide-react";

export default function MemberLayout({ children, onSearchClick, className, hideMobileTopbar = false, hideMobileNavbar = false, onRegisterMenuOpen }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const width = useWindowWidth();

  // Let pages with a custom header (e.g. Settings) open the sidebar
  useEffect(() => {
    if (onRegisterMenuOpen) {
      onRegisterMenuOpen(() => setMobileNavOpen(true));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`layout member-theme ${className || ""}`}>
      {mobileNavOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Mobile Wrapper */}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <MemberSidebar />
      </div>

      {/* Sidebar - Desktop */}
      <div className="desktop-sidebar-wrapper">
        <MemberSidebar />
      </div>

      <div className="main">
        {/* Global Mobile Topbar — suppressed on pages with their own mobile header */}
        {!hideMobileTopbar && (
          <header className="mobile-topbar">
            <button className="mobile-topbar__hamburger" onClick={() => setMobileNavOpen(true)}>
              <Menu size={22} color="#1a1a2e" />
            </button>
            <MemberTopbarIcons iconSize={18} className="mobile-topbar__icons" onSearchClick={onSearchClick} />
          </header>
        )}

        {children}
      </div>

      {!hideMobileNavbar && <MemberMobileNavbar />}
    </div>
  );
}
