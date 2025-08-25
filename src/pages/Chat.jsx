/** @format */
import React, { useState, useEffect } from "react";
import { useDoctor } from "../context/DoctorContext";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { ConversationList, ChatWindow } from "../components/chat";
import { toast } from "sonner";

const Chat = () => {
  const { allDoctors, doctor } = useDoctor();
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
    threadsLoading,
    messagesLoading,
    confirmConsultation,
    cancelConsultation,
  } = useChat();
  const { user, allUsers } = useAuth();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [restoredSelection, setRestoredSelection] = useState(false);

  const isDoctorRoute = location.pathname === "/doctor/messages";
  const isUserRoute = location.pathname === "/user/message";

  useEffect(() => {
    getAllThreads({ showLoading: true });
  }, []);

  // Restore last selected doctor/thread once after threads load
  useEffect(() => {
    if (restoredSelection) return;
    if (!threads || threads.length === 0) return;

    try {
      const lastDoctorId = localStorage.getItem("chat:lastDoctorId");
      const lastThreadId = localStorage.getItem("chat:lastThreadId");

      // Determine my id based on route
      const selfId = isDoctorRoute
        ? doctor && (doctor._id || doctor.id)
        : user && (user._id || user.id);

      // The list to select the counterpart from
      const counterpartList = isDoctorRoute ? allUsers : allDoctors;

      // Prefer thread if present
      if (lastThreadId) {
        const thread = threads.find(
          (t) => String(t._id) === String(lastThreadId)
        );
        if (thread) {
          const otherParticipant = thread.participants?.find((p) => {
            const id =
              (p.userId && (p.userId._id || p.userId)) || p._id || p.id;
            return String(id) !== String(selfId);
          });
          const counterpartId =
            (otherParticipant &&
              ((otherParticipant.userId &&
                (otherParticipant.userId._id || otherParticipant.userId)) ||
                otherParticipant._id ||
                otherParticipant.id)) ||
            lastDoctorId;
          const counterpart = counterpartList.find(
            (d) => String(d._id) === String(counterpartId)
          );
          if (counterpart) {
            setSelectedDoctor(counterpart);
            getMessageOfSingleThread(thread._id, { showLoading: true });
            startPolling(thread._id);
            setRestoredSelection(true);
            return;
          }
        }
      }

      if (lastDoctorId) {
        const counterpart = counterpartList.find(
          (d) => String(d._id) === String(lastDoctorId)
        );
        if (counterpart) {
          setSelectedDoctor(counterpart);
          setRestoredSelection(true);
          return;
        }
      }
    } catch (e) {
      // ignore restore errors
    }

    setRestoredSelection(true);
  }, [
    threads,
    allDoctors,
    allUsers,
    user,
    doctor,
    isDoctorRoute,
    restoredSelection,
  ]);

  const handleDoctorSelect = async (doctor) => {
    setSelectedDoctor(doctor);
    setNewMessage("");

    try {
      localStorage.setItem("chat:lastDoctorId", doctor._id);
    } catch (e) {}

    // Find if there's an existing thread with this doctor
    const existingThread = threads.find((thread) =>
      thread.participants.some((p) => p.userId === doctor._id)
    );

    if (existingThread) {
      // Load existing messages for this thread
      await getMessageOfSingleThread(existingThread._id, { showLoading: true });
      startPolling(existingThread._id);
      try {
        localStorage.setItem("chat:lastThreadId", existingThread._id);
      } catch (e) {}
    } else {
      // Clear messages for new conversation
      // messages are managed in ChatContext; no direct reset here
      stopPolling();
    }
  };

  const handleThreadSelect = async (thread, doctor) => {
    setSelectedDoctor(doctor);
    setNewMessage("");
    await getMessageOfSingleThread(thread._id, { showLoading: true });
    startPolling(thread._id);
    try {
      localStorage.setItem("chat:lastDoctorId", doctor._id);
      localStorage.setItem("chat:lastThreadId", thread._id);
    } catch (e) {}
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedDoctor) return;

    try {
      await sendMessage(selectedDoctor._id, newMessage);
      setNewMessage("");

      // After sending, refresh threads and start polling for new messages
      await getAllThreads({ showLoading: false });

      // Find the new thread and start polling
      const newThread = threads.find((thread) =>
        thread.participants.some((p) => p.userId === selectedDoctor._id)
      );

      if (newThread) {
        startPolling(newThread._id);
        await getMessageOfSingleThread(newThread._id, { showLoading: true });
        try {
          localStorage.setItem("chat:lastThreadId", newThread._id);
        } catch (e) {}
      }
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };

  return (
    <div className='h-screen flex bg-gray-100'>
      {/* Left Sidebar - Conversation List */}
      <div className='w-80 bg-white border-r'>
        <ConversationList
          allDoctors={allDoctors}
          allUsers={allUsers}
          threads={threads}
          threadsLoading={threadsLoading}
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
          messagesLoading={messagesLoading}
          currentThread={currentThread}
          allDoctors={allDoctors}
          allUsers={allUsers}
          user={user}
          doctorSelf={doctor}
          participants={
            threads.find((t) => t._id === currentThread)?.participants || []
          }
          onConfirmConsultation={confirmConsultation}
          onCancelConsultation={cancelConsultation}
          isDoctorRoute={isDoctorRoute}
        />
      </div>
    </div>
  );
};

export default Chat;
