/** @format */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { hospitals } from "../assets/dummy";

const BookAppointmentHospital = () => {
  const { slug } = useParams();
  const hospital = hospitals.find((h) => h.slug === slug);
  const [form, setForm] = useState({ name: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!hospital) {
    return <div className='p-8 text-center'>Hospital not found.</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className='min-h-[60vh] flex justify-center items-center bg-emerald-50 py-16 px-4'>
      <div className='bg-white rounded-xl shadow-md p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold text-emerald-800 mb-4 text-center'>
          Book Appointment at {hospital.name}
        </h2>
        <div className='flex flex-col items-center mb-4'>
          <img
            src={hospital.image}
            alt={hospital.name}
            className='w-20 h-20 rounded object-cover border-4 border-emerald-100 shadow mb-2'
          />
          <p className='text-emerald-700 text-sm'>{hospital.address}</p>
        </div>
        {submitted ? (
          <div className='text-green-700 text-center font-semibold'>
            Appointment booked successfully!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='space-y-4'>
            <input
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              placeholder='Your Name'
              className='w-full border rounded px-3 py-2'
            />
            <input
              name='date'
              type='date'
              value={form.date}
              onChange={handleChange}
              required
              className='w-full border rounded px-3 py-2'
            />
            <input
              name='time'
              type='time'
              value={form.time}
              onChange={handleChange}
              required
              className='w-full border rounded px-3 py-2'
            />
            <button
              type='submit'
              className='w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition'>
              Book Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentHospital;
