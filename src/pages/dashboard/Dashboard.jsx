import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Topbar from "../../components/Layout/Topbar";
import StatCard from "../../components/ui/StatCard";
import DocumentRow from "../../components/ui/DocumentsRow";
import useWindowWidth from "../../hooks/useWindowWidth";
import "../../styles/BaseLayout.css";
import "./Dashboard.css";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";





// const INITIAL_DOCS = [
//   {
//     title: "Project Proposal",
//     note: "Send it to client",
//     signers: "Jane Doe",
//     signedAt: "—",
//     owner: "Me",
//     status: "Pending",
//   },
//   {
//     title: "Policy Acknowledgement Form",
//     note: "Please sign before 12th",
//     signers: "Charlie Brown",
//     signedAt: "April 10, 2026",
//     owner: "Me",
//     status: "Signed",
//   },
//   {
//     title: "NDA Agreement",
//     note: "Review and approve",
//     signers: "Bob Jones",
//     signedAt: "April 08, 2026",
//     owner: "Me",
//     status: "Signed",
//   },
//   {
//     title: "NDA Agreement",
//     note: "Review and approve",
//     signers: "Bob Jones",
//     signedAt: "—",
//     owner: "Me",
//     status: "Expired",
//   },
//   {
//     title: "NDA Agreement",
//     note: "NDA with vendor...",
//     signers: "Alice Smith",
//     signedAt: "—",
//     owner: "Me",
//     status: "Pending",
//   },
// ];

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const width = useWindowWidth();
  const isMobile = width <= 768;
  const navigate = useNavigate();
  useEffect(()=>{
  (async()=>{
      const response = await axios.get(`${API_URL}document/getdocument`,{withCredentials:true})
      console.log(response.data.message)
      setDocuments(response.data.message)
    })()
},[])

const { completed, total, pending } = useMemo(() => {
  const completed = documents?.filter(
    (d) => d.status === "completed"
  ).length;

  const total = documents?.length;

  const pending = documents?.filter(
    (d) => d.status === "sent" || d.status === "partially_signed"
  ).length;

  return {
    completed,
    total,
    pending,
  };
}, [documents]);

const stats = [
  {
    label: "Total Documents",
    value: total,
    trend: "12%",
    trendUp: true,
  },
  {
    label: "Pending",
    value:pending,
    trend: "8%",
    trendUp: true,
  },
  {
    label: "Signed",
    value: completed,
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
              onClick={() => navigate("/sign-yourself")}
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
              onClick={() => navigate("/sign-yourself")}
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
          {stats.slice(0, isMobile ? 2 : 4).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </section>

        <div className="mobile-cta-row">
          <button
            className="mobile-cta mobile-cta--primary"
            onClick={() => navigate("/sign-yourself")}
          >
            Sign Yourself
          </button>
          <button
            className="mobile-cta mobile-cta--outline"
            onClick={() => navigate("/request-signature")}
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
