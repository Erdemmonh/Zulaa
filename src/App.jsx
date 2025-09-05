import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home.jsx";
import Main from "./pages/main.jsx";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* show Home at both / and /home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
