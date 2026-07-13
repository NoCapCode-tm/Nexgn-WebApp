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
      <button className="member-contact-card__close" aria-label="Close">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.29954 0.365948C9.64939 -0.0609976 10.2795 -0.123321 10.7068 0.2263C11.1337 0.576149 11.196 1.20629 10.8464 1.63353L6.82786 6.54368L10.8454 11.4529C11.1951 11.8803 11.1322 12.5104 10.7048 12.8601C10.2774 13.2096 9.64729 13.1467 9.29759 12.7195L5.53587 8.12278L1.77513 12.7195C1.42543 13.1467 0.795274 13.2096 0.367902 12.8601C-0.0594759 12.5104 -0.122381 11.8803 0.227277 11.4529L4.24388 6.54368L0.2263 1.63353C-0.123321 1.20628 -0.0609976 0.576148 0.365948 0.2263C0.793191 -0.12332 1.42333 -0.0609975 1.77318 0.365948L5.53587 4.96458L9.29954 0.365948Z" fill="#666666"/>
        </svg>
      </button>
    </div>
  );
}
