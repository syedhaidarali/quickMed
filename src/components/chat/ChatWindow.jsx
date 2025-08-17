/** @format */
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";
import MessagesList from "./MessagesList";

/**
 * ChatWindow - gives the window a fixed height so it doesn't overflow to footer.
 * Adjust h-[80vh] / max-h-[760px] to fit your page layout.
 */
const ChatWindow = ({
  selectedDoctor,
  messages = [],
  newMessage,
  setNewMessage,
  onSendMessage,
  loading,
  currentThread,
  allDoctors = [],
  user,
}) => {
  const messagesEndRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // scrollToBottom is still kept but MessagesList also auto-scrolls for redundancy
  const scrollToBottom = () => {
    const el =
      document.getElementById("messages-end") || messagesEndRef.current;
    el?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage?.trim() || loading) return;
    onSendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const subtitle = selectedDoctor?.specialty || selectedDoctor?.role || "";

  // Fixed height container (change h-[80vh] / max-h to match your shell)
  return (
    <div className='flex flex-col bg-white shadow-inner w-full h-full rounded-md overflow-hidden'>
      {/* Header (fixed height) */}
      <div className='flex items-center justify-between p-4 border-b bg-white flex-shrink-0'>
        <div className='flex items-center space-x-3'>
          <Avatar className='h-11 w-11'>
            <AvatarImage src={selectedDoctor?.profileImage} />
            <AvatarFallback className='bg-green-100 text-green-600'>
              {selectedDoctor?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className='min-w-0'>
            <div className='flex items-center gap-2'>
              <h3 className='font-semibold text-gray-900 truncate'>
                {selectedDoctor?.name || "Select chat"}
              </h3>
              <span
                className='inline-block h-2 w-2 rounded-full bg-green-400'
                title='Online'
              />
            </div>
            <p className='text-sm text-gray-500 truncate'>{subtitle}</p>
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <Button
            size='sm'
            variant='ghost'
            className='hover:bg-gray-100'>
            <Phone className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='hover:bg-gray-100'>
            <Video className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='hover:bg-gray-100'>
            <MoreVertical className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Messages: flexible / scrollable area (fills remaining height) */}
      <div className='flex-1 min-h-0 overflow-hidden'>
        <MessagesList
          messages={messages}
          user={user}
          allDoctors={allDoctors}
        />
        <div
          ref={messagesEndRef}
          id='messages-end'
        />
      </div>

      {/* Input: fixed height */}
      <div className='p-4 border-t bg-white flex-shrink-0'>
        <div className='max-w-4xl mx-auto'>
          <div
            className={`flex items-center gap-3 p-2 rounded-full shadow-sm transition-all ${
              isFocused ? "ring-2 ring-green-200 bg-white" : "bg-gray-50"
            }`}>
            {/* left icons */}
            <div className='flex items-center gap-2 pl-3'>
              <button
                type='button'
                className='p-2 rounded-md hover:bg-gray-100'
                title='Attach'>
                <Paperclip className='h-4 w-4 text-gray-500' />
              </button>
              <button
                type='button'
                className='p-2 rounded-md hover:bg-gray-100'
                title='Emoji'>
                <Smile className='h-4 w-4 text-gray-500' />
              </button>
            </div>

            {/* textarea grows but stays within the input area */}
            <textarea
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder='Write a message. Press Enter to send, Shift+Enter for newline.'
              className='flex-1 resize-none outline-none bg-transparent text-sm leading-6 px-2 py-2 placeholder-gray-400'
            />

            {/* send */}
            <div className='flex items-center gap-2 pr-2'>
              <Button
                onClick={handleSend}
                disabled={!newMessage.trim() || loading}
                className={`rounded-full p-2 ${
                  !newMessage.trim() || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "shadow-md"
                }`}
                title='Send message'>
                <Send className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <div className='mt-2 text-xs text-gray-400 px-4'>
            <span>{loading ? "Sending..." : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
