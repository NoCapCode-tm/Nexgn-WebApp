import { HashRouter, Routes, Route } from "react-router-dom";

/* ADMIN MODULE */
import Dashboard from "./admin/pages/Dashboard";
import SignYourself from "./admin/components/SignYourself";
import CreateSignatureRequest from "./admin/pages/CreateSignatureRequest";
import Documents from "./admin/pages/Documents";
import "./admin/css/Dashboard.css";

/* MEMBER MODULE */
import MemberDashboard from "./member/pages/MemberDashboard";
import MemberSignYourself from "./member/components/MemberSignYourself";
import MemberDocuments from "./member/pages/MemberDocuments";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* ADMIN ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-yourself" element={<SignYourself />} />
        <Route path="/create-signature" element={<CreateSignatureRequest />} />
        <Route path="/documents" element={<Documents />} />

        {/* MEMBER ROUTES */}
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/member-documents" element={<MemberDocuments />} />
        <Route path="/member-sign-yourself" element={<MemberSignYourself />} />
        <Route
          path="/member-request-signature"
          element={<MemberSignYourself />}
        />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}