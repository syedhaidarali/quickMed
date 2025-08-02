/** @format */

import React from "react";

const AdminHeader = ({ admin, onLogout }) => {
  return (
    <div className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center'>
            <span className='text-emerald-600 text-2xl mr-3'>👨‍💼</span>
            <h1 className='text-2xl font-bold text-emerald-800'>
              Admin Dashboard
            </h1>
          </div>
          <div className='flex items-center space-x-4'>
            <span className='text-emerald-700'>Welcome, {admin.name}</span>
            <button
              onClick={onLogout}
              className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
