/** @format */

import request from "../helpers/request";

export const userApi = {
  signUp: (formData) => request.post("/user/signup", formData),

  login: (credentials) => request.post("/user/login", credentials),

  getProfile: (userId) => request.get(`/user/profile/${userId}`),

  // Public endpoints (no auth required)
  getAllDoctors: () => request.get("/public/doctors"),

  getAllHospitals: () => request.get("/public/hospitals"),

  getDoctorById: (doctorId) => request.get(`/public/doctor/${doctorId}`),

  getHospitalById: (hospitalId) =>
    request.get(`/public/hospital/${hospitalId}`),

  searchDoctors: (query) =>
    request.get(`/public/search/doctors?q=${encodeURIComponent(query)}`),

  searchHospitals: (query) =>
    request.get(`/public/search/hospitals?q=${encodeURIComponent(query)}`),
};
