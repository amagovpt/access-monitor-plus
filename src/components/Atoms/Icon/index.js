import React from "react";
import "./style.css";
import "./icon.css";

const Icon = ({ name }) => {
  return <i className={`icon-${name}`} aria-hidden="true"></i>;
};

export { Icon };
