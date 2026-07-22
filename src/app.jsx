import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./landing_page/LandingPage";

/* ADMIN MODULE (formerly Member) */
import Dashboard from "./admin/pages/Dashboard";
import SignYourself from "./admin/pages/SignYourself";
import Documents from "./admin/pages/Documents";
import ContactBook from "./admin/pages/ContactBook";
import Settings from "./admin/pages/Settings";
import TemplatesPage from "./admin/pages/TemplatesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING PAGE */}
        <Route path="/landing" element={<LandingPage />} />

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

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
