/** @format */

import { userApi } from "../api/user.api";

export const userService = {
  signUp: (formData) => userApi.signUp(formData),

  login: (credentials) => userApi.login(credentials),

  getProfile: (userId) => userApi.getProfile(userId),

  // Public endpoints
  getAllDoctors: () => userApi.getAllDoctors(),

  getAllHospitals: () => userApi.getAllHospitals(),

  getDoctorById: (doctorId) => userApi.getDoctorById(doctorId),

  getHospitalById: (hospitalId) => userApi.getHospitalById(hospitalId),

  searchDoctors: (query) => userApi.searchDoctors(query),

  searchHospitals: (query) => userApi.searchHospitals(query),
};
