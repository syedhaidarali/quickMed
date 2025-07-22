/** @format */

import React from "react";

const surgeries = [
  { name: "Appendectomy", description: "Surgical removal of the appendix." },
  {
    name: "Cataract Surgery",
    description: "Removal of the cloudy lens from the eye.",
  },
  {
    name: "Heart Bypass",
    description: "Surgery to improve blood flow to the heart.",
  },
  {
    name: "Gallbladder Removal",
    description: "Surgical removal of the gallbladder.",
  },
];

const Surgeries = () => (
  <div className='min-h-[60vh] flex flex-col items-center justify-center bg-emerald-50 py-16 px-4'>
    <div className='bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center'>
      <h1 className='text-3xl font-bold text-emerald-800 mb-6'>Surgeries</h1>
      <div className='grid grid-cols-1 gap-6'>
        {surgeries.map((surgery, idx) => (
          <div
            key={idx}
            className='bg-emerald-100 rounded-lg p-6 shadow text-left'>
            <h2 className='text-xl font-semibold text-emerald-900 mb-2'>
              {surgery.name}
            </h2>
            <p className='text-emerald-700'>{surgery.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Surgeries;
