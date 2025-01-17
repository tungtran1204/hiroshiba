import React from "react";
import RegisterTemplate from "../templates/RegisterTemplate";
import useRegister from "@hooks/useRegister"; // Import custom hook

const RegisterPage = () => {
  const {
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
  } = useRegister();

  return (
    <RegisterTemplate
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      error={error}
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default RegisterPage;
