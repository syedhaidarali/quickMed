/** @format */

import React, { useState } from "react";
import { citiesMap, cityCoordsMap, specialities } from "../assets/dummy";
import { Map, Search } from "../assets/svg";
import Dropdown from "./Dropdown";

const SearchBar = ({ onCitySelect }) => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSpecialities, setShowSpecialities] = useState(false);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setSuggestions(
      value
        ? citiesMap.filter((c) => c.toLowerCase().includes(value.toLowerCase()))
        : []
    );
  };

  const selectCity = (name) => {
    setCity(name);
    setSuggestions([]);
    const coords = cityCoordsMap[name] || [24.8607, 67.0011]; // fallback Karachi
    onCitySelect?.(name, coords);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const matched = suggestions[0] || (citiesMap.includes(city) && city);
      matched && selectCity(matched);
    }
  };

  return (
    <div className='p-6 max-w-4xl mx-auto mb-6 mt-10'>
      <div className='flex flex-col md:flex-row justify-center gap-4'>
        {/* City Input */}
        <div className='relative w-full md:w-1/2'>
          <input
            type='text'
            value={city}
            placeholder='Enter City'
            onChange={handleCityChange}
            onFocus={() => setSuggestions(citiesMap)}
            onKeyDown={handleKeyDown}
            autoComplete='off'
            className='w-full h-11 border bg-white px-3 pr-12 py-2 rounded-md text-gray-700 font-medium border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <div className='absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-[#f2fafe] border-l border-gray-300 rounded-e-md'>
            <Map />
          </div>
          {suggestions.length > 0 && (
            <div className='absolute left-0 mt-1 w-full max-h-32 overflow-y-auto bg-white border border-gray-200 rounded shadow z-50'>
              {suggestions.map((item) => (
                <div
                  key={item}
                  onMouseDown={() => selectCity(item)}
                  className='px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-700 font-medium'>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Speciality Dropdown */}
        <div className='relative w-full md:w-[500px]'>
          <Dropdown
            options={specialities}
            value={search}
            onChange={setSearch}
            placeholder='Search by Doctors'
            showUrdu={true}
            inputStyle='text-[12px]'
            placeholderStyle='text-[16px]'
            // urduTextStyle='text-[14px] font-bold'
            // englishTextStyle='text-[14px] font-bold'
          />
          <div className='absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-[#f2fafe] border-l border-gray-300 rounded-e-md pointer-events-none'>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
