/** @format */

import React, { useState } from "react";
import SearchBar from "../formItems/SearchBar";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { FaUserMd } from "react-icons/fa";

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

  const handleCitySelect = (city, coords) => {
    setLoading(true);
    setSelectedCity(city);

    // Simulate network delay (you can replace this with actual async fetch if needed)
    setTimeout(() => {
      setCityCoords(coords);
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      {/* Header */}
      <div className='w-full flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-[#014e78] via-[#009688] to-[#43cea2] text-white shadow-lg mb-2 relative overflow-hidden'>
        <div className='absolute left-4 top-4 opacity-20 text-7xl pointer-events-none select-none'>
          <FaUserMd />
        </div>
        <div className='flex items-center gap-4 mb-2 z-10'>
          <p className='text-2xl bg-white text-[#014e78] w-14 h-14 flex justify-center items-center rounded-full font-extrabold shadow-lg border-4 border-[#43cea2]'>
            G
          </p>
          <p className='text-lg sm:text-xl font-semibold'>Hello, Guest!</p>
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
