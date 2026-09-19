import DocumentsRow from "../../components/ui/DocumentsRow";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react"; 

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
    <div className="admin-docs-table-wrapper">
      <div className="admin-docs-table__header">
        <span>TITLE</span>
        <span>NOTE</span>
        <span>SIGNERS</span>
        <span>OWNER</span>
        <span>STATUS</span>
        <span>Action</span>
      </div>

      <div className="admin-docs-section">
        <div className="admin-docs-table">
          {documents.map((doc, idx) => (
            <DocumentsRow
              key={doc._id || idx}
              doc={doc}
              id={doc._id}
              title={doc.title}
              note={doc.note}
              assignedto={doc.assignedto || []}
              createdBy={doc.senderId || doc.createdBy}
              status={doc.status || "Pending"}
              onRevoke={() => onRevoke && onRevoke(doc._id)}
              onArchive={() => onArchive && onArchive(doc._id)}
              onCancel={() => onCancel && onCancel(doc._id)}
            />
          ))}
          
          {/* Empty State */}
          {documents.length === 0 && (
            <div className="admin-docs-empty-state docs-empty-styled">
              <div className="docs-empty-icon">
                <FileText size={22} strokeWidth={1.5} />
              </div>
              <h3>No documents found</h3>
              <p>
                There are no documents matching your current filters.
              </p>
            </div>
          )}

          {/* Pagination Footer */}
          {totalItems > 0 && (
            <div className="paginationWrapper" style={{ borderTop: '1px solid #e5e7eb', marginTop: '8px', paddingTop: '16px', paddingBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  <option value={50}>50</option>
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
      </div>
    </div>
  );
}