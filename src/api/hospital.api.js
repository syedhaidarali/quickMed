/** @format */

import request from "../helpers/request";

export const hospitalApi = {
  signUp: (formData) => request.post("/hospital/signup", formData),

  login: (credentials) => request.post("/hospital/login", credentials),

  updateProfile: (hospitalId, profileData) =>
    request.put(`/hospital/profile/${hospitalId}`, profileData),

  getProfile: (hospitalId) => request.get(`/hospital/profile/${hospitalId}`),
};
