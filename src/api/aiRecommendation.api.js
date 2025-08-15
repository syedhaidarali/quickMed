/** @format */

import request from "../helpers/request";

export const aiRecommendationApi = {
  getDoctorRecommendations: (symptoms) => {
    console.log("syptoms", symptoms);
    request.post("/ai/doctor-recommendations", { symptoms: symptoms });
  },
};
