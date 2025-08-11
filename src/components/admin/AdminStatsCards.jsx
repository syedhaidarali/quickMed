/** @format */

import React from "react";

const AdminStatsCards = ({ statistics }) => {
  console.log(statistics, "sssssssssssssssssssssssss");
  const stats = [
    {
      title: "Total Doctors",
      count: statistics?.total,
      icon: "👨‍⚕️",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Pending Doctor Reviews",
      count: statistics?.pending,
      icon: "⏳",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      title: "Approved Doctors",
      count: statistics?.verified,
      icon: "✅",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Rejected Doctors",
      count: statistics?.rejected,
      icon: "❌",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    // {
    //   title: "Active Payments",
    //   count: statistics?.active,
    //   icon: "💰",
    //   bgColor: "bg-emerald-100",
    //   textColor: "text-emerald-600",
    // },
    // {
    //   title: "Inactive Payments",
    //   count: statistics?.inactive,
    //   icon: "⚠️",
    //   bgColor: "bg-orange-100",
    //   textColor: "text-orange-600",
    // },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
      {stats.map((stat, index) => (
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
