/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth, useDoctor, useRating } from "../context";
import { toast } from "sonner";
import { ConsultationLauncher } from "../components/videoChat";
import { ReviewModal } from "../modals";

const DoctorProfile = () => {
  const { slug } = useParams();

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const {
    allDoctors,
    loading,
    updateDoctorRating: updateDoctorRatingInContext,
  } = useDoctor();
  const [doctor, setDoctor] = useState(null);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [consultationType, setConsultationType] = useState("video");
  const {
    addDoctorRating,
    updateDoctorRating: rateApiUpdate,
    deleteDoctorRating,
  } = useRating();

  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [slug]);
  useEffect(() => {
    if (allDoctors && allDoctors.length > 0) {
      const doctorId = slug.split("-").pop(); // Get the ID part from slug
      const foundDoctor = allDoctors.find((doc) => doc._id === doctorId);
      if (foundDoctor) {
        setDoctor(foundDoctor);
      }
    }
  }, [allDoctors, slug]);

  const handleBookAppointment = () => {
    navigate(`/doctor/book/${slug}`);
  };

  const handleRatingOnly = ({ rating }) => {
    const onLocalUpdate = (serverRating) => {
      setDoctor((prev) => ({ ...prev, rating: serverRating }));
      updateDoctorRatingInContext(doctor._id, serverRating);
    };
    addDoctorRating({ rating }, doctor._id, onLocalUpdate);
    setOpenRatingModal(false);
  };

  const handleUpdateRating = ({ rating }) => {
    const onLocalUpdate = (serverRating) => {
      setDoctor((prev) => ({ ...prev, rating: serverRating }));
      updateDoctorRatingInContext(doctor._id, serverRating);
    };
    rateApiUpdate({ rating }, doctor._id, onLocalUpdate);
    setOpenRatingModal(false);
  };

  const handleDeleteRating = () => {
    const onLocalUpdate = (serverRating) => {
      setDoctor((prev) => ({ ...prev, rating: serverRating }));
      updateDoctorRatingInContext(doctor._id, serverRating);
    };
    deleteDoctorRating(doctor._id, onLocalUpdate);
    setOpenRatingModal(false);
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-emerald-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4'></div>
          <p className='text-emerald-700'>Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-emerald-50'>
        <div className='text-center'>
          <p className='text-emerald-700 text-lg'>Doctor not found.</p>
          <button
            onClick={() => navigate("/")}
            className='mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Handle specialty array or string
  const getSpecialty = (specialty) => {
    if (Array.isArray(specialty)) {
      return specialty.join(", ");
    }
    return specialty || "General Medicine";
  };

  // Handle rating object
  const getRating = (rating) => {
    if (rating && typeof rating === "object") {
      return rating.average || 0;
    }
    return rating || 0;
  };

  const getReviewCount = (rating) => {
    if (rating && typeof rating === "object") {
      return rating.count || 0;
    }
    return 0;
  };

  return (
    <div className='min-h-screen bg-emerald-50 py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Doctor Header */}
        <div className='bg-white rounded-xl shadow-md p-8 mb-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Profile Picture and Basic Info */}
            <div className='text-center lg:text-left'>
              <img
                src={
                  doctor.profilePicture ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    doctor.name
                  )}&background=random`
                }
                alt={doctor.name}
                className='w-32 h-32 rounded-full object-cover border-4 border-emerald-100 shadow-lg mx-auto lg:mx-0 mb-4'
              />
              <h1 className='text-3xl font-bold text-emerald-800 mb-2'>
                {doctor.name}
              </h1>
              <p className='text-emerald-700 text-lg mb-2'>
                {getSpecialty(doctor.speciality)}
              </p>
              <p className='text-gray-600 mb-2'>{doctor.mainDegree}</p>
              <div className='flex items-center justify-center lg:justify-start space-x-2'>
                <span className='text-yellow-500'>★</span>
                <span className='font-medium'>{getRating(doctor.rating)}</span>

                <span className='text-gray-500'>
                  ({getReviewCount(doctor.rating)} reviews)
                </span>
              </div>
              <ReviewModal
                trigger={
                  <button className='px-3 mt-2 py-2 bg-yellow-500 text-white rounded'>
                    Add Rating
                  </button>
                }
                showActionButtons={true}
                mode='rating-only'
                onSubmit={handleRatingOnly}
                onUpdate={handleUpdateRating}
                onDelete={handleDeleteRating}
                open={openRatingModal}
                onOpenChange={setOpenRatingModal}
                title='Rate this Service'
                description='Tap the stars to leave a quick rating'
                submitLabel='Add Rating'
              />
            </div>

            {/* Key Information */}
            <div className='space-y-4'>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='font-semibold text-emerald-700 mb-3'>
                  Professional Information
                </h3>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Experience:</span>
                    <span className='font-medium'>
                      {doctor.experience || 0} years
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>PMDC Number:</span>
                    <span className='font-medium'>
                      {doctor.pmdcNumber || "Not specified"}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        doctor.status === "verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {doctor.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='font-semibold text-emerald-700 mb-3'>
                  Contact Information
                </h3>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600'>📧</span>
                    <span>{doctor.email}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600'>📱</span>
                    <span>{doctor.phone}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600'>🏥</span>
                    <span>{doctor.hospital || "Not specified"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Options */}
            <div className='space-y-4'>
              <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
                <h3 className='font-semibold text-blue-800 mb-3'>
                  Consultation Fee
                </h3>
                <p className='text-2xl font-bold text-blue-600 mb-2'>
                  Rs. {doctor.fee || "Not specified"}
                </p>
                <div className='text-sm text-blue-700'>
                  <p>• Video consultation available</p>
                  <p>• In-person appointments</p>
                  <p>• Professional medical advice</p>
                </div>
              </div>

              <div className='bg-emerald-50 p-4 rounded-lg border border-emerald-200'>
                <h3 className='font-semibold text-emerald-800 mb-3'>
                  Availability
                </h3>
                <div className='flex items-center space-x-2 mb-2'>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      doctor.availability ? "bg-green-500" : "bg-red-500"
                    }`}></span>
                  <span
                    className={
                      doctor.availability ? "text-green-700" : "text-red-700"
                    }>
                    {doctor.availability
                      ? "Available for consultations"
                      : "Currently unavailable"}
                  </span>
                </div>
                {doctor.availability && (
                  <button
                    onClick={handleBookAppointment}
                    className='w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors'>
                    Book Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Video Consultation Section */}
        {doctor.availability && (
          <div className='bg-white rounded-xl shadow-md p-8 mb-8'>
            <h2 className='text-2xl font-bold text-emerald-800 mb-6 text-center'>
              Start Video Consultation
            </h2>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {/* Consultation Info */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-emerald-700'>
                  Why Choose Video Consultation?
                </h3>
                <ul className='space-y-2 text-gray-600'>
                  <li className='flex items-start space-x-2'>
                    <span className='text-emerald-500 mt-1'>✓</span>
                    <span>Consult from the comfort of your home</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <span className='text-emerald-500 mt-1'>✓</span>
                    <span>No travel time or waiting in queues</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <span className='text-emerald-500 mt-1'>✓</span>
                    <span>Secure and private consultation</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <span className='text-emerald-500 mt-1'>✓</span>
                    <span>Easy follow-up appointments</span>
                  </li>
                </ul>

                <div className='bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
                  <h4 className='font-semibold text-yellow-800 mb-2'>
                    Before Your Consultation
                  </h4>
                  <ul className='text-sm text-yellow-700 space-y-1'>
                    <li>• Ensure stable internet connection</li>
                    <li>• Find a quiet, private space</li>
                    <li>• Have your medical history ready</li>
                    <li>• Test your camera and microphone</li>
                  </ul>
                </div>
              </div>

              {/* Video Consultation Launcher */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-emerald-700'>
                  Ready to Start?
                </h3>

                {isAuthenticated ? (
                  <div className='space-y-3'>
                    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
                      <p className='text-yellow-800 text-sm'>
                        <strong>Note:</strong> The doctor will start the video
                        consultation and provide you with a meeting code to
                        join.
                      </p>
                    </div>
                    <ConsultationLauncher
                      doctorId={doctor._id}
                      doctorName={doctor.name}
                      isDoctor={false}
                    />
                  </div>
                ) : (
                  <div className='bg-gray-50 p-6 rounded-lg text-center'>
                    <p className='text-gray-600 mb-4'>
                      Please login to start a video consultation
                    </p>
                    <button
                      onClick={() => navigate("/login")}
                      className='bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors'>
                      Login Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className='bg-white rounded-xl shadow-md p-8'>
          <h2 className='text-2xl font-bold text-emerald-800 mb-6'>
            Additional Information
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Personal Details */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-emerald-700 border-b border-emerald-200 pb-2'>
                Personal Details
              </h3>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Gender:</span>
                  <span className='font-medium'>
                    {doctor.gender || "Not specified"}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Religion:</span>
                  <span className='font-medium'>
                    {doctor.religion || "Not specified"}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>CNIC:</span>
                  <span className='font-medium'>
                    {doctor.cnic || "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-emerald-700 border-b border-emerald-200 pb-2'>
                Address
              </h3>
              <div className='text-sm'>
                <p className='text-gray-600 mb-2'>Full Address:</p>
                <p className='text-gray-800'>
                  {doctor.fullAddress || "Address not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className='mt-8 pt-6 border-t border-gray-200'>
            <h3 className='text-lg font-semibold text-emerald-700 mb-4'>
              Verification Status
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-center space-x-3'>
                <span
                  className={`w-4 h-4 rounded-full ${
                    doctor.pmdcVerified ? "bg-green-500" : "bg-red-500"
                  }`}></span>
                <span className='text-sm'>
                  PMDC Verification:{" "}
                  {doctor.pmdcVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <span
                  className={`w-4 h-4 rounded-full ${
                    doctor.hospitalVerified ? "bg-green-500" : "bg-red-500"
                  }`}></span>
                <span className='text-sm'>
                  Hospital Verification:{" "}
                  {doctor.hospitalVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
