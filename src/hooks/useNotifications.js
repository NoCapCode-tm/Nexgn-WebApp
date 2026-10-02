import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const listeners = new Set();
let items = [];
let source = null;
let pollTimer = null;
let subscribers = 0;
const seenIds = new Set();
let hasLoaded = false;

function emit() {
  const snapshot = items.slice();
  listeners.forEach((listener) => listener(snapshot));
}

function remember(list, { announce }) {
  list.forEach((item) => {
    if (!item?._id) return;
    if (announce && hasLoaded && !seenIds.has(item._id)) {
      toast.info(item.title || "New notification");
    }
    seenIds.add(item._id);
  });
  hasLoaded = true;
}

async function refresh({ announce = true } = {}) {
  try {
    const response = await axios.get(`${API_URL}notification`, {
      withCredentials: true,
    });
    const next = Array.isArray(response.data?.message)
      ? response.data.message
      : [];
    remember(next, { announce });

    const merged = new Map(items.map((item) => [item._id, item]));
    next.forEach((item) => merged.set(item._id, item));
    items = Array.from(merged.values())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 30);
    emit();
  } catch (error) {
    console.error("Failed to load notifications:", error?.message);
  }
}

function start() {
  refresh({ announce: false });

  pollTimer = setInterval(() => {
    refresh({ announce: true });
  }, 20000);

  source = new EventSource(`${API_URL}notification/stream`, {
    withCredentials: true,
  });

  source.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload.type !== "notification" || !payload.notification?._id) return;
      if (seenIds.has(payload.notification._id)) return;

      items = [payload.notification, ...items].slice(0, 30);
      remember([payload.notification], { announce: true });
      emit();
    } catch (error) {
      console.error("Notification stream parse failed:", error?.message);
    }
  };

  source.onerror = () => {
    source?.close();
    source = null;
  };
}

function stop() {
  clearInterval(pollTimer);
  pollTimer = null;
  source?.close();
  source = null;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState(items);

  useEffect(() => {
    listeners.add(setNotifications);
    subscribers += 1;
    setNotifications(items.slice());

    if (subscribers === 1) {
      start();
    }

    return () => {
      listeners.delete(setNotifications);
      subscribers -= 1;
      if (subscribers === 0) {
        stop();
        items = [];
        seenIds.clear();
        hasLoaded = false;
      }
    };
  }, []);

  return { notifications, refresh };
}

export async function markNotificationRead(id) {
  await axios.patch(
    `${API_URL}notification/${id}/read`,
    {},
    { withCredentials: true }
  );
  items = items.map((item) => (
    item._id === id ? { ...item, isRead: true } : item
  ));
  emit();
}

export async function markAllNotificationsRead() {
  await axios.patch(
    `${API_URL}notification/read-all`,
    {},
    { withCredentials: true }
  );
  items = items.map((item) => ({ ...item, isRead: true }));
  emit();
}
