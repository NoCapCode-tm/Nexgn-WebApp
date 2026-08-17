import { Navigate, Routes, Route } from "react-router-dom";



import Invite from "./login-signup/pages/Invite";
import Login from "./login-signup/pages/Login";
import SignUp from "./login-signup/pages/SignUp";

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
import SignDocument from "./admin/pages/SignDocument";

export default function App() {
  useSystemTheme();

  return (
    <Routes>
      <Route path="/mail-invite/:email" element={<Invite />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ADMIN ROUTES */}
      
      <Route element={<ProtectedRoute />}>
    <Route path="/admin" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/documents" element={<Documents />} />
    <Route path="/sign-yourself" element={<SignYourself />} />
    <Route path="/request-signature" element={<SignYourself />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/contact-book" element={<ContactBook />} />
    <Route path="/templates" element={<TemplatesPage />} />
    <Route path="/templates-view" element={<TemplateView/>} />
    
  </Route>
  <Route path="/document/:id" element={<SignDocument/>} />
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
