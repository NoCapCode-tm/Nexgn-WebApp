import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ADMIN MODULE */
import Dashboard from "./admin/pages/Dashboard";
import SignYourself from "./admin/pages/SignYourself";
import Documents from "./admin/pages/Documents";
import ContactBook from "./admin/pages/ContactBook";


/* MEMBER MODULE */
import MemberDashboard from "./member/pages/MemberDashboard";
import MemberSignYourself from "./member/pages/MemberSignYourself";
import MemberDocuments from "./member/pages/MemberDocuments";
import MemberContactBook from "./member/pages/MemberContactBook";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* ADMIN ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/contact-book" element={<ContactBook />} />
        <Route path="/sign-yourself" element={<SignYourself />} />
        <Route path="/request-signature" element={<SignYourself />} />

        {/* MEMBER ROUTES */}
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/member-documents" element={<MemberDocuments />} />
        <Route path="/member-sign-yourself" element={<MemberSignYourself />} />
        <Route
          path="/member-request-signature"
          element={<MemberSignYourself />}
        />
        <Route path="/member-contact-book" element={<MemberContactBook />} />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}