import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Archive, FileText, RotateCcw, Trash2 } from "lucide-react";
import { API_URL } from "../../../config";
import { toast } from "react-toastify";
import { Skeleton } from "../../../components/common/Skeleton";

export default function RecycleBin() {
  const [loading, setLoading] = useState(false);
  const [recycleBinFilter, setRecycleBinFilter] = useState("all");
  const [recycleBinItems, setRecycleBinItems] = useState({
    documents: [],
    templates: [],
  });
  const [recycleBinDeleteTarget, setRecycleBinDeleteTarget] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
        setLoading(true); // <-- 1. Set loading to true when fetch starts
        try {
          const [templateRes, documentRes] = await Promise.all([
            axios.get(`${API_URL}template/gettemplate`, {
              withCredentials: true,
            }),
            axios.get(`${API_URL}document/getdocument`, {
              withCredentials: true,
            }),
          ]);

          const templates = (templateRes?.data?.message || []).filter(
            (template) => template?.templateid?.isDeleted === true
          );
          const documents = (documentRes?.data?.message || []).filter(
            (document) => document.isDeleted === true
          );

          setRecycleBinItems({ templates, documents });
        } catch (error) {
          console.error("Error fetching recycle bin data:", error);
           toast.error(
                    error.response?.data?.message ||
                    "Something Went Wrong"
                  );
        } finally {
          setLoading(false); // <-- 2. Set loading to false once data arrives
        }
      };

      fetchData();
    }, []);

  const visibleItems = useMemo(
    () => [
      ...(recycleBinFilter === "all" || recycleBinFilter === "documents"
        ? recycleBinItems.documents.map((item) => ({
            ...item,
            type: "document",
          }))
        : []),
      ...(recycleBinFilter === "all" || recycleBinFilter === "templates"
        ? recycleBinItems.templates.map((item) => ({
            ...item,
            type: "template",
          }))
        : []),
    ],
    [recycleBinFilter, recycleBinItems]
  );

  const handleRestore = async (item) => {
    setLoading(true);

    try {
      const collection =
        item.type === "template" ? "templates" : "documents";

      setRecycleBinItems((prev) => ({
        ...prev,
        [collection]: prev[collection].filter(
          (entry) => entry._id !== item._id
        ),
      }));

      if (item.type === "template") {
        await axios.get(
          `${API_URL}template/restoretemplate/${item.templateid?._id}`,
          { withCredentials: true }
        );
      } else {
        await axios.get(
          `${API_URL}document/restoredocument/${item._id}`,
          { withCredentials: true }
        );
      }

      toast.success(
        `${item.type === "template" ? "Template" : "Document"} restored`
      );
    } catch (error) {
      console.error("Something went wrong while restoring", error.message);
       toast.error(
                error.response?.data?.message ||
                "Something Went Wrong"
              );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const item = recycleBinDeleteTarget?.item;
    if (!item) return;

    setLoading(true);

    try {
      const collection =
        item.type === "template" ? "templates" : "documents";

      setRecycleBinItems((prev) => ({
        ...prev,
        [collection]: prev[collection].filter(
          (entry) => entry._id !== item._id
        ),
      }));

      if (item.type === "template") {
        await axios.delete(
          `${API_URL}template/deletetemplate/${item.templateid?._id}`,
          { withCredentials: true }
        );
      } else {
        await axios.delete(`${API_URL}document/deletedocument/${item._id}`, {
          withCredentials: true,
        });
      }

      toast.success(
        `${item.type === "template" ? "Template" : "Document"} permanently deleted`
      );
      setRecycleBinDeleteTarget(null);
    } catch (error) {
      console.error("Something went wrong in deleting Document", error.message);
       toast.error(
                error.response?.data?.message ||
                "Something Went Wrong"
              );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-settings-card admin-settings-card--recycle-bin">
        <h2 className="admin-settings-card__title">Recycle Bin</h2>
        <div className="admin-settings-card__divider" />

        <div className="recycle-bin-toolbar">
          <div
            className="recycle-bin-toggle-group"
            role="tablist"
            aria-label="Recycle Bin filter"
          >
            {[
              { key: "all", label: "All" },
              { key: "documents", label: "Documents" },
              { key: "templates", label: "Templates" },
            ].map((filter) => (
              <button
                key={filter.key}
                type="button"
                role="tab"
                aria-selected={recycleBinFilter === filter.key}
                className={`recycle-bin-toggle ${
                  recycleBinFilter === filter.key
                    ? "recycle-bin-toggle--active"
                    : ""
                }`}
                onClick={() => setRecycleBinFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="recycle-bin-list">
          {loading && visibleItems.length === 0 ? (
            // Render Skeletons on initial load
            Array.from({ length: 4 }).map((_, idx) => (
              <div className="recycle-bin-item" key={idx}>
                <div className="recycle-bin-item__icon">
                  <Skeleton width="42px" height="42px" borderRadius="10px" />
                </div>
                <div className="recycle-bin-item__info" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <Skeleton width="180px" height="14px" />
                    <Skeleton width="120px" height="12px" />
                </div>
                <div className="recycle-bin-item__actions">
                    <Skeleton width="80px" height="34px" borderRadius="7px" />
                    <Skeleton width="80px" height="34px" borderRadius="7px" />
                </div>
              </div>
            ))
          ) : visibleItems.length > 0 ? (
            // Render actual items once loaded
            visibleItems.map((item) => (
              <div
                className="recycle-bin-item"
                key={`${item.type}-${item._id}`}
              >
                <div className="recycle-bin-item__icon">
                  {item.type === "template" ? (
                    <FileText size={20} strokeWidth={1.6} />
                  ) : (
                    <Archive size={20} strokeWidth={1.6} />
                  )}
                </div>

                <div className="recycle-bin-item__info">
                  <h3>
                    {(item.type === "template"
                      ? item?.templateid?.name
                      : item?.title) ||
                      (item.type === "template"
                        ? "Untitled Template"
                        : "Untitled Document")}
                  </h3>
                  <p>
                    {item.archivedAt
                      ? `Archived ${new Date(item.archivedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}`
                      : "Archived"}
                  </p>
                </div>

                <div className="recycle-bin-item__actions">
                  <button
                    type="button"
                    className="recycle-bin-action recycle-bin-action--restore"
                    onClick={() => handleRestore(item)}
                  >
                    <RotateCcw size={15} /> Restore
                  </button>
                  <button
                    type="button"
                    className="recycle-bin-action recycle-bin-action--delete"
                    onClick={() => setRecycleBinDeleteTarget({ item })}
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Render empty state if nothing exists
            <div className="recycle-bin-empty">
              <div className="recycle-bin-empty__icon">
                <Archive size={22} strokeWidth={1.5} />
              </div>
              <h3>
                {recycleBinFilter === "all"
                  ? "Recycle Bin is empty"
                  : recycleBinFilter === "documents"
                  ? "No archived documents"
                  : "No archived templates"}
              </h3>
              <p>
                Archived{" "}
                {recycleBinFilter === "documents"
                  ? "documents"
                  : recycleBinFilter === "templates"
                  ? "templates"
                  : "documents and templates"}{" "}
                will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {recycleBinDeleteTarget && (
        <div
          className="integration-modal-backdrop"
          onClick={() => setRecycleBinDeleteTarget(null)}
        >
          <div
            className="integration-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="integration-modal-content">
              <div className="integration-modal-header-row">
                <svg
                  viewBox="0 0 24 24"
                  className="integration-modal-warning-icon"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                    stroke="#E5252A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="integration-modal-title">
                  Delete{" "}
                  {recycleBinDeleteTarget.item.type === "template"
                    ? "Template"
                    : "Document"}
                  ?
                </h3>
              </div>

              <p className="integration-modal-description">
                This action will permanently delete this{" "}
                {recycleBinDeleteTarget.item.type === "template"
                  ? "template"
                  : "document"}
                . You will not be able to restore it afterwards.
              </p>

              <ul className="integration-modal-list">
                <li>The item will be permanently removed</li>
                <li>This action cannot be undone</li>
                <li>Make sure you no longer need this item</li>
              </ul>
            </div>

            <div className="integration-modal-footer">
              <button
                className="integration-modal-btn cancel-btn"
                onClick={() => setRecycleBinDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="integration-modal-btn disconnect-btn"
                onClick={handleDelete}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
