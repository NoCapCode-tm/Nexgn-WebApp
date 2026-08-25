import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Consolidated router imports
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; 
import { API_URL } from "../../config";

import styles from "./LoginPage.module.css";
import AuthLayout from "../../components/layout/AuthLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}admin/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data.message);
      navigate("/dashboard");
      toast.success("Login Successful");
    } catch (error) {
      console.log("Something went wrong", error.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (!id) return;
      
      try {
        const response = await axios.post(
          `${API_URL}admin/verify`,
          { status: "Active", id: id },
          { withCredentials: true }
        );
        console.log(response.data.message);
        toast.success("Your Account is Activated");
      } catch (error) {
        console.log("Verification failed", error.message);
      }
    })();
  }, [id]);

  return (
    <AuthLayout>
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Log in to continue to Nexgn</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="martin@acme.corp"
            />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <a href="/forgot" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
            
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`${styles.input} ${styles.passwordInput}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
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

          <button type="submit" className={styles.loginButton}>
            Login
          </button>

          <p className={styles.signupText}>
            Don&apos;t have an account?{" "}
            <a href="/signup" className={styles.signupLink}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}