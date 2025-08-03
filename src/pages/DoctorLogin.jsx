/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/formItems/InputField";

const DoctorLogin = () => {
  const [activeTab, setActiveTab] = useState("email");

  // Email login state
  const [email, setEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  // PMDC login state
  const [pmdc, setPmdc] = useState("");
  const [pmdcPassword, setPmdcPassword] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email login logic here
    console.log("Email login:", { email, password: emailPassword });
  };

  const handlePmdcSubmit = (e) => {
    e.preventDefault();
    // Handle PMDC login logic here
    console.log("PMDC login:", { pmdc, password: pmdcPassword });
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='md:min-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          Login as a Doctor
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
              onClick={() => setActiveTab("pmdc")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === "pmdc"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              PMDC Login
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

        {/* PMDC Login Form */}
        {activeTab === "pmdc" && (
          <form
            className='space-y-6'
            onSubmit={handlePmdcSubmit}>
            <InputField
              label='PMDC Number'
              type='text'
              name='pmdc'
              value={pmdc}
              onChange={(e) => setPmdc(e.target.value)}
              required
              autoComplete='off'
              placeholder='Enter your PMDC number'
            />
            <InputField
              label='Password'
              type='password'
              name='pmdcPassword'
              value={pmdcPassword}
              onChange={(e) => setPmdcPassword(e.target.value)}
              required
              autoComplete='current-password'
            />
            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200'>
                Sign In with PMDC
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
            to='/register/doctor'
            className='ml-1 text-emerald-600 hover:underline font-medium'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
