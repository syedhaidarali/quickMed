/** @format */

import React from "react";
import { DropdownIcon } from "../assets/svg";
import { Link } from "react-router-dom";

const DropdownMenu = ({
  link,
  idx,
  openDropdown,
  setOpenDropdown,
  isMobile,
}) => {
  const isOpen = openDropdown === idx;
  const handleRoute = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      key={link.label}
      className={`relative ${isMobile ? "mb-2" : "group"}`}
      onMouseEnter={!isMobile ? () => setOpenDropdown(idx) : undefined}
      onMouseLeave={!isMobile ? () => setOpenDropdown(null) : undefined}>
      <button
        className='flex items-center w-full px-3 py-2 xl:text-[15px] text-[14px] font-medium text-[#014e78] bg-white hover:bg-[#014e78] hover:text-white rounded transition-colors duration-150'
        onClick={
          isMobile ? () => setOpenDropdown(isOpen ? null : idx) : undefined
        }>
        <span>{link.label}</span>
        <DropdownIcon />
      </button>
      <div
        className={`${
          isMobile
            ? isOpen
              ? "block"
              : "hidden"
            : isOpen
            ? "absolute left-0 w-56 min-w-fit z-20"
            : "hidden"
        } bg-[#f9f9f9] shadow-lg rounded transition-all duration-200`}>
        {link.dropdown.map((item) => (
          <Link
            onClick={handleRoute}
            key={item.label}
            to={item.href}
            className='block px-4 py-3 text-[#014e78] hover:bg-[#f1f1f1] text-[15px] font-medium whitespace-nowrap'>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default DropdownMenu;
