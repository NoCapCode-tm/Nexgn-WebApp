import { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import { Search, Bell, UserCircle, Menu } from "lucide-react";
import "../css/AdminBaseLayout.css";
import "../css/Settings.css";

const settingsNavItems = [
  { key: "profile", label: "Profile", active: true },
  { key: "account", label: "Account", active: false },
  { key: "security", label: "Security", active: false },
  { key: "team", label: "Team Management", active: false },
  { key: "notifications", label: "Notifications", active: false },
  { key: "billing", label: "Billing", active: false },
  { key: "integrations", label: "Integrations", active: false },
  { key: "audit", label: "Audit Logs", active: false },
];

const DEFAULT_AVATAR = "/Avatar.png";

export default function Settings() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "John.doe@example.com",
    phone: "+1 (555) 123-4567",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef(null);

  const handleTabClick = (item) => {
    if (item.active) {
      setActiveTab(item.key);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
  };

  return (
    <div className="layout admin-theme admin-settings-page">
      {mobileNavOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <Sidebar />
      </div>

      <div className="desktop-sidebar-wrapper">
        <Sidebar />
      </div>

      <div className="main">
        {/* Mobile Topbar */}
        <header className="mobile-topbar">
          <button
            className="mobile-topbar__hamburger"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu size={22} color="#1a1a2e" />
          </button>
          <div className="mobile-topbar__icons">
            <button className="topbar__icon-btn">
              <Search size={18} color="#FF0915" strokeWidth={1.5} />
            </button>
            <button className="topbar__icon-btn">
              <Bell size={18} color="#FF0915" strokeWidth={1.5} />
            </button>
            <button className="topbar__icon-btn">
              <UserCircle size={20} color="#FF0915" strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {/* Desktop Topbar */}
        <header className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <div className="topbar__icons">
              <button className="topbar__icon-btn">
                <Search size={24} color="#FF0915" strokeWidth={1.5} />
              </button>
              <button className="topbar__icon-btn">
                <Bell size={24} color="#FF0915" strokeWidth={1.5} />
              </button>
              <button className="topbar__icon-btn">
                <UserCircle size={24} color="#FF0915" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div className="topbar__bottom-row settings-topbar__bottom-row">
            <div>
              <h1 className="topbar__title">Settings</h1>
              <p className="topbar__sub">Manage your account preferences and configurations</p>
            </div>
            
            <div className="settings-topbar-search">
              <Search size={16} color="#8A949F" strokeWidth={1.5} />
              <input
                type="text"
                className="settings-topbar-search__input"
                placeholder="Search Documents"
                id="settings-search-input"
              />
            </div>
          </div>
        </header>

        {/* Mobile Page Header */}
        <div className="mobile-page-header">
          <h1 className="topbar__title">Settings</h1>
          <p className="topbar__sub">Manage your account preferences and configurations</p>
          <div className="mobile-page-header__divider" />
        </div>

        {/* Settings Body */}
        <div className="settings-body">
          {/* Left Settings Navigation */}
          <nav className="settings-nav" aria-label="Settings navigation">
            {settingsNavItems.map((item) => (
              <button
                key={item.key}
                id={`settings-nav-${item.key}`}
                className={`settings-nav__item${activeTab === item.key ? " settings-nav__item--active" : ""}${!item.active ? " settings-nav__item--disabled" : ""}`}
                onClick={() => handleTabClick(item)}
                disabled={!item.active}
                aria-current={activeTab === item.key ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Content Card */}
          <div className="settings-content">
            {activeTab === "profile" && (
              <div className="settings-card">
                <h2 className="settings-card__title">Profile</h2>
                <div className="settings-card__divider" />

                {/* Avatar Section */}
                <div className="settings-avatar-row">
                  <div className="settings-avatar">
                    <img
                      src={avatar}
                      alt="User avatar"
                      className="settings-avatar__img"
                      id="settings-avatar-preview"
                    />
                  </div>
                  <div className="settings-avatar-info">
                    <input
                      type="file"
                      accept="image/jpeg,image/gif,image/png"
                      ref={fileInputRef}
                      className="settings-avatar__file-input"
                      id="settings-avatar-upload-input"
                      onChange={handleAvatarUpload}
                    />
                    <button
                      className="settings-avatar__upload-btn"
                      id="settings-avatar-upload-btn"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      type="button"
                    >
                      Upload Avatar
                    </button>
                    <p className="settings-avatar__helper">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <form className="settings-form" onSubmit={handleUpdateProfile} id="settings-profile-form">
                  <div className="settings-form__group">
                    <label className="settings-form__label" htmlFor="settings-full-name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="settings-full-name"
                      name="fullName"
                      className="settings-form__input"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      autoComplete="name"
                    />
                  </div>

                  <div className="settings-form__group">
                    <label className="settings-form__label" htmlFor="settings-email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="settings-email"
                      name="email"
                      className="settings-form__input settings-form__input--readonly"
                      value={formData.email}
                      readOnly
                      aria-readonly="true"
                    />
                    <p className="settings-form__helper">
                      Email address cannot be changed here
                    </p>
                  </div>

                  <div className="settings-form__group">
                    <label className="settings-form__label" htmlFor="settings-phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="settings-phone"
                      name="phone"
                      className="settings-form__input"
                      value={formData.phone}
                      onChange={handleFormChange}
                      autoComplete="tel"
                    />
                  </div>


                  <div className="settings-form__footer">
                    <button
                      type="submit"
                      className="settings-form__submit"
                      id="settings-update-profile-btn"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileNavbar />
    </div>
  );
}
