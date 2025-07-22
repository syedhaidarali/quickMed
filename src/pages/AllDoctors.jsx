/** @format */

import React from "react";
import { doctors } from "../assets/dummy";
import DoctorCard from "../components/cards/DoctorCards";

const AllDoctors = () => (
  <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
    <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center'>
      All Doctors
    </h1>
    <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
      {doctors.map((doctor, index) => (
        <DoctorCard
          key={index}
          doctor={doctor}
        />
      ))}
    </div>
  </div>
);

export default AllDoctors;
