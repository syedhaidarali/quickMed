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

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [threads, setThreads] = useState([]);
  const intervalRef = useRef(null);

  console.log("ChatContext - Current State:", {
    chats,
    currentThread,
    messages: messages.length,
    loading,
    threads: threads.length,
    hasInterval: !!intervalRef.current,
  });

  const sendMessage = async (receiverId, message) => {
    try {
      setLoading(true);
      const response = await chatService.sendMessage(receiverId, message);
      console.log(response, "message Response");

      if (response.status === "success") {
        // After sending message, refresh threads to get the new thread
        await getAllThreads();
        toast.success("Message sent successfully");
      }

      return response;
    } catch (error) {
      console.log(error, "errrrrrrrrrrr");
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const getAllThreads = async () => {
    try {
      setLoading(true);
      const response = await chatService.getAllThreads();
      console.log("getAllThreads response:", response);

      if (response.status === "success") {
        setThreads(response.data);
        console.log("Threads updated:", response.data);
      }

      return response;
    } catch (error) {
      console.error("ChatContext - getAllThreads error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMessageOfSingleThread = async (threadId) => {
    try {
      const response = await chatService.getMessageOfSingleThread(threadId);
      console.log("ChatContext - getMessageOfSingleThread response:", response);

      if (response.status === "success") {
        setMessages(response.data);
        setCurrentThread(threadId);
        console.log("Messages updated for thread:", threadId, response.data);
      }

      return response;
    } catch (error) {
      console.error("ChatContext - getMessageOfSingleThread error:", error);
      throw error;
    }
  };

  const startPolling = (threadId) => {
    console.log("ChatContext - startPolling called for thread:", threadId);
    // Clear any existing interval
    if (intervalRef.current) {
      console.log("ChatContext - Clearing existing interval");
      clearInterval(intervalRef.current);
    }

    // Start polling every 5 seconds
    intervalRef.current = setInterval(async () => {
      console.log("ChatContext - Polling for thread:", threadId);
      if (threadId) {
        await getMessageOfSingleThread(threadId);
      }
    }, 5000);
    console.log(
      "ChatContext - Polling started, interval ID:",
      intervalRef.current
    );
  };

  const stopPolling = () => {
    console.log("ChatContext - stopPolling called");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      console.log(
        "ChatContext - Polling stopped, interval ID was:",
        intervalRef.current
      );
      intervalRef.current = null;
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    console.log("ChatContext - Component mounted, setting up cleanup");
    return () => {
      console.log("ChatContext - Component unmounting, cleaning up");
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
        threads,
        loading,
        sendMessage,
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
