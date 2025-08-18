/** @format */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
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
  ForgotPassword,
  ResetPassword,
  ChangePassword,
  CurrentHospital,
  Chat,
} from "./pages";
import { useAdmin, useAuth, useDoctor, useHospital } from "./context";

// Protected Route Components
const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useAdmin();
  if (!admin) {
    return (
      <Navigate
        to='/admin/login'
        replace
      />
    );
  }
  return children;
};

const ProtectedUserRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }
  return children;
};

const ProtectedDoctorRoute = ({ children }) => {
  const { doctor, pendingValidation } = useDoctor();
  if (!doctor && !pendingValidation) {
    return (
      <Navigate
        to='/doctor/login'
        replace
      />
    );
  }
  return children;
};

const ProtectedHospitalRoute = ({ children }) => {
  const { hospital } = useHospital();
  if (!hospital) {
    return (
      <Navigate
        to='/hospital/login'
        replace
      />
    );
  }
  return children;
};

const ProtectedAuthRoute = ({ children }) => {
  const { user } = useAuth();
  const { doctor } = useDoctor();
  const { hospital } = useHospital();
  const { admin } = useAdmin();

  // If any user is logged in, redirect to home
  if (user || doctor || hospital || admin) {
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

      {/* Protected Routes */}
      <Route
        path='/user/message'
        element={
          <ProtectedUserRoute>
            <Chat />
          </ProtectedUserRoute>
        }
      />
      <Route
        path='/doctor/messages'
        element={
          <ProtectedDoctorRoute>
            <Chat />
          </ProtectedDoctorRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedUserRoute>
            <UserProfile />
          </ProtectedUserRoute>
        }
      />
      <Route
        path='/doctor/profile/'
        element={
          <ProtectedDoctorRoute>
            <CurrentDoctorProfile />
          </ProtectedDoctorRoute>
        }
      />
      <Route
        path='/hospital/profile'
        element={
          <ProtectedHospitalRoute>
            <CurrentHospital />
          </ProtectedHospitalRoute>
        }
      />
      <Route
        path='/doctor/book/:slug'
        element={
          <ProtectedUserRoute>
            <BookNow />
          </ProtectedUserRoute>
        }
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
      element={
        <ProtectedDoctorRoute>
          <DoctorConsultation />
        </ProtectedDoctorRoute>
      }
    />
    <Route
      path='/doctor/consultation/new/:patientId'
      element={
        <ProtectedDoctorRoute>
          <DoctorConsultation />
        </ProtectedDoctorRoute>
      }
    />

    {/* Auth layout for login/register */}
    <Route element={<AuthLayout />}>
      {/* Public auth routes */}
      <Route
        path='/register/doctor'
        element={<JoinAsDoctor />}
      />
      <Route
        path='/register/hospital'
        element={<JoinAsHospital />}
      />

      {/* Protected auth routes - redirect if already logged in */}
      <Route
        path='/login'
        element={
          <ProtectedAuthRoute>
            <Login />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path='/hospital/login'
        element={
          <ProtectedAuthRoute>
            <HospitalLogin />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path='/doctor/login'
        element={
          <ProtectedAuthRoute>
            <DoctorLogin />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path='/admin/login'
        element={
          <ProtectedAuthRoute>
            <AdminLogin />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedAuthRoute>
            <Register />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedAuthRoute>
            <ForgotPassword />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedAuthRoute>
            <ResetPassword />
          </ProtectedAuthRoute>
        }
      />

      {/* Protected routes that require specific user types */}
      <Route
        path='/change-password'
        element={
          <ProtectedUserRoute>
            <ChangePassword />
          </ProtectedUserRoute>
        }
      />
      <Route
        path='/doctor/upload-documents'
        element={
          <ProtectedDoctorRoute>
            <DoctorDocumentUpload />
          </ProtectedDoctorRoute>
        }
      />
    </Route>

    {/* Public profile routes */}
    <Route
      path='/doctor/profile/:slug'
      element={<DoctorProfile />}
    />
    <Route
      path='/hospital/profile/:slug'
      element={<HospitalProfile />}
    />
  </Routes>
);

export default AppRoutes;
