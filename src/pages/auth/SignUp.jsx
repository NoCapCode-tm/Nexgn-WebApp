import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; 
import { API_URL } from "../../config";

import styles from "./Signup.module.css";
import AuthLayout from "../../components/layout/AuthLayout";
import PasswordStrengthMeter from "../../components/ui/PasswordStrengthMeter";

export default function SignUp() {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2 state
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const navigate = useNavigate();

  const handleStep1Submit = (e) => {
    e.preventDefault();
    toast.success("Step 1 Completed Successfully");
    setStep(2);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}admin/signup`,
        {
          name,
          email,
          password,
          companyname: companyName,
          industry,
          team_size: teamSize,
        },
        { withCredentials: true }
      );
      console.log(response.data.message);
      toast.success("Step 2 Completed Successfully");
      setStep(3);
    } catch (error) {
      console.log("Something went wrong", error.message);
    }
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    localStorage.setItem("theme", "light");
    toast.success("Account Created Successfully");
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className={styles.formWrap} style={{ marginTop: "30px" }}>
        
        {/* ---------------- Step 1: account details ---------------- */}
        {step === 1 && (
          <>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>Create an account</h1>
            </div>
            <p className={styles.subtitle}>Sign up to get started with Nexgn</p>

            <form className={styles.form} onSubmit={handleStep1Submit}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={styles.input}
                  placeholder="Noar Zi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="martin@acme.corp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.passwordWrap}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`${styles.input} ${styles.passwordInput}`}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggleBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <PasswordStrengthMeter password={password} />

              <button type="submit" className={styles.loginButton}>
                Sign Up
              </button>

              <p className={styles.signupText}>
                Have an account?{" "}
                <Link to="/login" className={styles.signupLink}>
                  Log in
                </Link>
              </p>
            </form>
          </>
        )}

        {/* ---------------- Step 2: company details ---------------- */}
        {step === 2 && (
          <>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>Your company</h1>
            </div>
            <p className={styles.subtitle}>Tell us about your company</p>

            <form className={styles.form} onSubmit={handleStep2Submit}>
              <div className={styles.field}>
                <label htmlFor="companyName" className={styles.label}>
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  className={styles.input}
                  placeholder="Acme Corp"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="industry" className={styles.label}>
                  Industry (Optional)
                </label>
                <div className={styles.selectWrap}>
                  <select
                    id="industry"
                    className={`${styles.input} ${styles.select}`}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select industry
                    </option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="teamSize" className={styles.label}>
                  Team Size (Optional)
                </label>
                <div className={styles.selectWrap}>
                  <select
                    id="teamSize"
                    className={`${styles.input} ${styles.select}`}
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select team size
                    </option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="50+">50+ employees</option>
                  </select>
                </div>
              </div>

              <button type="submit" className={styles.loginButton}>
                Continue Dashboard
              </button>
            </form>
          </>
        )}

        {/* ---------------- Step 3: success ---------------- */}   
        {step === 3 && (
          <>
            <div className={styles.titleRow}>
              <h1 
                className={styles.title} 
                style={{ lineHeight: "1.2", marginBottom: "16px" }}
              >
                Locked and loaded.
              </h1>
            </div>
            <p 
              className={styles.subtitle} 
              style={{ lineHeight: "1.5", fontSize: "20px", fontWeight: "400" }}
            >
              Your Nexgn workspace is ready. We just sent a quick verification<br />
              link to your inbox. Give it a click to activate your<br />
              dashboard. See you on the inside.
            </p>

            <div className={styles.form}>
              <button 
                type="button" 
                className={styles.outlineButton}
                onClick={() => navigate("/login")}
              >
                <span className={styles.btnTextBlack}>Back to</span> 
                <span className={styles.btnTextRed}>Login</span>
              </button>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}