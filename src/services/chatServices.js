/** @format */

import { chatApi } from "../api/chat.api";

export const chatService = {
  sendMessage: (receiverId, message) =>
    chatApi.sendMessage(receiverId, message),

  getAllThreads: () => chatApi.getAllThreads(),

  getMessageOfSingleThread: (threadId) =>
    chatApi.getMessageOfSingleThread(threadId),
};
