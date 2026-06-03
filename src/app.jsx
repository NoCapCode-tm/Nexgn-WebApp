import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./css/Dashboard.css";
import SignYourself from './components/SignYourself';
import MemberDashboard from "./pages/MemberDashboard";
import MemberSignYourself from "./components/MemberSignYourself";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-yourself" element={<SignYourself />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/member-sign-yourself" element={<MemberSignYourself />} />
        <Route path="/member-request-signature" element={<MemberSignYourself />} />
      </Routes>
    </HashRouter>
  );
}