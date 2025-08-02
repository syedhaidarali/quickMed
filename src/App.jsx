/** @format */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./Routes.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename='/quickMed'>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
