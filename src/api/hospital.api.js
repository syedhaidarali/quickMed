/** @format */

import request from "../helpers/request";

export const hospitalApi = {
  // signUp: (formData) => request.post("/hospital/signup", formData),
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

  updateProfile: (hospitalId, profileData) =>
    request.put(`/hospital/profile/${hospitalId}`, profileData),

  getProfile: (hospitalId) => request.get(`/hospital/profile/${hospitalId}`),
};
