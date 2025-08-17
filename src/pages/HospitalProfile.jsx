/** @format */

import { useHospital } from "../context";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const HospitalProfile = () => {
  const { allPublicHospital } = useHospital();
  const [hospital, setHospital] = useState(null);
  const { slug } = useParams();
  useEffect(() => {
    if (allPublicHospital && allPublicHospital.length > 0) {
      const hospitalId = slug.split("-").pop();
      const foundHospital = allPublicHospital.find(
        (hos) => hos._id === hospitalId
      );
      if (foundHospital) {
        setHospital(foundHospital);
      }
    }
  }, [allPublicHospital, slug]);

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8'>
          <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
            <img
              src={
                hospital?.profilePicture ||
                hospital?.image ||
                "https://ui-avatars.com/api/?name=Hospital&background=random"
              }
              alt={hospital?.name}
              className='w-32 h-32 rounded-2xl object-cover border-4 border-emerald-200 shadow'
            />
            <div className='flex-1 w-full'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                <h1 className='text-3xl font-bold text-emerald-800'>
                  {hospital?.name}
                </h1>
                <div className='flex flex-wrap gap-2'>
                  {hospital?.hospitalType && (
                    <span className='inline-block bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full'>
                      {hospital?.hospitalType}
                    </span>
                  )}
                  {hospital?.status && (
                    <span className='inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full capitalize'>
                      {hospital?.status}
                    </span>
                  )}
                  {hospital?.city && (
                    <span className='inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full'>
                      {hospital?.city}
                    </span>
                  )}
                </div>
              </div>
              {hospital?.description && (
                <p className='text-gray-700 mt-3'>{hospital?.description}</p>
              )}

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
                <div className='text-gray-700'>
                  <div className='mb-1'>
                    <span className='font-semibold'>Address:</span>{" "}
                    {hospital?.address || "—"}
                  </div>
                  <div className='mb-1'>
                    <span className='font-semibold'>Contact:</span>{" "}
                    {hospital?.phone || hospital?.contact || "—"}
                  </div>
                  <div className='mb-1'>
                    <span className='font-semibold'>Email:</span>{" "}
                    {hospital?.email || "—"}
                  </div>
                  <div className='mb-1'>
                    <span className='font-semibold'>Established:</span>{" "}
                    {hospital?.establishedYear || "—"}
                  </div>
                </div>
                <div className='text-gray-700'>
                  <div className='mb-1'>
                    <span className='font-semibold'>Total Beds:</span>{" "}
                    {hospital?.totalBeds ?? hospital?.beds ?? "—"}
                  </div>
                  <div className='mb-1'>
                    <span className='font-semibold'>Operation Theaters:</span>{" "}
                    {hospital?.operationTheaters ?? "—"}
                  </div>
                  <div className='mb-1'>
                    <span className='font-semibold'>Active:</span>{" "}
                    {hospital?.isActive ? "Yes" : "No"}
                  </div>
                  {Array.isArray(hospital?.doctors) && (
                    <div className='mb-1'>
                      <span className='font-semibold'>Doctors:</span>{" "}
                      {hospital?.doctors.length}
                    </div>
                  )}
                </div>
              </div>

              {hospital?.services && (
                <div className='mt-6'>
                  <h2 className='text-lg font-semibold text-emerald-800 mb-2'>
                    Services
                  </h2>
                  <div className='flex flex-wrap gap-2'>
                    {hospital?.services?.emergencyServices && (
                      <span className='inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full'>
                        Emergency
                      </span>
                    )}
                    {hospital?.services?.ambulanceServices && (
                      <span className='inline-block bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full'>
                        Ambulance
                      </span>
                    )}
                    {hospital?.services?.icuServices && (
                      <span className='inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full'>
                        ICU
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className='mt-8 flex flex-col sm:flex-row gap-3'>
                <Link
                  to={`/hospitals/${slug}/doctors`}
                  className='px-5 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors duration-200 font-medium text-center'>
                  View Doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
