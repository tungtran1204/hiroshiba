import React from "react";
import LoginForm from "../molecules/LoginForm";
import { Link } from "react-router-dom";

const LoginBox = ({
  email,
  password,
  setEmail,
  setPassword,
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
    <h3 className="text-center mb-4">Login</h3>
    <LoginForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      onSubmit={onSubmit}
    />
    <div className="text-center mt-3">
      <Link to="/register" className="text-decoration-none">
        Click here to Register
      </Link>
    </div>
  </div>
);

export default LoginBox;
