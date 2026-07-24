import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import DocumentRow from "../components/DocumentRow";
import useWindowWidth from "../components/useWindowWidth";
import "../css/BaseLayout.css";
import "../css/Dashboard.css";

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

const INITIAL_DOCS = [
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
  const [documents, setDocuments] = useState(INITIAL_DOCS);
  const width = useWindowWidth();
  const isMobile = width <= 768;
  const navigate = useNavigate();

  const handleRevoke = (title) => {
    setDocuments((prev) => prev.filter((doc) => doc.title !== title));
  };

  return (
    <Layout className="admin-dashboard-page">
      <>
        <Topbar
          title="Dashboard"
          subtitle="Overview of your document signing activity"
        />

        <div className="mobile-page-header">
          <div className="mobile-page-header__container">
            <div className="mobile-page-header__titles">
              <h1 className="topbar__title">Dashboard</h1>
              <p className="topbar__sub">
                Overview of your document signing activity
              </p>
            </div>
            <button
              className="mobile-page-header__upload-btn"
              aria-label="Upload document"
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left half - Solid */}
                <path
                  d="M 12 2 A 10 10 0 0 0 12 22"
                  stroke="#FF0915"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Right half - Dashed */}
                <path
                  d="M 12 2 A 10 10 0 0 1 12 22"
                  stroke="#FF0915"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                />
                {/* Up Arrow */}
                <path
                  d="M 12 16 V 8 M 12 8 L 8 12 M 12 8 L 16 12"
                  stroke="#FF0915"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="tablet-upload-btn"
              onClick={() => navigate("/admin-sign-yourself")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 12 2 A 10 10 0 0 0 12 22"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 12 2 A 10 10 0 0 1 12 22"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                />
                <path
                  d="M 12 16 V 8 M 12 8 L 8 12 M 12 8 L 16 12"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upload Doc
            </button>
          </div>
          <div className="mobile-page-header__divider" />
        </div>

        <section className="stats-grid">
          {stats.slice(0, isMobile ? 2 : 4).map((s, idx) => {
            const displayTrendColor =
              isMobile && idx === 0 ? "red" : s.trendColor;
            return (
              <StatCard key={s.label} {...s} trendColor={displayTrendColor} />
            );
          })}
        </section>

        <div className="mobile-cta-row">
          <button
            className="mobile-cta mobile-cta--primary"
            onClick={() => navigate("/admin-sign-yourself")}
          >
            Sign Yourself
          </button>
          <button
            className="mobile-cta mobile-cta--outline"
            onClick={() => navigate("/admin-request-signature")}
          >
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
              <DocumentRow
                key={idx}
                {...doc}
                onRevoke={() => handleRevoke(doc.title)}
              />
            ))}
          </div>
        </section>
      </>
    </Layout>
  );
}
