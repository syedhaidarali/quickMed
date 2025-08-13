/** @format */

import { adminStatsCard } from "../../assets/dummy";
import { useAdmin } from "../../context/AdminContext";
import React from "react";

const AdminStatsCards = ({ statistics }) => {
  const { hospitalStatistics } = useAdmin();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
      {adminStatsCard(statistics, hospitalStatistics).map((stat, index) => (
        <div
          key={index}
          className='bg-white rounded-lg shadow p-4'>
          <div className='flex items-center'>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${stat.bgColor} ${stat.textColor}`}>
              <span className='text-lg md:text-xl'>{stat.icon}</span>
            </div>
            <div className='ml-3'>
              <p className='text-xs font-medium text-gray-600'>{stat.title}</p>
              <p className='text-xl font-semibold text-gray-900'>
                {stat.count || 0}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;
