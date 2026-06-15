import DocumentsRow from "./DocumentsRow";

export default function DocumentsTable({ documents }) {
  return (
    <>
      <div className="admin-docs-table__header">
        <span>TITLE</span>
        <span>NOTE</span>
        <span>SIGNERS</span>
        <span>SIGNED AT</span>
        <span>OWNER</span>
        <span>STATUS</span>
        <span>Action</span>
      </div>
      
      <div className="admin-docs-section">
        <div className="admin-docs-table">
          {documents.map((doc, idx) => (
            <DocumentsRow key={idx} {...doc} />
          ))}
          {documents.length === 0 && (
            <div className="admin-docs-empty-state">
              No documents found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
