/** @format */
import React, { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { formatTime } from "../../helpers/date.helper";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MessagesList = ({
  messages = [],
  user,
  allDoctors = [],
  allUsers = [],
  participants = [],
  otherParticipant = null,
  onConfirmConsultation,
  onCancelConsultation,
  isDoctorRoute = false,
  doctorSelf,
}) => {
  const endRef = useRef(null);
  const navigate = useNavigate();

  // Sort messages by createdAt ascending (oldest first)
  const sortedMessages = Array.isArray(messages)
    ? [...messages].sort((a, b) => {
        const ta = new Date(
          a.createdAt || a.created_at || a.timestamp || 0
        ).getTime();
        const tb = new Date(
          b.createdAt || b.created_at || b.timestamp || 0
        ).getTime();
        return ta - tb;
      })
    : [];

  // Auto-scroll to bottom when first rendered and whenever messages change
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, []);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [sortedMessages.length]);

  if (!sortedMessages || sortedMessages.length === 0) {
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

  // Detect simple consultation request phrase
  const isConsultationRequest = (message) => {
    const text = getMessageText(message);
    return text.includes("I would like to request a video consultation.");
  };

  // Extract join path (relative) from a confirmation message body
  const extractJoinPath = (text) => {
    if (!text) return null;
    // handle formats like: "Join Link: /path", "Join Link:** /path", "Join Link :  /path"
    const match = text.match(/Join\s*Link\s*:\s*\**\s*(\S+)/i);
    if (!match) return null;
    const raw = match[1];
    return raw;
  };

  const getOtherParticipantId = () => {
    const myId = (doctorSelf && (doctorSelf._id || doctorSelf.id)) || user?._id;
    return pickOtherParticipantId(myId);
  };

  const extractMeetingIdFromPath = (path) => {
    if (!path) return null;
    const m =
      path.match(/\/consultation\/([^/]+)/) ||
      path.match(/\/doctor\/consultation\/([^/]+)/);
    return m ? m[1] : null;
  };

  // Extract a meeting id from free-form text when doctor shares only the code
  const extractMeetingIdFromText = (text) => {
    if (!text || typeof text !== "string") return null;
    // Common explicit patterns
    const explicit = text.match(/meeting\s*id\s*[:\-]?\s*([A-Za-z0-9\-]{6,})/i);
    if (explicit && explicit[1]) return explicit[1];
    const code = text.match(/code\s*[:\-]?\s*([A-Za-z0-9\-]{6,})/i);
    if (code && code[1]) return code[1];
    // If the entire message looks like a single code/token
    const trimmed = text.trim();
    if (
      /^[A-Za-z0-9\-]{6,}$/.test(trimmed) &&
      trimmed.split(/\s+/).length === 1
    )
      return trimmed;
    return null;
  };

  const renderMessageBody = (text) => {
    const joinPath = extractJoinPath(text);
    if (!joinPath) {
      // Auto-linkify bare meeting id shared in chat
      const detectedMeetingId = extractMeetingIdFromText(text);
      if (!detectedMeetingId) {
        return <div className='whitespace-pre-wrap'>{text}</div>;
      }

      const handleDirectJoin = (e) => {
        e.preventDefault();
        let targetPath;
        const meetingId = detectedMeetingId;
        if (isDoctorRoute) {
          const patientId = getOtherParticipantId();
          targetPath = patientId
            ? `/doctor/consultation/${meetingId}/${patientId}`
            : `/doctor/consultation/${meetingId}`;
        } else {
          const doctorId = getOtherParticipantId();
          targetPath = doctorId
            ? `/consultation/${meetingId}/${doctorId}`
            : `/consultation/${meetingId}`;
        }
        navigate(targetPath);
      };

      return (
        <div className='whitespace-pre-wrap'>
          {text}
          <div className='mt-2'>
            <a
              href='#'
              onClick={handleDirectJoin}
              className='underline text-blue-600 hover:text-blue-700'>
              Join with this meeting ID
            </a>
          </div>
        </div>
      );
    }

    // Render with clickable join link that routes inside the SPA
    const parts = text.split(/Join\s*Link\s*:\s*/i);
    const before = parts[0] || "";
    const afterPart = parts[1] || "";
    // remove leading asterisks and spaces before the path echo
    const cleanedAfter = afterPart.replace(/^\**\s*\S+/, "").trimStart();

    const handleNavigate = (e) => {
      e.preventDefault();
      let targetPath = joinPath.replace(/\/+$/, "");
      const isPatientPath = /^\/consultation\//.test(targetPath);
      const isDoctorPath = /^\/doctor\/consultation\//.test(targetPath);
      const meetingId = extractMeetingIdFromPath(targetPath);

      // If current viewer is doctor and the link is patient path, rewrite to doctor path using patientId
      if (isDoctorRoute && isPatientPath && meetingId) {
        const patientId = getOtherParticipantId();
        if (patientId)
          targetPath = `/doctor/consultation/${meetingId}/${patientId}`;
      }
      // If current viewer is patient and the link is doctor path, rewrite to patient path using doctor id
      if (!isDoctorRoute && isDoctorPath && meetingId) {
        const doctorId = getOtherParticipantId();
        if (doctorId) targetPath = `/consultation/${meetingId}/${doctorId}`;
      }

      navigate(targetPath);
    };

    return (
      <div className='whitespace-pre-wrap'>
        {before}
        {"Join Link: "}
        <a
          href={joinPath}
          onClick={handleNavigate}
          className='underline text-blue-600 hover:text-blue-700'>
          {joinPath}
        </a>
        {cleanedAfter ? ` ${cleanedAfter}` : ""}
      </div>
    );
  };

  // helper: normalize participant id from many shapes
  const getParticipantId = (p) => {
    if (!p) return null;
    if (typeof p === "string") return p;
    if (p.userId) {
      const u = p.userId;
      if (typeof u === "string") return u;
      if (typeof u === "object") return u._id || u.id || null;
    }
    return p._id || p.id || null;
  };

  // Find a probable doctor id from participants different from a given user id
  const pickOtherParticipantId = (excludeId) => {
    const ids = (participants || []).map(getParticipantId).filter(Boolean);
    const other = ids.find((id) => String(id) !== String(excludeId));
    return other || null;
  };

  const handleConfirmConsultation = (message) => {
    if (onConfirmConsultation) {
      const senderProfile = getSenderProfile(message) || {};
      const fallbackSenderId =
        getSenderId(message) ||
        message?.userId ||
        message?.senderId ||
        (typeof message?.user === "object"
          ? message.user._id || message.user.id
          : message?.user) ||
        (typeof message?.sender === "object"
          ? message.sender._id || message.sender.id
          : message?.sender) ||
        null;

      const patientId = senderProfile._id || fallbackSenderId;
      if (!patientId) return; // cannot proceed without a target

      // resolve doctor identity robustly
      const resolvedDoctorId =
        (doctorSelf && (doctorSelf._id || doctorSelf.id)) ||
        pickOtherParticipantId(patientId) ||
        user?._id ||
        null;
      if (!resolvedDoctorId) return;

      const resolvedDoctor = doctorSelf ||
        allDoctors.find((d) => String(d._id) === String(resolvedDoctorId)) || {
          _id: resolvedDoctorId,
          name: "Doctor",
          profileImage: null,
        };

      const request = {
        _id: message._id || Date.now().toString(),
        doctorId: resolvedDoctorId,
        doctorProfile: {
          _id: resolvedDoctor._id || resolvedDoctor.id,
          name: resolvedDoctor.name,
          profileImage:
            resolvedDoctor.profileImage || resolvedDoctor.avatar || null,
        },
        patientId,
        message: getMessageText(message),
        status: "pending",
        createdAt: message.createdAt || new Date().toISOString(),
        patientProfile: Object.keys(senderProfile).length
          ? senderProfile
          : { _id: patientId, name: "Patient", profileImage: null },
      };
      onConfirmConsultation(request);
    }
  };

  const handleCancelConsultation = (message) => {
    if (onCancelConsultation) {
      const senderProfile = getSenderProfile(message) || {};
      const fallbackSenderId =
        getSenderId(message) ||
        message?.userId ||
        message?.senderId ||
        (typeof message?.user === "object"
          ? message.user._id || message.user.id
          : message?.user) ||
        (typeof message?.sender === "object"
          ? message.sender._id || message.sender.id
          : message?.sender) ||
        null;

      const patientId = senderProfile._id || fallbackSenderId;
      if (!patientId) return;

      const resolvedDoctorId =
        (doctorSelf && (doctorSelf._id || doctorSelf.id)) ||
        pickOtherParticipantId(patientId) ||
        user?._id ||
        null;
      if (!resolvedDoctorId) return;

      const resolvedDoctor = doctorSelf ||
        allDoctors.find((d) => String(d._id) === String(resolvedDoctorId)) || {
          _id: resolvedDoctorId,
          name: "Doctor",
          profileImage: null,
        };

      const request = {
        _id: message._id || Date.now().toString(),
        doctorId: resolvedDoctorId,
        doctorProfile: {
          _id: resolvedDoctor._id || resolvedDoctor.id,
          name: resolvedDoctor.name,
          profileImage:
            resolvedDoctor.profileImage || resolvedDoctor.avatar || null,
        },
        patientId,
        message: getMessageText(message),
        status: "pending",
        createdAt: message.createdAt || new Date().toISOString(),
        patientProfile: Object.keys(senderProfile).length
          ? senderProfile
          : { _id: patientId, name: "Patient", profileImage: null },
      };
      onCancelConsultation(request);
    }
  };

  return (
    <div className='h-full'>
      <ScrollArea className='h-full'>
        <div className='flex flex-col px-4 py-4 gap-4'>
          {sortedMessages.map((message) => {
            const sender = getSenderProfile(message);
            const myId = isDoctorRoute
              ? doctorSelf && (doctorSelf._id || doctorSelf.id)
              : user?._id;
            const isMine = String(getSenderId(message)) === String(myId);
            const text = getMessageText(message);
            const isConsultationReq = isConsultationRequest(message);

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
                        : isConsultationReq
                        ? "bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl rounded-bl-none"
                        : "bg-gray-100 text-gray-900 rounded-2xl rounded-bl-none"
                    }`}>
                    {/* message text (preserves newlines) */}
                    {text ? (
                      renderMessageBody(text)
                    ) : (
                      <div className='whitespace-pre-wrap text-gray-400 italic'>
                        [No text]
                      </div>
                    )}

                    {/* Consultation request buttons for doctors */}
                    {isConsultationReq && !isMine && isDoctorRoute && (
                      <div className='mt-3 pt-3 border-t border-blue-200'>
                        <div className='text-xs text-blue-700 mb-2 font-medium'>
                          Video Consultation Request
                        </div>
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            onClick={() => handleConfirmConsultation(message)}
                            className='bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 h-8'>
                            <Check className='h-3 w-3 mr-1' />
                            Confirm
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => handleCancelConsultation(message)}
                            className='text-red-600 border-red-300 hover:bg-red-50 text-xs px-3 py-1 h-8'>
                            <X className='h-3 w-3 mr-1' />
                            Decline
                          </Button>
                        </div>
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
                      {formatTime(message.createdAt)}
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
