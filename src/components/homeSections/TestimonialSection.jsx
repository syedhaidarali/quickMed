/** @format */

import React from "react";
import { testimonials } from "../../assets/dummy";
import { useRating } from "../../context/RatingContext";
import TestimonialCard from "../cards/testimonialCard";

const TestimonialSection = () => {
  const { ratings } = useRating();
  console.log(ratings, "ratings");
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
          {ratings.map((testimonial, index) => (
            <TestimonialCard
              testimonial={testimonial}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
