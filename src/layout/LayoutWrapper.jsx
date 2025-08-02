/** @format */

import React from "react";
import AppLayout from "./AppLayout.jsx";
import AuthLayout from "./AuthLayout.jsx";

const LayoutWrapper = ({ children, layout = "app" }) => {
  switch (layout) {
    case "auth":
      return <AuthLayout>{children}</AuthLayout>;
    case "app":
    default:
      return <AppLayout>{children}</AppLayout>;
  }
};

export default LayoutWrapper;
