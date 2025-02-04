import React from "react";
import { Link } from "react-router-dom";
import "./error.css"
const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Упс! Такой страницы не существует.</p>
      <Link to="/login" className="back-link">
        Вернуться на главную страницу
      </Link>
    </div>
  );
};

export default ErrorPage;
