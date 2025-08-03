/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AuthLayout = () => (
  <>
    <Header />
    <div className='min-h-screen flex items-center justify-center bg-emerald-50'>
      <Outlet />
    </div>
  </>
);

export default AuthLayout;
