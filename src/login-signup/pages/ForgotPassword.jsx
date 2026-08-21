import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/ForgotPassword.module.css";
import axios from "axios";
import { API_URL } from "../../../config"; // Adjust the path as per your folder structure

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}admin/forgot-password`, // Adjust endpoint as needed
        { email },
        { withCredentials: true }
      );
      console.log(response.data.message);
      // Optional: Add a success state or toast notification here
    } catch (error) {
      console.log("Something went wrong", error.message);
    }
  };

  return (
    <div className={styles.page}>
      {/* ---------------- Left panel ---------------- */}
      <div className={styles.leftPanel}>
        <div className={styles.logo}>
          <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41 0C46.5228 0 51 4.47715 51 10V41C51 41.7841 50.906 42.5462 50.7354 43.2783L39.0234 31.8213C37.0495 29.8907 33.8666 29.908 31.9141 31.8604L30.5977 33.1777C28.6453 35.1302 28.6622 38.278 30.6357 40.209L41.6436 50.9766C41.4307 50.9901 41.2163 51 41 51H10C9.49485 51 8.99869 50.961 8.51367 50.8887L40.1865 19.9062C42.1604 17.9754 42.1777 14.8277 40.2256 12.875L38.9092 11.5576C36.9566 9.60506 33.7728 9.58757 31.7988 11.5186L0.113281 42.5127C0.0384312 42.0194 8.24792e-09 41.5142 0 41V10C0 9.76522 0.0104491 9.53249 0.0263672 9.30176L11.9219 20.9385C13.8959 22.8689 17.0788 22.8517 19.0312 20.8994L20.3477 19.583C22.3001 17.6306 22.283 14.4818 20.3096 12.5508L7.74316 0.257812C8.46859 0.0904411 9.22373 1.24512e-08 10 0H41Z" fill="#FF0915"/>
          </svg>
        </div>

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
                placeholder="noar@nexgn.cloud"
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

        <div className={styles.faceGraphic}>
          <img src="./Intersect.png" alt="Nexgn Graphic" />
        </div>

        <p className={styles.tagline}>Smart Signing</p>

        <div className={styles.wordmarkSlot} aria-hidden="true">
          <span className={styles.wordmarkRed}>Nexgn</span>
        </div>
      </div>

      {/* ---------------- Right panel ---------------- */}
      <div className={styles.rightPanel}>
        <div className={styles.wordmarkSlot} aria-hidden="true">
          <span className={styles.wordmarkWhite}>Nexgn</span>
        </div>
      </div>
    </div>
  );
}