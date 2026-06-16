import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import DocumentRow from "../components/DocumentRow";
import MobileNavbar from "../components/MobileNavbar";
import useWindowWidth from "../components/useWindowWidth";
import { Search, Bell, UserCircle, Menu } from "lucide-react";
import "../css/AdminBaseLayout.css";
import "../css/Dashboard.css"; // Scoped CSS Overrides

const stats = [
  {
    label: "Total Documents",
    value: "128",
    trend: "12%",
    trendUp: true,
  },
  {
    label: "Pending",
    value: "32",
    trend: "8%",
    trendUp: true,
    trendColor: "green",
  },
  {
    label: "Signed",
    value: "84",
    trend: "18%",
    trendUp: true,
  },
  {
    label: "Expired",
    value: "12",
    trend: "3%",
    trendUp: false,
  },
];

const documents = [
  {
    title: "Project Proposal",
    note: "Send it to client",
    signers: "Jane Doe",
    signedAt: "—",
    owner: "Me",
    status: "Pending",
  },
  {
    title: "Policy Acknowledgement Form",
    note: "Please sign before 12th",
    signers: "Charlie Brown",
    signedAt: "April 10, 2026",
    owner: "Me",
    status: "Signed",
  },
  {
    title: "NDA Agreement",
    note: "Review and approve",
    signers: "Bob Jones",
    signedAt: "April 08, 2026",
    owner: "Me",
    status: "Signed",
  },
  {
    title: "NDA Agreement",
    note: "Review and approve",
    signers: "Bob Jones",
    signedAt: "—",
    owner: "Me",
    status: "Expired",
  },
  {
    title: "NDA Agreement",
    note: "NDA with vendor...",
    signers: "Alice Smith",
    signedAt: "—",
    owner: "Me",
    status: "Pending",
  },
];

export default function Dashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const width = useWindowWidth();
  const isMobile = width <= 768;
  const navigate = useNavigate();

  return (
    <div className="layout admin-theme admin-dashboard-page">
      {mobileNavOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Responsive Layout */}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <Sidebar />
      </div>

      <div className="desktop-sidebar-wrapper">
        <Sidebar />
      </div>

      <div className="main">
        {/* Mobile Navigation */}
        <header className="mobile-topbar">
          <button className="mobile-topbar__hamburger" onClick={() => {
            if (width >= 769) {
              setMobileNavOpen(true);
            }
          }}>
            <Menu size={22} color="#1a1a2e" />
          </button>

          <div className="mobile-topbar__icons">
            <button className="topbar__icon-btn mobile-topbar__search-btn">
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

        <Topbar />

        <div className="mobile-page-header">
          <h1 className="topbar__title">Dashboard</h1>
          <p className="topbar__sub">Overview Of your document signing activity</p>
          <div className="mobile-page-header__divider" />
        </div>

        <section className="stats-grid">
          {stats.slice(0, isMobile ? 2 : 4).map((s, idx) => {
            const displayTrendColor = isMobile && idx === 0 ? "red" : s.trendColor;
            return <StatCard key={s.label} {...s} trendColor={displayTrendColor} />;
          })}
        </section>

        <div className="mobile-cta-row">
          <button className="mobile-cta mobile-cta--primary" onClick={() => navigate("/admin-sign-yourself")}>
            Sign Yourself
          </button>
          <button className="mobile-cta mobile-cta--outline" onClick={() => navigate("/admin-request-signature")}>
            Request Signature
          </button>
        </div>

        <section className="docs-section">
          <h2 className="docs-section__title">Recent Documents</h2>
          <div className="docs-table__header desktop-table-header">
            <span>Title</span>
            <span>Note</span>
            <span>Signers</span>
            <span>Signed At</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          <div className="docs-table">
            {documents.map((doc, idx) => (
              <DocumentRow key={idx} {...doc} />
            ))}
          </div>
        </section>
      </div>
      <MobileNavbar />
    </div>
  );
}
