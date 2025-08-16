/** @format */
import React from "react";

const StatusPill = ({ level }) => {
  const map = {
    excellent: "bg-emerald-100 text-emerald-800",
    good: "bg-amber-100 text-amber-800",
    fair: "bg-sky-100 text-sky-800",
    poor: "bg-rose-100 text-rose-800",
    default: "bg-gray-100 text-gray-800",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
        map[(level || "").toLowerCase() || "default"]
      }`}
      aria-label={`Satisfaction: ${level}`}>
      <span className='w-2 h-2 rounded-full bg-current opacity-80' />
      {level}
    </span>
  );
};

const Star = ({ filled }) => (
  <svg
    viewBox='0 0 20 20'
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill='currentColor'
    aria-hidden='true'>
    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
  </svg>
);

const TestimonialCard = ({ testimonial }) => {
  const {
    name = "Anonymous",
    rating = 5,
    description = "",
    avatar,
    satisfactionLevel = "Excellent",
  } = testimonial || {};

  return (
    <article
      className='bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 max-w-md mx-auto flex flex-col h-full min-h-[280px]'
      aria-label={`Testimonial from ${name}`}>
      {/* quote icon */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-4'>
          {/* avatar */}
          {avatar ? (
            <img
              src={avatar}
              alt={`${name} avatar`}
              className='w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm'
              loading='lazy'
            />
          ) : (
            <div className='w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center'>
              <span className='text-emerald-600 font-semibold text-lg'>
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* name & rating */}
          <div>
            <h3 className='text-sm sm:text-base font-semibold text-emerald-900'>
              {name}
            </h3>
            <div className='flex items-center gap-2 mt-1'>
              <div className='flex -space-x-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    filled={i < Math.round(rating)}
                  />
                ))}
              </div>
              <span className='text-xs text-gray-500 font-medium'>
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* testimonial body */}
      <blockquote className='relative text-gray-800 italic text-sm sm:text-base mb-6 flex-grow'>
        <span
          className='absolute -top-4 -left-3 text-4xl text-emerald-100'
          aria-hidden='true'>
          "
        </span>
        <p className='pl-4'>
          {description ? (
            description
          ) : (
            <span className='text-gray-400 italic'>
              "Great experience with QuickMed platform!"
            </span>
          )}
        </p>
      </blockquote>

      {/* status pill */}
      <div className='mt-auto'>
        <StatusPill level={satisfactionLevel} />
      </div>
    </article>
  );
};

export default TestimonialCard;
