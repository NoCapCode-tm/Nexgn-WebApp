import DocumentsRow from "../../components/ui/DocumentsRow";

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
              onRevoke={() => onRevoke && onRevoke(doc._id)}
              onArchive={()=>onArchive && onArchive(doc._id)}
              onCancel={()=>onCancel && onCancel(doc._id)}
            />
          ))}
          {documents.length === 0 && (
            <div className="admin-docs-empty-state">No documents found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
