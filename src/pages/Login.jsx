/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          Sign in to your account
        </h2>
        <form
          className='space-y-6'
          onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-emerald-700'>
              Email address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-emerald-200 placeholder-emerald-300 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-emerald-700'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-emerald-200 placeholder-emerald-300 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            />
          </div>
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200'>
              Sign In
            </button>
          </div>
        </form>
        <div className='mt-6 text-center'>
          <span className='text-sm text-emerald-700'>
            Don't have an account?
          </span>
          <Link
            to='/register'
            className='ml-1 text-emerald-600 hover:underline font-medium'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
