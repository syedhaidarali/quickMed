/** @format */

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import { useAdmin, useDoctor, useAuth } from "../context";
import { LoadingSpinner } from "../components/ui";

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
