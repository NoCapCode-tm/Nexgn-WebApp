import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Verify2FA.module.css";
import AuthLayout from "../../components/Layout/AuthLayout";

export default function Verify2FA() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newCode = [...code];
    // Take only the last character in case of multiple inputs (like autofill)
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    // Move to next input if current one is filled
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.some((char) => isNaN(char))) return;

    const newCode = [...code];
    pastedData.forEach((char, index) => {
      newCode[index] = char;
    });
    setCode(newCode);

    // Focus on the last filled input or the next empty one
    const focusIndex = pastedData.length < 6 ? pastedData.length : 5;
    inputRefs.current[focusIndex].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCode = code.join("");
    console.log("Submitting 2FA Code:", finalCode);
    
    // Add your verification API logic here
    // ...
  };

  return (
    <AuthLayout>
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Verify Authenticator</h1>
        <p className={styles.subtitle}>
          Enter 6-digit code shown in your authenticator app
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          
          {/* OTP Input Group with Corner Brackets */}
          <div className={styles.otpOuterWrapper}>
            <div className={styles.cornerTopLeft}></div>
            <div className={styles.cornerTopRight}></div>
            <div className={styles.cornerBottomLeft}></div>
            <div className={styles.cornerBottomRight}></div>
            
            <div className={styles.otpContainer} onPaste={handlePaste}>
              {code.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className={styles.otpInput}
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <button type="submit" className={styles.loginButton}>
            Authenticate
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}