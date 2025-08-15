/** @format */

import request from "./request";

export const setHeaders = (token) => {
  if (!token) return;
  const auth = token;
  localStorage.setItem("token", token);
  request.defaults.headers.common["Authorization"] = auth;
};
export const getHeaders = () => {
  return localStorage.getItem("token");
};

export const removeHeaders = () => {
  return localStorage.removeItem("token");
};
