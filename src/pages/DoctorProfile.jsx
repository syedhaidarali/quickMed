/** @format */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../assets/dummy";
import InputField from "../components/formItems/InputField";

const DoctorProfile = () => {
  const { slug } = useParams();
  const doctor = doctors.find((d) => d.slug === slug);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePicture: doctor?.image || "",
    availability: Array.isArray(doctor?.availability)
      ? doctor.availability
      : [],
    fee: doctor?.consultationFee || "",
    documents: doctor?.documents || [],
  });

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

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated (mock only)");
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

  return (
    <div className='min-h-[60vh] bg-emerald-50 py-16 px-4 flex justify-center'>
      <div className='bg-white rounded-xl shadow-md p-8 max-w-2xl w-full'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-emerald-800'>
            Doctor Profile
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700'>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleUpdate}
            className='space-y-6'>
            <div className='flex flex-col items-center'>
              <img
                src={profileData.profilePicture || doctor.image}
                alt={doctor.name}
                className='w-28 h-28 rounded-full object-cover mb-4 border-4 border-emerald-100'
              />
              <input
                type='file'
                accept='image/*'
                onChange={(e) => handleFileUpload(e, "profilePicture")}
              />
              <h2 className='text-xl mt-2'>{doctor.name}</h2>
              <p className='text-sm text-emerald-700'>{doctor.specialty}</p>
            </div>

            <InputField
              label='Consultation Fee (Rs.)'
              name='fee'
              type='number'
              value={profileData.fee}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, fee: e.target.value }))
              }
              placeholder='Enter fee'
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

            <div>
              <label className='block mb-2 font-medium text-emerald-700'>
                Documents
              </label>
              <input
                type='file'
                multiple
                onChange={(e) => handleFileUpload(e, "documents")}
              />
              <ul className='mt-2 text-sm'>
                {profileData.documents.map((doc, i) => (
                  <li
                    key={i}
                    className='flex justify-between'>
                    {doc.name}
                    <button
                      type='button'
                      onClick={() =>
                        setProfileData((prev) => ({
                          ...prev,
                          documents: prev.documents.filter(
                            (_, idx) => idx !== i
                          ),
                        }))
                      }
                      className='text-red-500 text-xs'>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex justify-end'>
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
                src={profileData.profilePicture || doctor.image}
                alt={doctor.name}
                className='w-28 h-28 rounded-full object-cover mb-2 border-4 border-emerald-100'
              />
              <h2 className='text-xl font-bold text-emerald-800'>
                {doctor.name}
              </h2>
              <p className='text-sm text-emerald-700'>{doctor.specialty}</p>
            </div>

            <div className='space-y-3'>
              <p className='text-gray-700 mb-1'>
                <b>Experience:</b> {doctor.experience}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Hospital:</b> {doctor.hospital}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Location:</b> {doctor.location}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Rating:</b> ⭐ {doctor.rating} ({doctor.reviews} reviews)
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Fee:</b> Rs.{" "}
                {profileData.fee || doctor.consultationFee || "Not set"}
              </p>
              <p className='text-gray-700 mb-1'>
                <b>Availability:</b>{" "}
                {profileData.availability.length > 0
                  ? profileData.availability.join(", ")
                  : typeof doctor.availability === "string"
                  ? doctor.availability
                  : "Not set"}
              </p>
              {profileData.documents.length > 0 && (
                <div className='mt-3'>
                  <b className='text-gray-700 block mb-1'>Documents:</b>
                  {profileData.documents.map((doc, i) => (
                    <p
                      key={i}
                      className='text-sm text-gray-600'>
                      📄 {doc.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
