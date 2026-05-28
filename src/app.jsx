import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./css/Dashboard.css";

export default function App() {
  return (
    <HashRouter>
      <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
    </HashRouter>
  );
}