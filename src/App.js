import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/home.jsx";
import About from "./Components/About/About.jsx";
import ErrorPage from "./Components/Error/error.jsx";
import LoginPage from "./Components/Login/Login.jsx";
import "./App.css";
import Sobs from "./Components/sobs/sobs.jsx";
import Hr from "./Components/Hr/hr.jsx";

export default function App() {
  const isAuthenticated = localStorage.getItem("authToken"); // Tokenni tekshirish

  return (
    <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/sobs" element={<Home />}>
      <Route index element={<Sobs />} />
      <Route path="/sobs/about" element={<About />} />
      <Route path="/sobs/hr" element={<Hr />} />
    </Route>

    {/* Agar noto'g'ri URL kiritsangiz, bu error sahifasiga yo'naltiradi */}
    <Route path="*" element={<ErrorPage />} />
  </Routes>
  );
}
