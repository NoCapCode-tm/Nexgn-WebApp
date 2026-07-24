import { useState } from "react";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import DocumentsFilter from "../components/DocumentsFilter";
import DocumentsTable from "../components/DocumentsTable";

import "../css/BaseLayout.css";
import "../css/Documents.css";

const ALL_DOCS = [
  {
    id: 1,
    title: "Project Proposal",
    note: "Send it to client",
    signers: "Jane Doe",
    signedAt: "-",
    owner: "Me",
    status: "Pending",
  },
  {
    id: 2,
    title: "Policy Acknowledgement Form",
    note: "Please sign before 12th",
    signers: "Charlie Brown",
    signedAt: "April 10, 2026",
    owner: "Me",
    status: "Signed",
  },
  {
    id: 3,
    title: "NDA Agreement",
    note: "Review and approve",
    signers: "Bob Jones",
    signedAt: "April 08, 2026",
    owner: "Me",
    status: "Signed",
  },
  {
    id: 4,
    title: "NDA Agreement",
    note: "Review and approve",
    signers: "Bob Jones",
    signedAt: "-",
    owner: "Me",
    status: "Expired",
  },
  {
    id: 5,
    title: "NDA Agreement",
    note: "NDA with vendor...",
    signers: "Alice Smith",
    signedAt: "-",
    owner: "Me",
    status: "Pending",
  },
  {
    id: 6,
    title: "Employment Offer Letter",
    note: "Final offer shared...",
    signers: "Michael Johnson",
    signedAt: "March 9, 2026",
    owner: "Me",
    status: "Signed",
  },
  {
    id: 7,
    title: "Vendor Contract",
    note: "Contract pending...",
    signers: "Emma Wilson",
    signedAt: "-",
    owner: "Me",
    status: "Pending",
  },
  {
    id: 8,
    title: "Freelancer Agreement",
    note: "Yearly freelance...",
    signers: "Daniel Brown",
    signedAt: "March 8, 2026",
    owner: "Me",
    status: "Signed",
  },
  {
    id: 9,
    title: "Shareholder Resolution",
    note: "Internal resolution...",
    signers: "-",
    signedAt: "March 7, 2026",
    owner: "Me",
    status: "Signed",
  },
  {
    id: 10,
    title: "Vendor Contract",
    note: "Contract pending...",
    signers: "Emma Wilson",
    signedAt: "-",
    owner: "Me",
    status: "Expired",
  },
];

export default function Documents() {
  const [documents, setDocuments] = useState(ALL_DOCS);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleRevoke = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const filteredDocs = documents.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.signers.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" ||
      (doc.status && doc.status.toLowerCase() === selectedStatus.toLowerCase());
    let matchesTab = true;
    if (activeTab === "created") matchesTab = doc.owner === "Me";
    if (activeTab === "assigned") matchesTab = doc.owner !== "Me";
    return matchSearch && matchesStatus && matchesTab;
  });

  const filterComponent = (
    <DocumentsFilter
      search={search}
      setSearch={setSearch}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
    />
  );

  return (
    <Layout className="admin-docs-page">
      <>
        {/* Hidden shared gradient def used by .admin-doc-row__icon in dark mode */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="docIconGradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="24"
              y2="24"
            >
              <stop offset="2.19%" stopColor="#960101" />
              <stop offset="100.02%" stopColor="#FF0915" />
            </linearGradient>
          </defs>
        </svg>

        {/* Desktop Topbar */}
        <Topbar
          title="Documents"
          subtitle="Manage and track all your signed and pending documents"
          actionButton={filterComponent}
        />

        {/* Mobile Page Header (Under Topbar) */}
        <div className="mobile-page-header">
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Documents</div>
              <div className="topbar__sub">
                Manage and track all your signed and pending documents
              </div>
            </div>
          </div>
          <hr className="mobile-header-divider" />
          <div className="mobile-filter-row">{filterComponent}</div>
        </div>

        {/* Tabs Section */}
        <div className="admin-docs-tabs">
          <button
            className={`admin-docs-tab ${activeTab === "all" ? "admin-docs-tab--active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`admin-docs-tab ${activeTab === "created" ? "admin-docs-tab--active" : ""}`}
            onClick={() => setActiveTab("created")}
          >
            Created by me
          </button>
          <button
            className={`admin-docs-tab ${activeTab === "assigned" ? "admin-docs-tab--active" : ""}`}
            onClick={() => setActiveTab("assigned")}
          >
            Assigned by me
          </button>
        </div>

        {/* Mobile "Need My Sign" Section Title */}
        <div className="admin-docs-mobile-section-title">Need My Sign</div>

        {/* Table Section */}
        <DocumentsTable documents={filteredDocs} onRevoke={handleRevoke} />
      </>
    </Layout>
  );
}
