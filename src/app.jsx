import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ADMIN MODULE */
import Dashboard from "./admin/pages/Dashboard";
import SignYourself from "./admin/pages/SignYourself";
import Documents from "./admin/pages/Documents";
import ContactBook from "./admin/pages/ContactBook";
import Settings from "./admin/pages/Settings";


/* MEMBER MODULE */
import MemberDashboard from "./member/pages/MemberDashboard";
import MemberSignYourself from "./member/pages/MemberSignYourself";
import MemberDocuments from "./member/pages/MemberDocuments";
import MemberContactBook from "./member/pages/MemberContactBook";
import MemberSettings from "./member/pages/MemberSettings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN ROUTES */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin-documents" element={<Documents />} />
        <Route path="/admin-contact-book" element={<ContactBook />} />
        <Route path="/admin-sign-yourself" element={<SignYourself />} />
        <Route path="/admin-request-signature" element={<SignYourself />} />
        <Route path="/settings" element={<Settings />} />

        {/* MEMBER ROUTES */}
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/member-documents" element={<MemberDocuments />} />
        <Route path="/member-sign-yourself" element={<MemberSignYourself />} />
        <Route path="/member-request-signature" element={<MemberSignYourself />} />
        <Route path="/member-settings" element={<MemberSettings />} />
        <Route path="/member-contact-book" element={<MemberContactBook />} />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}