/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/formItems/InputField";
import { useAdmin } from "../context/AdminContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLogin = () => {
  const { login, loading, error } = useAdmin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await login(data, navigate);
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='md:min-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <div className='text-center mb-6'>
          <div className='text-4xl mb-2'>👨‍💼</div>
          <h1 className='text-3xl font-bold text-emerald-800'>Admin Login</h1>
          <p className='text-emerald-600'>Access the admin dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'>
          <InputField
            label='Email'
            name='email'
            type='email'
            {...register("email")}
            error={errors.email?.message}
            autoComplete='email'
            required
          />

          <InputField
            label='Password'
            name='password'
            type='password'
            {...register("password")}
            error={errors.password?.message}
            autoComplete='current-password'
            required
          />
          {/* 
          {error.session && (
            <div className='bg-red-100 text-red-600 p-2 rounded text-sm'>
              {error.session}
            </div>
          )} */}

          <button
            type='submit'
            className='w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50'
            disabled={loading.login}>
            {loading.login ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
