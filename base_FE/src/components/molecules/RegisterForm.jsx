import React from "react";
import InputField from "../atoms/InputField";
import CustomButton from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";

const RegisterForm = ({
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
  <form onSubmit={onSubmit}>
    <InputField
      label="Username"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter your username"
      controlId="formBasicUsername"
    />
    <InputField
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      controlId="formBasicEmail"
    />
    <InputField
      label="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      controlId="formBasicPassword"
    />
    <InputField
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirm your password"
      controlId="formBasicConfirmPassword"
    />
    <ErrorMessage message={error} />
    <CustomButton text="Register" variant="success" type="submit" />
  </form>
);

export default RegisterForm;
