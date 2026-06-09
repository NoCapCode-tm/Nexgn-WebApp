import MemberDocumentsRow from "./MemberDocumentsRow";

export default function MemberDocumentsTable({ documents }) {
  return (
    <>
      <div className="member-docs-table__header">
        <span>TITLE</span>
        <span>NOTE</span>
        <span>SIGNERS</span>
        <span>SIGNED AT</span>
        <span>OWNER</span>
        <span>STATUS</span>
        <span>Action</span>
      </div>
      
      <div className="member-docs-section">
        <div className="member-docs-table">
          {documents.map((doc, idx) => (
            <MemberDocumentsRow key={idx} {...doc} />
          ))}
          {documents.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af', fontSize: '13px' }}>
              No documents found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
