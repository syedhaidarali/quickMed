/** @format */

import React, { useState, useRef, useEffect } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";
import { toast } from "sonner";

const ChatPanel = ({ meetingId, localParticipant, isVisible }) => {
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const { publish, messages } = usePubSub("CHAT", {
    onMessageReceived: (message) => {
      if (message.senderId !== localParticipant?.id) {
        toast.info(`${message.senderName} sent a message`);
      }
    },
  });

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    if (!publish) {
      toast.error("Chat not available. Please try again.");
      return;
    }

    try {
      await publish(newMessage.trim(), { persist: true });
      setNewMessage("");
      // Don't show toast for own messages to avoid spam
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isVisible) return null;

  return (
    <div className='h-full flex flex-col bg-gray-800'>
      {/* Chat Header */}
      <div className='p-4 border-b border-gray-700'>
        <h3 className='text-white font-semibold flex items-center'>
          <span className='mr-2'>💬</span>
          Chat
        </h3>
        <p className='text-gray-400 text-xs'>Meeting: {meetingId}</p>
      </div>

      {/* Messages Container */}
      <div
        className='flex-1 overflow-y-auto p-4 space-y-3'
        ref={chatContainerRef}>
        {messages.length === 0 ? (
          <div className='text-center text-gray-400 text-sm py-8'>
            <div className='mb-2'>💬</div>
            <p>No messages yet</p>
            <p className='text-xs mt-1'>Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.senderId === localParticipant?.id;
            return (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-xs ${
                  isOwnMessage ? "bg-blue-600 ml-auto" : "bg-gray-700 mr-auto"
                }`}>
                <div className='flex justify-between items-start mb-1'>
                  <span
                    className={`font-medium text-sm ${
                      isOwnMessage ? "text-blue-100" : "text-blue-400"
                    }`}>
                    {isOwnMessage ? "You" : msg.senderName || "Unknown"}
                  </span>
                  <span className='text-gray-300 text-xs ml-2'>
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
                <p className='text-sm text-white break-words'>{msg.message}</p>
              </div>
            );
          })
        )}
      </div>

      {/* Message Input */}
      <div className='p-4 border-t border-gray-700'>
        <div className='flex space-x-2'>
          <div className='flex-1 relative'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Type a message...'
              className='w-full px-3 py-2 pr-12 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              maxLength={500}
              disabled={!publish}
            />
            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400'>
              {newMessage.length}/500
            </div>
          </div>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !publish}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
            Send
          </button>
        </div>
        <p className='text-xs text-gray-400 mt-1'>
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

// Participants Panel Component
const ParticipantsPanel = ({
  participants,
  localParticipant,
  participantName,
  isDoctor,
  isVisible,
}) => {
  if (!isVisible) return null;

  const allParticipants = [
    // Local participant first
    {
      id: localParticipant?.id,
      name: participantName,
      isLocal: true,
      role: isDoctor ? "Doctor" : "Patient",
    },
    // Remote participants
    ...Array.from(participants.entries()).map(([id, participant]) => ({
      id,
      name: participant.displayName || "Unknown",
      isLocal: false,
      role: "Participant",
    })),
  ];

  return (
    <div className='h-full flex flex-col bg-gray-800'>
      {/* Participants Header */}
      <div className='p-4 border-b border-gray-700'>
        <h3 className='text-white font-semibold flex items-center'>
          <span className='mr-2'>👥</span>
          Participants
        </h3>
        <p className='text-gray-400 text-xs'>{allParticipants.length} online</p>
      </div>

      {/* Participants List */}
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        {allParticipants.map((participant) => (
          <div
            key={participant.id}
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              participant.isLocal ? "bg-blue-700" : "bg-gray-700"
            }`}>
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
              <span className='text-white text-sm font-medium'>
                {participant.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div className='flex-1'>
              <span className='text-white text-sm'>
                {participant.name} {participant.isLocal && "(You)"}
              </span>
              <div className='flex items-center space-x-2 mt-1'>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    participant.role === "Doctor"
                      ? "bg-green-600 text-white"
                      : participant.role === "Patient"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-600 text-white"
                  }`}>
                  {participant.role}
                </span>
                {participant.isLocal && (
                  <span className='text-xs bg-yellow-600 text-white px-2 py-1 rounded-full'>
                    Host
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {participants.size === 0 && (
          <div className='text-center text-gray-400 text-sm py-8'>
            <div className='mb-2'>👥</div>
            <p>Waiting for others to join...</p>
            <p className='text-xs mt-1'>
              Share the meeting code to invite participants
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { ChatPanel, ParticipantsPanel };
