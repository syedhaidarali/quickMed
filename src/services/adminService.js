/** @format */

import { adminApi } from "../api/admin.api";

export const adminService = {
  validateToken: () => adminApi.validateToken(),

  login: (credentials) => adminApi.login(credentials),

  getAllDoctor: () => adminApi.getAllDoctor(),

  getPendingDoctors: () => {
    return adminApi.getPendingDoctors();
  },

  getPendingHospitals: () => {
    return adminApi.getPendingHospitals();
  },

  getApprovedDoctors: () => adminApi.getApprovedDoctors(),

  getApprovedHospitals: () => {
    return adminApi.getApprovedHospitals();
  },

  getRejectedDoctors: () => adminApi.getRejectedDoctors(),

  getRejectedHospitals: () => adminApi.getRejectedHospitals(),

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
