/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { toast } from "sonner";
import { createMeeting, generateAuthToken } from "../../config/videoSDK";

const ConsultationLauncher = ({ doctorId, doctorName, isDoctor = false }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [meetingCode, setMeetingCode] = useState("");

  const startConsultation = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to start consultation");
      navigate("/login");
      return;
    }

    // Only doctors can create meetings
    if (!isDoctor) {
      toast.error(
        "Only doctors can create meetings. Please ask the doctor for a meeting code."
      );
      return;
    }

    try {
      setIsCreating(true);

      // Generate auth token for VideoSDK
      const authToken = await generateAuthToken(user._id, user.name);

      // Create a new meeting using VideoSDK
      const meetingData = await createMeeting(authToken);

      if (meetingData && meetingData.roomId) {
        const meetingId = meetingData.roomId;

        // Doctor starting consultation
        navigate(`/doctor/consultation/${meetingId}/${user._id}`);

        toast.success("Consultation started successfully!");
      } else {
        throw new Error("Failed to create meeting");
      }
    } catch (error) {
      console.error("Failed to start consultation:", error);
      toast.error("Failed to start consultation. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const joinConsultation = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to join consultation");
      navigate("/login");
      return;
    }

    if (!meetingCode.trim()) {
      toast.error("Please enter a consultation code");
      return;
    }

    try {
      setIsJoining(true);

      if (isDoctor) {
        navigate(`/doctor/consultation/${meetingCode}/patient_waiting`);
      } else {
        navigate(`/consultation/${meetingCode}/${doctorId}`);
      }

      toast.success("Joining consultation...");
    } catch (error) {
      console.error("Failed to join consultation:", error);
      toast.error("Failed to join consultation");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
      <h4 className='font-semibold text-blue-800 mb-2'>Video Consultation</h4>
      <p className='text-blue-700 text-sm mb-4'>
        Connect with {doctorName} via video call. Make sure you have a stable
        internet connection and allow camera/microphone access.
      </p>

      <div className='space-y-3'>
        {isDoctor ? (
          <button
            onClick={startConsultation}
            disabled={isCreating}
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
            {isCreating ? "Creating Meeting..." : "Start Video Consultation"}
          </button>
        ) : (
          <div className='text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
            <p className='text-yellow-800 text-sm mb-2'>
              <strong>Note:</strong> Only doctors can create meetings
            </p>
            <p className='text-yellow-700 text-xs'>
              Please ask the doctor to start the consultation and provide you
              with a meeting code.
            </p>
          </div>
        )}

        <div className='flex gap-2'>
          <input
            type='text'
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            placeholder={
              isDoctor
                ? "Enter meeting code to join"
                : "Enter meeting code from doctor"
            }
            className='flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          <button
            onClick={joinConsultation}
            disabled={isJoining || !meetingCode.trim()}
            className='bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
            {isJoining ? "Joining..." : "Join"}
          </button>
        </div>
      </div>

      <div className='mt-4 text-xs text-blue-600'>
        <p>• Ensure stable internet connection</p>
        <p>• Allow camera and microphone access</p>
        <p>• Find a quiet, private space</p>
        <p>
          • Meeting codes are generated automatically when starting a
          consultation
        </p>
      </div>
    </div>
  );
};

export default ConsultationLauncher;
