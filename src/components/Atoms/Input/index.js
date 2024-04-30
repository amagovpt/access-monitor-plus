import React from "react";
import Form from "react-bootstrap/Form";

import "./styles.css";

import classNames from "classnames";

const Input = ({ upload, label, type, placeholder, error, id, ...rest }) => {
  const inputClass = classNames("form-control", {
    "is-invalid": error,
  });
  return (
    <Form.Group className={upload ? "fieldUpload" : "field"}>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        className={inputClass}
        id={id}
        {...rest}
      />

      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export { Input };
