/** @format */

import React from "react";
import { useHospital } from "../context";
import { HospitalCard } from "../components/cards";

const AllHospitals = () => {
  const { allPublicHospital, loading } = useHospital();

  if (loading) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500'></div>
      </div>
    );
  }

  if (!allPublicHospital || allPublicHospital.length === 0) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            No Public Hospitals
          </h1>
          <p className='text-emerald-700 text-lg'>
            No public hospitals available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
      <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center'>
        All Public Hospitals
      </h1>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {allPublicHospital.map((hospital) => (
          <HospitalCard
            key={hospital._id}
            hospital={hospital}
          />
        ))}
      </div>
    </div>
  );
};

export default AllHospitals;
