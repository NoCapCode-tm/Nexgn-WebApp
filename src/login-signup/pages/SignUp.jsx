import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";
import RightPanelCard from "../components/RightPanelCard";
import { UserPlus, Building2, ArrowDown, PartyPopper } from "lucide-react";
import "../css/LoginSignup.css";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 State
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const navigate = useNavigate();

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    // Redirect to dashboard
    localStorage.setItem("theme", "light");
    navigate("/");
  };

  return (
    <div className="login-signup-container">
      <LeftPanel />
      
      {step === 1 && (
        <RightPanelCard 
          title="Create an account" 
          icon={<UserPlus size={28} className="form-card__icon" />}
        >
          <form onSubmit={handleStep1Submit}>
            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="name" className="form-label">Full Name</label>
              </div>
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              Sign Up
            </button>
          </form>

          <div className="form-card-footer">
            Have an account?{" "}
            <Link to="/login" className="form-footer-link">
              Log in
            </Link>
          </div>
        </RightPanelCard>
      )}

      {step === 2 && (
        <RightPanelCard 
          title="Tell us about your company" 
          icon={<Building2 size={28} className="form-card__icon" />}
        >
          <form onSubmit={handleStep2Submit}>
            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="companyName" className="form-label">Company Name</label>
              </div>
              <input
                type="text"
                id="companyName"
                className="form-input"
                placeholder="Acme Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="industry" className="form-label">Industry (Optional)</label>
              </div>
              <div style={{ position: "relative" }}>
                <select
                  id="industry"
                  className="form-input form-select"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="" disabled hidden>Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="teamSize" className="form-label">Team Size (Optional)</label>
              </div>
              <div style={{ position: "relative" }}>
                <select
                  id="teamSize"
                  className="form-input form-select"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  style={{ paddingRight: "3.5vw" }}
                >
                  <option value="" disabled hidden>Select team size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="50+">50+ employees</option>
                </select>
                <ArrowDown 
                  size={16} 
                  style={{
                    position: "absolute",
                    right: "1.04vw",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#666666"
                  }} 
                />
              </div>
            </div>

            <button type="submit" className="form-submit-btn">
              Continue Dashboard
            </button>
          </form>
        </RightPanelCard>
      )}

      {step === 3 && (
        <RightPanelCard 
          title="Account created successfully" 
          subtitle="You're now the admin of your Nexgn workspace"
          icon={<PartyPopper className="form-card__icon success-icon" />}
        >
          <form onSubmit={handleStep3Submit} style={{ marginTop: "3vw" }}>
            <button type="submit" className="form-submit-btn">
              Go to Dashboard
            </button>
          </form>
        </RightPanelCard>
      )}
    </div>
  );
}
