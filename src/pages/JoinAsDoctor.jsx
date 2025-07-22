/** @format */

import React, { useState } from "react";

const JoinAsDoctor = () => {
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50 py-16 px-4'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full'>
        <div className='flex flex-col items-center mb-4'>
          <span className='text-emerald-600 text-4xl mb-2'>🩺</span>
          <h1 className='text-3xl font-bold text-emerald-800 mb-2 text-center'>
            Join as a Doctor
          </h1>
        </div>
        <form
          className='space-y-4'
          onSubmit={handleSubmit}>
          <div>
            <label className='block text-emerald-700 font-medium mb-1'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500'
            />
          </div>
          <div>
            <label className='block text-emerald-700 font-medium mb-1'>
              Specialty
            </label>
            <input
              type='text'
              name='specialty'
              value={form.specialty}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500'
            />
          </div>
          <div>
            <label className='block text-emerald-700 font-medium mb-1'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500'
            />
          </div>
          <div>
            <label className='block text-emerald-700 font-medium mb-1'>
              Phone
            </label>
            <input
              type='tel'
              name='phone'
              value={form.phone}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500'
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-medium transition-colors duration-200 mt-4'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinAsDoctor;
