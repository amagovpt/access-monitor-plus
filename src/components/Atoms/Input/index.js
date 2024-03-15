import React from "react";
import Form from "react-bootstrap/Form";

import "./styles.css";

const Input = ({ label, type, placeholder, ...rest }) => {
  return (
    <Form.Group className="field">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={placeholder} {...rest} />
    </Form.Group>
  );
};

export { Input };
