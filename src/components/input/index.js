import React from "react";

const Input = ({
  labelStyle,
  hideLabel,
  label,
  className,
  errorMessage,
  error,
  ...props
}) => {
  return (
    <div className={"input"}>
      {hideLabel ? null : (
        <label htmlFor={props.id} className={`${labelStyle}`}>
          {label}
        </label>
      )}
      <input {...props} className={`${className} ${error ? "error" : ""}`} />
      {error && (
        <p className="error" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
