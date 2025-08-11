/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/formItems/InputField";
import { useDoctor } from "../context/context";
import Modal from "../modals/Modal";

const DoctorProfile = () => {
  const { doctor, logout, DoctorProfileUpdate, UpdateProfilePic } = useDoctor();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    phone: doctor?.phone || "",
    availability: Array.isArray(doctor?.availability)
      ? doctor.availability
      : doctor?.availability
      ? [doctor.availability]
      : [],
    fee: doctor?.fee || "",
    fullAddress: doctor?.fullAddress || "",
    experience: doctor?.experience || "",
  });
  const navigate = useNavigate();
  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    DoctorProfileUpdate(profileData);
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    // setProfileImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      const formData = new FormData();
      formData.append("image", file); // profile image
      UpdateProfilePic(formData);
    }
  };

  const handleLogout = () => {
    logout(navigate);
  };

  if (!doctor) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <h2 className='text-2xl text-emerald-700 font-semibold'>
          No doctor found.
        </h2>
      </div>
    );
  }

  // Check if doctor status is pending
  if (doctor.status === "pending") {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50 p-4'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-2xl w-full text-center'>
          <div className='mb-6'>
            <div className='w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4'>
              <svg
                className='w-10 h-10 text-yellow-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-yellow-700 mb-4'>
              Application Pending
            </h2>
            <p className='text-lg text-gray-600 mb-6'>
              Your account is pending verification. We will notify you via email
              once verified.
            </p>
            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
              <p className='text-sm text-yellow-800'>
                <strong>Current Status:</strong> Pending Verification
              </p>
              <p className='text-sm text-yellow-800 mt-1'>
                <strong>Name:</strong> {doctor.name}
              </p>
              <p className='text-sm text-yellow-800 mt-1'>
                <strong>Speciality:</strong>{" "}
                {doctor.speciality?.join(", ") || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4 flex justify-center'>
      <div className='bg-white rounded-xl shadow-md p-8 max-w-2xl w-full'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-emerald-800'>
            Doctor Profile
          </h1>
          <div className='flex gap-3'>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700'>
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button
              onClick={handleLogout}
              className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'>
              Logout
            </button>
          </div>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleUpdate}
            className='space-y-6'>
            <div className='flex flex-col items-center mb-6'>
              <div className='relative'>
                <img
                  src={imagePreview || doctor.profilePicture}
                  alt={doctor.name}
                  className='w-28 h-28 rounded-full object-cover mb-4 border-4 border-emerald-100'
                />
                <label className='absolute bottom-4 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700'>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                    />
                  </svg>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleProfileImageUpload}
                    className='hidden'
                  />
                </label>
              </div>
              <h2 className='text-xl font-bold text-emerald-800'>
                {doctor.name}
              </h2>
              <p className='text-sm text-emerald-700'>
                {doctor.speciality?.join(", ") || doctor.specialty}
              </p>
            </div>

            <InputField
              label='Phone Number'
              name='phone'
              type='tel'
              value={profileData.phone}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder='Enter phone number'
            />

            <InputField
              label='Consultation Fee (Rs.)'
              name='fee'
              type='text'
              value={profileData.fee}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, fee: e.target.value }))
              }
              placeholder='Enter consultation fee'
            />

            <InputField
              label='Experience'
              name='experience'
              type='text'
              value={profileData.experience}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  experience: e.target.value,
                }))
              }
              placeholder='Enter years of experience'
            />

            <InputField
              label='Full Address'
              name='fullAddress'
              type='text'
              value={profileData.fullAddress}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  fullAddress: e.target.value,
                }))
              }
              placeholder='Enter full address'
            />

            <div>
              <label className='font-medium text-emerald-700 mb-1 block'>
                Availability
              </label>
              <div className='grid grid-cols-2 gap-2'>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <label
                      key={day}
                      className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={profileData.availability.includes(day)}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            availability: e.target.checked
                              ? [...prev.availability, day]
                              : prev.availability.filter((d) => d !== day),
                          }))
                        }
                        className='mr-2'
                      />
                      {day}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className='flex justify-between'>
              <button
                type='button'
                className='bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700'
                onClick={() => setIsMoreModalVisible(true)}>
                Update More Details
              </button>
              <button
                type='submit'
                className='bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700'>
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className='flex flex-col items-center mb-6'>
              <img
                src={doctor.profilePicture}
                alt={doctor.name}
                className='w-28 h-28 rounded-full object-cover mb-2 border-4 border-emerald-100'
              />
              <h2 className='text-xl font-bold text-emerald-800'>
                {doctor.name}
              </h2>
              <p className='text-sm text-emerald-700'>
                {doctor.speciality?.join(", ") || doctor.specialty}
              </p>
            </div>

            <div className='space-y-3'>
              <p className='text-gray-700 mb-1'>
                <b>Experience:</b> {doctor.experience} years
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Hospital:</b> {doctor.hospital}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Location:</b> {doctor.fullAddress}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Rating:</b> ⭐ {doctor?.rating?.average || 0} (
                {doctor?.rating?.count || 0} reviews)
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Fee:</b> Rs. {doctor.fee || "Not set"}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Availability:</b>{" "}
                {Array.isArray(doctor.availability)
                  ? doctor.availability.join(", ")
                  : doctor.availability || "Not specified"}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>PMDC Number:</b> {doctor.pmdcNumber}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Main Degree:</b> {doctor.mainDegree}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Status:</b>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    doctor.status === "verified"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {doctor.status}
                </span>
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Documents Uploaded:</b>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    doctor.hasDocuments
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                  {doctor.hasDocuments ? "Yes" : "No"}
                </span>
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Hospital Verified:</b>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    doctor.hospitalVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {doctor.hospitalVerified ? "Yes" : "No"}
                </span>
              </p>
              <p className='text-gray-700 mb-1'>
                <b>PMDC Verified:</b>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    doctor.pmdcVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {doctor.pmdcVerified ? "Yes" : "No"}
                </span>
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Member of Registered Hospital:</b>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    doctor.memberofRegisterdHospital
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {doctor.memberofRegisterdHospital ? "Yes" : "No"}
                </span>
              </p>
              <p className='text-gray-700 mb-1'>
                <b>CNIC:</b> {doctor.cnic}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Phone:</b> {doctor.phone}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Email:</b> {doctor.email}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Gender:</b> {doctor.gender}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Religion:</b> {doctor.religion}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Payment Completed:</b>{" "}
                {new Date(doctor.PaymentCompleted).toLocaleDateString()}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Created:</b>{" "}
                {new Date(doctor.createdAt).toLocaleDateString()}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Last Updated:</b>{" "}
                {new Date(doctor.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal
        open={isMoreModalVisible}
        onOpenChange={setIsMoreModalVisible}
        title='Need to Update More Details?'
        description="We're here to help! For additional profile updates, please reach out to our support team. You can contact us directly at +92 348 8597922 or connect with our admin team for personalized assistance."
      />
    </div>
  );
};

export default DoctorProfile;
