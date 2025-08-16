/** @format */

import { aiRecommendationApi } from "../api";

export const aiRecommendationService = {
  getDoctorRecommendations: (symptoms) =>
    aiRecommendationApi.getDoctorRecommendations(symptoms),
};
