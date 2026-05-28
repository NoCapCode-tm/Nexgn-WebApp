import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HomeIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.552 20.552 21 20 21H15V15H9V21H4C3.448 21 3 20.552 3 20V9.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.343 15.657 16 14 16H6C4.343 16 3 17.343 3 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.999 17.657 22.014 16.52 20.7 16.13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 7.13C18.314 7.52 19.3 8.657 19.3 10C19.3 11.343 18.314 12.48 17 12.87" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClipboardIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4.166H12.5C11.81 4.166 11.25 4.745 11.25 5.458V8.041C11.25 8.755 11.81 9.333 12.5 9.333H20C20.69 9.333 21.25 8.755 21.25 8.041V5.458C21.25 4.745 20.69 4.166 20 4.166Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.25 6.748H23.75C24.413 6.748 25.049 7.021 25.518 7.505C25.987 7.99 26.25 8.647 26.25 9.332V27.416C26.25 28.101 25.987 28.758 25.518 29.242C25.049 29.727 24.413 30 23.75 30H8.75C8.087 30 7.451 29.727 6.982 29.242C6.514 28.758 6.25 28.101 6.25 27.416V9.332C6.25 8.647 6.514 7.99 6.982 7.505C7.451 7.021 8.087 6.748 8.75 6.748H11.25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FileIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 27C6.837 27 6.201 26.737 5.732 26.268C5.264 25.799 5 25.163 5 24.5V5.5C5 4.837 5.264 4.201 5.732 3.732C6.201 3.263 6.837 3 7.5 3H17.5C17.896 2.999 18.288 3.077 18.653 3.228C19.019 3.38 19.351 3.602 19.63 3.883L24.115 8.368C24.396 8.647 24.619 8.979 24.771 9.345C24.923 9.711 25.001 10.104 25 10.5V24.5C25 25.163 24.737 25.799 24.268 26.268C23.799 26.737 23.163 27 22.5 27H7.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 3V9.25C17.5 9.582 17.632 9.899 17.866 10.134C18.101 10.368 18.419 10.5 18.75 10.5H25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ContactIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2.5V5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.75 25V22.5C8.75 21.837 9.014 21.201 9.482 20.732C9.951 20.263 10.587 20 11.25 20H18.75C19.413 20 20.049 20.263 20.518 20.732C20.987 21.201 21.25 21.837 21.25 22.5V25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 2.5V5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 15C17.071 15 18.75 13.321 18.75 11.25C18.75 9.179 17.071 7.5 15 7.5C12.929 7.5 11.25 9.179 11.25 11.25C11.25 13.321 12.929 15 15 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.75 2.5H6.25C4.869 2.5 3.75 3.619 3.75 5V22.5C3.75 23.881 4.869 25 6.25 25H23.75C25.131 25 26.25 23.881 26.25 22.5V5C26.25 3.619 25.131 2.5 23.75 2.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.156 2.649C12.227 1.924 12.575 1.251 13.13 0.762C13.686 0.272 14.411 0 15.162 0C15.913 0 16.638 0.272 17.193 0.762C17.749 1.251 18.097 1.924 18.168 2.649C18.211 3.117 18.369 3.568 18.63 3.964C18.891 4.36 19.246 4.69 19.666 4.925C20.087 5.159 20.559 5.293 21.044 5.313C21.528 5.334 22.011 5.241 22.45 5.042C23.133 4.742 23.907 4.699 24.621 4.921C25.335 5.142 25.938 5.614 26.313 6.243C26.688 6.871 26.808 7.613 26.65 8.323C26.492 9.033 26.066 9.661 25.457 10.084C25.06 10.353 24.736 10.712 24.512 11.129C24.288 11.545 24.172 12.008 24.172 12.478C24.172 12.948 24.288 13.411 24.512 13.827C24.736 14.244 25.06 14.603 25.457 14.872C26.066 15.295 26.492 15.923 26.65 16.633C26.808 17.343 26.688 18.085 26.313 18.714C25.938 19.342 25.335 19.814 24.621 20.036C23.907 20.257 23.133 20.214 22.45 19.914C22.011 19.715 21.528 19.622 21.044 19.643C20.559 19.663 20.087 19.797 19.666 20.032C19.246 20.266 18.891 20.596 18.63 20.992C18.369 21.388 18.211 21.839 18.168 22.307C18.097 23.032 17.749 23.705 17.193 24.195C16.638 24.684 15.913 24.956 15.162 24.956C14.411 24.956 13.686 24.684 13.13 24.195C12.575 23.705 12.227 23.032 12.156 22.307C12.114 21.839 11.955 21.388 11.694 20.992C11.433 20.595 11.077 20.266 10.657 20.031C10.237 19.796 9.764 19.663 9.279 19.642C8.795 19.622 8.312 19.715 7.872 19.914C7.19 20.214 6.416 20.257 5.702 20.036C4.988 19.814 4.385 19.342 4.01 18.714C3.635 18.085 3.515 17.343 3.673 16.633C3.831 15.923 4.256 15.295 4.866 14.872C5.263 14.603 5.587 14.244 5.81 13.827C6.034 13.411 6.151 12.948 6.151 12.478C6.151 12.008 6.034 11.545 5.81 11.129C5.587 10.712 5.263 10.353 4.866 10.084C4.257 9.66 3.833 9.033 3.675 8.324C3.517 7.614 3.637 6.873 4.012 6.245C4.386 5.616 4.989 5.145 5.702 4.923C6.415 4.701 7.188 4.743 7.871 5.042C8.311 5.241 8.793 5.334 9.278 5.313C9.762 5.293 10.235 5.159 10.655 4.925C11.075 4.69 11.431 4.36 11.691 3.964C11.952 3.568 12.111 3.117 12.154 2.649" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.162 16.227C17.3 16.227 19.033 14.548 19.033 12.477C19.033 10.406 17.3 8.727 15.162 8.727C13.024 8.727 11.291 10.406 11.291 12.477C11.291 14.548 13.024 16.227 15.162 16.227Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HelpIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18.75H6.871C7.556 18.75 8.212 19.013 8.696 19.482C9.18 19.951 9.452 20.587 9.452 21.25V25C9.452 25.663 9.18 26.299 8.696 26.768C8.212 27.237 7.556 27.5 6.871 27.5H5.581C4.896 27.5 4.24 27.237 3.756 26.768C3.272 26.299 3 25.663 3 25V18.75ZM3 18.75C3 17.273 3.301 15.81 3.884 14.445C4.468 13.08 5.323 11.84 6.402 10.795C7.48 9.75 8.76 8.922 10.169 8.356C11.578 7.791 13.088 7.5 14.613 7.5C16.138 7.5 17.648 7.791 19.057 8.356C20.466 8.922 21.746 9.75 22.825 10.795C23.903 11.84 24.758 13.08 25.342 14.445C25.926 15.81 26.226 17.273 26.226 18.75M26.226 18.75V25C26.226 25.663 25.954 26.299 25.47 26.768C24.986 27.237 24.33 27.5 23.645 27.5H22.355C21.671 27.5 21.014 27.237 20.53 26.768C20.046 26.299 19.774 25.663 19.774 25V21.25C19.774 20.587 20.046 19.951 20.53 19.482C21.014 19.013 21.671 18.75 22.355 18.75H26.226Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NexgnLogo = () => (
  <svg width="32" height="30" viewBox="16 53 57 53" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M62.7002 53C68.223 53 72.7002 57.4772 72.7002 63V96C72.7002 96.6985 72.6275 97.38 72.4912 98.0381L60.1143 85.9307C58.1403 83.9997 54.9565 84.0172 53.0039 85.9697L51.3584 87.6152C49.406 89.5679 49.4235 92.7165 51.3975 94.6475L62.9951 105.992C62.8971 105.995 62.7989 106 62.7002 106H29.7002C29.2949 106 28.8956 105.973 28.5029 105.926L61.6035 73.5479C63.5772 71.6168 63.5941 68.4682 61.6416 66.5156L59.9961 64.8701C58.0435 62.9179 54.8606 62.9004 52.8867 64.8311L19.7764 97.2197C19.7277 96.8199 19.7002 96.413 19.7002 96V63C19.7002 62.882 19.704 62.7645 19.708 62.6475L32.2295 74.8955C34.2034 76.8262 37.3863 76.8086 39.3389 74.8564L40.9854 73.21C42.9373 71.2574 42.9199 68.1095 40.9463 66.1787L27.6816 53.2031C28.3336 53.0695 29.0088 53 29.7002 53H62.7002Z" fill="#FF0915"/>
  </svg>
);

