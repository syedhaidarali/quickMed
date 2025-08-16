/** @format */

import React from "react";
import { useQuickHelp } from "../../context";
import { Stethoscope, Sparkles } from "lucide-react";

const QuickHelpButton = ({ className = "", size = "default" }) => {
  const { openModal } = useQuickHelp();

  const sizeClasses = {
    small: "w-10 h-10",
    default: "w-12 h-12",
    large: "w-14 h-14",
  };

  const iconSizes = {
    small: "w-5 h-5",
    default: "w-6 h-6",
    large: "w-7 h-7",
  };

  return (
    <button
      onClick={openModal}
      className={`${sizeClasses[size]} ${className} fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center z-40`}
      aria-label='Open AI Health Assistant'>
      <div className='relative'>
        <Stethoscope className={iconSizes[size]} />
        <Sparkles className='absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse' />
      </div>
    </button>
  );
};

export default QuickHelpButton;
