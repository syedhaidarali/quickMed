/** @format */

import React from "react";
import Hero from "../components/homeSections/Hero";
import ServicesGrid from "../components/homeSections/ServicesGrid";
import FeaturesSection from "../components/homeSections/FeaturesSection";
import StatsSection from "../components/homeSections/StatsSection";
import TestimonialSection from "../components/homeSections/TestimonialSection";
import DoctorSections from "../components/homeSections/DoctorSections";

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
