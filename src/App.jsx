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
  ChatProvider,
} from "./context";
import AppRoutes from "./Routes";

function App() {
  return (
    <AdminProvider>
      <HospitalProvider>
        <DoctorProvider>
          <AuthProvider>
            <ChatProvider>
              <RatingProvider>
                <QuickHelpProvider>
                  <BrowserRouter basename='/quickMed'>
                    <AppRoutes />
                  </BrowserRouter>
                </QuickHelpProvider>
              </RatingProvider>
            </ChatProvider>
          </AuthProvider>
        </DoctorProvider>
      </HospitalProvider>
    </AdminProvider>
  );
}

export default App;
