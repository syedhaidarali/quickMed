/** @format */

import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AppRoutes from "./components/Routes.jsx";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gray-50'>
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
