/** @format */

import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { useDoctor } from "../../context/DoctorContext";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  usePubSub,
  createCameraVideoTrack, // <-- new import for custom HD track
} from "@videosdk.live/react-sdk";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  ChatIcon,
  UsersIcon,
  PhoneIcon,
} from "../../assets/svg";
import {
  generateAuthToken,
  createMeeting,
  validateMeeting,
} from "../../config/videoSDK";

// ---------------------------
// Participant View Component
// ---------------------------
function ParticipantView({ participantId }) {
  const micRef = useRef(null);
  const videoRef = useRef(null);
  // get participant streams + metadata
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  useEffect(() => {
    if (videoRef.current && webcamOn && webcamStream) {
      // create a MediaStream for the video element
      const mediaStream = new MediaStream();
      try {
        mediaStream.addTrack(webcamStream.track);
      } catch (e) {
        console.error("Failed to add track to MediaStream:", e);
      }
      videoRef.current.srcObject = mediaStream;
      videoRef.current
        .play()
        .catch((error) => console.error("Video play failed:", error));
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [webcamStream, webcamOn, displayName]);

  useEffect(() => {
    if (!micRef.current) return;
    if (micOn && micStream) {
      const mediaStream = new MediaStream();
      try {
        mediaStream.addTrack(micStream.track);
      } catch (e) {
        console.error("Failed to add mic track to MediaStream:", e);
      }
      micRef.current.srcObject = mediaStream;
      micRef.current
        .play()
        .catch((error) => console.error("audio play failed", error));
    } else {
      micRef.current.srcObject = null;
    }
  }, [micStream, micOn]);

  return (
    <div className='relative bg-gray-800 rounded-lg overflow-hidden'>
      <audio
        ref={micRef}
        autoPlay
        playsInline
        muted={isLocal}
      />
      {webcamOn && webcamStream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          // use contain to avoid stretching low-res video
          className='w-full h-full object-contain'
          // ONLY mirror the local preview — remote participants are NOT mirrored
          style={isLocal ? { transform: "scaleX(-1)" } : { transform: "none" }}
          onLoadedMetadata={() =>
            console.log("Video metadata loaded for:", displayName)
          }
          onError={(e) => console.error("Video error for:", displayName, e)}
        />
      ) : (
        <div className='w-full h-full flex items-center justify-center bg-gray-700'>
          <div className='text-center text-white'>
            <div className='w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2'>
              <span className='text-2xl font-medium'>
                {(displayName || "U").charAt(0).toUpperCase()}
              </span>
            </div>
            <p className='text-sm'>{displayName || "User"}</p>
            <p className='text-xs text-gray-400'>Camera off</p>
          </div>
        </div>
      )}
      <div className='absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded'>
        <span className='text-white text-xs'>
          {displayName || "User"} {isLocal ? "(You)" : ""}
        </span>
      </div>
      <div className='absolute top-2 right-2 flex space-x-1'>
        {!micOn && (
          <div className='w-6 h-6 bg-red-600 rounded-full flex items-center justify-center'>
            <MicOffIcon />
          </div>
        )}
        {!webcamOn && (
          <div className='w-6 h-6 bg-red-600 rounded-full flex items-center justify-center'>
            <VideoOffIcon />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------
// Controls Component
// ---------------------------
function Controls({
  onLeave,
  setShowChat,
  showChat,
  setShowParticipants,
  showParticipants,
}) {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  const handleLeave = () => {
    leave();
    if (onLeave) onLeave();
  };

  return (
    <div className='bg-gray-800 p-4'>
      <div className='flex items-center justify-center space-x-4'>
        <button
          onClick={toggleMic}
          className='p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors'
          title='Toggle Microphone'>
          <MicIcon />
        </button>

        <button
          onClick={toggleWebcam}
          className='p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors'
          title='Toggle Camera'>
          <VideoIcon />
        </button>

        <button
          onClick={() => setShowChat(!showChat)}
          className='p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors'
          title='Toggle Chat'>
          <ChatIcon />
        </button>

        <button
          onClick={() => setShowParticipants(!showParticipants)}
          className='p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors'
          title='Participants'>
          <UsersIcon />
        </button>

        <button
          onClick={handleLeave}
          className='p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors'
          title='Leave Meeting'>
          <PhoneIcon />
        </button>
      </div>
    </div>
  );
}

// ---------------------------
// Meeting View Component
// ---------------------------
function MeetingView({ onLeave, meetingId, participantName, isDoctor }) {
  const [joined, setJoined] = useState(null);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  // gather meeting helpers (we also need enableWebcam/disableWebcam to publish custom tracks)
  const { join, participants, localParticipant, enableWebcam, disableWebcam } =
    useMeeting({
      onMeetingJoined: async () => {
        setJoined("JOINED");
        toast.success("Joined meeting successfully!");

        // Try to publish a custom HD webcam track for higher quality
        // (best-effort — failure here won't break the meeting)
        (async function publishHD() {
          try {
            // disable existing webcam (ignore errors)
            if (disableWebcam) {
              try {
                await disableWebcam();
              } catch (err) {
                // ignore if not enabled or already disabled
              }
            }

            // create a custom HD track: encoderConfig presets like 'h720p_30fps'
            const customTrack = await createCameraVideoTrack({
              encoderConfig: "h720p_30fps", // request 720p 30fps
              optimizationMode: "motion", // better for people/motion
              facingMode: "user",
            });

            // enable webcam with the custom track (SDK accepts custom track)
            if (enableWebcam) {
              await enableWebcam(customTrack);
              console.log("Published custom HD webcam track");
              toast.success("Using HD camera (if supported)");
            }
          } catch (err) {
            // fallback: don't block the meeting; show small console warning
            console.warn("Could not publish HD webcam track:", err);
          }
        })();
      },
      onMeetingLeft: () => {
        onLeave();
      },
      onParticipantJoined: (participant) => {
        console.log("Participant joined:", participant);
      },
      onParticipantLeft: (participant) => {
        console.log("Participant left:", participant);
      },
    });

  // PubSub (chat)
  const { publish, messages } = usePubSub("CHAT", {
    onMessageReceived: (message) => {
      toast.info(`${message.senderName} sent a message`);
    },
  });

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const sendMessage = () => {
    if (newMessage.trim() && publish) {
      try {
        publish(newMessage, { persist: true });
        setNewMessage("");
        toast.success("Message sent!");
      } catch (error) {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message. Please try again.");
      }
    } else if (newMessage.trim()) {
      toast.error("Chat not available. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (joined === "JOINING") {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <div className='text-center text-white'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p>Joining the meeting...</p>
        </div>
      </div>
    );
  }

  if (joined === "JOINED") {
    return (
      <div className='flex h-screen bg-gray-900'>
        <div className='flex-1 flex flex-col'>
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
                  onClick={() => {
                    navigator.clipboard.writeText(meetingId);
                    toast.success("Meeting code copied to clipboard!");
                  }}
                  className='bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded text-sm transition-colors'
                  title='Copy meeting code'>
                  📋 Copy
                </button>
              </div>
            </div>
          )}

          <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {/* Local Participant */}
            {localParticipant && (
              <ParticipantView participantId={localParticipant.id} />
            )}

            {/* Remote Participants */}
            {[...participants.keys()]
              .filter((participantId) => participantId !== localParticipant?.id)
              .map((participantId) => (
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                />
              ))}

            {[...participants.keys()].filter(
              (participantId) => participantId !== localParticipant?.id
            ).length === 0 && (
              <div className='bg-gray-800 rounded-lg flex items-center justify-center'>
                <div className='text-center text-white'>
                  <div className='w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2'>
                    <span className='text-2xl font-medium'>👤</span>
                  </div>
                  <p className='text-sm'>
                    {isDoctor
                      ? "Waiting for patient..."
                      : "Waiting for doctor..."}
                  </p>
                  <p className='text-xs text-gray-400 mt-1'>
                    Share the meeting code to invite others
                  </p>
                </div>
              </div>
            )}
          </div>

          <Controls
            onLeave={onLeave}
            setShowChat={setShowChat}
            showChat={showChat}
            setShowParticipants={setShowParticipants}
            showParticipants={showParticipants}
          />
        </div>

        {/* Chat / Participants Sidebar */}
        <div className='w-80 bg-gray-800 border-l border-gray-700'>
          {showChat && (
            <div className='h-full flex flex-col'>
              <div className='p-4 border-b border-gray-700'>
                <h3 className='text-white font-semibold'>Chat</h3>
                <p className='text-gray-400 text-xs'>Meeting: {meetingId}</p>
              </div>

              <div
                className='flex-1 overflow-y-auto p-4 space-y-3'
                ref={chatContainerRef}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg ${
                      msg.senderId === localParticipant?.id
                        ? "bg-blue-600 ml-8"
                        : "bg-gray-700 mr-8"
                    }`}>
                    <div className='flex justify-between items-start mb-1'>
                      <span
                        className={`font-medium text-sm ${
                          msg.senderId === localParticipant?.id
                            ? "text-blue-100"
                            : "text-blue-400"
                        }`}>
                        {msg.senderName || "Unknown"}
                      </span>
                      <span className='text-gray-400 text-xs'>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className='text-sm text-white'>{msg.message}</p>
                  </div>
                ))}

                {messages.length === 0 && (
                  <div className='text-center text-gray-400 text-sm py-8'>
                    <p>No messages yet</p>
                    <p className='text-xs mt-1'>Start the conversation!</p>
                  </div>
                )}
              </div>

              <div className='p-4 border-t border-gray-700'>
                <div className='flex space-x-2'>
                  <div className='flex-1 relative'>
                    <input
                      type='text'
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder='Type a message...'
                      className='w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      maxLength={500}
                      disabled={joined !== "JOINED" || !publish}
                    />
                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400'>
                      {newMessage.length}/500
                    </div>
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={
                      !newMessage.trim() || joined !== "JOINED" || !publish
                    }
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {showParticipants && (
            <div className='h-full flex flex-col'>
              <div className='p-4 border-b border-gray-700'>
                <h3 className='text-white font-semibold'>Participants</h3>
                <p className='text-gray-400 text-xs'>
                  {participants.size + 1} online
                </p>
              </div>

              <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                <div className='flex items-center space-x-3 p-2 bg-gray-700 rounded-lg'>
                  <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                    <span className='text-white text-sm font-medium'>
                      {participantName?.charAt(0) || "U"}
                    </span>
                  </div>
                  <span className='text-white text-sm'>{participantName}</span>
                  <span className='text-xs bg-blue-600 text-white px-2 py-1 rounded-full'>
                    {isDoctor ? "Doctor" : "Patient"}
                  </span>
                </div>

                <div className='text-center text-gray-400 text-sm py-4'>
                  <p>Other participants will appear here</p>
                  <p className='text-xs mt-1'>
                    Share the meeting code to invite others
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <div className='text-center text-white'>
        <h3 className='text-xl mb-4'>Meeting ID: {meetingId}</h3>
        <button
          onClick={joinMeeting}
          className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'>
          Join Meeting
        </button>
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
  const { user } = useAuth();
  const { doctor } = useDoctor();
  const [authToken, setAuthToken] = useState(null);
  const [finalMeetingId, setFinalMeetingId] = useState(meetingId);
  const [loading, setLoading] = useState(true);

  // Determine role & display name
  const isDoctor = !isPatient;
  const currentUser = isDoctor ? doctor : user;
  const participantName = currentUser?.name || userName || "User";

  useEffect(() => {
    const initializeMeeting = async () => {
      try {
        setLoading(true);

        // Generate auth token (your implementation returns token)
        const token = await generateAuthToken(
          currentUser?._id || userId,
          participantName,
          isDoctor ? ["allow_join", "allow_mod"] : ["allow_join"],
          isDoctor ? "doctor" : "user"
        );

        setAuthToken(token);

        // Doctor: create new meeting if needed, otherwise validate
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
              const newMeeting = await createMeeting(token);
              setFinalMeetingId(newMeeting.roomId);
              toast.success(`New meeting created: ${newMeeting.roomId}`);
            }
          }
        } else {
          // Patient must provide an existing meeting id
          if (!meetingId || meetingId === "new") {
            throw new Error("Meeting ID is required for patients");
          }
          const validation = await validateMeeting(token, meetingId);
          if (!validation.isValid) {
            throw new Error("Invalid meeting ID");
          }
          setFinalMeetingId(meetingId);
        }
      } catch (error) {
        console.error("Failed to initialize meeting:", error);
        toast.error(error.message || "Failed to initialize meeting");
        if (onLeave) onLeave();
      } finally {
        setLoading(false);
      }
    };

    initializeMeeting();
  }, [meetingId, isDoctor, currentUser, userId, participantName, onLeave]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <div className='text-center text-white'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p>Initializing meeting...</p>
        </div>
      </div>
    );
  }

  if (!authToken || !finalMeetingId) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <div className='text-center text-white'>
          <p>Failed to initialize meeting</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <MeetingProvider
      // Request HD upload and disable multiStream (best for 1:1 or small groups)
      config={{
        meetingId: finalMeetingId,
        name: participantName,
        micEnabled: true,
        webcamEnabled: true,
        participantId: currentUser?._id || userId,
        maxResolution: "hd", // request 720p upload
        multiStream: false, // simpler SFU handling for 1:1
      }}
      token={authToken}
      joinWithoutUserInteraction={false}>
      <MeetingView
        onLeave={onLeave}
        meetingId={finalMeetingId}
        participantName={participantName}
        isDoctor={isDoctor}
      />
    </MeetingProvider>
  );
};

export default VideoChat;
