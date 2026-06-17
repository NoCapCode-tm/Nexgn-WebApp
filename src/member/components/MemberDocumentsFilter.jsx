import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function MemberDocumentsFilter({ search, setSearch, selectedStatus, setSelectedStatus }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const statuses = ["All", "Pending", "Signed", "Expired"];

  return (
    <div className="member-docs-topbar-actions">
      <div className="member-docs-search-wrap">
        <Search size={16} color="#9ca3af" strokeWidth={2} />
        <input
          className="member-docs-search-input"
          placeholder="Search Documents"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="member-docs-filter-wrapper">
        <button 
          className="member-docs-filter-btn"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
          </svg>
          <span className="filter-text">Filter</span>
        </button>

        {isFilterOpen && (
          <div className="member-docs-filter-dropdown">
            <div className="member-docs-filter-dropdown-group">
              <label className="member-docs-filter-dropdown-label">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="member-docs-filter-dropdown-select"
              >
                {statuses.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="member-docs-filter-dropdown-divider" />

            <button
              onClick={() => {
                setSelectedStatus("All");
                setIsFilterOpen(false);
              }}
              className="member-docs-filter-dropdown-reset"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      <button className="member-docs-add-btn" onClick={() => navigate("/member-request-signature")}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>
        </svg>
        <span className="add-btn-full">Add Document</span>
        <span className="member-docs-add-btn-short">Add</span>
      </button>
    </div>
  );
}
