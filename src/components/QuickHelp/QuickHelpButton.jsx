/** @format */

import React, { useState } from "react";
import QuickHelpModal from "./QuickHelpModal";
import { Stethoscope, Sparkles } from "lucide-react";

const QuickHelpButton = ({ className = "", variant = "default" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (variant === "floating") {
    return (
      <>
        <button
          onClick={openModal}
          className='fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group'
          title='Quick Help - Get AI Doctor Recommendations'>
          <div className='relative'>
            <Stethoscope className='w-6 h-6' />
            <Sparkles className='absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse' />
          </div>
        </button>

        <QuickHelpModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={openModal}
        className={`inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium ${className}`}>
        <Stethoscope className='w-4 h-4' />
        <span>Quick Help</span>
        <Sparkles className='w-4 h-4 text-yellow-300' />
      </button>

      <QuickHelpModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default QuickHelpButton;
