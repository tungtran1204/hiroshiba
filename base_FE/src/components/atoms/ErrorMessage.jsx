import React from "react";

const ErrorMessage = ({ message }) =>
  message ? <p className="text-danger">{message}</p> : null;

export default ErrorMessage;
