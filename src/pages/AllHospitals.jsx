/** @format */

import React from "react";
import { hospitals } from "../assets/dummy";
import HospitalCard from "../components/cards/HospitalCard";

const AllHospitals = () => (
  <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
    <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center'>
      All Hospitals
    </h1>
    <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
      {hospitals.map((hospital, idx) => (
        <HospitalCard
          key={idx}
          hospital={hospital}
        />
      ))}
    </div>
  </div>
);

export default AllHospitals;
