import { useNavigate } from "react-router-dom";
import { Bell, UserCircle, Settings, FileClock, UserPen, Crown, LogOut, Sun, Moon } from "lucide-react";
import useDarkMode from "../../hooks/useDarkMode";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../config";

export default function TopbarIcons({ 
  iconSize = 24, 
  className = "topbar__icons"
}) {
  const navigate = useNavigate();
  const [isDark, toggleDark] = useDarkMode();
  const[user,setUser]=useState({})

   useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}admin/me`,
          {
            withCredentials: true,
          }
        );

        setUser(response.data.message);
      } catch (err) {
        console.log(err.message)
      }
    };

    verifyUser();
  }, []);

  const handlelogout = async()=>{
   try {
     await axios.post(`${API_URL}admin/logout`,{
      id:user?._id 
     },{withCredentials:true})
     navigate("/login")
   } catch (error) {
    console.log("Something went wrong in logging out",error.message)
   }

  }

  return (
    <div className={className}>
      {/* Dark mode toggle — mobile only */}
      <button
        className="topbar__icon-btn topbar__dark-toggle"
        onClick={toggleDark}
        aria-label="Toggle dark mode"
      >
        {isDark
          ? <Sun size={iconSize} color="#FF0915" strokeWidth={1.5} />
          : <Moon size={iconSize} color="#FF0915" strokeWidth={1.5} />
        }
      </button>

      <div className="topbar__icon-wrapper">
        <button className="topbar__icon-btn">
          <Bell size={iconSize} color="#FF0915" strokeWidth={1.5} />
        </button>
        <div className="notification-dropdown">
          <div className="notification-dropdown__header">
            <span>Notifications</span>
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
                <span 
                  className="notification-item__text--red"
                  onClick={() => navigate("/documents")}
                  style={{ cursor: "pointer" }}
                >
                  Take Action.
                </span>
              </div>
            </div>
          </div>
          <div 
            className="notification-dropdown__footer"
            onClick={() => navigate("/settings?tab=notifications")}
            style={{ cursor: "pointer" }}
          >
            See all recent activity
          </div>
        </div>
      </div>

      <div className="topbar__icon-wrapper">
        <button style={{width:"40px",height:"40px", borderRadius:"50%", overflow:"hidden",border:"1px solid red"}}>
          {user?.profile_picture ?<img src ={user?.profile_picture}  width="100%" height="100%" />:<UserCircle size={iconSize} color="#FF0915" strokeWidth={1.5} />}
        </button>
        <div className="notification-dropdown profile-dropdown">
          <div className="notification-dropdown__header profile-dropdown__header">
            <span>Profile</span>
            <button
              className="profile-dropdown__settings-btn"
              onClick={() => navigate("/settings")}
              aria-label="Settings"
            >
              <Settings size={16} color="#FFFFFF" strokeWidth={2} />
            </button>
          </div>
          <div className="profile-dropdown__body">
            <div className="profile-dropdown__info">
              <div className="profile-dropdown__name">{user?.name}</div>
              <div className="profile-dropdown__email">{user?.email}</div>
            </div>
            <div className="profile-dropdown__menu">
              <button className="profile-dropdown__item" onClick={() => navigate("/settings?tab=profile")}>
                <UserPen size={16} color="#000000" strokeWidth={2} />
                <span>Edit Profile</span>
              </button>
              <button className="profile-dropdown__item">
                <Crown size={16} color="#000000" strokeWidth={2} />
                <span>Upgrade Plan</span>
              </button>
              <div className="profile-dropdown__divider" />
              <button className="profile-dropdown__item" onClick={()=>handlelogout()}>
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
