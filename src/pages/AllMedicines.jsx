/** @format */

import React from "react";
import { medicines } from "../assets/dummy";
import MedicineCard from "../components/cards/MedicineCard";

const AllMedicines = () => (
  <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
    <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center'>
      All Medicines
    </h1>
    <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
      {medicines.map((medicine, idx) => (
        <MedicineCard
          key={idx}
          medicine={medicine}
        />
      ))}
    </div>
  </div>
);

export default AllMedicines;
