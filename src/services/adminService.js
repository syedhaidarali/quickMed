/** @format */

import { adminApi } from "../api/admin.api";

export const adminService = {
  validateToken: () => adminApi.validateToken(),

  login: (credentials) => adminApi.login(credentials),

  getAllDoctor: () => adminApi.getAllDoctor(),

  getPendingDoctors: () => {
    return adminApi.getPendingDoctors();
  },

  getPendingHospitals: () => adminApi.getPendingHospitals(),

  getApprovedDoctors: () => adminApi.getApprovedDoctors(),

  getApprovedHospitals: () => adminApi.getApprovedHospitals(),

  getRejectedDoctors: () => adminApi.getRejectedDoctors(),

  getDoctorsStatistics: () => adminApi.getDoctorsStatistics(),

  getHospitalStatistics: () => adminApi.getHospitalStatistics(),

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

  hospitalAction: (hospitalId, action) =>
    adminApi.hospitalAction(hospitalId, action),

  uploadDocuments: (doctorDocuments, doctorId) =>
    adminApi.uploadDocuments(doctorDocuments, doctorId),

  uploadHospitalsDocuments: (hospitalDocuments, hospitalId) =>
    adminApi.uploadHospitalsDocuments(hospitalDocuments, hospitalId),

  doctorProfilePicture: (doctorId, data) =>
    adminApi.doctorProfilePicture(doctorId, data),
  hospitalProfilePicture: (hospitalId, data) =>
    adminApi.hospitalProfilePicture(hospitalId, data),
  updateDoctorDetails: (doctorId, data) =>
    adminApi.updateDoctorDetails(doctorId, data),
};
