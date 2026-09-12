import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Archive,
  Bell,
  Building,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  LogOut,
  PauseCircle,
  Share2,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import axios from "axios";

import Layout from "../../components/Layout/Layout";
import Topbar from "../../components/Layout/Topbar";
import TopbarIcons from "../../components/Layout/TopbarIcons";
import LoadingScreen from "../../components/Layout/LoadingScreen";
import { API_URL } from "../../config";

import "../../styles/BaseLayout.css";
import "./Settings.css";
import "../contacts/ContactBook.css";

import Profile from "./sections/Profile";
import Account from "./sections/Account";
import Security from "./sections/Security";
import TeamManagement from "./sections/TeamManagement";
import Notifications from "./sections/Notifications";
import Billing from "./sections/Billing";
import Integrations from "./sections/Integrations";
import AuditLogs from "./sections/AuditLogs";
import RecycleBin from "./sections/RecycleBin";

const settingsNavItems = [
  { key: "profile", label: "Profile" },
  { key: "account", label: "Account" },
  { key: "security", label: "Security" },
  { key: "team", label: "Team Management" },
  { key: "notifications", label: "Notifications" },
  { key: "billing", label: "Billing" },
  { key: "integrations", label: "Integrations" },
  { key: "audit", label: "Audit Logs" },
  { key: "recycle-bin", label: "Recycle Bin" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= 768
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (event) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

export default function Settings() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  const sidebarOpenerRef = useRef(null);

  const [activeTab, setActiveTab] = useState("profile");
  const [mobileView, setMobileView] = useState("menu");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [viewingPermissions, setViewingPermissions] = useState(false);
  const [teamResetKey, setTeamResetKey] = useState(0);

  const refreshUser = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/me`, {
        withCredentials: true,
      });
      setUser(response.data.message || {});
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
      if (isMobile) {
        setMobileView(tabParam);
      }
    }
  }, [tabParam, isMobile]);

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${API_URL}admin/me`, {
          withCredentials: true,
        });

        setUser(response.data.message || {});
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const handleTabClick = (item) => {
    if (!item.key) return;

    setActiveTab(item.key);
    setViewingPermissions(false);

    if (isMobile) {
      setMobileView(item.key);
    }
  };

  const handleTeamPermissionMode = (isViewing) => {
    setViewingPermissions(isViewing);
  };

  const exitTeamPermissions = () => {
    setTeamResetKey((value) => value + 1);
    setViewingPermissions(false);
    setActiveTab("team");
    setMobileView("team");
  };

  const renderSection = (tab = activeTab) => {
    switch (tab) {
      case "profile":
        return (
          <Profile
            user={user}
            onUserUpdated={refreshUser}
          />
        );

      case "account":
        return (
          <Account
            user={user}
            onUserUpdated={refreshUser}
          />
        );

      case "security":
        return <Security />;

      case "team":
        return (
          <TeamManagement
            resetPermissionsKey={teamResetKey}
            onPermissionModeChange={handleTeamPermissionMode}
          />
        );

      case "notifications":
        return <Notifications />;

      case "billing":
        return <Billing />;

      case "integrations":
        return <Integrations />;

      case "audit":
        return <AuditLogs />;

      case "recycle-bin":
        return <RecycleBin />;

      default:
        return <Profile user={user} />;
    }
  };

  const renderMobileMenu = () => (
    <div className="ms-mobile-menu">
      <button
        type="button"
        className="ms-mobile-profile-card"
        onClick={() => setMobileView("profile")}
      >
        <div className="ms-mobile-profile-card__avatar">
          <img
            src={user?.profile_picture}
            alt="Avatar"
          />
        </div>

        <div className="ms-mobile-profile-card__info">
          <span className="ms-mobile-profile-card__name">
            {user?.name || ""}
          </span>
          <span className="ms-mobile-profile-card__email">
            {user?.email || ""}
          </span>
          <span className="ms-mobile-profile-card__role">Admin</span>
        </div>

        <ChevronRight size={20} color="#9CA3AF" />
      </button>

      <p className="ms-mobile-group-title">General</p>
      <div className="ms-mobile-group-items">
        <button
          type="button"
          className="ms-mobile-menu-item"
          onClick={() => setMobileView("account")}
        >
          <div className="ms-mobile-menu-item__left">
            <span className="ms-mobile-menu-item__icon">
              <Building size={18} />
            </span>
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
            <span className="ms-mobile-menu-item__icon">
              <Bell size={18} />
            </span>
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
            <span className="ms-mobile-menu-item__icon">
              <CreditCard size={18} />
            </span>
            <span className="ms-mobile-menu-item__label">Billing</span>
          </div>
          <ChevronRight size={18} color="#9CA3AF" />
        </button>
      </div>

      <p className="ms-mobile-group-title">Security &amp; Organization</p>
      <div className="ms-mobile-group-items">
        <button
          type="button"
          className="ms-mobile-menu-item"
          onClick={() => setMobileView("security")}
        >
          <div className="ms-mobile-menu-item__left">
            <span className="ms-mobile-menu-item__icon">
              <Shield size={18} />
            </span>
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
            <span className="ms-mobile-menu-item__icon">
              <Users size={18} />
            </span>
            <span className="ms-mobile-menu-item__label">
              Team Management
            </span>
          </div>
          <ChevronRight size={18} color="#9CA3AF" />
        </button>

        <button
          type="button"
          className="ms-mobile-menu-item"
          onClick={() => {
            setActiveTab("integrations");
            setMobileView("integrations");
          }}
        >
          <div className="ms-mobile-menu-item__left">
            <span className="ms-mobile-menu-item__icon">
              <Share2 size={18} />
            </span>
            <span className="ms-mobile-menu-item__label">
              Integrations
            </span>
          </div>
          <ChevronRight size={18} color="#9CA3AF" />
        </button>

        <button
          type="button"
          className="ms-mobile-menu-item"
          onClick={() => {
            setActiveTab("audit");
            setMobileView("audit");
          }}
        >
          <div className="ms-mobile-menu-item__left">
            <span className="ms-mobile-menu-item__icon">
              <FileText size={18} />
            </span>
            <span className="ms-mobile-menu-item__label">Audit Logs</span>
          </div>
          <ChevronRight size={18} color="#9CA3AF" />
        </button>
      </div>

      <button
        type="button"
        className="ms-mobile-menu-item"
        onClick={() => {
          setActiveTab("recycle-bin");
          setMobileView("recycle-bin");
        }}
      >
        <div className="ms-mobile-menu-item__left">
          <span className="ms-mobile-menu-item__icon">
            <Archive size={18} />
          </span>
          <span className="ms-mobile-menu-item__label">
            Recycle Bin
          </span>
        </div>
        <ChevronRight size={18} color="#9CA3AF" />
      </button>

      <p className="ms-mobile-group-title">Account Management</p>
      <div className="ms-mobile-group-items">
        <div className="ms-mobile-menu-item">
          <div className="ms-mobile-menu-item__left">
            <span className="ms-mobile-menu-item__icon">
              <LogOut size={18} />
            </span>
            <span className="ms-mobile-menu-item__label">Logout</span>
          </div>
          <ChevronRight size={18} color="#9CA3AF" />
        </div>

        <div className="ms-mobile-menu-item ms-mobile-menu-item--disabled">
          <div className="ms-mobile-menu-item__left">
            <span
              className="ms-mobile-menu-item__icon"
              style={{ color: "#DC2626" }}
            >
              <PauseCircle size={18} />
            </span>
            <span
              className="ms-mobile-menu-item__label"
              style={{ color: "#DC2626" }}
            >
              Deactivate Account
            </span>
          </div>
          <ChevronRight size={18} color="#111111" />
        </div>

        <div className="ms-mobile-menu-item ms-mobile-menu-item--disabled">
          <div className="ms-mobile-menu-item__left">
            <span
              className="ms-mobile-menu-item__icon"
              style={{ color: "#DC2626" }}
            >
              <Trash2 size={18} />
            </span>
            <span
              className="ms-mobile-menu-item__label"
              style={{ color: "#DC2626" }}
            >
              Delete Account
            </span>
          </div>
          <ChevronRight size={18} color="#111111" />
        </div>
      </div>
    </div>
  );

  const mobileDetail = (
    <>
      {mobileView === "profile" && (
        <div className="ms-mobile-detail">{renderSection("profile")}</div>
      )}
      {mobileView === "account" && (
        <div className="ms-mobile-detail ms-mobile-detail--account">
          {renderSection("account")}
        </div>
      )}
      {mobileView === "notifications" && (
        <div className="ms-mobile-detail">
          {renderSection("notifications")}
        </div>
      )}
      {mobileView === "security" && (
        <div className="ms-mobile-detail">{renderSection("security")}</div>
      )}
      {mobileView === "team" && (
        <div className="ms-mobile-detail">{renderSection("team")}</div>
      )}
      {mobileView === "billing" && (
        <div className="ms-mobile-detail">{renderSection("billing")}</div>
      )}
      {mobileView === "audit" && (
        <div className="ms-mobile-detail">{renderSection("audit")}</div>
      )}
      {mobileView === "integrations" && (
        <div className="ms-mobile-detail">
          {renderSection("integrations")}
        </div>
      )}
      {mobileView === "recycle-bin" && (
        <div className="ms-mobile-detail">
          {renderSection("recycle-bin")}
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <Layout
        hideMobileTopbar
        hideMobileNavbar={mobileView !== "menu"}
        className="admin-settings-page"
        onRegisterMenuOpen={(openFn) => {
          sidebarOpenerRef.current = openFn;
        }}
      >
        <header className="mobile-topbar ms-mobile-header--settings">
          {mobileView !== "menu" || viewingPermissions ? (
            <button
              type="button"
              className="mobile-topbar__hamburger"
              onClick={() => {
                if (viewingPermissions) {
                  exitTeamPermissions();
                } else {
                  setMobileView("menu");
                }
              }}
              aria-label="Go back"
            >
              <ChevronLeft size={22} color="#1a1a2e" strokeWidth={2} />
            </button>
          ) : (
            <button
              type="button"
              className="mobile-topbar__hamburger"
              onClick={() => navigate("/dashboard")}
              aria-label="Go back"
            >
              <ChevronLeft size={22} color="#1a1a2e" strokeWidth={2} />
            </button>
          )}

          {mobileView === "menu" && !viewingPermissions && (
            <TopbarIcons
              iconSize={18}
              className="mobile-topbar__icons"
            />
          )}
        </header>

        {mobileView !== "menu" && (
          <div className="mobile-page-header ms-mobile-detail-header">
            <div className="ms-mobile-detail-header__row">
              <span className="ms-mobile-detail-header__title">
                {viewingPermissions
                  ? "Permission Settings"
                  : "Settings"}
              </span>
            </div>
            <p className="ms-mobile-detail-header__sub">
              Manage and track all your signed and&nbsp;pending document
            </p>
          </div>
        )}

        {mobileView === "menu" && renderMobileMenu()}
        {mobileView !== "menu" && mobileDetail}
      </Layout>
    );
  }

  return (
    <Layout
      className="admin-settings-page"
      hideMobileNavbar
    >
      <Topbar
        title={viewingPermissions ? "Permission Settings" : "Settings"}
        subtitle={
          viewingPermissions
            ? "Manage your permissions."
            : "Manage your account preferences and configurations"
        }
        actionButton={null}
      />

      <div className="mobile-page-header admin-settings-mobile-header">
        <div className="admin-settings-mobile-header__top-row">
          <div className="admin-settings-mobile-header__titles">
            <div className="topbar__title">
              {viewingPermissions ? "Permission Settings" : "Settings"}
            </div>
            <div className="topbar__sub">
              {viewingPermissions
                ? "Manage your permissions."
                : "Manage your account preferences and configurations"}
            </div>
          </div>
        </div>
      </div>

      {viewingPermissions ? (
        <div className="admin-settings-permissions-view">
          {renderSection("team")}
        </div>
      ) : (
        <div className="admin-settings-body">
          <nav
            className="admin-settings-nav"
            aria-label="Member settings navigation"
          >
            {settingsNavItems.map((item) => (
              <button
                key={item.key}
                id={`admin-settings-nav-${item.key}`}
                className={`admin-settings-nav__item${
                  activeTab === item.key
                    ? " admin-settings-nav__item--active"
                    : ""
                }`}
                onClick={() => handleTabClick(item)}
                type="button"
                aria-current={
                  activeTab === item.key ? "page" : undefined
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="admin-settings-content">
            {renderSection()}
          </div>
        </div>
      )}

      {loading && (
        <LoadingScreen
          state="working"
          size={64}
          theme="dark"
          message="Applying your master plan"
        />
      )}
    </Layout>
  );
}
