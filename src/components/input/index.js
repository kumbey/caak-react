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
      <div className={"relative"}>
        {type === "password" ? (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="right-2 top-1/2 icon-fi-rs-view text-caak-darkBlue absolute transform -translate-y-1/2 cursor-pointer"
          />
        ) : null}
        <input
          type={showPassword ? "text" : type}
          {...props}
          className={`${className} ${
            errorMessage ? `border border-caak-red` : ``
          }`}
        />
      </div>

      {!hideError && (
        <p className="w-80 text-13px error text-left" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
