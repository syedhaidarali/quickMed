/** @format */
import React, { useState, useEffect } from "react";
import { useDoctor } from "../context/DoctorContext";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { ConversationList, ChatWindow } from "../components/chat";

const Chat = () => {
  const { allDoctors } = useDoctor();
  const {
    sendMessage,
    loading,
    threads,
    messages,
    getAllThreads,
    getMessageOfSingleThread,
    startPolling,
    stopPolling,
    currentThread,
  } = useChat();
  const { user } = useAuth();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const isDoctorRoute = location.pathname === "/doctor/messages";
  const isUserRoute = location.pathname === "/user/message";

  useEffect(() => {
    getAllThreads();
  }, []);

  const handleDoctorSelect = async (doctor) => {
    setSelectedDoctor(doctor);
    setNewMessage("");

    // Find if there's an existing thread with this doctor
    const existingThread = threads.find((thread) =>
      thread.participants.some((p) => p.userId === doctor._id)
    );

    if (existingThread) {
      // Load existing messages for this thread
      await getMessageOfSingleThread(existingThread._id);
      startPolling(existingThread._id);
    } else {
      // Clear messages for new conversation
      setMessages([]);
      stopPolling();
    }
  };

  const handleThreadSelect = async (thread, doctor) => {
    setSelectedDoctor(doctor);
    setNewMessage("");
    await getMessageOfSingleThread(thread._id);
    startPolling(thread._id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedDoctor) return;

    try {
      await sendMessage(selectedDoctor._id, newMessage);
      setNewMessage("");

      // After sending, refresh threads and start polling for new messages
      await getAllThreads();

      // Find the new thread and start polling
      const newThread = threads.find((thread) =>
        thread.participants.some((p) => p.userId === selectedDoctor._id)
      );

      if (newThread) {
        startPolling(newThread._id);
        await getMessageOfSingleThread(newThread._id);
      }

      console.log("Message sent successfully to:", selectedDoctor.name);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className='h-screen flex bg-gray-100'>
      {/* Left Sidebar - Conversation List */}
      <div className='w-80 bg-white border-r'>
        <ConversationList
          allDoctors={allDoctors}
          threads={threads}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDoctor={selectedDoctor}
          onDoctorSelect={handleDoctorSelect}
          onThreadSelect={handleThreadSelect}
          currentThread={currentThread}
          user={user}
          isDoctorRoute={isDoctorRoute}
          isUserRoute={isUserRoute}
        />
      </div>

      {/* Right Side - Chat Window */}
      <div className='flex-1'>
        <ChatWindow
          selectedDoctor={selectedDoctor}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          loading={loading}
          currentThread={currentThread}
          allDoctors={allDoctors}
          user={user}
        />
      </div>
    </div>
  );
};

export default Chat;
