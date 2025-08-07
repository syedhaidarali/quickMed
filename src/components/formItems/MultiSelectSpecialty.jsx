/** @format */

import React, { useState, useEffect } from "react";
import { specialitiesEnglish } from "../../assets/dummy";
import Dropdown from "./Dropdown";
import { CrossIcon } from "../../assets/svg";

const MultiSelectSpecialty = ({
  selectedSpecialties = [],
  onSpecialtiesChange,
  placeholder = "Select specialties...",
  maxSelections = 5,
  className = "",
}) => {
  const handleSelect = (item) => {
    if (selectedSpecialties.includes(item)) {
      onSpecialtiesChange(selectedSpecialties.filter((s) => s !== item));
    } else if (selectedSpecialties.length < maxSelections) {
      onSpecialtiesChange([...selectedSpecialties, item]);
    }
  };

  const handleRemove = (item) => {
    onSpecialtiesChange(selectedSpecialties.filter((s) => s !== item));
  };

  return (
    <div className={`relative ${className}`}>
      <label className='block text-emerald-700 font-medium mb-2'>
        Specialties{" "}
        {selectedSpecialties.length > 0 && (
          <span className='text-sm text-gray-500 font-normal'>
            ({selectedSpecialties.length}/{maxSelections})
          </span>
        )}
      </label>

      {selectedSpecialties.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-3'>
          {selectedSpecialties.map((item, index) => (
            <div
              key={index}
              onClick={() => handleRemove(item)}
              className='group flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-emerald-200 cursor-pointer'>
              <span className='truncate max-w-[200px]'>{item}</span>
              <CrossIcon />
            </div>
          ))}
        </div>
      )}

      <Dropdown
        options={specialitiesEnglish}
        value={placeholder}
        onChange={handleSelect}
        placeholder={placeholder}
        disabled={selectedSpecialties.length >= maxSelections}
      />

      {selectedSpecialties.length >= maxSelections && (
        <div className='mt-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-3 py-2'>
          Maximum {maxSelections} specialties allowed
        </div>
      )}
    </div>
  );
};
export default MultiSelectSpecialty;
