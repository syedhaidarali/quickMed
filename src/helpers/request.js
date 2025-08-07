/** @format */

import axios from "axios";

const request = axios.create({
  baseURL: "https://quickmedpk-87e7d3c6e100.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  console.log(token);

  if (token) {
    request.defaults.headers["Authorization"] = `${token}`;
  }
}

export default request;
