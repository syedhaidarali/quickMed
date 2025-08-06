/** @format */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./Routes.jsx";
import { DoctorProvider } from "./context/context.js";
import { HospitalProvider } from "./context/HospitalContext.jsx";

function App() {
  return (
    <HospitalProvider>
      <DoctorProvider>
        <AuthProvider>
          <BrowserRouter basename='/quickMed'>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </DoctorProvider>
    </HospitalProvider>
  );
}

export default App;
