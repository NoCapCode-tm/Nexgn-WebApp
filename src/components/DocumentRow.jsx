import { FileText, MoreHorizontal } from "lucide-react";

const statusClass = {
  Pending: "badge--pending",
  Signed: "badge--signed",
  Expired: "badge--expired",
};

export default function DocumentRow({ title, note, signers, signedAt, owner, status }) {
  return (
    <div className="doc-row">
      <div className="doc-row__title">
        <FileText size={15} className="doc-row__icon" />
        <span>{title}</span>
      </div>
      <div className="doc-row__note">{note || "—"}</div>
      <div className="doc-row__cell">{signers || "—"}</div>
      <div className="doc-row__cell">{signedAt || "—"}</div>
      <div className="doc-row__cell">{owner}</div>
      <div className="doc-row__cell">
        <span className={`badge ${statusClass[status]}`}>{status}</span>
      </div>
      <div className="doc-row__cell">
        <button className="doc-row__menu">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}