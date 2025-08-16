/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/formItems/InputField";
import { useHospital } from "../context";
import { hospitalLoginSchema } from "../schemas/hospitalLoginSchema";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const { HospitalLogin, loading } = useHospital();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(hospitalLoginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      await HospitalLogin(
        {
          email: data.email,
          password: data.password,
        },
        navigate
      );
      reset();
    } catch (err) {
      setSubmitError("Login failed. Please try again.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='md:min-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          Login as a Hospital
        </h2>

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
            label='Password'
            type='password'
            name='password'
            {...register("password")}
            error={errors.password?.message}
            placeholder='Enter your password'
            autoComplete='current-password'
          />

          {submitError && <p className='text-red-500 text-sm'>{submitError}</p>}

          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200 disabled:opacity-50'>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <span className='text-sm text-emerald-700'>
            Don't have an account?
          </span>
          <Link
            to='/register/hospital'
            className='ml-1 text-emerald-600 hover:underline font-medium'
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
