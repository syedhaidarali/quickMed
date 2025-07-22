/** @format */

import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 border-t-4 border-emerald-500 transition-all duration-300 p-6 flex flex-col justify-between'>
      <div className='text-center mb-4'>
        <img
          src={
            doctor.image ||
            "https://ui-avatars.com/api/?name=Doctor&background=random"
          }
          alt={doctor.name}
          className='w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-emerald-100 shadow'
        />
        <h3 className='text-lg font-semibold text-gray-900 mb-1'>
          {doctor.name}
        </h3>
        <p className='inline-block bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full mb-1'>
          {doctor.specialty}
        </p>
        <p className='text-sm text-gray-500'>{doctor.experience} experience</p>
      </div>

      <div className='space-y-2 mb-4'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Rating:</span>
          <div className='flex items-center gap-1 text-yellow-500'>
            <span>★</span>
            <span className='font-medium'>{doctor.rating}</span>
            <span className='text-gray-400 ml-1'>({doctor.reviews})</span>
          </div>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Hospital:</span>
          <div className='flex items-center gap-1 text-gray-500 text-xs'>
            🏥 {doctor.hospital}
          </div>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Location:</span>
          <div className='flex items-center gap-1 text-gray-500 text-xs'>
            📍 {doctor.location}
          </div>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Fee:</span>
          <span className='font-medium text-green-600'>
            Rs. {doctor.consultationFee}
          </span>
        </div>
      </div>

      <div className='space-y-2'>
        <div className='text-xs text-center'>
          <span className='inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs'>
            {doctor.availability}
          </span>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <button className='px-3 py-2 text-sm border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors duration-200'>
            View Profile
          </button>
          <button className='px-3 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200'>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
