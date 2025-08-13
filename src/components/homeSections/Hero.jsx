/** @format */

import React, { useState } from "react";
import SearchBar from "../formItems/SearchBar";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { FaUserMd } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useDoctor } from "../../context/DoctorContext";
import { useAdmin } from "../../context/AdminContext";

// Animate the map center when coords change
function AnimateMapCenter({ coords }) {
  const map = useMap();
  React.useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, { duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

const DEFAULT_POSITION = [24.8607, 67.0011]; // Karachi as fallback

const Hero = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [cityCoords, setCityCoords] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useAuth();
  const { doctor } = useDoctor();
  const { admin } = useAdmin();

  const handleCitySelect = (city, coords) => {
    setLoading(true);
    setSelectedCity(city);

    // Simulate network delay (you can replace this with actual async fetch if needed)
    setTimeout(() => {
      setCityCoords(coords);
      setLoading(false);
    }, 1200);
  };

  // Choose display name with correct fallback order
  const displayName =
    (user && user.name) ||
    (doctor && doctor.name) ||
    (admin && "Admin") ||
    "Guest";

  // Determine role for badge
  const role =
    (user && "User") || (doctor && "Doctor") || (admin && "Admin") || "Guest";

  // Nice initials: first + last initials for multi-word names, or first two letters for single-word.
  const getInitials = (name = "") => {
    if (!name || typeof name !== "string") return "G";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const first = parts[0][0] || "";
      const last = parts[parts.length - 1][0] || "";
      return (first + last).toUpperCase().slice(0, 3);
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(displayName);

  return (
    <>
      {/* Header */}
      <div className='w-full flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-[#014e78] via-[#009688] to-[#43cea2] text-white shadow-lg mb-2 relative overflow-hidden'>
        {/* decorative icon */}
        <div className='absolute left-4 top-4 opacity-12 text-[96px] pointer-events-none select-none text-white/60'>
          <FaUserMd />
        </div>

        <div className='flex items-center gap-4 mb-2 z-10'>
          {/* Attractive avatar */}
          <div
            className='relative'
            title={displayName}
            aria-label={`${role} avatar for ${displayName}`}>
            <div
              className='
                w-14 h-14 rounded-full
                bg-gradient-to-tr from-emerald-500 to-cyan-400
                flex items-center justify-center
                text-white text-lg font-extrabold
                shadow-2xl
                transform transition-all duration-200
                ring-4 ring-white/80
                hover:scale-105
                '>
              <span className='select-none'>{initials}</span>
            </div>
          </div>

          <p className='text-lg sm:text-xl font-semibold z-10'>
            Hello, {displayName}
          </p>
        </div>

        <h2 className='text-xl sm:text-3xl font-extrabold tracking-tight text-center z-10 drop-shadow-lg'>
          Find the <span className='text-[#ffe082]'>Best Doctor</span> Near You
        </h2>
      </div>

      {/* Map Section */}
      <section className='relative w-full min-h-[400px] mt-0 overflow-hidden'>
        {/* Loading Spinner Overlay */}
        {loading && (
          <div className='absolute inset-0 z-30 flex items-center justify-center bg-white/80 backdrop-blur-sm'>
            <div className='w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin' />
          </div>
        )}

        {/* Map Container */}
        <div className='absolute inset-0 z-0'>
          <MapContainer
            center={cityCoords || DEFAULT_POSITION}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            attributionControl={false}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; OpenStreetMap contributors'
            />
            <AnimateMapCenter coords={cityCoords || DEFAULT_POSITION} />
          </MapContainer>
          <div className='absolute inset-0 bg-white/70 backdrop-blur-sm z-10' />
        </div>

        {/* Search bar */}
        <div className='relative h-[400px] z-20 flex flex-col items-center justify-center max-w-2xl mx-auto py-12 px-6'>
          <SearchBar onCitySelect={handleCitySelect} />
        </div>
      </section>

      {/* Prompt below map */}
      {!selectedCity && (
        <div className='w-full flex justify-center mt-6'>
          <h2 className='text-lg font-bold'>How can we help you today?</h2>
        </div>
      )}
    </>
  );
};

export default Hero;
