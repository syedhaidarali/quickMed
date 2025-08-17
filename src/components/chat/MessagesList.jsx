/** @format */
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import Message from "./Message";

const MessagesList = ({ messages, currentUserId, allDoctors, user }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </div>
      </div>
    );
  }

  // Function to get sender profile
  const getSenderProfile = (message) => {
    if (message.userId === user?._id) {
      return user; // Current user's profile
    } else {
      // Find doctor profile by userId
      return allDoctors.find(doctor => doctor._id === message.userId);
    }
  };

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-3">
        {messages.map((message) => {
          const senderProfile = getSenderProfile(message);
          return (
            <Message
              key={message._id}
              message={message}
              isOwnMessage={message.userId === currentUserId}
              senderProfile={senderProfile}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
