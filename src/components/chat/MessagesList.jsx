/** @format */
import React, { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const MessagesList = ({ messages = [], user, allDoctors = [] }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className='flex-1 flex items-center justify-center p-6'>
        <div className='text-center text-gray-500'>
          <p className='font-medium'>No messages yet</p>
          <p className='text-sm'>Start the conversation!</p>
        </div>
      </div>
    );
  }

  // helper to resolve sender profile
  const getSenderProfile = (message) => {
    if (String(message.userId) === String(user?._id)) return user;

    const found = allDoctors?.find(
      (d) => String(d._id) === String(message.userId)
    );
    if (found) return found;

    return {
      _id: message.userId,
      name: message.senderName || message.name || "Unknown",
      profileImage: message.avatar || message.profileImage || null,
    };
  };

  // helper to pull text from many possible fields
  const getMessageText = (message) => {
    if (!message) return "";
    const candidates = [
      message.text,
      message.content,
      message.message,
      message.body,
      message.msg,
      message.payload?.text,
      message.data?.text,
      // add more fallbacks if your backend uses another field
    ];

    for (const c of candidates) {
      if (typeof c === "string" && c.trim() !== "") return c;
    }

    // If there is an attachments-only message, show a placeholder
    if (Array.isArray(message.attachments) && message.attachments.length > 0) {
      return message.attachments
        .map((a, i) => a.name || a.filename || `Attachment ${i + 1}`)
        .join(", ");
    }

    return ""; // caller can show fallback text if empty
  };

  return (
    <div className='h-full'>
      <ScrollArea className='h-full'>
        <div className='flex flex-col px-4 py-4 gap-4'>
          {messages.map((message) => {
            const sender = getSenderProfile(message);
            const isMine = String(message.userId) === String(user?._id);
            const text = getMessageText(message);

            return (
              <div
                key={message._id || message.id || Math.random()}
                className={`flex items-end ${
                  isMine ? "justify-end" : "justify-start"
                }`}>
                {/* avatar left for others */}
                {!isMine && (
                  <div className='mr-3'>
                    <Avatar className='h-9 w-9 shadow-sm'>
                      {sender?.profileImage ? (
                        <AvatarImage src={sender.profileImage} />
                      ) : (
                        <AvatarFallback className='bg-green-100 text-green-600'>
                          {String(sender?.name || "U").charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                )}

                <div className='max-w-[80%]'>
                  {/* optional name for others */}
                  {!isMine && (
                    <div className='text-xs text-gray-500 mb-1 font-medium'>
                      {sender?.name}
                    </div>
                  )}

                  <div
                    className={`px-4 py-2 break-words text-sm leading-6 ${
                      isMine
                        ? "bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl rounded-br-none shadow"
                        : "bg-gray-100 text-gray-900 rounded-2xl rounded-bl-none"
                    }`}>
                    {/* message text (preserves newlines) */}
                    {text ? (
                      <div className='whitespace-pre-wrap'>{text}</div>
                    ) : (
                      <div className='whitespace-pre-wrap text-gray-400 italic'>
                        [No text]
                      </div>
                    )}

                    {/* attachments (if any) */}
                    {message.attachments?.length > 0 && (
                      <div className='mt-2 space-y-1'>
                        {message.attachments.map((att, i) => (
                          <a
                            key={i}
                            href={att.url || "#"}
                            target='_blank'
                            rel='noreferrer'
                            className='block text-xs underline'>
                            {att.name || att.filename || `Attachment ${i + 1}`}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex items-center mt-1 ${
                      isMine ? "justify-end" : "justify-start"
                    }`}>
                    <span className='text-[11px] text-gray-400'>
                      {message.createdAt
                        ? new Date(message.createdAt).toLocaleTimeString()
                        : ""}
                    </span>
                  </div>
                </div>

                {/* avatar for me */}
                {isMine && (
                  <div className='ml-3'>
                    <Avatar className='h-9 w-9 shadow-sm'>
                      {user?.profileImage ? (
                        <AvatarImage src={user.profileImage} />
                      ) : (
                        <AvatarFallback className='bg-white text-green-600'>
                          {String(user?.name || "M").charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                )}
              </div>
            );
          })}

          <div ref={endRef} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessagesList;
