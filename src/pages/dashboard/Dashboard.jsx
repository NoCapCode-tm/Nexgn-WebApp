import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react"; 
import Layout from "../../components/Layout/Layout";
import Topbar from "../../components/Layout/Topbar";
import StatCard from "../../components/ui/StatCard";
import DocumentRow from "../documents/DocumentRow";
import useWindowWidth from "../../hooks/useWindowWidth";
import "../../styles/BaseLayout.css";
import "./Dashboard.css";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import { StatCardSkeleton, TableRowSkeleton } from "../../components/common/Skeleton";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(null);
  const width = useWindowWidth();
  const isMobile = width <= 768;
  const navigate = useNavigate();

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 5 for Dashboard

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);

        const authResponse = await axios.get(`${API_URL}admin/me`, {
          withCredentials: true,
        });

        if (!mounted) return;

        const user = authResponse.data.message;
        setAuthenticated(user);

        const canView =
          user?.role === "Admin" ||
          user?.permissions?.includes("Dashboard-View");

        if (!canView) {
          toast.error("You are not permitted to view the dashboard");
          setLoading(false);
          return;
        }

        const [documentResponse, signRequestResponse] = await Promise.all([
          axios.get(`${API_URL}document/getdocument`, {
            withCredentials: true,
          }),
          axios.get(`${API_URL}sign/getrequests`, {
            withCredentials: true,
          }),
        ]);

        if (!mounted) return;

        const docs = documentResponse?.data?.message || [];
        const signRequests = signRequestResponse?.data?.message || [];

        setDocuments(docs);
        setRequests(
          signRequests.filter((request) => request.overallStatus === "Expired").length
        );
      } catch (error) {
        if (!mounted) return;
        console.error("Dashboard loading error:", error);
        setAuthenticated(false);
        toast.error(error?.response?.data?.message || "Failed to load dashboard");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const { completed, total, pending } = useMemo(() => {
    const completed = documents?.filter((d) => d.status === "completed").length;
    const total = documents?.length;
    const pending = documents?.filter(
      (d) => d.status === "sent" || d.status === "partially_signed" || d.status === "pending"
    ).length;

    return { completed, total, pending };
  }, [documents]);

  const stats = [
    { label: "Total Documents", value: total || 0, trend: "12%", trendUp: true },
    { label: "Pending", value: pending || 0, trend: "8%", trendUp: true },
    { label: "Signed", value: completed || 0, trend: "18%", trendUp: true },
    { label: "Expired", value: requests || 0, trend: "3%", trendUp: false },
  ];

  const handleRevoke = (title) => {
    setDocuments((prev) => prev.filter((doc) => doc.title !== title));
  };

  // --- Pagination Logic ---
  const totalItems = documents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout className="admin-dashboard-page">
      <>
        <Topbar title="Dashboard" subtitle="Overview of your document signing activity" />

        <div className="mobile-page-header">
          <div className="mobile-page-header__container">
            <div className="mobile-page-header__titles">
              <h1 className="topbar__title">Dashboard</h1>
              <p className="topbar__sub">Overview of your document signing activity</p>
            </div>
            <button
              className="mobile-page-header__upload-btn"
              onClick={() => navigate("/sign-yourself")}
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <path d="M 12 2 A 10 10 0 0 0 12 22" stroke="#FF0915" strokeWidth="2" strokeLinecap="round" />
                <path d="M 12 2 A 10 10 0 0 1 12 22" stroke="#FF0915" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
                <path d="M 12 16 V 8 M 12 8 L 8 12 M 12 8 L 16 12" stroke="#FF0915" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="tablet-upload-btn"
              onClick={() => navigate("/sign-yourself")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M 12 2 A 10 10 0 0 0 12 22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <path d="M 12 2 A 10 10 0 0 1 12 22" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
                <path d="M 12 16 V 8 M 12 8 L 8 12 M 12 8 L 16 12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Upload Doc
            </button>
          </div>
          <div className="mobile-page-header__divider" />
        </div>

        {authenticated?.permissions?.includes("Dashboard-Analytics") || authenticated?.role === "Admin" ? (
          <section className="stats-grid">
            {loading ? (
              Array.from({ length: isMobile ? 2 : 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            ) : (
              stats.slice(0, isMobile ? 2 : 4).map((s) => <StatCard key={s.label} {...s} />)
            )}
          </section>
        ) : null}

        <section className="docs-section" data-tour="dashboard">
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
            {loading ? (
              <TableRowSkeleton count={itemsPerPage} />
            ) : totalItems > 0 ? (
              currentItems.map((doc, idx) => (
                <DocumentRow key={doc._id || idx} {...doc} onRevoke={() => handleRevoke(doc.title)} />
              ))
            ) : (
              <div className="admin-docs-empty-state docs-empty-styled">
                <div className="docs-empty-icon">
                  <FileText size={22} strokeWidth={1.5} />
                </div>
                <h3>No documents found</h3>
                <p>There are no documents matching your current filters.</p>
              </div>
            )}

            {/* --- Pagination Footer --- */}
            {!loading && totalItems > 0 && (
              <div className="paginationWrapper" style={{ borderTop: '1px solid #e5e7eb', marginTop: '280px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="paginationLeft" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="paginationLabel" style={{ fontSize: '13px', fontWeight: 500, color: '#6b7280' }}>Rows per page:</span>
                  <select 
                    className="paginationSelect"
                    style={{ height: '32px', padding: '0 8px', fontSize: '13px', fontWeight: 500, color: '#111827', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', outline: 'none' }}
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                
                <div className="paginationRight" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="paginationInfo" style={{ fontSize: '13px', fontWeight: 500, color: '#6b7280' }}>
                    {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} of {totalItems}
                  </span>
                  <div className="paginationControls" style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: '1px solid #e5e7eb', borderRadius: '6px', backgroundColor: currentPage === 1 ? '#f9fafb' : '#ffffff', color: currentPage === 1 ? '#9ca3af' : '#374151', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: '1px solid #e5e7eb', borderRadius: '6px', backgroundColor: currentPage === totalPages ? '#f9fafb' : '#ffffff', color: currentPage === totalPages ? '#9ca3af' : '#374151', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </>
    </Layout>
  );
}