import React from "react";
import Loader from "../loader";

const Button = ({
  skin,
  round,
  circular,
  iconPosition,
  icon,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button ${skin ? skin : ""} ${round ? "round" : ""} ${
        circular ? "circular" : ""
      } ${props.className}`}
      disabled={loading}
    >
      {iconPosition === "left" ? icon : ""}
      {circular ? icon : ""}
      {loading ? <Loader /> : props.children}
      {iconPosition === "right" ? icon : ""}
    </button>
  );
};
export default Button;
