import { useState } from "react";
import MemberSidebar from "../components/MemberSidebar";
import StatCard from "../components/StatCard";
import DocumentRow from "../components/DocumentRow";
import { Search, Bell, UserCircle, Menu } from "lucide-react";
import "../css/MemberDashboard.css"; // Scoped CSS Overrides

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left half - solid arc */}
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    {/* Right half - dashed arc */}
    <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3"/>
    {/* Center arrow pointing up */}
    <path d="M12 17V7M12 7L7 12M12 7L17 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

export default function MemberDashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="layout member-theme">
      {/* Mobile overlay backdrop */}
      {mobileNavOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — hidden on mobile unless open */}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <MemberSidebar />
      </div>

      {/* Desktop sidebar */}
      <div className="desktop-sidebar-wrapper">
        <MemberSidebar />
      </div>

      {/* Main Content Area */}
      <div className="main">
        {/* Mobile topbar */}
        <header className="mobile-topbar">
          <button className="mobile-topbar__hamburger" onClick={() => setMobileNavOpen((o) => !o)}>
            <Menu size={22} color="#1a1a2e" />
          </button>
          <span className="mobile-topbar__title">Dashboard</span>
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

        {/* Desktop topbar */}
        <header className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <div className="topbar__icons">
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
          </div>
          <div className="topbar__bottom-row">
            <div>
              <h1 className="topbar__title">Dashboard</h1>
              <p className="topbar__sub">Overview of your document signing activity</p>
            </div>
            <button className="topbar__upload" onClick={(e) => e.preventDefault()}>
              <UploadIcon />
              Upload Document
            </button>
          </div>
        </header>

        {/* Mobile page title + CTA buttons (Identical to Admin layout) */}
        <div className="mobile-page-header">
          <h1 className="topbar__title">Dashboard</h1>
          <p className="topbar__sub">Overview of your document signing activity</p>
          <div className="mobile-cta-row">
            <button className="mobile-cta mobile-cta--primary" onClick={(e) => e.preventDefault()}>
              Sign Yourself
            </button>
            <button className="mobile-cta mobile-cta--outline" onClick={(e) => e.preventDefault()}>
              Request Signature
            </button>
          </div>
        </div>

        {/* Stats cards grid */}
        <section className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </section>

        {/* Recent Documents list */}
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
    </div>
  );
}
