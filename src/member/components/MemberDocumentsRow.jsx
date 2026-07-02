export default function MemberDocumentsRow({ title, note, signers, signedAt, owner, status }) {
  const userIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mobile-only-icon">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="5" />
    </svg>
  );
  
  const calendarIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mobile-only-icon">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/>
      <path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
    </svg>
  );
  
  const statusIcon = () => {
    if (status.toLowerCase() === 'signed') return <svg className="status-circle-icon status-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="11"/><path d="M9 12l2 2 4-4"/></svg>;
    if (status.toLowerCase() === 'expired') return <svg className="status-circle-icon status-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="11"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
    return (
      <svg className="status-circle-icon status-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="11" strokeWidth="2"/>
        <g transform="scale(0.65) translate(6.5, 6.5)">
          <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
          <circle cx="8" cy="16" r="6"/>
          <path d="M9.5 17.5 8 16.25V14"/>
        </g>
      </svg>
    );
  };

  return (
    <div className="member-doc-row">
      <div className="mobile-status-corner">{statusIcon()}</div>
      
      <div className="member-doc-row__title" data-label="TITLE">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="member-doc-row__icon">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <span>{title}</span>
      </div>
      
      <div className="member-doc-row__note" data-label="NOTE">{note}</div>
      
      <div className="member-doc-row__cell mobile-col" data-label="SIGNERS">
        {userIcon}
        <div className="mobile-col-text">
          <span className="mobile-val">{signers}</span>
          <span className="mobile-lbl">Signer</span>
        </div>
      </div>
      
      <div className="member-doc-row__cell mobile-col" data-label="SIGNED AT">
        {calendarIcon}
        <div className="mobile-col-text">
          <span className="mobile-val">{signedAt}</span>
          <span className="mobile-lbl">Signed on</span>
        </div>
      </div>
      
      <div className="member-doc-row__cell mobile-col-owner" data-label="OWNER">
        <span className="desktop-val">{owner}</span>
        <div className={`mobile-owner-badge badge-${status.toLowerCase()}`}>
          <div className="mobile-owner-badge__top">Owner</div>
          <div className="mobile-owner-badge__bot">{owner}</div>
        </div>
      </div>
      
      <div className="member-doc-row__cell desktop-status" data-label="STATUS">
        <span className={`member-badge member-badge--${status.toLowerCase()}`}>
          {status}
          {status.toLowerCase() === 'signed' && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: 2, verticalAlign: 'middle'}}>
              <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
            </svg>
          )}
          {status.toLowerCase() === 'pending' && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: 2, verticalAlign: 'middle'}}>
              <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
              <circle cx="8" cy="16" r="6"/>
              <path d="M9.5 17.5 8 16.25V14"/>
            </svg>
          )}
          {(status.toLowerCase() === 'expired' || status.toLowerCase() === 'failed') && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: 2, verticalAlign: 'middle'}}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          )}
        </span>
      </div>
      
      <div className="member-doc-row__menu">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="12" r="1"/>
          <circle cx="12" cy="12" r="1"/>
          <circle cx="19" cy="12" r="1"/>
        </svg>
      </div>
    </div>
  );
}
