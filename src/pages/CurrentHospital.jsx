/** @format */
import { useHospital } from "../context";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

const CurrentHospital = () => {
  const { hospital, setHospital } = useHospital();
  const navigate = useNavigate();

  if (!hospital) {
    return (
      <div className='min-h-screen bg-emerald-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleChangePassword = () => {
    navigate("/change-password?type=hospital");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "verified":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHospital(null);
    navigate("/");
  };

  return (
    <div className='min-h-screen bg-emerald-50 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white rounded-xl shadow-lg p-6'>
          <div className='flex justify-end'>
            <button
              onClick={handleLogout}
              className='px-4 ms-auto py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
              Logout
            </button>
          </div>
          {/* Header */}
          <div className='text-center mb-6'>
            <div className='w-24 h-24 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center'>
              {hospital.profilePicture || hospital.image ? (
                <img
                  src={hospital.profilePicture || hospital.image}
                  alt='Hospital'
                  className='w-24 h-24 rounded-full object-cover'
                />
              ) : (
                <span className='text-3xl'>🏥</span>
              )}
            </div>
            <h1 className='text-2xl font-bold text-gray-900'>
              {hospital.name}
            </h1>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                hospital.status
              )}`}>
              {hospital.status?.charAt(0).toUpperCase() +
                hospital.status?.slice(1) || "Unknown"}
            </span>
          </div>

          {/* Profile Info */}
          <div className='space-y-4 mb-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='bg-gray-50 p-3 rounded-lg'>
                <p className='text-sm text-gray-500'>Email</p>
                <p className='font-medium'>{hospital.email}</p>
              </div>
              <div className='bg-gray-50 p-3 rounded-lg'>
                <p className='text-sm text-gray-500'>Phone</p>
                <p className='font-medium'>
                  {hospital.phone || "Not provided"}
                </p>
              </div>
              <div className='bg-gray-50 p-3 rounded-lg'>
                <p className='text-sm text-gray-500'>City</p>
                <p className='font-medium'>{hospital.city || "Not provided"}</p>
              </div>
              <div className='bg-gray-50 p-3 rounded-lg'>
                <p className='text-sm text-gray-500'>Type</p>
                <p className='font-medium'>
                  {hospital.hospitalType || "Not specified"}
                </p>
              </div>
            </div>

            <div className='bg-gray-50 p-3 rounded-lg'>
              <p className='text-sm text-gray-500'>Address</p>
              <p className='font-medium'>
                {hospital.address || "Not provided"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center justify-center gap-3'>
            {hospital && (
              <Link
                to={`/hospitals/${`${hospital.name
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")}-${hospital._id}`}/doctors`}
                className='px-6 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors'>
                View Doctors
                {Array.isArray(hospital?.doctors)
                  ? ` (${hospital.doctors.length})`
                  : ""}
              </Link>
            )}
            <button
              onClick={handleChangePassword}
              className='px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'>
              Change Password
            </button>
          </div>

          {/* Status Message */}
          {hospital.status === "pending" && (
            <div className='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
              <p className='text-yellow-800 text-sm text-center'>
                Your profile is currently under review. You'll be notified once
                verified.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentHospital;
