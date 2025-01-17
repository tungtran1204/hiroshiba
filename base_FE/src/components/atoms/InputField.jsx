import React from "react";
import { Form } from "react-bootstrap";

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  controlId,
}) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </Form.Group>
);

export default InputField;
