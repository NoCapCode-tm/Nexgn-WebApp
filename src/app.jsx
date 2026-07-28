import { Navigate, Routes, Route } from "react-router-dom";

import LandingPage from "./landing_page/LandingPage";
import Login from "./login-signup/pages/Login";

/* COMPANY */
import AboutUs from "./Company/AboutUs";
import Blog from "./Company/Blog";
import ContactUs from "./Company/ContactUs";

/* LEGAL & TRUST */
import PrivacyPolicy from "./Legal & Trust/PrivacyPolicy";
import Security from "./Legal & Trust/Security";
import TermsServices from "./Legal & Trust/TermsServices";

/* RESOURCES */
import HelpCenter from "./Resources/HelpCenter";
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
import ProtectedRoute from "./ProtectedRoute";
import TemplateView from "./admin/pages/Templateview";

export default function App() {
  useSystemTheme();

  return (
    <Routes>
      {/* LANDING PAGE */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* COMPANY */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<ContactUs />} />

      {/* LEGAL & TRUST */}
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/security" element={<Security />} />
      <Route path="/term" element={<TermsServices />} />

      {/* RESOURCES */}
      <Route path="/help" element={<HelpCenter />} />

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mail-invite/:email" element={<Invite />} />

      {/* ADMIN ROUTES */}
      
      <Route element={<ProtectedRoute />}>
    <Route path="/admin" element={<Dashboard />} />
    <Route path="/admin-dashboard" element={<Dashboard />} />
    <Route path="/admin-documents" element={<Documents />} />
    <Route path="/admin-sign-yourself" element={<SignYourself />} />
    <Route path="/admin-request-signature" element={<SignYourself />} />
    <Route path="/admin-settings" element={<Settings />} />
    <Route path="/admin-contact-book" element={<ContactBook />} />
    <Route path="/admin-templates" element={<TemplatesPage />} />
    <Route path="/admin-templates-view" element={<TemplateView/>} />
  </Route>
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
