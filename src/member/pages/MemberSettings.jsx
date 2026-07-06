import { useState, useRef } from "react";
import MemberLayout from "../components/MemberLayout";
import MemberTopbar from "../components/MemberTopbar";
import { Search } from "lucide-react";
import "../css/MemberBaseLayout.css";
import "../css/MemberSettings.css";

const settingsNavItems = [
  { key: "profile", label: "Profile", active: true },
  { key: "account", label: "Account", active: true },
  { key: "security", label: "Security", active: false },
  { key: "team", label: "Team Management", active: false },
  { key: "notifications", label: "Notifications", active: false },
  { key: "billing", label: "Billing", active: false },
  { key: "integrations", label: "Integrations", active: false },
  { key: "audit", label: "Audit Logs", active: false },
];

import AvatarImg from "../../assets/Avatar.png";
const DEFAULT_AVATAR = AvatarImg;

export default function MemberSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "John.doe@example.com",
    phone: "+1 (555) 123-4567",
  });
  const [accountData, setAccountData] = useState({
    companyName: "Acme Corp",
    organizationId: "org-123abc456",
    timeZone: "Pacific Time (US & Canada)",
    language: "English (united States)",
  });
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

  const searchComponent = (
    <div className="member-settings-topbar-search">
      <Search size={16} color="#8A949F" strokeWidth={1.5} />
      <input
        type="text"
        className="member-settings-topbar-search__input"
        placeholder="Search Documents"
        id="member-settings-search-input"
      />
    </div>
  );

  const mobileSearchComponent = (
    <div className="member-settings-topbar-search member-settings-mobile-search">
      <Search size={16} color="#8A949F" strokeWidth={1.5} />
      <input
        type="text"
        className="member-settings-topbar-search__input"
        placeholder="Search"
      />
    </div>
  );

  return (
    <MemberLayout className="member-settings-page">
      <>
        {/* Desktop Topbar */}
        <MemberTopbar 
          title="Settings" 
          subtitle="Manage your account preferences and configurations"
          actionButton={searchComponent}
        />

        {/* Mobile Page Header */}
        <div className="mobile-page-header member-settings-mobile-header">
          <div className="member-settings-mobile-header__top-row">
            <div className="member-settings-mobile-header__titles">
              <div className="topbar__title">Settings</div>
              <div className="topbar__sub">Manage your account preferences and configurations</div>
            </div>
            {mobileSearchComponent}
          </div>
        </div>

        {/* Settings Body */}
        <div className="member-settings-body">
          {/* Left Settings Navigation */}
          <nav className="member-settings-nav" aria-label="Member settings navigation">
            {settingsNavItems.map((item) => (
              <button
                key={item.key}
                id={`member-settings-nav-${item.key}`}
                className={`member-settings-nav__item${activeTab === item.key ? " member-settings-nav__item--active" : ""}${!item.active ? " member-settings-nav__item--disabled" : ""}`}
                onClick={() => handleTabClick(item)}
                disabled={!item.active}
                aria-current={activeTab === item.key ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Content Card */}
          <div className="member-settings-content">
            {activeTab === "profile" && (
              <div className="member-settings-card">
                <h2 className="member-settings-card__title">Profile</h2>
                <div className="member-settings-card__divider" />

                {/* Avatar Section */}
                <div className="member-settings-avatar-row">
                  <div className="member-settings-avatar">
                    <img
                      src={avatar}
                      alt="User avatar"
                      className="member-settings-avatar__img"
                      id="member-settings-avatar-preview"
                    />
                  </div>
                  <div className="member-settings-avatar-info">
                    <input
                      type="file"
                      accept="image/jpeg,image/gif,image/png"
                      ref={fileInputRef}
                      className="member-settings-avatar__file-input"
                      id="member-settings-avatar-upload-input"
                      onChange={handleAvatarUpload}
                    />
                    <button
                      className="member-settings-avatar__upload-btn"
                      id="member-settings-avatar-upload-btn"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      type="button"
                    >
                      Upload Avatar
                    </button>
                    <p className="member-settings-avatar__helper">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <form className="member-settings-form" onSubmit={handleUpdateProfile} id="member-settings-profile-form">
                  <div className="member-settings-form__group">
                    <label className="member-settings-form__label" htmlFor="member-settings-full-name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="member-settings-full-name"
                      name="fullName"
                      className="member-settings-form__input"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      autoComplete="name"
                    />
                  </div>

                  <div className="member-settings-form__group">
                    <label className="member-settings-form__label" htmlFor="member-settings-email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="member-settings-email"
                      name="email"
                      className="member-settings-form__input member-settings-form__input--readonly"
                      value={formData.email}
                      readOnly
                      aria-readonly="true"
                    />
                    <p className="member-settings-form__helper">
                      Email address cannot be changed here
                    </p>
                  </div>

                  <div className="member-settings-form__group">
                    <label className="member-settings-form__label" htmlFor="member-settings-phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="member-settings-phone"
                      name="phone"
                      className="member-settings-form__input"
                      value={formData.phone}
                      onChange={handleFormChange}
                      autoComplete="tel"
                    />
                  </div>

                  <div className="member-settings-form__footer">
                    <button
                      type="submit"
                      className="member-settings-form__submit"
                      id="member-settings-update-profile-btn"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            )}
            {activeTab === "account" && (
              <div className="member-settings-card">
                <h2 className="member-settings-card__title">Account</h2>
                <div className="member-settings-card__divider" />

                <form
                  className="member-settings-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="member-settings-form__group">
                    <label className="member-settings-form__label" htmlFor="member-settings-company">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="member-settings-company"
                      className="member-settings-form__input"
                      value={accountData.companyName}
                      onChange={(e) => setAccountData({ ...accountData, companyName: e.target.value })}
                    />
                  </div>

                  <div className="member-settings-form__group">
                    <label className="member-settings-form__label" htmlFor="member-settings-org-id">
                      Organization ID
                    </label>
                    <input
                      type="text"
                      id="member-settings-org-id"
                      className="member-settings-form__input member-settings-form__input--readonly"
                      value={accountData.organizationId}
                      readOnly
                    />
                    <p className="member-settings-form__helper">
                      Used for API integrations
                    </p>
                  </div>

                  <div className="member-settings-form__group">
                    <label className="member-settings-form__label" htmlFor="member-settings-timezone">
                      Time Zone
                    </label>
                    <input
                      type="text"
                      id="member-settings-timezone"
                      className="member-settings-form__input"
                      value={accountData.timeZone}
                      onChange={(e) => setAccountData({ ...accountData, timeZone: e.target.value })}
                    />
                  </div>

                  <div className="member-settings-form__group">
                    <label className="member-settings-form__label" htmlFor="member-settings-language">
                      Language
                    </label>
                    <input
                      type="text"
                      id="member-settings-language"
                      className="member-settings-form__input"
                      value={accountData.language}
                      onChange={(e) => setAccountData({ ...accountData, language: e.target.value })}
                    />
                  </div>
                  
                  <div className="member-settings-form__footer" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
                    <button
                      type="submit"
                      className="member-settings-form__submit"
                    >
                      Update Account
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </>
    </MemberLayout>
  );
}
