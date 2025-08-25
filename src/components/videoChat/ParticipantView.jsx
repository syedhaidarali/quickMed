/** @format */
/** @format */

import React, { useRef, useEffect } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import { MicOffIcon, VideoOffIcon } from "../../assets/svg";

const ParticipantView = ({ participantId, mirror = false }) => {
  const micRef = useRef(null);
  const videoRef = useRef(null);

  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  useEffect(() => {
    if (videoRef.current && webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      try {
        mediaStream.addTrack(webcamStream.track);
        videoRef.current.srcObject = mediaStream;
        videoRef.current
          .play()
          .catch((error) => console.error("Video play failed:", error));
      } catch (e) {
        console.error("Failed to add track to MediaStream:", e);
      }
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
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) => console.error("Audio play failed", error));
      } catch (e) {
        console.error("Failed to add mic track to MediaStream:", e);
      }
    } else {
      micRef.current.srcObject = null;
    }
  }, [micStream, micOn]);

  const renderVideoContent = () => {
    if (webcamOn && webcamStream) {
      return (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className='w-full h-full object-contain'
          style={
            isLocal || mirror
              ? { transform: "scaleX(-1)" }
              : { transform: "none" }
          }
          onLoadedMetadata={() =>
            console.log("Video metadata loaded for:", displayName)
          }
          onError={(e) => console.error("Video error for:", displayName, e)}
        />
      );
    }

    return (
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
    );
  };

  return (
    <div className='relative bg-gray-800 rounded-lg overflow-hidden'>
      <audio
        ref={micRef}
        autoPlay
        playsInline
        muted={isLocal}
      />

      {renderVideoContent()}

      {/* Participant name overlay */}
      <div className='absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded'>
        <span className='text-white text-xs'>
          {displayName || "User"} {isLocal ? "(You)" : ""}
        </span>
      </div>

      {/* Status indicators */}
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
};

export default ParticipantView;
