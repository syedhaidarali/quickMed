/** @format */
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send, Phone, Video, MoreVertical, MessageCircle } from "lucide-react";
import MessagesList from "./MessagesList";

const ChatWindow = ({
  selectedDoctor,
  messages,
  newMessage,
  setNewMessage,
  onSendMessage,
  loading,
  currentThread,
  allDoctors,
  user,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!selectedDoctor) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a doctor to start chatting
          </h3>
          <p className="text-gray-500">
            Choose from the list to begin your conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b bg-green-600 text-white">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedDoctor.profileImage} />
            <AvatarFallback className="bg-green-100 text-green-600">
              {selectedDoctor.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{selectedDoctor.name}</h3>
            <p className="text-sm text-green-100">{selectedDoctor.specialty}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-green-700">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-green-700">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-green-700">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <MessagesList 
          messages={messages} 
          currentUserId={currentThread?.userId} 
          allDoctors={allDoctors}
          user={user}
        />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
            className="flex-1 bg-gray-50 border-0 focus:bg-white"
            disabled={loading}
          />
          <Button
            onClick={onSendMessage}
            disabled={!newMessage.trim() || loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
