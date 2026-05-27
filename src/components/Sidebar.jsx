import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  Settings,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home Screen", path: "/" },
  { icon: LayoutDashboard, label: "User Dashboard", path: "/dashboard" },
  { icon: Users, label: "Signers", path: "/signers" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: BookOpen, label: "Contact Book", path: "/contacts" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`sidebar ${expanded ? "sidebar--expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="14" height="14" rx="2" fill="#E8302A" />
            <rect x="18" width="14" height="14" rx="2" fill="#E8302A" opacity="0.5" />
            <rect y="18" width="14" height="14" rx="2" fill="#E8302A" opacity="0.5" />
            <rect x="18" y="18" width="14" height="14" rx="2" fill="#E8302A" />
          </svg>
        </div>
        {expanded && <span className="sidebar__logo-text">Nexgn</span>}
      </div>

      {/* Main Nav */}
      <nav className="sidebar__nav">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`sidebar__item ${active ? "sidebar__item--active" : ""}`}
              title={!expanded ? label : undefined}
            >
              <Icon size={18} strokeWidth={1.8} className="sidebar__item-icon" />
              {expanded && <span className="sidebar__item-label">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="sidebar__bottom">
        {bottomItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className="sidebar__item"
            title={!expanded ? label : undefined}
          >
            <Icon size={18} strokeWidth={1.8} className="sidebar__item-icon" />
            {expanded && <span className="sidebar__item-label">{label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}