/** @format */
import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutWrapper from "./layout/LayoutWrapper.jsx";
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
  Shop,
  JoinAsDoctor,
  DoctorProfile,
  BookNow,
  HospitalDoctors,
  BookAppointmentHospital,
} from "./pages/pages.js";

const AppRoutes = () => (
  <Routes>
    <Route
      path='/'
      element={
        <LayoutWrapper>
          <Home />
        </LayoutWrapper>
      }
    />
    <Route
      path='/login'
      element={
        <LayoutWrapper layout='auth'>
          <Login />
        </LayoutWrapper>
      }
    />
    <Route
      path='/doctor/login'
      element={
        <LayoutWrapper layout='auth'>
          <DoctorLogin />
        </LayoutWrapper>
      }
    />
    <Route
      path='/admin/login'
      element={
        <LayoutWrapper layout='auth'>
          <AdminLogin />
        </LayoutWrapper>
      }
    />
    <Route
      path='/admin/dashboard'
      element={
        <LayoutWrapper>
          <AdminDashboard />
        </LayoutWrapper>
      }
    />
    <Route
      path='/register'
      element={
        <LayoutWrapper layout='auth'>
          <Register />
        </LayoutWrapper>
      }
    />
    {/* All doctors, hospitals, labs, medicines */}
    <Route
      path='/doctors'
      element={
        <LayoutWrapper>
          <AllDoctors />
        </LayoutWrapper>
      }
    />
    <Route
      path='/hospitals'
      element={
        <LayoutWrapper>
          <AllHospitals />
        </LayoutWrapper>
      }
    />
    <Route
      path='/labs'
      element={
        <LayoutWrapper>
          <AllLabs />
        </LayoutWrapper>
      }
    />
    <Route
      path='/medicines'
      element={
        <LayoutWrapper>
          <AllMedicines />
        </LayoutWrapper>
      }
    />
    {/* Doctor details by slug */}
    <Route
      path='/doctor/:slug'
      element={
        <LayoutWrapper>
          <DoctorDetail />
        </LayoutWrapper>
      }
    />
    {/* Hospital details by slug */}
    <Route
      path='/hospitals/:slug'
      element={
        <LayoutWrapper>
          <HospitalDetail />
        </LayoutWrapper>
      }
    />
    {/* Medicine details by slug */}
    <Route
      path='/medicine/:slug'
      element={
        <LayoutWrapper>
          <MedicineDetail />
        </LayoutWrapper>
      }
    />
    {/* Lab details by slug */}
    <Route
      path='/lab/:slug'
      element={
        <LayoutWrapper>
          <LabDetail />
        </LayoutWrapper>
      }
    />

    {/* Shop */}
    <Route
      path='/shop'
      element={
        <LayoutWrapper>
          <Shop />
        </LayoutWrapper>
      }
    />
    {/* Join as Doctor */}
    <Route
      path='/register/doctor'
      element={
        <LayoutWrapper>
          <JoinAsDoctor />
        </LayoutWrapper>
      }
    />
    <Route
      path='/doctor/profile/:slug'
      element={
        <LayoutWrapper>
          <DoctorProfile />
        </LayoutWrapper>
      }
    />
    <Route
      path='/doctor/book/:slug'
      element={
        <LayoutWrapper>
          <BookNow />
        </LayoutWrapper>
      }
    />
    <Route
      path='/hospitals/:slug/doctors'
      element={
        <LayoutWrapper>
          <HospitalDoctors />
        </LayoutWrapper>
      }
    />
    <Route
      path='/hospitals/:slug/book'
      element={
        <LayoutWrapper>
          <BookAppointmentHospital />
        </LayoutWrapper>
      }
    />
  </Routes>
);

export default AppRoutes;
