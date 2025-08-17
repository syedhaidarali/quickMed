/** @format */

import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "../components/formItems/InputField";
import { useAuth, useDoctor, useHospital } from "../context";
import OTPInput from "../components/formItems/OTPInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "auth";

  const { ResetPassword: authResetPassword, loading: authLoading } = useAuth();
  const { DoctorResetPassword, loading: doctorLoading } = useDoctor();
  const { HospitalResetPassword, loading: hospitalLoading } = useHospital();

  // Use only the relevant context based on user type
  const getContextData = () => {
    switch (userType) {
      case "doctor":
        return {
          resetPassword: DoctorResetPassword,
          loading: doctorLoading,
          title: "Doctor Reset Password",
          forgotRoute: "/forgot-password?type=doctor",
          loginRoute: "/doctor/login",
        };
      case "hospital":
        return {
          resetPassword: HospitalResetPassword,
          loading: hospitalLoading,
          title: "Hospital Reset Password",
          forgotRoute: "/forgot-password?type=hospital",
          loginRoute: "/hospital/login",
        };
      default:
        return {
          resetPassword: authResetPassword,
          loading: authLoading,
          title: "Reset Password",
          forgotRoute: "/forgot-password",
          loginRoute: "/login",
        };
    }
  };

  const { resetPassword, loading, title, forgotRoute, loginRoute } =
    getContextData();
  const [submitError, setSubmitError] = useState("");
  const [otp, setOtp] = useState("");

  const schema = z
    .object({
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    if (!otp || otp.length !== 6) {
      setSubmitError("Please enter a valid 6-digit OTP");
      return;
    }

    setSubmitError("");
    try {
      const resetData = {
        email: data.email,
        forgotPasswordCode: otp,
        newPassword: data.password,
      };
      await resetPassword(resetData, () => navigate(loginRoute));
    } catch (error) {
      setSubmitError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='md:min-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          {title}
        </h2>
        <p className='mb-6 text-center text-gray-600'>
          Enter your new password and the OTP sent to your email.
        </p>

        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label='Email Address'
            type='email'
            name='email'
            {...register("email")}
            error={errors.email?.message}
            placeholder='Enter your email'
            autoComplete='username'
          />

          <InputField
            label='New Password'
            type='password'
            name='password'
            {...register("password")}
            error={errors.password?.message}
            placeholder='Enter your new password'
            autoComplete='new-password'
          />

          <InputField
            label='Confirm New Password'
            type='password'
            name='confirmPassword'
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder='Confirm your new password'
            autoComplete='new-password'
          />

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              OTP Code
            </label>
            <OTPInput
              value={otp}
              onChange={setOtp}
              error={submitError && !otp ? "OTP is required" : ""}
              placeholder='Enter the 6-digit OTP sent to your email'
            />
          </div>

          {submitError && (
            <p className='text-red-500 text-sm text-center'>{submitError}</p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200 disabled:opacity-50'>
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>

          <div className='text-center'>
            <Link
              to={forgotRoute}
              className='text-emerald-600 hover:text-emerald-700 text-sm'>
              Back to Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
