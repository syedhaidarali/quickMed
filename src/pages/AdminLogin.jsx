/** @format */

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputField from "../components/formItems/InputField";

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { AdminLogin, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!adminData.email) newErrors.email = "Email is required";
    if (!adminData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const res = await AdminLogin(adminData);
    if (res?.success) navigate("/admin/dashboard");
  };

  return (
    <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50 py-16 px-4'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md w-full'>
        <div className='text-center mb-6'>
          <div className='text-4xl mb-2'>👨‍💼</div>
          <h1 className='text-3xl font-bold text-emerald-800'>Admin Login</h1>
          <p className='text-emerald-600'>Access the admin dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-4'>
          <InputField
            label='Email'
            name='email'
            type='email'
            value={adminData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete='email'
            required
          />

          <InputField
            label='Password'
            name='password'
            type='password'
            value={adminData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete='current-password'
            required
          />

          {error && (
            <div className='bg-red-100 text-red-600 p-2 rounded text-sm'>
              {error}
            </div>
          )}

          <button
            type='submit'
            className='w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50'
            disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className='mt-6 text-sm text-center text-emerald-700'>
          Demo Credentials: admin@quickmid.com / admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
