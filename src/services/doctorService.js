/** @format */

import { doctorApi } from "../api/doctor.api";

export const doctorService = {
  signUp: (formData) => doctorApi.signUp(formData),

  login: (credentials) => doctorApi.login(credentials),

  updateProfile: (formData) => doctorApi.updateProfile(formData),

  uploadDocuments: (formData) => doctorApi.uploadDocuments(formData),
};
