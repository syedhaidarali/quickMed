/** @format */
import React from "react";
import { useAuth, useDoctor, useHospital } from "../../context";

const StatsSection = () => {
  const { allDoctors } = useDoctor();
  const { allPublicHospital } = useHospital();
  const { allUsers } = useAuth();

  const dynamicStats = [
    {
      number: allDoctors?.length || 0, // Doctors length
      label: "Verified Doctors",
      description: "PMC verified doctors across Pakistan",
    },
    {
      number: allUsers.length || 0, // keep static
      label: "Happy Patients",
      description: "Patients served nationwide",
    },
    {
      number: allPublicHospital?.length || 0, // Hospitals length
      label: "Hospitals",
      description: "Partner hospitals and clinics",
    },
    {
      number: "24/7", // keep static
      label: "Support",
      description: "Round the clock customer support",
    },
  ];

  return (
    <section className='py-16 bg-emerald-700 text-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Trusted by Millions
          </h2>
          <p className='text-xl text-emerald-100'>
            Join Pakistan's largest healthcare community
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
          {dynamicStats.map((stat, index) => (
            <div
              key={index}
              className='bg-emerald-800 bg-opacity-80 rounded-xl shadow-md p-8 flex flex-col items-center transition-transform duration-200 hover:scale-105'>
              <div className='text-4xl md:text-5xl font-bold mb-2 text-emerald-200 drop-shadow'>
                {stat.number}
              </div>
              <h3 className='text-lg md:text-xl font-semibold mb-2 text-white'>
                {stat.label}
              </h3>
              <p className='text-emerald-100 text-sm md:text-base text-center'>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
