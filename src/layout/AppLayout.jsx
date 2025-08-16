/** @format */

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useAdmin } from "../context";
import { QuickHelpButton, QuickHelpModal } from "../components/QuickHelp";
import { LoadingSpinner } from "../components/ui";

const AppLayout = () => {
  const { loading } = useAdmin();
  if (loading.session) {
    return <LoadingSpinner />;
  }
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
      <QuickHelpButton />
      <QuickHelpModal />
    </div>
  );
};

export default AppLayout;
