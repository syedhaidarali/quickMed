/** @format */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./Routes.jsx";
import { DoctorProvider } from "./context/context.js";
import { HospitalProvider } from "./context/HospitalContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";

function App() {
  return (
    <AdminProvider>
      <HospitalProvider>
        <DoctorProvider>
          <AuthProvider>
            <BrowserRouter basename='/quickMed'>
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </DoctorProvider>
      </HospitalProvider>
    </AdminProvider>
  );
}

export default App;
