/** @format */

import { ratingService } from "../services";
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
      console.log(error);
      // toast.error("Failed to fetch ratings");
    }
  };

  const addDoctorRating = async (newRating, doctorId) => {
    console.log(newRating, doctorId);
    try {
      const response = await ratingService.addDoctorRating(newRating, doctorId);
      console.log(response, "response");
      toast.success("Rating added!");
    } catch (error) {
      if (error.response.data.data === "You have already rated this doctor") {
        toast.error(
          "You’ve already rated this doctor. Update or delete instead."
        );
      }
    }
  };
  const addPlatformRating = async (newRating) => {
    try {
      const response = await ratingService.addPlatformRating(newRating);
      toast.success("Rating added!");
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };
  const updateDoctorRating = async (newRating, doctorId) => {
    try {
      const response = await ratingService.updateDoctorRating(
        doctorId,
        newRating
      );
      console.log(response, "response");
      toast.success("Rating Updated Successfully!");
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };
  const updatePlatformRating = async (newRating) => {
    try {
      const response = await ratingService.updatePlatformRating(newRating);
      toast.success("Platform Rating Updated Successfully!");
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };
  const deleteDoctorRating = async (doctorId) => {
    try {
      const response = await ratingService.deleteDoctorRating(doctorId);
      // setRatings((prev) => [...prev, data]);
      toast.success("Rating Deleted !");
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };
  const deletePlatformRating = async () => {
    try {
      const response = await ratingService.deletePlatformRating();
      toast.success("Rating Deleted Successfully");
    } catch (error) {
      toast.error(err.response.data.data);
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
        updateDoctorRating,
        deleteDoctorRating,
        updatePlatformRating,
        deletePlatformRating,
        getPlatformRatings,
      }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => useContext(RatingContext);
