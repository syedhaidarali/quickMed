/** @format */
import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({
  options = [],
  value = "",
  onChange = () => {},
  placeholder = "Select",
  icon: Icon,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className='relative w-full'
      ref={containerRef}>
      <button
        type='button'
        className='w-full flex items-center border border-gray-300 rounded-md px-3 py-2 font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        onClick={() => setOpen((prev) => !prev)}>
        <span className='flex-1 text-left'>{value || placeholder}</span>
        {Icon && <Icon />}
      </button>

      {open && (
        <div className='absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow z-10'>
          {options.map((item) => (
            <div
              key={item}
              className='px-4 py-2 hover:bg-blue-100 text-gray-700 cursor-pointer font-medium'
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
