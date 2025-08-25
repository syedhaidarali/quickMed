/** @format */

import request from "../helpers/request";

export const chatApi = {
  sendMessage: async (receiverId, message) => {
    const response = await request.post(`/chat/send/${receiverId}`, {
      message: message,
    });
    return response.data;
  },
  getAllThreads: async () => {
    const response = await request.get("/chat/threads");
    return response.data;
  },
  getMessageOfSingleThread: async (threadId) => {
    const response = await request.get(`/chat/messages/${threadId}`);
    return response.data;
  },
};
