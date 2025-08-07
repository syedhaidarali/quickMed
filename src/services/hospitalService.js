/** @format */

import { hospitalApi } from "../api/hospital.api";

export const hospitalService = {
  signUp: (formData) => hospitalApi.signUp(formData),

  login: (credentials) => hospitalApi.login(credentials),

  updateProfile: (hospitalId, profileData) => {
    const token = localStorage.getItem("token");
    return hospitalApi.updateProfile(hospitalId, profileData, token);
  },

  getProfile: (hospitalId) => {
    const token = localStorage.getItem("token");
    return hospitalApi.getProfile(hospitalId, token);
  },

  // Admin functions
  getPendingHospitals: () => {
    const token = localStorage.getItem("token");
    return hospitalApi.getPendingHospitals(token);
  },

  getApprovedHospitals: () => {
    const token = localStorage.getItem("token");
    return hospitalApi.getApprovedHospitals(token);
  },

  approveHospital: (hospitalId) => {
    const token = localStorage.getItem("token");
    return hospitalApi.approveHospital(hospitalId, token);
  },

  rejectHospital: (hospitalId, reason) => {
    const token = localStorage.getItem("token");
    return hospitalApi.rejectHospital(hospitalId, reason, token);
  },
};
