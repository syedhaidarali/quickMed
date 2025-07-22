/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DoctorDetail from "../pages/DoctorDetail";
import HospitalDetail from "../pages/HospitalDetail";
import MedicineDetail from "../pages/MedicineDetail";
import LabDetail from "../pages/LabDetail";
import Surgeries from "../pages/Surgeries";
import Shop from "../pages/Shop";
import JoinAsDoctor from "../pages/JoinAsDoctor";
import AllDoctors from "../pages/AllDoctors";
import AllHospitals from "../pages/AllHospitals";
import AllLabs from "../pages/AllLabs";
import AllMedicines from "../pages/AllMedicines";

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
    {/* Surgeries */}
    <Route
      path='/surgeries'
      element={<Surgeries />}
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
  </Routes>
);

export default AppRoutes;
