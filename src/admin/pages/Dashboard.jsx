import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import DocumentRow from "../components/DocumentRow";
import { Search, Bell, UserCircle, ArrowUpCircle, Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
 
  return (
    <div className="layout">
      {/* Mobile overlay backdrop */}
      {mobileNavOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* Sidebar — hidden on mobile unless open */}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <Sidebar />
      </div>

      {/* Desktop sidebar */}
      <div className="desktop-sidebar-wrapper">
        <Sidebar />
      </div>

      <div className="main">
        {/* Mobile topbar */}
        <header className="mobile-topbar">
  <button className="mobile-topbar__hamburger" onClick={() => setMobileNavOpen(o => !o)}>
    <Menu size={22} color="#1a1a2e" />
  </button>
  <span className="mobile-topbar__title">Dashboard</span>
  <div className="mobile-topbar__icons">
    <button className="topbar__icon-btn"><Search size={18} color="#FF0915" strokeWidth={1.5} /></button>
<button className="topbar__icon-btn"><Bell size={18} color="#FF0915" strokeWidth={1.5} /></button>
<button className="topbar__icon-btn"><UserCircle size={20} color="#FF0915" strokeWidth={1.5} /></button>
  </div>
</header>

        {/* Desktop topbar */}
        <header className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <div className="topbar__icons">
              <button className="topbar__icon-btn"><Search size={18} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><Bell size={18} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><UserCircle size={20} color="#FF0915" strokeWidth={1.5} /></button>
            </div>
          </div>
          <div className="topbar__bottom-row">
            <div>
              <h1 className="topbar__title">Dashboard</h1>
              <p className="topbar__sub">Overview of your document signing activity</p>
            </div>
            <button className="topbar__upload" onClick={() => navigate('/sign-yourself')}>
              <ArrowUpCircle size={16} />
              Upload Document
            </button>
          </div>
        </header>

        {/* Mobile page title + CTA buttons */}
        <div className="mobile-page-header">
          <h1 className="topbar__title">Dashboard</h1>
          <p className="topbar__sub">Overview of your document signing activity</p>
          <div className="mobile-cta-row">
            <button className="mobile-cta mobile-cta--primary">Sign Yourself</button>
            <button className="mobile-cta mobile-cta--outline">Request Signature</button>
          </div>
        </div>

        <section className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </section>

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
            {documents.map((doc, i) => (
              <DocumentRow key={i} {...doc} />
            ))}
          </div>
        </section>
      </div>
      {/* Mobile Bottom Nav */}
{/* Mobile Bottom Nav */}
<nav className="mobile-bottom-nav">
  <button className="mobile-bottom-nav__item mobile-bottom-nav__item--active" onClick={() => navigate('/')}>
    <span className="mobile-bottom-nav__icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/>
      </svg>
    </span>
    <span>Dashboard</span>
  </button>
  <button className="mobile-bottom-nav__item" onClick={() => navigate('/signers')}>
    <svg width="22" height="22" viewBox="0 0 24 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2.06641H9C8.44772 2.06641 8 2.52905 8 3.09974V5.16641C8 5.7371 8.44772 6.19974 9 6.19974H15C15.5523 6.19974 16 5.7371 16 5.16641V3.09974C16 2.52905 15.5523 2.06641 15 2.06641Z"/>
      <path d="M16 4.13281H18C18.5304 4.13281 19.0391 4.35055 19.4142 4.73813C19.7893 5.1257 20 5.65137 20 6.19948V20.6661C20 21.2143 19.7893 21.7399 19.4142 22.1275C19.0391 22.5151 18.5304 22.7328 18 22.7328H6C5.46957 22.7328 4.96086 22.5151 4.58579 22.1275C4.21071 21.7399 4 21.2143 4 20.6661V6.19948C4 5.65137 4.21071 5.1257 4.58579 4.73813C4.96086 4.35055 5.46957 4.13281 6 4.13281H8"/>
    </svg>
    <span>Signers</span>
  </button>
  <button className="mobile-bottom-nav__item" onClick={() => navigate('/documents')}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21072 5.46957 2 6 2H14C14.3166 1.99949 14.6301 2.06161 14.9225 2.18277C15.215 2.30394 15.4806 2.48176 15.704 2.706L19.292 6.294C19.5168 6.51751 19.6952 6.78335 19.8167 7.07616C19.9382 7.36898 20.0005 7.68297 20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6Z"/>
      <path d="M14 2V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H20"/>
    </svg>
    <span>Documents</span>
  </button>
  <button className="mobile-bottom-nav__item" onClick={() => navigate('/contacts')}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 2V4"/><path d="M7 22V20C7 19.4696 7.21071 18.9609 7.58579 18.5858C7.96086 18.2107 8.46957 18 9 18H15C15.5304 18 16.0391 18.2107 16.4142 18.5858C16.7893 18.9609 17 19.4696 17 20V22"/>
      <path d="M8 2V4"/>
      <path d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"/>
      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"/>
    </svg>
    <span>Contacts</span>
  </button>
  <button className="mobile-bottom-nav__item" onClick={() => navigate('/settings')}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5286 4.1342C10.5855 3.55454 10.8634 3.01624 11.3081 2.62448C11.7528 2.23271 12.3322 2.01562 12.9333 2.01562C13.5343 2.01562 14.1138 2.23271 14.5585 2.62448C15.0031 3.01624 15.2811 3.55454 15.3379 4.1342C15.3721 4.50865 15.4989 4.86962 15.7076 5.18654C15.9163 5.50346 16.2008 5.76701 16.5369 5.95488C16.873 6.14274 17.2509 6.2494 17.6385 6.26582C18.0262 6.28224 18.4122 6.20793 18.764 6.0492C19.3102 5.80898 19.9291 5.77422 20.5003 5.95168C21.0714 6.12915 21.554 6.50615 21.8541 7.0093C22.1541 7.51246 22.2502 8.10577 22.1236 8.67377C21.997 9.24177 21.6568 9.74381 21.1692 10.0822C20.8516 10.298 20.5924 10.5848 20.4135 10.9182C20.2345 11.2516 20.1411 11.6219 20.1411 11.9977C20.1411 12.3735 20.2345 12.7438 20.4135 13.0772C20.5924 13.4106 20.8516 13.6974 21.1692 13.9132C21.6568 14.2516 21.997 14.7536 22.1236 15.3216C22.2502 15.8896 22.1541 16.4829 21.8541 16.9861C21.554 17.4892 21.0714 17.8662 20.5003 18.0437C19.9291 18.2212 19.3102 18.1864 18.764 17.9462C18.4122 17.7875 18.0262 17.7132 17.6385 17.7296C17.2509 17.746 16.873 17.8527 16.5369 18.0405C16.2008 18.2284 15.9163 18.4919 15.7076 18.8089C15.4989 19.1258 15.3721 19.4867 15.3379 19.8612C15.2811 20.4409 15.0031 20.9792 14.5585 21.3709C14.1138 21.7627 13.5343 21.9798 12.9333 21.9798C12.3322 21.9798 11.7528 21.7627 11.3081 21.3709C10.8634 20.9792 10.5855 20.4409 10.5286 19.8612C10.4945 19.4866 10.3677 19.1255 10.159 18.8085C9.9502 18.4914 9.66565 18.2278 9.3294 18.0399C8.99315 17.852 8.61512 17.7454 8.22731 17.7291C7.8395 17.7128 7.45334 17.7873 7.10155 17.9462C6.55537 18.1864 5.93647 18.2212 5.36529 18.0437C4.79411 17.8662 4.31153 17.4892 4.01147 16.9861C3.7114 16.4829 3.61532 15.8896 3.74192 15.3216C3.86852 14.7536 4.20875 14.2516 4.69639 13.9132C5.01393 13.6974 5.27314 13.4106 5.45209 13.0772C5.63104 12.7438 5.72447 12.3735 5.72447 11.9977C5.72447 11.6219 5.63104 11.2516 5.45209 10.9182C5.27314 10.5848 5.01393 10.298 4.69639 10.0822C4.20943 9.74364 3.86981 9.24179 3.74351 8.67418C3.61722 8.10657 3.71327 7.51374 4.01302 7.01091C4.31276 6.50808 4.79477 6.13118 5.36538 5.95344C5.93599 5.7757 6.55443 5.80983 7.10052 6.0492C7.45227 6.20793 7.83832 6.28224 8.22599 6.26582C8.61366 6.2494 8.99154 6.14274 9.32765 5.95488C9.66376 5.76701 9.9482 5.50346 10.1569 5.18654C10.3656 4.86962 10.4924 4.50865 10.5266 4.1342"/>
      <path d="M12.9327 15C14.643 15 16.0295 13.6569 16.0295 12C16.0295 10.3431 14.643 9 12.9327 9C11.2224 9 9.83594 10.3431 9.83594 12C9.83594 13.6569 11.2224 15 12.9327 15Z"/>
    </svg>
    <span>Settings</span>
  </button>
</nav>
    </div>
  );
}