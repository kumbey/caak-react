import React, { useState } from "react";

const Input = ({
  labelStyle,
  hideLabel,
  label,
  className,
  errorMessage,
  id,
  type,
  ...props
}) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={"input relative"}>
      {hideLabel ? null : (
        <label htmlFor={id} className={`${labelStyle}`}>
          {label}
        </label>
      )}
      <input type={showPassword ? "text" : type} {...props} className={`${className} ${errorMessage ? `border border-caak-titaniumwhite`: ``}`} />
      {
        type === "password" ? 
          <span 
            onClick={() => setShowPassword(!showPassword)}
            className="icon-fi-rs-view absolute right-c6 text-caak-darkBlue cursor-pointer" style={{top: "14px"}}
          /> 
          : null
      }
        <p className="error" id="email-error">
          {errorMessage}
        </p>
      
    </div>
  );
};

export default Input;
