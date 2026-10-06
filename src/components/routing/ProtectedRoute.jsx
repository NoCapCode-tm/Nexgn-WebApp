import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import LoadingScreen from "../Layout/LoadingScreen"; // adjust path as needed

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [needsBilling, setNeedsBilling] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}admin/me`,
          {
            withCredentials: true,
          }
        );
        const user = response?.data?.message;
        setAuthenticated(true);
        setNeedsBilling(user?.hasSeenBilling === false);
      } catch (err) {
        console.log(err.message)
        setAuthenticated(false);
        setNeedsBilling(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return <LoadingScreen state="solving" size={64} theme="light" message="Verifying session" />;
  }
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }
  if (needsBilling) {
    return <Navigate to="/pricing" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;