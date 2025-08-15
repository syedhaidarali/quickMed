/** @format */

// config/videoSDK.js - Enhanced VideoSDK Configuration with Server-Side Token Support
import axios from "axios";

// VideoSDK Configuration
export const VIDEOSDK_CONFIG = {
  API_KEY: import.meta.env.VITE_VIDEOSDK_API_KEY,
  SECRET_KEY: import.meta.env.VITE_VIDEOSDK_SECRET_KEY,
  API_BASE_URL: "https://api.videosdk.live/v2",
  // Development token (expires 1 month from creation)
  TEMP_TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkYWMxNjRkNi0yZGQ3LTQyMzItYjZiMS0wNWNkMWEwZWRiODMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc1NDk5MjEyMSwiZXhwIjoxNzU3NTg0MTIxfQ.kplefvdyD8APGCFxaIMWvMItwhqgVKiALU3f4EulMtg",
};

// Generate Authentication Token - Frontend Only
export const generateAuthToken = async (
  participantId,
  participantName,
  permissions = ["allow_join"],
  userType = "user" // "user" or "doctor"
) => {
  try {
    // For now, always use development token since we're handling everything in frontend
    console.log("✅ Using development token for:", userType, participantName);
    return VIDEOSDK_CONFIG.TEMP_TOKEN;
  } catch (error) {
    console.error("Error generating auth token:", error);
    throw new Error("Failed to generate authentication token");
  }
};

// Create Meeting Room
export const createMeeting = async (token, config = {}) => {
  try {
    const meetingConfig = {
      region: "sg001", // Singapore region
      ...config,
    };

    const response = await axios.post(
      `${VIDEOSDK_CONFIG.API_BASE_URL}/rooms`,
      meetingConfig,
      {
        headers: {
          Authorization: token, // VideoSDK expects just the token, not "Bearer "
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    return {
      roomId: response.data.roomId,
      meetingId: response.data.roomId,
      region: meetingConfig.region,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error creating meeting:", error);

    if (error.response?.status === 401) {
      throw new Error("Invalid authentication token");
    }
    if (error.response?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later");
    }

    throw new Error("Failed to create meeting room");
  }
};

// Validate Meeting Room
export const validateMeeting = async (token, meetingId) => {
  try {
    const response = await axios.get(
      `${VIDEOSDK_CONFIG.API_BASE_URL}/rooms/${meetingId}`,
      {
        headers: {
          Authorization: token, // VideoSDK expects just the token, not "Bearer "
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return {
      isValid: true,
      meetingId: response.data.roomId,
      region: response.data.region,
      createdAt: response.data.createdAt,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return { isValid: false, error: "Meeting not found" };
    }
    return { isValid: false, error: "Unable to validate meeting" };
  }
};

export default {
  VIDEOSDK_CONFIG,
  generateAuthToken,
  createMeeting,
  validateMeeting,
};
