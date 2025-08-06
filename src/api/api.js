/** @format */

import postDataToAPI, { getDataFromAPI } from "../helpers/PostHelper";

// Base URL for the backend API
const BASE_URL = "https://quickmedpk-87e7d3c6e100.herokuapp.com"; // Adjust this to your backend URL

// Doctor API endpoints
export const SignUpDoctor = (formData) =>
  postDataToAPI(`${BASE_URL}/doctor/signup`, formData);

export const DoctorLogin = (credentials) =>
  postDataToAPI(`${BASE_URL}/doctor/login`, credentials);

export const DoctorDocumentUploadApi = (credentials) =>
  postDataToAPI(`${BASE_URL}/doctor/documents`, credentials);

export const UpdateDoctorProfile = (doctorId, profileData, token) =>
  postDataToAPI(`${BASE_URL}/doctor/profile/${doctorId}`, profileData, token);

export const GetDoctorProfile = (doctorId, token) =>
  getDataFromAPI(`${BASE_URL}/doctor/profile/${doctorId}`, token);

// Hospital API endpoints
export const SignUpHospital = (formData) =>
  postDataToAPI(`${BASE_URL}/hospital/signup`, formData);

export const HospitalLogin = (credentials) =>
  postDataToAPI(`${BASE_URL}/hospital/login`, credentials);

export const UpdateHospitalProfile = (hospitalId, profileData, token) =>
  postDataToAPI(
    `${BASE_URL}/hospital/profile/${hospitalId}`,
    profileData,
    token
  );

export const GetHospitalProfile = (hospitalId, token) =>
  getDataFromAPI(`${BASE_URL}/hospital/profile/${hospitalId}`, token);

// Admin API endpoints
export const AdminLogin = (credentials) =>
  postDataToAPI(`${BASE_URL}/admin/login`, credentials);

export const GetPendingDoctors = (token) =>
  getDataFromAPI(`${BASE_URL}/admin/pending-doctors`, token);

export const GetPendingHospitals = (token) =>
  getDataFromAPI(`${BASE_URL}/admin/pending-hospitals`, token);

export const GetApprovedDoctors = (token) =>
  getDataFromAPI(`${BASE_URL}/admin/approved-doctors`, token);

export const GetApprovedHospitals = (token) =>
  getDataFromAPI(`${BASE_URL}/admin/approved-hospitals`, token);

export const ApproveDoctor = (doctorId, token) =>
  postDataToAPI(`${BASE_URL}/admin/approve-doctor/${doctorId}`, {}, token);

export const RejectDoctor = (doctorId, reason, token) =>
  postDataToAPI(
    `${BASE_URL}/admin/reject-doctor/${doctorId}`,
    { reason },
    token
  );

export const ApproveHospital = (hospitalId, token) =>
  postDataToAPI(`${BASE_URL}/admin/approve-hospital/${hospitalId}`, {}, token);

export const RejectHospital = (hospitalId, reason, token) =>
  postDataToAPI(
    `${BASE_URL}/admin/reject-hospital/${hospitalId}`,
    { reason },
    token
  );

// User API endpoints
export const UserSignUp = (formData) =>
  postDataToAPI(`${BASE_URL}/user/signup`, formData);

export const UserLogin = (credentials) =>
  postDataToAPI(`${BASE_URL}/user/login`, credentials);

export const GetUserProfile = (userId, token) =>
  getDataFromAPI(`${BASE_URL}/user/profile/${userId}`, token);

// Public API endpoints (no authentication required)
export const GetAllDoctors = () => getDataFromAPI(`${BASE_URL}/public/doctors`);

export const GetAllHospitals = () =>
  getDataFromAPI(`${BASE_URL}/public/hospitals`);

export const GetDoctorById = (doctorId) =>
  getDataFromAPI(`${BASE_URL}/public/doctor/${doctorId}`);

export const GetHospitalById = (hospitalId) =>
  getDataFromAPI(`${BASE_URL}/public/hospital/${hospitalId}`);

export const SearchDoctors = (query) =>
  getDataFromAPI(
    `${BASE_URL}/public/search/doctors?q=${encodeURIComponent(query)}`
  );

export const SearchHospitals = (query) =>
  getDataFromAPI(
    `${BASE_URL}/public/search/hospitals?q=${encodeURIComponent(query)}`
  );
