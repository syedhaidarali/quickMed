/** @format */
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { chatService } from "../services";
import { toast } from "sonner";
import { createMeeting, generateAuthToken } from "../config/videoSDK";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [threads, setThreads] = useState([]);
  const [consultationRequests, setConsultationRequests] = useState([]);
  const intervalRef = useRef(null);

  const sendMessage = async (receiverId, message) => {
    try {
      setLoading(true);
      const response = await chatService.sendMessage(receiverId, message);

      if (response.status === "success") {
        await getAllThreads();
        toast.success("Message sent successfully");
      }

      return response;
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const confirmConsultation = async (request) => {
    try {
      setLoading(true);

      // Prefer doctorProfile from request, then explicit id fallbacks
      const doctorId =
        (request.doctorProfile &&
          (request.doctorProfile._id || request.doctorProfile.id)) ||
        request.doctorId ||
        (request.doctor && (request.doctor._id || request.doctor.id)) ||
        "";
      const doctorName =
        (request.doctorProfile && request.doctorProfile.name) ||
        request.doctorName ||
        (request.doctor && request.doctor.name) ||
        "Doctor";
      const patientId = request.patientId;

      // Create a real VideoSDK meeting so patients can validate and join
      const token = await generateAuthToken(doctorId, doctorName);
      const meetingData = await createMeeting(token);
      const meetingId = meetingData?.roomId;
      if (!meetingId) {
        throw new Error("Failed to create meeting");
      }

      // Update the request status with the real meetingId
      setConsultationRequests((prev) =>
        prev.map((req) =>
          req._id === request._id
            ? { ...req, status: "confirmed", meetingId }
            : req
        )
      );

      // Build relative URLs (router base will handle host/deploy)
      const patientJoinPath = `/consultation/${meetingId}/${doctorId}`.replace(
        /\/+$/,
        ""
      );
      const doctorJoinPath =
        `/doctor/consultation/${meetingId}/${patientId}`.replace(/\/+$/, "");

      // Send confirmation message to patient including join path
      const confirmationMessage = `✅ **Consultation Confirmed!**\n\nYour video consultation request has been approved by Dr. ${doctorName}.\n\n**Meeting ID:** ${meetingId}\n**Join Link:** ${patientJoinPath}\n\nYou can share this link with trusted devices only.`;
      if (patientId) {
        await chatService.sendMessage(patientId, confirmationMessage);
      }

      // Notify doctor with their join path as well (only if doctorId exists)
      if (doctorId) {
        const doctorNotice = `🟢 Meeting created with ${request.patientProfile?.name}.\n\n**Meeting ID:** ${meetingId}\n**Your Join Link:** ${doctorJoinPath}`;
        await chatService.sendMessage(doctorId, doctorNotice);
      }

      toast.success("Consultation confirmed! Meeting started.");

      // Refresh threads to show the new messages
      await getAllThreads();
    } catch (error) {
      toast.error(error.message || "Failed to confirm consultation");
    } finally {
      setLoading(false);
    }
  };

  const cancelConsultation = async (request) => {
    try {
      setLoading(true);

      // Update the request status
      setConsultationRequests((prev) =>
        prev.map((req) =>
          req._id === request._id ? { ...req, status: "cancelled" } : req
        )
      );

      // Send cancellation message to patient
      const cancellationMessage = `❌ **Consultation Request Declined**\n\nYour video consultation request has been declined by Dr. ${request.doctorProfile?.name}.\n\nPlease contact the doctor directly or try booking an in-person appointment instead.`;
      await chatService.sendMessage(request.patientId, cancellationMessage);

      toast.success("Consultation request declined");

      // Refresh threads to show the new message
      await getAllThreads();
    } catch (error) {
      toast.error("Failed to cancel consultation");
    } finally {
      setLoading(false);
    }
  };

  const getAllThreads = async ({ showLoading = true } = {}) => {
    try {
      if (showLoading) setThreadsLoading(true);
      const response = await chatService.getAllThreads();

      if (response.status === "success") {
        setThreads(response.data);
      }

      return response;
    } catch (error) {
      toast.error(error.response.data.data);
      throw error;
    } finally {
      if (showLoading) setThreadsLoading(false);
    }
  };

  const getMessageOfSingleThread = async (
    threadId,
    { showLoading = true } = {}
  ) => {
    try {
      if (showLoading) setMessagesLoading(true);
      const response = await chatService.getMessageOfSingleThread(threadId);

      if (response.status === "success") {
        setMessages(response.data);
        setCurrentThread(threadId);
      }

      return response;
    } catch (error) {
      toast.error(error.response.data.data);
      throw error;
    } finally {
      if (showLoading) setMessagesLoading(false);
    }
  };

  const startPolling = (threadId) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start polling every 5 seconds
    intervalRef.current = setInterval(async () => {
      if (threadId) {
        // avoid flicker during background refreshes
        await getMessageOfSingleThread(threadId, { showLoading: false });
      }
    }, 5000);
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        currentThread,
        messages,
        setMessages,
        threads,
        loading,
        threadsLoading,
        messagesLoading,
        consultationRequests,
        sendMessage,
        confirmConsultation,
        cancelConsultation,
        getAllThreads,
        getMessageOfSingleThread,
        startPolling,
        stopPolling,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
