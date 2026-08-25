import {  Routes, Route, Navigate } from "react-router-dom";



import Invite from "./pages/auth/Invite";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetNewPassword from "./pages/auth/SetNewPassword";
import InviteDeny from "./pages/auth/Invite-Deny";

/* ADMIN MODULE */
import Dashboard from "./pages/dashboard/Dashboard";
import SignYourself from "./pages/documents/SignYourself";
import Documents from "./pages/documents/Documents";
import ContactBook from "./pages/contacts/ContactBook";
import Settings from "./pages/settings/Settings";
import TemplatesPage from "./pages/templates/TemplatesPage";

import useSystemTheme from "./hooks/useSystemTheme";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import TemplateView from "./pages/templates/Templateview";
import SignDocument from "./pages/documents/SignDocument";
import { ToastContainer } from "react-toastify";

export default function App() {
  useSystemTheme();

  return (
    <>
    <Routes>
      <Route path="/mail-invite/:email" element={<Invite />} />
      <Route path="/" element={<Login />} />
      <Route path="/verify/:id" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/invite-deny" element={<InviteDeny />} />
      <Route path="/reset/:id" element={<SetNewPassword />} />

      {/* ADMIN ROUTES */}
      
      <Route element={<ProtectedRoute />}>
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


    <ToastContainer
            position="top-left" 
            autoClose={2500}
            hideProgressBar={true}       /* Removes the colored bar at the bottom */
            closeButton={false}          /* Removes the 'X' icon */
            theme="light"
            pauseOnHover={false}
            limit={3}                    /* Prevents screen clutter */
          />
    </>
  );
}
