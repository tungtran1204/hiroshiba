import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; // Import service

const useRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await authService.register(username, email, password, confirmPassword);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    username,
    email,
    password,
    confirmPassword,
    error,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  };
};

export default useRegister;
