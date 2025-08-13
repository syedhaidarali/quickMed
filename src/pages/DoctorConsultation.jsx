/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import VideoChat from "../components/videoChat/VideoChat";
import { toast } from "sonner";
import { useDoctor } from "../context/DoctorContext";

const DoctorConsultation = () => {
  const { meetingId, patientId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isInConsultation, setIsInConsultation] = useState(false);
  const [consultationData, setConsultationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { doctor } = useDoctor();

  useEffect(() => {
    if (!doctor) {
      toast.error("Please login to host consultation");
      navigate("/doctor/login");
      return;
    }

    if (!meetingId || meetingId === "new") {
      // This is fine - doctor can create new meetings
      console.log("Doctor creating new consultation");
    }

    // Initialize consultation
    initializeConsultation();
  }, [meetingId, isAuthenticated]);

  const initializeConsultation = async () => {
    try {
      setLoading(true);

      // Here you would typically fetch consultation details from your API
      // For now, we'll use the meetingId directly
      setConsultationData({
        meetingId,
        doctorId: user?._id,
        doctorName: user?.name,
        patientId,
        startTime: new Date().toISOString(),
      });

      setIsInConsultation(true);
    } catch (error) {
      console.error("Failed to initialize consultation:", error);
      toast.error("Failed to start consultation");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveConsultation = () => {
    setIsInConsultation(false);
    toast.info("Consultation ended");
    navigate("/doctor/dashboard");
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <div className='text-center text-white'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p>Initializing consultation...</p>
        </div>
      </div>
    );
  }

  if (!consultationData) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <div className='text-center text-white'>
          <p>Failed to load consultation</p>
          <button
            onClick={() => navigate("/")}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen'>
      {isInConsultation && (
        <VideoChat
          meetingId={consultationData.meetingId}
          doctorId={consultationData.doctorId}
          userId={consultationData.doctorId}
          userName={consultationData.doctorName}
          isPatient={false}
          onLeave={handleLeaveConsultation}
        />
      )}
    </div>
  );
};

export default DoctorConsultation;
