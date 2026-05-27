import { Search, Bell, UserCircle, Upload } from "lucide-react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import DocumentRow from "../components/DocumentRow";

const stats = [
  { label: "Total Documents", value: "128", trend: "12%", trendUp: true },
  { label: "Pending", value: "32", trend: "9%", trendUp: true },
  { label: "Signed", value: "84", trend: "18%", trendUp: true },
  { label: "Expired", value: "12", trend: "3%", trendUp: false },
];

const documents = [
  { title: "Project Proposal", note: "Send it to client", signers: "Jane Doe", signedAt: "—", owner: "Me", status: "Pending" },
  { title: "Policy Acknowledgement Form", note: "Please sign before 12th", signers: "Charlie Brown", signedAt: "April 10, 2026", owner: "Me", status: "Signed" },
  { title: "NDA Agreement", note: "Review and approve", signers: "Bob Jones", signedAt: "April 08, 2026", owner: "Me", status: "Signed" },
  { title: "NDA Agreement", note: "Review and approve", signers: "Bob Jones", signedAt: "—", owner: "Me", status: "Expired" },
  { title: "NDA Agreement", note: "NDA with vendor...", signers: "Alice Smith", signedAt: "—", owner: "Me", status: "Pending" },
];

export default function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        {/* Topbar */}
        <header className="topbar">
          <div>
            <h1 className="topbar__title">Dashboard</h1>
            <p className="topbar__sub">Overview of your document signing activity</p>
          </div>
          <div className="topbar__actions">
            <button className="topbar__icon-btn"><Search size={18} /></button>
            <button className="topbar__icon-btn"><Bell size={18} /></button>
            <button className="topbar__icon-btn"><UserCircle size={20} /></button>
            <button className="topbar__upload">
              <Upload size={14} />
              Upload Document
            </button>
          </div>
        </header>

        {/* Stat Cards */}
        <section className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </section>

        {/* Recent Documents */}
        <section className="docs-section">
          <h2 className="docs-section__title">Recent Documents</h2>
          <div className="table-wrapper">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>NOTE</th>
                  <th>SIGNERS</th>
                  <th>SIGNED AT</th>
                  <th>OWNER</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => (
                  <DocumentRow key={i} {...doc} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}