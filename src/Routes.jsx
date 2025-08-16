/** @format */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx"; // Create this if not present
import {
  Home,
  Login,
  DoctorLogin,
  AdminLogin,
  HospitalLogin,
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
  Consultation,
  DoctorConsultation,
  UserProfile,
  CurrentDoctorProfile,
  HospitalProfile,
} from "./pages";
import { useAdmin, useAuth, useDoctor } from "./context";

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useAdmin();
  const { user } = useAuth();
  const { doctor } = useDoctor();
  if (!admin) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }
  return children;
};

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
        path='/doctor/profile/'
        element={<CurrentDoctorProfile />}
      />
      <Route
        path='/doctor/profile/:slug'
        element={<DoctorProfile />}
      />
      <Route
        path='/hospital/profile/:slug'
        element={<HospitalProfile />}
      />
      <Route
        path='/doctor/book/:slug'
        element={<BookNow />}
      />
      <Route
        path='/doctor/:slug'
        element={<DoctorDetail />}
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
        path='/profile'
        element={<UserProfile />}
      />
      <Route
        path='/admin/dashboard'
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
    </Route>

    {/* Consultation routes - no layout wrapper */}
    <Route
      path='/consultation/:meetingId/:doctorId'
      element={<Consultation />}
    />
    <Route
      path='/doctor/consultation/:meetingId/:patientId'
      element={<DoctorConsultation />}
    />
    <Route
      path='/doctor/consultation/new/:patientId'
      element={<DoctorConsultation />}
    />

    {/* Auth layout for login/register */}
    <Route element={<AuthLayout />}>
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/hospital/login'
        element={<HospitalLogin />}
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
