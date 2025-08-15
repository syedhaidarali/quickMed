/** @format */

import { ratingApi } from "../api/rating.api";

export const ratingService = {
  getPlatformRatings: () => ratingApi.getPlatformRatings(),

  addDoctorRating: (newRating, doctorId) =>
    ratingApi.addDoctorRating(newRating, doctorId),

  addPlatformRating: (newRating) => ratingApi.addPlatformRating(newRating),

  updateDoctorRating: (doctorId, newRating) => {
    return ratingApi.updateProfile(doctorId, newRating);
  },

  updatePlatformRating: (newRating) => {
    return ratingApi.updatePlatformRating(newRating);
  },

  deleteDoctorRating: (doctorId) => {
    return ratingApi.updatePlatformRating(doctorId);
  },
  deletePlatformRating: (doctorId) => {
    return ratingApi.updatePlatformRating(doctorId);
  },
};
