import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";
import RightPanelCard from "../components/RightPanelCard";
import { Users, PartyPopper } from "lucide-react";
import "../css/LoginSignup.css";

export default function Invite() {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "alex@acmecorp.com";
  const company = searchParams.get("company") || "acme Corp";
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleGoToDashboard = (e) => {
    e.preventDefault();
    // Reset theme to default light mode on entry
    localStorage.setItem("theme", "light");
    navigate("/");
  };

  return (
    <div className="login-signup-container">
      <LeftPanel />
      
      {step === 1 ? (
        <RightPanelCard 
          title="You’ve been invited to Nexgn" 
          subtitle={`Set a password to join ${company}’s Workspace`}
          icon={<Users size={28} className="form-card__icon" />}
        >
          <form onSubmit={handleJoin}>
            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="email" className="form-label">Email (non-editable)</label>
              </div>
              <input
                type="email"
                id="email"
                className="form-input"
                style={{ backgroundColor: "#F9FAFB", cursor: "not-allowed" }}
                value={email}
                readOnly
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
              Join Workspace
            </button>
          </form>
        </RightPanelCard>
      ) : (
        <RightPanelCard 
          title="You’ve joined the workspace" 
          subtitle="You have access to documents assigned to you"
          icon={<PartyPopper className="form-card__icon success-icon" />}
        >
          <form onSubmit={handleGoToDashboard} style={{ marginTop: "3vw" }}>
            <button type="submit" className="form-submit-btn">
              Go to Dashboard
            </button>
          </form>
        </RightPanelCard>
      )}
    </div>
  );
}
