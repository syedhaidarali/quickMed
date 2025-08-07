/** @format */

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAdmin } from "../context/AdminContext";

const AppLayout = () => {
  const { loading } = useAdmin();
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
