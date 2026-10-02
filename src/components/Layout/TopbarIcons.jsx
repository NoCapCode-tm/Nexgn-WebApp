import { useNavigate } from "react-router-dom";
import { Bell, UserCircle, Settings, FileClock, UserPen, Crown, LogOut, Sun, Moon, BookOpen, Shield } from "lucide-react";
import useDarkMode from "../../hooks/useDarkMode";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useProductTour } from "../tour/ProductTour";
import {
  useNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../hooks/useNotifications";

export default function TopbarIcons({
  iconSize = 24,
  className = "topbar__icons"
}) {
  const navigate = useNavigate();
  const [isDark, toggleDark] = useDarkMode();
  const [user, setUser] = useState({});
  const { restartTour } = useProductTour();
  const { notifications } = useNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationRef = useRef(null);
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!notificationRef.current?.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

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
        console.log(err.message);
      }
    };

    verifyUser();
  }, []);

  const handlelogout = async () => {
    try {
      await axios.post(`${API_URL}admin/logout`, {
        id: user?._id
      }, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.log("Something went wrong in logging out", error.message);
    }
  };

  const openNotification = async (item) => {
    setNotificationsOpen(false);

    if (!item.isRead) {
      try {
        await markNotificationRead(item._id);
      } catch (error) {
        console.error("Failed to mark notification as read:", error?.message);
      }
    }

    if (!item.link) return;
    if (item.link.startsWith("http")) {
      window.location.href = item.link;
      return;
    }
    navigate(item.link);
  };

  const markAllRead = async (event) => {
    event.stopPropagation();
    try {
      await markAllNotificationsRead();
    } catch (error) {
      console.error("Failed to mark notifications as read:", error?.message);
    }
  };

  const formatNotificationTime = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

      <div
        className={`topbar__icon-wrapper${notificationsOpen ? " is-open" : ""}`}
        ref={notificationRef}
      >
        <button
          className="topbar__icon-btn topbar__notify-btn"
          type="button"
          aria-label="Notifications"
          onClick={() => setNotificationsOpen((open) => !open)}
        >
          <Bell size={iconSize} color="#FF0915" strokeWidth={1.5} />
          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
        <div className="notification-dropdown">
          <div className="notification-dropdown__header">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button
                type="button"
                className="notification-dropdown__mark"
                onClick={markAllRead}
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="notification-dropdown__body">
            {notifications.length === 0 && (
              <div className="notification-item__text">No notifications yet.</div>
            )}
            {notifications.map((item) => (
              <button
                type="button"
                className={`notification-item${item.isRead ? "" : " notification-item--unread"}`}
                key={item._id}
                onClick={() => openNotification(item)}
              >
                {item.type === "security"
                  ? <Shield color="#FF0915" size={20} className="notification-item__icon" strokeWidth={1.5} />
                  : <FileClock color="#FF0915" size={20} className="notification-item__icon" strokeWidth={1.5} />
                }
                <div className="notification-item__text">
                  <div className="notification-item__message">{item.message || item.title}</div>
                  <div className="notification-item__time">{formatNotificationTime(item.createdAt)}</div>
                </div>
              </button>
            ))}
          </div>
          <div
            className="notification-dropdown__footer"
            onClick={() => {
              setNotificationsOpen(false);
              navigate("/settings?tab=notifications");
            }}
            style={{ cursor: "pointer" }}
          >
            Notification settings
          </div>
        </div>
      </div>

      <div className="topbar__icon-wrapper">
        <button style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", border: "1px solid red" }}>
          {user?.profile_picture ? <img src={user?.profile_picture} width="100%" height="100%" alt="Profile" /> : <UserCircle width="100%" height="100%" color="#FF0915" strokeWidth={1} />}
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
              <button className="profile-dropdown__item" onClick={() => restartTour()}>
                <BookOpen size={16} color="#000000" strokeWidth={2} />
                <span>Take Tour</span>
              </button>
              <button className="profile-dropdown__item">
                <Crown size={16} color="#000000" strokeWidth={2} />
                <span>Upgrade Plan</span>
              </button>
              <div className="profile-dropdown__divider" />
              <button className="profile-dropdown__item" onClick={() => handlelogout()}>
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