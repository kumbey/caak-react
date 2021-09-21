import React from "react";

const Input = ({
  labelStyle,
  hideLabel,
  label,
  className,
  errorMessage,
  id,
  ...props
}) => {
  return (
    <div className={"input"}>
      {hideLabel ? null : (
        <label htmlFor={id} className={`${labelStyle}`}>
          {label}
        </label>
      )}
      <input {...props} className={`${className} ${errorMessage ? `border border-caak-titaniumwhite`: ``}`} />
       
        <p className="error" id="email-error">
          {errorMessage}
        </p>
      
    </div>
  );
};

export default Input;
