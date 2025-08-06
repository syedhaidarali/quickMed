/** @format */
import React, { useState, useRef, useEffect } from "react";

const SearchableDropdown = ({
  options = [],
  value = "",
  onChange = () => {},
  placeholder = "Select or add...",
  icon: Icon,
  disabled = false,
  allowAddNew = false,
  onVerificationChange = () => {}, // Callback to handle verification status
  registeredOptions = [], // Array of registered options for verification
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Filter options based on search query
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchQuery, options]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setOpen(true);

    // If allowAddNew, call onChange for any input
    if (allowAddNew) {
      onChange(query);
      // Check if it's a registered option for verification
      const isRegistered = registeredOptions.includes(query);
      onVerificationChange(isRegistered);
    }
  };

  const handleSelect = (item) => {
    setSearchQuery("");
    setOpen(false);
    onChange(item);

    // Check if it's a registered option for verification
    if (allowAddNew) {
      const isRegistered = registeredOptions.includes(item);
      onVerificationChange(isRegistered);
    }
  };

  const handleAddNew = () => {
    if (searchQuery.trim()) {
      setOpen(false);
      onChange(searchQuery.trim());
      onVerificationChange(false); // New items are not verified
      setSearchQuery("");
    }
  };

  const showAddNewOption =
    allowAddNew &&
    searchQuery.trim() &&
    !filteredOptions.some(
      (option) => option.toLowerCase() === searchQuery.toLowerCase()
    );

  const displayValue = value || placeholder;

  return (
    <div
      className='relative w-full'
      ref={containerRef}>
      {!open ? (
        <button
          type='button'
          className={`w-full flex items-center h-11 border border-emerald-200 rounded-md px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "text-gray-700 bg-white hover:border-emerald-400"
          }`}
          onClick={() => !disabled && setOpen(true)}
          disabled={disabled}>
          <span className={`flex-1 text-left ${value ? "" : "text-gray-500"}`}>
            {displayValue}
          </span>
          {Icon && <Icon />}
        </button>
      ) : (
        <input
          type='text'
          value={searchQuery}
          onChange={handleInputChange}
          onBlur={() => {
            // Small delay to allow clicking on options
            setTimeout(() => setOpen(false), 150);
          }}
          placeholder={placeholder}
          className='w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500'
          autoFocus
        />
      )}

      {open && (
        <div className='absolute left-0 mt-1 w-full bg-white max-h-60 overflow-y-auto border border-gray-200 rounded shadow z-10'>
          {/* Existing options */}
          {filteredOptions.map((item) => (
            <div
              key={item}
              className='px-4 py-2 hover:bg-emerald-100 text-gray-700 cursor-pointer font-medium flex items-center justify-between'
              onClick={() => handleSelect(item)}>
              <span>{item}</span>
              {allowAddNew && registeredOptions.includes(item) && (
                <span className='text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded'>
                  ✓ Verified
                </span>
              )}
            </div>
          ))}

          {/* Add new option */}
          {showAddNewOption && (
            <div
              onClick={handleAddNew}
              className='px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between border-t border-gray-100'>
              <span>Add "{searchQuery}"</span>
              <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded'>
                + New
              </span>
            </div>
          )}

          {/* No results */}
          {filteredOptions.length === 0 && !showAddNewOption && searchQuery && (
            <div className='px-4 py-2 text-gray-500 text-sm'>
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
