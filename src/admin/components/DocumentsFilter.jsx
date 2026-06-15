import { Search } from "lucide-react";

export default function DocumentsFilter({ search, setSearch }) {
  return (
    <div className="admin-docs-topbar-actions">
      <div className="admin-docs-search-wrap">
        <Search size={16} color="#9ca3af" strokeWidth={2} />
        <input
          className="admin-docs-search-input"
          placeholder="Search Documents"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button className="admin-docs-filter-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
        </svg>
        <span className="filter-text">Filter</span>
      </button>
      <button className="admin-docs-add-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>
        </svg>
        <span className="add-btn-full">Add Contact</span>
        <span className="admin-docs-add-btn-short">Add</span>
      </button>
    </div>
  );
}
