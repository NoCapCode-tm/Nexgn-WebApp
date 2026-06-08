// App.jsx

import { HashRouter, Routes, Route } from "react-router-dom";

/* =========================
   ADMIN MODULE
========================= */
import Dashboard from "./admin/pages/Dashboard";
import SignYourself from "./admin/components/SignYourself";

/* =========================
   MEMBER MODULE
========================= */
import MemberDashboard from "./member/pages/MemberDashboard";
import MemberSignYourself from "./member/components/MemberSignYourself";



export default function App() {
  return (
    <HashRouter>
      <Routes>

        {/* Change this to Dashboard if needed */}
        <Route path="/" element={<Dashboard />} />

        {/* =====================================
            ADMIN ROUTES
        ===================================== */}

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/sign-yourself"
          element={<SignYourself />}
        />

        {/* =====================================
            MEMBER ROUTES
        ===================================== */}

        <Route
          path="/member-dashboard"
          element={<MemberDashboard />}
        />

        <Route
          path="/member-sign-yourself"
          element={<MemberSignYourself />}
        />

        <Route
          path="/member-request-signature"
          element={<MemberSignYourself />}
        />

        {/* =====================================
            FALLBACK ROUTE
        ===================================== */}

        {/* Optional */}
        <Route path="*" element={<Dashboard />} />

      </Routes>
    </HashRouter>
  );
}