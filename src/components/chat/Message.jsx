/** @format */
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Message = ({ message, isOwnMessage, senderProfile }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className='flex items-end space-x-2 max-w-[70%]'>
        {!isOwnMessage && (
          <Avatar className='h-6 w-6'>
            <AvatarImage src={senderProfile?.profileImage} />
            <AvatarFallback className='text-xs bg-gray-200'>
              {senderProfile?.name?.charAt(0) || message.userId?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}

        <div
          className={`px-4 py-2 rounded-2xl text-sm ${
            isOwnMessage
              ? "bg-green-600 text-white rounded-br-md"
              : "bg-gray-200 text-gray-900 rounded-bl-md"
          }`}>
          <p className='break-words'>{message.message}</p>
          <p
            className={`text-xs mt-1 ${
              isOwnMessage ? "text-green-100" : "text-gray-500"
            }`}>
            {formatTime(message.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
