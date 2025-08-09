/** @format */

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import { useAdmin } from "../context/AdminContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const AuthLayout = () => {
  const { admin, loading } = useAdmin();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (admin) {
    return (
      <Navigate
        to='/admin/dashboard'
        replace
      />
    );
  }
  return (
    <>
      <Header />
      <div className='min-h-screen flex items-center justify-center bg-emerald-50'>
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
