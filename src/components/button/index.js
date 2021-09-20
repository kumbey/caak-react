import React from "react";
import Loader from "../loader";

const Button = ({
  skin,
  round,
  circular,
  iconPosition,
  icon,
  loading,
  roundedSquare,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button ${skin ? skin : ""} ${round ? "round" : ""} ${
        circular ? "circular" : ""
      } ${roundedSquare ? "rounded-lg" : ""} ${props.className}`}
      disabled={loading}
    >
      {iconPosition === "left" ? icon : ""}
      {circular || roundedSquare ? icon : ""}
      {loading ? <Loader /> : props.children}
      {iconPosition === "right" ? icon : ""}
    </button>
  );
};
export default Button;
