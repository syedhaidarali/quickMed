/** @format */

import React from "react";
import { doctors } from "../../assets/dummy";
import DoctorCard from "../cards/DoctorCards";

const DoctorSections = () => {
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
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
};
export default DoctorSections;
