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

  if (!hospital) {
    return <div className='p-8 text-center'>Hospital not found.</div>;
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
      <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center capitalize'>
        Doctors at {hospital.name} ({hospitalDoctors.length})
      </h1>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {hospitalDoctors.length === 0 ? (
          <div className='col-span-full text-center text-gray-500'>
            No doctors found for this hospital.
          </div>
        ) : (
          hospitalDoctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HospitalDoctors;
