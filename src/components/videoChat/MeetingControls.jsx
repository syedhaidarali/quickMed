/** @format */

import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  ChatIcon,
  UsersIcon,
  PhoneIcon,
} from "../../assets/svg";

const MeetingControls = ({
  onLeave,
  setShowChat,
  showChat,
  setShowParticipants,
  showParticipants,
}) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const [isToggling, setIsToggling] = useState({ mic: false, webcam: false });

  const { leave, toggleMic, toggleWebcam, localParticipant } = useMeeting();

  // Handle microphone toggle with proper state management
  const handleMicToggle = async () => {
    if (isToggling.mic) return; // Prevent multiple rapid clicks

    setIsToggling((prev) => ({ ...prev, mic: true }));

    try {
      await toggleMic();
      setIsMicOn((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.data);
    } finally {
      setIsToggling((prev) => ({ ...prev, mic: false }));
    }
  };

  // Handle camera toggle with proper state management
  const handleWebcamToggle = async () => {
    if (isToggling.webcam) return; // Prevent multiple rapid clicks

    setIsToggling((prev) => ({ ...prev, webcam: true }));

    try {
      await toggleWebcam();
      setIsWebcamOn((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.data);
    } finally {
      setIsToggling((prev) => ({ ...prev, webcam: false }));
    }
  };

  const handleLeave = async () => {
    try {
      await leave();
      if (onLeave) onLeave();
    } catch (error) {
      toast.error(error.response.data.data);
      if (onLeave) onLeave(); // Still call onLeave even if leave fails
    }
  };

  // Sync local state with participant state
  React.useEffect(() => {
    if (localParticipant) {
      setIsMicOn(localParticipant.micOn);
      setIsWebcamOn(localParticipant.webcamOn);
    }
  }, [localParticipant?.micOn, localParticipant?.webcamOn]);

  const controlButtons = [
    {
      icon: isMicOn ? <MicIcon /> : <MicOffIcon />,
      onClick: handleMicToggle,
      title: isMicOn ? "Turn off microphone" : "Turn on microphone",
      bgColor: isMicOn
        ? "bg-gray-700 hover:bg-gray-600"
        : "bg-red-600 hover:bg-red-700",
      disabled: isToggling.mic,
    },
    {
      icon: isWebcamOn ? <VideoIcon /> : <VideoOffIcon />,
      onClick: handleWebcamToggle,
      title: isWebcamOn ? "Turn off camera" : "Turn on camera",
      bgColor: isWebcamOn
        ? "bg-gray-700 hover:bg-gray-600"
        : "bg-red-600 hover:bg-red-700",
      disabled: isToggling.webcam,
    },
    {
      icon: <ChatIcon />,
      onClick: () => setShowChat(!showChat),
      title: showChat ? "Hide chat" : "Show chat",
      bgColor: showChat
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-gray-700 hover:bg-gray-600",
      disabled: false,
    },
    {
      icon: <UsersIcon />,
      onClick: () => setShowParticipants(!showParticipants),
      title: showParticipants ? "Hide participants" : "Show participants",
      bgColor: showParticipants
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-gray-700 hover:bg-gray-600",
      disabled: false,
    },
    {
      icon: <PhoneIcon />,
      onClick: handleLeave,
      title: "Leave meeting",
      bgColor: "bg-red-600 hover:bg-red-700",
      disabled: false,
    },
  ];

  return (
    <div className='bg-gray-800 p-4'>
      <div className='flex items-center justify-center space-x-4'>
        {controlButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            disabled={button.disabled}
            className={`p-3 rounded-full text-white transition-colors ${
              button.bgColor
            } ${button.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            title={button.title}>
            {button.disabled && (index === 0 || index === 1) ? (
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
            ) : (
              button.icon
            )}
          </button>
        ))}
      </div>

      {/* Status indicators */}
      <div className='flex items-center justify-center mt-2 space-x-4 text-xs text-gray-400'>
        <span className={isMicOn ? "text-green-400" : "text-red-400"}>
          {isMicOn ? "🎤 Mic On" : "🎤 Mic Off"}
        </span>
        <span className={isWebcamOn ? "text-green-400" : "text-red-400"}>
          {isWebcamOn ? "📹 Camera On" : "📹 Camera Off"}
        </span>
      </div>
    </div>
  );
};

export default MeetingControls;
