import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Topbar from "../../components/Layout/Topbar";
import StatCard from "../../components/ui/StatCard";
import DocumentRow from "../documents/DocumentRow";
import useWindowWidth from "../../hooks/useWindowWidth";
import "../../styles/BaseLayout.css";
import "./Dashboard.css";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import { StatCardSkeleton, TableRowSkeleton } from "../../components/common/Skeleton";





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
  const[requests,setRequests]=useState([])
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(null);
  const width = useWindowWidth();
  const isMobile = width <= 768;
  const navigate = useNavigate();

  useEffect(() => {
  let mounted = true;

  const loadDashboard = async () => {
    try {
      setLoading(true);

      // 1. Verify user
      const authResponse = await axios.get(
        `${API_URL}admin/me`,
        {
          withCredentials: true,
        }
      );

      if (!mounted) return;

      const user = authResponse.data.message;
      setAuthenticated(user);

      const canView =
        user?.role === "Admin" ||
        user?.permissions?.includes("Dashboard-View");

      if (!canView) {
        toast.error(
          "You are not permitted to view the dashboard"
        );
        setLoading(false);
        return;
      }

      // 2. Fetch dashboard data IN PARALLEL
      const [documentResponse, signRequestResponse] =
        await Promise.all([
          axios.get(`${API_URL}document/getdocument`, {
            withCredentials: true,
          }),

          axios.get(`${API_URL}sign/getrequests`, {
            withCredentials: true,
          }),
        ]);

      if (!mounted) return;

      const docs = documentResponse?.data?.message || [];
      const signRequests =
        signRequestResponse?.data?.message || [];

      setDocuments(docs);

      setRequests(
        signRequests.filter(
          (request) =>
            request.overallStatus === "Expired"
        ).length
      );
    } catch (error) {
      if (!mounted) return;

      console.error(
        "Dashboard loading error:",
        error
      );

      setAuthenticated(false);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load dashboard"
      );
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

  // const canViewDashboard =
  // authenticated?.role === "Admin" ||
  // authenticated?.permissions?.includes("Dashboard-View");


//  useEffect(() => {
//   if (!authenticated) return;

//   const canView =
//     authenticated.role === "Admin" ||
//     authenticated.permissions?.includes("Dashboard-View");

//   if (!canView) return;

//   const loadDashboardData = async () => {
//     setLoading(true)
//     try {
//       const response = await axios.get(
//         `${API_URL}document/getdocument`,
//         {
//           withCredentials: true,
//         }
//       );

//       setDocuments(
//         response.data.message || []
//       );

//       const signrequest =
//         await axios.get(
//           `${API_URL}sign/getrequests`,
//           {
//             withCredentials: true,
//           }
//         );

//       const requests =
//         signrequest?.data?.message || [];

//       setRequests(
//         requests.filter(
//           (r) =>
//             r.overallStatus === "Expired"
//         ).length
//       );

//     } catch (error) {
//       console.error(
//         "Dashboard data error:",
//         error
//       );
//     }finally{
//       setLoading(false)
//     }
//   };

//   loadDashboardData();

// }, [authenticated]);
// useEffect(() => {
//   if (!authenticated) return;

//   const allowed =
//     authenticated.role === "Admin" ||
//     authenticated.permissions?.includes(
//       "Dashboard-View"
//     );

//   if (!allowed) {
//     toast.error(
//       "You are not permitted to view the dashboard"
//     );
//   }
// }, [authenticated]);

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
    value: requests,
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

      {authenticated?.permissions?.includes("Dashboard-Analytics") ||
      authenticated?.role === "Admin" ? (
            <section className="stats-grid">
              {loading ? (
                Array.from({ length: isMobile ? 2 : 4 }).map((_, i) => <StatCardSkeleton key={i} />)
              ) : (
                stats.slice(0, isMobile ? 2 : 4).map((s) => <StatCard key={s.label} {...s} />)
              )}
            </section>
        ) : null}

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
              {loading ? (
                <TableRowSkeleton count={5} />
              ) : documents.length > 0 ? (
                documents.map((doc, idx) => (
                  <DocumentRow key={idx} {...doc} onRevoke={() => handleRevoke(doc.title)} />
                ))
              ) : (
                <p style={{ textAlign: "center", color: "#6b7280", padding: "20px" }}>No recent documents found.</p>
              )}
            </div>
        </section>
      </>
    </Layout>
  );
}
