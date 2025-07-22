/** @format */

import React, { useState } from "react";
import { citiesMap, cityCoordsMap, specialities } from "../assets/dummy";
import { Map, Search } from "../assets/svg";

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
            className='w-full border bg-white px-3 pr-12 py-2 rounded-md text-gray-700 font-medium border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
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

        {/* Speciality Input */}
        <div className='relative w-full md:w-[500px]'>
          <input
            type='text'
            value={search}
            placeholder='Search by Doctors'
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSpecialities(true)}
            onBlur={() => setTimeout(() => setShowSpecialities(false), 150)}
            className={`w-full border bg-white px-3 pr-12 py-2 rounded-md text-gray-700 font-semibold border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              search.includes(" - ") ? "font-JameelNoori font-xl" : ""
            }`}
          />
          <div className='absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-[#f2fafe] border-l border-gray-300 rounded-e-md'>
            <Search />
          </div>
          {showSpecialities && (
            <div className='absolute left-0 mt-1 w-full max-h-32 overflow-y-auto bg-white border border-gray-200 rounded shadow z-10'>
              {specialities.map((s) => {
                const [en, ur] = s.split(" - ");
                return (
                  <div
                    key={s}
                    onMouseDown={() => setSearch(s)}
                    className='px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-700 font-medium flex gap-2 items-center'>
                    <span>{en}</span>
                    {ur && (
                      <span className='font-JameelNoori font-bold text-xl'>
                        {ur}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
