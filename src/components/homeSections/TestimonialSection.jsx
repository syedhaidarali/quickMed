/** @format */

import React, { useState } from "react";
import { useAdmin, useAuth, useDoctor, useRating } from "../../context";
import ReviewModal from "../../modals/ReviewModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { TestimonialCard } from "../cards";

const TestimonialSection = () => {
  const {
    ratings,
    addPlatformRating,
    updatePlatformRating,
    deletePlatformRating,
    getPlatformRatings,
  } = useRating();
  const { user } = useAuth();
  const { admin } = useAdmin();
  const { doctor } = useDoctor();
  const [openRatingModal, setOpenRatingModal] = useState(false);

  const handleAddRating = async ({ rating, review }) => {
    await addPlatformRating({ rating: rating, description: review });
    await getPlatformRatings();
    setOpenRatingModal(false);
  };

  const handleUpdateRating = async ({ rating, review }) => {
    await updatePlatformRating({ rating, review });
    await getPlatformRatings();
    setOpenRatingModal(false);
  };

  const handleDeleteRating = async () => {
    await deletePlatformRating();
    await getPlatformRatings();
    setOpenRatingModal(false);
  };
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
        </div>

        {/* Carousel for testimonials */}
        <div className='relative max-w-6xl mx-auto mb-8'>
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: false,
              containScroll: "trimSnaps",
            }}
            className='w-full'>
            <CarouselContent className='-ml-4 md:-ml-6'>
              {ratings.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className='pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3'>
                  <div className='p-2'>
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-4 md:left-6 bg-white/80 hover:bg-white border-2 border-emerald-200 hover:border-emerald-300 shadow-lg' />
            <CarouselNext className='right-4 md:right-6 bg-white/80 hover:bg-white border-2 border-emerald-200 hover:border-emerald-300 shadow-lg' />
          </Carousel>

          {/* Carousel indicators */}
          <div className='flex justify-center mt-6 space-x-2'>
            {ratings.map((_, index) => (
              <div
                key={index}
                className='w-2 h-2 rounded-full bg-emerald-300 hover:bg-emerald-500 transition-colors cursor-pointer'
              />
            ))}
          </div>

          {/* Carousel instructions */}
          <div className='text-center mt-4'>
            <p className='text-sm text-emerald-600'>
              💡 Swipe or use arrows to navigate • Click indicators to jump to
              specific reviews
            </p>
          </div>
        </div>

        {/* Platform Rating Button */}
        <div className='text-center'>
          <ReviewModal
            trigger={
              (user || admin || doctor) && (
                <Button
                  variant='default'
                  size='lg'
                  className='bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'>
                  Rate Our Platform
                </Button>
              )
            }
            open={openRatingModal}
            onOpenChange={setOpenRatingModal}
            mode='rating-and-review'
            onSubmit={handleAddRating}
            onUpdate={handleUpdateRating}
            onDelete={handleDeleteRating}
            title='Rate Our Platform'
            description='Your feedback helps us improve QuickMed for everyone. Rate your overall experience with our healthcare platform, including ease of use, features, and service quality.'
            submitLabel='Submit Rating'
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
