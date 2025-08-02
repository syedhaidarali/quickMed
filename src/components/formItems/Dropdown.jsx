/** @format */
import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({
  options = [],
  value = "",
  onChange = () => {},
  placeholder = "Select",
  icon: Icon,
  showUrdu = false,
  inputStyle = "",
  placeholderStyle = "",
  urduTextStyle = "",
  englishTextStyle = "",
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (item) => {
    onChange(item);
    setOpen(false);
  };

  const getDisplayText = () => {
    if (showUrdu && value.includes(" - ")) {
      const [en, ur] = value.split(" - ");
      return (
        <>
          {en}
          <span className='font-JameelNoori font-bold ml-2'>{ur}</span>
        </>
      );
    }
    return value || placeholder;
  };

  return (
    <div
      className='relative w-full'
      ref={containerRef}>
      <button
        type='button'
        className='w-full flex items-center h-11 border border-gray-300 rounded-md px-3 py-2 font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        onClick={() => setOpen((prev) => !prev)}>
        <span
          className={`flex-1 text-left ${
            value ? inputStyle : placeholderStyle
          }`}>
          {getDisplayText()}
        </span>
        {Icon && <Icon />}
      </button>

      {open && (
        <div className='absolute left-0 mt-1 w-full bg-white h-36 overflow-y-auto border border-gray-200 rounded shadow z-10'>
          {options.map((item) => {
            const isUrdu =
              showUrdu && typeof item === "string" && item.includes(" - ");
            const [en, ur] = isUrdu ? item.split(" - ") : [item];

            return (
              <div
                key={item}
                className='px-4 py-2 hover:bg-blue-100 text-gray-700 cursor-pointer font-medium flex items-center gap-2'
                onClick={() => handleSelect(item)}>
                <span className={englishTextStyle}>{en}</span>
                {isUrdu && (
                  <span
                    className={`font-JameelNoori font-bold text-xl ${urduTextStyle}`}>
                    {ur}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
