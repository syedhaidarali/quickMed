/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { toast } from "sonner";
import { VideoChat } from "../components/videoChat";

const Consultation = () => {
  const { meetingId, doctorId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isInConsultation, setIsInConsultation] = useState(false);
  const [consultationData, setConsultationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to join consultation");
      navigate("/login");
      return;
    }

    if (!meetingId) {
      toast.error("Invalid consultation link");
      navigate("/");
      return;
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
        doctorId,
        patientId: user?._id,
        patientName: user?.name,
        startTime: new Date().toISOString(),
      });

      setIsInConsultation(true);
    } catch (error) {
      toast.error("Failed to start consultation");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveConsultation = () => {
    setIsInConsultation(false);
    toast.info("Consultation ended");
    navigate("/");
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
          userId={consultationData.patientId}
          userName={consultationData.patientName}
          isPatient={true}
          onLeave={handleLeaveConsultation}
        />
      )}
    </div>
  );
};

export default Consultation;
