/** @format */

import { authApi } from "../api/auth.api";

export const authService = {
  validateToken: () => authApi.validateToken(),

  signInRequest: (data) => authApi.signInRequest(data),

  signUpRequest: (data) => authApi.signUpRequest(data),

  forgotPassword: (data) => authApi.forgotPassword(data),

  resetPassword: (data) => authApi.resetPassword(data),

  singleUser: (userId) => authApi.singleUser(userId),
};
