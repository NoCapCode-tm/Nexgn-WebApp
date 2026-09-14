
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Download,
  Award,
  XCircle,
  FileText,
} from "lucide-react";

import Layout from "../../components/Layout/Layout";
import Topbar from "../../components/Layout/Topbar";


import "../../styles/BaseLayout.css";
import styles from "./SignRequest.module.css";
import { Skeleton } from "../../components/common/Skeleton";

import { API_URL } from "../../config";

const SignRequest = () => {
  const [signRequests, setSignRequests] = useState([]);
  const [signature, setSignatures] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

 const filterRefs = useRef([]);

useEffect(() => {
  const handleClickOutside = (event) => {
    const clickedInside = filterRefs.current.some(
      (ref) =>
        ref &&
        ref.contains(event.target)
    );

    if (!clickedInside) {
      setFilterOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  useEffect(() => {
    const fetchSignRequests = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}sign/getrequests`,
          {
            withCredentials: true,
          }
        );
        
        setSignRequests(response?.data?.message || []);
      } catch (error) {
        console.log(
          "Something went wrong while fetching sign requests",
          error?.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSignRequests();
  }, []);

  useEffect(() => {
    const fetchSignature = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}sign/getsignature`,
          {
            withCredentials: true,
          }
        );

        setSignatures(response?.data?.message || []);
      } catch (error) {
        console.log(
          "Something went wrong while fetching signatures",
          error?.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSignature();
  }, []);

  const handleCancelRequest = async (id) => {
    try {
      setLoading(true);

      await axios.get(
        `${API_URL}sign/reject/${id}`,
        {
          withCredentials: true,
        }
      );

      setSignRequests((previous) =>
        previous.map((request) =>
          request._id === id
            ? {
                ...request,
                overallStatus: "cancelled",
              }
            : request
        )
      );
    } catch (error) {
      console.log(
        "Something went wrong while cancelling sign request",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = signRequests.filter((request) => {
    const title = request?.documentId?.title || "";

    const signer =
      request?.recipient?.userId?.name ||
      request?.recipient?.userId?.email ||
      "";

    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      title.toLowerCase().includes(searchValue) ||
      signer.toLowerCase().includes(searchValue);

    const matchesStatus =
      selectedStatus === "All" ||
      request?.overallStatus?.toLowerCase() ===
        selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const filterComponent = (
    <div className={styles.topbarActions}>
      <div className={styles.searchWrap}>
        <Search
          size={16}
          color="#9ca3af"
          strokeWidth={2}
        />

        <input
          className={styles.searchInput}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

     <div
  className={styles.filterWrapper}
  ref={(element) => {
    if (element && !filterRefs.current.includes(element)) {
      filterRefs.current.push(element);
    }
  }}
>
        <button
          type="button"
          className={styles.filterButton}
          onClick={() =>
            setFilterOpen((previous) => !previous)
          }
        >
          <SlidersHorizontal
            size={17}
            strokeWidth={1.8}
          />

          <span className={styles.filterText}>
            Filter
          </span>
        </button>

        {filterOpen && (
          <div className={styles.filterDropdown}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                Status
              </label>

              <select
                className={styles.filterSelect}
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value)
                }
              >
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="Viewed">Viewed</option>
                <option value="completed">Completed</option>
                <option value="Expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className={styles.filterDivider} />

            <button
              type="button"
              className={styles.resetButton}
              onClick={() => {
                setSelectedStatus("All");
                setFilterOpen(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout className={styles.signRequestPage}>
      <>
        <Topbar
          title="Sign Requests"
          subtitle="Manage and track all your signature requests"
          actionButton={filterComponent}
        />

        <div className={styles.mobilePageHeader}>
          <div className={styles.mobileHeaderTop}>
            <div>
              <div className={styles.mobileTitle}>
                Sign Requests
              </div>

              <div className={styles.mobileSubtitle}>
                Manage and track all your signature requests
              </div>
            </div>

            {filterComponent}
          </div>

          <hr className={styles.mobileDivider} />
        </div>

        <div className={styles.mobileSectionTitle}>
          Sign Requests
        </div>

        <section className={styles.section}>
          <div className={styles.tableContainer}>
            <table className={styles.signRequestTable}>
              <thead>
                <tr>
                  <th>DOCUMENT</th>
                  <th>ASSIGNED TO / SIGNER</th>
                  <th>STATUS</th>
                  <th>EXPIRY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className={styles.tableRow}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Skeleton width="20px" height="20px" />
                          <Skeleton width="180px" height="14px" />
                        </div>
                      </td>
                      <td><Skeleton width="140px" height="14px" /></td>
                      <td><Skeleton width="80px" height="22px" borderRadius="5px" /></td>
                      <td><Skeleton width="90px" height="14px" /></td>
                      <td style={{ textAlign: 'center' }}>
                        <Skeleton width="34px" height="34px" borderRadius="6px" style={{ display: 'inline-block' }} />
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredRequests.map((request) => {
                    const sign = signature.find(
                      (item) => item?.requestId?._id === request._id || item?.requestId === request._id
                    );
                    return (
                      <SignRequestRow 
                        key={request._id} 
                        request={request} 
                        sign={sign} 
                        onCancel={handleCancelRequest} 
                      />
                    );
                  })
                )}
              </tbody>
            </table>

            {!loading && filteredRequests.length === 0 && (
              <div className={styles.emptyState}>No sign requests found.</div>
            )}
          </div>
        </section>
      </>

    </Layout>
  );
};

const SignRequestRow = ({
  request,
  sign,
  onCancel,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <tr className={styles.tableRow}>
      <td className={styles.documentCell}>
        <div className={styles.documentInfo}>
          <FileText
            size={21}
            strokeWidth={1.8}
            className={styles.documentIcon}
          />

          <span className={styles.documentTitle}>
            {request?.documentId?.title ||
              "Untitled Document"}
          </span>

          <span
            className={`${styles.mobileStatus} ${
              request?.overallStatus === "completed"
                ? styles.statusCompleted
                : request?.overallStatus === "Expired"
                ? styles.statusExpired
                : request?.overallStatus === "cancelled"
                ? styles.statusCancelled
                : request?.overallStatus === "Viewed"
                ? styles.statusViewed
                : styles.statusPending
            }`}
          >
            {request?.overallStatus || "pending"}
          </span>
        </div>
      </td>

      <td className={styles.signerCell}>
        <span className={styles.mobileLabel}>
          Assigned to / Signer
        </span>

        <span className={styles.signerValue}>
          {request?.recipient?.userId?.name ||
            request?.recipient?.userId?.email ||
            "—"}
        </span>
      </td>

      <td className={styles.statusCell}>
        <span
          className={`${styles.statusBadge} ${
            request?.overallStatus === "completed"
              ? styles.statusCompleted
              : request?.overallStatus === "Expired"
              ? styles.statusExpired
              : request?.overallStatus === "cancelled"
              ? styles.statusCancelled
              : request?.overallStatus === "Viewed"
              ? styles.statusViewed
              : styles.statusPending
          }`}
        >
          {request?.overallStatus || "pending"}
        </span>
      </td>

      <td className={styles.expiryCell}>
        <span className={styles.mobileLabel}>
          Expiry
        </span>

        <span className={styles.expiryValue}>
          {request?.expiresat
            ? new Date(
                request.expiresat
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "—"}
        </span>
      </td>

      <td
        className={styles.actionCell}
        ref={menuRef}
      >
        <button
          type="button"
          className={styles.menuButton}
          onClick={() =>
            setMenuOpen((previous) => !previous)
          }
          aria-label="Sign request actions"
          aria-expanded={menuOpen}
        >
          <MoreHorizontal size={18} />
        </button>

        {menuOpen && (
          <div className={styles.actionMenu}>
            {request?.overallStatus === "completed" && (
              <>
                <a
                  href={sign?.certificateId?.signeddoc || "#"}
                  className={styles.actionItem}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={14} />

                  <span>
                    Download Signed Doc
                  </span>
                </a>

                <a
                  href={sign?.certificateId?.pdfUrl || "#"}
                  className={styles.actionItem}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Award size={14} />

                  <span>
                    Download Certificate
                  </span>
                </a>
              </>
            )}
            {request?.signerToken && (
               <button
              type="button"
              className={`${styles.actionItem} ${styles.dangerItem}`}
              onClick={() => {
                setMenuOpen(false);
                onCancel(request?.signerToken);
              }}
            >
              <XCircle size={14} />

              <span>
                Cancel Request
              </span>
            </button>
            )}
           
          </div>
        )}
      </td>
    </tr>
  );
};

export default SignRequest;

