/** @format */

import { LoadingSpinnerIcon } from "../../assets/svg";
import React from "react";

const LoadingSpinner = () => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80'>
    <div className='flex flex-col items-center'>
      <LoadingSpinnerIcon />
      <span className='mt-4 text-lg font-semibold text-emerald-700 animate-pulse'>
        Loading...
      </span>
    </div>
  </div>
);

export default LoadingSpinner;
