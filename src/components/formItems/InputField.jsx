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
  checked, // For checkbox type
  ...rest
}) => {
  const handleKeyDown = (e) => {
    if (onlyNumbers && !isAllowedKey(e, allowDashes)) {
      e.preventDefault();
    }
  };

  // Special handling for checkbox type
  if (type === "checkbox") {
    return (
      <div className='flex items-center space-x-2'>
        <input
          id={name}
          name={name}
          type={type}
          checked={checked}
          onChange={onChange}
          required={required}
          className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
          {...rest}
        />
        {label && (
          <label
            className='text-emerald-700 font-medium'
            htmlFor={name}>
            {label}
          </label>
        )}
      </div>
    );
  }

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
