/** @format */

import React from "react";
import { Outlet } from "react-router-dom";

const LayoutWrapper = ({ layout }) => (
  <div className={`layout-wrapper ${layout || ""}`}>
    <Outlet />
  </div>
);

export default LayoutWrapper;
