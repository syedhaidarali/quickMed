/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import { hospitals } from "../assets/dummy";
import HospitalCard from "../components/cards/HospitalCard";

const HospitalDetail = () => {
  const { slug } = useParams();
  const filteredHospitals = hospitals.filter((h) =>
    h.slug
      ? h.slug === slug
      : h.city.toLowerCase().replace(/\s+/g, "-") === slug ||
        h.name.toLowerCase().replace(/\s+/g, "-") === slug
  );
  console.log(filteredHospitals, "filter hospitals ");
  if (filteredHospitals.length === 0) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            No Hospitals Found
          </h1>
          <p className='text-emerald-700 text-lg'>
            No hospitals found for this area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
      <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center capitalize'>
        {slug.replace(/-/g, " ")} Hospitals
      </h1>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {filteredHospitals.map((hospital, idx) => (
          <HospitalCard
            key={idx}
            hospital={hospital}
          />
        ))}
      </div>
    </div>
  );
};

export default HospitalDetail;