const ToggleBtn = ({ expanded }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.22s" }}>
    <rect width="24" height="24" rx="12" fill="white"/>
    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#8A949F" strokeOpacity="0.58"/>
    <path d="M14.679 17.212L9.345 11.878L14.679 6.545" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.588 15.879L5.588 11.879L9.588 7.879" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const navItems = [
  { icon: HomeIcon,      label: "Home Screen",    path: "/" },
  { icon: UsersIcon,     label: "User Dashboard", path: "/dashboard" },
  { icon: ClipboardIcon, label: "Signers",        path: "/signers" },
  { icon: FileIcon,      label: "Documents",      path: "/documents" },
  { icon: ContactIcon,   label: "Contact Book",   path: "/contacts" },
];

const bottomItems = [
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
  { icon: HelpIcon,     label: "Help",     path: "/help" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const renderItem = ({ icon: Icon, label, path }) => {
    const active = location.pathname === path;
    return (
      <Link
        key={path}
        to={path}
        className={`sidebar__item${active ? " sidebar__item--active" : ""}`}
        title={!expanded ? label : undefined}
      >
        {active && <div className="sidebar__active-pill" />}
        <span className="sidebar__icon-wrap">
          <Icon color={active ? "#FF0915" : "#8A949F"} />
        </span>
        {expanded && (
          <span className="sidebar__item-label" style={{ color: active ? "#FF0915" : "#8A949F" }}>
            {label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className={`sidebar ${expanded ? "sidebar--expanded" : ""}`}>
      <div className="sidebar__toggle" onClick={() => setExpanded(e => !e)}>
        <ToggleBtn expanded={expanded} />
      </div>
      <div className="sidebar__inner">
        <div className="sidebar__logo">
          {expanded
            ? <img src="/nexgn-logo.png" alt="Nexgn" style={{ width: '184px', height: '56px', objectFit: 'contain' }} />
            : <NexgnLogo />}
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