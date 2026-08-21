import {  Routes, Route, Navigate } from "react-router-dom";



import Invite from "./login-signup/pages/Invite";
import Login from "./login-signup/pages/Login";
import SignUp from "./login-signup/pages/SignUp";
import ForgotPassword from "./login-signup/pages/ForgotPassword";
import SetNewPassword from "./login-signup/pages/SetNewPassword";

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
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset" element={<SetNewPassword />} />

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
      <Route path="*" element={<Navigate to="/" replace />} /> 
    </Routes>
  );
}
