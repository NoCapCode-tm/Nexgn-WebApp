import { useNavigate } from "react-router-dom";
import { Search, Bell, UserCircle, Settings, FileClock, UserPen, Crown, LogOut } from "lucide-react";

export default function MemberTopbarIcons({ 
  iconSize = 24, 
  className = "topbar__icons",
  fullName = "Jane Doe",
  email = "jane.doe@example.com",
  onSearchClick
}) {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <button className="topbar__icon-btn" onClick={onSearchClick}>
        <Search size={iconSize} color="#FF0915" strokeWidth={1.5} />
      </button>
      
      <div className="topbar__icon-wrapper">
        <button className="topbar__icon-btn">
          <Bell size={iconSize} color="#FF0915" strokeWidth={1.5} />
        </button>
        <div className="notification-dropdown">
          <div className="notification-dropdown__header">
            <span>Notifications</span>
            <Settings size={16} color="#FFFFFF" strokeWidth={1.5} />
          </div>
          <div className="notification-dropdown__body">
            <div className="notification-item">
              <div className="notification-item__avatar"></div>
              <div className="notification-item__text">Alice Smith has updated the document.</div>
            </div>
            <div className="notification-item">
              <FileClock color="#FF0915" size={20} className="notification-item__icon" strokeWidth={1.5} />
              <div className="notification-item__text">
                You have 1 document pending to sign.<br />
                <span className="notification-item__text--red">Take Action.</span>
              </div>
            </div>
          </div>
          <div className="notification-dropdown__footer">
            See all recent activity
          </div>
        </div>
      </div>

      <div className="topbar__icon-wrapper">
        <button className="topbar__icon-btn">
          <UserCircle size={iconSize} color="#FF0915" strokeWidth={1.5} />
        </button>
        <div className="notification-dropdown profile-dropdown">
          <div className="notification-dropdown__header">
            <span>Profile</span>
            <Settings size={16} color="#FFFFFF" strokeWidth={1.5} />
          </div>
          <div className="profile-dropdown__body">
            <div className="profile-dropdown__info">
              <div className="profile-dropdown__name">{fullName}</div>
              <div className="profile-dropdown__email">{email}</div>
            </div>
            <div className="profile-dropdown__menu">
              <button className="profile-dropdown__item" onClick={() => navigate("/member-settings")}>
                <UserPen size={16} color="#000000" strokeWidth={2} />
                <span>Edit Profile</span>
              </button>
              <button className="profile-dropdown__item">
                <Crown size={16} color="#000000" strokeWidth={2} />
                <span>Upgrade Plan</span>
              </button>
              <div className="profile-dropdown__divider" />
              <button className="profile-dropdown__item" onClick={() => navigate("/login")}>
                <LogOut size={16} color="#000000" strokeWidth={2} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
