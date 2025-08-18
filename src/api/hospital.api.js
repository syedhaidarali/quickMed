/** @format */

import request from "../helpers/request";

export const hospitalApi = {
  validateToken: () => request.post("/hospital/me", formData),

  signUp: (formData) => {
    return request.post("/hospital/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  login: (credentials) => {
    console.log(credentials, "sssssssssssssssss");
    return request.post("/hospital/login", credentials);
  },

  forgotPassword: (data) => request.post("/hospital/forgot-password", data),

  resetPassword: (data) => request.post("/hospital/reset-password", data),

  changePassword: (data) => request.post("/hospital/change-password", data),

  updateProfile: (hospitalId, profileData) =>
    request.put(`/hospital/profile/${hospitalId}`, profileData),

  getProfile: (hospitalId) => request.get(`/hospital/profile/${hospitalId}`),

  getAllPublicHospital: () => request.get("/auth/hospitals"),
};
