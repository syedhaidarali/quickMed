/** @format */
import React from "react";

const isAllowedKey = (e, allowDashes = false) => {
  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];
  const isNumber = /^[0-9]$/.test(e.key);
  const isDash = allowDashes && e.key === "-";
  return isNumber || isDash || allowedKeys.includes(e.key);
};

const InputField = ({
  label,
  type = "text",
  name,
  error,
  className = "",
  onlyNumbers = false,
  allowDashes = false,
  checked,
  required = false,
  ...rest
}) => {
  const handleKeyDown = (e) => {
    if (onlyNumbers && !isAllowedKey(e, allowDashes)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className='block text-emerald-700 font-medium mb-1'>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        onKeyDown={handleKeyDown}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-300" : "border-emerald-200"
        } rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
        inputMode={onlyNumbers ? "numeric" : undefined}
        pattern={onlyNumbers ? (allowDashes ? "[0-9-]*" : "[0-9]*") : undefined}
        {...rest}
      />
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
};

export default InputField;
