import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = ({ text, variant, onClick, type = "button" }) => (
  <Button variant={variant} onClick={onClick} type={type} className="w-100">
    {text}
  </Button>
);

export default CustomButton;
