import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config"; 

import styles from "./ForgotPassword.module.css";
import AuthLayout from "../../components/Layout/AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}admin/forgot-password`,
        { email },
        { withCredentials: true }
      );
      console.log(response.data.message);
      toast.success("Reset link sent successfully");
      navigate("/");
    } catch (error) {
      console.log("Something went wrong", error.message);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.subtitle}>Get your password reset link.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="sofia.mart@nexgn.cloud"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Send Reset Link
          </button>

          <p className={styles.signupText}>
            Back to{" "}
            <Link to="/login" className={styles.signupLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}