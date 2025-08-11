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

  getDoctorsStatistics: () => adminApi.getDoctorsStatistics(),

  getRejectedHospitals: () => adminApi.getRejectedHospitals(),

  approveDoctor: (doctorId) => {
    return adminApi.approveDoctor(doctorId);
  },

  rejectDoctor: (doctorId) => {
    return adminApi.rejectDoctor(doctorId);
  },

  approveHospital: (hospitalId) => {
    return adminApi.approveHospital(hospitalId);
  },

  rejectHospital: (hospitalId, reason) => {
    return adminApi.rejectHospital(hospitalId, reason);
  },

  doctorAction: (doctorId, action) => adminApi.doctorAction(doctorId, action),
  uploadDocuments: (doctorDocuments, doctorId) =>
    adminApi.uploadDocuments(doctorDocuments, doctorId),

  doctorProfilePicture: (doctorId, data) =>
    adminApi.doctorProfilePicture(doctorId, data),
};
