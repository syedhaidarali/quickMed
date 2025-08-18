/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import { useHospital } from "../context";
import DoctorCard from "../components/cards/DoctorCards";

const HospitalDoctors = () => {
  const { slug } = useParams();
  const { allPublicHospital } = useHospital();

  const hospitalId = slug.split("-").pop();
  const hospital = allPublicHospital.find((h) => h._id === hospitalId);
  const hospitalDoctors = Array.isArray(hospital?.doctors)
    ? hospital.doctors
    : [];

  if (!hospital || hospitalDoctors.length === 0) {
    return (
      <div className='min-h-[60vh] bg-emerald-50 py-16 px-4 flex items-center justify-center'>
        <p className='text-gray-600 text-lg font-medium'>
          No doctors found for this hospital.
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
      <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center capitalize'>
        Doctors at {hospital.name} ({hospitalDoctors.length})
      </h1>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {hospitalDoctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
};

export default HospitalDoctors;
