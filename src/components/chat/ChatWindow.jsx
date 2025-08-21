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
  MessageSquareText,
} from "lucide-react";
import MessagesList from "./MessagesList";
import { Skeleton } from "../ui";

const ChatWindow = ({
  selectedDoctor,
  messages = [],
  newMessage,
  setNewMessage,
  onSendMessage,
  loading,
  messagesLoading = false,
  currentThread,
  allDoctors = [],
  allUsers = [],
  user,
  participants = [],
}) => {
  const messagesEndRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

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

  return (
    <div className='flex flex-col bg-white shadow-inner w-full h-full rounded-md overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b bg-gradient-to-r from-green-50 to-white flex-shrink-0'>
        <div className='flex items-center space-x-3'>
          <Avatar className='h-11 w-11'>
            <AvatarImage src={selectedDoctor?.profileImage} />
            <AvatarFallback className='bg-green-100 text-green-600'>
              {selectedDoctor?.name?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>

          <div className='min-w-0'>
            <div className='flex items-center gap-2'>
              <h3 className='font-semibold text-gray-900 truncate'>
                {selectedDoctor?.name || "Select a chat"}
              </h3>
              {selectedDoctor && (
                <span
                  className='inline-block h-2 w-2 rounded-full bg-green-400'
                  title='Online'
                />
              )}
            </div>
            <p className='text-sm text-gray-500 truncate'>{subtitle}</p>
          </div>
        </div>

        {selectedDoctor && (
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
        )}
      </div>

      {/* Messages / Empty State */}
      <div className='flex-1 min-h-0 overflow-hidden relative'>
        {messagesLoading ? (
          <div className='h-full overflow-y-auto'>
            <div className='flex flex-col px-4 py-4 gap-4'>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex ${
                    i % 2 === 0 ? "justify-start" : "justify-end"
                  }`}>
                  <div className='flex items-end gap-3 max-w-[80%]'>
                    {i % 2 === 0 && (
                      <Skeleton className='h-9 w-9 rounded-full' />
                    )}
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-[240px]' />
                      <Skeleton className='h-3 w-16' />
                    </div>
                    {i % 2 === 1 && (
                      <Skeleton className='h-9 w-9 rounded-full' />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : messages.length === 0 && !selectedDoctor ? (
          // 🌟 Empty state when no doctor is selected
          <div className='h-full flex flex-col items-center justify-center text-center px-6'>
            <div className='p-6 rounded-full bg-green-50 shadow-inner mb-4'>
              <MessageSquareText className='h-10 w-10 text-green-500' />
            </div>
            <h2 className='text-lg font-semibold text-gray-700'>
              Welcome to qukMed Chat
            </h2>
            <p className='text-sm text-gray-500 mt-1'>
              Select a doctor from the sidebar to start chatting.
            </p>
          </div>
        ) : (
          <>
            <MessagesList
              messages={messages}
              user={user}
              allDoctors={allDoctors}
              allUsers={allUsers}
              participants={participants}
              otherParticipant={selectedDoctor}
            />
            <div
              ref={messagesEndRef}
              id='messages-end'
            />
          </>
        )}
      </div>

      {/* Input */}
      {selectedDoctor && (
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

              <textarea
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Write a message...'
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
      )}
    </div>
  );
};

export default ChatWindow;
