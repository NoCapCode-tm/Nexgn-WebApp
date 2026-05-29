import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import DocumentRow from "../components/DocumentRow";
import { Search, Bell, UserCircle, ArrowUpCircle, Menu, X } from "lucide-react";

const stats = [
  { label: "Total Documents", value: "128", trend: "12%", trendUp: true },
  { label: "Pending", value: "32", trend: "9%", trendUp: true },
  { label: "Signed", value: "84", trend: "18%", trendUp: true },
  { label: "Expired", value: "12", trend: "3%", trendUp: false },
];

const documents = [
  { title: "Project Proposal", note: "Send it to client", signers: "Jane Doe", signedAt: "—", owner: "Me", status: "Pending" },
  { title: "Policy Acknowledgement Form", note: "Please sign before 12th", signers: "Charlie Brown", signedAt: "April 10, 2026", owner: "Me", status: "Signed" },
  { title: "NDA Agreement", note: "Review and approve", signers: "Bob Jones", signedAt: "April 08, 2026", owner: "Me", status: "Signed" },
  { title: "NDA Agreement", note: "Review and approve", signers: "Bob Jones", signedAt: "—", owner: "Me", status: "Expired" },
  { title: "NDA Agreement", note: "NDA with vendor...", signers: "Alice Smith", signedAt: "—", owner: "Me", status: "Pending" },
];

export default function Dashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="layout">
      {/* Mobile overlay backdrop */}
      {mobileNavOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* Sidebar — hidden on mobile unless open */}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <Sidebar />
      </div>

      {/* Desktop sidebar */}
      <div className="desktop-sidebar-wrapper">
        <Sidebar />
      </div>

      <div className="main">
        {/* Mobile topbar */}
        <header className="mobile-topbar">
  <button className="mobile-topbar__hamburger" onClick={() => setMobileNavOpen(o => !o)}>
    <Menu size={22} color="#1a1a2e" />
  </button>
  <span className="mobile-topbar__title">Dashboard</span>
  <div className="mobile-topbar__icons">
    <button className="topbar__icon-btn"><Search size={18} color="#FF0915" strokeWidth={1.5} /></button>
<button className="topbar__icon-btn"><Bell size={18} color="#FF0915" strokeWidth={1.5} /></button>
<button className="topbar__icon-btn"><UserCircle size={20} color="#FF0915" strokeWidth={1.5} /></button>
  </div>
</header>

        {/* Desktop topbar */}
        <header className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <div className="topbar__icons">
              <button className="topbar__icon-btn"><Search size={18} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><Bell size={18} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><UserCircle size={20} color="#FF0915" strokeWidth={1.5} /></button>
            </div>
          </div>
          <div className="topbar__bottom-row">
            <div>
              <h1 className="topbar__title">Dashboard</h1>
              <p className="topbar__sub">Overview of your document signing activity</p>
            </div>
            <button className="topbar__upload">
              <ArrowUpCircle size={16} />
              Upload Document
            </button>
          </div>
        </header>

        {/* Mobile page title + CTA buttons */}
        <div className="mobile-page-header">
          <h1 className="topbar__title">Dashboard</h1>
          <p className="topbar__sub">Overview of your document signing activity</p>
          <div className="mobile-cta-row">
            <button className="mobile-cta mobile-cta--primary">Sign Yourself</button>
            <button className="mobile-cta mobile-cta--outline">Request Signature</button>
          </div>
        </div>

        <section className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </section>

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
            {documents.map((doc, i) => (
              <DocumentRow key={i} {...doc} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}