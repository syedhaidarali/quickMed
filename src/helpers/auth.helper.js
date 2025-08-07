/** @format */

export const setHeaders = (token) => {
  localStorage.setItem("token", token);
};

export const getHeaders = () => {
  return localStorage.getItem("token");
};

export const removeHeaders = () => {
  return localStorage.removeItem("token");
};
