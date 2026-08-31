import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { PartyPopper, Eye, EyeOff } from "lucide-react"; 
import styles from "./LoginPage.module.css";
import AuthLayout from "../../components/Layout/AuthLayout";
import PasswordStrengthMeter from "../../components/ui/PasswordStrengthMeter";
import LoadingScreen from "../../components/Layout/LoadingScreen";

export default function Invite() {
  const { email } = useParams();
    const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        `${API_URL}admin/setpassword`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log("Something Went Wrong in setting password", error.message);
    } finally {
      setLoading(false)
      setStep(2);
    }
  };

  const handleGoToDashboard = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className={styles.formWrap}>
        {step === 1 ? (
          <>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>You've been invited</h1>
            </div>
            <p className={styles.subtitle}>Set a password to join Workspace</p>

            <form className={styles.form} onSubmit={handleJoin}>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email (non-editable)
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  style={{ cursor: "not-allowed", background: "#f5f5f5" }}
                  value={email}
                  readOnly
                />
              </div>

              <div className={styles.field}>
                <div className={styles.labelRow}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                </div>
                <div className={styles.passwordWrap}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`${styles.input} ${styles.passwordInput}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggleBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <PasswordStrengthMeter password={password} />

              <button type="submit" className={styles.loginButton}>
                Join Workspace
              </button>
            </form>
          </>
        ) : (
          <>
            <div className={styles.titleRow}>
              <PartyPopper size={28} className={styles.successIcon} />
              <h1 className={styles.title}>You've joined the workspace</h1>
            </div>
            <p className={styles.subtitle}>
              You have access to documents assigned to you
            </p>

            <form className={styles.form} onSubmit={handleGoToDashboard}>
              <button type="submit" className={styles.loginButton}>
                Go to Dashboard
              </button>
            </form>
          </>
        )}
      </div>
      {loading && (
            <LoadingScreen
              state="working"
              size={64}
              theme="dark"
              message="Rolling out the red carpet"
            />
          )}
    </AuthLayout>
  );
}