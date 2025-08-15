/** @format */

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import { useAdmin } from "../context/AdminContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useDoctor } from "../context/DoctorContext";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {
  const { loading } = useAdmin();
  const { loading: doctorLoading } = useDoctor();
  const { user: userLoading } = useAuth();
  if (loading.session) {
    return <LoadingSpinner />;
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
