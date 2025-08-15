/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../assets/dummy";
import DoctorCard from "../components/cards/DoctorCards";
import { useDoctor } from "../context/DoctorContext";
import { specialitiesEnglish } from "../assets/dummy";

const DoctorDetail = () => {
  const { allDoctors } = useDoctor();
  const { slug } = useParams();

  // Create a mapping between URL slugs and specialty names
  const createSlugToSpecialtyMap = () => {
    const map = {};
    specialitiesEnglish.forEach((specialty) => {
      const slug = specialty
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/\//g, "-") // Replace slashes with hyphens
        .replace(/&/g, "and"); // Replace & with 'and'
      map[slug] = specialty;
    });
    return map;
  };

  const slugToSpecialtyMap = createSlugToSpecialtyMap();
  const targetSpecialty = slugToSpecialtyMap[slug];

  // Filter doctors by specialty
  const filteredDoctors =
    allDoctors?.filter((doctor) => {
      if (!targetSpecialty) return false;

      // Handle array of specialties
      if (Array.isArray(doctor.speciality)) {
        return doctor.speciality.some(
          (spec) => spec && spec.toLowerCase() === targetSpecialty.toLowerCase()
        );
      }

      // Handle string specialty
      if (typeof doctor.speciality === "string") {
        return (
          doctor.speciality.toLowerCase() === targetSpecialty.toLowerCase()
        );
      }

      return false;
    }) || [];

  console.log("Filtered Doctors:", filteredDoctors);

  if (!targetSpecialty) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            Invalid Specialty
          </h1>
          <p className='text-emerald-700 text-lg'>
            The requested specialty "{slug.replace(/-/g, " ")}" was not found.
          </p>
        </div>
      </div>
    );
  }

  if (filteredDoctors.length === 0) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            No Doctors Found
          </h1>
          <p className='text-emerald-700 text-lg'>
            No doctors found for {targetSpecialty}.
          </p>
          <p className='text-emerald-600 text-sm mt-2'>
            Please check back later or contact us for assistance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
      <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center'>
        {targetSpecialty} Doctors
      </h1>
      <p className='text-center text-emerald-600 mb-8'>
        Found {filteredDoctors.length} doctor
        {filteredDoctors.length !== 1 ? "s" : ""} in {targetSpecialty}
      </p>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {filteredDoctors.map((doctor, idx) => (
          <DoctorCard
            key={doctor._id || idx}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorDetail;
