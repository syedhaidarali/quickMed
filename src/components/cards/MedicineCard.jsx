/** @format */

import React from "react";

const MedicineCard = ({ medicine }) => {
  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center'>
      <img
        src={
          medicine.image ||
          "https://ui-avatars.com/api/?name=Medicine&background=random"
        }
        alt={medicine.name}
        className='w-32 h-32 rounded-2xl object-cover border-4 border-emerald-200 shadow mb-4'
      />
      <h2 className='text-xl font-bold text-emerald-800 mb-1'>
        {medicine.name}
      </h2>
      <span className='inline-block bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full mb-2'>
        {medicine.type}
      </span>
      <div className='text-gray-700 text-sm mb-1'>
        <span className='font-semibold'>Description:</span>{" "}
        {medicine.description}
      </div>
      <div className='text-emerald-700 font-bold mb-2'>
        Price: Rs. {medicine.price}
      </div>
      <button className='px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium w-full mb-2'>
        Add to Cart
      </button>
      <button className='px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors duration-200 font-medium w-full'>
        Buy Now
      </button>
    </div>
  );
};

export default MedicineCard;
