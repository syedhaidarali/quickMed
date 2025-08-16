/** @format */

import { useQuickHelp } from "../context";

export const useQuickHelpHook = () => {
  const context = useQuickHelp();

  return {
    // Chat state
    messages: context.messages,
    inputMessage: context.inputMessage,
    loading: context.loading,
    isModalOpen: context.isModalOpen,
    isInputValid: context.isInputValid,
    MIN_CHARACTERS: context.MIN_CHARACTERS,

    // Chat actions
    setInputMessage: context.setInputMessage,
    handleSendMessage: context.handleSendMessage,
    handleKeyDown: context.handleKeyDown,
    clearChat: context.clearChat,

    // Modal actions
    openModal: context.openModal,
    closeModal: context.closeModal,

    // Navigation actions
    handleSpecialtyClick: context.handleSpecialtyClick,
    handleDoctorClick: context.handleDoctorClick,

    // Utility functions
    hasMessages: context.messages.length > 0,
    isFirstMessage: context.messages.length === 0,
    lastMessage: context.messages[context.messages.length - 1],
  };
};
