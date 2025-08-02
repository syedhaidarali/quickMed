/** @format */

import axios from "axios";

const postDataToAPI = async (url, data, token = null) => {
  try {
    // Configure headers, adding Bearer token if available
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    // Make the POST request
    const response = await axios.post(url, data, config);

    // Handle success
    return response.data; // Returns the response from the API
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response ? error.response.data : error;
  }
};

export default postDataToAPI;
