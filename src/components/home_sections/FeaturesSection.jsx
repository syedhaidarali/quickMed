/** @format */

import React from "react";
import { features } from "../../assets/dummy";

const FeaturesSection = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Why Choose Marham?
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Pakistan's most trusted healthcare platform with verified doctors
            and secure services
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='text-center'>
              <div className='text-4xl mb-4'>{feature.icon}</div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                {feature.title}
              </h3>
              <p className='text-gray-600 mb-3'>{feature.description}</p>
              <div className='inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                {feature.stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
