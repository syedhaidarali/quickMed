/** @format */

import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "../components/formItems/InputField";
import { useAuth, useDoctor, useHospital } from "../context";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "auth";

  const { ChangePassword: authChangePassword, loading: authLoading } =
    useAuth();
  const { DoctorChangePassword, loading: doctorLoading } = useDoctor();
  const { HospitalChangePassword, loading: hospitalLoading } = useHospital();

  // Use only the relevant context based on user type
  const getContextData = () => {
    switch (userType) {
      case "doctor":
        return {
          changePassword: DoctorChangePassword,
          loading: doctorLoading,
          title: "Doctor Change Password",
          profileRoute: "/doctor/profile",
        };
      case "hospital":
        return {
          changePassword: HospitalChangePassword,
          loading: hospitalLoading,
          title: "Hospital Change Password",
          profileRoute: "/hospital/profile",
        };
      default:
        return {
          changePassword: authChangePassword,
          loading: authLoading,
          title: "Change Password",
          profileRoute: "/profile",
        };
    }
  };

  const { changePassword, loading, title, profileRoute } = getContextData();
  const [submitError, setSubmitError] = useState("");

  const schema = z
    .object({
      currentPassword: z.string().min(1, "Current password is required"),
      newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
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

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      const changeData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      await changePassword(changeData, () => navigate(profileRoute));
    } catch (error) {
      setSubmitError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='md:min-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          {title}
        </h2>
        <p className='mb-6 text-center text-gray-600'>
          Enter your current password and choose a new password.
        </p>

        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label='Current Password'
            type='password'
            name='currentPassword'
            {...register("currentPassword")}
            error={errors.currentPassword?.message}
            placeholder='Enter your current password'
            autoComplete='current-password'
          />

          <InputField
            label='New Password'
            type='password'
            name='newPassword'
            {...register("newPassword")}
            error={errors.newPassword?.message}
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

          {submitError && (
            <p className='text-red-500 text-sm text-center'>{submitError}</p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200 disabled:opacity-50'>
            {loading ? "Changing Password..." : "Change Password"}
          </button>

          <div className='text-center'>
            <Link
              to={profileRoute}
              className='text-emerald-600 hover:text-emerald-700 text-sm'>
              Back to Profile
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
