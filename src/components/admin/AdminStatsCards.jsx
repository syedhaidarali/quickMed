/** @format */

import React from "react";

const AdminStatsCards = ({ pendingCount, approvedCount, totalCount }) => {
  const stats = [
    {
      title: "Pending Reviews",
      count: pendingCount,
      icon: "⏳",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      title: "Approved Doctors",
      count: approvedCount,
      icon: "✅",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Total Doctors",
      count: totalCount,
      icon: "👨‍⚕️",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
      {stats.map((stat, index) => (
        <div key={index} className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center'>
            <div className={`p-3 rounded-full ${stat.bgColor} ${stat.textColor}`}>
              <span className='text-2xl'>{stat.icon}</span>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>{stat.title}</p>
              <p className='text-2xl font-semibold text-gray-900'>{stat.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards; 