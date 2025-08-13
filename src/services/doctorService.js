/** @format */

import { doctorApi } from "../api/doctor.api";

export const doctorService = {
  validateToken: () => doctorApi.validateToken(),

  signUp: (formData) => doctorApi.signUp(formData),

  login: (credentials) => doctorApi.login(credentials),

  updateProfile: (formData) => doctorApi.updateProfile(formData),

  uploadDocuments: (formData) => doctorApi.uploadDocuments(formData),

  updateDoctorProfile: (formData) => doctorApi.updateDoctorProfile(formData),
  getAllPublicDoctors: () => doctorApi.getAllPublicDoctors(),
};
