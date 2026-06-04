import { HashRouter, Routes, Route } from "react-router-dom";

// Admin
import Dashboard from "./admin/pages/Dashboard";
import SignYourself from "./admin/components/SignYourself";
import "./admin/css/Dashboard.css";

// Member
import MemberDashboard from "./member/pages/MemberDashboard";
import MemberSignYourself from "./member/components/MemberSignYourself";

export default function App() {
  return (
    <HashRouter>
      <Routes>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-yourself" element={<SignYourself />} />

        {/* ================= MEMBER ROUTES ================= */}
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/member-sign-yourself" element={<MemberSignYourself />} />
        <Route
          path="/member-request-signature"
          element={<MemberSignYourself />}
        />

      </Routes>
    </HashRouter>
  );
}