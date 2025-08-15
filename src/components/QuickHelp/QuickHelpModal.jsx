/** @format */

import React, { useState, useRef, useEffect } from "react";
import { aiRecommendationService } from "../../services/aiRecommendationService";
import { toast } from "sonner";
import {
  X,
  Send,
  Stethoscope,
  Sparkles,
  User,
  Heart,
  Activity,
  Shield,
} from "lucide-react";

const QuickHelpModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    // auto-scroll when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // initial bot message when opened and empty
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: "bot",
          content:
            "Hello! I'm Dr. AI, your virtual health assistant. I'm here to help you find the right doctor based on your symptoms. Please describe what you're experiencing.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    // click-outside handler
    const handleClickOutside = (e) => {
      if (!isOpen) return;
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await aiRecommendationService.getDoctorRecommendations(
        inputMessage
      );
      console.log("Full API response:", response);
      const recommendations = response?.data?.data;
      console.log("aiRecommendationService", response);

      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content:
          "Based on your symptoms, here's my medical analysis and recommendations:",
        timestamp: new Date(),
        recommendations: recommendations,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content:
          "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    setMessages([]);
    setInputMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    // wrapper keeps layout but DOES NOT block or dim the page.
    // pointer-events-none lets clicks pass to the page; modal itself is interactive.
    <div className='fixed inset-0 z-50 pointer-events-none flex justify-end'>
      <div
        ref={modalRef}
        className='pointer-events-auto relative w-full max-w-sm h-full bg-white shadow-xl flex flex-col'
        role='dialog'
        aria-modal='true'
        aria-label='Quick help chat'>
        {/* Medical-themed Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-blue-600 text-white'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <Stethoscope className='w-6 h-6' />
              <Sparkles className='absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse' />
            </div>
            <div>
              <h3 className='font-semibold text-sm'>Dr. AI Assistant</h3>
              <p className='text-xs opacity-90'>Virtual Health Consultation</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className='p-2 hover:bg-white/20 rounded-full transition-colors'
            aria-label='Close quick help'>
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className='flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-blue-50/30 to-white'>
          {messages.map((message) => {
            const isUser = message.type === "user";

            return (
              <div
                key={message.id}
                className={`flex ${
                  isUser ? "justify-end" : "justify-start"
                } mb-3`}>
                <div
                  className={`flex items-start gap-3 max-w-[88%] ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}>
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isUser
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg"
                        : "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg"
                    }`}>
                    {isUser ? (
                      <User className='w-5 h-5 text-white' />
                    ) : (
                      <div className='relative'>
                        <Stethoscope className='w-5 h-5 text-white' />
                        <Sparkles className='absolute -top-1 -right-1 w-2 h-2 text-yellow-300' />
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      isUser
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                        : message.isError
                        ? "bg-red-50 border border-red-200 text-red-800"
                        : "bg-white border border-gray-200 text-gray-800 shadow-md"
                    }`}>
                    <p className='text-sm whitespace-pre-wrap leading-relaxed'>
                      {message.content}
                    </p>

                    {/* Recommendations */}
                    {message.recommendations && (
                      <div className='mt-4 space-y-3'>
                        {message.recommendations.analysis?.symptomAnalysis && (
                          <div className='bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200'>
                            <div className='flex items-center gap-2 mb-2'>
                              <Activity className='w-4 h-4 text-blue-600' />
                              <h4 className='font-semibold text-blue-800 text-sm'>
                                Symptom Analysis
                              </h4>
                            </div>
                            <p className='text-blue-700 text-xs leading-relaxed'>
                              {message.recommendations.analysis.symptomAnalysis}
                            </p>
                          </div>
                        )}

                        {message.recommendations.analysis?.generalAdvice && (
                          <div className='bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200'>
                            <div className='flex items-center gap-2 mb-2'>
                              <Heart className='w-4 h-4 text-yellow-600' />
                              <h4 className='font-semibold text-yellow-800 text-sm'>
                                Health Advice
                              </h4>
                            </div>
                            <p className='text-yellow-700 text-xs leading-relaxed'>
                              {message.recommendations.analysis.generalAdvice}
                            </p>
                          </div>
                        )}

                        {message.recommendations.analysis
                          ?.recommendedSpecialities && (
                          <div className='bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200'>
                            <div className='flex items-center gap-2 mb-3'>
                              <Shield className='w-4 h-4 text-emerald-600' />
                              <h4 className='font-semibold text-emerald-800 text-sm'>
                                Recommended Specialties
                              </h4>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                              {message.recommendations.analysis.recommendedSpecialities.map(
                                (specialty, index) => (
                                  <span
                                    key={index}
                                    className='inline-block bg-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-medium border border-emerald-300'>
                                    {specialty}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {message.recommendations.analysis?.recommendations && (
                          <div className='bg-white p-4 rounded-xl border border-gray-200 shadow-sm'>
                            <div className='flex items-center gap-2 mb-3'>
                              <Stethoscope className='w-4 h-4 text-gray-600' />
                              <h4 className='font-semibold text-gray-800 text-sm'>
                                Top Doctors (
                                {
                                  message.recommendations.analysis
                                    .recommendations.length
                                }
                                )
                              </h4>
                            </div>
                            <div className='space-y-3 max-h-48 overflow-y-auto'>
                              {message.recommendations.analysis.recommendations
                                .slice(0, 3)
                                .map((doctor, index) => (
                                  <div
                                    key={index}
                                    className='border border-gray-200 rounded-lg p-3 bg-gradient-to-r from-gray-50 to-white'>
                                    <div className='flex justify-between items-start mb-2'>
                                      <h5 className='font-semibold text-gray-800 text-sm'>
                                        {doctor.name}
                                      </h5>
                                      <span className='text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full'>
                                        {doctor.relevanceScore}/10
                                      </span>
                                    </div>
                                    <div className='flex flex-wrap gap-1 mb-2'>
                                      {doctor.speciality
                                        .slice(0, 2)
                                        .map((spec, idx) => (
                                          <span
                                            key={idx}
                                            className='inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md font-medium'>
                                            {spec}
                                          </span>
                                        ))}
                                    </div>
                                    <div className='flex items-center gap-4 text-xs text-gray-600'>
                                      <span className='flex items-center gap-1'>
                                        <Activity className='w-3 h-3' />
                                        {doctor.experience} years
                                      </span>
                                      <span>•</span>
                                      <span>
                                        {doctor.city || "Location N/A"}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <span className='text-xs opacity-70 mt-2 block'>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Animation */}
          {loading && (
            <div className='flex justify-start mb-3'>
              <div className='flex items-start gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg'>
                  <Stethoscope className='w-5 h-5 text-white' />
                </div>
                <div className='bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-md'>
                  <div className='flex items-center gap-2'>
                    <div className='flex space-x-1'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'></div>
                      <div
                        className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'
                        style={{ animationDelay: "0.1s" }}></div>
                      <div
                        className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'
                        style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className='text-sm text-gray-600 ml-2'>
                      Analyzing symptoms...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className='p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white'>
          <div className='flex space-x-3'>
            <div className='flex-1 relative'>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Describe your symptoms in detail...'
                className='w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none shadow-sm'
                rows={1}
                maxLength={500}
                disabled={loading}
              />
              <div className='absolute right-3 bottom-2 text-xs text-gray-400'>
                {inputMessage.length}/500
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || loading}
              className='px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105'
              aria-label='Send message'>
              <Send className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickHelpModal;
