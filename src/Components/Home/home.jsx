import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaBell, FaLock, FaCog, FaUser, FaSignOutAlt, FaUserShield, FaHome, 
  FaChartBar, FaDollarSign, FaShoppingCart, FaBook, FaWarehouse, FaStore, FaClipboardList , FaEye
} from "react-icons/fa";
import "./home.css";
import LockScreen from "../LockScreen/LockScreen";

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const [isLocked, setIsLocked] = useState(localStorage.getItem("isLocked") === "true");
  let timeout;

  const startTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsLocked(true);
      localStorage.setItem("isLocked", "true");
    }, 3000000);
  };

  useEffect(() => {
    startTimer();
    document.addEventListener("mousemove", startTimer);
    document.addEventListener("keydown", startTimer);
    document.addEventListener("touchstart", startTimer);

    return () => {
      document.removeEventListener("mousemove", startTimer);
      document.removeEventListener("keydown", startTimer);
      document.removeEventListener("touchstart", startTimer);
    };
  }, []);

  const handleLock = () => {
    setIsLocked(true);
    localStorage.setItem("isLocked", "true");
  };

  const handleUnlock = () => {
    setIsLocked(false);
    localStorage.setItem("isLocked", "false");
  };

  if (isLocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="container">
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <h2>S.O.B.S</h2>
        <ul>
          {[ 
            { to: "/sobs", icon: <FaHome />, text: "Home" },
            { to: "/sobs/about", icon: <FaChartBar />, text: "Отчеты" },
            { to: "/sobs/finance", icon: <FaDollarSign />, text: "Финансы" },
            { to: "/sobs/purchases", icon: <FaShoppingCart />, text: "Приходы" },
            { to: "/sobs/accounting", icon: <FaBook />, text: "Бухгалтерия" },
            { to: "/sobs/hr", icon: <FaClipboardList />, text: "Структура" },
            { to: "/sobs/warehouses", icon: <FaWarehouse />, text: "Склады" },
            { to: "/sobs/sales", icon: <FaStore />, text: "Продажа" },
            { to: "/sobs/directory", icon: <FaCog />, text: "Справочники" },
          ].map(({ to, icon, text }) => (
            <li key={to} className={location.pathname === to ? "active" : ""}>
              <Link to={to}>{icon} {!isCollapsed && text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
      <div className="header">
  <div className="header-left">
    <button className="back-btn" onClick={() => setIsCollapsed(!isCollapsed)}>←</button>
  </div>

  <div className="header-right">
  <div className="notification">
  <div className="notification-icon">
    <span className="dot"></span>
    <FaBell />
  </div>

  <div className="notification-text">
    <span className="account-text">Вас счет</span>
  </div>

  <div className="notification-balance">
    <FaEye onClick={() => setShowPassword(!showPassword)} />
    <input
      type={showPassword ? "text" : "password"}
      value="1.41 USD"
      readOnly
      className="account-password"
    />
  </div>
</div>


    <button className="new-btn">Новый</button>

    <div onClick={handleLock}>
      <FaLock className="icon cursor" />
    </div>

    {/* Sozlamalar tugmasi */}
    <FaCog className="icon cursor" />

    {/* Profil menyusi */}
    <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
      <FaUser className="icon profile-icon" />
      {showDropdown && (
        <div className="dropdown-menu">
          <div className="profile-header">
            <FaUser className="profile-pic" />
            <p className="profile-name">admin</p>
          </div>
          <ul>
            <li><FaUserShield /> Роль: Admin</li>
            <li><FaUser /> Профиль</li>
            <li><FaSignOutAlt /> Выход</li>
          </ul>
        </div>
      )}
    </div>
  </div>
</div>

        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
