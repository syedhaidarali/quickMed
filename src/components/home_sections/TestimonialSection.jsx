/** @format */

import React from "react";
import { testimonials } from "../../assets/dummy";

const TestimonialSection = () => {
  return (
    <section className='py-16 bg-emerald-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-emerald-900 mb-4'>
            What Our Patients Say
          </h2>
          <p className='text-lg text-emerald-700 max-w-2xl mx-auto'>
            Read reviews from thousands of satisfied patients across Pakistan
          </p>
          <div className='flex items-center justify-center mt-4'>
            <div className='flex items-center'>
              <span className='text-yellow-500 text-2xl'>★★★★★</span>
              <span className='ml-2 text-lg font-semibold text-emerald-900'>
                4.5
              </span>
              <span className='ml-1 text-emerald-700'>out of 5</span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='bg-white rounded-xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between'>
              <div className='flex items-center mb-4'>
                <div className='w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl border-2 border-emerald-200 shadow-sm'>
                  {testimonial.name.charAt(0)}
                </div>
                <div className='ml-4'>
                  <h3 className='font-semibold text-emerald-900'>
                    {testimonial.name}
                  </h3>
                  <div className='flex items-center'>
                    <div className='flex text-yellow-500'>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < testimonial.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className='text-emerald-800 mb-4 italic text-base'>
                "{testimonial.review}"
              </p>

              <div className='flex items-center justify-between mt-auto'>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                    testimonial.status === "Good"
                      ? "bg-emerald-100 text-emerald-800"
                      : testimonial.status === "Satisfied"
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                  {testimonial.status}
                </span>
                <span className='text-sm text-emerald-500 font-medium'>
                  Verified Patient
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
