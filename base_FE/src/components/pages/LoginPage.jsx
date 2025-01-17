import React from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "@hooks/useLogin";

import LoginTemplate from "../templates/LoginTemplate";

const LoginPage = () => {
  const navigate = useNavigate();
  const { email, password, error, setEmail, setPassword, handleSubmit } =
    useLogin(navigate);

  return (
    <LoginTemplate
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
