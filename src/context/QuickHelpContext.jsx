/** @format */

"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { quickHelpService } from "../services";
import { toast } from "sonner";

const QuickHelpContext = createContext();

export const QuickHelpProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatContainerRef = useRef(null);

  const MIN_CHARACTERS = 11;
  const isInputValid = inputMessage.trim().length >= MIN_CHARACTERS;

  // Auto-scroll when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize chat when modal opens
  useEffect(() => {
    if (isModalOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: "bot",
          content:
            "Hello! I'm Dr. AI, your virtual health assistant. I'm here to help you find the right doctor based on your symptoms. Please describe what you're experiencing in detail (minimum 11 characters).",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isModalOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading || !isInputValid) return;

    const userMessage = quickHelpService.createUserMessage(inputMessage);
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await quickHelpService.getDoctorRecommendations(
        inputMessage
      );
      console.log("Full API response:", response);
      const recommendations = response?.data?.data;

      const botResponse = quickHelpService.createBotMessage(
        "Based on your symptoms, here's my detailed medical analysis and recommendations:",
        recommendations,
        response?.data
      );

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      const errorMessage = quickHelpService.createErrorMessage(
        "I apologize, but I'm having trouble processing your request right now. Please try again in a moment."
      );
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isInputValid) {
        handleSendMessage();
      } else {
        toast.error(
          `Please enter at least ${MIN_CHARACTERS} characters to describe your symptoms.`
        );
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Don't clear messages here - they persist in context
  };

  const clearChat = () => {
    setMessages([]);
    setInputMessage("");
  };

  const handleSpecialtyClick = (specialty) => {
    const searchParams = new URLSearchParams({
      specialty: specialty,
      source: "ai-recommendation",
    });

    closeModal();

    const urlFriendlySpecialty = quickHelpService.formatUrlFriendly(specialty);
    window.location.href = `/quickMed/doctor/${urlFriendlySpecialty}`;
    toast.success(`Searching for ${specialty} specialists...`);
  };

  const handleDoctorClick = (doctor) => {
    closeModal();

    const urlFriendlyName = quickHelpService.formatUrlFriendly(doctor.name);
    const doctorUrl = `/quickMed/doctor/profile/${urlFriendlyName}-${doctor.doctorId}`;
    window.location.href = doctorUrl;
    toast.success(`Viewing ${doctor.name}'s profile...`);
  };

  const value = {
    // State
    messages,
    inputMessage,
    loading,
    isModalOpen,
    chatContainerRef,
    isInputValid,
    MIN_CHARACTERS,

    // Actions
    setInputMessage,
    handleSendMessage,
    handleKeyDown,
    openModal,
    closeModal,
    clearChat,
    handleSpecialtyClick,
    handleDoctorClick,
  };

  return (
    <QuickHelpContext.Provider value={value}>
      {children}
    </QuickHelpContext.Provider>
  );
};

export const useQuickHelp = () => {
  const context = useContext(QuickHelpContext);
  if (!context) {
    throw new Error("useQuickHelp must be used within a QuickHelpProvider");
  }
  return context;
};
