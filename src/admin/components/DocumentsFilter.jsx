import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function DocumentsFilter({ search, setSearch, selectedStatus, setSelectedStatus }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const statuses = ["All", "Pending", "Signed", "Expired"];

  return (
    <div className="admin-docs-topbar-actions">
      <div className="admin-docs-search-wrap">
        <Search size={16} color="#9ca3af" strokeWidth={2} />
        <input
          className="admin-docs-search-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="admin-docs-filter-wrapper">
        <button 
          className="admin-docs-filter-btn"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
          </svg>
          <span className="filter-text">Filter</span>
        </button>

        {isFilterOpen && (
          <div className="admin-docs-filter-dropdown">
            <div className="admin-docs-filter-dropdown-group">
              <label className="admin-docs-filter-dropdown-label">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="admin-docs-filter-dropdown-select"
              >
                {statuses.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="admin-docs-filter-dropdown-divider" />

            <button
              onClick={() => {
                setSelectedStatus("All");
                setIsFilterOpen(false);
              }}
              className="admin-docs-filter-dropdown-reset"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      <button className="admin-docs-add-btn" onClick={() => navigate("/admin-request-signature")}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>
        </svg>
        <span className="add-btn-full">Add Document</span>
        <span className="admin-docs-add-btn-short" style={{ display: 'none' }}>Add</span>
      </button>
    </div>
  );
}
