import React from "react";
import PropTypes from "prop-types";
import { Button as ButtonComponent, Spinner } from "react-bootstrap";

import "./styles/index.css";

const buttonVariant = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  CANCEL: "cancel",
  GHOST: "ghost",
  SUCCESS: "success",
  DANGER: "danger",
};

const buttonSize = {
  LG: "lg",
  MD: "md",
  SM: "sm",
};

const Button = ({
  loading,
  loadingText,
  text,
  children,
  radius,
  SpinnerProps,
  iconLeft,
  iconRight,
  ...props
}) => {
  const isLoading = loading && loadingText;

  return (
    <ButtonComponent
      {...props}
      className={
        radius === "full"
          ? "rounded-pill"
          : radius === "md"
            ? "rounded"
            : radius === "none"
              ? "rounded-0"
              : "rounded-0"`${props.variant}`
      }
    >
      {!isLoading && iconLeft && <>{iconLeft}</>}

      {isLoading ? (
        <span className="btn-loading-container">
          <Spinner {...SpinnerProps} />
          <span className="btn-loading-text">{loadingText}</span>
        </span>
      ) : (
        <>{text}</>
      )}

      {!isLoading && iconRight && <>{iconRight}</>}
    </ButtonComponent>
  );
};

Button.defaultProps = {
  children: "",
  variant: "primary",
  text: "Click here",
  size: "md",
  active: false,
  disabled: false,
  onClick: undefined,
  loading: false,
  loadingText: "Loading",
  SpinnerProps: {
    size: "sm",
    animation: "border",
  },
  radius: "full",
  iconLeft: null,
  iconRight: null,
};

Button.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.oneOf(Object.values(buttonVariant)),
  text: PropTypes.string,
  active: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(buttonSize)),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  SpinnerProps: PropTypes.instanceOf(Object),
  radius: PropTypes.oneOf(["full", "md", "none"]),
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
};

export default Button;
export { Button, buttonVariant, buttonSize };
