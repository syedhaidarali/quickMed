/** @format */

import React from "react";
import { useDoctor } from "../../context";
import DoctorCard from "../cards/DoctorCards";

const DoctorSections = () => {
  const { allDoctors = [], loading } = useDoctor();

  const getAvg = (d) => {
    const r = d?.rating;
    if (!r) return 0;
    return typeof r === "object" ? Number(r.average || 0) : Number(r || 0);
  };

  const top4 = allDoctors
    .slice()
    .sort((a, b) => getAvg(b) - getAvg(a))
    .slice(0, 4);

  if (loading) {
    return (
      <div className='mx-auto px-4 sm:px-6 lg:px-8 pb-5'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Top Rated Doctors
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Consult with Pakistan's best doctors from the comfort of your home
          </p>
        </div>
        <div className='flex justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500' />
        </div>
      </div>
    );
  }

  if (!top4.length) {
    return (
      <div className='mx-auto px-4 sm:px-6 lg:px-8 pb-5'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Top Rated Doctors
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Consult with Pakistan's best doctors from the comfort of your home
          </p>
        </div>
        <div className='text-center text-gray-500'>
          <p>No doctors available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto px-4 sm:px-6 lg:px-8 pb-5'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
          Top Rated Doctors
        </h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Consult with Pakistan's best doctors from the comfort of your home
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {top4.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorSections;
