/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import { labs } from "../assets/dummy";
import { LabCard } from "../components/cards";

const LabDetail = () => {
  const { slug } = useParams();
  const filteredLabs = labs.filter((l) =>
    l.slug
      ? l.slug === slug
      : l.city.toLowerCase().replace(/\s+/g, "-") === slug ||
        l.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (filteredLabs.length === 0) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            No Labs Found
          </h1>
          <p className='text-emerald-700 text-lg'>
            No labs found for this area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
      <h1 className='text-2xl font-bold text-emerald-800 mb-8 text-center capitalize'>
        {slug.replace(/-/g, " ")} Labs
      </h1>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {filteredLabs.map((lab, idx) => (
          <LabCard
            key={idx}
            lab={lab}
          />
        ))}
      </div>
    </div>
  );
};

export default LabDetail;
