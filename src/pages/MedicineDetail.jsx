/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import { medicines } from "../assets/dummy";
import MedicineCard from "../components/cards/MedicineCard";

const MedicineDetail = () => {
  const { slug } = useParams();
  const filteredMedicines = medicines.filter(
    (m) =>
      (m.slug
        ? m.slug === slug
        : m.name.toLowerCase().replace(/\s+/g, "-") === slug) ||
      m.type.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (filteredMedicines.length === 0) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            No Medicines Found
          </h1>
          <p className='text-emerald-700 text-lg'>
            No medicines found for this type.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
      <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center capitalize'>
        {slug.replace(/-/g, " ")} Medicines
      </h1>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {filteredMedicines.map((medicine, idx) => (
          <MedicineCard
            key={idx}
            medicine={medicine}
          />
        ))}
      </div>
    </div>
  );
};

export default MedicineDetail;
