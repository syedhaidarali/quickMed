/** @format */

import request from "../helpers/request";

export const adminApi = {
  validateToken: () => request.get("/admin/me"),

  login: (credentials) => request.post("/admin/login", credentials),

  getAllDoctor: () => request.get("/admin/doctors"),

  getPendingDoctors: () => request.get("/admin/doctors/pending"),

  getPendingHospitals: () => request.get("/admin/hospitals/pending"),

  getApprovedDoctors: () => request.get("/admin/doctors/verified"),

  getApprovedHospitals: () => request.get("/admin/hospitals/verified"),

  getRejectedDoctors: () => request.get("/admin/doctors/rejected"),

  getRejectedHospitals: () => request.get("/admin/hospitals/rejected"),

  getDoctorsStatistics: () => request.get("/admin/doctors/stats"),

  getHospitalStatistics: () => request.get("/admin/hospitals/stats"),

  approveDoctor: (doctorId) =>
    request.post(`/admin/doctors/verification/${doctorId}`, {
      status: "verified",
    }),

  rejectDoctor: (doctorId) =>
    request.post(`/admin/doctors/verification/${doctorId}`, {
      status: "rejected",
    }),

  approveHospital: (hospitalId) =>
    request.post(`/admin/hospitals/verification/${hospitalId}`, {
      status: "verified",
    }),

  rejectHospital: (hospitalId, reason) =>
    request.post(`/admin/hospitals/verification/${hospitalId}`, {
      status: "rejected",
      reason,
    }),

  doctorAction: (doctorId, action) =>
    request.post(`/admin/doctors/action/${doctorId}`, { action }),

  hospitalAction: (hospitalId, action) =>
    request.post(`/admin/hospitals/action/${hospitalId}`, { action }),

  uploadDocuments: (data, doctorId) => {
    return request.post(`/admin/doctor/documents/${doctorId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadHospitalsDocuments: (data, hospitalId) => {
    return request.post(`/admin/hospitals/documents/${hospitalId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  doctorProfilePicture: (doctorId, data) => {
    return request.post(`/admin/doctor/picture/${doctorId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  hospitalProfilePicture: (hospitalId, data) => {
    return request.post(`/admin/hospital/picture/${hospitalId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateDoctorDetails: (doctorId, data) =>
    request.put(`/admin/doctor/${doctorId}`, data),
};
