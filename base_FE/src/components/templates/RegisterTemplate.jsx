import React from "react";
import RegisterBox from "../organisms/RegisterBox";

const RegisterTemplate = ({
  username,
  email,
  password,
  confirmPassword,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  error,
  onSubmit,
}) => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "100vh", backgroundColor: "#e9ecef" }}
  >
    <RegisterBox
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      error={error}
      onSubmit={onSubmit}
    />
  </div>
);

export default RegisterTemplate;
