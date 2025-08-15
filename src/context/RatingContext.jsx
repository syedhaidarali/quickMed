/** @format */

import { ratingService } from "../services/ratingService";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState([]);

  const getPlatformRatings = async () => {
    try {
      const response = await ratingService.getPlatformRatings();
      console.log(response.data.data);
      setRatings(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch ratings");
    }
  };

  const addDoctorRating = async (newRating, doctorId) => {
    console.log(newRating, doctorId);
    try {
      const response = await ratingService.addDoctorRating(newRating, doctorId);
      toast.success("Rating added!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add rating");
    }
  };
  const addPlatformRating = async (newRating) => {
    try {
      const response = await ratingService.addPlatformRating(newRating);
      toast.success("Rating added!");
    } catch (error) {
      toast.error("Failed to add rating");
    }
  };
  const updateDoctorRating = async (newRating) => {
    try {
      const response = await ratingService.updateDoctorRating(newRating);
      setRatings((prev) => [...prev, data]);
      toast.success("Rating added!");
    } catch (error) {
      toast.error("Failed to add rating");
    }
  };
  const updatePlatformRating = async (newRating) => {
    try {
      const response = await ratingService.setRatings(newRating);
      toast.success("Rating added!");
    } catch (error) {
      toast.error("Failed to add rating");
    }
  };
  const deleteDoctorRating = async (doctorId) => {
    try {
      const response = await ratingService.deleteDoctorRating();
      setRatings((prev) => [...prev, data]);
      toast.success("Rating added!");
    } catch (error) {
      toast.error("Failed to add rating");
    }
  };
  const deletePlatformRating = async () => {
    try {
      const response = await ratingService.deletePlatformRating();
      setRatings((prev) => [...prev, data]);
      toast.success("Rating added!");
    } catch (error) {
      toast.error("Failed to add rating");
    }
  };
  useEffect(() => {
    getPlatformRatings();
  }, []);

  return (
    <RatingContext.Provider
      value={{
        ratings,
        addDoctorRating,
        addPlatformRating,
      }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => useContext(RatingContext);
