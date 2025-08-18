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
        <BrowserRouter basename='/quickMed'>
          <DoctorProvider>
            <AuthProvider>
              <ChatProvider>
                <RatingProvider>
                  <QuickHelpProvider>
                    <AppRoutes />
                  </QuickHelpProvider>
                </RatingProvider>
              </ChatProvider>
            </AuthProvider>
          </DoctorProvider>
        </BrowserRouter>
      </HospitalProvider>
    </AdminProvider>
  );
}

export default App;
