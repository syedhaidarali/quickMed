/** @format */

import React from "react";

const AuthButtons = ({ mobile = false }) => {
  const buttonClasses = mobile
    ? "w-full text-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
    : "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200";

  return (
    <div className={mobile ? "space-y-2 mt-4" : "flex items-center space-x-4"}>
      <button
        className={`${buttonClasses} text-gray-700 hover:text-blue-600 hover:bg-gray-50 border border-gray-300 hover:border-blue-300`}>
        Sign In
      </button>
      <button
        className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 hover:border-blue-700`}>
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;
