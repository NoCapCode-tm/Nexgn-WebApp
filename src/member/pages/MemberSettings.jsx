import { useState, useRef, useEffect } from "react";
import MemberLayout from "../components/MemberLayout";
import MemberTopbar from "../components/MemberTopbar";
import MemberTopbarIcons from "../components/MemberTopbarIcons";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Building,
  Bell,
  CreditCard,
  Shield,
  Users,
  Share2,
  FileText,
  LogOut,
  AlertCircle,
  Menu,
  PauseCircle,
  Trash2,
  MoreVertical,
  Filter,
  Plus,
} from "lucide-react";
import "../css/MemberBaseLayout.css";
import "../css/MemberSettings.css";

import AvatarImg from "../../assets/Avatar.png";
const DEFAULT_AVATAR = AvatarImg;

const settingsNavItems = [
  { key: "profile", label: "Profile", active: true },
  { key: "account", label: "Account", active: true },
  { key: "security", label: "Security", active: true },
  { key: "team", label: "Team Management", active: true },
  { key: "notifications", label: "Notifications", active: false },
  { key: "billing", label: "Billing", active: false },
  { key: "integrations", label: "Integrations", active: false },
  { key: "audit", label: "Audit Logs", active: false },
];

/* ── Hook: true when viewport is ≤ 768 px ─────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function MemberSettings() {
  const isMobile = useIsMobile();
  // Ref to the MemberLayout sidebar-open function (populated via onRegisterMenuOpen)
  const sidebarOpenerRef = useRef(null);

  /* Desktop + Tablet */
  const [activeTab, setActiveTab] = useState("profile");
  const [viewingPermissions, setViewingPermissions] = useState(null);
  const [permissionsState, setPermissionsState] = useState({ "Documents-View Documents": true });

  /* Mobile only: "menu" | "profile" | "account" | "security" */
  const [mobileView, setMobileView] = useState("menu");

  /* Shared form state */
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
  const [securityData, setSecurityData] = useState({
    currentPassword: "********",
    newPassword: "",
    confirmPassword: "",
    enable2FA: true,
  });
  
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alice Smith", email: "alice.smith@example.com", role: "Member", status: "Active" },
    { id: 2, name: "Bob Jones", email: "bob.jones@example.com", role: "Member", status: "Active" },
    { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Member", status: "Active" },
    { id: 4, name: "Diana prince", email: "diana.prince@example.com", role: "Member", status: "Not Active" },
  ]);
  const [teamActionOpen, setTeamActionOpen] = useState(null);
  const teamActionRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (teamActionRef.current && !teamActionRef.current.contains(event.target)) {
        setTeamActionOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fileInputRef = useRef(null);

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({ ...prev, [name]: value }));
  };
  const handleTabClick = (item) => {
    if (item.active) setActiveTab(item.key);
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

  /* ── Card fragments (defined once, reused in both shells) ─────────────── */
  const profileCard = (
    <div className="member-settings-card member-settings-card--profile">
      <h2 className="member-settings-card__title">Profile</h2>
      <div className="member-settings-card__divider" />
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
      <form
        className="member-settings-form"
        onSubmit={(e) => e.preventDefault()}
        id="member-settings-profile-form"
      >
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
  );

  const accountCard = (
    <div className="member-settings-card member-settings-card--account">
      <h2 className="member-settings-card__title">Account</h2>
      <div className="member-settings-card__divider" />
      <form className="member-settings-form" onSubmit={(e) => e.preventDefault()}>
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
          <p className="member-settings-form__helper">Used for API integrations</p>
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
        <div className="member-settings-form__footer">
          <button type="submit" className="member-settings-form__submit">
            Update Account
          </button>
        </div>
      </form>
    </div>
  );

  const securityCard = (
    <div className="member-settings-card member-settings-card--security">
      <h2 className="member-settings-card__title">Security</h2>
      <div className="member-settings-card__divider" />
      <form
        className="member-settings-form"
        onSubmit={(e) => e.preventDefault()}
        id="member-settings-security-form"
      >
        <h3 className="member-settings-section-title">Change Password</h3>
        <div className="member-settings-section-divider" />
        <div className="member-settings-form__group">
          <label className="member-settings-form__label" htmlFor="member-settings-current-password">
            Current Password
          </label>
          <input
            type="text"
            id="member-settings-current-password"
            name="currentPassword"
            className="member-settings-form__input"
            value={securityData.currentPassword}
            onChange={handleSecurityChange}
          />
        </div>
        <div className="member-settings-form__group">
          <label className="member-settings-form__label" htmlFor="member-settings-new-password">
            New Password
          </label>
          <input
            type="password"
            id="member-settings-new-password"
            name="newPassword"
            className="member-settings-form__input"
            placeholder="Enter new password"
            value={securityData.newPassword}
            onChange={handleSecurityChange}
          />
        </div>
        <div className="member-settings-form__group">
          <label className="member-settings-form__label" htmlFor="member-settings-confirm-password">
            Confirm New Password
          </label>
          <input
            type="password"
            id="member-settings-confirm-password"
            name="confirmPassword"
            className="member-settings-form__input"
            placeholder="Confirm new password"
            value={securityData.confirmPassword}
            onChange={handleSecurityChange}
          />
        </div>
        <h3 className="member-settings-section-title">Two - Factor Authentication</h3>
        <div className="member-settings-section-divider" />
        <div className="member-settings-2fa-row">
          <div className="member-settings-2fa-info">
            <div className="member-settings-2fa-label">Enable 2FA</div>
            <div className="member-settings-2fa-helper">
              Add and extra layer of security to your account by enabling two-factor authentication
            </div>
          </div>
          <label className="member-settings-toggle">
            <input
              type="checkbox"
              checked={securityData.enable2FA}
              onChange={(e) =>
                setSecurityData({ ...securityData, enable2FA: e.target.checked })
              }
            />
            <span className="member-settings-toggle-slider" />
          </label>
        </div>
        <div className="member-settings-form__footer">
          <button
            type="submit"
            className="member-settings-form__submit"
            id="member-settings-update-security-btn"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );

  const teamCard = (
    <div className="member-settings-card member-settings-card--team">
      <h2 className="member-settings-card__title">Team Management</h2>
      <div className="member-settings-card__divider" />
      
      {/* Mobile Team Filter Row */}
      <div className="ms-mobile-team-filter-row">
        <div className="ms-mobile-team-search">
          <input type="text" placeholder="Search" />
        </div>
        <button className="ms-mobile-team-icon-btn">
          <Filter size={18} strokeWidth={1.5} color="#4B5563" />
        </button>
        <button className="ms-mobile-team-icon-btn">
          <Plus size={18} strokeWidth={1.5} color="#4B5563" />
        </button>
      </div>

      <div className="member-settings-team-table">
        <div className="member-settings-team-header">
           <div className="team-col-name">Name</div>
           <div className="team-col-role">Role</div>
           <div className="team-col-status">Status</div>
           <div className="team-col-action">Action</div>
        </div>
        
        <div className="member-settings-team-list">
          {teamMembers.map(member => (
            <div className="member-settings-team-row" key={member.id} style={{ zIndex: teamActionOpen === member.id ? 10 : 1 }}>
              <div className="team-col-name">
                 <div className="team-member-name">{member.name}</div>
                 <div className="team-member-email">{member.email}</div>
              </div>
              <div className="team-right-controls">
                <div className="team-col-role">
                   <span className="team-role-badge">{member.role}</span>
                </div>
                <div className="team-col-status">
                   <span className={`team-status-badge ${member.status === 'Active' ? 'active' : 'inactive'}`}>
                      {member.status}
                   </span>
                </div>
                <div className="team-col-action">
                   <button 
                     className="team-action-btn" 
                     onClick={() => setTeamActionOpen(teamActionOpen === member.id ? null : member.id)}
                   >
                      <MoreVertical size={20} color="#666" />
                   </button>
                   {teamActionOpen === member.id && (
                     <div className="team-action-dropdown" ref={teamActionRef}>
                        <button className="team-dropdown-item permissions" onClick={() => { setViewingPermissions(member.id); setTeamActionOpen(null); }}>Permissions</button>
                        <button className="team-dropdown-item delete">
                           <span className="team-x-icon">×</span> Remove
                        </button>
                     </div>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="member-settings-team-footer">
         <button className="member-settings-form__submit">Add Member</button>
      </div>
    </div>
  );

  const togglePermission = (key) => {
     setPermissionsState(prev => ({...prev, [key]: !prev[key]}));
  };

  const permissionCategories = [
    { column: 'left', category: "Dashboard", items: ["View Dashboard", "View Analytics", "Export Reports"] },
    { column: 'left', category: "signers", items: ["View", "Add", "Edit", "Delete"] },
    { column: 'left', category: "Templates", items: ["View", "Create", "Delete"] },
    { column: 'right', category: "Documents", items: ["View Documents", "Upload Documents", "Edit Documents", "Delete Documents", "Send for Signature", "Cancel Requests", "Archive Documents"] },
    { column: 'right', category: "Contact Books", items: ["View", "Add", "Edit", "Delete"] }
  ];

  const permissionsViewComponent = (
    <div className="member-permissions-card">
       <h2 className="member-permissions-card__title">Permission Settings</h2>
       <div className="member-permissions-card__divider" />
       
       <div className="member-permissions-container">
         {permissionCategories.map(cat => (
            <div key={cat.category} className={`member-permissions-group group-${cat.category.replace(/\s+/g, '-')}`}>
               <h3 className="member-permissions-group-title">{cat.category}</h3>
               <div className="member-permissions-group-items">
                 {cat.items.map(item => {
                    const key = `${cat.category}-${item}`;
                    const isChecked = permissionsState[key] || false;
                    return (
                      <label key={item} className="member-permission-item">
                         <span className="member-permission-item-label">{item}</span>
                         <input type="checkbox" checked={isChecked} onChange={() => togglePermission(key)} className="member-permission-checkbox-input" />
                         <span className="member-permission-custom-checkbox"></span>
                      </label>
                    );
                 })}
               </div>
            </div>
         ))}
       </div>

       <div className="member-permissions-footer">
          <button className="member-settings-form__submit" onClick={() => setViewingPermissions(null)}>Save</button>
       </div>
    </div>
  );

  /* ════════════════════════════════════════════════════════════════════════
     MOBILE — completely separate render tree.
     hideMobileTopbar suppresses the global mobile-topbar from MemberLayout.
     The custom header here reuses the identical CSS classes and structure
     as the global mobile-topbar so it matches every other mobile page.
     ════════════════════════════════════════════════════════════════════════ */
  if (isMobile) {
    return (
      <MemberLayout
        hideMobileTopbar
        hideMobileNavbar={mobileView !== "menu"}
        className="member-settings-page"
        onRegisterMenuOpen={(openFn) => { sidebarOpenerRef.current = openFn; }}
      >
        {/* ── Custom mobile header — same classes as global mobile-topbar ── */}
        <header className="mobile-topbar ms-mobile-header--settings">
          {/* Left: back arrow (detail) or hamburger (menu) */}
          {mobileView !== "menu" ? (
            <button
              type="button"
              className="mobile-topbar__hamburger"
              onClick={() => setMobileView("menu")}
              aria-label="Go back"
            >
              <ChevronLeft size={22} color="#1a1a2e" strokeWidth={2} />
            </button>
          ) : (
            <button
              type="button"
              className="mobile-topbar__hamburger"
              aria-label="Open menu"
              onClick={() => sidebarOpenerRef.current?.()}
            >
              <Menu size={22} color="#1a1a2e" />
            </button>
          )}

          {/* Right: same MemberTopbarIcons used by every other page */}
          <MemberTopbarIcons iconSize={18} className="mobile-topbar__icons" />
        </header>

        {/* ── Detail sub-header (Settings title + search) ── */}
        {mobileView !== "menu" && (
          <div className="mobile-page-header ms-mobile-detail-header">
            <div className="ms-mobile-detail-header__row">
              <span className="ms-mobile-detail-header__title">
                {viewingPermissions ? "Permission Settings" : "Settings"}
              </span>
              <button
                type="button"
                className="ms-mobile-detail-header__search-btn"
                aria-label="Search"
              >
                <Search size={32} color="#8A949F" strokeWidth={2} />
              </button>
            </div>
            <p className="ms-mobile-detail-header__sub">
              Manage and track all your signed and&nbsp;pending document
            </p>
          </div>
        )}

        {/* ── Menu screen ── */}
        {mobileView === "menu" && (
          <div className="ms-mobile-menu">
            {/* Profile shortcut card */}
            <button
              type="button"
              className="ms-mobile-profile-card"
              onClick={() => setMobileView("profile")}
            >
              <div className="ms-mobile-profile-card__avatar">
                <img src={avatar} alt="Avatar" />
              </div>
              <div className="ms-mobile-profile-card__info">
                <span className="ms-mobile-profile-card__name">{formData.fullName}</span>
                <span className="ms-mobile-profile-card__email">{formData.email}</span>
                <span className="ms-mobile-profile-card__role">Admin</span>
              </div>
              <ChevronRight size={20} color="#9CA3AF" />
            </button>

            {/* General group */}
            <p className="ms-mobile-group-title">General</p>
            <div className="ms-mobile-group-items">
              <button
                type="button"
                className="ms-mobile-menu-item"
                onClick={() => setMobileView("account")}
              >
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><Building size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Account</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </button>
              <div className="ms-mobile-menu-item ms-mobile-menu-item--disabled">
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><Bell size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Notification</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </div>
              <div className="ms-mobile-menu-item ms-mobile-menu-item--disabled">
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><CreditCard size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Billing</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </div>
            </div>

            {/* Security & Organization group */}
            <p className="ms-mobile-group-title">Security &amp; Organization</p>
            <div className="ms-mobile-group-items">
              <button
                type="button"
                className="ms-mobile-menu-item"
                onClick={() => setMobileView("security")}
              >
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><Shield size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Security</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </button>
              <button
                type="button"
                className="ms-mobile-menu-item"
                onClick={() => setMobileView("team")}
              >
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><Users size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Team Management</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </button>
              <div className="ms-mobile-menu-item ms-mobile-menu-item--disabled">
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><Share2 size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Integrations</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </div>
              <div className="ms-mobile-menu-item ms-mobile-menu-item--disabled">
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><FileText size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Audit Logs</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </div>
            </div>

            {/* Account Management group */}
            <p className="ms-mobile-group-title">Account Management</p>
            <div className="ms-mobile-group-items">
              <div className="ms-mobile-menu-item">
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><LogOut size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Logout</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </div>
              <div className="ms-mobile-menu-item ms-mobile-menu-item--disabled">
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon" style={{ color: "#DC2626" }}>
                    <PauseCircle size={18} />
                  </span>
                  <span className="ms-mobile-menu-item__label" style={{ color: "#DC2626" }}>
                    Deactivate Account
                  </span>
                </div>
                <ChevronRight size={18} color="#111111" />
              </div>
              <div className="ms-mobile-menu-item ms-mobile-menu-item--disabled">
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon" style={{ color: "#DC2626" }}>
                    <Trash2 size={18} />
                  </span>
                  <span className="ms-mobile-menu-item__label" style={{ color: "#DC2626" }}>
                    Delete Account
                  </span>
                </div>
                <ChevronRight size={18} color="#111111" />
              </div>
            </div>
          </div>
        )}

        {/* ── Detail screens ── */}
        {mobileView === "profile" && (
          <div className="ms-mobile-detail">{profileCard}</div>
        )}
        {mobileView === "account" && (
          <div className="ms-mobile-detail">{accountCard}</div>
        )}
        {mobileView === "security" && (
          <div className="ms-mobile-detail">{securityCard}</div>
        )}
        {mobileView === "team" && !viewingPermissions && (
          <div className="ms-mobile-detail">{teamCard}</div>
        )}
        {viewingPermissions && (
          <div className="ms-mobile-detail ms-mobile-permissions">
            {permissionsViewComponent}
          </div>
        )}
      </MemberLayout>
    );
  }

  /* ════════════════════════════════════════════════════════════════════════
     DESKTOP + TABLET — original layout, unchanged.
     MemberTopbar is only mounted here; never on mobile.
     ════════════════════════════════════════════════════════════════════════ */
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

  return (
    <MemberLayout className="member-settings-page" hideMobileNavbar={mobileView === "detail"}>
      <>
        {/* Desktop topbar */}
        <MemberTopbar
          title={viewingPermissions ? "Permission Settings" : "Settings"}
          subtitle={viewingPermissions ? "Manage your permissions." : "Manage your account preferences and configurations"}
          actionButton={searchComponent}
        />

        {/* Tablet page header */}
        <div className="mobile-page-header member-settings-mobile-header">
          <div className="member-settings-mobile-header__top-row">
            <div className="member-settings-mobile-header__titles">
              <div className="topbar__title">
                {viewingPermissions ? "Permission Settings" : "Settings"}
              </div>
              <div className="topbar__sub">
                {viewingPermissions ? "Manage your permissions." : "Manage your account preferences and configurations"}
              </div>
            </div>
            <div className="member-settings-topbar-search member-settings-mobile-search">
              <Search size={16} color="#8A949F" strokeWidth={1.5} />
              <input
                type="text"
                className="member-settings-topbar-search__input"
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        {/* Settings body */}
        {viewingPermissions ? (
          <div className="member-settings-permissions-view">
             {permissionsViewComponent}
          </div>
        ) : (
          <div className="member-settings-body">
            <nav className="member-settings-nav" aria-label="Member settings navigation">
            {settingsNavItems.map((item) => (
              <button
                key={item.key}
                id={`member-settings-nav-${item.key}`}
                className={`member-settings-nav__item${
                  activeTab === item.key ? " member-settings-nav__item--active" : ""
                }${!item.active ? " member-settings-nav__item--disabled" : ""}`}
                onClick={() => handleTabClick(item)}
                disabled={!item.active}
                aria-current={activeTab === item.key ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="member-settings-content">
            {activeTab === "profile" && profileCard}
            {activeTab === "account" && accountCard}
            {activeTab === "security" && securityCard}
            {activeTab === "team" && teamCard}
          </div>
        </div>
        )}
      </>
    </MemberLayout>
  );
}
