import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";
import RightPanelCard from "../components/RightPanelCard";
import "../css/LoginSignup.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication and redirect to dashboard
    localStorage.setItem("theme", "light");
    navigate("/");
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
              <label htmlFor="email" className="form-label">Email</label>
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
              <label htmlFor="password" className="form-label">Password</label>
              <a href="#forgot" className="forgot-password-link" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="********"
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
