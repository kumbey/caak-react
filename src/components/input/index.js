
const Input = ({
  labelStyle,
  hideLabel,
  label,
  className,
  errorMessage,
  id,
  containerStyle,
  ...props
}) => {
  return (
    <div className={`input ${containerStyle && containerStyle}`}>
      {hideLabel ? null : (
        <label htmlFor={id} className={`${labelStyle}`}>
          {label}
        </label>
      )}
      <input
        {...props}
        className={`${className} ${
          errorMessage ? `border border-caak-red` : ``
        }`}
      />
      {errorMessage && (
        <p className="error" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
