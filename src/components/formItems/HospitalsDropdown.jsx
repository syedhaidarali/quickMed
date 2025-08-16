/** @format */

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { DropdownIcon } from "../../assets/svg";
import { useHospital } from "../../context";

const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

const HospitalsDropdown = ({
  idx = 0,
  openDropdown,
  setOpenDropdown,
  isMobile = false,
  onLinkClick,
}) => {
  const isOpen = openDropdown === idx;
  const { allPublicHospital = [] } = useHospital();

  const handleRoute = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onLinkClick?.();
  };

  // group hospitals by city (we only need city keys and counts internally)
  const hospitalsByCity = useMemo(() => {
    const map = {};
    allPublicHospital.forEach((h) => {
      const city =
        (h.city && String(h.city).trim()) ||
        (h.location && h.location.city && String(h.location.city).trim()) ||
        "Unknown";
      if (!map[city]) map[city] = 0;
      map[city] += 1;
    });
    return map;
  }, [allPublicHospital]);

  const cityList = useMemo(
    () => Object.keys(hospitalsByCity).sort(),
    [hospitalsByCity]
  );

  const cityLink = (city) => `/hospitals/${slugify(city)}`;

  const toggleMobileDropdown = () => setOpenDropdown(isOpen ? null : idx);

  return (
    <div
      className={`relative ${isMobile ? "mb-2" : "group"}`}
      onMouseEnter={!isMobile ? () => setOpenDropdown(idx) : undefined}
      onMouseLeave={!isMobile ? () => setOpenDropdown(null) : undefined}>
      <button
        onClick={isMobile ? toggleMobileDropdown : undefined}
        className='flex items-center w-full px-3 py-2 xl:text-[15px] text-[14px] font-medium text-[#014e78] bg-white hover:bg-[#014e78] hover:text-white rounded transition-colors duration-150'
        aria-expanded={isOpen}
        aria-haspopup='true'>
        <span>Hospitals</span>
        <DropdownIcon />
      </button>

      <div
        className={`${
          isMobile
            ? isOpen
              ? "block"
              : "hidden"
            : isOpen
            ? "absolute left-0 w-64 min-w-fit z-20"
            : "hidden"
        } bg-[#f9f9f9] mt-1 shadow-lg rounded transition-all duration-200 ${
          Object.keys(hospitalsByCity).length > 6
            ? "max-h-96 overflow-y-auto"
            : ""
        }`}>
        {/* Top link: All hospitals (city wise) - KEEP bottom border */}
        <Link
          to='/hospitals'
          onClick={handleRoute}
          className='block px-4 py-2.5 text-[#014e78] hover:bg-[#f1f1f1] font-medium whitespace-nowrap text-[15px] border-b border-gray-200'>
          All Hospitals (City wise)
        </Link>

        {/* City-only list (no counts, no borders) */}
        {cityList.length === 0 ? (
          <div className='px-4 py-3 text-sm text-gray-600'>
            No hospitals found.
          </div>
        ) : (
          <div className='pt-0'>
            {cityList.map((city) => (
              <Link
                key={city}
                to={cityLink(city)}
                onClick={handleRoute}
                className='block px-4 py-2.5 text-[#014e78] hover:bg-[#f1f1f1] font-medium whitespace-nowrap text-[15px]'>
                {city}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalsDropdown;
