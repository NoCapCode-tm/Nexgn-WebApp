import { useNavigate } from "react-router-dom";
import { Search, Bell, UserCircle } from "lucide-react";

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3"/>
    <path d="M12 17V7M12 7L7 12M12 7L17 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <header className="topbar desktop-topbar">
      <div className="topbar__top-row">
        <div className="topbar__icons">
          <button className="topbar__icon-btn">
            <Search size={24} color="#FF0915" strokeWidth={1.5} />
          </button>
          <button className="topbar__icon-btn">
            <Bell size={24} color="#FF0915" strokeWidth={1.5} />
          </button>
          <button className="topbar__icon-btn">
            <UserCircle size={24} color="#FF0915" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="topbar__bottom-row">
        <div>
          <h1 className="topbar__title">Dashboard</h1>
          <p className="topbar__sub">Overview of your document signing activity</p>
        </div>
        <button className="topbar__upload" onClick={() => navigate("/admin-sign-yourself")}>
          <UploadIcon />
          Upload Document
        </button>
      </div>
    </header>
  );
}
