/** @format */

import request from "../helpers/request";

export const ratingApi = {
  getPlatformRatings: () => request.get("/auth/platform-rating"),

  addDoctorRating: (newRating, doctorId) =>
    request.post(`/auth/doctor-rating/${doctorId}`, newRating),

  addPlatformRating: (newRating) => {
    return request.post(`/auth/platform-rating`, newRating);
  },

  updateDoctorRating: (doctorId, newRating) =>
    request.put(`/auth/doctor-rating/${doctorId}`, newRating),

  deleteDoctorRating: (doctorId) =>
    request.delete(`/auth/doctor-rating/${doctorId}`),

  updatePlatformRating: (newRating) =>
    request.put(`/auth/platform-rating`, newRating),

  deletePlatformRating: () => request.delete(`/auth/platform-rating`),
};
