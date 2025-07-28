/** @format */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../assets/dummy";

const DoctorProfile = () => {
  const { slug } = useParams();
  const doctor = doctors.find((d) => d.slug === slug);
  const [hasAppointment] = useState(false); // default false, backend will handle

  if (!doctor) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            No Doctor Found
          </h1>
          <p className='text-emerald-700 text-lg'>
            No doctor found for this profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4 flex justify-center'>
      <div className='bg-white rounded-xl shadow-md p-8 max-w-xl w-full'>
        <div className='flex flex-col items-center mb-6'>
          <img
            src={doctor.image}
            alt={doctor.name}
            className='w-28 h-28 rounded-full object-cover border-4 border-emerald-100 shadow mb-4'
          />
          <h2 className='text-2xl font-bold text-emerald-800 mb-1'>
            {doctor.name}
          </h2>
          <p className='bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full mb-1'>
            {doctor.specialty}
          </p>
          <p className='text-sm text-gray-500'>
            {doctor.experience} experience
          </p>
        </div>
        <div className='mb-4'>
          <p className='text-gray-700'>
            <b>Hospital:</b> {doctor.hospital}
          </p>
          <p className='text-gray-700'>
            <b>Location:</b> {doctor.location}
          </p>
          <p className='text-gray-700'>
            <b>Consultation Fee:</b> Rs. {doctor.consultationFee}
          </p>
          <p className='text-gray-700'>
            <b>Availability:</b> {doctor.availability}
          </p>
        </div>
        {hasAppointment ? (
          <div className='flex justify-center gap-4 mt-6'>
            <button className='px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition'>
              Chat
            </button>
            <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
              Video Call
            </button>
            <button className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition'>
              Audio Call
            </button>
          </div>
        ) : (
          <div className='text-center text-emerald-700 mt-6'>
            You need to book an appointment to contact this doctor.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
