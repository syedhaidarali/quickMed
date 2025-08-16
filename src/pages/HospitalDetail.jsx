/** @format */

import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useHospital } from "../context";
import { HospitalCard } from "../components/cards";

const HospitalDetail = () => {
  const { allPublicHospital } = useHospital();
  const { slug } = useParams();
  const filteredHospitals = allPublicHospital.filter((h) => {
    const hSlug = h.city?.toLowerCase().replace(/\s+/g, "-");
    return hSlug === slug;
  });

  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [slug]);

  if (!filteredHospitals) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            Hospital Not Found
          </h1>
          <p className='text-emerald-700 text-lg'>
            The hospital profile you are looking for does not exist.
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
        {filteredHospitals.map((hospital) => (
          <HospitalCard
            key={hospital._id}
            hospital={hospital}
          />
        ))}
      </div>
    </div>
  );
};

export default HospitalDetail;
