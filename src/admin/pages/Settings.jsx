import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import TopbarIcons from "../components/TopbarIcons";
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
  Download,
  RefreshCw,
  CheckCircle2,
  Clock,
  User,
} from "lucide-react";
import "../css/BaseLayout.css";
import "../css/Settings.css";

import AvatarImg from "../../assets/Avatar.png";
const DEFAULT_AVATAR = AvatarImg;

const settingsNavItems = [
  { key: "profile", label: "Profile", active: true },
  { key: "account", label: "Account", active: true },
  { key: "security", label: "Security", active: true },
  { key: "team", label: "Team Management", active: true },
  { key: "notifications", label: "Notifications", active: true },
  { key: "billing", label: "Billing", active: true },
  { key: "integrations", label: "Integrations", active: true },
  { key: "audit", label: "Audit Logs", active: true },
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

export default function Settings() {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  // Ref to the Layout sidebar-open function (populated via onRegisterMenuOpen)
  const sidebarOpenerRef = useRef(null);

  /* Desktop + Tablet */
  const [activeTab, setActiveTab] = useState("profile");
  const [auditSearchQuery, setAuditSearchQuery] = useState("");
  const [viewingPermissions, setViewingPermissions] = useState(null);
  const [permissionsState, setPermissionsState] = useState({ "Documents-View Documents": true });
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [isDriveConnected, setIsDriveConnected] = useState(true);

  /* Mobile only: "menu" | "profile" | "account" | "security" */
  const [mobileView, setMobileView] = useState("menu");

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
      if (isMobile) {
        setMobileView(tabParam);
      }
    }
  }, [tabParam, isMobile]);

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
    { id: 1, name: "Alice Smith", email: "alice.smith@example.com", role: "Subadmin", status: "Active" },
    { id: 2, name: "Bob Jones", email: "bob.jones@example.com", role: "Subadmin", status: "Active" },
    { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Subadmin", status: "Active" },
    { id: 4, name: "Diana prince", email: "diana.prince@example.com", role: "Subadmin", status: "Not Active" },
  ]);
  const [teamActionOpen, setTeamActionOpen] = useState(null);
  const teamActionRef = useRef(null);

  const [notificationData, setNotificationData] = useState({
    email_document_signed: false,
    email_signature_request: false,
    email_document_expired: false,
    system_updates: false,
    system_security: false,
  });

  const handleNotificationChange = (key) => {
    setNotificationData((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
    <div className="admin-settings-card admin-settings-card--profile">
      <h2 className="admin-settings-card__title">Profile</h2>
      <div className="admin-settings-card__divider" />
      <div className="admin-settings-avatar-row">
        <div className="admin-settings-avatar">
          <img
            src={avatar}
            alt="User avatar"
            className="admin-settings-avatar__img"
            id="admin-settings-avatar-preview"
          />
        </div>
        <div className="admin-settings-avatar-info">
          <input
            type="file"
            accept="image/jpeg,image/gif,image/png"
            ref={fileInputRef}
            className="admin-settings-avatar__file-input"
            id="admin-settings-avatar-upload-input"
            onChange={handleAvatarUpload}
          />
          <button
            className="admin-settings-avatar__upload-btn"
            id="admin-settings-avatar-upload-btn"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            type="button"
          >
            Upload Avatar
          </button>
          <p className="admin-settings-avatar__helper">
            JPG, GIF or PNG. Max size of 800K
          </p>
        </div>
      </div>
      <form
        className="admin-settings-form"
        onSubmit={(e) => e.preventDefault()}
        id="admin-settings-profile-form"
      >
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-full-name">
            Full Name
          </label>
          <input
            type="text"
            id="admin-settings-full-name"
            name="fullName"
            className="admin-settings-form__input"
            value={formData.fullName}
            onChange={handleFormChange}
            autoComplete="name"
          />
        </div>
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-email">
            Email Address
          </label>
          <input
            type="email"
            id="admin-settings-email"
            name="email"
            className="admin-settings-form__input admin-settings-form__input--readonly"
            value={formData.email}
            readOnly
            aria-readonly="true"
          />
          <p className="admin-settings-form__helper">
            Email address cannot be changed here
          </p>
        </div>
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="admin-settings-phone"
            name="phone"
            className="admin-settings-form__input"
            value={formData.phone}
            onChange={handleFormChange}
            autoComplete="tel"
          />
        </div>
        <div className="admin-settings-form__footer">
          <button
            type="submit"
            className="admin-settings-form__submit"
            id="admin-settings-update-profile-btn"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );

  const accountCard = (
    <div className="admin-settings-card admin-settings-card--account">
      <h2 className="admin-settings-card__title">Account</h2>
      <div className="admin-settings-card__divider" />
      <form className="admin-settings-form" onSubmit={(e) => e.preventDefault()}>
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-company">
            Company Name
          </label>
          <input
            type="text"
            id="admin-settings-company"
            className="admin-settings-form__input"
            value={accountData.companyName}
            onChange={(e) => setAccountData({ ...accountData, companyName: e.target.value })}
          />
        </div>
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-org-id">
            Organization ID
          </label>
          <input
            type="text"
            id="admin-settings-org-id"
            className="admin-settings-form__input admin-settings-form__input--readonly"
            value={accountData.organizationId}
            readOnly
          />
          <p className="admin-settings-form__helper">Used for API integrations</p>
        </div>
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-timezone">
            Time Zone
          </label>
          <input
            type="text"
            id="admin-settings-timezone"
            className="admin-settings-form__input"
            value={accountData.timeZone}
            onChange={(e) => setAccountData({ ...accountData, timeZone: e.target.value })}
          />
        </div>
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-language">
            Language
          </label>
          <input
            type="text"
            id="admin-settings-language"
            className="admin-settings-form__input"
            value={accountData.language}
            onChange={(e) => setAccountData({ ...accountData, language: e.target.value })}
          />
        </div>
        <div className="admin-settings-form__footer">
          <button type="submit" className="admin-settings-form__submit">
            Update Account
          </button>
        </div>
      </form>
    </div>
  );

  const securityCard = (
    <div className="admin-settings-card admin-settings-card--security">
      <h2 className="admin-settings-card__title">Security</h2>
      <div className="admin-settings-card__divider" />
      <form
        className="admin-settings-form"
        onSubmit={(e) => e.preventDefault()}
        id="admin-settings-security-form"
      >
        <h3 className="admin-settings-section-title">Change Password</h3>
        <div className="admin-settings-section-divider" />
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-current-password">
            Current Password
          </label>
          <input
            type="text"
            id="admin-settings-current-password"
            name="currentPassword"
            className="admin-settings-form__input"
            value={securityData.currentPassword}
            onChange={handleSecurityChange}
          />
        </div>
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-new-password">
            New Password
          </label>
          <input
            type="password"
            id="admin-settings-new-password"
            name="newPassword"
            className="admin-settings-form__input"
            placeholder="Enter new password"
            value={securityData.newPassword}
            onChange={handleSecurityChange}
          />
        </div>
        <div className="admin-settings-form__group">
          <label className="admin-settings-form__label" htmlFor="admin-settings-confirm-password">
            Confirm New Password
          </label>
          <input
            type="password"
            id="admin-settings-confirm-password"
            name="confirmPassword"
            className="admin-settings-form__input"
            placeholder="Confirm new password"
            value={securityData.confirmPassword}
            onChange={handleSecurityChange}
          />
        </div>
        <h3 className="admin-settings-section-title">Two - Factor Authentication</h3>
        <div className="admin-settings-section-divider" />
        <div className="admin-settings-2fa-row">
          <div className="admin-settings-2fa-info">
            <div className="admin-settings-2fa-label">Enable 2FA</div>
            <div className="admin-settings-2fa-helper">
              Add and extra layer of security to your account by enabling two-factor authentication
            </div>
          </div>
          <label className="admin-settings-toggle">
            <input
              type="checkbox"
              checked={securityData.enable2FA}
              onChange={(e) =>
                setSecurityData({ ...securityData, enable2FA: e.target.checked })
              }
            />
            <span className="admin-settings-toggle-slider" />
          </label>
        </div>
        <div className="admin-settings-form__footer">
          <button
            type="submit"
            className="admin-settings-form__submit"
            id="admin-settings-update-security-btn"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );

  const teamCard = (
    <div className="admin-settings-card admin-settings-card--team">
      <h2 className="admin-settings-card__title">Team Management</h2>
      <div className="admin-settings-card__divider" />

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

      <div className="admin-settings-team-table">
        <div className="admin-settings-team-header">
          <div className="team-col-name">Name</div>
          <div className="team-col-role">Role</div>
          <div className="team-col-status">Status</div>
          <div className="team-col-action">Action</div>
        </div>

        <div className="admin-settings-team-list">
          {teamMembers.map(admin => (
            <div className="admin-settings-team-row" key={admin.id} style={{ zIndex: teamActionOpen === admin.id ? 10 : 1 }}>
              <div className="team-col-name">
                <div className="team-admin-name">{admin.name}</div>
                <div className="team-admin-email">{admin.email}</div>
              </div>
              <div className="team-right-controls">
                <div className="team-col-role">
                  <span className="team-role-badge">{admin.role}</span>
                </div>
                <div className="team-col-status">
                  <span className={`team-status-badge ${admin.status === 'Active' ? 'active' : 'inactive'}`}>
                    {admin.status}
                  </span>
                </div>
                <div className="team-col-action">
                  <button
                    className="team-action-btn"
                    onClick={() => setTeamActionOpen(teamActionOpen === admin.id ? null : admin.id)}
                  >
                    <MoreVertical size={20} color="#666" />
                  </button>
                  {teamActionOpen === admin.id && (
                    <div className="team-action-dropdown" ref={teamActionRef}>
                      <button className="team-dropdown-item permissions" onClick={() => { setViewingPermissions(admin.id); setTeamActionOpen(null); }}>Permissions</button>
                      <button
                        className="team-dropdown-item delete"
                        onClick={() => {
                          setTeamMembers(prev => prev.filter(m => m.id !== admin.id));
                          setTeamActionOpen(null);
                        }}
                      >
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
      <div className="admin-settings-team-footer">
        <button className="admin-settings-form__submit">Add Subadmin</button>
      </div>
    </div>
  );

  const togglePermission = (key) => {
    setPermissionsState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const permissionCategories = [
    { column: 'left', category: "Dashboard", items: ["View Dashboard", "View Analytics", "Export Reports"] },
    { column: 'left', category: "signers", items: ["View", "Add", "Edit", "Delete"] },
    { column: 'left', category: "Templates", items: ["View", "Create", "Delete"] },
    { column: 'right', category: "Documents", items: ["View Documents", "Upload Documents", "Edit Documents", "Delete Documents", "Send for Signature", "Cancel Requests", "Archive Documents"] },
    { column: 'right', category: "Contact Books", items: ["View", "Add", "Edit", "Delete"] }
  ];

  const permissionsViewComponent = (
    <div className="admin-permissions-card">
      <h2 className="admin-permissions-card__title">Permission Settings</h2>
      <div className="admin-permissions-card__divider" />

      <div className="admin-permissions-container">
        {permissionCategories.map(cat => (
          <div key={cat.category} className={`admin-permissions-group group-${cat.category.replace(/\s+/g, '-')}`}>
            <h3 className="admin-permissions-group-title">{cat.category}</h3>
            <div className="admin-permissions-group-items">
              {cat.items.map(item => {
                const key = `${cat.category}-${item}`;
                const isChecked = permissionsState[key] || false;
                return (
                  <label key={item} className="admin-permission-item">
                    <span className="admin-permission-item-label">{item}</span>
                    <input type="checkbox" checked={isChecked} onChange={() => togglePermission(key)} className="admin-permission-checkbox-input" />
                    <span className="admin-permission-custom-checkbox"></span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-permissions-footer">
        <button className="admin-settings-form__submit" onClick={() => setViewingPermissions(null)}>Save</button>
      </div>
    </div>
  );

  const notificationCard = (
    <div className="admin-settings-card admin-settings-card--notifications">
      <h2 className="admin-settings-card__title">Notification</h2>
      <div className="admin-settings-card__divider" />

      <div className="admin-notification-section">
        <h3 className="admin-notification-section-title">Email Notification</h3>
        <div className="admin-notification-list">
          <label className="admin-notification-item">
            <div className="admin-notification-item-text">
              <h4>Document Signed</h4>
              <p>Receive an email when someone signs your document</p>
            </div>
            <input type="checkbox" checked={notificationData.email_document_signed} onChange={() => handleNotificationChange('email_document_signed')} className="admin-permission-checkbox-input" />
            <span className="admin-permission-custom-checkbox"></span>
          </label>
          <label className="admin-notification-item">
            <div className="admin-notification-item-text">
              <h4>Signature Request Received</h4>
              <p>Get notified when you receive a new signature request</p>
            </div>
            <input type="checkbox" checked={notificationData.email_signature_request} onChange={() => handleNotificationChange('email_signature_request')} className="admin-permission-checkbox-input" />
            <span className="admin-permission-custom-checkbox"></span>
          </label>
          <label className="admin-notification-item">
            <div className="admin-notification-item-text">
              <h4>Document Expired</h4>
              <p>Alert me when a pending document passes its expiration date</p>
            </div>
            <input type="checkbox" checked={notificationData.email_document_expired} onChange={() => handleNotificationChange('email_document_expired')} className="admin-permission-checkbox-input" />
            <span className="admin-permission-custom-checkbox"></span>
          </label>
        </div>
      </div>

      <div className="admin-notification-section">
        <h3 className="admin-notification-section-title">System Alert</h3>
        <div className="admin-notification-list">
          <label className="admin-notification-item">
            <div className="admin-notification-item-text">
              <h4>System Updates</h4>
              <p>News about product and feature updates</p>
            </div>
            <input type="checkbox" checked={notificationData.system_updates} onChange={() => handleNotificationChange('system_updates')} className="admin-permission-checkbox-input" />
            <span className="admin-permission-custom-checkbox"></span>
          </label>
          <label className="admin-notification-item">
            <div className="admin-notification-item-text">
              <h4>Security Alerts</h4>
              <p>Important notifications about your account security</p>
            </div>
            <input type="checkbox" checked={notificationData.system_security} onChange={() => handleNotificationChange('system_security')} className="admin-permission-checkbox-input" />
            <span className="admin-permission-custom-checkbox"></span>
          </label>
        </div>
      </div>

      <div className="admin-settings-form__footer">
        <button className="admin-settings-form__submit">Save</button>
      </div>
    </div>
  );

  const billingCard = (
    <div className="admin-settings-card admin-settings-card--billing">
      <h2 className="admin-settings-card__title">Billing</h2>
      <div className="admin-settings-card__divider" />

      <div className="admin-billing-section">
        <h3 className="admin-billing-section-title">Current Plan</h3>
        <div className="admin-billing-plan-card">
          <div className="admin-billing-plan-header">
            <div className="admin-billing-plan-info">
              <h4 className="admin-billing-plan-name">Plans</h4>
              <p className="admin-billing-plan-billed">Billed annually</p>
            </div>
            <div className="admin-billing-plan-price">
              <span className="price-amount">$49</span>
              <span className="price-period">/month</span>
            </div>
          </div>
          <div className="admin-billing-plan-divider" />
          <ul className="admin-billing-plan-features">
            <li>Unlimited Document Signing</li>
            <li>Up to 10 Team Members</li>
            <li>Advance Templates</li>
          </ul>
          <div className="admin-billing-plan-footer">
            <span className="admin-billing-next-date">Next billing date : 24 Jan 2027</span>
            <button className="admin-billing-upgrade-btn">Upgrade Plan</button>
          </div>
        </div>
      </div>

      <div className="admin-billing-section">
        <h3 className="admin-billing-section-title">Payment Method</h3>
        <div className="admin-billing-payment-card">
          <div className="admin-billing-card-info">
            <div className="admin-billing-card-icon-wrapper">
              <CreditCard size={16} color="#666" />
              <span className="admin-billing-card-brand">Visa</span>
            </div>
            <div className="admin-billing-card-details">
              <span className="card-number">Visa ending in 4242</span>
              <span className="card-expiry">Expired in 2028</span>
            </div>
          </div>
          <button className="admin-billing-edit-btn">Edit</button>
        </div>
      </div>

      <div className="admin-billing-section">
        <h3 className="admin-billing-section-title">Billing Address</h3>
        <div className="admin-billing-address-card">
          <div className="admin-billing-invoice-info">
            <span className="invoice-title">Invoice</span>
            <span className="invoice-date">24 Jan 2026</span>
          </div>
          <div className="admin-billing-invoice-actions">
            <button className="icon-btn"><Download size={16} color="#666" /></button>
            <div className="tooltip-container">
              <button className="icon-btn"><RefreshCw size={16} color="#666" /></button>
              <div className="invoice-error-tooltip">
                <AlertCircle size={14} color="#666" />
                <span>Unable to download. Refresh and try again</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const integrationsCard = (
    <div className="admin-settings-card admin-settings-card--integrations">
      <h2 className="admin-settings-card__title">Integration</h2>
      <div className="admin-settings-card__divider" />

      <p className="admin-integrations-description">
        Connect Sign App to your favourite tools to streamline your document workflow.
      </p>

      <div className="admin-integrations-list">
        <div className="admin-integration-item">
          <div className="admin-integration-item-left">
            <div className="admin-integration-item-header">
              <svg viewBox="0 0 87.3 78" className="admin-integration-logo" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
              </svg>
              <div className="admin-integration-info">
                <h3 className="admin-integration-title">Google Drive</h3>
                <span className="admin-integration-status">
                  {isDriveConnected ? "CONNECTED" : "DISCONNECTED"}
                </span>
              </div>
            </div>
            <p className="admin-integration-description admin-integration-desc--desktop">
              Sync your signed documents directly to Sync your signed documents directly to Google Drive for instant access<br className="desktop-only-br" />and secure storage. Enjoy seamless organization, real-time backup, and effortless sharing with your team.Google<br className="desktop-only-br" />drive
            </p>
            <p className="admin-integration-description admin-integration-desc--tablet">
              Sync your signed documents directly to Sync your signed documents directly to Google Drive for instant access and secure storage. Enjoy seamless organization, real-time backup, and effortless sharing with your team.Google drive
            </p>
          </div>
          <div className="admin-integration-item-right">
            {isDriveConnected ? (
              <button
                className="admin-integration-action-btn disconnect"
                type="button"
                onClick={() => setShowDisconnectModal(true)}
              >
                DISCONNECT
              </button>
            ) : (
              <button
                className="admin-integration-action-btn connect"
                type="button"
                onClick={() => setIsDriveConnected(true)}
              >
                CONNECT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );


  const auditLogsData = [
    { id: 1, date: "Mar 24, 10:45 AM", name: "Alice Smith", action: "Signed Document", document: "NDA_V2.pdf", status: "Success" },
    { id: 2, date: "Mar 23, 2:15 PM", name: "Bob Jones", action: "Created Template", document: "Emploement_Offer", status: "Success" },
    { id: 3, date: "Mar 23, 11:00 AM", name: "System", action: "Auto- Archieved", document: "Project_Spec.pdf", status: "Success" },
    { id: 4, date: "Mar 23, 11:00 AM", name: "Charlie Brown", action: "Failed Logined Attempt", document: "-", status: "Failed" },
  ];

  const filteredAuditLogs = auditLogsData.filter((log) => {
    const q = auditSearchQuery.toLowerCase();
    return (
      log.date.toLowerCase().includes(q) ||
      log.name.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.document.toLowerCase().includes(q) ||
      log.status.toLowerCase().includes(q)
    );
  });

  const auditCard = (
    <div className="admin-settings-card admin-settings-card--audit">
      {/* ── Desktop & Tablet Layout (Hidden on Mobile) ── */}
      <div className="admin-audit-desktop-layout">
        <div className="admin-audit-header">
          <h2 className="admin-settings-card__title">Audit Logs</h2>
          <div className="admin-audit-search">
            <input 
              type="text" 
              placeholder="Search Logs....." 
              className="admin-audit-search-input" 
              value={auditSearchQuery}
              onChange={(e) => setAuditSearchQuery(e.target.value)}
            />
            <Search size={16} className="admin-audit-search-icon" />
          </div>
        </div>
        <div className="admin-settings-card__divider" />

        <div className="admin-audit-table">
          <div className="admin-audit-table-header">
            <div className="audit-col audit-col-date">DATE</div>
            <div className="audit-col audit-col-name">NAME</div>
            <div className="audit-col audit-col-action">ACTION</div>
            <div className="audit-col audit-col-document">DOCUMENT</div>
            <div className="audit-col audit-col-status">STATUS</div>
          </div>
          <div className="admin-audit-table-body">
            {filteredAuditLogs.map((log) => (
              <div key={log.id} className="admin-audit-row">
                <div className="audit-col audit-col-date">{log.date}</div>
                <div className="audit-col audit-col-name">{log.name}</div>
                <div className="audit-col audit-col-action">{log.action}</div>
                <div className="audit-col audit-col-document">{log.document}</div>
                <div className="audit-col audit-col-status">
                  <span className={`audit-status-badge audit-status-${log.status.toLowerCase()}`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Layout (Hidden on Desktop & Tablet) ── */}
      <div className="admin-audit-mobile-layout">
        <h2 className="admin-settings-card__title">Audit Logs</h2>
        <div className="admin-settings-card__divider" />

        {/* Mobile Search & Filter */}
        <div className="admin-audit-mobile-controls">
          <div className="admin-audit-mobile-search-wrapper">
            <Search size={16} className="admin-audit-mobile-search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              className="admin-audit-mobile-search-input" 
              value={auditSearchQuery}
              onChange={(e) => setAuditSearchQuery(e.target.value)}
            />
          </div>
          <button className="admin-audit-mobile-filter-btn" type="button">
            <Filter size={18} />
          </button>
        </div>

        {/* Mobile Filter Tabs */}
        <div className="admin-audit-mobile-tabs">
          <button className="admin-audit-mobile-tab admin-audit-mobile-tab--active" type="button">
            <FileText size={18} />
          </button>
          <button className="admin-audit-mobile-tab" type="button">
            <CheckCircle2 size={18} />
          </button>
          <button className="admin-audit-mobile-tab" type="button">
            <AlertCircle size={18} />
          </button>
          <button className="admin-audit-mobile-tab" type="button">
            <Clock size={18} />
          </button>
        </div>

        {/* Mobile Cards List */}
        <div className="admin-audit-mobile-list">
          {filteredAuditLogs.map((log) => (
            <div key={log.id} className="admin-audit-mobile-card">
              <div className="admin-audit-mobile-card-row admin-audit-mobile-card-row--top">
                <div className="admin-audit-mobile-file">
                  <FileText size={18} className="admin-audit-mobile-icon-file" />
                  <span className="admin-audit-mobile-filename">{log.document}</span>
                </div>
                <span className={`audit-status-badge audit-status-${log.status.toLowerCase()}`}>
                  {log.status}
                </span>
              </div>
              <div className="admin-audit-mobile-card-row admin-audit-mobile-card-row--bottom">
                <div className="admin-audit-mobile-user">
                  <User size={16} className="admin-audit-mobile-icon-user" />
                  <span className="admin-audit-mobile-username">{log.name}</span>
                </div>
                <span className="admin-audit-mobile-date">{log.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ════════════════════════════════════════════════════════════════════════
     MOBILE — completely separate render tree.
     hideMobileTopbar suppresses the global mobile-topbar from Layout.
     The custom header here reuses the identical CSS classes and structure
     as the global mobile-topbar so it matches every other mobile page.
     ════════════════════════════════════════════════════════════════════════ */
  if (isMobile) {
    return (
      <Layout
        hideMobileTopbar
        hideMobileNavbar={mobileView !== "menu"}
        className="admin-settings-page"
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

          {/* Right: same TopbarIcons used by every other page */}
          <TopbarIcons iconSize={18} className="mobile-topbar__icons" />
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
              <button
                type="button"
                className="ms-mobile-menu-item"
                onClick={() => setMobileView("notifications")}
              >
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><Bell size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Notification</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </button>
              <button
                type="button"
                className="ms-mobile-menu-item"
                onClick={() => setMobileView("billing")}
              >
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><CreditCard size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Billing</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </button>
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
              <button
                type="button"
                className="ms-mobile-menu-item"
                onClick={() => { setActiveTab("integrations"); setMobileView("integrations"); }}
              >
                <div className="ms-mobile-menu-item__left">
                  <span className="ms-mobile-menu-item__icon"><Share2 size={18} /></span>
                  <span className="ms-mobile-menu-item__label">Integrations</span>
                </div>
                <ChevronRight size={18} color="#9CA3AF" />
              </button>
              <div
                className="ms-mobile-menu-item"
                onClick={() => { setActiveTab("audit"); setMobileView("audit"); }}
              >
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
        {mobileView === "notifications" && (
          <div className="ms-mobile-detail">{notificationCard}</div>
        )}
        {mobileView === "security" && (
          <div className="ms-mobile-detail">{securityCard}</div>
        )}
        {mobileView === "team" && !viewingPermissions && (
          <div className="ms-mobile-detail">{teamCard}</div>
        )}
        {mobileView === "billing" && (
          <div className="ms-mobile-detail">{billingCard}</div>
        )}
        {mobileView === "audit" && (
          <div className="ms-mobile-detail">{auditCard}</div>
        )}
        {mobileView === "integrations" && (
          <div className="ms-mobile-detail">{integrationsCard}</div>
        )}
        {viewingPermissions && (
          <div className="ms-mobile-detail ms-mobile-permissions">
            {permissionsViewComponent}
          </div>
        )}
      </Layout>
    );
  }

  /* ════════════════════════════════════════════════════════════════════════
     DESKTOP + TABLET — original layout, unchanged.
     Topbar is only mounted here; never on mobile.
     ════════════════════════════════════════════════════════════════════════ */
  const searchComponent = (
    <div className="admin-settings-topbar-search">
      <Search size={16} color="#8A949F" strokeWidth={1.5} />
      <input
        type="text"
        className="admin-settings-topbar-search__input"
        placeholder="Search Documents"
        id="admin-settings-search-input"
      />
    </div>
  );

  return (
    <Layout className="admin-settings-page" hideMobileNavbar={mobileView === "detail"}>
      <>
        {/* Desktop topbar */}
        <Topbar
          title={viewingPermissions ? "Permission Settings" : "Settings"}
          subtitle={viewingPermissions ? "Manage your permissions." : "Manage your account preferences and configurations"}
          actionButton={searchComponent}
        />

        {/* Tablet page header */}
        <div className="mobile-page-header admin-settings-mobile-header">
          <div className="admin-settings-mobile-header__top-row">
            <div className="admin-settings-mobile-header__titles">
              <div className="topbar__title">
                {viewingPermissions ? "Permission Settings" : "Settings"}
              </div>
              <div className="topbar__sub">
                {viewingPermissions ? "Manage your permissions." : "Manage your account preferences and configurations"}
              </div>
            </div>
            <div className="admin-settings-topbar-search admin-settings-mobile-search">
              <Search size={16} color="#8A949F" strokeWidth={1.5} />
              <input
                type="text"
                className="admin-settings-topbar-search__input"
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        {/* Settings body */}
        {viewingPermissions ? (
          <div className="admin-settings-permissions-view">
            {permissionsViewComponent}
          </div>
        ) : (
          <div className="admin-settings-body">
            <nav className="admin-settings-nav" aria-label="Member settings navigation">
              {settingsNavItems.map((item) => (
                <button
                  key={item.key}
                  id={`admin-settings-nav-${item.key}`}
                  className={`admin-settings-nav__item${activeTab === item.key ? " admin-settings-nav__item--active" : ""
                    }${!item.active ? " admin-settings-nav__item--disabled" : ""}`}
                  onClick={() => handleTabClick(item)}
                  disabled={!item.active}
                  aria-current={activeTab === item.key ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="admin-settings-content">
              {activeTab === "profile" && profileCard}
              {activeTab === "account" && accountCard}
              {activeTab === "notifications" && notificationCard}
              {activeTab === "security" && securityCard}
              {activeTab === "team" && !viewingPermissions && teamCard}
              {activeTab === "team" && viewingPermissions && permissionsViewComponent}
              {activeTab === "billing" && billingCard}
              {activeTab === "integrations" && integrationsCard}
              {activeTab === "audit" && auditCard}
            </div>
          </div>
        )}
      </>
      {showDisconnectModal && (
        <div className="integration-modal-backdrop" onClick={() => setShowDisconnectModal(false)}>
          <div className="integration-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="integration-modal-content">
              <div className="integration-modal-header-row">
                <svg viewBox="0 0 24 24" className="integration-modal-warning-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#E5252A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="integration-modal-title">Disconnect Integration?</h3>
              </div>

              <p className="integration-modal-description">
                Disconnecting will stop data sync and disable related work flows. Existing Documents will not be affected.
              </p>

              <ul className="integration-modal-list">
                <li>No new document will sync</li>
                <li>Automations using this integrations will stop</li>
                <li>You can reconnect anytime</li>
              </ul>
            </div>

            <div className="integration-modal-footer">
              <button className="integration-modal-btn cancel-btn" onClick={() => setShowDisconnectModal(false)}>
                Cancel
              </button>
              <button className="integration-modal-btn disconnect-btn" onClick={() => { setIsDriveConnected(false); setShowDisconnectModal(false); }}>
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
