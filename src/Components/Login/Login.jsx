import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router dan navigate hook
import "./Login.css";
import { FaLock, FaLockOpen } from "react-icons/fa"; // Qulf va ochiq qulf ikonalarini import qilish
import LogoImg from "../img/loginpage/bast logo.png";
import LoginImg1 from "../img/loginpage/login-img.jpg";
import LoginImg2 from "../img/loginpage/login-img2.jpg";
import LoginImg3 from "../img/loginpage/login-img3.jpg";
import LoginImg4 from "../img/loginpage/login-img4.webp";

const Login = () => {
  const images = [LoginImg1, LoginImg2, LoginImg3, LoginImg4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeDot, setActiveDot] = useState(0); // Faollashgan nuqta indeksi
  const [showPassword, setShowPassword] = useState(false); // Parolni ko'rsatish yoki yashirish holati
  const [login, setLogin] = useState(""); // Login holati
  const [password, setPassword] = useState(""); // Parol holati

  const navigate = useNavigate(); // URL-ni o'zgartirish uchun React Router-dan foydalanamiz

  // Avtomatik rasm almashtirish
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setActiveDot((prevIndex) => (prevIndex + 1) % images.length); // Nuqtaning o'zgarishini boshqarish
    }, 3000); // Har 3 soniyada bir rasmni almashtiradi va nuqtani o'zgartiradi

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Formani qayta yuklanishini oldini oladi

    // Login va parolni tekshirish
    if (login === "none" && password === "123") {
      localStorage.setItem("authToken", "true");
      navigate("/sobs"); // To'g'ri bo'lsa, / ga o'tadi
    } else {
      alert("Неверный логин или пароль"); // Xato bo'lsa, xabar ko'rsatadi
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="logo-and-title">
            <img src={LogoImg} alt="Logo" className="logo" />
            <div>
              <h1 className="company-name">S.O.B.S</h1>
              <p className="company-description">
                Service-Oriented Business Solutions
              </p>
            </div>
          </div>
          <h2>Вход</h2>
          <p className="support-text">
            Вышли проблемы? Обращайтесь администратору
          </p>
          <div className="form-group">
            <label htmlFor="phone">Логин</label>
            <input
              type="text"
              id="phone"
              placeholder="Введите ваш логин"
              className="input-field"
              value={login}
              onChange={(e) => setLogin(e.target.value)} // Login holatini boshqarish
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"} // Parolni ko'rsatish yoki yashirish
                id="password"
                placeholder="Введите ваш пароль"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Parol holatini boshqarish
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)} // Parolni ko'rsatish holatini o'zgartirish
              >
                {showPassword ? <FaLockOpen /> : <FaLock />}
              </span>
            </div>
          </div>
          <a href="#" className="forgot-password">
            Забыли пароль?
          </a>
          <button type="submit" className="submit-button">
            Войти
          </button>
        </form>
      </div>
      <div className="image-container">
        <div className="image-slider">
          <img src={images[currentIndex]} alt="Slide" className="image" />
          <div className="dots-container">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === activeDot ? "active" : "inactive"}`}
                onClick={() => {
                  setActiveDot(index); // Nuqtani foydalanuvchi bosinganda faollashtiradi
                  setCurrentIndex(index); // Rasmni o'zgartiradi
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
