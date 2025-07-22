/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { services } from "../../assets/dummy";

const ServicesGrid = () => {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Common Health Conditions
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Find expert doctors for the most common health conditions and
            symptoms
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-center group'>
              <div className='text-3xl mb-3'>{service.icon}</div>
              <h3 className='text-sm font-medium text-gray-900 mb-2 group-hover:text-blue-600'>
                {service.title}
              </h3>
              <p className='text-xs text-gray-500'>{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
