/** @format */
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui";

const OTPInput = ({
  value,
  onChange,
  maxLength = 6,
  disabled = false,
  error,
  placeholder = "Enter your one-time password",
}) => {
  const [otpValue, setOtpValue] = useState(value || "");

  const handleChange = (newValue) => {
    setOtpValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className='space-y-2'>
      <InputOTP
        maxLength={maxLength}
        value={otpValue}
        onChange={handleChange}
        disabled={disabled}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
      <div className='text-center text-sm text-gray-600'>
        {otpValue === "" ? <>{placeholder}</> : <>You entered: {otpValue}</>}
      </div>
    </div>
  );
};

export default OTPInput;
