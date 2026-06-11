import { Link, useLocation } from "react-router-dom";
import "../css/MemberMobileNavbar.css";

const HomeIcon = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.552 20.552 21 20 21H15V15H9V21H4C3.448 21 3 20.552 3 20V9.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClipboardIcon = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4.166H12.5C11.81 4.166 11.25 4.745 11.25 5.458V8.041C11.25 8.755 11.81 9.333 12.5 9.333H20C20.69 9.333 21.25 8.755 21.25 8.041V5.458C21.25 4.745 20.69 4.166 20 4.166Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.25 6.748H23.75C24.413 6.748 25.049 7.021 25.518 7.505C25.987 7.99 26.25 8.647 26.25 9.332V27.416C26.25 28.101 25.987 28.758 25.518 29.242C25.049 29.727 24.413 30 23.75 30H8.75C8.087 30 7.451 29.727 6.982 29.242C6.514 28.758 6.25 28.101 6.25 27.416V9.332C6.25 8.647 6.514 7.99 6.982 7.505C7.451 7.021 8.087 6.748 8.75 6.748H11.25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FileIcon = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 27C6.837 27 6.201 26.737 5.732 26.268C5.264 25.799 5 25.163 5 24.5V5.5C5 4.837 5.264 4.201 5.732 3.732C6.201 3.263 6.837 3 7.5 3H17.5C17.896 2.999 18.288 3.077 18.653 3.228C19.019 3.38 19.351 3.602 19.63 3.883L24.115 8.368C24.396 8.647 24.619 8.979 24.771 9.345C24.923 9.711 25.001 10.104 25 10.5V24.5C25 25.163 24.737 25.799 24.268 26.268C23.799 26.737 23.163 27 22.5 27H7.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 3V9.25C17.5 9.582 17.632 9.899 17.866 10.134C18.101 10.368 18.419 10.5 18.75 10.5H25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ContactIcon = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2.5V5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.75 25V22.5C8.75 21.837 9.014 21.201 9.482 20.732C9.951 20.263 10.587 20 11.25 20H18.75C19.413 20 20.049 20.263 20.518 20.732C20.987 21.201 21.25 21.837 21.25 22.5V25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 2.5V5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 15C17.071 15 18.75 13.321 18.75 11.25C18.75 9.179 17.071 7.5 15 7.5C12.929 7.5 11.25 9.179 11.25 11.25C11.25 13.321 12.929 15 15 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.75 2.5H6.25C4.869 2.5 3.75 3.619 3.75 5V22.5C3.75 23.881 4.869 25 6.25 25H23.75C25.131 25 26.25 23.881 26.25 22.5V5C26.25 3.619 25.131 2.5 23.75 2.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.156 2.649C12.227 1.924 12.575 1.251 13.13 0.762C13.686 0.272 14.411 0 15.162 0C15.913 0 16.638 0.272 17.193 0.762C17.749 1.251 18.097 1.924 18.168 2.649C18.211 3.117 18.369 3.568 18.63 3.964C18.891 4.36 19.246 4.69 19.666 4.925C20.087 5.159 20.559 5.293 21.044 5.313C21.528 5.334 22.011 5.241 22.45 5.042C23.133 4.742 23.907 4.699 24.621 4.921C25.335 5.142 25.938 5.614 26.313 6.243C26.688 6.871 26.808 7.613 26.65 8.323C26.492 9.033 26.066 9.661 25.457 10.084C25.06 10.353 24.736 10.712 24.512 11.129C24.288 11.545 24.172 12.008 24.172 12.478C24.172 12.948 24.288 13.411 24.512 13.827C24.736 14.244 25.06 14.603 25.457 14.872C26.066 15.295 26.492 15.923 26.65 16.633C26.808 17.343 26.688 18.085 26.313 18.714C25.938 19.342 25.335 19.814 24.621 20.036C23.907 20.257 23.133 20.214 22.45 19.914C22.011 19.715 21.528 19.622 21.044 19.643C20.559 19.663 20.087 19.797 19.666 20.032C19.246 20.266 18.891 20.596 18.63 20.992C18.369 21.388 18.211 21.839 18.168 22.307C18.097 23.032 17.749 23.705 17.193 24.195C16.638 24.684 15.913 24.956 15.162 24.956C14.411 24.956 13.686 24.684 13.13 24.195C12.575 23.705 12.227 23.032 12.156 22.307C12.114 21.839 11.955 21.388 11.694 20.992C11.433 20.595 11.077 20.266 10.657 20.031C10.237 19.796 9.764 19.663 9.279 19.642C8.795 19.622 8.312 19.715 7.872 19.914C7.19 20.214 6.416 20.257 5.702 20.036C4.988 19.814 4.385 19.342 4.01 18.714C3.635 18.085 3.515 17.343 3.673 16.633C3.831 15.923 4.256 15.295 4.866 14.872C5.263 14.603 5.587 14.244 5.81 13.827C6.034 13.411 6.151 12.948 6.151 12.478C6.151 12.008 6.034 11.545 5.81 11.129C5.587 10.712 5.263 10.353 4.866 10.084C4.257 9.66 3.833 9.033 3.675 8.324C3.517 7.614 3.637 6.873 4.012 6.245C4.386 5.616 4.989 5.145 5.702 4.923C6.415 4.701 7.188 4.743 7.871 5.042C8.311 5.241 8.793 5.334 9.278 5.313C9.762 5.293 10.235 5.159 10.655 4.925C11.075 4.69 11.431 4.36 11.691 3.964C11.952 3.568 12.111 3.117 12.154 2.649" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.162 16.227C17.3 16.227 19.033 14.548 19.033 12.477C19.033 10.406 17.3 8.727 15.162 8.727C13.024 8.727 11.291 10.406 11.291 12.477C11.291 14.548 13.024 16.227 15.162 16.227Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const navItems = [
  { label: "Dashboard", path: "/member-dashboard", icon: HomeIcon },
  { label: "Signers", path: "/member-sign-yourself", icon: ClipboardIcon },
  { label: "Documents", path: "/member-documents", icon: FileIcon },
  { label: "Contact Book", path: "/member-contact-book", icon: ContactIcon },
  { label: "Settings", path: "/settings", icon: SettingsIcon },
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
          if (item.path !== "/member-dashboard" && item.path !== "/member-sign-yourself" && item.path !== "/member-documents" && item.path !== "/member-contact-book") {
            e.preventDefault();
          }
        };

        const iconSize = isActive ? 26 : 22;

        return (
          <Link
            key={item.path}
            to={(item.path === "/member-dashboard" || item.path === "/member-sign-yourself" || item.path === "/member-documents" || item.path === "/member-contact-book") ? item.path : "#"}
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
