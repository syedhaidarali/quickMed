/** @format */

import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "../components/formItems/InputField";
import { useAuth, useDoctor, useHospital } from "../context";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "auth";

  const { ForgotPassword: authForgotPassword, loading: authLoading } =
    useAuth();
  const { DoctorForgotPassword, loading: doctorLoading } = useDoctor();
  const { HospitalForgotPassword, loading: hospitalLoading } = useHospital();

  // Use only the relevant context based on user type
  const getContextData = () => {
    switch (userType) {
      case "doctor":
        return {
          forgotPassword: DoctorForgotPassword,
          loading: doctorLoading,
          title: "Doctor Forgot Password",
          resetRoute: "/reset-password?type=doctor",
          loginRoute: "/doctor/login",
        };
      case "hospital":
        return {
          forgotPassword: HospitalForgotPassword,
          loading: hospitalLoading,
          title: "Hospital Forgot Password",
          resetRoute: "/reset-password?type=hospital",
          loginRoute: "/hospital/login",
        };
      default:
        return {
          forgotPassword: authForgotPassword,
          loading: authLoading,
          title: "Forgot Password",
          resetRoute: "/reset-password",
          loginRoute: "/login",
        };
    }
  };

  const { forgotPassword, loading, title, resetRoute, loginRoute } =
    getContextData();
  const [submitError, setSubmitError] = useState("");

  const schema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      await forgotPassword(data, () => navigate(resetRoute));
    } catch (error) {
      setSubmitError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='md:min-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          {title}
        </h2>
        <p className='mb-6 text-center text-gray-600'>
          Enter your email address and we'll send you a link to reset your
          password.
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

          {submitError && (
            <p className='text-red-500 text-sm text-center'>{submitError}</p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200 disabled:opacity-50'>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <div className='text-center'>
            <Link
              to={loginRoute}
              className='text-emerald-600 hover:text-emerald-700 text-sm'>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
