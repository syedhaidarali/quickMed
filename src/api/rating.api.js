/** @format */

import request from "../helpers/request";

export const ratingApi = {
  getPlatformRatings: () => request.get("/auth/platform-rating"),
  addDoctorRating: (newRating, doctorId) =>
    request.post(`/auth/doctor-rating/${doctorId}`, newRating),
  // getPlatformRatings: () => request.get(""),
};
