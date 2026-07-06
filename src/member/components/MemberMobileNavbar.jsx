import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardIcon,
  FileIcon,
  ContactIcon,
  SettingsIcon
} from "./memberNavItems";
import "../css/MemberMobileNavbar.css";

const navItems = [
  { label: "Dashboard", path: "/member-dashboard", icon: HomeIcon },
  { label: "Signers", path: "/member-sign-yourself", icon: ClipboardIcon },
  { label: "Documents", path: "/member-documents", icon: FileIcon },
  { label: "Contact Book", path: "/member-contact-book", icon: ContactIcon },
  { label: "Settings", path: "/member-settings", icon: SettingsIcon },
];

export default function MemberMobileNavbar() {
  const location = useLocation();

  return (
    <nav className="member-mobile-navbar">
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.path === "/member-sign-yourself" && location.pathname === "/member-request-signature");

        const Icon = item.icon;

        const handleClick = (e) => {
          if (item.path !== "/member-dashboard" && item.path !== "/member-sign-yourself" && item.path !== "/member-documents" && item.path !== "/member-contact-book" && item.path !== "/member-settings") {
            e.preventDefault();
          }
        };

        const iconSize = isActive ? 30 : 24;

        return (
          <Link
            key={item.path}
            to={(item.path === "/member-dashboard" || item.path === "/member-sign-yourself" || item.path === "/member-documents" || item.path === "/member-contact-book" || item.path === "/member-settings") ? item.path : "#"}
            onClick={handleClick}
            className={`member-mobile-navbar__item ${isActive ? "member-mobile-navbar__item--active" : ""}`}
          >
            <div className="member-mobile-navbar__icon-wrap">
              <Icon color={isActive ? "#ffffff" : "#8A949F"} size={iconSize} />
            </div>
            {isActive && <span className="member-mobile-navbar__label">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
