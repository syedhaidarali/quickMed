/** @format */

import request from "../helpers/request";

export const adminApi = {
  validateToken: () => request.get("/admin/me"),

  login: (credentials) => request.post("/admin/login", credentials),

  getAllDoctor: () => request.get("/admin/doctors"),

  getPendingDoctors: () => request.get("/admin/doctors/pending"),

  getPendingHospitals: () => request.get("/admin/pending-hospitals"),

  getApprovedDoctors: () => request.get("/admin/doctors/verified"),

  getApprovedHospitals: () => request.get("/admin/approved-hospitals"),

  getRejectedDoctors: () => request.get("/admin/doctors/rejected"),

  getRejectedHospitals: () => request.get("/admin/rejected-hospitals"),

  getDoctorsStatistics: () => request.get("/admin/doctors/stats"),

  approveDoctor: (doctorId) =>
    request.post(`/admin/doctors/verification/${doctorId}`, {
      status: "verified",
    }),

  rejectDoctor: (doctorId) =>
    request.post(`/admin/doctors/verification/${doctorId}`, {
      status: "rejected",
    }),

  approveHospital: (hospitalId) =>
    request.post(`/admin/approve-hospital/${hospitalId}`),

  rejectHospital: (hospitalId, reason) =>
    request.post(`/admin/reject-hospital/${hospitalId}`, { reason }),

  doctorAction: (doctorId, action) =>
    request.post(`/admin/doctors/action/${doctorId}`, { action }),

  uploadDocuments: (data, doctorId) => {
    return request.post(`/admin/doctor/documents/${doctorId}`, data, {
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
};
