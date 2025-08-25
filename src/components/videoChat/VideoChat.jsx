/** @format */

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth, useDoctor } from "../../context";
import {
  MeetingProvider,
  useMeeting,
  createCameraVideoTrack,
} from "@videosdk.live/react-sdk";
import {
  generateAuthToken,
  createMeeting,
  validateMeeting,
} from "../../config/videoSDK";

// Import our new components
import ParticipantView from "./ParticipantView";
import MeetingControls from "./MeetingControls";
import { ChatPanel, ParticipantsPanel } from "./SidebarPanels";
import { useNavigate } from "react-router-dom";

// ---------------------------
// Meeting View Component
// ---------------------------
function MeetingView({ onLeave, meetingId, participantName, isDoctor }) {
  const [joined, setJoined] = useState(null);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [hdTrackEnabled, setHdTrackEnabled] = useState(false);

  const { join, participants, localParticipant, enableWebcam, disableWebcam } =
    useMeeting({
      onMeetingJoined: async () => {
        setJoined("JOINED");
        toast.success("Joined meeting successfully!");

        // Try to publish a custom HD webcam track for higher quality
        await enableHDWebcam();
      },
      onMeetingLeft: () => {
        onLeave();
      },
      onParticipantJoined: (participant) => {
        toast.info(
          `${participant.displayName || "Someone"} joined the meeting`
        );
      },
      onParticipantLeft: (participant) => {
        toast.info(`${participant.displayName || "Someone"} left the meeting`);
      },
      onError: (error) => {
        toast.error("Meeting error occurred");
      },
    });

  // Enable HD webcam with retry logic
  const enableHDWebcam = async () => {
    if (hdTrackEnabled) return;

    try {
      // Disable existing webcam first
      if (disableWebcam) {
        try {
          await disableWebcam();
          await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay
        } catch (err) {
          // Ignore errors from disabling
        }
      }

      // Create custom HD track
      const customTrack = await createCameraVideoTrack({
        encoderConfig: "h720p_30fps",
        optimizationMode: "motion",
        facingMode: "user",
      });

      // Enable webcam with custom track
      if (enableWebcam) {
        await enableWebcam(customTrack);
        setHdTrackEnabled(true);
        toast.success("HD camera enabled");
      }
    } catch (err) {
      console.warn("Could not enable HD webcam, using default:", err);
      // Fallback to default webcam
      try {
        if (enableWebcam) {
          await enableWebcam();
        }
      } catch (fallbackErr) {
        toast.error(fallbackErr.response.data.data);
      }
    }
  };

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const copyMeetingId = () => {
    if (navigator.clipboard && meetingId) {
      navigator.clipboard.writeText(meetingId);
      toast.success("Meeting code copied to clipboard!");
    } else {
      toast.error("Failed to copy meeting code");
    }
  };

  // Show joining state
  if (joined === "JOINING") {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <div className='text-center text-white'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p>Joining the meeting...</p>
          <p className='text-sm text-gray-400 mt-2'>Please wait...</p>
        </div>
      </div>
    );
  }

  // Show meeting interface when joined
  if (joined === "JOINED") {
    const remoteParticipants = [...participants.keys()].filter(
      (participantId) => participantId !== localParticipant?.id
    );

    return (
      <div className='flex h-screen bg-gray-900'>
        {/* Main Content Area */}
        <div className='flex-1 flex flex-col'>
          {/* Meeting ID Header for Doctor */}
          {isDoctor && meetingId && (
            <div className='bg-blue-600 text-white p-3 text-center'>
              <p className='text-sm font-medium'>
                Share this meeting code with patient:
              </p>
              <div className='flex items-center justify-center gap-2 mt-1'>
                <code className='bg-blue-700 px-3 py-1 rounded font-mono text-lg'>
                  {meetingId}
                </code>
                <button
                  onClick={copyMeetingId}
                  className='bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded text-sm transition-colors'
                  title='Copy meeting code'>
                  📋 Copy
                </button>
              </div>
            </div>
          )}

          {/* Video Grid */}
          <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto'>
            {/* Local Participant */}
            {localParticipant && (
              <ParticipantView
                participantId={localParticipant.id}
                mirror
              />
            )}

            {/* Remote Participants */}
            {remoteParticipants.map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
                mirror
              />
            ))}

            {/* Waiting Message */}
            {remoteParticipants.length === 0 && (
              <div className='bg-gray-800 rounded-lg flex items-center justify-center min-h-[300px]'>
                <div className='text-center text-white'>
                  <div className='w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl'>👥</span>
                  </div>
                  <p className='text-lg font-medium mb-2'>
                    {isDoctor
                      ? "Waiting for patient..."
                      : "Waiting for doctor..."}
                  </p>
                  <p className='text-sm text-gray-400'>
                    Share the meeting code to invite others
                  </p>
                  {!isDoctor && (
                    <p className='text-xs text-gray-500 mt-2'>
                      Make sure you have the correct meeting code
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Meeting Controls */}
          <MeetingControls
            onLeave={onLeave}
            setShowChat={setShowChat}
            showChat={showChat}
            setShowParticipants={setShowParticipants}
            showParticipants={showParticipants}
          />
        </div>

        {/* Sidebar */}
        {(showChat || showParticipants) && (
          <div className='w-80 bg-gray-800 border-l border-gray-700'>
            <ChatPanel
              meetingId={meetingId}
              localParticipant={localParticipant}
              isVisible={showChat}
            />
            <ParticipantsPanel
              participants={participants}
              localParticipant={localParticipant}
              participantName={participantName}
              isDoctor={isDoctor}
              isVisible={showParticipants}
            />
          </div>
        )}
      </div>
    );
  }

  // Show pre-join screen
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <div className='text-center text-white max-w-md mx-auto p-6'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold mb-2'>
            {isDoctor ? "Doctor Portal" : "Patient Portal"}
          </h2>
          <p className='text-gray-400'>
            {isDoctor
              ? "Ready to start your consultation"
              : "Ready to join your consultation"}
          </p>
        </div>

        <div className='bg-gray-800 rounded-lg p-4 mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Meeting Details</h3>
          <div className='text-sm text-gray-300'>
            <p>
              <strong>Meeting ID:</strong> {meetingId}
            </p>
            <p>
              <strong>Participant:</strong> {participantName}
            </p>
            <p>
              <strong>Role:</strong> {isDoctor ? "Doctor" : "Patient"}
            </p>
          </div>
        </div>

        <button
          onClick={joinMeeting}
          className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg'>
          Join Meeting
        </button>

        <p className='text-xs text-gray-500 mt-4'>
          By joining, you agree to allow camera and microphone access
        </p>
      </div>
    </div>
  );
}

