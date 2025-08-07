/** @format */

import request from "../helpers/request";

export const adminApi = {
  validateToken: () => request.get("/admin/me"),

  login: (credentials) => request.post("/admin/login", credentials),

  getPendingDoctors: () => request.get("/admin/pending-doctors"),

  getPendingHospitals: () => request.get("/admin/pending-hospitals"),

  getApprovedDoctors: () => request.get("/admin/approved-doctors"),

  getApprovedHospitals: () => request.get("/admin/approved-hospitals"),

  approveDoctor: (doctorId) =>
    request.post(`/admin/approve-doctor/${doctorId}`),

  rejectDoctor: (doctorId, reason) =>
    request.post(`/admin/reject-doctor/${doctorId}`, { reason }),

  approveHospital: (hospitalId) =>
    request.post(`/admin/approve-hospital/${hospitalId}`),

  rejectHospital: (hospitalId, reason) =>
    request.post(`/admin/reject-hospital/${hospitalId}`, { reason }),
};
