/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/formItems/InputField";
import { formatCNIC, validateCNIC } from "../helpers/CNICFormat";

const Login = () => {
  const [activeTab, setActiveTab] = useState("email"); // "email" or "cnic"

  // Email login state
  const [email, setEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  // CNIC login state
  const [cnic, setCnic] = useState("");
  const [cnicPassword, setCnicPassword] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email login logic here
    console.log("Email login:", { email, password: emailPassword });
  };

  const handleCnicSubmit = (e) => {
    e.preventDefault();
    // Handle CNIC login logic here
    if (validateCNIC(cnic)) {
      console.log("CNIC login:", { cnic, password: cnicPassword });
    } else {
      alert("Please enter a valid CNIC format (xxxxx-xxxxxxx-x)");
    }
  };

  const handleCnicChange = (e) => {
    const formattedCnic = formatCNIC(e.target.value);
    setCnic(formattedCnic);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          Sign in to your account
        </h2>

        {/* Tabs */}
        <div className='mb-6'>
          <div className='flex bg-gray-100 rounded-lg p-1'>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === "email"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              Email Login
            </button>
            <button
              onClick={() => setActiveTab("cnic")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === "cnic"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              CNIC Login
            </button>
          </div>
        </div>

        {/* Email Login Form */}
        {activeTab === "email" && (
          <form
            className='space-y-6'
            onSubmit={handleEmailSubmit}>
            <InputField
              label='Email Address'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='email'
            />
            <InputField
              label='Password'
              type='password'
              name='emailPassword'
              value={emailPassword}
              onChange={(e) => setEmailPassword(e.target.value)}
              required
              autoComplete='current-password'
            />
            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200'>
                Sign In with Email
              </button>
            </div>
          </form>
        )}

        {/* CNIC Login Form */}
        {activeTab === "cnic" && (
          <form
            className='space-y-6'
            onSubmit={handleCnicSubmit}>
            <InputField
              label='CNIC Number'
              type='text'
              name='cnic'
              value={cnic}
              onChange={handleCnicChange}
              required
              autoComplete='off'
              placeholder='Enter CNIC (xxxxx-xxxxxxx-x)'
              maxLength={15}
            />
            <InputField
              label='Password'
              type='password'
              name='cnicPassword'
              value={cnicPassword}
              onChange={(e) => setCnicPassword(e.target.value)}
              required
              autoComplete='current-password'
            />
            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200'>
                Sign In with CNIC
              </button>
            </div>
          </form>
        )}

        <div className='mt-6 text-center'>
          <span className='text-sm text-emerald-700'>
            Don't have an account?
          </span>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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
