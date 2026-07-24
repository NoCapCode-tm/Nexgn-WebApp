import { Navigate, Routes, Route } from "react-router-dom";

import LandingPage from "./landing_page/LandingPage";
import Login from "./login-signup/pages/Login";
import SignUp from "./login-signup/pages/SignUp";
import Invite from "./login-signup/pages/Invite";

/* ADMIN MODULE */
import Dashboard from "./admin/pages/Dashboard";
import SignYourself from "./admin/pages/SignYourself";
import Documents from "./admin/pages/Documents";
import ContactBook from "./admin/pages/ContactBook";
import Settings from "./admin/pages/Settings";
import TemplatesPage from "./admin/pages/TemplatesPage";

import useSystemTheme from "./login-signup/hooks/useSystemTheme";

export default function App() {
  useSystemTheme();

  return (
    <Routes>
      {/* LANDING PAGE */}
      <Route path="/landing" element={<LandingPage />} />

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mail-invite" element={<Invite />} />

      {/* ADMIN ROUTES */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />
      <Route path="/admin-documents" element={<Documents />} />
      <Route path="/admin-sign-yourself" element={<SignYourself />} />
      <Route path="/admin-request-signature" element={<SignYourself />} />
      <Route path="/admin-settings" element={<Settings />} />
      <Route path="/admin-contact-book" element={<ContactBook />} />
      <Route path="/admin-templates" element={<TemplatesPage />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}