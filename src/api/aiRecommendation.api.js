/** @format */

import request from "../helpers/request";

export const aiRecommendationApi = {
  getDoctorRecommendations: (symptoms) => {
    return request.post("/ai/doctor-recommendations", { symptoms: symptoms });
  },
};
