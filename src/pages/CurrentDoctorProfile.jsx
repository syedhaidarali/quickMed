/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/formItems/InputField";
import { useDoctor } from "../context/context";
import Modal from "../modals/Modal";
import { toast } from "sonner";

const CurrentDoctorProfile = () => {
  const { doctor, logout, DoctorProfileUpdate, UpdateProfilePic } = useDoctor();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);
  const [consultationCode, setConsultationCode] = useState("");
  const [pendingConsultations, setPendingConsultations] = useState([]);
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

  // Simulate checking for pending consultations
  useEffect(() => {
    // In a real app, this would fetch from an API
    const checkPendingConsultations = () => {
      // Mock data - replace with actual API call
      const mockConsultations = [
        // Example consultation for demonstration
        {
          patientName: "John Doe",
          date: new Date(),
          meetingId: "meeting_1754952068034_88yzffp2o",
          patientId: "patient_001",
          symptoms: "Fever and headache",
        },
      ];
      setPendingConsultations(mockConsultations);
    };

    checkPendingConsultations();
    // Check every 30 seconds for new consultations
    const interval = setInterval(checkPendingConsultations, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle consultation joining
  const handleJoinConsultation = () => {
    if (!consultationCode.trim()) {
      toast.error("Please enter a consultation code");
      return;
    }

    // Navigate to doctor consultation page
    // The route expects: /doctor/consultation/:meetingId/:patientId
    // For doctor joining, we'll use the meetingId and a placeholder for patientId
    navigate(`/doctor/consultation/${consultationCode}/patient_waiting`);
  };

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
          <div className='flex gap-3 items-center'>
            {/* Notification Badge for Pending Consultations */}
            {pendingConsultations.length > 0 && (
              <div className='relative'>
                <button
                  onClick={() => {
                    // Scroll to consultation section
                    document
                      .querySelector("[data-consultation-section]")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className='bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors relative'>
                  <span className='font-medium'>Pending Consultations</span>
                  <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center'>
                    {pendingConsultations.length}
                  </span>
                </button>
              </div>
            )}

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

            {/* Consultation Joining Section */}
            <div
              className='mt-8 border-t pt-6'
              data-consultation-section>
              <h3 className='text-lg font-semibold text-emerald-800 mb-4'>
                Video Consultation Management
              </h3>

              {/* Quick Start New Consultation */}
              <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4'>
                <h4 className='font-semibold text-green-800 mb-3'>
                  🚀 Start New Consultation
                </h4>
                <p className='text-green-700 text-sm mb-3'>
                  Create a new video consultation room for patients to join.
                </p>
                <button
                  onClick={() => {
                    // Navigate to create new consultation
                    navigate("/doctor/consultation/new/new_patient");
                  }}
                  className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium'>
                  Start New Consultation
                </button>
              </div>

              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                <h4 className='font-semibold text-blue-800 mb-3'>
                  Join Existing Consultation
                </h4>
                <p className='text-blue-700 text-sm mb-3'>
                  A patient has started a video consultation and is waiting for
                  you to join. Enter the consultation code below to join the
                  session.
                </p>

                {/* Example Section */}
                {pendingConsultations.length > 0 && (
                  <div className='mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg'>
                    <p className='text-blue-800 text-sm font-medium mb-2'>
                      💡 Example Consultation Code:
                    </p>
                    <div className='flex items-center gap-2'>
                      <code className='bg-blue-200 px-2 py-1 rounded text-sm font-mono'>
                        {pendingConsultations[0].meetingId}
                      </code>
                      <button
                        onClick={() =>
                          setConsultationCode(pendingConsultations[0].meetingId)
                        }
                        className='text-blue-600 hover:text-blue-800 text-sm underline'>
                        Use this code
                      </button>
                    </div>
                  </div>
                )}

                <div className='flex gap-3'>
                  <input
                    type='text'
                    value={consultationCode}
                    onChange={(e) => setConsultationCode(e.target.value)}
                    placeholder='Enter consultation code (e.g., lssf-npyx-3zzd)'
                    className='flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                  <button
                    onClick={handleJoinConsultation}
                    className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium'>
                    Join Now
                  </button>
                </div>
                <div className='mt-3 text-xs text-blue-600'>
                  <p>• Make sure you have a stable internet connection</p>
                  <p>• Allow camera and microphone access when prompted</p>
                  <p>• Find a quiet, private space for the consultation</p>
                  <p>
                    • Enter the meeting code provided by the patient or from
                    your dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Pending Consultations Section */}
            <div className='mt-6'>
              <h3 className='text-lg font-semibold text-emerald-800 mb-3'>
                Consultation Status
              </h3>
              <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
                <p className='text-gray-600 text-sm'>
                  {pendingConsultations && pendingConsultations.length > 0 ? (
                    <>
                      <span className='font-medium text-yellow-700'>
                        You have {pendingConsultations.length} pending
                        consultation(s).
                      </span>
                      <ul className='list-disc list-inside text-sm text-gray-700 mt-2'>
                        {pendingConsultations.map((consultation, index) => (
                          <li
                            key={index}
                            className='flex items-center justify-between mb-2 p-2 bg-white rounded border'>
                            <div className='flex-1'>
                              <span className='font-medium'>
                                Patient: {consultation.patientName}
                              </span>
                              <br />
                              <span className='text-sm text-gray-600'>
                                Date:{" "}
                                {new Date(
                                  consultation.date
                                ).toLocaleDateString()}
                              </span>
                              <br />
                              <span className='text-sm text-gray-600'>
                                Meeting ID: {consultation.meetingId}
                              </span>
                              {consultation.symptoms && (
                                <>
                                  <br />
                                  <span className='text-sm text-gray-600'>
                                    Symptoms: {consultation.symptoms}
                                  </span>
                                </>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setConsultationCode(consultation.meetingId);
                                // Auto-scroll to consultation section
                                document
                                  .querySelector("[data-consultation-section]")
                                  ?.scrollIntoView({ behavior: "smooth" });
                              }}
                              className='bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors ml-3'>
                              Quick Join
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <span className='text-green-600'>
                      No pending consultations at the moment.
                    </span>
                  )}
                </p>
              </div>
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

export default CurrentDoctorProfile;
