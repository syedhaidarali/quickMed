/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDoctor } from "../context/DoctorContext";
import { toast } from "sonner";
import ConsultationLauncher from "../components/videoChat/ConsultationLauncher";

const BookNow = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { allDoctors, loading } = useDoctor();
  const [form, setForm] = useState({ name: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);
  const [consultationType, setConsultationType] = useState("in-person"); // "in-person" or "video"
  const [doctor, setDoctor] = useState(null);

  // Extract doctor ID from slug and find the doctor
  useEffect(() => {
    if (allDoctors && allDoctors.length > 0) {
      const doctorId = slug.split("-").pop(); // Get the ID part from slug
      const foundDoctor = allDoctors.find((doc) => doc._id === doctorId);
      if (foundDoctor) {
        setDoctor(foundDoctor);
      }
    }
  }, [allDoctors, slug]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to book an appointment");
      navigate("/login");
      return;
    }
    setSubmitted(true);
  };

  const handleVideoConsultation = () => {
    if (!isAuthenticated) {
      toast.error("Please login to start video consultation");
      navigate("/login");
      return;
    }
    // Video consultation will be handled by ConsultationLauncher component
  };

  if (loading) {
    return (
      <div className='min-h-[60vh] flex justify-center items-center bg-emerald-50 py-16 px-4'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4'></div>
          <p className='text-emerald-700'>Loading doctor information...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className='min-h-[60vh] flex justify-center items-center bg-emerald-50 py-16 px-4'>
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

  return (
    <div className='min-h-[60vh] flex justify-center items-center bg-emerald-50 py-16 px-4'>
      <div className='bg-white rounded-xl shadow-md p-8 max-w-4xl w-full'>
        <h2 className='text-2xl font-bold text-emerald-800 mb-6 text-center'>
          Book Appointment with {doctor.name}
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Doctor Information */}
          <div className='flex flex-col items-center mb-6'>
            <img
              src={
                doctor.profilePicture ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  doctor.name
                )}&background=random`
              }
              alt={doctor.name}
              className='w-24 h-24 rounded-full object-cover border-4 border-emerald-100 shadow mb-4'
            />
            <h3 className='text-xl font-semibold text-emerald-800 mb-2'>
              {doctor.name}
            </h3>
            <p className='text-emerald-700 text-sm mb-2'>
              {Array.isArray(doctor.speciality)
                ? doctor.speciality.join(", ")
                : doctor.speciality}
            </p>
            <p className='text-gray-600 text-sm mb-2'>
              {doctor.experience || 0} years experience
            </p>
            <p className='text-green-600 font-semibold'>
              Rs. {doctor.fee || "Not specified"}
            </p>
            {doctor.mainDegree && (
              <p className='text-gray-600 text-sm'>{doctor.mainDegree}</p>
            )}
          </div>

          {/* Consultation Options */}
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-emerald-700 mb-4'>
                Choose Consultation Type
              </h3>

              <div className='space-y-3'>
                <label className='flex items-center space-x-3 cursor-pointer'>
                  <input
                    type='radio'
                    name='consultationType'
                    value='in-person'
                    checked={consultationType === "in-person"}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className='text-emerald-600 focus:ring-emerald-500'
                  />
                  <span className='text-gray-700'>In-Person Consultation</span>
                </label>

                <label className='flex items-center space-x-3 cursor-pointer'>
                  <input
                    type='radio'
                    name='consultationType'
                    value='video'
                    checked={consultationType === "video"}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className='text-emerald-600 focus:ring-emerald-500'
                  />
                  <span className='text-gray-700'>Video Consultation</span>
                </label>
              </div>
            </div>

            {consultationType === "video" ? (
              <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
                <h4 className='font-semibold text-blue-800 mb-2'>
                  Video Consultation
                </h4>
                <p className='text-blue-700 text-sm mb-4'>
                  Connect with {doctor.name} via video call. Make sure you have
                  a stable internet connection and allow camera/microphone
                  access.
                </p>

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
                  <button
                    onClick={() => navigate("/login")}
                    className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors'>
                    Login to Join Video Consultation
                  </button>
                )}
              </div>
            ) : (
              /* In-Person Appointment Form */
              <div>
                <h3 className='text-lg font-semibold text-emerald-700 mb-4'>
                  Book In-Person Appointment
                </h3>

                {submitted ? (
                  <div className='text-green-700 text-center font-semibold p-4 bg-green-50 rounded-lg'>
                    Appointment booked successfully!
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className='space-y-4'>
                    <input
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder='Your Name'
                      className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                    />
                    <input
                      name='date'
                      type='date'
                      value={form.date}
                      onChange={handleChange}
                      required
                      className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                    />
                    <input
                      name='time'
                      type='time'
                      value={form.time}
                      onChange={handleChange}
                      required
                      className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                    />
                    <button
                      type='submit'
                      className='w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition-colors'>
                      Book Appointment
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <h3 className='text-lg font-semibold text-emerald-700 mb-3'>
            Important Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600'>
            <div>
              <h4 className='font-medium text-emerald-700 mb-2'>
                For Video Consultations:
              </h4>
              <ul className='space-y-1'>
                <li>• Ensure stable internet connection</li>
                <li>• Find a quiet, private space</li>
                <li>• Have your medical history ready</li>
                <li>• Test your camera and microphone</li>
              </ul>
            </div>
            <div>
              <h4 className='font-medium text-emerald-700 mb-2'>
                For In-Person Appointments:
              </h4>
              <ul className='space-y-1'>
                <li>• Arrive 10 minutes early</li>
                <li>• Bring your ID and medical records</li>
                <li>• Wear a mask if required</li>
                <li>• Follow clinic safety protocols</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
