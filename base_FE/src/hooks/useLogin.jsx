import { useState } from "react";
import authService from "../services/authService"; // Import service đã tách

const useLogin = (navigate) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(email, password); // Gọi service login
      localStorage.setItem("token", data.token);
      navigate("/profile");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return {
    email,
    password,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;
