import DocumentsRow from "../../components/ui/DocumentsRow";
import { FileText } from "lucide-react"; // 1. Import the icon

export default function DocumentsTable({ documents, onRevoke ,onArchive,onCancel }) {
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
              key={idx}
              doc={doc}
              id={doc._id}
              onRevoke={() => onRevoke && onRevoke(doc._id)}
              onArchive={()=>onArchive && onArchive(doc._id)}
              onCancel={()=>onCancel && onCancel(doc._id)}
            />
          ))}
          
          {/* 2. Replace the old plain div with the new premium empty state */}
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

        </div>
      </div>
    </div>
  );
}