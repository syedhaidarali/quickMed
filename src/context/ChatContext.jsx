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
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [threads, setThreads] = useState([]);
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
      console.log(error, "errrrrrrrrrrr");
      toast.error("Failed to send message");
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
      console.error("ChatContext - getAllThreads error:", error);
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
      console.error("ChatContext - getMessageOfSingleThread error:", error);
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
