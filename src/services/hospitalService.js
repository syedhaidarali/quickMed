/** @format */

import { hospitalApi } from "../api";

export const hospitalService = {
  validateToken: () => hospitalApi.validateToken(),

  signUp: (formData) => hospitalApi.signUp(formData),

  login: (credentials) => hospitalApi.login(credentials),

  forgotPassword: (data) => hospitalApi.forgotPassword(data),

  resetPassword: (data) => hospitalApi.resetPassword(data),

  changePassword: (data) => hospitalApi.changePassword(data),

  updateProfile: (hospitalId, profileData) => {
    const token = localStorage.getItem("token");
    return hospitalApi.updateProfile(hospitalId, profileData, token);
  },

  getProfile: (hospitalId) => {
    const token = localStorage.getItem("token");
    return hospitalApi.getProfile(hospitalId, token);
  },

  getAllPublicHospital: () => hospitalApi.getAllPublicHospital(),
};
