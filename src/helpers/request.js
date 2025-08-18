/** @format */

import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    request.defaults.headers["Authorization"] = `${token}`;
  }
}

export default request;
