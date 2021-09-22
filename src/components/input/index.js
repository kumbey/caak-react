import React, { useState } from "react";

const Input = ({
  labelStyle,
  hideLabel,
  label,
  className,
  errorMessage,
  hideError,
  id,
  type,
  containerStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`input relative ${containerStyle}`}>
      {hideLabel ? null : (
        <label htmlFor={id} className={`${labelStyle}`}>
          {label}
        </label>
      )}
      <input
        type={showPassword ? "text" : type}
        {...props}
        className={`${className} ${
          errorMessage ? `border border-caak-red` : ``
        }`}
      />
      {type === "password" ? (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="icon-fi-rs-view right-c6 text-caak-darkBlue absolute cursor-pointer"
          style={{ top: "14px" }}
        />
      ) : null}
      {!hideError && (
        <p className="error" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
