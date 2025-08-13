/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../assets/dummy";
import DoctorCard from "../components/cards/DoctorCards";
import { useDoctor } from "../context/DoctorContext";

const DoctorDetail = () => {
  const { allDoctors } = useDoctor();
  console.log(allDoctors);
  const { slug } = useParams();
  const filteredDoctors = allDoctors?.filter((d) => {
    if (d.slug && d.slug === slug) return true;

    if (Array.isArray(d.speciality)) {
      return d.speciality.some(
        (spec) =>
          spec?.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
      );
    }

    if (typeof d.speciality === "string") {
      return (
        d.speciality?.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
      );
    }

    return false;
  });

  if (filteredDoctors.length === 0) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            No Doctors Found
          </h1>
          <p className='text-emerald-700 text-lg'>
            No doctors found for this specialty.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
      <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center capitalize'>
        {slug.replace(/-/g, " ")} Doctors
      </h1>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {filteredDoctors.map((doctor, idx) => (
          <DoctorCard
            key={idx}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorDetail;
