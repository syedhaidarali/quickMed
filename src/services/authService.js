/** @format */

import { authApi } from "../api";

export const authService = {
  validateToken: () => authApi.validateToken(),

  signInRequest: (data) => authApi.signInRequest(data),

  signUpRequest: (data) => authApi.signUpRequest(data),

  forgotPassword: (data) => authApi.forgotPassword(data),

  resetPassword: (data) => authApi.resetPassword(data),

  changePassword: (data) => authApi.changePassword(data),

  singleUser: (userId) => authApi.singleUser(userId),
};
