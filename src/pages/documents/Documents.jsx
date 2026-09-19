import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Topbar from "../../components/Layout/Topbar";
import DocumentsFilter from "./DocumentsFilter";
import DocumentsTable from "./DocumentsTable";

import "../../styles/BaseLayout.css";
import "./Documents.css";
import axios from "axios";
import { API_URL } from "../../config";
import { TableRowSkeleton } from "../../components/common/Skeleton";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleRevoke = async(id) => {
    try {
      await axios.delete(`${API_URL}document/deletedocument/${id}`, { withCredentials: true });
      // Immediately update local state to reflect deletion
      setDocuments(prev => prev.filter(doc => doc._id !== id));
    } catch (error) {
      console.log("Something went wrong in deleting Document", error.message);
    }
  };

  const handleArchive = async(id) => {
    try {
      await axios.get(`${API_URL}document/archivedocument/${id}`, { withCredentials: true });
    } catch (error) {
      console.log("Something went wrong in archiving Document", error.message);
    }
  };

  const handleCancel = async(id) => {
    try {
      await axios.get(`${API_URL}document/cancelrequest/${id}`, { withCredentials: true });
    } catch (error) {
      console.log("Something went wrong in Cancelling Request", error.message);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}document/getdocument`, { withCredentials: true });
        const docs = response.data.message.filter((d) => d.isDeleted === false);
        setDocuments(docs);
      } catch (error) {
        console.log("Something went wrong in Fetching Document", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredDocs = documents.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      (doc.signers && doc.signers.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus =
      selectedStatus === "All" ||
      (doc.status && doc.status.toLowerCase() === selectedStatus.toLowerCase());
    let matchesTab = true;
    if (activeTab === "created") matchesTab = doc.owner === "Me";
    if (activeTab === "assigned") matchesTab = doc.owner !== "Me";
    return matchSearch && matchesStatus && matchesTab;
  });

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedStatus, activeTab]);

  // Pagination Logic
  const totalItems = filteredDocs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocs.slice(indexOfFirstItem, indexOfLastItem);

  const filterComponent = (
    <DocumentsFilter
      search={search}
      setSearch={setSearch}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
    />
  );

  return (
    <Layout className="admin-docs-page" data-tour="documents">
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
        {loading ? (
          <div style={{ padding: "0 24px", marginTop: "20px" }}>
             <TableRowSkeleton count={Math.min(itemsPerPage, 6)} />
          </div>
        ) : (
          <DocumentsTable 
            documents={currentItems} 
            onRevoke={handleRevoke} 
            onArchive={handleArchive} 
            onCancel={handleCancel}
            // Pagination Props
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            totalPages={totalPages}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
          />
        )}
      </>
    </Layout>
  );
}