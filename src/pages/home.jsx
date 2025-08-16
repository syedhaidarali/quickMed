/** @format */

import {
  DoctorSections,
  FeaturesSection,
  Hero,
  ServicesGrid,
  StatsSection,
  TestimonialSection,
} from "../components/homeSections";
import React from "react";

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
