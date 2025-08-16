/** @format */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import {
  AuthProvider,
  DoctorProvider,
  HospitalProvider,
  AdminProvider,
  RatingProvider,
  QuickHelpProvider,
} from "./context";
import AppRoutes from "./Routes";

function App() {
  return (
    <AdminProvider>
      <HospitalProvider>
        <DoctorProvider>
          <AuthProvider>
            <RatingProvider>
              <QuickHelpProvider>
                <BrowserRouter basename='/quickMed'>
                  <AppRoutes />
                </BrowserRouter>
              </QuickHelpProvider>
            </RatingProvider>
          </AuthProvider>
        </DoctorProvider>
      </HospitalProvider>
    </AdminProvider>
  );
}

export default App;
