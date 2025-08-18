/** @format */

import request from "../helpers/request";

export const doctorApi = {
  validateToken: () => request.get("/doctor/me"),

  signUp: (formData) => request.post("/doctor/signup", formData),

  login: (credentials) => request.post("/doctor/login", credentials),

  forgotPassword: (data) => request.post("/doctor/forgot-password", data),

  resetPassword: (data) => request.post("/doctor/reset-password", data),

  changePassword: (data) => request.post("/doctor/change-password", data),

  updateProfile: (data) => {
    return request.post("/doctor/picture", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  uploadDocuments: (data) => {
    return request.post("/doctor/documents", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateDoctorProfile: (credentials) => request.put("/doctor", credentials),
  getAllPublicDoctors: () => request.get("/auth/doctors"),
  recommendationsApiSearch: (prompt) => request.post(""),
};
