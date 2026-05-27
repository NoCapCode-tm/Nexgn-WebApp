import { FileText, MoreHorizontal } from "lucide-react";

const statusClass = {
  Pending: "badge--pending",
  Signed: "badge--signed",
  Expired: "badge--expired",
};

export default function DocumentRow({ title, note, signers, signedAt, owner, status }) {
  return (
    <tr className="doc-row">
      <td className="doc-row__title">
        <FileText size={14} className="doc-row__icon" />
        <span>{title}</span>
      </td>
      <td className="doc-row__note">{note || "—"}</td>
      <td>{signers || "—"}</td>
      <td>{signedAt || "—"}</td>
      <td>{owner}</td>
      <td>
        <span className={`badge ${statusClass[status]}`}>{status}</span>
      </td>
      <td>
        <button className="doc-row__menu">
          <MoreHorizontal size={16} />
        </button>
      </td>
    </tr>
  );
}