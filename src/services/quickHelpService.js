/** @format */

import { aiRecommendationService } from "./index";

export const quickHelpService = {
  getDoctorRecommendations: async (symptoms) => {
    try {
      const response = await aiRecommendationService.getDoctorRecommendations(
        symptoms
      );
      return response;
    } catch (error) {
      console.error(
        "Error in quickHelpService.getDoctorRecommendations:",
        error
      );
      throw error;
    }
  },

  createUserMessage: (content) => ({
    id: Date.now(),
    type: "user",
    content: content.trim(),
    timestamp: new Date(),
  }),

  createBotMessage: (content, recommendations = null, apiResponse = null) => ({
    id: Date.now() + 1,
    type: "bot",
    content,
    timestamp: new Date(),
    recommendations,
    apiResponse,
  }),

  createErrorMessage: (content) => ({
    id: Date.now() + 1,
    type: "bot",
    content,
    timestamp: new Date(),
    isError: true,
  }),

  validateMessage: (message, minLength = 11) => {
    return message.trim().length >= minLength;
  },

  formatUrlFriendly: (text) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  },

  getAnalysisSummary: (apiResponse) => {
    const totalDoctors =
      apiResponse?.totalDoctorsAnalyzed ||
      apiResponse?.data?.totalDoctorsAnalyzed ||
      apiResponse?.recommendations?.totalDoctorsAnalyzed ||
      apiResponse?.recommendations?.analysis?.totalDoctorsAnalyzed ||
      0;

    const timestamp =
      apiResponse?.timestamp ||
      apiResponse?.recommendations?.timestamp ||
      new Date();

    return {
      totalDoctors,
      timestamp: new Date(timestamp),
    };
  },
};
