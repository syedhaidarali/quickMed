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
  value,
  onChange,
  required = false,
  className = "",
  onlyNumbers = false,
  allowDashes = false, // New prop for CNIC
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
          className='block text-emerald-700 font-medium mb-1'
          htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        required={required}
        className={`w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
        inputMode={onlyNumbers ? "numeric" : undefined}
        pattern={onlyNumbers ? (allowDashes ? "[0-9-]*" : "[0-9]*") : undefined}
        {...rest}
      />
    </div>
  );
};

export default InputField;
