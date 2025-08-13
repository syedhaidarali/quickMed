/** @format */

import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  // Handle specialty array or string
  const getSpecialty = (specialty) => {
    if (Array.isArray(specialty)) {
      return specialty.join(", ");
    }
    return specialty || "General Medicine";
  };

  // Handle rating object
  const getRating = (rating) => {
    if (rating && typeof rating === "object") {
      return rating.average || 0;
    }
    return rating || 0;
  };

  const getReviewCount = (rating) => {
    if (rating && typeof rating === "object") {
      return rating.count || 0;
    }
    return 0;
  };

  // Generate slug from doctor name and ID
  const generateSlug = (name, id) => {
    const nameSlug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return `${nameSlug}-${id}`;
  };

  const slug = generateSlug(doctor.name, doctor._id);

  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 border-t-4 border-emerald-500 transition-all duration-300 p-6 flex flex-col justify-between'>
      <div className='text-center mb-4'>
        <img
          src={
            doctor.profilePicture ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(doctor.name) +
              "&background=random"
          }
          alt={doctor.name}
          className='w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-emerald-100 shadow'
        />
        <h3 className='text-lg font-semibold text-gray-900 mb-1'>
          {doctor.name}
        </h3>
        <p className='inline-block bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full mb-1'>
          {getSpecialty(doctor.speciality)}
        </p>
        <p className='text-sm text-gray-500'>
          {doctor.experience || 0} years experience
        </p>
      </div>

      <div className='space-y-2 mb-4'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Rating:</span>
          <div className='flex items-center gap-1 text-yellow-500'>
            <span>★</span>
            <span className='font-medium'>{getRating(doctor.rating)}</span>
            <span className='text-gray-400 ml-1'>
              ({getReviewCount(doctor.rating)})
            </span>
          </div>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Hospital:</span>
          <div className='flex items-center gap-1 text-gray-500 text-xs'>
            🏥 {doctor.hospital || "Not specified"}
          </div>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Location:</span>
          <div className='flex items-center gap-1 text-gray-500 text-xs'>
            📍{" "}
            {doctor.fullAddress
              ? doctor.fullAddress.split(",").slice(-2).join(", ")
              : "Not specified"}
          </div>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Fee:</span>
          <span className='font-medium text-green-600'>
            Rs. {doctor.fee || "Not specified"}
          </span>
        </div>

        {doctor.mainDegree && (
          <div className='flex items-center justify-between text-sm'>
            <span className='text-gray-600'>Degree:</span>
            <span className='text-gray-500'>{doctor.mainDegree}</span>
          </div>
        )}
      </div>

      <div className='space-y-2'>
        <div className='text-xs text-center'>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs ${
              doctor.availability
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
            {doctor.availability ? "Available" : "Not Available"}
          </span>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Link
            to={`/doctor/profile/${slug}`}
            className='px-3 py-2 text-sm border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors duration-200 text-center'>
            View Profile
          </Link>
          <Link
            to={`/doctor/book/${slug}`}
            className='px-3 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200 text-center'>
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
