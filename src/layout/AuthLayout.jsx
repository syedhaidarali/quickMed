/** @format */

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import { useAdmin } from "../context/AdminContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useDoctor } from "../context/DoctorContext";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {
  const { admin, loading } = useAdmin();
  const { doctor } = useDoctor();
  const { user } = useAuth();
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
  } else if (doctor) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  } else if (user) {
    return (
      <Navigate
        to='/'
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
