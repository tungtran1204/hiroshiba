import React from "react";
import RegisterForm from "../molecules/RegisterForm";
import { Link } from "react-router-dom";

const RegisterBox = ({
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
    className="p-4 shadow rounded"
    style={{
      backgroundColor: "#f8f9fa",
      width: "400px",
      margin: "auto",
    }}
  >
    <h3 className="text-center mb-4">Register</h3>
    <RegisterForm
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
    <div className="text-center mt-3">
      Already have an account?
      <Link to="/login" className="text-decoration-none p-1">
        Login here
      </Link>
    </div>
  </div>
);

export default RegisterBox;
