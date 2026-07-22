import React from "react";
import { PartyPopper } from "lucide-react";

export default function RightPanelCard({ children, title, subtitle, icon }) {
  return (
    <div className="login-signup-right">
      <div className="form-card">
        <div className="form-card__icon-header">
          {icon || <PartyPopper size={28} className="form-card__icon" />}
        </div>
        
        <h2 className="form-card__title">{title}</h2>
        {subtitle && <p className="form-card__subtitle">{subtitle}</p>}

        {children}
      </div>
    </div>
  );
}
