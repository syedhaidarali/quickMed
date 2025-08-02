/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doctors } from "../assets/dummy";
import InputField from "../components/formItems/InputField";

const DoctorProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { approvedDoctors, updateDoctorProfile, loading } = useAuth();

  // Find doctor from approved doctors list or dummy data
  const doctor =
    approvedDoctors.find((d) => d.id.toString() === slug) ||
    doctors.find((d) => d.slug === slug);

  const [hasAppointment] = useState(false); // default false, backend will handle
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePicture: doctor?.profilePicture || "",
    availability: doctor?.availability || [],
    fee: doctor?.fee || "",
    documents: doctor?.documents || [],
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (doctor.id) {
      const result = await updateDoctorProfile(doctor.id, profileData);
      if (result.success) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "profilePicture") {
        setProfileData((prev) => ({
          ...prev,
          profilePicture: URL.createObjectURL(file),
        }));
      } else if (type === "documents") {
        setProfileData((prev) => ({
          ...prev,
          documents: [
            ...prev.documents,
            { name: file.name, url: URL.createObjectURL(file) },
          ],
        }));
      }
    }
  };

  if (!doctor) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50'>
        <div className='bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center'>
          <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
            No Doctor Found
          </h1>
          <p className='text-emerald-700 text-lg'>
            No doctor found for this profile.
          </p>
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
          {doctor.id && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors'>
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          )}
        </div>

        {isEditing ? (
          <form
            onSubmit={handleProfileUpdate}
            className='space-y-6'>
            <div className='flex flex-col items-center mb-6'>
              <div className='relative'>
                <img
                  src={
                    profileData.profilePicture ||
                    doctor.image ||
                    "/public/images/doctor1.jpg"
                  }
                  alt={doctor.fullName || doctor.name}
                  className='w-28 h-28 rounded-full object-cover border-4 border-emerald-100 shadow mb-4'
                />
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleFileUpload(e, "profilePicture")}
                  className='absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer'
                />
              </div>
              <h2 className='text-2xl font-bold text-emerald-800 mb-1'>
                {doctor.fullName || doctor.name}
              </h2>
              <p className='bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full mb-1'>
                {doctor.speciality || doctor.specialty}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputField
                label='Consultation Fee (Rs.)'
                name='fee'
                type='number'
                value={profileData.fee}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fee: e.target.value }))
                }
                placeholder='Enter consultation fee'
              />

              <div>
                <label className='block text-emerald-700 font-medium mb-2'>
                  Availability
                </label>
                <div className='space-y-2'>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <label
                      key={day}
                      className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={profileData.availability.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfileData((prev) => ({
                              ...prev,
                              availability: [...prev.availability, day],
                            }));
                          } else {
                            setProfileData((prev) => ({
                              ...prev,
                              availability: prev.availability.filter(
                                (d) => d !== day
                              ),
                            }));
                          }
                        }}
                        className='mr-2'
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className='block text-emerald-700 font-medium mb-2'>
                Documents
              </label>
              <input
                type='file'
                multiple
                onChange={(e) => handleFileUpload(e, "documents")}
                className='w-full p-2 border border-gray-300 rounded'
              />
              <div className='mt-2 space-y-1'>
                {profileData.documents.map((doc, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between bg-gray-50 p-2 rounded'>
                    <span className='text-sm'>{doc.name}</span>
                    <button
                      type='button'
                      onClick={() =>
                        setProfileData((prev) => ({
                          ...prev,
                          documents: prev.documents.filter(
                            (_, i) => i !== index
                          ),
                        }))
                      }
                      className='text-red-600 text-sm'>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-end space-x-3'>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors'>
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading}
                className='px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50'>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className='flex flex-col items-center mb-6'>
              <img
                src={
                  profileData.profilePicture ||
                  doctor.image ||
                  "/public/images/doctor1.jpg"
                }
                alt={doctor.fullName || doctor.name}
                className='w-28 h-28 rounded-full object-cover border-4 border-emerald-100 shadow mb-4'
              />
              <h2 className='text-2xl font-bold text-emerald-800 mb-1'>
                {doctor.fullName || doctor.name}
              </h2>
              <p className='bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full mb-1'>
                {doctor.speciality || doctor.specialty}
              </p>
              <p className='text-sm text-gray-500'>
                {doctor.experience} years experience
              </p>
            </div>
            <div className='mb-4 space-y-2'>
              <p className='text-gray-700'>
                <b>Hospital:</b> {doctor.hospital}
              </p>
              <p className='text-gray-700'>
                <b>Location:</b> {doctor.fullAddress || doctor.location}
              </p>
              <p className='text-gray-700'>
                <b>Consultation Fee:</b> Rs.{" "}
                {profileData.fee || doctor.consultationFee || "Not set"}
              </p>
              <p className='text-gray-700'>
                <b>Availability:</b>{" "}
                {profileData.availability.length > 0
                  ? profileData.availability.join(", ")
                  : "Not set"}
              </p>
              {profileData.documents.length > 0 && (
                <div>
                  <p className='text-gray-700 font-semibold mb-2'>Documents:</p>
                  <div className='space-y-1'>
                    {profileData.documents.map((doc, index) => (
                      <div
                        key={index}
                        className='text-sm text-gray-600 bg-gray-50 p-2 rounded'>
                        📄 {doc.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {hasAppointment ? (
          <div className='flex justify-center gap-4 mt-6'>
            <button className='px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition'>
              Chat
            </button>
            <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
              Video Call
            </button>
            <button className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition'>
              Audio Call
            </button>
          </div>
        ) : (
          <div className='text-center text-emerald-700 mt-6'>
            You need to book an appointment to contact this doctor.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
