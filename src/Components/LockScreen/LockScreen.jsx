import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Ko'z ikonkalari
import "./LockScreen.css";

const LockScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState("");  // Parolni holatida saqlash
  const [showPassword, setShowPassword] = useState(false);  // Parolni ko'rsatish uchun holat
  const correctPassword = "1234"; // Asl parol (bu joyda serverdan olish kerak)

  const handleUnlock = () => {
    if (password === correctPassword) {
      localStorage.setItem("isLocked", "false"); // Qulflash holatini yechish va saqlash
      onUnlock(); // Qulflashni yechish
    } else {
      alert("Неверный пароль!");
    }
  };

  return (
    <div className="lockscreen-overlay">
      <div className="lockscreen-box">
        <h2>Сайт заблокирован</h2>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}  // Parolni ko'rsatish yoki yashirish
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="lock-password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}  // Ko'z ikonkasini bosganda holatni o'zgartirish
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ko'z iconkalari */}
          </span>
        </div>
        <button onClick={handleUnlock}>Разблокировать</button>
      </div>
      <div className="lockscreen-background"></div>
    </div>
  );
};

export default LockScreen;
