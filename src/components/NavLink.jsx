/** @format */

import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ href, label }) => {
  const handleRoutes = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Link
      onClick={handleRoutes}
      to={href}
      className='px-3 py-2 text-[15px] font-medium text-[#014e78] hover:bg-[#f7f7f7] rounded transition-colors duration-150'>
      {label}
    </Link>
  );
};
export default NavLink;
