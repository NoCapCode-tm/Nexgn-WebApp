import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import nexgnLogo from "../../assets/logo-light.png";
import useWindowWidth from "./useWindowWidth";
import {
  HomeIcon,
  ClipboardIcon,
  FileIcon,
  ContactIcon,
  SettingsIcon,
  HelpIcon,
  NexgnLogo,
  ToggleBtn
} from "./memberNavItems";

const navItems = [
  { label: "Dashboard", path: "/member-dashboard", icon: HomeIcon },
  { label: "Signers", path: "/member-sign-yourself", icon: ClipboardIcon },
  { label: "Documents", path: "/member-documents", icon: FileIcon },
  { label: "Contact Book", path: "/member-contact-book", icon: ContactIcon },
];

const bottomItems = [
  { label: "Settings", path: "/member-settings", icon: SettingsIcon },
  { label: "Help", path: "/help", icon: HelpIcon },
];

export default function MemberSidebar() {
  const [expanded, setExpanded] = useState(() => {
    const saved = localStorage.getItem("memberSidebarExpanded");
    return saved === "true";
  });
  const width = useWindowWidth();
  const isMobile = width < 1180;

  const effectiveExpanded = isMobile ? true : expanded;
  const location = useLocation();

  const toggleSidebar = () => {
    setExpanded((prev) => {
      const next = !prev;
      localStorage.setItem("memberSidebarExpanded", next);
      return next;
    });
  };

  const renderItem = ({ icon: Icon, label, path }) => {
    const active = location.pathname === path || (path === "/member-sign-yourself" && location.pathname === "/member-request-signature");

    const handleClick = (e) => {
      if (path !== "/member-dashboard" && path !== "/member-sign-yourself" && path !== "/member-documents" && path !== "/member-contact-book" && path !== "/member-settings") {
        e.preventDefault();
      }
    };

    return (
      <Link
        key={path}
        to={(path === "/member-dashboard" || path === "/member-sign-yourself" || path === "/member-documents" || path === "/member-contact-book" || path === "/member-settings") ? path : "#"}
        onClick={handleClick}
        className={`sidebar__item${active ? " sidebar__item--active" : ""}`}
        title={!expanded ? label : undefined}
      >
        {active && <div className="sidebar__active-pill" />}
        <span className="sidebar__icon-wrap">
          <Icon color={active ? "#FF0915" : "#8A949F"} />
        </span>
        {effectiveExpanded && (
          <span className={`sidebar__item-label ${active ? 'member-sidebar__item-label--active' : 'member-sidebar__item-label--inactive'}`}>
            {label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className={`sidebar ${effectiveExpanded ? "sidebar--expanded" : ""}`}>
      <div className="sidebar__toggle" onClick={toggleSidebar}>
        <ToggleBtn expanded={expanded} />
      </div>
      <div className="sidebar__inner">
        <div className="sidebar__logo">
          {effectiveExpanded ? (
            <img
              src={nexgnLogo}
              alt="Nexgn"
              className="member-sidebar__logo-img"
            />
          ) : (
            <NexgnLogo />
          )}
        </div>
        <div className="sidebar__divider" />
        <nav className="sidebar__nav">
          {navItems.map(renderItem)}
        </nav>
        <div className="sidebar__bottom">
          {bottomItems.map(renderItem)}
        </div>
      </div>
    </aside>
  );
}
