import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import DocumentsRow from "../../components/ui/DocumentsRow";

export default function DocumentsTable({ 
  documents, 
  onRevoke, 
  onArchive, 
  onCancel,
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage,
  totalPages,
  indexOfFirstItem,
  indexOfLastItem
}) {
  return (
    <div className="admin-docs-section">
      <div className="admin-docs-table">
        {/* EXACTLY 6 COLUMNS */}
        <div className="admin-docs-table__header">
          <span>TITLE</span>
          <span>NOTE</span>
          <span>SIGNERS</span>
          <span>OWNER</span>
          <span>STATUS</span>
          <span>ACTION</span>
        </div>

        {/* Table Rows or Empty State */}
        {documents.length > 0 ? (
          documents.map((doc, idx) => (
            <DocumentsRow 
              key={idx}
              doc={doc} 
              id={doc._id} 
              onRevoke={() => onRevoke(doc._id)} 
              onArchive={() => onArchive(doc._id)} 
              onCancel={() => onCancel(doc._id)}
            />
          ))
        ) : (
          <div className="docs-empty-styled">
            <div className="docs-empty-icon">
              <FileText size={22} strokeWidth={1.5} />
            </div>
            <h3>No documents found</h3>
            <p>You haven't created any documents yet, or none match your search filters.</p>
          </div>
        )}

        {/* Pagination Footer */}
        {totalItems > 0 && (
          <div className="paginationWrapper">
            <div className="paginationLeft">
              <span className="paginationLabel">Rows per page:</span>
              <select 
                className="paginationSelect"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            
            <div className="paginationRight">
              <span className="paginationInfo">
                {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} of {totalItems}
              </span>
              <div className="paginationControls">
                <button 
                  className="pageButton" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  className="pageButton" 
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
    </div>
  );
}