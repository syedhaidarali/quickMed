/** @format */
import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx"; // Create this if not present
import {
  Home,
  Login,
  DoctorLogin,
  AdminLogin,
  AdminDashboard,
  Register,
  AllDoctors,
  AllHospitals,
  AllLabs,
  AllMedicines,
  DoctorDetail,
  HospitalDetail,
  MedicineDetail,
  LabDetail,
  JoinAsDoctor,
  JoinAsHospital,
  DoctorProfile,
  BookNow,
  HospitalDoctors,
  BookAppointmentHospital,
  DoctorDocumentUpload,
} from "./pages/pages.js";

const AppRoutes = () => (
  <Routes>
    {/* Main layout for most pages */}
    <Route element={<AppLayout />}>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/doctors'
        element={<AllDoctors />}
      />
      <Route
        path='/hospitals'
        element={<AllHospitals />}
      />
      <Route
        path='/labs'
        element={<AllLabs />}
      />
      <Route
        path='/medicines'
        element={<AllMedicines />}
      />
      <Route
        path='/doctor/:slug'
        element={<DoctorDetail />}
      />
      <Route
        path='/hospitals/:slug'
        element={<HospitalDetail />}
      />
      <Route
        path='/medicine/:slug'
        element={<MedicineDetail />}
      />
      <Route
        path='/lab/:slug'
        element={<LabDetail />}
      />
      <Route
        path='/register/doctor'
        element={<JoinAsDoctor />}
      />
      <Route
        path='/register/hospital'
        element={<JoinAsHospital />}
      />
      <Route
        path='/doctor/profile/:slug'
        element={<DoctorProfile />}
      />
      <Route
        path='/doctor/book/:slug'
        element={<BookNow />}
      />
      <Route
        path='/hospitals/:slug/doctors'
        element={<HospitalDoctors />}
      />
      <Route
        path='/hospitals/:slug/book'
        element={<BookAppointmentHospital />}
      />
      <Route
        path='/admin/dashboard'
        element={<AdminDashboard />}
      />
    </Route>
    {/* Auth layout for login/register */}
    <Route element={<AuthLayout />}>
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/doctor/login'
        element={<DoctorLogin />}
      />
      <Route
        path='/doctor/upload-documents'
        element={<DoctorDocumentUpload />}
      />
      <Route
        path='/admin/login'
        element={<AdminLogin />}
      />
      <Route
        path='/register'
        element={<Register />}
      />
    </Route>
  </Routes>
);

export default AppRoutes;
