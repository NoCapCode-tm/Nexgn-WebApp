import React from "react";
import { MoreVertical } from "lucide-react";

export default function MemberContactCard({ name, email, onClick }) {
  return (
    <div className="member-contact-card" onClick={onClick}>
      <div className="member-contact-card__avatar"></div>
      <div className="member-contact-card__info">
        <div className="member-contact-card__name">{name}</div>
        <div className="member-contact-card__email">{email}</div>
      </div>
      <div className="member-contact-card__more">
        <MoreVertical size={20} color="#111827" />
      </div>
    </div>
  );
}
