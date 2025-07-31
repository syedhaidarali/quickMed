/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { formatCNIC } from "../helpers/CNICFormat";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const initialState = {};
  const [form, setForm] = useState(initialState);

  const handleCnicChange = (e) => {
    const formattedCNIC = formatCNIC(e.target.value);
    setForm((prev) => ({ ...prev, cnic: formattedCNIC }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          Create your account
        </h2>
        <form
          className='space-y-6'
          onSubmit={handleSubmit}>
          <InputField
            label='Name'
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete='name'
          />
          <InputField
            label='Email address'
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
          />
          <InputField
            label='CNIC'
            name='cnic'
            value={form.cnic}
            onChange={handleCnicChange}
            required
            placeholder='xxxxx-xxxxxxx-x'
            maxLength={15}
            onlyNumbers
            allowDashes
          />
          <InputField
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='new-password'
          />
          <InputField
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete='new-password'
          />
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200'>
              Register
            </button>
          </div>
        </form>
        <div className='mt-6 text-center'>
          <span className='text-sm text-emerald-700'>
            Already have an account?
          </span>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            to='/login'
            className='ml-1 text-emerald-600 hover:underline font-medium'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
