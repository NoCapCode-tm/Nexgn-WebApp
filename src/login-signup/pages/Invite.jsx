import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";
import RightPanelCard from "../components/RightPanelCard";
import { Users, PartyPopper } from "lucide-react";
import useSystemTheme from "../hooks/useSystemTheme";
import "../css/LoginSignup.css";
import axios from "axios";

export default function Invite() {
  useSystemTheme();
  const {email} = useParams()
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleJoin = async(e) => {
    e.preventDefault();
   try {
     const response = await axios.post(`${API_URL}admin/setpassword`,{
       email,
       password
     },{withCredentials:true})
     console.log(response.data.message)
     
     
   } catch (error) {
      console.log("Something Went Wrong in setting password",error.message)
   }finally{
   setStep(2);
   }
  };

  const handleGoToDashboard = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login-signup-container">
      <LeftPanel />

      {step === 1 ? (
        <RightPanelCard
          title="You’ve been invited to Nexgn"
          subtitle={`Set a password to join Workspace`}
          icon={<Users size={28} className="form-card__icon" />}
        >
          <form onSubmit={handleJoin}>
            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="email" className="form-label">
                  Email (non-editable)
                </label>
              </div>
              <input
                type="email"
                id="email"
                className="form-input form-input--readonly"
                style={{ cursor: "not-allowed" }}
                value={email}
                readOnly
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