// ---------------------------
// Main VideoChat Component
// ---------------------------
const VideoChat = ({
  meetingId,
  doctorId,
  userId,
  userName,
  isPatient = true,
  onLeave,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { doctor } = useDoctor();
  const [authToken, setAuthToken] = useState(null);
  const [finalMeetingId, setFinalMeetingId] = useState(meetingId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default leave behavior: go to home route
  const handleLeave = onLeave || (() => navigate("/"));

  // Determine role & display name
  const isDoctor = !isPatient;
  const currentUser = isDoctor ? doctor : user;
  const participantName = currentUser?.name || userName || "User";

  useEffect(() => {
    const initializeMeeting = async () => {
      try {
        setLoading(true);
        setError(null);

        // Generate auth token
        const token = await generateAuthToken(
          currentUser?._id || userId,
          participantName,
          isDoctor ? ["allow_join", "allow_mod"] : ["allow_join"],
          isDoctor ? "doctor" : "patient"
        );

        setAuthToken(token);

        // Handle meeting creation/validation
        if (isDoctor) {
          if (meetingId === "new" || !meetingId) {
            const newMeeting = await createMeeting(token);
            setFinalMeetingId(newMeeting.roomId);
            toast.success(`New meeting created: ${newMeeting.roomId}`);
          } else {
            try {
              const validation = await validateMeeting(token, meetingId);
              if (validation.isValid) {
                setFinalMeetingId(meetingId);
              } else {
                throw new Error("Invalid meeting");
              }
            } catch (error) {
              console.warn("Meeting validation failed, creating new meeting");
              const newMeeting = await createMeeting(token);
              setFinalMeetingId(newMeeting.roomId);
              toast.success(`New meeting created: ${newMeeting.roomId}`);
            }
          }
        } else {
          // Patient flow: trust meetingId from doctor and attempt to join directly
          if (!meetingId || meetingId === "new") {
            throw new Error("Meeting ID is required for patients");
          }

          // Optionally validate, but don't block joining if validation endpoint fails
          try {
            const validation = await validateMeeting(token, meetingId);
            if (!validation.isValid) {
              console.warn(
                "Validation reported invalid, attempting to join anyway"
              );
            }
          } catch (e) {
            console.warn("Validation request failed, proceeding to join", e);
          }

          setFinalMeetingId(meetingId);
        }
      } catch (error) {
        setError(error.message || "Failed to initialize meeting");
        toast.error(error.message || "Failed to initialize meeting");
      } finally {
        setLoading(false);
      }
    };

    initializeMeeting();
  }, [meetingId, isDoctor, currentUser, userId, participantName]);

  // Handle retry
  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <div className='text-center text-white'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-lg'>Initializing meeting...</p>
          <p className='text-sm text-gray-400 mt-2'>
            Setting up your video call
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !authToken || !finalMeetingId) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <div className='text-center text-white max-w-md mx-auto p-6'>
          <div className='w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-2xl'>⚠️</span>
          </div>
          <h2 className='text-xl font-bold mb-2'>Connection Failed</h2>
          <p className='text-gray-300 mb-6'>
            {error || "Unable to initialize meeting. Please try again."}
          </p>
          <div className='space-y-3'>
            <button
              onClick={handleRetry}
              className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
              Retry Connection
            </button>
            <button
              onClick={handleLeave}
              className='w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main meeting interface
  return (
    <MeetingProvider
      config={{
        meetingId: finalMeetingId,
        name: participantName,
        micEnabled: true,
        webcamEnabled: true,
        participantId: currentUser?._id || userId,
        maxResolution: "hd",
        multiStream: true,
      }}
      token={authToken}
      joinWithoutUserInteraction={false}>
      <MeetingView
        onLeave={handleLeave}
        meetingId={finalMeetingId}
        participantName={participantName}
        isDoctor={isDoctor}
      />
    </MeetingProvider>
  );
};

export default VideoChat;
