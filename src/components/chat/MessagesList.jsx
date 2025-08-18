/** @format */
import React, { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const MessagesList = ({
  messages = [],
  user,
  allDoctors = [],
  allUsers = [],
  participants = [],
  otherParticipant = null,
}) => {
  const endRef = useRef(null);

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
  const getSenderId = (message) => {
    const normalize = (val) => {
      if (!val) return null;
      if (typeof val === "string") return val;
      if (typeof val === "object") return val._id || val.id || null;
      return null;
    };

    return (
      normalize(message.userId) ||
      normalize(message.senderId) ||
      normalize(message.sender) ||
      normalize(message.user) ||
      normalize(message.from) ||
      normalize(message.by) ||
      normalize(message.authorId) ||
      normalize(message.createdBy) ||
      null
    );
  };

  const getSenderProfile = (message) => {
    const senderId = getSenderId(message);
    if (String(senderId) === String(user?._id)) return user;

    // Try to resolve from current thread participants (covers non-doctor users)
    const participant = participants?.find((p) => {
      const participantId =
        (p.userId && (p.userId._id || p.userId.id || p.userId)) ||
        p._id ||
        p.id;
      return String(participantId) === String(senderId);
    });
    if (participant) {
      const nestedUser =
        participant.userId && typeof participant.userId === "object"
          ? participant.userId
          : null;

      const baseId =
        (nestedUser && (nestedUser._id || nestedUser.id)) ||
        participant.userId ||
        participant._id ||
        participant.id;

      // Try to enrich from doctors/users when participant lacks name/avatar
      const doctorMatch = allDoctors?.find(
        (d) => String(d._id) === String(baseId)
      );
      const userMatch = allUsers?.find((u) => String(u._id) === String(baseId));

      const nameCandidate =
        participant.name ||
        participant.displayName ||
        participant.fullName ||
        (participant.firstName && participant.lastName
          ? `${participant.firstName} ${participant.lastName}`
          : null) ||
        participant.username ||
        participant.userName ||
        (nestedUser &&
          (nestedUser.name ||
            nestedUser.fullName ||
            (nestedUser.firstName && nestedUser.lastName
              ? `${nestedUser.firstName} ${nestedUser.lastName}`
              : null) ||
            nestedUser.username ||
            nestedUser.userName)) ||
        doctorMatch?.name ||
        userMatch?.name ||
        "Unknown";

      const avatarCandidate =
        participant.avatar ||
        participant.profileImage ||
        participant.avatarUrl ||
        participant.photo ||
        (nestedUser &&
          (nestedUser.avatar ||
            nestedUser.profileImage ||
            nestedUser.avatarUrl ||
            nestedUser.photo)) ||
        doctorMatch?.profileImage ||
        userMatch?.profileImage ||
        null;

      return {
        _id: baseId,
        name: nameCandidate,
        profileImage: avatarCandidate,
      };
    }

    // Fallback to known doctors list
    const found = allDoctors?.find((d) => String(d._id) === String(senderId));
    if (found) return found;

    // Fallback to known users list
    const foundUser = allUsers?.find((u) => String(u._id) === String(senderId));
    if (foundUser) {
      return {
        _id: foundUser._id,
        name: foundUser.name,
        profileImage: foundUser.profileImage || foundUser.avatar || null,
      };
    }

    // If 1-to-1 chat and we couldn't resolve by id, fall back to the selected other participant
    if (otherParticipant && String(senderId) !== String(user?._id)) {
      return {
        _id: otherParticipant._id,
        name: otherParticipant.name || "Unknown",
        profileImage:
          otherParticipant.profileImage || otherParticipant.avatar || null,
      };
    }

    // Final fallback to any name/avatar present on the message itself
    const final = {
      _id: senderId,
      name:
        message.sender?.name ||
        message.senderName ||
        message.name ||
        message.sender?.fullName ||
        message.user?.name ||
        (message.user?.firstName && message.user?.lastName
          ? `${message.user.firstName} ${message.user.lastName}`
          : null) ||
        "Unknown",
      profileImage:
        message.sender?.avatar ||
        message.sender?.profileImage ||
        message.sender?.avatarUrl ||
        message.user?.avatar ||
        message.user?.profileImage ||
        message.avatar ||
        message.profileImage ||
        null,
    };

    // If this message is not mine and the senderId matches the selected other participant, use it
    if (
      String(senderId) !== String(user?._id) &&
      otherParticipant &&
      String(otherParticipant._id) === String(senderId)
    ) {
      return {
        _id: otherParticipant._id,
        name: otherParticipant.name || final.name,
        profileImage:
          otherParticipant.profileImage ||
          otherParticipant.avatar ||
          final.profileImage,
      };
    }

    return final;
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
            const isMine = String(getSenderId(message)) === String(user?._id);
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
