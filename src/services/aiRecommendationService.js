/** @format */

import { aiRecommendationApi } from "../api/aiRecommendation.api";

export const aiRecommendationService = {
  getDoctorRecommendations: (symptoms) => aiRecommendationApi.getDoctorRecommendations(symptoms),
};
