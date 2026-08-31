import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config"; 
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; 

import styles from "./SetNewPassword.module.css";
import AuthLayout from "../../components/Layout/AuthLayout";
import PasswordStrengthMeter from "../../components/ui/PasswordStrengthMeter";
import LoadingScreen from "../../components/Layout/LoadingScreen";

export default function SetNewPassword() {
  const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}admin/resetpassword`, 
        { id, password },
        { withCredentials: true }
      );
      console.log(response.data.message);
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (error) {
      console.log("Something went wrong", error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Set New Password</h1>
        <p className={styles.subtitle}>Create a new secure password.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              New Password
            </label>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`${styles.input} ${styles.passwordInput}`}
                placeholder="Enter new password"
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

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.passwordWrap}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`${styles.input} ${styles.passwordInput}`}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className={styles.passwordToggleBtn}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <PasswordStrengthMeter password={password} />

          <button type="submit" className={styles.loginButton}>
            Update Password
          </button>

          <p className={styles.signupText}>
            Back to{" "}
            <Link to="/login" className={styles.signupLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
      {loading && <LoadingScreen state="working" size={64} theme="dark" message="Forging your new keys" />}
    </AuthLayout>
  );
}