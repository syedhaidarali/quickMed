/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../assets/dummy";
const Navigation = ({ mobile = false }) => {
  const baseClasses = mobile
    ? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    : "text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";

  return (
    <nav className={mobile ? "space-y-1" : "flex space-x-4"}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={baseClasses}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
