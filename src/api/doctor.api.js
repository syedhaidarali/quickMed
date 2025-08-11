/** @format */

import request from "../helpers/request";

export const doctorApi = {
  validateToken: () => request.get("/doctor/me"),

  signUp: (formData) => request.post("/doctor/signup", formData),

  login: (credentials) => request.post("/doctor/login", credentials),

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
};
