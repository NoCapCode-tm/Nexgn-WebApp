import React from "react";
import { MoreVertical } from "lucide-react";

export default function ContactCard({ name, email, onClick }) {
  return (
    <div className="admin-contact-card" onClick={onClick}>
      <div className="admin-contact-card__avatar"></div>
      <div className="admin-contact-card__info">
        <div className="admin-contact-card__name">{name}</div>
        <div className="admin-contact-card__email">{email}</div>
      </div>
      <div className="admin-contact-card__more">
        <MoreVertical size={20} color="#111827" />
      </div>
    </div>
  );
}
