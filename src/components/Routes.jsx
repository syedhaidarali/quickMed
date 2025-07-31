/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DoctorLogin from "../pages/DoctorLogin";
import DoctorDetail from "../pages/DoctorDetail";
import HospitalDetail from "../pages/HospitalDetail";
import MedicineDetail from "../pages/MedicineDetail";
import LabDetail from "../pages/LabDetail";
import Shop from "../pages/Shop";
import JoinAsDoctor from "../pages/JoinAsDoctor";
import AllDoctors from "../pages/AllDoctors";
import AllHospitals from "../pages/AllHospitals";
import AllLabs from "../pages/AllLabs";
import AllMedicines from "../pages/AllMedicines";
import DoctorProfile from "../pages/DoctorProfile";
import BookNow from "../pages/BookNow";
import HospitalDoctors from "../pages/HospitalDoctors";
import BookAppointmentHospital from "../pages/BookAppointmentHospital";

const AppRoutes = () => (
  <Routes>
    <Route
      path='/'
      element={<Home />}
    />
    <Route
      path='/login'
      element={<Login />}
    />
    <Route
      path='/doctor/login'
      element={<DoctorLogin />}
    />
    <Route
      path='/register'
      element={<Register />}
    />
    {/* All doctors, hospitals, labs, medicines */}
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
    {/* Doctor details by slug */}
    <Route
      path='/doctor/:slug'
      element={<DoctorDetail />}
    />
    {/* Hospital details by slug */}
    <Route
      path='/hospitals/:slug'
      element={<HospitalDetail />}
    />
    {/* Medicine details by slug */}
    <Route
      path='/medicine/:slug'
      element={<MedicineDetail />}
    />
    {/* Lab details by slug */}
    <Route
      path='/lab/:slug'
      element={<LabDetail />}
    />

    {/* Shop */}
    <Route
      path='/shop'
      element={<Shop />}
    />
    {/* Join as Doctor */}
    <Route
      path='/register/doctor'
      element={<JoinAsDoctor />}
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
  </Routes>
);

export default AppRoutes;
