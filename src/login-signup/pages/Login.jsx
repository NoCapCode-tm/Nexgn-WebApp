import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";
import RightPanelCard from "../components/RightPanelCard";
import useSystemTheme from "../hooks/useSystemTheme";
import "../css/LoginSignup.css";
import axios from "axios";
import { API_URL } from "../../../config";

export default function Login() {
  useSystemTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}admin/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data.message);
      navigate("/admin");
    } catch (error) {
      console.log("Something went wrong", error.message);
    }
  };

  return (
    <div className="login-signup-container">
      <LeftPanel />

      <RightPanelCard
        title="Welcome Back"
        subtitle="Log in to continue to Nexgn"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </div>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <a
                href="#forgot"
                className="forgot-password-link"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="form-submit-btn">
            Login
          </button>
        </form>

        <div className="form-card-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="form-footer-link">
            Sign up
          </Link>
        </div>
      </RightPanelCard>
    </div>
  );
}