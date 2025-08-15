/** @format */

import React from "react";
import { Link } from "react-router-dom";

const HospitalCard = ({ hospital }) => {
  const generateSlug = (name, id) => {
    const nameSlug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return `${nameSlug}-${id}`;
  };

  const slug = generateSlug(hospital.name, hospital._id);
  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center'>
      <img
        src={
          hospital.image ||
          hospital.profilePicture ||
          "https://ui-avatars.com/api/?name=Hospital&background=random"
        }
        alt={hospital.name}
        className='w-32 h-32 rounded-2xl object-cover border-4 border-emerald-200 shadow mb-4'
      />
      <h2 className='text-xl font-bold text-emerald-800 mb-1'>
        {hospital.name}
      </h2>
      <span className='inline-block bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full mb-2'>
        {hospital.city}
      </span>
      <div className='text-gray-700 text-sm mb-1'>
        <span className='font-semibold'>Address:</span> {hospital.address}
      </div>
      <div className='text-gray-700 text-sm mb-1'>
        <span className='font-semibold'>Contact:</span>{" "}
        {hospital.contact || hospital.phone}
      </div>
      <div className='text-gray-700 text-sm mb-2'>
        <span className='font-semibold'>Beds:</span>{" "}
        {hospital.beds ?? hospital.totalBeds}
      </div>

      <Link
        to={`/hospital/profile/${slug}`}
        className='px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors duration-200 font-medium w-full text-center'>
        View Hospital
      </Link>
    </div>
  );
};

export default HospitalCard;
