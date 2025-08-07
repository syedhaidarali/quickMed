/** @format */

import { adminApi } from "../api/admin.api";

export const adminService = {
  login: (credentials) => adminApi.login(credentials),

  getPendingDoctors: () => {
    return adminApi.getPendingDoctors();
  },

  getPendingHospitals: () => {
    return adminApi.getPendingHospitals();
  },

  getApprovedDoctors: () => {
    return adminApi.getApprovedDoctors();
  },

  getApprovedHospitals: () => {
    return adminApi.getApprovedHospitals();
  },

  approveDoctor: (doctorId) => {
    return adminApi.approveDoctor(doctorId);
  },

  rejectDoctor: (doctorId, reason) => {
    return adminApi.rejectDoctor(doctorId, reason);
  },

  approveHospital: (hospitalId) => {
    return adminApi.approveHospital(hospitalId);
  },

  rejectHospital: (hospitalId, reason) => {
    return adminApi.rejectHospital(hospitalId, reason);
  },
};
