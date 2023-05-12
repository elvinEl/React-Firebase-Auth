import React from "react";
import { useState } from "react";
import { login } from "../firebase";
import { useNavigate, NavLink } from "react-router-dom";
import LoginForm from "../components/LoginForm";
function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e,email,password) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      navigate("/profile", {
        replace: true,
      });
    }
  };
return <LoginForm handleSubmit={handleSubmit}/>
}

export default Login;
