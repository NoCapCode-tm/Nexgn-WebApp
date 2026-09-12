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
} from "lucide-react";
import { API_URL } from "../../../config";
import LoadingScreen from "../../../components/Layout/LoadingScreen";

export default function AuditLogs() {
  const [loading, setLoading] = useState(false);
  const [auditSearchQuery, setAuditSearchQuery] = useState("");
  const [auditLogsData, setAuditLogsData] = useState([]);

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

  const filteredAuditLogs = useMemo(() => {
    const q = auditSearchQuery.toLowerCase();

    return auditLogsData.filter((log) => {
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
  }, [auditLogsData, auditSearchQuery]);

  return (
    <>
      <div className="admin-settings-card admin-settings-card--audit">
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
              ))}
            </div>
          </div>
        </div>

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
            {filteredAuditLogs.map((log) => (
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
                    {log?.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <LoadingScreen
          state="listening"
          size={64}
          theme="dark"
          message="Signing Up"
        />
      )}
    </>
  );
}
