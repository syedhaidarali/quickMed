/** @format */

import { ratingApi } from "../api";

export const ratingService = {
  getPlatformRatings: () => ratingApi.getPlatformRatings(),

  addDoctorRating: (newRating, doctorId) =>
    ratingApi.addDoctorRating(newRating, doctorId),

  addPlatformRating: (newRating) => ratingApi.addPlatformRating(newRating),

  updateDoctorRating: (doctorId, newRating) => {
    return ratingApi.updateDoctorRating(doctorId, newRating);
  },

  updatePlatformRating: (newRating) => {
    return ratingApi.updatePlatformRating(newRating);
  },

  deleteDoctorRating: (doctorId) => {
    return ratingApi.deleteDoctorRating(doctorId);
  },
  deletePlatformRating: () => {
    return ratingApi.deletePlatformRating();
  },
};
