import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignYourself from "./components/SignYourself";
import CreateSignatureRequest from "./pages/CreateSignatureRequest";
import "./css/Dashboard.css";
import Documents from "./pages/Documents";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-yourself" element={<SignYourself />} />
        <Route path="/create-signature" element={<CreateSignatureRequest />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </HashRouter>
  );
}