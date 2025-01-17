import React from "react";
import InputField from "../atoms/InputField";
import CustomButton from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  error,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <InputField
      label="Email address"
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
    <ErrorMessage message={error} />
    <CustomButton text="Login" variant="success" type="submit" />
  </form>
);

export default LoginForm;
