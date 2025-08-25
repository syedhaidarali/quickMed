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
      setRatings(response.data.data);
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };

  const addDoctorRating = async (newRating, doctorId, onLocalUpdate) => {
    try {
      const response = await ratingService.addDoctorRating(newRating, doctorId);
      const serverRating = response?.data?.data?.rating ?? null;
      if (onLocalUpdate && serverRating !== null) {
        onLocalUpdate(serverRating);
      }

      toast.success("Rating added!");
    } catch (error) {
      if (error.response?.data?.data === "You have already rated this doctor") {
        toast.error(
          "You've already rated this doctor. Update or delete instead."
        );
      }
    }
  };
  const addPlatformRating = async (newRating) => {
    try {
      await ratingService.addPlatformRating(newRating);
      toast.success("Rating added!");
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };
  const updateDoctorRating = async (newRating, doctorId, onLocalUpdate) => {
    try {
      const response = await ratingService.updateDoctorRating(
        doctorId,
        newRating
      );
      const serverRating = response?.data?.data?.rating ?? null;

      if (onLocalUpdate && serverRating !== null) {
        onLocalUpdate(serverRating);
      }

      toast.success("Rating Updated Successfully!");
    } catch (error) {
      toast.error(error.response?.data?.data);
    }
  };

  const updatePlatformRating = async (newRating) => {
    try {
      await ratingService.updatePlatformRating(newRating);
      toast.success("Platform Rating Updated Successfully!");
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };
  const deleteDoctorRating = async (doctorId, onLocalUpdate) => {
    try {
      const response = await ratingService.deleteDoctorRating(doctorId);
      const serverRating = response?.data?.data?.rating ?? null;
      if (onLocalUpdate && serverRating !== null) {
        onLocalUpdate(serverRating);
      }

      toast.success("Rating Deleted !");
    } catch (error) {
      toast.error(error.response?.data?.data);
    }
  };
  const deletePlatformRating = async () => {
    try {
      await ratingService.deletePlatformRating();
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
