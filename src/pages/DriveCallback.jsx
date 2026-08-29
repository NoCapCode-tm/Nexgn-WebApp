import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

export default function DriveCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code) {
      axios
        .get(`${API_URL}google/callback?code=${code}&state=${state}`, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Google Drive connected successfully!");
          navigate("/settings?drive=connected");
        })
        .catch((err) => {
          console.error("Drive connection error:", err);
          toast.error("Failed to connect Google Drive.");
          navigate("/settings?drive=failed");
        });
    } else {
      navigate("/settings");
    }
  }, [navigate, searchParams]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h2>Connecting your Google Drive...</h2>
    </div>
  );
}