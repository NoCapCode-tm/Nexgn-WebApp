import React from "react";

export default function PasswordStrengthMeter({ password }) {
  // Calculate strength score (0 to 4)
  const calculateStrength = (pass) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score += 1;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const score = calculateStrength(password);

  // Define colors and labels based on the score
  const getStrengthData = (score) => {
    switch (score) {
      case 0: return { color: "#e4e4e4", label: "Very Weak", width: "0%" };
      case 1: return { color: "#e22a2a", label: "Weak", width: "25%" };
      case 2: return { color: "#f59e0b", label: "Fair", width: "50%" };
      case 3: return { color: "#3b82f6", label: "Good", width: "75%" };
      case 4: return { color: "#10b981", label: "Strong", width: "100%" };
      default: return { color: "#e4e4e4", label: "", width: "0%" };
    }
  };

  const { color, label, width } = getStrengthData(score);

  if (!password) return null; // Don't show anything if input is empty

  return (
    <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
          Password Strength:
        </span>
        <span style={{ fontSize: "12px", color: color, fontWeight: "600" }}>
          {label}
        </span>
      </div>
      
      {/* Progress Bar Background */}
      <div style={{ width: "100%", height: "4px", backgroundColor: "#e4e4e4", borderRadius: "2px", overflow: "hidden" }}>
        {/* Progress Bar Fill */}
        <div 
          style={{ 
            height: "100%", 
            width: width, 
            backgroundColor: color, 
            transition: "all 0.3s ease-in-out" 
          }} 
        />
      </div>
      
      {/* Helper Text */}
      {score < 4 && (
        <p style={{ fontSize: "11px", color: "#8a949f", margin: "4px 0 0 0", lineHeight: "1.3" }}>
          Use 8+ characters with a mix of uppercase, lowercase, numbers, & symbols.
        </p>
      )}
    </div>
  );
}