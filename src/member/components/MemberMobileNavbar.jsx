import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardIcon,
  FileIcon,
  ContactIcon,
  SettingsIcon,
} from "./memberNavItems";
import "../css/MemberMobileNavbar.css";

const TemplateIcon = ({ color = "#8A949F", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.1543 0.00390625C23.7394 0.0842145 25 1.39489 25 3V22L24.9961 22.1543C24.9158 23.7394 23.6051 25 22 25H3C1.34315 25 0 23.6569 0 22V3C6.24144e-08 1.39489 1.26055 0.0842144 2.8457 0.00390625L3 0H22L22.1543 0.00390625ZM3 2C2.44772 2 2 2.44772 2 3V22C2 22.5523 2.44772 23 3 23H22C22.5523 23 23 22.5523 23 22V3C23 2.44772 22.5523 2 22 2H3ZM12.5 18.7607C13.0113 18.7608 13.4256 19.1753 13.4258 19.6865C13.4258 20.1979 13.0114 20.6132 12.5 20.6133C11.9886 20.6133 11.5742 20.1979 11.5742 19.6865C11.5744 19.1753 11.9887 18.7607 12.5 18.7607ZM5.18262 15.0107C5.69392 15.0107 6.1092 15.4253 6.10938 15.9365C6.10938 16.4479 5.69403 16.8633 5.18262 16.8633C4.67135 16.8631 4.25684 16.4478 4.25684 15.9365C4.25701 15.4254 4.67146 15.0109 5.18262 15.0107ZM8.84082 15.0107C9.35213 15.0107 9.7674 15.4253 9.76758 15.9365C9.76758 16.4479 9.35223 16.8633 8.84082 16.8633C8.32961 16.863 7.91504 16.4478 7.91504 15.9365C7.91521 15.4254 8.32971 15.011 8.84082 15.0107ZM12.5 15.0107C13.0113 15.0108 13.4256 15.4253 13.4258 15.9365C13.4258 16.4479 13.0114 16.8632 12.5 16.8633C11.9886 16.8633 11.5742 16.4479 11.5742 15.9365C11.5744 15.4253 11.9887 15.0107 12.5 15.0107ZM16.1582 15.0107C16.6695 15.0107 17.0838 15.4253 17.084 15.9365C17.084 16.4479 16.6696 16.8633 16.1582 16.8633C15.6469 16.8632 15.2324 16.4479 15.2324 15.9365C15.2326 15.4253 15.647 15.0109 16.1582 15.0107ZM19.8174 15.0107C20.3286 15.0108 20.743 15.4253 20.7432 15.9365C20.7432 16.4479 20.3287 16.8632 19.8174 16.8633C19.306 16.8633 18.8916 16.4479 18.8916 15.9365C18.8918 15.4253 19.3061 15.0107 19.8174 15.0107ZM12.5 11.2607C13.0113 11.2608 13.4256 11.6753 13.4258 12.1865C13.4258 12.6979 13.0114 13.1132 12.5 13.1133C11.9886 13.1133 11.5742 12.6979 11.5742 12.1865C11.5744 11.6753 11.9887 11.2607 12.5 11.2607ZM5.18262 7.51074C5.69392 7.51074 6.1092 7.92526 6.10938 8.43652C6.10938 8.94794 5.69403 9.36328 5.18262 9.36328C4.67135 9.3631 4.25684 8.94783 4.25684 8.43652C4.25701 7.92537 4.67146 7.51092 5.18262 7.51074ZM8.84082 7.51074C9.35213 7.51074 9.7674 7.92526 9.76758 8.43652C9.76758 8.94794 9.35223 9.36328 8.84082 9.36328C8.32961 9.36305 7.91504 8.94779 7.91504 8.43652C7.91521 7.9254 8.32971 7.51098 8.84082 7.51074ZM12.5 7.51074C13.0113 7.5108 13.4256 7.9253 13.4258 8.43652C13.4258 8.9479 13.0114 9.36322 12.5 9.36328C11.9886 9.36328 11.5742 8.94794 11.5742 8.43652C11.5744 7.92526 11.9887 7.51074 12.5 7.51074ZM16.1582 7.51074C16.6695 7.51074 17.0838 7.92526 17.084 8.43652C17.084 8.94794 16.6696 9.36328 16.1582 9.36328C15.6469 9.36316 15.2324 8.94786 15.2324 8.43652C15.2326 7.92533 15.647 7.51086 16.1582 7.51074ZM19.8174 7.51074C20.3286 7.5108 20.743 7.92529 20.7432 8.43652C20.7432 8.9479 20.3287 9.36322 19.8174 9.36328C19.306 9.36328 18.8916 8.94794 18.8916 8.43652C18.8918 7.92526 19.3061 7.51074 19.8174 7.51074ZM12.5 3.76074C13.0113 3.7608 13.4256 4.1753 13.4258 4.68652C13.4258 5.1979 13.0114 5.61322 12.5 5.61328C11.9886 5.61328 11.5742 5.19794 11.5742 4.68652C11.5744 4.17526 11.9887 3.76074 12.5 3.76074Z" fill={color} />
  </svg>
);

const navItems = [
  { label: "Dashboard", path: "/member-dashboard", icon: HomeIcon },
  { label: "Signers", path: "/member-sign-yourself", icon: ClipboardIcon },
  { label: "Documents", path: "/member-documents", icon: FileIcon },
  { label: "Contact Book", path: "/member-contact-book", icon: ContactIcon },
  { label: "Templates", path: "/member-templates", icon: TemplateIcon },
  { label: "Settings", path: "/member-settings", icon: SettingsIcon },
];

export default function MemberMobileNavbar() {
  const location = useLocation();

  return (
    <nav className="member-mobile-navbar">
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.path === "/member-sign-yourself" &&
            location.pathname === "/member-request-signature");

        const Icon = item.icon;

        const validPaths = ["/member-dashboard", "/member-sign-yourself", "/member-documents", "/member-templates", "/member-contact-book", "/member-settings"];
        const handleClick = (e) => {
          if (!validPaths.includes(item.path)) {
            e.preventDefault();
          }
        };

        const iconSize = isActive ? 30 : 24;

        return (
          <Link
            key={item.path}
            to={validPaths.includes(item.path) ? item.path : "#"}
            onClick={handleClick}
            className={`member-mobile-navbar__item ${isActive ? "member-mobile-navbar__item--active" : ""}`}
          >
            <div className="member-mobile-navbar__icon-wrap">
              <Icon color={isActive ? "#ffffff" : "#8A949F"} size={iconSize} />
            </div>
            {isActive && (
              <span className="member-mobile-navbar__label">{item.label}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
