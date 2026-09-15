import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { API_URL } from "../../../config";
import { Skeleton } from "../../../components/common/Skeleton";

export default function AuditLogs() {
  const [loading, setLoading] = useState(false);
  const [auditSearchQuery, setAuditSearchQuery] = useState("");
  const [auditLogsData, setAuditLogsData] = useState([]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}activity/getactivity`, {
          withCredentials: true,
        });
        setAuditLogsData(response.data.message || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter and Sort Logs (Latest to Oldest)
  const filteredAndSortedLogs = useMemo(() => {
    const q = auditSearchQuery.toLowerCase();

    const filtered = auditLogsData.filter((log) => {
      const formattedDate = new Date(log.createdAt)
        .toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase();

      return (
        formattedDate.includes(q) ||
        log?.userId?.name?.toLowerCase()?.includes(q) ||
        log?.action?.toLowerCase()?.includes(q) ||
        log?.refId?.title?.toLowerCase()?.includes(q) ||
        log?.refId?.name?.toLowerCase()?.includes(q) ||
        log?.status?.toLowerCase()?.includes(q)
      );
    });

    // Sort descending by date (latest first)
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [auditLogsData, auditSearchQuery]);

  // Reset to page 1 whenever the search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [auditSearchQuery]);

  // Pagination Calculations
  const totalPages = Math.ceil(filteredAndSortedLogs.length / itemsPerPage);
  const currentLogs = filteredAndSortedLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination UI Component
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", padding: "0 8px" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{
            display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", fontSize: "13px", fontWeight: "500",
            borderRadius: "6px", border: "1px solid #e5e7eb", background: currentPage === 1 ? "transparent" : "#fff",
            color: currentPage === 1 ? "#9ca3af" : "#374151", cursor: currentPage === 1 ? "not-allowed" : "pointer"
          }}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          style={{
            display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", fontSize: "13px", fontWeight: "500",
            borderRadius: "6px", border: "1px solid #e5e7eb", background: currentPage === totalPages ? "transparent" : "#fff",
            color: currentPage === totalPages ? "#9ca3af" : "#374151", cursor: currentPage === totalPages ? "not-allowed" : "pointer"
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="admin-settings-card admin-settings-card--audit">
        
        {/* DESKTOP LAYOUT */}
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
              {loading && auditLogsData.length === 0 ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="admin-audit-row">
                    <div className="audit-col"><Skeleton width="120px" height="14px" /></div>
                    <div className="audit-col"><Skeleton width="100px" height="14px" /></div>
                    <div className="audit-col"><Skeleton width="80px" height="14px" /></div>
                    <div className="audit-col"><Skeleton width="140px" height="14px" /></div>
                    <div className="audit-col"><Skeleton width="80px" height="24px" borderRadius="8px" /></div>
                  </div>
                ))
              ) : (
                currentLogs.map((log) => (
                  <div key={log.id} className="admin-audit-row">
                    <div className="audit-col audit-col-date">
                      {new Date(log.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                    <div className="audit-col audit-col-name">
                      {log?.userId?.name}
                    </div>
                    <div className="audit-col audit-col-action">{log?.action}</div>
                    <div className="audit-col audit-col-document">
                      {log?.refId?.title || log?.refId?.name || "NA"}
                    </div>
                    <div className="audit-col audit-col-status">
                      <span
                        className={`audit-status-badge audit-status-${log?.status?.toLowerCase()}`}
                      >
                        {log?.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {renderPagination()}
        </div>

        {/* MOBILE LAYOUT */}
        <div className="admin-audit-mobile-layout">
          <h2 className="admin-settings-card__title">Audit Logs</h2>
          <div className="admin-settings-card__divider" />

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

          <div className="admin-audit-mobile-list">
            {loading && auditLogsData.length === 0 ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="admin-audit-mobile-card">
                  <Skeleton width="100%" height="30px" style={{ marginBottom: '12px' }} />
                  <Skeleton width="100%" height="16px" />
                </div>
              ))
            ) : (
              currentLogs.map((log) => (
                <div key={log.id} className="admin-audit-mobile-card">
                  <div className="admin-audit-mobile-card-row admin-audit-mobile-card-row--top">
                    <div className="admin-audit-mobile-file">
                      <FileText
                        size={18}
                        className="admin-audit-mobile-icon-file"
                      />
                      <span className="admin-audit-mobile-filename">
                        {log?.refId?.title}
                      </span>
                    </div>

                    <span
                      className={`audit-status-badge audit-status-${log?.status?.toLowerCase()}`}
                    >
                      {log?.status}
                    </span>
                  </div>

                  <div className="admin-audit-mobile-card-row admin-audit-mobile-card-row--bottom">
                    <div className="admin-audit-mobile-user">
                      <User size={16} className="admin-audit-mobile-icon-user" />
                      <span className="admin-audit-mobile-username">
                        {log?.userId?.name}
                      </span>
                    </div>
                    <span className="admin-audit-mobile-date">
                      {new Date(log.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          {renderPagination()}
        </div>
      </div>
    </>
  );
}