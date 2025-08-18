/** @format */

import request from "../helpers/request";

export const authApi = {
  validateToken: () => request.get("/auth/me"),

  signInRequest: (data) => request.post("/auth/login", data),

  signUpRequest: (data) => request.post("/auth/signup", data),

  forgotPassword: (data) => request.post("/auth/forgot-password", data),

  resetPassword: (data) => request.post("/auth/reset-password", data),

  changePassword: (data) => request.post("/auth/change-password", data),

  singleUser: (userId) => request.get(`/auth/${userId}`),
};
