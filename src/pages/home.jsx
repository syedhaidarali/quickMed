/** @format */

import React from "react";
import Hero from "../components/home_sections/Hero";
import ServicesGrid from "../components/home_sections/ServicesGrid";
import FeaturesSection from "../components/home_sections/FeaturesSection";
import StatsSection from "../components/home_sections/StatsSection";
import TestimonialSection from "../components/home_sections/TestimonialSection";
import DoctorSections from "../components/home_sections/DoctorSections";

const Home = () => {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <FeaturesSection />
      <DoctorSections />
      <StatsSection />
      <TestimonialSection />
    </main>
  );
};

export default Home;
